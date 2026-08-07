import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Plus,
  CheckCircle2,
  Edit,
  Trash2,
  Users,
  Sparkles,
  RefreshCw,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';

import { gymService } from '../services/gymService';
import { AddPlanModal } from '../components/modals/AddPlanModal';
import { DeleteConfirmModal } from '../components/modals/DeleteConfirmModal';
import { RenewMemberModal } from '../components/modals/RenewMemberModal';
import { useAuth } from '../context/AuthContext';

export const Memberships = () => {
  const { showToast } = useAuth();
  const [plans, setPlans] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [deletingPlan, setDeletingPlan] = useState(null);
  const [renewingMember, setRenewingMember] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const p = await gymService.getPlans();
    const m = await gymService.getMembers();
    setPlans(p);
    setMembers(m);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeletePlanConfirm = async () => {
    if (deletingPlan) {
      await gymService.deletePlan(deletingPlan.id);
      showToast(`Membership plan ${deletingPlan.name} deleted`, 'success');
      setDeletingPlan(null);
      loadData();
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Add Plan Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 glass-card rounded-2xl border border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[#8DFF2F]" /> Membership Plans & Subscriptions
          </h2>
          <p className="text-xs text-gray-400">Configure pricing tiers, facilities & active subscriber renewals</p>
        </div>

        <button
          onClick={() => {
            setEditingPlan(null);
            setShowAddModal(true);
          }}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#8DFF2F] text-black font-extrabold text-xs hover:bg-[#7CE822] shadow-[0_0_20px_rgba(141,255,47,0.3)] transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Membership Plan</span>
        </button>
      </div>

      {/* Plan Tiers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => {
          const isPopular = plan.name.includes('Standard') || idx === 1;

          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -6 }}
              className={`glass-card rounded-3xl p-6 relative border flex flex-col justify-between overflow-hidden ${
                isPopular
                  ? 'border-[#8DFF2F]/50 shadow-[0_0_30px_rgba(141,255,47,0.15)] bg-gradient-to-b from-[#8DFF2F]/10 via-card to-card'
                  : 'border-white/10'
              }`}
            >
              {isPopular && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#8DFF2F] text-black font-extrabold text-[10px] uppercase tracking-wider shadow-[0_0_10px_#8DFF2F]">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#8DFF2F] mb-2">
                  <Award className="w-4 h-4" />
                  <span>{plan.duration_months} Month Duration</span>
                </div>

                <h3 className="text-2xl font-extrabold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-gray-400 mb-6 min-h-[36px]">{plan.description}</p>

                <div className="flex items-baseline space-x-1 mb-6">
                  <span className="text-4xl font-black text-white">${plan.price}</span>
                  <span className="text-xs text-gray-400 font-semibold">/ {plan.duration_months} Mo</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5"><Users className="w-4 h-4 text-[#8DFF2F]" /> Active Members:</span>
                  <span className="font-mono font-bold text-white text-sm">{plan.members_count || 400 + idx * 150} Members</span>
                </div>

                {/* Facilities List */}
                <div className="space-y-2.5 mb-8">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 block mb-3">Included Facilities & Perks:</span>
                  {Array.isArray(plan.facilities) &&
                    plan.facilities.map((fac, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-[#8DFF2F] shrink-0" />
                        <span>{fac}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setEditingPlan(plan);
                    setShowAddModal(true);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5 text-[#8DFF2F]" />
                  <span>Edit Plan</span>
                </button>

                <button
                  onClick={() => setDeletingPlan(plan)}
                  className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Active Subscriptions & Renewals Management Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8DFF2F]" /> Active Subscriptions Watchlist
            </h3>
            <p className="text-xs text-gray-400">Track active member plans, validity & process 1-click renewals</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-white/[0.03] border-b border-white/10">
                <th className="py-3.5 px-4">Member Name</th>
                <th className="py-3.5 px-4">Plan Tier</th>
                <th className="py-3.5 px-4">Join Date</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Renewal Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={m.avatar_url} alt={m.full_name} className="w-8 h-8 rounded-xl object-cover border border-white/10" />
                      <div>
                        <div className="font-bold text-white">{m.full_name}</div>
                        <div className="text-[10px] font-mono text-gray-400">{m.member_code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-200">{m.membership_name}</td>
                  <td className="py-3.5 px-4 font-mono text-gray-400">{m.joining_date}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#8DFF2F]">{m.expiry_date}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${m.status === 'Active' ? 'bg-[#8DFF2F]/15 text-[#8DFF2F] border-[#8DFF2F]/30' : 'bg-red-500/15 text-red-400 border-red-500/30'}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setRenewingMember(m)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#8DFF2F] text-black font-extrabold text-[11px] hover:bg-[#7CE822] shadow-[0_0_12px_rgba(141,255,47,0.2)] transition-all hover:scale-105"
                    >
                      Renew Membership
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddPlanModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingPlan(null);
        }}
        planToEdit={editingPlan}
        onSave={async (planData, id) => {
          if (id) {
            await gymService.updatePlan(id, planData);
          } else {
            await gymService.addPlan(planData);
          }
          loadData();
        }}
      />

      <DeleteConfirmModal
        isOpen={!!deletingPlan}
        onClose={() => setDeletingPlan(null)}
        onConfirm={handleDeletePlanConfirm}
        title="Delete Membership Plan Tier"
        message={`Are you sure you want to delete "${deletingPlan?.name}"?`}
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
