// src/pages/seller/SellerOverview.jsx

import React from "react";

import {
  Package,
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

const SellerOverview = () => {
  const stats = [
    {
      icon: Package,
      label: "Total Orders",
      value: "1,234",
      change: "+12%",
      positive: true,
    },
    {
      icon: DollarSign,
      label: "Revenue",
      value: "₹45,670",
      change: "+8%",
      positive: true,
    },
    {
      icon: TrendingUp,
      label: "Average Rating",
      value: "4.5",
      change: "+0.2",
      positive: true,
    },
    {
      icon: Users,
      label: "Customers",
      value: "856",
      change: "+15%",
      positive: true,
    },
  ];

  const recentOrders = [
    {
      id: "ORD001",
      items: "Chicken Biryani x2",
      customer: "John D.",
      status: "preparing",
      total: 598,
    },
    {
      id: "ORD002",
      items: "Paneer Butter Masala",
      customer: "Sarah M.",
      status: "ready",
      total: 279,
    },
    {
      id: "ORD003",
      items: "Margherita Pizza",
      customer: "Mike K.",
      status: "delivered",
      total: 349,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700">
          <CheckCircle size={18} />
          <span className="text-sm font-medium">Restaurant Open</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow p-5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <stat.icon className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
            <p
              className={`mt-2 text-sm ${
                stat.positive ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-bold mb-4">Recent Orders</h2>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-gray-50"
            >
              
              <Clock className="text-orange-600" size={28} />
              <div className="flex-1">
                <p className="font-medium">
                  {order.id} – {order.items}
                </p>
                <p className="text-sm text-gray-500">{order.customer}</p>
              </div>
              <span className="font-bold">₹{order.total}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "ready"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default SellerOverview;
