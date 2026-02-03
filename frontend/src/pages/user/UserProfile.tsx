// src/pages/user/UserProfile.jsx

import React from "react";
import { useAuth } from "../../components/context/AuthContext/AuthContext";
import { Package, MapPin, Wallet, Star, Edit, Camera } from "lucide-react";

const UserProfile = () => {
  const { user: authUser } = useAuth();

  const user = {
    name: authUser?.name || "User",
    email: authUser?.email || "user@example.com",
    phone: "+91 9876543210", // Backend doesn 't return phone yet, keep placeholder or fetch profile
    avatar:
      authUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
  };

  const stats = [
    { icon: Package, label: "Total Orders", value: "0", color: "text-blue-600", bg: "bg-blue-100" }, // Ideally fetch order count
    { icon: MapPin, label: "Saved Addresses", value: "0", color: "text-purple-600", bg: "bg-purple-100" },
    { icon: Wallet, label: "Wallet Balance", value: "₹0", color: "text-green-600", bg: "bg-green-100" },
    { icon: Star, label: "Reviews Posted", value: "0", color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-neutral-900 rounded-[32px] p-8 shadow-xl shadow-neutral-100 dark:shadow-none border border-neutral-100 dark:border-neutral-800 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-orange-400 to-red-500 opacity-90"></div>

        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 mt-12">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-[2rem] object-cover ring-4 ring-white dark:ring-neutral-900 shadow-lg"
            />
            <button className="absolute bottom-2 right-[-10px] p-2 bg-neutral-900 text-white rounded-full shadow-lg hover:bg-neutral-800 transition-colors">
              <Camera size={16} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left mb-2">
            <h1 className="text-3xl font-black text-neutral-900 dark:text-white mb-1">{user.name}</h1>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium">{user.email} • {user.phone}</p>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl hover:scale-105 transition-transform shadow-lg font-bold">
            <Edit size={18} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-neutral-900 rounded-[24px] p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all group"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <p className="text-3xl font-black text-neutral-900 dark:text-white mb-1">{stat.value}</p>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity / Additional Section (Example) */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-[32px] p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Join Tomato Gold</h3>
          <p className="text-neutral-300 mb-6 max-w-md">Get unlimited free delivery and up to 30% extra discounts on dining and delivery.</p>
          <button className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:gap-3 transition-all flex items-center gap-2">
            Explore Plans <Wallet size={18} />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 blur-[100px] opacity-20"></div>
      </div>
    </div>
  );
};

export default UserProfile;
