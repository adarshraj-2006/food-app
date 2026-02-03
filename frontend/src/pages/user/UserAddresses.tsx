import React from 'react';
import { MapPin, Plus, Trash2, Edit2, CheckCircle } from 'lucide-react';

const UserAddresses = () => {
    // Placeholder for now
    const userAddresses = [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">My Addresses</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 font-medium">
                    <Plus className="w-4 h-4" />
                    Add New
                </button>
            </div>

            {userAddresses.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-neutral-900 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700">
                    <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                        <MapPin size={24} />
                    </div>
                    <p className="text-neutral-500 font-medium">No saved addresses found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mapping logic would go here when backend supports it */}
                </div>
            )}
        </div>
    );
};


export default UserAddresses;
