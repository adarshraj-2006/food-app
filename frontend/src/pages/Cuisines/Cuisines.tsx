import React, { useState } from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';

const Cuisines = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Indian', 'Asian', 'Western', 'Middle Eastern', 'Desserts'];

    const cuisines = [
        { name: 'North Indian', dishes: '2500+ dishes', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop', category: 'Indian', color: 'from-orange-500 to-red-500' },
        { name: 'South Indian', dishes: '1800+ dishes', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop', category: 'Indian', color: 'from-yellow-500 to-orange-500' },
        { name: 'Chinese', dishes: '2000+ dishes', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop', category: 'Asian', color: 'from-red-600 to-pink-600' },
        { name: 'Italian', dishes: '1200+ dishes', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', category: 'Western', color: 'from-green-500 to-emerald-600' },
        { name: 'Japanese', dishes: '800+ dishes', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop', category: 'Asian', color: 'from-pink-500 to-rose-600' },
        { name: 'Mexican', dishes: '600+ dishes', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop', category: 'Western', color: 'from-lime-500 to-green-600' },
        { name: 'Thai', dishes: '700+ dishes', image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&h=300&fit=crop', category: 'Asian', color: 'from-amber-500 to-orange-600' },
        { name: 'Mughlai', dishes: '1500+ dishes', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop', category: 'Indian', color: 'from-amber-600 to-red-700' },
        { name: 'Lebanese', dishes: '400+ dishes', image: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=400&h=300&fit=crop', category: 'Middle Eastern', color: 'from-teal-500 to-cyan-600' },
        { name: 'American', dishes: '1000+ dishes', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', category: 'Western', color: 'from-blue-500 to-indigo-600' },
        { name: 'Bengali', dishes: '900+ dishes', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', category: 'Indian', color: 'from-yellow-600 to-amber-700' },
        { name: 'Bakery & Desserts', dishes: '3000+ items', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop', category: 'Desserts', color: 'from-pink-400 to-purple-500' },
    ];

    const filteredCuisines = activeFilter === 'All' ? cuisines : cuisines.filter(c => c.category === activeFilter);

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <Navbar />

            {/* Hero */}
            <div className="relative pt-32 pb-20 px-8 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-amber-100 to-orange-50 dark:from-neutral-800 dark:to-neutral-900 rounded-full blur-3xl -z-10 opacity-60"></div>
                <h1 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight">
                    Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Cuisines</span>
                </h1>
                <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                    From the spices of India to the flavors of Japan — discover a world of cuisines delivered right to your door.
                </p>
            </div>

            {/* Filters */}
            <div className="px-8 max-w-7xl mx-auto pb-8">
                <div className="flex flex-wrap gap-3 justify-center">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                                activeFilter === f
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Cuisine Grid */}
            <div className="py-12 px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCuisines.map((cuisine, i) => (
                        <div key={i} className="rounded-3xl overflow-hidden group cursor-pointer relative h-64 hover:shadow-2xl transition-all">
                            <img src={cuisine.image} alt={cuisine.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className={`absolute inset-0 bg-gradient-to-t ${cuisine.color} opacity-60 group-hover:opacity-70 transition-opacity mix-blend-multiply`}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-2xl font-black mb-1">{cuisine.name}</h3>
                                <p className="text-sm opacity-90 font-medium">{cuisine.dishes}</p>
                            </div>
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Combos */}
            <div className="py-20 px-8 bg-neutral-50 dark:bg-neutral-800/50">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl font-black text-neutral-900 dark:text-white mb-6">Can't decide? Try our combos!</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-lg mb-10">Curated meal combos from multiple cuisines at special prices.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { name: 'Asian Fusion Box', price: '₹399', items: 'Sushi + Pad Thai + Dim Sum', emoji: '🥢' },
                            { name: 'Indian Thali', price: '₹299', items: 'Dal + Rice + Roti + Paneer', emoji: '🍛' },
                            { name: 'Western Feast', price: '₹499', items: 'Pizza + Burger + Fries + Cola', emoji: '🍔' },
                        ].map((combo, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:shadow-xl transition-all">
                                <span className="text-5xl block mb-4">{combo.emoji}</span>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{combo.name}</h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{combo.items}</p>
                                <span className="text-2xl font-black text-orange-600">{combo.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Cuisines;
