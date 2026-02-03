import React, { useRef } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { ChevronLeft, ChevronRight } from 'lucide-react';



interface FoodItemType {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
}

interface FoodSectionProps {
    title: string;
    items: FoodItemType[];
}

const FoodSection: React.FC<FoodSectionProps> = ({ title, items }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    // Helper to generate consistent numbers from a string (ID)
    const getConsistentNumber = (str: string, min: number, max: number) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const range = max - min;
        return min + (Math.abs(hash) % range);
    };

    return (
        <div className="py-8 relative" id={`food-section-${title.replace(/\s+/g, '-').toLowerCase()}`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-neutral-900 dark:text-white">{title}</h2>
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
                {items.map((item, index) => {
                    const seed = item._id || item.name;
                    const rating = 4 + (getConsistentNumber(seed, 0, 10) / 10);
                    const ratingCount = getConsistentNumber(seed + "count", 50, 250);
                    const minTime = getConsistentNumber(seed + "time", 15, 30);
                    const maxTime = minTime + 10;

                    return (
                        <div key={index} className="w-[280px] md:w-[320px]">
                            <FoodItem
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                rating={rating}
                                ratingCount={ratingCount}
                                isVeg={!['Chicken', 'Non-Veg', 'Beef', 'Pork', 'Fish'].some(s => item.category.includes(s))}
                                prepTime={`${minTime}-${maxTime} min`}
                                restaurantName="Tasty Bites"
                            />
                        </div>
                    );
                })}
            </div>
            <hr className="my-10 border-neutral-200 dark:border-neutral-800" />
        </div>
    );
};


export default FoodSection;
