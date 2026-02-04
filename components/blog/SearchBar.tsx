'use client';

import { useState, useCallback } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Tag {
    id: string;
    title: string;
}

interface SearchBarProps {
    tags?: Tag[];
}

export function SearchBar({ tags = [] }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('search') || '');
    const [showTagFilter, setShowTagFilter] = useState(false);
    const selectedTag = searchParams.get('tag');

    const handleSearch = useCallback(
        (value: string, tag?: string | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set('search', value);
            } else {
                params.delete('search');
            }
            if (tag) {
                params.set('tag', tag);
            } else if (tag === null) {
                params.delete('tag');
            }
            router.push(`/blogs?${params.toString()}`);
        },
        [router, searchParams]
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(query);
    };

    const handleClear = () => {
        setQuery('');
        handleSearch('', null);
    };

    const handleTagSelect = (tagTitle: string) => {
        if (selectedTag === tagTitle) {
            handleSearch(query, null);
        } else {
            handleSearch(query, tagTitle);
        }
        setShowTagFilter(false);
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="relative flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search blogs by title, description, or content..."
                            className="w-full pl-12 pr-12 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
                        />
                        {(query || selectedTag) && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Tag filter button */}
                    {tags.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setShowTagFilter(!showTagFilter)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${selectedTag
                                    ? 'bg-primary/10 border-primary/50 text-primary'
                                    : 'bg-card border-border text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Filter className="w-5 h-5" />
                            {selectedTag || 'Filter'}
                        </button>
                    )}
                </div>
            </form>

            {/* Tag filter dropdown */}
            {showTagFilter && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 p-4 bg-card border border-border rounded-xl">
                    {tags.map((tag) => (
                        <button
                            key={tag.id}
                            onClick={() => handleTagSelect(tag.title)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedTag === tag.title
                                    ? 'bg-primary text-white'
                                    : 'bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                                }`}
                        >
                            {tag.title}
                        </button>
                    ))}
                </div>
            )}

            {/* Active filter indicator */}
            {selectedTag && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Filtering by:</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {selectedTag}
                        <button
                            onClick={() => handleSearch(query, null)}
                            className="hover:text-primary/70 transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </span>
                </div>
            )}
        </div>
    );
}
