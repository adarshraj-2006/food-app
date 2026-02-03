// src/pages/OrderConfirmation.jsx

import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import {
  CheckCircle,
  Clock,
  MapPin,
  Package,
  ChevronRight,
} from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();

  const orderData = location.state; 
  // expected shape:
  // { orderId: string, total: number, paymentMethod: string }

  if (!orderData) {
    return <Navigate to="/" replace />;
  }

  const estimatedDelivery = "30–40 min";

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center animate-slide-up">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-muted-foreground mb-8">
            Your order has been confirmed and is being prepared.
          </p>

          {/* Order Details */}
          <div className="bg-card rounded-2xl shadow-card p-6 text-left mb-8">
            <div className="flex justify-between border-b border-border pb-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-bold text-foreground">
                  {orderData.orderId}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="font-bold text-foreground">
                  ₹{orderData.total}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Estimated Delivery
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {estimatedDelivery}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Delivery Address
                  </p>
                  <p className="text-sm text-muted-foreground">
                    123 Main Street, Koramangala, Bangalore
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Payment Method
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {orderData.paymentMethod}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/user/orders"
              className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              Track Order
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              to="/"
              className="flex-1 h-12 rounded-xl border-2 border-primary text-primary font-semibold flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
            >
              Continue Ordering
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderConfirmation;
