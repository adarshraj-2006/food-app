import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext/AuthContext";

interface ProtectedRouteProps {
  role?: string;
  allowedRoles?: string[];
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, allowedRoles, children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Not logged in → redirect to login page
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Role-based protection - support both 'role' and 'allowedRoles' props
  const requiredRole = role || allowedRoles?.[0];
  const roles = allowedRoles || (role ? [role] : []);

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  // If children provided, render them, otherwise use Outlet for nested routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
