'use client';

import React from 'react';
import { Sparkles, Upload, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { mockDocuments } from '@/lib/mockData';

export function Sidebar() {
    return (
        <div className="w-[320px] bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full text-slate-600 dark:text-slate-300 transition-colors duration-300">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-500">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-900 dark:text-white tracking-tight text-base">DocuChat AI</h1>
                        <p className="text-xs text-emerald-600 dark:text-emerald-500 font-medium">RAG-powered answers</p>
                    </div>
                </div>

                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98]">
                    <span className="text-lg leading-none mb-0.5">+</span> New Chat
                </button>
            </div>

            {/* Upload Area */}
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Upload</h2>
                </div>
                <div className="border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/30 rounded-xl p-6 text-center hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:border-slate-400 dark:hover:border-slate-600 transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                        <Upload size={18} />
                    </div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Upload PDF Documents</p>
                    <p className="text-xs text-slate-500 mt-1">Drag & drop or <span className="text-emerald-600 dark:text-emerald-500 font-medium">browse</span></p>
                </div>
            </div>

            {/* Document List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 custom-scrollbar">
                <div className="px-2 mb-2">
                    <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Documents</h2>
                </div>

                {mockDocuments.length === 0 ? (
                    <div className="text-center py-10 px-4">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800/50 rounded-xl flex items-center justify-center mx-auto mb-3 text-slate-400 dark:text-slate-500">
                            <FileText size={24} />
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No documents yet</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Upload PDFs to get started</p>
                    </div>
                ) : (
                    mockDocuments.map((doc) => (
                        <div key={doc.id} className="group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50">
                            <div className="mt-1 min-w-[32px] w-8 h-8 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                <FileText size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate pr-2">{doc.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    {doc.status === 'ready' && <span className="text-[10px] text-emerald-600 dark:text-emerald-500 flex items-center gap-1 font-medium"><CheckCircle2 size={10} /> Ready</span>}
                                    {doc.status === 'indexing' && <span className="text-[10px] text-amber-500 flex items-center gap-1 font-medium"><Loader2 size={10} className="animate-spin" /> Indexing</span>}
                                    {doc.status === 'uploading' && (
                                        <div className="w-full">
                                            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                                <span>Uploading</span>
                                                <span>{doc.uploadProgress}%</span>
                                            </div>
                                            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${doc.uploadProgress}%` }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Powered by Gemini Pro
                </div>
            </div>
        </div>
    );
}
