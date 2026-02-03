import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.info("Logged out successfully");
        navigate("/login");
    };

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Dashboard';
            case '/orders':
                return 'Orders';
            case '/food-list':
                return 'Food Items';
            case '/add-item':
                return 'Add New Item';
            case '/users':
                return 'Users';
            case '/settings':
                return 'Settings';
            default:
                return 'Dashboard';
        }
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <h1 className="page-title">{getPageTitle()}</h1>
            </div>

            <div className="navbar-right">
                <div className="search-box">
                    <span>🔍</span>
                    <input type="text" placeholder="Search..." />
                </div>

                <div className="navbar-actions" style={{ display: 'flex', gap: '12px' }}>
                    <button className="navbar-icon-btn">
                        🔔
                        <span className="notification-badge"></span>
                    </button>

                    <button
                        className="navbar-icon-btn"
                        onClick={handleLogout}
                        title="Logout"
                        style={{ color: '#e53935' }}
                    >
                        📤
                    </button>

                    <div className="profile-dropdown">
                        <div className="profile-avatar">A</div>
                        <div className="profile-info">
                            <span className="profile-name">Admin</span>
                            <span className="profile-role">Administrator</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
