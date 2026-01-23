'use client';

import React from 'react';
import { Message } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { User, Bot, Copy, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { SourceList } from './SourceList';

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === 'user';

    return (
        <div className={cn("flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300", isUser ? "justify-end" : "justify-start")}>
            <div className={cn("flex max-w-[85%] md:max-w-[70%] gap-4", isUser ? "flex-row-reverse" : "flex-row")}>

                {/* Avatar */}
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm",
                    isUser ? "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200" : "bg-emerald-500 text-white"
                )}>
                    {isUser ? <User size={16} /> : <Bot size={16} />}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1 min-w-0">
                    <div className={cn(
                        "rounded-2xl px-5 py-4 shadow-sm text-sm leading-relaxed",
                        isUser
                            ? "bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-tr-sm border border-slate-200 dark:border-transparent"
                            : "bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 rounded-tl-sm"
                    )}>
                        <div className="whitespace-pre-wrap">{message.content}</div>

                        {/* Sources (Only for AI) */}
                        {!isUser && message.sources && (
                            <SourceList sources={message.sources} />
                        )}
                    </div>

                    {/* AI Message Actions */}
                    {!isUser && (
                        <div className="flex items-center gap-3 px-2 mt-1">
                            <button className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors p-1"><Copy size={14} /></button>
                            <button className="text-slate-400 hover:text-emerald-500 dark:text-slate-500 dark:hover:text-emerald-400 transition-colors p-1"><ThumbsUp size={14} /></button>
                            <button className="text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 transition-colors p-1"><ThumbsDown size={14} /></button>
                            <button className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors p-1 ml-auto flex items-center gap-1 text-[10px]">
                                <RotateCcw size={12} /> Regenerate
                            </button>
                        </div>
                    )}

                    {/* Timestamp */}
                    <span className={cn("text-[10px] text-slate-400 dark:text-slate-600 px-1", isUser ? "text-right" : "text-left")} suppressHydrationWarning>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>
        </div>
    );
}
