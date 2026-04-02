import React from 'react';
import { Store, TrendingUp, Shield, Headphones, ArrowRight, CheckCircle, BarChart3, Globe } from 'lucide-react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';

const Partners = () => {
    const benefits = [
        { icon: TrendingUp, title: 'Grow Your Business', desc: 'Reach millions of hungry customers looking for their next meal in your area.' },
        { icon: BarChart3, title: 'Powerful Dashboard', desc: 'Track orders, revenue, and customer reviews with real-time analytics.' },
        { icon: Shield, title: 'Secure Payments', desc: 'Get paid weekly with transparent pricing — no hidden fees, ever.' },
        { icon: Headphones, title: 'Dedicated Support', desc: '24/7 partner support team to help you with any issues or questions.' },
        { icon: Globe, title: 'Marketing Boost', desc: 'Featured listings, promotions & ad tools to increase your visibility.' },
        { icon: Store, title: 'Easy Onboarding', desc: 'Get started in under 48 hours with our hassle-free setup process.' },
    ];

    const steps = [
        { step: '01', title: 'Register Online', desc: 'Fill out a quick form with your restaurant details and menu.' },
        { step: '02', title: 'Get Verified', desc: 'Our team reviews your application and verifies your restaurant.' },
        { step: '03', title: 'Set Up Menu', desc: 'Upload your menu, set prices, and customize your store page.' },
        { step: '04', title: 'Start Earning', desc: 'Go live and start receiving orders from customers near you.' },
    ];

    const testimonials = [
        { name: 'Rajesh Kumar', restaurant: 'Spice Junction', quote: 'Tomato helped us increase our revenue by 3x in just 6 months. The dashboard is amazing!', rating: 5 },
        { name: 'Priya Sharma', restaurant: 'The Cake Factory', quote: 'Easy to use, great support team, and the marketing tools really work. Highly recommended!', rating: 5 },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <Navbar />

            {/* Hero */}
            <div className="relative pt-32 pb-20 px-8 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-emerald-100 to-teal-50 dark:from-neutral-800 dark:to-neutral-900 rounded-full blur-3xl -z-10 opacity-60"></div>
                <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
                    <Store size={16} /> Partner Program
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight">
                    Partner with <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Tomato</span>
                </h1>
                <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
                    Join 5000+ restaurants already growing with Tomato. List your restaurant and reach millions of food lovers.
                </p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-colors shadow-lg shadow-orange-500/30">
                    Register Your Restaurant <ArrowRight className="inline ml-2" size={20} />
                </button>
            </div>

            {/* Benefits */}
            <div className="py-20 px-8 max-w-7xl mx-auto">
                <h2 className="text-4xl font-black text-neutral-900 dark:text-white text-center mb-4">Why partner with us?</h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-center mb-12 text-lg">Everything you need to succeed, all in one platform.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((b, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-800 transition-all group">
                            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-5 group-hover:scale-110 transition-transform">
                                <b.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{b.title}</h3>
                            <p className="text-neutral-500 dark:text-neutral-400">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works */}
            <div className="py-20 px-8 bg-neutral-50 dark:bg-neutral-800/50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-black text-neutral-900 dark:text-white text-center mb-16">How it works</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((s, i) => (
                            <div key={i} className="text-center">
                                <span className="text-6xl font-black text-orange-500/20 block mb-4">{s.step}</span>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{s.title}</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-20 px-8 max-w-5xl mx-auto">
                <h2 className="text-4xl font-black text-neutral-900 dark:text-white text-center mb-12">Partner Stories</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="p-10 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                            <div className="flex gap-1 text-yellow-500 mb-4">
                                {[...Array(t.rating)].map((_, j) => <span key={j}>★</span>)}
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 text-lg font-medium leading-relaxed mb-6">"{t.quote}"</p>
                            <div>
                                <h4 className="font-bold text-neutral-900 dark:text-white">{t.name}</h4>
                                <p className="text-sm text-orange-500 font-medium">{t.restaurant}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="py-20 px-8">
                <div className="max-w-4xl mx-auto bg-neutral-900 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px]"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready to grow?</h2>
                        <p className="text-neutral-400 text-lg mb-8 max-w-lg mx-auto">Join thousands of restaurants that trust Tomato to grow their business.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-colors shadow-lg shadow-orange-500/30">
                                Get Started Free
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-colors border border-white/20">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Partners;
