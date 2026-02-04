'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import { BlogEditor } from '@/components/blog/BlogEditor';

export default function NewBlogPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('# Your Blog Title\n\nStart writing your blog here...');
    const [approved, setApproved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (value: string) => {
        setTitle(value);
        if (!slug || slug === generateSlug(title)) {
            setSlug(generateSlug(value));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    slug,
                    desc: desc || null,
                    content,
                    approved,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Failed to create blog');
                return;
            }

            router.push('/admin/blog');
            router.refresh();
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Header */}
            <header className="border-b border-zinc-800 sticky top-0 bg-zinc-950/80 backdrop-blur-lg z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/admin/blog"
                            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog Management
                        </Link>

                        <div className="flex items-center gap-4">
                            {/* Publish toggle */}
                            <button
                                type="button"
                                onClick={() => setApproved(!approved)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${approved
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-zinc-300'
                                    }`}
                            >
                                {approved ? (
                                    <>
                                        <Eye className="w-4 h-4" />
                                        Published
                                    </>
                                ) : (
                                    <>
                                        <EyeOff className="w-4 h-4" />
                                        Draft
                                    </>
                                )}
                            </button>

                            {/* Save button */}
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !title || !slug || !content}
                                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition-all shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                <Save className="w-4 h-4" />
                                {loading ? 'Saving...' : 'Save Blog'}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                            Title <span className="text-violet-400">*</span>
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-white placeholder:text-zinc-500 text-xl"
                            placeholder="Enter blog title"
                            required
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-white mb-2">
                            Slug <span className="text-violet-400">*</span>
                            <span className="text-zinc-500 font-normal ml-2">
                                (URL: /blogs/{slug || 'your-slug'})
                            </span>
                        </label>
                        <input
                            id="slug"
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(generateSlug(e.target.value))}
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-white placeholder:text-zinc-500"
                            placeholder="your-blog-slug"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="desc" className="block text-sm font-medium text-white mb-2">
                            Description
                            <span className="text-zinc-500 font-normal ml-2">(optional)</span>
                        </label>
                        <textarea
                            id="desc"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-white placeholder:text-zinc-500 resize-none"
                            placeholder="A brief description of your blog post"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Content <span className="text-violet-400">*</span>
                            <span className="text-zinc-500 font-normal ml-2">(Markdown supported)</span>
                        </label>
                        <BlogEditor value={content} onChange={setContent} />
                    </div>
                </form>
            </main>
        </div>
    );
}
