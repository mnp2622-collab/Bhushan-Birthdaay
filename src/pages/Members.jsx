import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  RefreshCw,
  Sparkles,
  Phone,
  Mail,
  ShieldAlert,
  CheckSquare,
  Square
} from 'lucide-react';

import { gymService } from '../services/gymService';
import { AddMemberModal } from '../components/modals/AddMemberModal';
import { EditMemberModal } from '../components/modals/EditMemberModal';
import { ViewMemberModal } from '../components/modals/ViewMemberModal';
import { DeleteConfirmModal } from '../components/modals/DeleteConfirmModal';
import { RenewMemberModal } from '../components/modals/RenewMemberModal';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { useAuth } from '../context/AuthContext';

export const Members = () => {
  const { showToast } = useAuth();
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [sortBy, setSortBy] = useState('full_name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [renewingMember, setRenewingMember] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const m = await gymService.getMembers();
    const p = await gymService.getPlans();
    setMembers(m);
    setPlans(p);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered & Sorted Members computation
  const filteredMembers = useMemo(() => {
    return members
      .filter((m) => {
        // Search Filter
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          m.full_name.toLowerCase().includes(query) ||
          m.member_code.toLowerCase().includes(query) ||
          m.email.toLowerCase().includes(query) ||
          m.mobile.includes(query);

        // Status Filter
        let matchesStatus = true;
        if (statusFilter === 'Active') matchesStatus = m.status === 'Active';
        if (statusFilter === 'Expired') matchesStatus = m.status === 'Expired';
        if (statusFilter === 'New Members') {
          const join = new Date(m.joining_date);
          const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
          matchesStatus = join >= thirtyDaysAgo;
        }

        // Gender Filter
        let matchesGender = true;
        if (genderFilter !== 'All') matchesGender = m.gender === genderFilter;

        return matchesSearch && matchesStatus && matchesGender;
      })
      .sort((a, b) => {
        let valA = a[sortBy] || '';
        let valB = b[sortBy] || '';
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [members, searchQuery, statusFilter, genderFilter, sortBy, sortOrder]);

  // Paginated View
  const totalPages = Math.ceil(filteredMembers.length / pageSize) || 1;
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMembers.slice(start, start + pageSize);
  }, [filteredMembers, currentPage, pageSize]);

  // Select / Deselect All
  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedMembers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedMembers.map((m) => m.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Delete Action
  const handleDeleteConfirm = async () => {
    if (deletingMember) {
      await gymService.deleteMember(deletingMember.id);
      showToast(`Member ${deletingMember.full_name} deleted`, 'success');
      setDeletingMember(null);
      loadData();
    }
  };

  const handleBulkDeleteConfirm = async () => {
    await gymService.bulkDeleteMembers(selectedIds);
    showToast(`Successfully deleted ${selectedIds.length} selected members`, 'success');
    setSelectedIds([]);
    setShowBulkDeleteConfirm(false);
    loadData();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Controls & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 glass-card rounded-2xl border border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-[#8DFF2F]" /> Members Management
          </h2>
          <p className="text-xs text-gray-400">Total registered members: {members.length} ({members.filter(m => m.status === 'Active').length} Active)</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {selectedIds.length > 0 && (
            <button
              onClick={() => setShowBulkDeleteConfirm(true)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 font-bold text-xs hover:bg-red-600/30 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Selected ({selectedIds.length})</span>
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#8DFF2F] text-black font-extrabold text-xs hover:bg-[#7CE822] shadow-[0_0_20px_rgba(141,255,47,0.3)] transition-all hover:scale-105"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add New Member</span>
          </button>
        </div>
      </div>

      {/* Search & Comprehensive Filters Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, ID, phone, email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-400 focus:border-[#8DFF2F] focus:outline-none transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-[#8DFF2F] shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
          >
            <option value="All">All Membership Statuses</option>
            <option value="Active">Active Subscriptions Only</option>
            <option value="Expired">Expired Subscriptions</option>
            <option value="New Members">New Members (Last 30 Days)</option>
          </select>
        </div>

        {/* Gender Filter */}
        <div>
          <select
            value={genderFilter}
            onChange={(e) => {
              setGenderFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male Members</option>
            <option value="Female">Female Members</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className="w-full px-3 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
          >
            <option value="full_name-asc">Sort Name (A-Z)</option>
            <option value="full_name-desc">Sort Name (Z-A)</option>
            <option value="joining_date-desc">Newest Join Date</option>
            <option value="expiry_date-asc">Earliest Expiry</option>
          </select>
        </div>
      </div>

      {/* Main Members Data Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : filteredMembers.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No Members Found"
            description="No gym members matched your search query or filter criteria."
            actionText="Register New Member"
            onAction={() => setShowAddModal(true)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-white/[0.03] border-b border-white/10">
                  <th className="py-4 px-4 w-10">
                    <button onClick={toggleSelectAll} className="text-gray-400 hover:text-[#8DFF2F]">
                      {selectedIds.length === paginatedMembers.length && paginatedMembers.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-[#8DFF2F]" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-4 px-4">Member Info</th>
                  <th className="py-4 px-4">Contact</th>
                  <th className="py-4 px-4">Membership Plan</th>
                  <th className="py-4 px-4">Validity Period</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {paginatedMembers.map((m) => {
                  const isSelected = selectedIds.includes(m.id);
                  const isExpired = m.status === 'Expired';

                  return (
                    <motion.tr
                      key={m.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`hover:bg-white/[0.02] transition-colors ${
                        isSelected ? 'bg-[#8DFF2F]/5' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4">
                        <button onClick={() => toggleSelectOne(m.id)} className="text-gray-400 hover:text-[#8DFF2F]">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#8DFF2F]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Member Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={m.avatar_url}
                            alt={m.full_name}
                            className="w-10 h-10 rounded-xl object-cover border border-[#8DFF2F]/40 shadow-sm shrink-0"
                          />
                          <div>
                            <div className="font-bold text-white text-sm">{m.full_name}</div>
                            <div className="text-[10px] font-mono text-[#8DFF2F] font-semibold">{m.member_code} • {m.gender}</div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5 text-gray-300">
                          <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-500" /> {m.email}</div>
                          <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-500" /> {m.mobile}</div>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-200">
                          {m.membership_name}
                        </span>
                        <div className="text-[10px] text-gray-400 mt-1">Trainer: {m.assigned_trainer || 'None'}</div>
                      </td>

                      {/* Dates */}
                      <td className="py-3.5 px-4 font-mono">
                        <div className="text-gray-400">Join: {m.joining_date}</div>
                        <div className={`font-semibold ${isExpired ? 'text-red-400' : 'text-[#8DFF2F]'}`}>
                          Exp: {m.expiry_date}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                            m.status === 'Active'
                              ? 'bg-[#8DFF2F]/15 text-[#8DFF2F] border-[#8DFF2F]/30'
                              : 'bg-red-500/15 text-red-400 border-red-500/30'
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          <button
                            onClick={() => setViewingMember(m)}
                            title="View Member Profile"
                            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setEditingMember(m)}
                            title="Edit Member"
                            className="p-2 rounded-xl text-gray-400 hover:text-[#8DFF2F] hover:bg-white/10 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setRenewingMember(m)}
                            title="Renew Plan"
                            className="p-2 rounded-xl text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-colors"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeletingMember(m)}
                            title="Delete Member"
                            className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-white/10 bg-white/[0.02]">
          <div className="text-xs text-gray-400">
            Showing <span className="font-bold text-white">{Math.min((currentPage - 1) * pageSize + 1, filteredMembers.length)}</span> to{' '}
            <span className="font-bold text-white">{Math.min(currentPage * pageSize, filteredMembers.length)}</span> of{' '}
            <span className="font-bold text-white">{filteredMembers.length}</span> members
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`w-8 h-8 rounded-xl text-xs font-bold border transition-all ${
                  currentPage === pg
                    ? 'bg-[#8DFF2F] text-black border-[#8DFF2F]'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                }`}
              >
                {pg}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals Integration */}
      <AddMemberModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={async (newMember) => {
          await gymService.addMember(newMember);
          loadData();
        }}
        plans={plans}
      />

      <EditMemberModal
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        member={editingMember}
        onSave={async (id, data) => {
          await gymService.updateMember(id, data);
          loadData();
        }}
        plans={plans}
      />

      <ViewMemberModal
        isOpen={!!viewingMember}
        onClose={() => setViewingMember(null)}
        member={viewingMember}
        onRenewClick={(m) => setRenewingMember(m)}
      />

      <DeleteConfirmModal
        isOpen={!!deletingMember}
        onClose={() => setDeletingMember(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Gym Member"
        message={`Are you sure you want to permanently delete member "${deletingMember?.full_name}" (${deletingMember?.member_code})?`}
      />

      <DeleteConfirmModal
        isOpen={showBulkDeleteConfirm}
        onClose={() => setShowBulkDeleteConfirm(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Bulk Delete Members"
        message={`Are you sure you want to permanently delete all ${selectedIds.length} selected gym members?`}
      />

      <RenewMemberModal
        isOpen={!!renewingMember}
        onClose={() => setRenewingMember(null)}
        member={renewingMember}
        onRenew={async (id, months) => {
          await gymService.renewMembership(id, months);
          loadData();
        }}
      />
    </div>
  );
};
