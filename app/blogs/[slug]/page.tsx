import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Eye, Heart, MessageCircle, ArrowLeft } from 'lucide-react';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { db } from '@/db';
import { blogs, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

// Enable ISR with revalidation every 60 seconds
export const revalidate = 60;

interface BlogPageProps {
    params: Promise<{ slug: string }>;
}

async function getUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;
        if (!token) return null;

        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as { userId: string; username: string; role: string };
    } catch {
        return null;
    }
}

async function getBlog(slug: string) {
    const result = await db
        .select({
            id: blogs.id,
            title: blogs.title,
            slug: blogs.slug,
            desc: blogs.desc,
            content: blogs.content,
            likes: blogs.likes,
            comments: blogs.comments,
            views: blogs.views,
            approved: blogs.approved,
            createdAt: blogs.createdAt,
            updatedAt: blogs.updatedAt,
            author: {
                id: users.id,
                username: users.username,
                avatarUrl: users.avatarUrl,
            },
        })
        .from(blogs)
        .leftJoin(users, eq(blogs.authorId, users.id))
        .where(eq(blogs.slug, slug))
        .limit(1);

    return result[0] || null;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const blog = await getBlog(resolvedParams.slug);

    if (!blog) {
        return { title: 'Blog Not Found' };
    }

    return {
        title: `${blog.title} | Ajay Kumar`,
        description: blog.desc || `Read ${blog.title} on Ajay Kumar's blog`,
        openGraph: {
            title: blog.title,
            description: blog.desc || undefined,
            type: 'article',
            publishedTime: blog.createdAt.toISOString(),
            modifiedTime: blog.updatedAt.toISOString(),
        },
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const resolvedParams = await params;
    const user = await getUser();
    const isAdmin = user?.role === 'admin';
    const blog = await getBlog(resolvedParams.slug);

    if (!blog) {
        notFound();
    }

    // Only show unapproved blogs to admin
    if (!blog.approved && !isAdmin) {
        notFound();
    }

    // Increment views for non-admin users
    if (!isAdmin) {
        // Use fire-and-forget to not block page rendering
        db.update(blogs)
            .set({ views: blog.views + 1 })
            .where(eq(blogs.slug, resolvedParams.slug))
            .execute()
            .catch(() => {
                // Silently ignore errors
            });
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            {/* Main Content */}
            <main className="flex-1 pt-16">
                {/* Back link */}
                <div className="container mx-auto px-4 py-6">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blogs
                    </Link>
                </div>

                {/* Article */}
                <article className="container mx-auto px-4 pb-16 max-w-4xl">
                    {/* Status badge for admin */}
                    {isAdmin && !blog.approved && (
                        <div className="mb-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/10 text-yellow-400">
                                Draft - Not Published
                            </span>
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                            {blog.title}
                        </span>
                    </h1>

                    {/* Description */}
                    {blog.desc && (
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            {blog.desc}
                        </p>
                    )}

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border mb-8">
                        {/* Author */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {blog.author?.username?.[0]?.toUpperCase() || 'A'}
                            </div>
                            <span>{blog.author?.username || 'Anonymous'}</span>
                        </div>

                        {/* Date */}
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {formatDate(blog.createdAt)}
                        </span>

                        {/* Views */}
                        <span className="flex items-center gap-1.5">
                            <Eye className="w-4 h-4" />
                            {blog.views} views
                        </span>

                        {/* Likes */}
                        <span className="flex items-center gap-1.5">
                            <Heart className="w-4 h-4" />
                            {blog.likes} likes
                        </span>

                        {/* Comments */}
                        <span className="flex items-center gap-1.5">
                            <MessageCircle className="w-4 h-4" />
                            {blog.comments} comments
                        </span>
                    </div>

                    {/* Admin edit link */}
                    {isAdmin && (
                        <div className="mb-8">
                            <Link
                                href={`/admin/blog/edit/${blog.slug}`}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Edit this blog
                            </Link>
                        </div>
                    )}

                    {/* Content */}
                    <MarkdownRenderer content={blog.content} />
                </article>
            </main>

            <Footer />
        </div>
    );
}
