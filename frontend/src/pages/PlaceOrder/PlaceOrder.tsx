import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PlaceOrder.css';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { useStore } from '../../context/StoreContext';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useStore();
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Check consistency with backend logic regarding delivery fees
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url, order_id, amount, currency, db_order_id } = response.data.data;

        // Razorpay Integration
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourKeyHere", // Add to .env if missing
          amount: amount,
          currency: currency,
          name: "Tomato",
          description: "Food Delivery Order",
          order_id: order_id, // Razorpay Order ID
          handler: async function (response) {
            console.log(response);
            try {
              const verifyResponse = await axios.post(url + "/api/order/verify", {
                orderId: db_order_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                success: "true"
              });
              if (verifyResponse.data.success) {
                navigate("/user/orders");
              } else {
                navigate("/");
              }
            } catch (error) {
              console.log(error);
              navigate("/");
            }
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone
          },
          theme: {
            color: "#ef4444"
          }
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.on('payment.failed', function (response) {
          alert(response.error.description);
        });
        rzp1.open();

      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <MainLayout>
      <form onSubmit={placeOrder} className="place-order">
        {/* ====== Left Side: Delivery Information ====== */}
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          {/* Name fields */}
          <div className="multifields">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
          </div>

          <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" />
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street Address" />

          {/* City and State */}
          <div className="multifields">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
          </div>

          {/* Zip and Country */}
          <div className="multifields">
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
          </div>

          <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
        </div>

        {/* ====== Right Side: Cart Totals ====== */}
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Total</p>
              <p>${total}</p>
            </div>

            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </MainLayout>
  );
};

export default PlaceOrder;
