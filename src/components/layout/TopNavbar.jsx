import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  ChevronDown,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TopNavbar = ({ isCollapsed, setIsMobileOpen, onSearchQueryChange }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const notifications = [
    { id: 1, title: 'New Membership Alert', desc: 'Chloe Bennett renewed Premium VIP Plan', time: '12m ago', icon: Sparkles, type: 'success' },
    { id: 2, title: 'Expiry Warning', desc: 'Jessica Thorne membership expired today', time: '1h ago', icon: AlertTriangle, type: 'warning' },
    { id: 3, title: 'Peak Attendance', desc: 'Cardio zone reached 90% capacity', time: '2h ago', icon: UserCheck, type: 'info' }
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) +
        ' • ' +
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin/dashboard':
        return { title: 'Analytics Dashboard', desc: 'Real-time overview of gym performance, attendance & revenue' };
      case '/admin/members':
        return { title: 'Members Management', desc: 'Search, filter, edit & manage all registered gym members' };
      case '/admin/memberships':
        return { title: 'Membership Plans & Subscriptions', desc: 'Configure pricing tiers, facilities & active subscriptions' };
      case '/admin/attendance':
        return { title: 'Attendance Hub', desc: 'Daily member check-in logs, peak capacity & export tools' };
      default:
        return { title: 'FitSphere Dashboard', desc: 'Smart Gym Management Platform' };
    }
  };

  const pageInfo = getPageTitle();

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchVal(val);
    if (onSearchQueryChange) onSearchQueryChange(val);
  };

  return (
    <header
      className={`sticky top-0 z-30 h-20 bg-[#0B0B0B]/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
        isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
      }`}
    >
      <div className="h-full px-4 sm:px-8 flex items-center justify-between">
        {/* Left Side: Mobile Menu Toggle & Title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              {pageInfo.title}
            </h1>
            <p className="text-xs text-gray-400 hidden md:block">{pageInfo.desc}</p>
          </div>
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Global Search Bar */}
          <div className="relative hidden md:block w-64 lg:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchVal}
              onChange={handleSearch}
              placeholder="Search member name, ID, plan..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#8DFF2F] focus:ring-1 focus:ring-[#8DFF2F] transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-gray-500 bg-white/10 px-1.5 py-0.5 rounded">
              ⌘K
            </span>
          </div>

          {/* Time Display Badge */}
          <div className="hidden xl:flex items-center px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300 font-mono">
            {currentTime}
          </div>

          {/* Notification Bell Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all hover:scale-105"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#8DFF2F] shadow-[0_0_8px_#8DFF2F]" />
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-card bg-[#121216]/95 border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#8DFF2F]" /> Notifications
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#8DFF2F]/20 text-[#8DFF2F]">
                    3 Unread
                  </span>
                </div>

                <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                  {notifications.map((n) => {
                    const NIcon = n.icon;
                    return (
                      <div key={n.id} className="py-3 flex items-start space-x-3 hover:bg-white/[0.02] rounded-xl p-2 transition-colors">
                        <div className={`p-2 rounded-xl shrink-0 ${n.type === 'success' ? 'bg-[#8DFF2F]/15 text-[#8DFF2F]' : n.type === 'warning' ? 'bg-amber-500/15 text-amber-400' : 'bg-cyan-500/15 text-cyan-400'}`}>
                          <NIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-white truncate">{n.title}</h5>
                            <span className="text-[10px] text-gray-400">{n.time}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{n.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-white/10 text-center">
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-semibold text-[#8DFF2F] hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center space-x-2.5 p-1.5 pl-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/10 transition-all"
            >
              <img
                src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                alt="Admin Avatar"
                className="w-8 h-8 rounded-lg object-cover border border-[#8DFF2F]/50"
              />
              <span className="text-xs font-bold text-white hidden sm:block">{user?.full_name || 'Alex Mercer'}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* Profile Dropdown Popover */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 glass-card bg-[#121216]/95 border border-white/10 rounded-2xl shadow-2xl p-2 z-50">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <div className="text-xs font-bold text-white">{user?.full_name || 'Alex Mercer'}</div>
                  <div className="text-[10px] text-gray-400">{user?.email || 'admin@fitsphere.com'}</div>
                  <span className="mt-1 inline-block px-2 py-0.5 rounded text-[9px] font-extrabold bg-[#8DFF2F]/20 text-[#8DFF2F] uppercase">
                    {user?.role || 'Super Admin'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/admin/dashboard');
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#8DFF2F]" />
                  <span>Dashboard Overview</span>
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
