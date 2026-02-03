import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronRight, Clock, MapPin, Repeat } from "lucide-react";
import { useStore } from '../../context/StoreContext';
import axios from 'axios';

const UserOrders = () => {

  const { url, token } = useStore();
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data);
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-24 h-24 bg-orange-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
          <Package className="text-orange-500" size={48} />
        </div>
        <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-2">No orders placed yet</h2>
        <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm">
          Looks like you haven't ordered anything yet. Explore our menu to find something delicious!
        </p>
        <Link
          to="/"
          className="px-8 py-3 rounded-xl bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 active:scale-95"
        >
          Start Ordering
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-neutral-900 dark:text-white">My Orders</h1>
        <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Total {data.length} orders
        </div>
      </div>

      <div className="grid gap-6">
        {data.map((order, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-neutral-900 rounded-[24px] p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-dashed border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 font-bold text-lg">
                  <Package />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-900 dark:text-white group-hover:text-orange-500 transition-colors">
                    Order #{index + 1}
                  </h3>
                  <p className="text-xs font-medium text-neutral-400 flex items-center gap-1">
                    <MapPin size={10} /> {order.address.street}, {order.address.city}
                  </p>
                </div>
              </div>

              <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider w-fit ${order.status === "Delivered"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : order.status === "Food Processing"
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                  : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                }`}>
                <span className="flex items-center gap-1.5">
                  {order.status === "Delivered" && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                  {order.status}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-6">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm font-medium">
                  <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-[10px] text-neutral-500">
                      {item.quantity}x
                    </span>
                    {item.name}
                  </div>
                  <span className="text-neutral-900 dark:text-white font-bold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-xs text-neutral-400 font-medium">Total Amount</p>
                <p className="text-xl font-black text-neutral-900 dark:text-white">₹{order.amount}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={fetchOrders} className="px-4 py-2 rounded-xl border-2 border-orange-500 text-orange-500 font-bold text-sm hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors flex items-center gap-2">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
