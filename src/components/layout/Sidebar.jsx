import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  CalendarCheck,
  Zap,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Members Management', path: '/admin/members', icon: Users, badge: 'Active' },
    { name: 'Membership Plans', path: '/admin/memberships', icon: CreditCard },
    { name: 'Attendance Hub', path: '/admin/attendance', icon: CalendarCheck, badge: 'Live' }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-[#0E0E11]/95 backdrop-blur-2xl border-r border-white/10 transition-all duration-300 ease-in-out flex flex-col justify-between ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Top Header Logo */}
        <div>
          <div className="flex items-center justify-between h-20 px-5 border-b border-white/10">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8DFF2F] to-[#4ADE80] flex items-center justify-center text-black font-extrabold shadow-[0_0_20px_rgba(141,255,47,0.4)] shrink-0">
                <Zap className="w-6 h-6 stroke-[2.5]" />
              </div>

              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                    FIT<span className="text-[#8DFF2F]">SPHERE</span>
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase -mt-1">
                    GYM MANAGEMENT
                  </span>
                </div>
              )}
            </div>

            {/* Collapse Toggle Button (Desktop Only) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 mt-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `group relative flex items-center px-3.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-[#8DFF2F]/15 text-[#8DFF2F] border border-[#8DFF2F]/30 shadow-[0_0_15px_rgba(141,255,47,0.15)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#8DFF2F]' : 'text-gray-400 group-hover:text-white'}`} />
                      
                      {!isCollapsed && (
                        <div className="flex items-center justify-between w-full ml-3">
                          <span>{item.name}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-[#8DFF2F]/20 text-[#8DFF2F] uppercase border border-[#8DFF2F]/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Active Indicator Bar */}
                      {isActive && (
                        <motion.div
                          layoutId="activeSideBar"
                          className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#8DFF2F] shadow-[0_0_10px_#8DFF2F]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Admin Profile & Gym Status */}
        <div className="p-3 border-t border-white/10 space-y-3">
          {!isCollapsed && (
            <div className="p-3 rounded-xl bg-surface/80 border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8DFF2F] block animate-ping absolute inset-0" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8DFF2F] block relative" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">FitSphere Central</div>
                  <div className="text-[11px] text-gray-400">184 Checked In Today</div>
                </div>
              </div>
              <ShieldCheck className="w-4 h-4 text-[#8DFF2F]" />
            </div>
          )}

          {/* Admin Profile Box */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center space-x-3 min-w-0">
              <img
                src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                alt={user?.full_name || 'Admin'}
                className="w-9 h-9 rounded-xl object-cover border border-[#8DFF2F]/40 shrink-0"
              />
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate">{user?.full_name || 'Alex Mercer'}</div>
                  <div className="text-[10px] text-gray-400 truncate">{user?.email || 'admin@fitsphere.com'}</div>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                onClick={logout}
                title="Sign Out"
                className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
