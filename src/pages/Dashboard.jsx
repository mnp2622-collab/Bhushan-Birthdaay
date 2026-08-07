import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  DollarSign,
  CalendarCheck,
  UserPlus,
  CreditCard,
  QrCode,
  Download,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
  AlertCircle,
  Dumbbell
} from 'lucide-react';

import { StatCard } from '../components/common/StatCard';
import { gymService } from '../services/gymService';
import { AddMemberModal } from '../components/modals/AddMemberModal';
import { AddPlanModal } from '../components/modals/AddPlanModal';
import { MarkAttendanceModal } from '../components/modals/MarkAttendanceModal';
import { ExportReportModal } from '../components/modals/ExportReportModal';
import { RenewMemberModal } from '../components/modals/RenewMemberModal';

export const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);
  const [showExportReport, setShowExportReport] = useState(false);
  const [renewTargetMember, setRenewTargetMember] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const m = await gymService.getMembers();
    const p = await gymService.getPlans();
    const a = await gymService.getAttendance();
    const act = gymService.getActivities();
    setMembers(m);
    setPlans(p);
    setAttendance(a);
    setActivities(act);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute KPIs
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === 'Active').length;
  const todayAttendanceCount = attendance.filter(
    (a) => a.date === new Date().toISOString().split('T')[0] || a.status === 'Present'
  ).length;

  // Monthly Revenue Estimate based on plans
  const totalRevenue = members.reduce((acc, m) => {
    if (m.status === 'Active') {
      if (m.membership_name === 'Premium VIP') return acc + 499;
      if (m.membership_name === 'Standard Plan') return acc + 249;
      return acc + 49;
    }
    return acc;
  }, 0);

  // Upcoming Expiry Watchlist (next 15 days or expired)
  const expiryWatchlist = members.filter(
    (m) => m.status === 'Expired' || new Date(m.expiry_date) <= new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Quick Action Shortcuts Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl glass-card border border-white/10">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8DFF2F]" /> Operational Control Hub
          </h2>
          <p className="text-xs text-gray-400">Quickly trigger core gym management actions</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAddMember(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#8DFF2F] text-black font-extrabold text-xs hover:bg-[#7CE822] shadow-[0_0_15px_rgba(141,255,47,0.3)] transition-all hover:scale-105"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>

          <button
            onClick={() => setShowAddPlan(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/10 text-white font-bold text-xs transition-all"
          >
            <CreditCard className="w-4 h-4 text-[#8DFF2F]" />
            <span>Add Plan</span>
          </button>

          <button
            onClick={() => setShowMarkAttendance(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/10 text-white font-bold text-xs transition-all"
          >
            <QrCode className="w-4 h-4 text-[#8DFF2F]" />
            <span>Mark Attendance</span>
          </button>

          <button
            onClick={() => setShowExportReport(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/10 text-white font-bold text-xs transition-all"
          >
            <Download className="w-4 h-4 text-[#8DFF2F]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Members"
          value={totalMembers.toLocaleString()}
          change="+12.4%"
          isPositive={true}
          icon={Users}
          sparkline={[32, 45, 52, 60, 75, 88, 102]}
          subtext="vs last month"
        />

        <StatCard
          title="Active Members"
          value={activeMembers.toLocaleString()}
          change="+8.1%"
          isPositive={true}
          icon={UserCheck}
          sparkline={[40, 50, 48, 65, 72, 85, 94]}
          subtext="92% active rate"
        />

        <StatCard
          title="Est. Monthly Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+15.2%"
          isPositive={true}
          icon={DollarSign}
          sparkline={[12000, 18000, 22000, 31000, 38000, 42850]}
          subtext="subscription MRR"
        />

        <StatCard
          title="Today's Attendance"
          value={todayAttendanceCount.toString()}
          change="88% peak"
          isPositive={true}
          icon={CalendarCheck}
          sparkline={[15, 30, 85, 140, 184, 160, 90]}
          subtext="daily check-ins"
        />
      </div>

      {/* Grid Row 2: Charts & Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Chart (2 Cols) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#8DFF2F]" /> Revenue Performance Overview
              </h3>
              <p className="text-xs text-gray-400">Monthly subscription earnings breakdown for 2026</p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#8DFF2F]">
              +15.2% YTD
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-white/10 pb-4">
            {[
              { month: 'Jan', val: 28, rev: '$28k' },
              { month: 'Feb', val: 34, rev: '$34k' },
              { month: 'Mar', val: 31, rev: '$31k' },
              { month: 'Apr', val: 42, rev: '$42k' },
              { month: 'May', val: 56, rev: '$56k' },
              { month: 'Jun', val: 68, rev: '$68k' },
              { month: 'Jul', val: 78, rev: '$78k' },
              { month: 'Aug', val: 95, rev: '$95k' }
            ].map((bar, idx) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group relative">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#8DFF2F] text-black text-[10px] font-extrabold px-2 py-0.5 rounded shadow-lg pointer-events-none">
                  {bar.rev}
                </div>

                <div className="w-full bg-white/5 rounded-t-xl h-48 flex items-end p-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.val}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.05 }}
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      idx === 7
                        ? 'bg-gradient-to-t from-[#8DFF2F]/60 to-[#8DFF2F] shadow-[0_0_15px_rgba(141,255,47,0.4)]'
                        : 'bg-white/15 group-hover:bg-[#8DFF2F]/50'
                    }`}
                  />
                </div>
                <span className="text-[11px] font-semibold text-gray-400 group-hover:text-white">{bar.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 text-xs text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#8DFF2F]" /> Premium VIP</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-white/30" /> Standard</span>
            </div>
            <span className="font-mono text-[#8DFF2F]">Highest Revenue: Aug ($95,200)</span>
          </div>
        </div>

        {/* Membership Tier Distribution Donut Breakdown (1 Col) */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Plan Distribution</h3>
            <p className="text-xs text-gray-400 mb-6">Active member distribution by tier</p>

            <div className="space-y-4">
              {[
                { name: 'Standard Plan', count: '580 Members', pct: 46, color: '#8DFF2F' },
                { name: 'Basic Plan', count: '342 Members', pct: 28, color: '#06B6D4' },
                { name: 'Premium VIP', count: '326 Members', pct: 26, color: '#A855F7' }
              ].map((tier) => (
                <div key={tier.name} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span className="text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tier.color }} />
                      {tier.name}
                    </span>
                    <span className="text-gray-300 font-mono">{tier.pct}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${tier.pct}%`, backgroundColor: tier.color }} />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">{tier.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#8DFF2F]/10 border border-[#8DFF2F]/20 text-xs text-[#8DFF2F] flex items-center justify-between mt-6">
            <span className="font-semibold">Upgrade Rate</span>
            <span className="font-mono font-bold">+14.8% this quarter</span>
          </div>
        </div>
      </div>

      {/* Grid Row 3: Expiry Watchlist & Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Membership Expiry Watchlist (2 Cols) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" /> Expiry Alert & Renewals Watchlist
              </h3>
              <p className="text-xs text-gray-400">Members with subscriptions expiring within 15 days</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold">
              {expiryWatchlist.length} Require Action
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-white/10 pb-3">
                  <th className="py-3 px-3">Member</th>
                  <th className="py-3 px-3">Plan Tier</th>
                  <th className="py-3 px-3">Expiry Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {expiryWatchlist.slice(0, 5).map((m) => (
                  <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-3">
                        <img src={m.avatar_url} alt={m.full_name} className="w-8 h-8 rounded-xl object-cover border border-white/10" />
                        <div>
                          <div className="font-bold text-white">{m.full_name}</div>
                          <div className="text-[10px] text-gray-400">{m.member_code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-300">{m.membership_name}</td>
                    <td className="py-3 px-3 font-mono font-semibold text-amber-300">{m.expiry_date}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${m.status === 'Active' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' : 'bg-red-500/15 text-red-400 border-red-500/30'}`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setRenewTargetMember(m)}
                        className="px-3 py-1.5 rounded-xl bg-[#8DFF2F] text-black font-extrabold text-[11px] hover:bg-[#7CE822] shadow-[0_0_10px_rgba(141,255,47,0.2)] transition-all hover:scale-105"
                      >
                        Renew Plan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity Stream (1 Col) */}
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#8DFF2F]" /> Live Gym Activity
          </h3>
          <p className="text-xs text-gray-400 mb-5">Real-time check-ins & operational updates</p>

          <div className="space-y-4">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start space-x-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="p-2 rounded-xl bg-[#8DFF2F]/15 text-[#8DFF2F] shrink-0 mt-0.5">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-white truncate">{act.title}</h5>
                    <span className="text-[10px] text-gray-400 font-mono">{act.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddMemberModal
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
        onSave={async (m) => {
          await gymService.addMember(m);
          fetchData();
        }}
        plans={plans}
      />

      <AddPlanModal
        isOpen={showAddPlan}
        onClose={() => setShowAddPlan(false)}
        onSave={async (p) => {
          await gymService.addPlan(p);
          fetchData();
        }}
      />

      <MarkAttendanceModal
        isOpen={showMarkAttendance}
        onClose={() => setShowMarkAttendance(false)}
        members={members}
        onSave={async (a) => {
          await gymService.markAttendance(a);
          fetchData();
        }}
      />

      <ExportReportModal
        isOpen={showExportReport}
        onClose={() => setShowExportReport(false)}
        members={members}
        attendance={attendance}
        plans={plans}
      />

      <RenewMemberModal
        isOpen={!!renewTargetMember}
        onClose={() => setRenewTargetMember(null)}
        member={renewTargetMember}
        onRenew={async (id, months) => {
          await gymService.renewMembership(id, months);
          fetchData();
        }}
      />
    </div>
  );
};
