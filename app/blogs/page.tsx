import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { BlogCard } from '@/components/blog/BlogCard';
import { SearchBar } from '@/components/blog/SearchBar';
import { db } from '@/db';
import { blogs, tags, users, blogTags } from '@/db/schema';
import { desc, eq, ilike, or, and, inArray } from 'drizzle-orm';

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

async function getBlogs(search?: string, tagFilter?: string): Promise<BlogListItem[]> {
    try {
        const conditions = [];

        // Only show approved blogs for public view
        conditions.push(eq(blogs.approved, true));

        // Search filter
        if (search) {
            const searchCondition = or(
                ilike(blogs.slug, `%${search}%`),
                ilike(blogs.desc, `%${search}%`),
                ilike(blogs.content, `%${search}%`),
                ilike(blogs.title, `%${search}%`)
            );
            if (searchCondition) {
                conditions.push(searchCondition);
            }
        }

        // Tag filter - find blogs with the specified tag
        if (tagFilter) {
            const tag = await db
                .select({ id: tags.id })
                .from(tags)
                .where(eq(tags.title, tagFilter))
                .limit(1);

            if (tag.length > 0) {
                const blogIdsWithTag = await db
                    .select({ blogId: blogTags.blogId })
                    .from(blogTags)
                    .where(eq(blogTags.tagId, tag[0].id));

                if (blogIdsWithTag.length > 0) {
                    const blogIds = blogIdsWithTag.map(b => b.blogId);
                    conditions.push(inArray(blogs.id, blogIds));
                } else {
                    return []; // No blogs with this tag
                }
            } else {
                return []; // Tag not found
            }
        }

        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        const blogsList = await db
            .select({
                id: blogs.id,
                title: blogs.title,
                slug: blogs.slug,
                desc: blogs.desc,
                likes: blogs.likes,
                comments: blogs.comments,
                views: blogs.views,
                approved: blogs.approved,
                createdAt: blogs.createdAt,
                author: {
                    id: users.id,
                    username: users.username,
                    avatarUrl: users.avatarUrl,
                },
            })
            .from(blogs)
            .leftJoin(users, eq(blogs.authorId, users.id))
            .where(whereClause)
            .orderBy(desc(blogs.createdAt));

        return blogsList;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
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
    const blogsList = await getBlogs(resolvedParams.search, resolvedParams.tag);

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
                    {blogsList.length} {blogsList.length === 1 ? 'result' : 'results'}
                    {resolvedParams.search && <> for &quot;{resolvedParams.search}&quot;</>}
                    {resolvedParams.tag && <> in tag &quot;{resolvedParams.tag}&quot;</>}
                </p>
            )}

            {/* Blog Grid */}
            {blogsList.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {blogsList.map((blog) => (
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
