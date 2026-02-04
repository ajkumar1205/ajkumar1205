'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, ArrowLeft, Eye, EyeOff, Calendar, ChevronRight } from 'lucide-react';

interface BlogListItem {
    id: string;
    title: string;
    slug: string;
    desc: string | null;
    likes: number;
    comments: number;
    views: number;
    approved: boolean;
    createdAt: string;
}

export default function AdminBlogPage() {
    const [blogs, setBlogs] = useState<BlogListItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs?showAll=true');
                const data = await res.json();
                setBlogs(data.blogs || []);
            } catch {
                console.error('Failed to fetch blogs');
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Header */}
            <header className="border-b border-zinc-800 sticky top-0 bg-zinc-950/80 backdrop-blur-lg z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Portfolio
                        </Link>

                        <Link
                            href="/admin/blog/new"
                            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition-all shadow-lg shadow-violet-500/25"
                        >
                            <Plus className="w-4 h-4" />
                            Create Blog
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Page Title */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Blog Management
                        </span>
                    </h1>
                    <p className="text-zinc-400">
                        Create, edit, and manage your blog posts
                    </p>
                </div>

                {/* Blog List */}
                {loading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 animate-pulse">
                                <div className="h-6 bg-zinc-800 rounded w-1/2 mb-3" />
                                <div className="h-4 bg-zinc-800 rounded w-full mb-2" />
                                <div className="h-4 bg-zinc-800 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                ) : blogs.length > 0 ? (
                    <div className="space-y-4">
                        {blogs.map((blog) => (
                            <Link
                                key={blog.id}
                                href={`/admin/blog/edit/${blog.slug}`}
                                className="group block bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/5 transition-all"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors mb-2">
                                            {blog.title}
                                        </h2>
                                        {blog.desc && (
                                            <p className="text-zinc-400 text-sm line-clamp-2 mb-3">
                                                {blog.desc}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(blog.createdAt)}
                                            </span>
                                            <span>{blog.views} views</span>
                                            <span>{blog.likes} likes</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${blog.approved
                                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                                }`}
                                        >
                                            {blog.approved ? (
                                                <>
                                                    <Eye className="w-3 h-3" />
                                                    Published
                                                </>
                                            ) : (
                                                <>
                                                    <EyeOff className="w-3 h-3" />
                                                    Draft
                                                </>
                                            )}
                                        </span>
                                        <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-violet-400 transition-colors" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No blogs yet
                        </h3>
                        <p className="text-zinc-400 mb-6">
                            Create your first blog post to get started
                        </p>
                        <Link
                            href="/admin/blog/new"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition-all shadow-lg shadow-violet-500/25"
                        >
                            <Plus className="w-4 h-4" />
                            Create Blog
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
