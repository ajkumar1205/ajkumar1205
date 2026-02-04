'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import '@/styles/md-editor.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface BlogEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export function BlogEditor({ value, onChange }: BlogEditorProps) {
    const [preview, setPreview] = useState<'edit' | 'live' | 'preview'>('live');

    return (
        <div data-color-mode="dark" className="w-full">
            <div className="flex gap-2 mb-3">
                <button
                    type="button"
                    onClick={() => setPreview('edit')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${preview === 'edit'
                            ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                            : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700'
                        }`}
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={() => setPreview('live')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${preview === 'live'
                            ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                            : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700'
                        }`}
                >
                    Split
                </button>
                <button
                    type="button"
                    onClick={() => setPreview('preview')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${preview === 'preview'
                            ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                            : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700'
                        }`}
                >
                    Preview
                </button>
            </div>
            <MDEditor
                value={value}
                onChange={(val) => onChange(val || '')}
                preview={preview}
                height={500}
                className="!bg-zinc-900 !border-zinc-700 rounded-xl overflow-hidden"
            />
        </div>
    );
}
