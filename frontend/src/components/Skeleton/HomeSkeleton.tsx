import React from 'react';
import Skeleton from './Skeleton';

export const CategorySkeleton = () => (
    <div className="flex flex-col items-center gap-4 flex-shrink-0">
        <Skeleton variant="circular" width="120px" height="120px" className="lg:w-[140px] lg:h-[140px]" />
        <Skeleton variant="text" width="80px" height="20px" />
    </div>
);

export const FoodItemSkeleton = () => (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-700 h-full flex flex-col">
        <Skeleton variant="rectangular" className="w-full aspect-[4/3]" />
        <div className="p-4 flex-1">
            <div className="flex justify-between items-start mb-2">
                <Skeleton variant="text" width="60%" height="24px" />
                <Skeleton variant="rounded" width="40px" height="20px" />
            </div>
            <Skeleton variant="text" width="90%" height="16px" />
            <Skeleton variant="text" width="80%" height="16px" />
            <div className="flex justify-between items-center mt-4">
                <Skeleton variant="text" width="50px" height="24px" />
                <Skeleton variant="rounded" width="80px" height="28px" />
            </div>
        </div>
    </div>
);

export const RestaurantSkeleton = () => (
    <div className="w-[300px] md:w-[320px] flex-shrink-0">
        <Skeleton variant="rounded" className="w-full aspect-[16/9] mb-3" />
        <Skeleton variant="text" width="70%" height="24px" className="mb-1" />
        <Skeleton variant="text" width="50%" height="16px" className="mb-2" />
        <div className="flex gap-2">
            <Skeleton variant="text" width="40px" height="16px" />
            <Skeleton variant="text" width="40px" height="16px" />
        </div>
    </div>
);

export const OfferSkeleton = () => (
    <div className="min-w-[300px] md:min-w-[400px] h-[220px] rounded-[32px] overflow-hidden flex-shrink-0">
        <Skeleton variant="rectangular" className="w-full h-full" />
    </div>
);

const HomeSkeleton = () => {
    return (
        <div className="flex flex-col gap-8 md:gap-16 w-full opacity-80 animate-pulse">
            {/* Offers section skeleton */}
            <div className="py-8">
                <div className="flex justify-between items-center mb-6 px-4">
                    <Skeleton variant="text" width="200px" height="32px" />
                    <Skeleton variant="text" width="80px" height="24px" />
                </div>
                <div className="flex gap-6 overflow-x-auto pb-6 px-4 hide-scrollbar">
                    {[1, 2, 3].map((i) => <OfferSkeleton key={i} />)}
                </div>
            </div>

            {/* Restaurant section skeleton */}
            <div className="py-8">
                <div className="flex justify-between items-center mb-6 px-4">
                    <Skeleton variant="text" width="250px" height="32px" />
                    <div className="flex gap-2">
                        <Skeleton variant="circular" width="40px" height="40px" />
                        <Skeleton variant="circular" width="40px" height="40px" />
                    </div>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-6 px-4 hide-scrollbar">
                    {[1, 2, 3, 4].map((i) => <RestaurantSkeleton key={i} />)}
                </div>
            </div>

            {/* Menu categories skeleton */}
            <div className="flex flex-col gap-6">
                <div className="text-center max-w-[90%] md:max-w-[60%] mx-auto space-y-4">
                    <Skeleton variant="text" width="200px" height="40px" className="mx-auto" />
                    <Skeleton variant="text" width="100%" height="16px" />
                    <Skeleton variant="text" width="100%" height="16px" />
                </div>
                <div className="flex gap-10 overflow-x-auto py-6 px-4 justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <CategorySkeleton key={i} />)}
                </div>
            </div>

            {/* Food sections skeleton */}
            <div className="space-y-12 px-4">
                {[1, 2].map((section) => (
                    <div key={section} className="space-y-6">
                        <Skeleton variant="text" width="200px" height="32px" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((item) => <FoodItemSkeleton key={item} />)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeSkeleton;
