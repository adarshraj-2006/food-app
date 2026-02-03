import React from 'react';
import { restaurants } from '../data/data';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';


const RestaurantDisplay = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="py-8 relative" id="restaurant-display">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-neutral-900 dark:text-white">Top Restaurants Near You</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all shadow-sm group/btn"
                    >
                        <ChevronLeft size={20} className="text-neutral-600 dark:text-neutral-400 group-hover/btn:text-red-500" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all shadow-sm group/btn"
                    >
                        <ChevronRight size={20} className="text-neutral-600 dark:text-neutral-400 group-hover/btn:text-red-500" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="horizontal-scroll hide-scrollbar"
            >
                {restaurants.map((restaurant, index) => {
                    return (
                        <div key={index} className="w-[300px] md:w-[320px]">
                            <RestaurantCard
                                id={restaurant.id}
                                name={restaurant.name}
                                cuisine={restaurant.cuisine}
                                image={restaurant.image}
                                rating={restaurant.rating}
                                ratingCount={restaurant.ratingCount}
                                deliveryTime={restaurant.deliveryTime}
                                priceRange={restaurant.priceRange}
                                distance={restaurant.distance}
                                hasOffer={restaurant.hasOffer}
                                offerText={restaurant.offerText}
                                isPromoted={restaurant.isPromoted || false}
                            />
                        </div>
                    );
                })}
            </div>
            <hr className="my-10 border-neutral-200 dark:border-neutral-800" />
        </div>
    );
};


export default RestaurantDisplay;
