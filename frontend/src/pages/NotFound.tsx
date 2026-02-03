// src/pages/NotFound.jsx

import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-2">Page Not Found</p>
        <p className="text-gray-500 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
    </MainLayout>
  );
};

export default NotFound;
