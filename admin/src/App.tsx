import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Orders from './pages/Orders/Orders';
import FoodList from './pages/FoodList/FoodList';
import AddItem from './pages/AddItem/AddItem';
import Users from './pages/Users/Users';

const App = () => {
    return (
        <Router>
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
                        </Routes>
                    </div>
                </main>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Router>
    );
};

export default App;
