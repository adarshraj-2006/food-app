import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const MainLayout = ({ children, showFooter = true }) => {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-[70px]">{children}</main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
