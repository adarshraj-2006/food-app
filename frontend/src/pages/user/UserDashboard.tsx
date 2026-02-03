// src/pages/user/UserDashboard.jsx

import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext/AuthContext";
import {
  User,
  Package,
  MapPin,
  Wallet,
  Heart,
  Bell,
  Star,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/user/dashboard" },
    { icon: User, label: "Profile", path: "/user/profile" },
    { icon: Package, label: "Orders", path: "/user/orders" },
    { icon: Heart, label: "Favorites", path: "/user/favorites" },
    { icon: MapPin, label: "Addresses", path: "/user/addresses" },
    { icon: Wallet, label: "Wallet", path: "/user/wallet" },
    { icon: Bell, label: "Notifications", path: "/user/notifications" },
    { icon: Star, label: "Reviews", path: "/user/reviews" },
    { icon: HelpCircle, label: "Help & Support", path: "/user/help" },
    { icon: Settings, label: "Settings", path: "/user/settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow px-4 lg:px-8 max-w-7xl mx-auto w-full flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 h-fit">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
            <div className="flex items-center gap-4 pb-6 border-b border-neutral-100">
              <img
                src={
                  user?.avatar ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                }
                alt={user?.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-red-50"
              />
              <div className="min-w-0">
                <h2 className="font-bold text-lg text-neutral-900 truncate">{user?.name}</h2>
                <p className="text-sm text-neutral-500 truncate">{user?.email}</p>
              </div>
            </div>

            <nav className="mt-6 space-y-1.5">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${isActive(item.path)
                    ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-red-500"
                    }`}
                >
                  <item.icon size={20} />
                  {item.label}
                  {isActive(item.path) && <ChevronRight className="ml-auto" size={16} />}
                </Link>
              ))}

              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-neutral-600 hover:bg-red-50 hover:text-red-600 w-full transition-colors font-medium mt-4 border-t border-neutral-100"
              >
                <LogOut size={20} />
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 min-h-[500px]">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
