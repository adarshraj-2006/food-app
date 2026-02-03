import React from 'react';
import { Wallet, CreditCard, History, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const UserWallet = () => {
    const transactions = [
        { id: 1, type: 'credit', title: 'Refund for Order #1234', amount: 250, date: 'Today, 2:30 PM' },
        { id: 2, type: 'debit', title: 'Payment for Order #5678', amount: 450, date: 'Yesterday, 8:15 PM' },
        { id: 3, type: 'credit', title: 'Cashback Received', amount: 50, date: '12 Jan, 10:00 AM' },
    ];

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="relative z-10">
                    <p className="text-orange-100 font-medium mb-1">Total Balance</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">₹</span>
                        <span className="text-5xl font-bold">750.00</span>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-xl font-bold shadow-sm hover:bg-orange-50 transition-colors">
                            <Plus className="w-5 h-5" /> Add Money
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">Recent Transactions</h2>
                <div className="space-y-4">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === 'credit'
                                        ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                                        : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                                    }`}>
                                    {tx.type === 'credit' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-neutral-900 dark:text-white">{tx.title}</h4>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{tx.date}</p>
                                </div>
                            </div>
                            <span className={`font-bold ${tx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-neutral-900 dark:text-white'
                                }`}>
                                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Start imports for missing components
import { Plus } from 'lucide-react';

export default UserWallet;
