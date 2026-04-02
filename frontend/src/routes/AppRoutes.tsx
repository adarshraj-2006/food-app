import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

// Public Pages
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Cart from "../pages/Cart/Cart";
import PlaceOrder from "../pages/PlaceOrder/PlaceOrder";
import Profile from "../pages/profile/profile";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound";
import FoodDetailPage from "../pages/FoodDetail/FoodDetailPage";
import UserHelp from "../pages/user/UserHelp";
import Offers from "../pages/Offers/Offers";
import Trending from "../pages/Trending/Trending";
import Cuisines from "../pages/Cuisines/Cuisines";
import Careers from "../pages/Careers/Careers";
import Partners from "../pages/Partners/Partners";
import Privacy from "../pages/Privacy/Privacy";
import Terms from "../pages/Terms/Terms";

// User Pages
import UserDashboard from "../pages/user/UserDashboard";
import UserOverview from "../pages/user/UserOverview";
import UserOrders from "../pages/user/UserOrders";
import UserProfile from "../pages/user/UserProfile";
import UserAddresses from "../pages/user/UserAddresses";
import UserWallet from "../pages/user/UserWallet";
import UserSettings from "../pages/user/UserSettings";
import OrderConfirmation from "../pages/OrderConfirmation";

// Seller Pages
import SellerDashboard from "../pages/seller/SellerDashboard";
import SellerOverview from "../pages/seller/SellerOverview";
import SellerMenuManagement from "../pages/seller/SellerMenuManagement";

// Components
import PlaceholderPage from "../components/PlaceholderPage/PlaceholderPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/food/:id" element={<FoodDetailPage />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/cuisines" element={<Cuisines />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

      {/* User Protected Routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserOverview />} />
        <Route path="dashboard" element={<UserOverview />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="orders" element={<UserOrders />} />
        <Route path="addresses" element={<UserAddresses />} />
        <Route path="wallet" element={<UserWallet />} />
        <Route path="favorites" element={<PlaceholderPage title="My Favorites" />} />
        <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
        <Route path="reviews" element={<PlaceholderPage title="My Reviews" />} />
        <Route path="help" element={<UserHelp />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>

      <Route
        path="/order-confirmation"
        element={
          <ProtectedRoute role="user">
            <OrderConfirmation />
          </ProtectedRoute>
        }
      />

      {/* Seller Protected Routes */}
      <Route
        path="/seller"
        element={
          <ProtectedRoute role="seller">
            <SellerDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<SellerOverview />} />
        <Route path="dashboard" element={<SellerOverview />} />
        <Route path="profile" element={<PlaceholderPage title="Restaurant Profile" />} />
        <Route path="menu" element={<SellerMenuManagement />} />
        <Route path="orders" element={<PlaceholderPage title="Order Management" />} />
        <Route path="earnings" element={<PlaceholderPage title="Earnings & Payouts" />} />
        <Route path="reviews" element={<PlaceholderPage title="Customer Reviews" />} />
        <Route path="offers" element={<PlaceholderPage title="Offers & Discounts" />} />
        <Route path="settings" element={<PlaceholderPage title="Store Settings" />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;
