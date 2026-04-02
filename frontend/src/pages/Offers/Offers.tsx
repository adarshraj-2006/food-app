import React from 'react';
import { Percent, Clock, ArrowRight, Tag, Zap, Gift, Star } from 'lucide-react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';

const Offers = () => {
    const featuredOffers = [
        { code: 'TOMATO50', discount: '50% OFF', maxSave: 'up to ₹120', minOrder: '₹199', desc: 'On your first order', gradient: 'from-orange-500 to-red-500', icon: '🔥' },
        { code: 'WEEKEND30', discount: '30% OFF', maxSave: 'up to ₹100', minOrder: '₹299', desc: 'Weekend special on all restaurants', gradient: 'from-purple-500 to-pink-500', icon: '🎉' },
        { code: 'FREEDELIVERY', discount: 'FREE DELIVERY', maxSave: 'Save ₹40', minOrder: '₹149', desc: 'No delivery charges', gradient: 'from-emerald-500 to-teal-500', icon: '🚀' },
    ];

    const bankOffers = [
        { bank: 'HDFC Bank', discount: '20% cashback up to ₹150', logo: '🏦' },
        { bank: 'Paytm Wallet', discount: 'Flat ₹50 cashback', logo: '💳' },
        { bank: 'Amazon Pay', discount: 'Get 10% back up to ₹60', logo: '📱' },
        { bank: 'PhonePe', discount: 'Flat ₹30 cashback on UPI', logo: '💸' },
    ];

    const categoryDeals = [
        { name: 'Pizza', discount: 'Up to 60% OFF', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop' },
        { name: 'Burgers', discount: 'Buy 1 Get 1', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
        { name: 'Biryani', discount: 'Starting ₹99', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop' },
        { name: 'Desserts', discount: 'Flat 40% OFF', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <Navbar />

            {/* Hero */}
            <div className="relative pt-32 pb-20 px-8 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-orange-100 to-yellow-50 dark:from-neutral-800 dark:to-neutral-900 rounded-full blur-3xl -z-10 opacity-60"></div>
                <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
                    <Zap size={16} /> Fresh Deals Every Day
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight">
                    Offers & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Deals</span>
                </h1>
                <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                    Save big on your favorite meals. Explore exclusive coupons, bank offers, and limited-time deals curated just for you.
                </p>
            </div>

            {/* Featured Coupons */}
            <div className="py-16 px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-black text-neutral-900 dark:text-white mb-10">🎟️ Featured Coupons</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {featuredOffers.map((offer, i) => (
                        <div key={i} className={`bg-gradient-to-br ${offer.gradient} rounded-3xl p-8 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
                            <div className="absolute top-4 right-4 text-5xl opacity-30 group-hover:opacity-50 transition-opacity">{offer.icon}</div>
                            <span className="text-sm font-bold opacity-80 uppercase tracking-widest">{offer.desc}</span>
                            <h3 className="text-4xl font-black mt-2 mb-1">{offer.discount}</h3>
                            <p className="text-sm opacity-90">{offer.maxSave} | Min. order {offer.minOrder}</p>
                            <div className="mt-6 flex items-center gap-3">
                                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl font-mono font-bold tracking-wider text-lg">{offer.code}</div>
                                <button className="bg-white text-neutral-900 px-5 py-2 rounded-xl font-bold text-sm hover:bg-neutral-100 transition-colors">Copy</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bank Offers */}
            <div className="py-16 px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-black text-neutral-900 dark:text-white mb-10">💳 Bank & Wallet Offers</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bankOffers.map((offer, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-800 transition-all">
                            <span className="text-4xl mb-4 block">{offer.logo}</span>
                            <h4 className="font-bold text-neutral-900 dark:text-white mb-1">{offer.bank}</h4>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">{offer.discount}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Deals by Category */}
            <div className="py-16 px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-black text-neutral-900 dark:text-white mb-10">🍕 Deals by Category</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryDeals.map((deal, i) => (
                        <div key={i} className="rounded-3xl overflow-hidden group cursor-pointer relative">
                            <img src={deal.image} alt={deal.name} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-white text-xl font-bold">{deal.name}</h3>
                                <span className="text-orange-400 font-bold text-sm">{deal.discount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="py-20 px-8">
                <div className="max-w-4xl mx-auto bg-neutral-900 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/20 rounded-full blur-[100px]"></div>
                    <Gift className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Refer & Earn ₹100</h2>
                    <p className="text-neutral-400 text-lg mb-8 max-w-lg mx-auto">Invite your friends to Tomato and get ₹100 in your wallet when they place their first order.</p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-colors shadow-lg shadow-orange-500/30">
                        Share Invite Link
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Offers;
