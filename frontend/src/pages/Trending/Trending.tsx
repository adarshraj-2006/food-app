import React from 'react';
import { TrendingUp, Flame, Star, ArrowRight, Clock } from 'lucide-react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';

const Trending = () => {
    const trendingItems = [
        { name: 'Butter Chicken', restaurant: 'Punjab Grill', rating: 4.8, orders: '12K+ orders today', price: '₹349', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop' },
        { name: 'Margherita Pizza', restaurant: 'La Pizzeria', rating: 4.7, orders: '8K+ orders today', price: '₹299', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop' },
        { name: 'Chicken Biryani', restaurant: 'Behrouz Biryani', rating: 4.9, orders: '15K+ orders today', price: '₹249', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop' },
        { name: 'Classic Burger', restaurant: 'Burger King', rating: 4.5, orders: '10K+ orders today', price: '₹199', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
        { name: 'Masala Dosa', restaurant: 'MTR Express', rating: 4.6, orders: '7K+ orders today', price: '₹149', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop' },
        { name: 'Chocolate Shake', restaurant: 'Shake It Up', rating: 4.4, orders: '5K+ orders today', price: '₹179', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop' },
    ];

    const trendingCategories = [
        { name: 'North Indian', emoji: '🍛', growth: '+45%' },
        { name: 'Pizza', emoji: '🍕', growth: '+38%' },
        { name: 'Chinese', emoji: '🥡', growth: '+32%' },
        { name: 'Desserts', emoji: '🍰', growth: '+28%' },
        { name: 'Healthy', emoji: '🥗', growth: '+55%' },
        { name: 'Street Food', emoji: '🌮', growth: '+41%' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <Navbar />

            {/* Hero */}
            <div className="relative pt-32 pb-20 px-8 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-pink-100 to-orange-50 dark:from-neutral-800 dark:to-neutral-900 rounded-full blur-3xl -z-10 opacity-60"></div>
                <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
                    <Flame size={16} /> What's Hot Right Now
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight">
                    Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Now</span>
                </h1>
                <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                    Discover what everyone is ordering right now. The most popular dishes, restaurants, and cuisines in your city.
                </p>
            </div>

            {/* Trending Categories */}
            <div className="py-16 px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-black text-neutral-900 dark:text-white mb-10">📈 Trending Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {trendingCategories.map((cat, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 text-center hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg transition-all cursor-pointer group">
                            <span className="text-4xl block mb-3">{cat.emoji}</span>
                            <h4 className="font-bold text-neutral-900 dark:text-white text-sm mb-1">{cat.name}</h4>
                            <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">{cat.growth}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Trending Items */}
            <div className="py-16 px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-black text-neutral-900 dark:text-white mb-10">🔥 Most Ordered Today</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trendingItems.map((item, i) => (
                        <div key={i} className="rounded-3xl overflow-hidden bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:shadow-2xl transition-all group cursor-pointer">
                            <div className="relative h-48 overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold">
                                    <Star size={14} className="text-yellow-500 fill-yellow-500" /> {item.rating}
                                </div>
                                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
                                    <TrendingUp size={12} /> #{i + 1}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{item.name}</h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">{item.restaurant}</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-black text-lg text-orange-600">{item.price}</span>
                                    <span className="text-xs text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">{item.orders}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Live Trending Banner */}
            <div className="py-20 px-8">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-red-500 to-orange-600 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200')] bg-cover bg-center opacity-10"></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-bold mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Live Trending
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Don't miss out!</h2>
                        <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">These dishes are selling fast. Order now before they're gone!</p>
                        <button className="bg-white text-red-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-neutral-100 transition-colors shadow-lg">
                            Order Now <ArrowRight className="inline ml-2" size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Trending;
