import React, { useState } from "react";
import {
    Search,
    HelpCircle,
    Truck,
    CreditCard,
    User,
    MessageSquare,
    Star,
    ChevronRight,
    Send,
    AlertCircle,
    ShieldCheck
} from "lucide-react";

const UserHelp = () => {
    const [feedback, setFeedback] = useState({
        name: "",
        email: "",
        rating: 5,
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const faqs = [
        {
            category: "Orders & Delivery",
            icon: Truck,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            questions: [
                "How do I track my order?",
                "What is the average delivery time?",
                "My order is delayed, what should I do?"
            ]
        },
        {
            category: "Payments & Refunds",
            icon: CreditCard,
            color: "text-green-600",
            bgColor: "bg-green-50",
            questions: [
                "What payment methods are accepted?",
                "How long does a refund take?",
                "Can I pay with my Tomato Wallet?"
            ]
        },
        {
            category: "Account & Settings",
            icon: User,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            questions: [
                "How do I change my delivery address?",
                "How do I delete my account?",
                "Can I manage notification settings?"
            ]
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFeedback({ name: "", email: "", rating: 5, message: "" });
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-500 pb-10">
            <header>
                <h1 className="text-3xl font-black text-neutral-900 dark:text-white mb-2">Help & Support</h1>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium">Find answers to your questions or get in touch with our team.</p>
            </header>

            {/* Search Bar */}
            <div className="relative group max-w-2xl px-2 sm:px-0">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-red-500 transition-colors" size={20} />
                <input
                    type="text"
                    placeholder="Search for questions (e.g., 'refund', 'tracking')"
                    className="w-full pl-14 pr-6 py-5 bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-3xl shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all text-neutral-900 dark:text-white font-medium"
                />
            </div>

            {/* FAQ Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {faqs.map((group) => (
                    <div key={group.category} className="bg-white dark:bg-neutral-800 rounded-[32px] p-8 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                        <div className={`w-12 h-12 rounded-2xl ${group.bgColor} dark:bg-opacity-10 flex items-center justify-center mb-6`}>
                            <group.icon className={group.color} size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">{group.category}</h3>
                        <div className="space-y-4">
                            {group.questions.map((q) => (
                                <button key={q} className="w-full text-left flex items-center justify-between text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400 transition-colors group">
                                    {q}
                                    <ChevronRight size={16} className="text-neutral-300 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Feedback Section */}
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 bg-white dark:bg-neutral-800 rounded-[32px] p-8 md:p-12 border border-neutral-100 dark:border-neutral-700 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">Share Your Feedback</h2>
                        <p className="text-neutral-500 dark:text-neutral-400 font-medium mb-8">We'd love to hear your thoughts on how we can improve your experience.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="name"
                                    value={feedback.name}
                                    onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                                    required
                                    className="w-full px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 text-neutral-900 dark:text-white font-medium"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={feedback.email}
                                    onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                                    required
                                    className="w-full px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 text-neutral-900 dark:text-white font-medium"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest px-1">Your Rating</label>
                                <div className="flex gap-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFeedback({ ...feedback, rating: star })}
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${feedback.rating >= star ? 'bg-yellow-100 text-yellow-600' : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400'}`}
                                        >
                                            <Star size={20} className={feedback.rating >= star ? 'fill-current' : ''} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <textarea
                                rows={4}
                                placeholder="What's on your mind?"
                                value={feedback.message}
                                onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                                required
                                className="w-full px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 text-neutral-900 dark:text-white font-medium resize-none"
                            />

                            <button
                                type="submit"
                                className="w-full md:w-fit px-12 py-4 bg-red-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                                disabled={submitted}
                            >
                                {submitted ? <ShieldCheck size={24} /> : <Send size={24} />}
                                {submitted ? "Feedback Sent!" : "Submit Feedback"}
                            </button>
                        </form>
                    </div>

                    <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-red-500 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
                </div>

                {/* Contact Strip */}
                <div className="lg:w-80 flex flex-col gap-6">
                    <div className="bg-neutral-900 text-white p-8 rounded-[32px] flex flex-col justify-between h-full group overflow-hidden relative shadow-2xl">
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                                <MessageSquare size={24} className="text-red-500" />
                            </div>
                            <h3 className="text-2xl font-black leading-tight mb-2">Still need help?</h3>
                            <p className="text-neutral-400 font-medium mb-8">Our support team is available 24/7 to assist you.</p>

                            <button className="flex items-center gap-2 font-black text-red-500 hover:gap-4 transition-all uppercase tracking-widest text-xs">
                                Chat with us <ChevronRight size={16} />
                            </button>
                        </div>

                        {/* Background elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHelp;
