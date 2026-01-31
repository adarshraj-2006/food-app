import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

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

                <button className="navbar-icon-btn">
                    🔔
                    <span className="notification-badge"></span>
                </button>

                <div className="profile-dropdown">
                    <div className="profile-avatar">A</div>
                    <div className="profile-info">
                        <span className="profile-name">Admin</span>
                        <span className="profile-role">Administrator</span>
                    </div>
                    <span>▼</span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
