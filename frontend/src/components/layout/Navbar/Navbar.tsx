import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useStore } from '../../../context/StoreContext';
import { Search, ShoppingBag, MapPin, ChevronDown, User, Package, Wallet, Settings, LogOut, Heart, Bell, HelpCircle, Menu, X, Percent, Users, Home, TrendingUp, UtensilsCrossed, Briefcase, Handshake, Shield, FileText, Phone, Store, Flame } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItemCount, food_list } = useStore();
  const totalItems = getTotalItemCount();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [address, setAddress] = useState({ title: 'Koramangala', subtitle: 'Bangalore, India' });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          if (data && data.address) {
             const city = data.address.city || data.address.town || data.address.suburb || 'Current Location';
             const state = data.address.state || data.address.country || '';
             setAddress({ title: city, subtitle: state });
          }
        } catch (error) {
          console.error("Error fetching location", error);
        }
      });
    }
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
    setShowMobileMenu(false);
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

            <div className="hidden xl:flex items-center gap-3 group cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 p-2 pr-4 rounded-full border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-all" onClick={() => {}}>
              <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="flex items-center gap-1 font-bold text-sm text-neutral-900 dark:text-white group-hover:text-orange-600 transition-colors">
                  <span>Home</span>
                  <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[140px]">{address.title}, {address.subtitle}</p>
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

            {/* Main Menu Toggle */}
            <button
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-neutral-800 rounded-full transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X /> : <Menu />}
            </button>

          </div>
        </div>

      </div>

      {/* Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 top-[80px] bg-white/50 backdrop-blur-sm dark:bg-neutral-900/50 z-40 overflow-y-auto border-t border-neutral-200 dark:border-neutral-800 flex justify-end" onClick={(e) => {
          if (e.target === e.currentTarget) setShowMobileMenu(false);
        }}>
          <div className="w-full max-w-sm bg-white dark:bg-neutral-900 min-h-screen p-6 space-y-8 animate-in slide-in-from-right duration-300 shadow-2xl border-l border-neutral-100 dark:border-neutral-800">
            
            {/* User Profile Info / Greeting */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4 pb-6 border-b border-neutral-100 dark:border-neutral-800">
                <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-orange-500/30">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <p className="font-bold text-xl text-neutral-900 dark:text-white leading-tight">{user.name}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{user.email}</p>
                </div>
              </div>
            ) : (
                <div className="pb-6 border-b border-neutral-100 dark:border-neutral-800 flex flex-col gap-4">
                  <p className="font-bold text-xl text-neutral-900 dark:text-white">Welcome to Tomato</p>
                  <Link to="/login" onClick={() => setShowMobileMenu(false)} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25">
                    <User size={20} />
                    Sign In / Sign Up
                  </Link>
                </div>
            )}

            {/* Location */}
            <div className="flex items-center gap-4 px-2">
              <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-orange-500 w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-neutral-900 dark:text-white truncate">Home - {address.title}</p>
                <p className="text-sm text-neutral-500 truncate">{address.subtitle}</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Explore */}
              <div>
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 px-2">Explore</h3>
                <nav className="space-y-1">
                  {[
                    { name: 'Home', path: '/', icon: Home },
                    { name: 'Offers & Deals', path: '/offers', icon: Percent },
                    { name: 'Trending Now', path: '/trending', icon: Flame },
                    { name: 'Cuisines', path: '/cuisines', icon: UtensilsCrossed },
                  ].map(link => (
                    <Link key={link.path} to={link.path} className={`flex items-center gap-4 p-3 rounded-xl font-semibold transition-colors group ${location.pathname === link.path ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`} onClick={() => setShowMobileMenu(false)}>
                      <link.icon className={`w-5 h-5 ${location.pathname === link.path ? 'text-orange-500' : 'text-neutral-400 group-hover:text-orange-500'} transition-colors`} />
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 px-2">Company</h3>
                <nav className="space-y-1">
                  {[
                    { name: 'About Us', path: '/about', icon: Users },
                    { name: 'Contact', path: '/contact', icon: Phone },
                    { name: 'Careers', path: '/careers', icon: Briefcase },
                    { name: 'Partner with Us', path: '/partners', icon: Handshake },
                  ].map(link => (
                    <Link key={link.path} to={link.path} className={`flex items-center gap-4 p-3 rounded-xl font-semibold transition-colors group ${location.pathname === link.path ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`} onClick={() => setShowMobileMenu(false)}>
                      <link.icon className={`w-5 h-5 ${location.pathname === link.path ? 'text-orange-500' : 'text-neutral-400 group-hover:text-orange-500'} transition-colors`} />
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 px-2">Legal</h3>
                <nav className="space-y-1">
                  {[
                    { name: 'Privacy Policy', path: '/privacy', icon: Shield },
                    { name: 'Terms & Conditions', path: '/terms', icon: FileText },
                  ].map(link => (
                    <Link key={link.path} to={link.path} className={`flex items-center gap-4 p-3 rounded-xl font-semibold transition-colors group ${location.pathname === link.path ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`} onClick={() => setShowMobileMenu(false)}>
                      <link.icon className={`w-5 h-5 ${location.pathname === link.path ? 'text-orange-500' : 'text-neutral-400 group-hover:text-orange-500'} transition-colors`} />
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Account Pages */}
              {isAuthenticated && user && (
                <div>
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 px-2">Account</h3>
                  <nav className="space-y-1">
                    {menuItems.map(item => (
                      <Link key={item.path} to={item.path} className={`flex items-center gap-4 p-3 rounded-xl font-semibold transition-colors group ${location.pathname === item.path ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`} onClick={() => setShowMobileMenu(false)}>
                        <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-orange-500' : 'text-neutral-400 group-hover:text-orange-500'} transition-colors`} />
                        {item.label}
                      </Link>
                    ))}
                    <button onClick={handleLogout} className="flex items-center gap-4 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 text-red-600 font-semibold transition-colors w-full group">
                      <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors" />
                      Sign Out
                    </button>
                  </nav>
                </div>
              )}
            </div>
            
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
