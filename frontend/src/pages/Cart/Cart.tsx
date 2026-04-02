import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { Trash2, Plus, Minus, Ticket, MapPin, Clock, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cartItems, food_list, addToCart, removeFromCart, getTotalCartAmount, url } = useStore();
  const navigate = useNavigate();

  const activeItems = food_list.filter(item => cartItems[item._id] > 0).map(item => ({ ...item, quantity: cartItems[item._id], id: item._id }));
  const subtotal = getTotalCartAmount();

  const updateQuantity = (id: string, quantity: number) => {
    const currentQty = cartItems[id] || 0;
    if (quantity > currentQty) {
      addToCart(id);
    } else if (quantity < currentQty) {
      removeFromCart(id);
    }
  };

  const deliveryFee = subtotal === 0 ? 0 : 40;
  const platformFee = subtotal === 0 ? 0 : 5;
  const total = subtotal + deliveryFee + platformFee;


  // Sound effect for empty cart
  React.useEffect(() => {
    if (activeItems.length === 0) {
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3");
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio playback failed:", e));
    }
  }, [activeItems.length]);

  if (activeItems.length === 0) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-700">
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/30 transition-all duration-700"></div>
            <img
              src="/empty_cart_ai_figure.png"
              alt="Nothing here"
              className="w-64 h-64 md:w-80 md:h-80 object-contain relative z-10 animate-float"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4 tracking-tighter">
            NOTHING HERE...
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-10 max-w-md font-medium leading-relaxed">
            Our AI assistant noticed your cart is feeling a bit lonely. Let's fill it with some delicious joy!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-10 py-5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-orange-500/40 hover:scale-105 hover:shadow-orange-500/60 transition-all active:scale-95 flex items-center gap-3 group"
          >
            Start Your Feast <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white flex items-center gap-3">
            Secure Checkout
            <span className="text-sm font-bold bg-green-100 text-green-600 px-3 py-1 rounded-full uppercase tracking-widest">
              SSL Secured
            </span>
          </h1>
        </header>

        <div className="flex flex-col xl:flex-row gap-10">
          {/* Main Cart Content */}
          <div className="flex-1 space-y-8">
            {/* Delivery Info Card */}
            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-neutral-100 dark:border-neutral-700 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center text-orange-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">Delivering to</p>
                  <p className="font-bold text-neutral-800 dark:text-white">Home • 123 Main Street, Koramangala...</p>
                </div>
              </div>
              <button className="text-red-500 font-bold text-sm hover:underline">Change</button>
            </div>

            {/* Cart Items List */}
            <div className="bg-white dark:bg-neutral-800 rounded-[32px] overflow-hidden border border-neutral-100 dark:border-neutral-700 shadow-sm">
              <div className="p-8 border-b border-neutral-50 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 flex justify-between items-center">
                <h3 className="text-xl font-black text-neutral-900 dark:text-white">Cart Summary ({activeItems.length} items)</h3>
                <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={16} /> 35-40 min
                </span>
              </div>

              <div className="divide-y divide-neutral-50 dark:divide-neutral-700">
                {activeItems.map((item) => {
                  const quantity = item.quantity;
                  return (
                    <div key={item.id} className="p-6 md:p-8 flex items-center gap-6 group hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-md border border-neutral-100 dark:border-neutral-800 flex-shrink-0">
                        <img
                          src={item.image ? (item.image.startsWith('http') ? item.image : `${url}/images/${item.image}`) : 'https://placehold.co/100x100?text=Food'}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                              </div>
                              <h4 className="font-black text-lg text-neutral-900 dark:text-white truncate">{item.name}</h4>
                            </div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium line-clamp-1">{item.description}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-neutral-300 hover:text-red-500 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-xl">
                            <button
                              onClick={() => updateQuantity(item.id, quantity - 1)}
                              className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm hover:text-red-500 transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-6 text-center font-black text-neutral-900 dark:text-white">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm hover:text-red-500 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-black text-neutral-900 dark:text-white">₹{item.price * quantity}</span>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">₹{item.price} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="w-full py-5 rounded-[24px] border-2 border-dashed border-neutral-200 dark:border-neutral-700 text-neutral-400 hover:border-red-300 hover:text-red-500 font-black tracking-widest text-sm transition-all"
            >
              + ADD MORE ITEMS
            </button>
          </div>

          {/* Sidebar Summary */}
          <div className="w-full xl:w-[400px] space-y-8">
            {/* Promo Code */}
            <div className="bg-white dark:bg-neutral-800 rounded-[32px] p-8 border border-neutral-100 dark:border-neutral-700 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Ticket className="text-green-500 rotate-45" size={24} />
                <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">Offers & Coupons</h3>
              </div>
              <div className="flex gap-2 p-2 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="bg-transparent border-none focus:ring-0 text-sm font-bold flex-1 px-3 text-neutral-900 dark:text-white placeholder:text-neutral-400"
                />
                <button className="px-6 py-2 bg-neutral-900 dark:bg-black text-white rounded-xl text-xs font-black hover:bg-neutral-800 transition-all uppercase tracking-widest whitespace-nowrap">
                  Apply
                </button>
              </div>
            </div>

            {/* Bill Details */}
            <div className="bg-white dark:bg-neutral-800 rounded-[32px] p-8 border border-neutral-200 dark:border-neutral-700 shadow-xl shadow-neutral-100 dark:shadow-none">
              <h3 className="text-xl font-black text-neutral-900 dark:text-white mb-8 uppercase tracking-tighter">Bill Summary</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-neutral-500">Item Total</span>
                  <span className="text-neutral-900 dark:text-white font-black">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-neutral-500">Delivery Fee</span>
                  <span className="text-neutral-900 dark:text-white font-black">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-neutral-500">Platform Fee</span>
                  <span className="text-neutral-900 dark:text-white font-black">₹{platformFee}</span>
                </div>
                <hr className="border-neutral-100 dark:border-neutral-700" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-neutral-900 dark:text-white uppercase tracking-tighter">Total Amount</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-red-500">₹{total}</span>
                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">You Saved ₹40 on this order!</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/order')}
                className="w-full py-5 bg-red-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-500/25 hover:bg-red-600 transition-all active:scale-95 flex items-center justify-center gap-3 group group-hover:gap-5"
              >
                Proceed to Checkout
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="mt-6 text-[11px] text-center text-neutral-400 font-bold leading-relaxed px-4">
                Review your order items. By clicking proceed, you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;

