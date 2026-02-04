import { NextResponse } from 'next/server';
import { db } from '@/db';
import { blogs, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// GET - Get single blog by slug
export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { slug } = await params;

        const currentUser = await getCurrentUser();
        const isAdmin = currentUser?.role === 'admin';

        const blogResult = await db
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

        if (blogResult.length === 0) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            );
        }

        const blog = blogResult[0];

        // Only show unapproved blogs to admin
        if (!blog.approved && !isAdmin) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            );
        }

        // Increment views (if not admin)
        if (!isAdmin) {
            await db
                .update(blogs)
                .set({ views: blog.views + 1 })
                .where(eq(blogs.slug, slug));
        }

        return NextResponse.json({ blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog' },
            { status: 500 }
        );
    }
}

// PUT - Update blog (admin only)
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { slug } = await params;
        const body = await request.json();
        const { title, newSlug, desc, content, approved } = body;

        // Check if blog exists
        const existingBlog = await db
            .select()
            .from(blogs)
            .where(eq(blogs.slug, slug))
            .limit(1);

        if (existingBlog.length === 0) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            );
        }

        // If changing slug, check if new slug already exists
        if (newSlug && newSlug !== slug) {
            const slugCheck = await db
                .select()
                .from(blogs)
                .where(eq(blogs.slug, newSlug))
                .limit(1);

            if (slugCheck.length > 0) {
                return NextResponse.json(
                    { error: 'A blog with this slug already exists' },
                    { status: 400 }
                );
            }
        }

        const updateData: Record<string, unknown> = {
            updatedAt: new Date(),
        };

        if (title !== undefined) updateData.title = title;
        if (newSlug !== undefined) updateData.slug = newSlug;
        if (desc !== undefined) updateData.desc = desc;
        if (content !== undefined) updateData.content = content;
        if (approved !== undefined) updateData.approved = approved;

        const [updatedBlog] = await db
            .update(blogs)
            .set(updateData)
            .where(eq(blogs.slug, slug))
            .returning();

        return NextResponse.json({ blog: updatedBlog });
    } catch (error) {
        console.error('Error updating blog:', error);
        return NextResponse.json(
            { error: 'Failed to update blog' },
            { status: 500 }
        );
    }
}

// DELETE - Delete blog (admin only)
export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { slug } = await params;

        const deletedBlog = await db
            .delete(blogs)
            .where(eq(blogs.slug, slug))
            .returning();

        if (deletedBlog.length === 0) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json(
            { error: 'Failed to delete blog' },
            { status: 500 }
        );
    }
}
