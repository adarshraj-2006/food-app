import React, { useState } from "react";
import { useTheme } from "../../components/context/ThemeContext/ThemeContext";
import {
    Moon,
    Sun,
    Bell,
    Lock,
    Eye,
    Globe,
    ShieldCheck,
    Mail,
    Smartphone,
    ChevronRight,
    User
} from "lucide-react";

const UserSettings = () => {
    const { theme, toggleTheme } = useTheme();

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sms: false,
        offers: true
    });

    const [privacy, setPrivacy] = useState({
        publicProfile: false,
        orderHistory: true
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <div>
                <h1 className="text-3xl font-black text-neutral-900 dark:text-white mb-2">Account Settings</h1>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium">Manage your preferences, security, and app appearance.</p>
            </div>

            <div className="space-y-6">
                {/* Notifications Section */}
                <section className="bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                            <Bell size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Notifications</h2>
                    </div>

                    <div className="space-y-3">
                        {[
                            { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email', icon: Mail },
                            { id: 'push', label: 'Push Notifications', desc: 'Instant alerts on your device', icon: Smartphone },
                            { id: 'offers', label: 'Marketing Offers', desc: 'Discounts and special promotions', icon: ShieldCheck }
                        ].map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="text-neutral-400 dark:text-neutral-500">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-neutral-900 dark:text-white">{item.label}</p>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setNotifications({ ...notifications, [item.id]: !notifications[item.id as keyof typeof notifications] })}
                                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${notifications[item.id as keyof typeof notifications] ? 'bg-red-500' : 'bg-neutral-300'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${notifications[item.id as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Security & Privacy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section className="bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Lock size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Security</h2>
                        </div>
                        <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors group">
                            <span className="font-bold text-neutral-900 dark:text-white">Change Password</span>
                            <ChevronRight size={18} className="text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-all" />
                        </button>
                    </section>

                    <section className="bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                                <Eye size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Privacy</h2>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-neutral-900 dark:text-white">Public Profile</span>
                            <button
                                onClick={() => setPrivacy({ ...privacy, publicProfile: !privacy.publicProfile })}
                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${privacy.publicProfile ? 'bg-red-500' : 'bg-neutral-300'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${privacy.publicProfile ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </section>
                </div>

                {/* Language & Regions */}
                <section className="bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                            <Globe size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Language & Region</h2>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50">
                        <span className="font-bold text-neutral-900 dark:text-white">Default Language</span>
                        <select className="bg-transparent font-bold text-red-500 outline-none cursor-pointer">
                            <option>English (US)</option>
                            <option>Hindi</option>
                            <option>Spanish</option>
                        </select>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UserSettings;
