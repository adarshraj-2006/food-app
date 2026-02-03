import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../../components/context/CartContext/CartContext";
import FoodItem from "../../components/FoodItem/FoodItem";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import { useStore } from "../../context/StoreContext";
import {
    ChevronLeft,
    Star,
    Clock,
    Plus,
    Minus,
    Share2,
    Heart,
    ShieldCheck,
    Leaf
} from "lucide-react";

const FoodDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, updateQuantity, getItemQuantity } = useCart();
    const { food_list, url } = useStore();
    const [food, setFood] = useState<any>(null);

    useEffect(() => {
        if (food_list.length > 0) {
            const foundFood = food_list.find(item => item._id === id);
            if (foundFood) {
                setFood(foundFood);
                window.scrollTo(0, 0);
            }
        }
    }, [id, food_list]);

    if (!food) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Dish not found</h2>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 bg-red-500 text-white rounded-xl font-bold"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const quantity = getItemQuantity(food._id);
    const recommendations = food_list
        .filter(item => item.category === food.category && item._id !== food._id)
        .slice(0, 4);

    const placeholderImage = 'https://placehold.co/600x400/f97316/ffffff?text=' + encodeURIComponent(food.name);
    const imageSrc = food.image ? (food.image.startsWith('http') ? food.image : `${url}/images/${food.image}`) : placeholderImage;

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <Navbar />

            <main className="pt-24 pb-20 container mx-auto px-4 max-w-7xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-neutral-500 hover:text-red-500 transition-colors mb-8 font-bold"
                >
                    <ChevronLeft size={20} /> Back
                </button>

                <div className="flex flex-col lg:flex-row gap-12 mb-20">
                    {/* Left: Image Section */}
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                            <img
                                src={imageSrc}
                                alt={food.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Action Buttons on Image */}
                        <div className="absolute top-6 right-6 flex flex-col gap-3">
                            <button className="w-12 h-12 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md flex items-center justify-center text-neutral-600 dark:text-white shadow-lg hover:text-red-500 transition-colors">
                                <Heart size={22} />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md flex items-center justify-center text-neutral-600 dark:text-white shadow-lg hover:text-red-500 transition-colors">
                                <Share2 size={22} />
                            </button>
                        </div>
                    </div>

                    {/* Right: Info Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${food.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                                <div className={`w-2.5 h-2.5 rounded-full ${food.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                            </div>
                            <span className={`text-sm font-bold ${food.isVeg ? 'text-green-600' : 'text-red-600'}`}>
                                {food.isVeg ? 'VEGETARIAN' : 'NON-VEGETARIAN'}
                            </span>
                            {food.isBestseller && (
                                <span className="ml-4 px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-black rounded-full tracking-wider uppercase">
                                    Bestseller
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4 leading-tight">
                            {food.name}
                        </h1>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-600 text-white rounded-lg font-black text-sm">
                                <Star size={16} className="fill-current" />
                                {food.rating}
                            </div>
                            <span className="text-neutral-400 dark:text-neutral-500 font-medium">
                                {food.ratingCount}+ Reviews
                            </span>
                            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 font-bold">
                                <Clock size={16} />
                                {food.prepTime}
                            </div>
                        </div>

                        <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-10 font-medium">
                            {food.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-8 mb-10 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-1">Price</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-4xl font-black text-neutral-900 dark:text-white">₹{food.price}</span>
                                    {food.originalPrice && (
                                        <span className="text-xl text-neutral-400 line-through font-bold">₹{food.originalPrice}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 w-full sm:w-auto h-[64px]">
                                {quantity === 0 ? (
                                    <button
                                        onClick={() => addToCart(food._id)}
                                        className="w-full h-full bg-red-500 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95"
                                    >
                                        <Plus size={24} /> Add to Cart
                                    </button>
                                ) : (
                                    <div className="w-full h-full bg-red-500 rounded-2xl flex items-center justify-between px-6 shadow-xl shadow-red-500/20">
                                        <button
                                            onClick={() => updateQuantity(food._id, quantity - 1)}
                                            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                                        >
                                            <Minus size={24} className="text-white" />
                                        </button>
                                        <span className="text-2xl font-black text-white">{quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(food._id, quantity + 1)}
                                            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                                        >
                                            <Plus size={24} className="text-white" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold text-sm">
                                <ShieldCheck size={18} className="text-green-500" /> Quality Assured
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold text-sm">
                                <Leaf size={18} className="text-red-500" /> Fresh Ingredients
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                {recommendations.length > 0 && (
                    <section className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-neutral-900 dark:text-white">You Might Also Like</h2>
                            <Link to="/menu" className="text-red-500 font-bold hover:underline mb-1">View All</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {recommendations.map((item: any) => (
                                <FoodItem key={item._id} {...item} id={item._id} />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default FoodDetailPage;
