'use client';

import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Source } from '@/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface SourceListProps {
    sources?: Source[];
}

export function SourceList({ sources }: SourceListProps) {
    const [expanded, setExpanded] = useState(false);

    if (!sources || sources.length === 0) return null;

    return (
        <div className="mt-4 border-t border-slate-200 dark:border-slate-700/50 pt-3">
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-2 group"
            >
                <span className="group-hover:translate-x-0.5 transition-transform">{sources.length} Sources</span>
                {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-hidden"
                    >
                        {sources.map((source) => (
                            <div key={source.id} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded bg-white dark:bg-slate-700/50 border border-slate-200 dark:border-transparent flex items-center justify-center text-slate-400 dark:text-slate-400">
                                        <FileText size={12} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">{source.docName}</p>
                                        <p className="text-[10px] text-slate-500">Page {source.page}</p>
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono leading-relaxed line-clamp-3 bg-white dark:bg-slate-900/30 border border-slate-100 dark:border-transparent p-2 rounded">
                                    "{source.text}"
                                </p>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
