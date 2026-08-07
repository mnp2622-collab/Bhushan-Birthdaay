import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  Search,
  Filter,
  QrCode,
  Download,
  UserCheck,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

import { gymService } from '../services/gymService';
import { MarkAttendanceModal } from '../components/modals/MarkAttendanceModal';
import { ExportReportModal } from '../components/modals/ExportReportModal';
import { StatCard } from '../components/common/StatCard';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';

export const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('Today'); // Today, Weekly, Monthly
  const [statusFilter, setStatusFilter] = useState('All'); // All, Present, Late, Absent

  // Modals state
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const att = await gymService.getAttendance();
    const mem = await gymService.getMembers();
    setAttendance(att);
    setMembers(mem);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  const todayCount = attendance.filter((a) => a.date === todayStr || a.status === 'Present').length;
  const totalMonthlyCount = attendance.length * 14; // Estimated monthly visits
  const capacityPct = Math.min(100, Math.round((todayCount / 200) * 100));

  // Filtered attendance records
  const filteredAttendance = useMemo(() => {
    return attendance.filter((a) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        a.member_name?.toLowerCase().includes(q) ||
        a.member_code?.toLowerCase().includes(q) ||
        a.date.includes(q);

      let matchesTime = true;
      if (timeFilter === 'Today') matchesTime = a.date === todayStr || true;

      let matchesStatus = true;
      if (statusFilter !== 'All') matchesStatus = a.status === statusFilter;

      return matchesSearch && matchesTime && matchesStatus;
    });
  }, [attendance, searchQuery, timeFilter, statusFilter, todayStr]);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 glass-card rounded-2xl border border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-[#8DFF2F]" /> Attendance Management Hub
          </h2>
          <p className="text-xs text-gray-400">Track daily check-ins, peak gym capacity & export log reports</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowMarkModal(true)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#8DFF2F] text-black font-extrabold text-xs hover:bg-[#7CE822] shadow-[0_0_20px_rgba(141,255,47,0.3)] transition-all hover:scale-105"
          >
            <QrCode className="w-4 h-4" />
            <span>Mark Attendance</span>
          </button>

          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-all"
          >
            <Download className="w-4 h-4 text-[#8DFF2F]" />
            <span>Export CSV / PDF</span>
          </button>
        </div>
      </div>

      {/* Attendance KPI Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Today's Total Check-Ins"
          value={todayCount.toString()}
          change="+18 vs yesterday"
          isPositive={true}
          icon={UserCheck}
          sparkline={[30, 45, 90, 140, 184]}
          subtext="scanned members"
        />

        <StatCard
          title="Est. Monthly Check-Ins"
          value={totalMonthlyCount.toLocaleString()}
          change="+12.4%"
          isPositive={true}
          icon={Clock}
          sparkline={[1200, 1800, 2400, 3100, 3600]}
          subtext="total visits"
        />

        <StatCard
          title="Peak Gym Capacity Rate"
          value={`${capacityPct}%`}
          change="Optimal"
          isPositive={true}
          icon={TrendingUp}
          sparkline={[40, 60, 75, 88, 84]}
          subtext="200 max capacity"
        />
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search member, code or date..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-400 focus:border-[#8DFF2F] focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-[#8DFF2F] shrink-0" />
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
          >
            <option value="Today">Today's Check-ins</option>
            <option value="Weekly">This Week</option>
            <option value="Monthly">This Month</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
          >
            <option value="All">All Attendance Statuses</option>
            <option value="Present">Present Only</option>
            <option value="Late">Late Arrivals</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>

      {/* Main Attendance Logs Data Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : filteredAttendance.length === 0 ? (
          <EmptyState
            icon={CalendarCheck}
            title="No Attendance Logs Found"
            description="No check-in records matched your filters."
            actionText="Mark Member Attendance"
            onAction={() => setShowMarkModal(true)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-white/[0.03] border-b border-white/10">
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Member Name & ID</th>
                  <th className="py-4 px-4">Check In Timestamp</th>
                  <th className="py-4 px-4">Check Out Timestamp</th>
                  <th className="py-4 px-4">Attendance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredAttendance.map((a) => (
                  <tr key={a.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-gray-300">{a.date}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={a.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                          alt={a.member_name}
                          className="w-8 h-8 rounded-xl object-cover border border-[#8DFF2F]/40 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">{a.member_name}</div>
                          <div className="text-[10px] font-mono text-[#8DFF2F]">{a.member_code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#8DFF2F]">{a.check_in}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-300">{a.check_out}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                          a.status === 'Present'
                            ? 'bg-[#8DFF2F]/15 text-[#8DFF2F] border-[#8DFF2F]/30'
                            : a.status === 'Late'
                            ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                            : 'bg-red-500/15 text-red-400 border-red-500/30'
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <MarkAttendanceModal
        isOpen={showMarkModal}
        onClose={() => setShowMarkModal(false)}
        members={members}
        onSave={async (newRecord) => {
          await gymService.markAttendance(newRecord);
          loadData();
        }}
      />

      <ExportReportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        members={members}
        attendance={attendance}
      />
    </div>
  );
};
