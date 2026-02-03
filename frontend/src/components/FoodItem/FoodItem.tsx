import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Minus, Clock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface FoodItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  ratingCount?: number;
  isVeg?: boolean;
  restaurantId?: string;
  restaurantName?: string;
  prepTime?: string;
  isBestseller?: boolean;
}

const FoodItem: React.FC<FoodItemProps> = ({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  rating = 4.5,
  ratingCount = 100,
  isVeg = true,
  restaurantId = "1",
  restaurantName = "Kitchen",
  prepTime = '25-30 min',
  isBestseller = false,
}) => {
  const { cartItems, addToCart, removeFromCart, url } = useStore();

  const quantity = cartItems[id] || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Pass only ID to StoreContext addToCart, or modify StoreContext if it needs more info (StoreContext currently just takes ID)
    // Checking StoreContext: addToCart(itemId)
    addToCart(id);
  };

  const handleUpdateQuantity = (e: React.MouseEvent, newQuantity: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (newQuantity > quantity) {
      addToCart(id);
    } else {
      removeFromCart(id);
    }
  };

  // Determine image source - if it's external URL, use it directly, otherwise use the backend uploads path
  const placeholderImage = 'https://placehold.co/600x400/f97316/ffffff?text=' + encodeURIComponent(name);
  const imageSrc = image ? (image.startsWith('http') ? image : `${url}/images/${image}`) : placeholderImage;

  return (
    <Link
      to={`/food/${id}`}
      className="group block bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 border border-neutral-100 dark:border-neutral-700 hover:border-orange-100 dark:hover:border-orange-900/30"
    >
      <div className="relative w-full h-0 pb-[75%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
        <img
          src={imageSrc}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {isBestseller && (
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30 z-20">
            Bestseller
          </span>
        )}
        {originalPrice && originalPrice > price && (
          <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 z-20">
            {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
          </span>
        )}

        {/* Add to Cart Button */}
        <div className="absolute bottom-3 right-3 z-30 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-white text-orange-600 font-bold shadow-xl hover:bg-orange-50 transition-all active:scale-95"
            >
              ADD
              <Plus className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white shadow-xl">
              <button
                onClick={(e) => handleUpdateQuantity(e, quantity - 1)}
                className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 text-neutral-600 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-bold text-neutral-900">{quantity}</span>
              <button
                onClick={(e) => handleUpdateQuantity(e, quantity + 1)}
                className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center hover:bg-green-600 text-white shadow-lg shadow-green-500/30 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 relative">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 relative z-0">
            <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${isVeg ? 'border-green-600' : 'border-red-600'}`}>
              <div className={`w-2 h-2 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
            </div>
            <h3 className="font-bold text-lg text-neutral-900 dark:text-white line-clamp-1 group-hover:text-orange-600 transition-colors">
              {name}
            </h3>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-600 text-white text-xs font-bold shadow-md shadow-green-600/20">
            <Star className="w-3 h-3 fill-current" />
            {rating.toFixed(1)}
          </div>
        </div>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3 font-medium">{description}</p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl text-neutral-900 dark:text-white">₹{price}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-neutral-400 line-through font-medium">₹{originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 bg-neutral-50 dark:bg-neutral-800 px-2.5 py-1 rounded-full border border-neutral-100 dark:border-neutral-700">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            {prepTime}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FoodItem;
