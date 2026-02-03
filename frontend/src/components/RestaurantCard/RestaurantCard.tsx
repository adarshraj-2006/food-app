import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';

interface RestaurantCardProps {
    id: string;
    name: string;
    cuisine: string[];
    image: string;
    rating: number;
    ratingCount: number;
    deliveryTime: string;
    priceRange: string;
    distance: string;
    hasOffer?: boolean;
    offerText?: string;
    isPromoted?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
    name,
    cuisine,
    image,
    rating,
    deliveryTime,
    priceRange,
    distance,
    hasOffer,
    offerText,
    isPromoted,
}) => {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-[28px] overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700">
            {/* Image Container */}
            <div className="relative w-full h-0 pb-[62.5%] overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay for Text Readability if needed */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent"></div>

                {/* Offer Text Overlay */}
                {hasOffer && (
                    <div className="absolute bottom-4 left-4 right-4 font-black text-xl text-white drop-shadow-md flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        {offerText}
                    </div>
                )}

                {/* Promoted Badge */}
                {isPromoted && (
                    <div className="absolute top-4 left-4 bg-neutral-800/80 backdrop-blur-sm text-neutral-200 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                        Promoted
                    </div>
                )}

                {/* Delivery Time Badge */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-neutral-800 flex items-center gap-1 shadow-sm">
                    <Clock size={12} className="text-green-600" /> {deliveryTime}
                </div>
            </div>

            {/* Content Container */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-xl text-neutral-900 dark:text-white truncate pr-2 group-hover:text-orange-500 transition-colors">
                        {name}
                    </h3>
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-white text-xs font-bold leading-none ${rating >= 4.0 ? 'bg-green-600' : 'bg-orange-500'}`}>
                        {rating} <Star size={10} fill="white" strokeWidth={0} />
                    </div>
                </div>

                <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-sm font-medium mb-3">
                    <p className="truncate max-w-[70%]">{cuisine.join(', ')}</p>
                    <p className="flex-shrink-0">{priceRange}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-400 uppercase tracking-wide">
                    <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        {distance}
                    </div>
                    <span className="text-green-600 font-extrabold flex items-center gap-1">
                        Free Delivery
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
