import { useState, useEffect } from 'react';
import StatCard from '../../components/StatCard/StatCard';
import SalesChart from '../../components/Charts/SalesChart';
import OrdersChart from '../../components/Charts/OrdersChart';
import { getStats } from '../../services/admin/admin';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        foods: 0,
        orders: 0,
        totalSales: 0
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const response = await getStats();
            if (response.success) {
                setStats(response.data);
            } else {
                toast.error(response.message || "Failed to fetch stats");
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
            toast.error("Error fetching dashboard stats");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>Loading statistics...</div>;
    }

    return (
        <div>
            <div className="dashboard-header">
                <div></div>
                <div className="period-selector" onClick={fetchStats} style={{ cursor: 'pointer' }}>
                    🔄 Refresh
                </div>
            </div>

            {/* Stats Grid - First Row */}
            <div className="stats-grid">
                <StatCard
                    icon="👥"
                    value={stats.users.toString()}
                    label="Total Users"
                    iconColor="primary"
                    activeCount={stats.users}
                    inactiveCount={0}
                />
                <StatCard
                    icon="🍔"
                    value={stats.foods.toString()}
                    label="Total Food Items"
                    iconColor="secondary"
                    activeCount={stats.foods}
                    inactiveCount={0}
                />
                <StatCard
                    icon="📦"
                    value={stats.orders.toString()}
                    label="Total Orders"
                    iconColor="info"
                />
                <StatCard
                    icon="💰"
                    value={`₹${stats.totalSales}`}
                    label="Total Sales"
                    iconColor="success"
                />
            </div>

            {/* Main Dashboard Content */}
            <div className="dashboard-content" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginTop: '24px' }}>
                {/* Left Side: Charts & Orders */}
                <div className="dashboard-left" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="charts-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <SalesChart />
                        <OrdersChart />
                    </div>

                    <div className="table-card">
                        <div className="table-header">
                            <h2 className="table-title">Recent Orders</h2>
                            <button className="btn btn-secondary btn-sm">View All</button>
                        </div>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { id: '#89231', user: 'Adarsh Raj', date: '2 Mins ago', price: '₹450', status: 'processing' },
                                        { id: '#89230', user: 'John Doe', date: '15 Mins ago', price: '₹1,200', status: 'delivered' },
                                        { id: '#89229', user: 'Sarah Wilson', date: '1 Hour ago', price: '₹890', status: 'pending' },
                                        { id: '#89228', user: 'Mike Ross', date: '3 Hours ago', price: '₹550', status: 'cancelled' },
                                    ].map((order) => (
                                        <tr key={order.id}>
                                            <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{order.id}</td>
                                            <td>{order.user}</td>
                                            <td style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{order.date}</td>
                                            <td style={{ fontWeight: '600' }}>{order.price}</td>
                                            <td>
                                                <span className={`status-badge ${order.status}`}>{order.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Side: Popular Foods & Activity */}
                <div className="dashboard-right" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="chart-card">
                        <div className="chart-card-header">
                            <div className="chart-title-section">
                                <h3>Popular Foods</h3>
                                <h2>Top Sellers</h2>
                            </div>
                        </div>
                        <div className="popular-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { name: 'Veg Burger', orders: 154, trend: '+12%', color: 'var(--primary)' },
                                { name: 'Paneer Pizza', orders: 128, trend: '+8%', color: 'var(--secondary)' },
                                { name: 'Hakka Noodles', orders: 96, trend: '+15%', color: 'var(--success)' },
                                { name: 'Masala Dosa', orders: 84, trend: '-2%', color: 'var(--warning)' },
                            ].map((food) => (
                                <div key={food.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: food.color }}></div>
                                        <span style={{ fontWeight: '600', fontSize: '14px' }}>{food.name}</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: '700', fontSize: '14px' }}>{food.orders}</div>
                                        <div style={{ fontSize: '10px', color: food.trend.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>{food.trend}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="chart-card">
                        <div className="chart-card-header">
                            <div className="chart-title-section">
                                <h3>App Health</h3>
                                <h2>System Status</h2>
                            </div>
                        </div>
                        <div className="status-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--success-bg)', borderRadius: '12px' }}>
                                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--success)' }}>API Server</span>
                                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--success)' }}>Online</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--info-bg)', borderRadius: '12px' }}>
                                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--info)' }}>Database</span>
                                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--info)' }}>Stable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
