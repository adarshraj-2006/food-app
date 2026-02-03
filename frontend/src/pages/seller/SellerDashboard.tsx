import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Utensils, DollarSign, Settings, ChevronRight } from 'lucide-react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';

const SellerDashboard = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/seller/dashboard' },
    { icon: ShoppingBag, label: 'Orders', path: '/seller/orders' },
    { icon: Utensils, label: 'Menu Items', path: '/seller/menu' },
    { icon: DollarSign, label: 'Earnings', path: '/seller/earnings' },
    { icon: Settings, label: 'Settings', path: '/seller/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black flex flex-col transition-colors duration-300">
      <Navbar />
      <div className="pt-24 flex-grow px-4 lg:px-8 max-w-7xl mx-auto w-full flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 h-fit">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 p-6">
            <div className="pb-6 border-b border-neutral-100 dark:border-neutral-800 mb-6">
              <h2 className="text-xl font-black text-neutral-900 dark:text-white">Seller Hub</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Manage your restaurant</p>
            </div>

            <nav className="space-y-1.5">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${isActive(item.path)
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-orange-500"
                    }`}
                >
                  <item.icon size={20} />
                  {item.label}
                  {isActive(item.path) && <ChevronRight className="ml-auto" size={16} />}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-10">
          {location.pathname === '/seller/dashboard' ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Basic Stats Overview */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
                  <p className="text-gray-500 dark:text-neutral-400 mb-1 text-sm font-medium">Today's Sales</p>
                  <h3 className="text-3xl font-black text-neutral-900 dark:text-white">₹12,450</h3>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
                  <p className="text-gray-500 dark:text-neutral-400 mb-1 text-sm font-medium">Active Orders</p>
                  <h3 className="text-3xl font-black text-neutral-900 dark:text-white">8</h3>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
                  <p className="text-gray-500 dark:text-neutral-400 mb-1 text-sm font-medium">Total Menu Items</p>
                  <h3 className="text-3xl font-black text-neutral-900 dark:text-white">45</h3>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-[24px] p-8 border border-neutral-100 dark:border-neutral-800 text-center py-20">
                <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LayoutDashboard className="text-neutral-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Detailed Analytics Coming Soon</h3>
                <p className="text-neutral-500 dark:text-neutral-400">We are working on bringing you detailed charts and insights.</p>
              </div>
            </div>
          ) : <Outlet />}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SellerDashboard;
