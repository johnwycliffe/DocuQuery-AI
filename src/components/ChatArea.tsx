'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Bot, FileText, Paperclip, Sparkles } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { mockChatHistory, Message } from '@/lib/mockData';
import { ThemeToggle } from './ThemeToggle';

export function ChatArea() {
    const [messages, setMessages] = useState<Message[]>(mockChatHistory);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            setIsTyping(false);
            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: "This is a simulated response. Since this is a UI-only demo, I cannot actually process your documents. However, this is where the RAG pipeline answer would appear, citations and all!",
                timestamp: new Date(),
                sources: [
                    {
                        id: 's-new',
                        docId: '3',
                        docName: 'project_alpha_specs.pdf',
                        page: 12,
                        text: 'The UI must implement a dark/light mode toggle that persists user preference.'
                    }
                ]
            };
            setMessages(prev => [...prev, newAiMsg]);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-white to-transparent dark:from-slate-900 dark:to-transparent pointer-events-none opacity-50" />

            {/* Header */}
            <div className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-10 sticky top-0 transition-colors duration-300">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-500">
                        <Sparkles size={18} />
                    </div>
                    <div>
                        <h2 className="text-slate-900 dark:text-white font-semibold text-sm">Chat with Documents</h2>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Ask questions about your selected files</p>
                    </div>
                </div>

                {/* Theme Toggle in Header (Top Right) */}
                <ThemeToggle />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 md:px-20 py-8 space-y-8 custom-scrollbar scroll-smooth">
                {/* Welcome / Empty State (only if no messages) */}
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-100 max-w-lg mx-auto px-6">
                        <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/10 mb-2 border border-slate-100 dark:border-slate-800">
                            <FileText className="text-emerald-500" size={40} />
                            <div className="absolute ml-6 mt-6 bg-white dark:bg-slate-950 rounded-full p-1 border-2 border-emerald-500">
                                <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">?</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">About Your Documents</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                                Upload PDF documents to start asking questions. Our AI will analyze them and provide accurate, source-referenced answers.
                            </p>
                        </div>
                    </div>
                )}

                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}

                {isTyping && (
                    <div className="flex justify-start w-full">
                        <div className="flex flex-row gap-4 max-w-[80%]">
                            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                                <Bot size={16} />
                            </div>
                            <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-2 shadow-sm">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                <div className="max-w-4xl mx-auto relative">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Upload documents to start chatting..."
                        className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-700/50 rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 resize-none min-h-[56px] max-h-[120px] shadow-sm dark:shadow-lg dark:shadow-black/20 text-sm scrollbar-hide placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
                        rows={1}
                    />

                    <div className="absolute right-3 bottom-3 flex items-center gap-2">
                        <button className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 p-2 transition-colors">
                            <Paperclip size={18} />
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-all shadow-md shadow-emerald-500/20"
                        >
                            <SendHorizontal size={18} />
                        </button>
                    </div>
                </div>
                <p className="text-center text-[10px] text-slate-400 dark:text-slate-600 mt-3">
                    AI responses are generated based on your document content • <span className="hover:text-slate-600 dark:hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
                </p>
            </div>
        </div>
    );
}
