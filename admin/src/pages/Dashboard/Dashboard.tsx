import StatCard from '../../components/StatCard/StatCard';
import SalesChart from '../../components/Charts/SalesChart';
import OrdersChart from '../../components/Charts/OrdersChart';

const Dashboard = () => {
    return (
        <div>
            <div className="dashboard-header">
                <div></div>
                <div className="period-selector">
                    📅 Weekly ▼
                </div>
            </div>

            {/* Stats Grid - First Row */}
            <div className="stats-grid">
                <StatCard
                    icon="👥"
                    value="30"
                    label="Total subscribers"
                    iconColor="primary"
                    activeCount={50}
                    inactiveCount={50}
                />
                <StatCard
                    icon="👤"
                    value="100"
                    label="Total End Users"
                    iconColor="secondary"
                    activeCount={50}
                    inactiveCount={50}
                />
                <StatCard
                    icon="📦"
                    value="75"
                    label="Total Orders"
                    iconColor="info"
                />
                <StatCard
                    icon="💰"
                    value="5030"
                    label="Sales volume"
                    iconColor="success"
                />
            </div>

            {/* Stats Grid - Second Row */}
            <div className="stats-grid">
                <StatCard
                    icon="🏪"
                    value="100"
                    label="Total restaurants"
                    iconColor="primary"
                    activeCount={50}
                    inactiveCount={50}
                />
                <StatCard
                    icon="📈"
                    value="97"
                    label="Sales volume for subscribers"
                    iconColor="success"
                />
                <StatCard
                    icon="🎫"
                    value="30"
                    label="Total setup fee for active subscribers"
                    iconColor="secondary"
                />
            </div>

            {/* Charts Section */}
            <div className="charts-grid">
                <SalesChart />
                <OrdersChart />
            </div>
        </div>
    );
};

export default Dashboard;
