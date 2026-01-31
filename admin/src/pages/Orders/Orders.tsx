import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Order {
    _id: string;
    userId: string;
    items: { name: string; quantity: number; price: number }[];
    amount: number;
    address: { street?: string; city?: string };
    status: string;
    date: string;
    payment: boolean;
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const url = 'http://localhost:4000';

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${url}/api/order/list`);
            if (response.data.success) {
                setOrders(response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            // Show sample data if backend not available
            setOrders([
                {
                    _id: '1',
                    userId: 'user1',
                    items: [{ name: 'Margherita Pizza', quantity: 2, price: 299 }],
                    amount: 598,
                    address: { street: '123 Main St', city: 'Bangalore' },
                    status: 'Food Processing',
                    date: new Date().toISOString(),
                    payment: true,
                },
                {
                    _id: '2',
                    userId: 'user2',
                    items: [{ name: 'Butter Chicken', quantity: 1, price: 349 }],
                    amount: 349,
                    address: { street: '456 Oak Ave', city: 'Mumbai' },
                    status: 'Delivered',
                    date: new Date().toISOString(),
                    payment: true,
                },
                {
                    _id: '3',
                    userId: 'user3',
                    items: [{ name: 'Veg Biryani', quantity: 3, price: 199 }],
                    amount: 597,
                    address: { street: '789 Pine Rd', city: 'Delhi' },
                    status: 'Out for Delivery',
                    date: new Date().toISOString(),
                    payment: false,
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: string, newStatus: string) => {
        try {
            const response = await axios.post(`${url}/api/order/status`, {
                orderId,
                status: newStatus,
            });
            if (response.data.success) {
                toast.success('Order status updated!');
                fetchOrders();
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
            // Update locally for demo
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return 'delivered';
            case 'food processing':
                return 'processing';
            case 'out for delivery':
                return 'pending';
            case 'cancelled':
                return 'cancelled';
            default:
                return 'processing';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>Loading orders...</div>;
    }

    return (
        <div>
            <div className="table-card">
                <div className="table-header">
                    <h2 className="table-title">All Orders</h2>
                    <div className="table-actions">
                        <button className="btn btn-secondary btn-sm" onClick={fetchOrders}>
                            🔄 Refresh
                        </button>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Items</th>
                                <th>Amount</th>
                                <th>Address</th>
                                <th>Date</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={8} style={{ textAlign: 'center', padding: '40px' }}>
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>
                                            <span style={{ fontWeight: 600 }}>#{order._id.slice(-6)}</span>
                                        </td>
                                        <td>
                                            {order.items.map((item, idx) => (
                                                <div key={idx}>
                                                    {item.name} x {item.quantity}
                                                </div>
                                            ))}
                                        </td>
                                        <td>
                                            <span className="price">₹{order.amount}</span>
                                        </td>
                                        <td>
                                            {order.address.street}, {order.address.city}
                                        </td>
                                        <td>{formatDate(order.date)}</td>
                                        <td>
                                            <span className={`status-badge ${order.payment ? 'delivered' : 'pending'}`}>
                                                {order.payment ? '✓ Paid' : '⏳ Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateStatus(order._id, e.target.value)}
                                                className="form-input form-select"
                                                style={{ width: '160px', padding: '8px 12px' }}
                                            >
                                                <option value="Food Processing">Food Processing</option>
                                                <option value="Out for Delivery">Out for Delivery</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
