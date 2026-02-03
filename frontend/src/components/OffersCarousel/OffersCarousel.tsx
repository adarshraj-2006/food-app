import React from 'react';
import { ArrowRight } from 'lucide-react';

const offers = [
    {
        id: 1,
        title: "50% OFF up to ₹100",
        subtitle: "Use code WELCOME50",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
        bg: "from-orange-900 to-black",
        code: "WELCOME50"
    },
    {
        id: 2,
        title: "Free Delivery",
        subtitle: "On orders above ₹299",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
        bg: "from-blue-900 to-black",
        code: "FREEDELIVERY"
    },
    {
        id: 3,
        title: "₹75 OFF on first order",
        subtitle: "Use code FIRST75",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
        bg: "from-red-900 to-black",
        code: "FIRST75"
    }
];

const OffersCarousel = () => {
    return (
        <div className="py-8 w-full">
            <div className="flex items-center justify-between mb-6 px-4">
                <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Best Offers For You</h2>
                <button className="flex items-center gap-1 text-red-500 font-bold hover:gap-2 transition-all">
                    See all <ArrowRight size={18} />
                </button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-6 px-4 no-scrollbar snap-x">
                {offers.map((offer) => (
                    <div
                        key={offer.id}
                        className={`min-w-[300px] md:min-w-[400px] h-[220px] rounded-[32px] relative overflow-hidden flex-shrink-0 snap-start bg-gradient-to-r ${offer.bg} group cursor-pointer`}
                    >
                        {/* Background Image with Overlay */}
                        <div className="absolute top-0 right-0 w-2/3 h-full">
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                style={{
                                    WebkitMaskImage: 'linear-gradient(to right, transparent, black)',
                                    maskImage: 'linear-gradient(to right, transparent, black)'
                                }}
                            />
                        </div>

                        <div className="absolute inset-0 flex flex-col justify-center p-8 z-10 w-2/3">
                            <h3 className="text-3xl font-black text-white mb-2 leading-tight drop-shadow-md">
                                {offer.title}
                            </h3>
                            <p className="text-white/80 font-medium mb-6 text-sm">
                                {offer.subtitle}
                            </p>
                            <div className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl w-fit text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                {offer.code}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OffersCarousel;
