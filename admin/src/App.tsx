import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";

import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Orders/Orders";
import FoodList from "./pages/FoodList/FoodList";
import AddItem from "./pages/AddItem/AddItem";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";
import Settings from "./pages/Settings/Settings";

// admin layout wrapper
const AdminLayout = () => (
    <div className="admin-layout">
        <Sidebar />
        <main className="main-content">
            <Navbar />
            <div className="page-content">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/food-list" element={<FoodList />} />
                    <Route path="/add-item" element={<AddItem />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </main>
    </div>
);

const App = () => {
    console.log("Admin API URL:", import.meta.env.VITE_API_BASE_URL);
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuth(!!localStorage.getItem("token"));
        };

        window.addEventListener("storage", handleStorageChange);

        const interval = setInterval(() => {
            const tokenExists = !!localStorage.getItem("token");
            if (tokenExists !== isAuth) {
                setIsAuth(tokenExists);
            }
        }, 500);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval);
        };
    }, [isAuth]);

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={isAuth ? <Navigate to="/" replace /> : <Login />}
                />

                <Route
                    path="/*"
                    element={isAuth ? <AdminLayout /> : <Navigate to="/login" replace />}
                />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop
                pauseOnHover
                theme="light"
            />
        </Router>
    );
};

export default App;
