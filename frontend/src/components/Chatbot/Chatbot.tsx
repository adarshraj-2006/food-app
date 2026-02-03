import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, X, Send, User, Bot, Sparkles, Smile } from 'lucide-react';

const Chatbot = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const location = useLocation();
    const isDashboard = location.pathname.includes('/user') || location.pathname.includes('/dashboard');

    if (!isDashboard) return null;

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: "Hi! I'm Tomato Helper. How can I assist you today? 🍅" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulated Bot Responses
        setTimeout(() => {
            let response = "I'm sorry, I don't have information about that yet. Would you like to speak with a human support agent?";

            const lowerInput = input.toLowerCase();
            if (lowerInput.includes('order')) {
                response = "You can track your orders in the 'My Orders' section of your dashboard. 📦";
            } else if (lowerInput.includes('refund') || lowerInput.includes('money')) {
                response = "Refunds typically take 5-7 business days to reflect in your account. 💳";
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                response = "Hello! Looking for something delicious today? 🍕";
            } else if (lowerInput.includes('offer') || lowerInput.includes('discount')) {
                response = "Check out the 'Offers' section in the navbar for some amazing deals! 🏷️";
            } else if (lowerInput.includes('tomato')) {
                response = "Tomato is your favorite food delivery partner! We're here to make your meals special. ❤️";
            }

            setMessages(prev => [...prev, { role: 'bot', content: response }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[9999] font-sans">
            {/* Chat Windows */}
            {isOpen && (
                <div className="mb-6 w-[350px] md:w-[400px] h-[550px] bg-white dark:bg-neutral-900 rounded-[32px] shadow-2xl border border-neutral-100 dark:border-neutral-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">

                    {/* Header */}
                    <div className="p-6 bg-red-500 text-white flex items-center justify-between shadow-lg shadow-red-500/20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-red-500 shadow-md">
                                <Sparkles size={20} className="fill-current" />
                            </div>
                            <div>
                                <h3 className="font-black tracking-tight">Tomato Helper</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                    <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Active Now</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar bg-slate-50 dark:bg-neutral-950/20"
                    >
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-red-500 text-white' : 'bg-white dark:bg-neutral-800 text-red-500'}`}>
                                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                    </div>
                                    <div className={`p-4 rounded-2xl text-sm font-medium ${msg.role === 'user'
                                        ? 'bg-red-500 text-white rounded-tr-none shadow-md'
                                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-tl-none shadow-sm'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex gap-3 max-w-[80%]">
                                    <div className="w-8 h-8 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center text-red-500 shadow-sm">
                                        <Bot size={14} />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white dark:bg-neutral-800 rounded-tl-none shadow-sm flex gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-6 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800 p-2 pl-4 rounded-2xl border border-neutral-100 dark:border-neutral-700 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500 transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-neutral-800 dark:text-white"
                            />
                            <button className="text-neutral-400 hover:text-red-500 transition-colors">
                                <Smile size={20} />
                            </button>
                            <button
                                onClick={handleSend}
                                className="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25 hover:bg-red-600 transition-all active:scale-95"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative group overflow-hidden ${isOpen ? 'bg-neutral-900 dark:bg-neutral-800 rotate-90' : 'bg-red-500 hover:scale-110 active:scale-95'}`}
            >
                <div className="relative z-10 text-white">
                    {isOpen ? <X size={28} /> : <MessageSquare size={28} className="fill-current" />}
                </div>

                {/* Visual Pulse */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></span>
                )}

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {/* Tooltip */}
            {!isOpen && (
                <div className="absolute right-20 top-1/2 -translate-y-1/2 px-4 py-2 bg-neutral-900 text-white text-xs font-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest shadow-xl hidden md:block">
                    Need Help? Chat here
                </div>
            )}
        </div>
    );
};

export default Chatbot;
