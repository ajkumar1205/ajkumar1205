import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { BlogCard } from '@/components/blog/BlogCard';
import { SearchBar } from '@/components/blog/SearchBar';
import { db } from '@/db';
import { tags } from '@/db/schema';
import { desc } from 'drizzle-orm';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

// Enable caching with revalidation
export const revalidate = 60; // Revalidate every 60 seconds

interface BlogListItem {
    id: string;
    title: string;
    slug: string;
    desc: string | null;
    likes: number;
    comments: number;
    views: number;
    approved: boolean;
    createdAt: Date;
    author: {
        id: string | null;
        username: string | null;
        avatarUrl: string | null;
    } | null;
}

interface Tag {
    id: string;
    title: string;
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

async function getBlogs(search?: string, tag?: string): Promise<BlogListItem[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (tag) params.set('tag', tag);

    const res = await fetch(`${baseUrl}/api/blogs?${params.toString()}`, {
        cache: 'no-store',
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.blogs || [];
}

async function getTags(): Promise<Tag[]> {
    try {
        const tagsList = await db
            .select({ id: tags.id, title: tags.title })
            .from(tags)
            .orderBy(desc(tags.createdAt));
        return tagsList;
    } catch {
        return [];
    }
}

interface BlogsPageProps {
    searchParams: Promise<{ search?: string; tag?: string }>;
}

async function BlogsContent({ searchParams, allTags }: BlogsPageProps & { allTags: Tag[] }) {
    const resolvedParams = await searchParams;
    const blogs = await getBlogs(resolvedParams.search, resolvedParams.tag);

    return (
        <>
            {/* Search Bar with Tag Filter */}
            <div className="mb-8">
                <Suspense fallback={<div className="h-12 bg-card rounded-xl animate-pulse" />}>
                    <SearchBar tags={allTags} />
                </Suspense>
            </div>

            {/* Results info */}
            {(resolvedParams.search || resolvedParams.tag) && (
                <p className="text-muted-foreground mb-6">
                    {blogs.length} {blogs.length === 1 ? 'result' : 'results'}
                    {resolvedParams.search && <> for &quot;{resolvedParams.search}&quot;</>}
                    {resolvedParams.tag && <> in tag &quot;{resolvedParams.tag}&quot;</>}
                </p>
            )}

            {/* Blog Grid */}
            {blogs.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                        No blogs found
                    </h3>
                    <p className="text-muted-foreground">
                        {resolvedParams.search || resolvedParams.tag
                            ? 'Try adjusting your search terms or filters'
                            : 'Check back later for new content'}
                    </p>
                </div>
            )}
        </>
    );
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
    const user = await getUser();
    const isAdmin = user?.role === 'admin';
    const allTags = await getTags();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            {/* Main Content - add padding-top for fixed header */}
            <main className="flex-1 pt-16">
                <section className="container mx-auto px-4 py-16">
                    {/* Page Title */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                                Blog
                            </span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Thoughts, tutorials, and insights about software development, technology, and more.
                        </p>

                        {/* Admin link */}
                        {isAdmin && (
                            <a
                                href="/admin/blog"
                                className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Manage Blogs
                            </a>
                        )}
                    </div>

                    <Suspense fallback={<BlogsLoadingSkeleton />}>
                        <BlogsContent searchParams={searchParams} allTags={allTags} />
                    </Suspense>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function BlogsLoadingSkeleton() {
    return (
        <>
            <div className="h-12 bg-card rounded-xl animate-pulse mb-8" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                        <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                        <div className="h-4 bg-muted rounded w-full mb-2" />
                        <div className="h-4 bg-muted rounded w-2/3 mb-4" />
                        <div className="flex gap-4">
                            <div className="h-3 bg-muted rounded w-16" />
                            <div className="h-3 bg-muted rounded w-12" />
                            <div className="h-3 bg-muted rounded w-12" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
