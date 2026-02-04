import { NextResponse } from 'next/server';
import { db } from '@/db';
import { blogs, users, blogTags, tags } from '@/db/schema';
import { eq, desc, or, ilike, and, inArray } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

// GET - List all approved blogs (public) with optional search and tag filter
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const tagFilter = searchParams.get('tag');
        const showAll = searchParams.get('showAll') === 'true';

        // Check if user is admin for showAll
        const currentUser = await getCurrentUser();
        const isAdmin = currentUser?.role === 'admin';

        // Build conditions array
        const conditions = [];

        // Approved filter (unless admin showing all)
        if (!(isAdmin && showAll)) {
            conditions.push(eq(blogs.approved, true));
        }

        // Search filter
        if (search) {
            conditions.push(
                or(
                    ilike(blogs.slug, `%${search}%`),
                    ilike(blogs.desc, `%${search}%`),
                    ilike(blogs.content, `%${search}%`),
                    ilike(blogs.title, `%${search}%`)
                )
            );
        }

        // Tag filter - get blog IDs that have the specified tag
        let taggedBlogIds: string[] = [];
        if (tagFilter) {
            // Find the tag by title
            const tagResult = await db
                .select({ id: tags.id })
                .from(tags)
                .where(eq(tags.title, tagFilter))
                .limit(1);

            if (tagResult.length > 0) {
                const tagId = tagResult[0].id;
                const taggedBlogs = await db
                    .select({ blogId: blogTags.blogId })
                    .from(blogTags)
                    .where(eq(blogTags.tagId, tagId));

                taggedBlogIds = taggedBlogs.map(b => b.blogId);

                if (taggedBlogIds.length > 0) {
                    conditions.push(inArray(blogs.id, taggedBlogIds));
                } else {
                    // No blogs with this tag, return empty
                    return NextResponse.json({ blogs: [] });
                }
            } else {
                // Tag not found, return empty
                return NextResponse.json({ blogs: [] });
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

        return NextResponse.json({ blogs: blogsList });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
}

// POST - Create new blog (admin only)
export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { title, slug, desc, content, approved = false } = body;

        if (!title || !slug || !content) {
            return NextResponse.json(
                { error: 'Title, slug, and content are required' },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existingBlog = await db
            .select()
            .from(blogs)
            .where(eq(blogs.slug, slug))
            .limit(1);

        if (existingBlog.length > 0) {
            return NextResponse.json(
                { error: 'A blog with this slug already exists' },
                { status: 400 }
            );
        }

        const [newBlog] = await db
            .insert(blogs)
            .values({
                title,
                slug,
                desc,
                content,
                approved,
                authorId: currentUser.userId,
            })
            .returning();

        return NextResponse.json({ blog: newBlog }, { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json(
            { error: 'Failed to create blog' },
            { status: 500 }
        );
    }
}
