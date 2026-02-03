// src/pages/profile/profile.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext/AuthContext";

const Profile = () => {
  const { isAuthenticated, user } = useAuth();

  // If not authenticated, redirect to home
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Redirect based on user role
  if (user?.role === "seller") {
    return <Navigate to="/seller" replace />;
  }

  // Default redirect to user dashboard
  return <Navigate to="/user" replace />;
};

export default Profile;
