import React from "react";
import { Link } from "react-router-dom";
import {
    User,
    Package,
    Heart,
    Wallet,
    Bell,
    HelpCircle,
    Settings,
    ChevronRight
} from "lucide-react";

const UserOverview = () => {
    const sections = [
        {
            title: "Profile",
            description: "Manage your personal details, saved addresses, and account information.",
            icon: User,
            path: "/user/profile",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Orders",
            description: "View your past orders, track current orders, and reorder your favorite meals.",
            icon: Package,
            path: "/user/orders",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            title: "Favorites",
            description: "Access restaurants and dishes you’ve saved for quick ordering.",
            icon: Heart,
            path: "/user/favorites",
            color: "text-red-600",
            bgColor: "bg-red-50",
        },
        {
            title: "Wallet",
            description: "Check wallet balance, cashback, refunds, and payment transactions.",
            icon: Wallet,
            path: "/user/wallet",
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Notifications",
            description: "Stay updated on order status, offers, and important account alerts.",
            icon: Bell,
            path: "/user/notifications",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "Help",
            description: "Get support for orders, payments, and account-related issues.",
            icon: HelpCircle,
            path: "/user/help",
            color: "text-amber-600",
            bgColor: "bg-amber-50",
        },
        {
            title: "Settings",
            description: "Manage preferences, privacy, security, language, and notifications.",
            icon: Settings,
            path: "/user/settings",
            color: "text-slate-600",
            bgColor: "bg-slate-50",
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-neutral-900 mb-2">My Dashboard</h1>
                <p className="text-neutral-500 font-medium">Welcome back! Manage your account and track your activity here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => (
                    <Link
                        key={section.title}
                        to={section.path}
                        className="group relative bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-200/50 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${section.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <section.icon className={section.color} size={28} />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                                {section.title}
                                <ChevronRight size={18} className="text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
                            </h3>
                            <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                                {section.description}
                            </p>
                        </div>

                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className={`w-8 h-8 rounded-full ${section.bgColor} flex items-center justify-center`}>
                                <ChevronRight size={16} className={section.color} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default UserOverview;
