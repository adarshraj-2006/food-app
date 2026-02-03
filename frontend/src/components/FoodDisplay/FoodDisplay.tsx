import React, { useRef, useContext } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface FoodDisplayProps {
  category: string;
}

const FoodDisplay: React.FC<FoodDisplayProps> = ({ category }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { food_list } = useStore();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const filteredList =
    (food_list || []).filter((item: any) => category === 'all' || item.category === category);

  return (
    <div className="py-8 w-full relative" id="food-display">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
          {category === 'all' ? 'Top Dishes Near You' : `${category} Specialties`}
        </h2>
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
        {filteredList.map((item: any) => (
          <div key={item._id} className="w-[280px] md:w-[320px]">
            <FoodItem
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              rating={4.2 + (Math.random() * 0.7)}
              ratingCount={150 + Math.floor(Math.random() * 300)}
              isVeg={!['Chicken', 'Meat', 'Noodles'].some(s => item.category.includes(s))}
              prepTime={`${20 + Math.floor(Math.random() * 10)}-${30 + Math.floor(Math.random() * 10)} min`}
            />
          </div>
        ))}
      </div>


      {filteredList.length === 0 && (
        <div className="text-center py-20 text-neutral-400">
          <h3 className="text-xl font-bold">No dishes found for this category</h3>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
