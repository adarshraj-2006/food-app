import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const mainNavItems = [
        { icon: '📊', label: 'Dashboard', path: '/' },
        { icon: '📦', label: 'Orders', path: '/orders' },
    ];

    const adminNavItems = [
        { icon: '🍔', label: 'Food Items', path: '/food-list' },
        { icon: '➕', label: 'Add Item', path: '/add-item' },
        { icon: '👥', label: 'Users', path: '/users' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="logo-icon">T</div>
                    <span className="logo-text">Tomato<span>.</span></span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <span className="nav-icon">📊</span>
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/orders"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <span className="nav-icon">📦</span>
                        Orders
                    </NavLink>
                </div>

                <div className="nav-section">
                    <span className="nav-section-title">Admin</span>
                    {adminNavItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                <div className="nav-section">
                    <span className="nav-section-title">Settings</span>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <span className="nav-icon">⚙️</span>
                        Settings
                    </NavLink>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
