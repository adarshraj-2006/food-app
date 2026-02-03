import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useStore } from '../../../context/StoreContext';
import { Search, ShoppingBag, MapPin, ChevronDown, User, Package, Wallet, Settings, LogOut, Heart, Bell, HelpCircle, Menu, X, Percent, Users } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItemCount, food_list } = useStore();
  const totalItems = getTotalItemCount();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToElement = (element: HTMLElement) => {
    const offset = 100; // Account for fixed navbar
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().trim();

    // 1. Check for category matches to scroll
    const categoryMap: { [key: string]: string } = {
      'roll': 'rolls',
      'salad': 'salads',
      'veg': 'pure-veg',
      'pure veg': 'pure-veg',
      'noodle': 'noodles',
      'sandwich': 'sandwich',
      'desert': 'deserts',
      'dessert': 'deserts',
      'cake': 'cakes',
      'pasta': 'pasta',
      'popular': 'popular',
      'offer': 'offers',
      'restaurant': 'restaurants'
    };

    const matchedCategory = Object.keys(categoryMap).find(key => query.includes(key));

    if (matchedCategory && (location.pathname === '/' || location.pathname === '/home')) {
      const element = document.getElementById(categoryMap[matchedCategory]);
      if (element) {
        scrollToElement(element);
        setSearchQuery('');
        return;
      }
    }

    // 2. Check for food name matches in food_list
    const matchedFood = (food_list || []).find((food: any) => food.name.toLowerCase().includes(query));
    if (matchedFood && (location.pathname === '/' || location.pathname === '/home')) {
      const element = document.getElementById('food-list');
      if (element) {
        scrollToElement(element);
        setSearchQuery('');
        return;
      }
    }

    // Default behavior if not a direct match or not on home page
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  const menuItems = [
    { icon: User, label: 'Profile', path: '/user/profile' },
    { icon: Package, label: 'Orders', path: '/user/orders' },
    { icon: Heart, label: 'Favorites', path: '/user/favorites' },
    { icon: Wallet, label: 'Wallet', path: '/user/wallet' },
    { icon: Bell, label: 'Notifications', path: '/user/notifications' },
    { icon: HelpCircle, label: 'Help', path: '/user/help' },
    { icon: Settings, label: 'Settings', path: '/user/settings' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
        <div className="flex items-center justify-between h-[80px] gap-8">

          {/* Left Section: Logo & Location */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform rotate-0 group-hover:rotate-12">
                <span className="text-white font-black text-xl tracking-tighter">T</span>
              </div>
              <span className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight group-hover:text-orange-500 transition-all">Tomato.</span>
            </Link>

            <div className="hidden xl:flex items-center gap-3 group cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 p-2 pr-4 rounded-full border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-all">
              <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="flex items-center gap-1 font-bold text-sm text-neutral-900 dark:text-white group-hover:text-orange-600 transition-colors">
                  <span>Home</span>
                  <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[140px]">Koramangala, Bangalore</p>
              </div>
            </div>
          </div>

          {/* Middle Section: Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl px-8">
            <form onSubmit={handleSearch} className="w-full relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-orange-500 transition-colors z-10" />
              <input
                type="text"
                placeholder="Search for restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-14 pr-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-orange-500/20 text-sm font-medium transition-all"
              />
            </form>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-6">

            <nav className="hidden md:flex items-center gap-6 mr-4">
              <Link to="/" className="text-neutral-600 dark:text-neutral-300 hover:text-orange-600 font-bold transition-colors text-sm uppercase tracking-wide">Home</Link>
              <Link to="/about" className="text-neutral-600 dark:text-neutral-300 hover:text-orange-600 font-bold transition-colors text-sm uppercase tracking-wide">About</Link>
              <Link to="/contact" className="text-neutral-600 dark:text-neutral-300 hover:text-orange-600 font-bold transition-colors text-sm uppercase tracking-wide">Contact</Link>
            </nav>

            <Link
              to="/cart"
              className="group flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-800 hover:text-orange-600 transition-all font-medium relative border border-transparent hover:border-orange-100 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <div className="relative">
                <ShoppingBag size={22} className="group-hover:-translate-y-0.5 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-[10px] font-bold text-white shadow-md border-2 border-white dark:border-neutral-900 animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </Link>

            {/* Auth Section */}
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 pl-2 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all border border-transparent hover:border-neutral-200 group"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-neutral-800 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-lg shadow-inner group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-5 bg-orange-50 dark:bg-neutral-800/50 border-b border-orange-100 dark:border-neutral-800">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/30">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-lg text-neutral-900 dark:text-white leading-tight">{user.name}</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                      {menuItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-orange-600 dark:hover:text-orange-400 transition-all font-medium"
                        >
                          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/20 text-neutral-500 dark:text-neutral-400 group-hover:text-orange-600 transition-colors">
                            <item.icon className="w-4 h-4" />
                          </div>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div className="p-2 border-t border-neutral-100 dark:border-neutral-800">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full font-medium"
                      >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center justify-center px-6 py-2.5 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/25 active:scale-95"
                >
                  <User size={18} className="mr-2" />
                  Sign In
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-neutral-600 dark:text-neutral-300"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X /> : <Menu />}
            </button>

          </div>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 top-[80px] bg-white dark:bg-neutral-900 z-40 overflow-y-auto border-t border-neutral-200 dark:border-neutral-800">
          <div className="p-4 space-y-4 animate-in slide-in-from-top-5 duration-200">
            {/* Mobile Location */}
            <div className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl">
              <MapPin className="text-orange-500" />
              <div>
                <p className="font-bold text-neutral-900 dark:text-white">Home - Koramangala</p>
                <p className="text-xs text-neutral-500">Bangalore, India</p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { name: 'Offers', path: '/offers', icon: Percent },
                { name: 'Help', path: '/help', icon: HelpCircle },
              ].map(link => (
                <Link key={link.path} to={link.path} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-medium transition-colors" onClick={() => setShowMobileMenu(false)}>
                  <link.icon className="text-neutral-500" />
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
