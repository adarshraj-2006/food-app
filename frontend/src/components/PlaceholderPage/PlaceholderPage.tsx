import React from 'react';
import { Construction } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlaceholderPage = ({ title }: { title: string }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white dark:bg-neutral-800 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-700">
            <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6 animate-pulse">
                <Construction className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">{title}</h1>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-8">
                We're working hard to bring you this feature. Stay tuned for updates!
            </p>
            <Link
                to="/"
                className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
};

export default PlaceholderPage;
