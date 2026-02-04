import { NextResponse } from 'next/server';
import { db } from '@/db';
import { tags } from '@/db/schema';
import { desc } from 'drizzle-orm';

// GET - List all tags
export async function GET() {
    try {
        const tagsList = await db
            .select()
            .from(tags)
            .orderBy(desc(tags.createdAt));

        return NextResponse.json({ tags: tagsList });
    } catch (error) {
        console.error('Error fetching tags:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tags' },
            { status: 500 }
        );
    }
}
