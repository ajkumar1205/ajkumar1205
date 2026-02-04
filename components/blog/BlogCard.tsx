import Link from 'next/link';
import { Eye, Heart, MessageCircle, Calendar } from 'lucide-react';

interface BlogCardProps {
    blog: {
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
    };
    isAdmin?: boolean;
}

export function BlogCard({ blog, isAdmin }: BlogCardProps) {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <Link href={`/blogs/${blog.slug}`}>
            <article className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                {/* Title */}
                <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
                    {blog.title}
                </h2>

                {/* Description */}
                {blog.desc && (
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {blog.desc}
                    </p>
                )}

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    {/* Date */}
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(blog.createdAt)}
                    </span>

                    {/* Views */}
                    <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {blog.views}
                    </span>

                    {/* Likes */}
                    <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" />
                        {blog.likes}
                    </span>

                    {/* Comments */}
                    <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {blog.comments}
                    </span>
                </div>

                {/* Status badge for admin */}
                {isAdmin && (
                    <div className="mt-4 pt-4 border-t border-border">
                        <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${blog.approved
                                    ? 'bg-green-500/10 text-green-400'
                                    : 'bg-yellow-500/10 text-yellow-400'
                                }`}
                        >
                            {blog.approved ? 'Published' : 'Draft'}
                        </span>
                    </div>
                )}
            </article>
        </Link>
    );
}
