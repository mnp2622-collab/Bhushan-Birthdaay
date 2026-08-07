import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { ToastContainer } from '../common/ToastContainer';

export const Layout = ({ onSearchQueryChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col antialiased selection:bg-[#8DFF2F] selection:text-black">
      {/* Toast Feedback Layer */}
      <ToastContainer />

      {/* Sidebar Navigation */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Top Navbar */}
      <TopNavbar
        isCollapsed={isCollapsed}
        setIsMobileOpen={setIsMobileOpen}
        onSearchQueryChange={onSearchQueryChange}
      />

      {/* Main Active Page Content Container */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        } p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto`}
      >
        <Outlet />
      </main>
    </div>
  );
};
