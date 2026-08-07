import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

// Initial Mock Seed Data
const INITIAL_PLANS = [
  {
    id: 'plan-1',
    name: 'Basic Plan',
    duration_months: 1,
    price: 49.00,
    facilities: ['Gym Access', 'Locker Room', 'Cardio Zone', 'Water Dispenser'],
    description: 'Essential gym access for casual fitness enthusiasts',
    members_count: 342,
    status: 'Active',
    created_at: '2026-01-10'
  },
  {
    id: 'plan-2',
    name: 'Standard Plan',
    duration_months: 6,
    price: 249.00,
    facilities: ['Gym Access', 'Locker Room', 'Cardio Zone', 'Free Weights', 'Sauna Access', 'Group Classes'],
    description: 'Most popular plan for regular gym-goers wanting full equipment access',
    members_count: 580,
    status: 'Active',
    created_at: '2026-01-10'
  },
  {
    id: 'plan-3',
    name: 'Premium VIP',
    duration_months: 12,
    price: 499.00,
    facilities: ['24/7 VIP Access', 'Personal Trainer (4x/mo)', 'Nutrition Plan', 'All Group Classes', 'Sauna & Steam Bath', 'Free Protein Shakes'],
    description: 'Complete elite transformation program with personal coaching',
    members_count: 326,
    status: 'Active',
    created_at: '2026-01-10'
  }
];

const INITIAL_MEMBERS = [
  {
    id: 'mem-1',
    member_code: 'FS-8021',
    full_name: 'Marcus Vance',
    gender: 'Male',
    dob: '1995-06-14',
    mobile: '+1 (555) 234-5678',
    email: 'marcus.v@gmail.com',
    address: '742 Evergreen Terrace, Springfield',
    emergency_contact: 'Sarah Vance - +1 (555) 999-0011',
    membership_plan_id: 'plan-3',
    membership_name: 'Premium VIP',
    assigned_trainer: 'Coach Brandon',
    joining_date: '2026-01-15',
    expiry_date: '2027-01-15',
    medical_notes: 'Previous ACL repair in 2023. Keep low impact on squats.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    status: 'Active'
  },
  {
    id: 'mem-2',
    member_code: 'FS-8022',
    full_name: 'Elena Rostova',
    gender: 'Female',
    dob: '1998-11-22',
    mobile: '+1 (555) 876-5432',
    email: 'elena.rostova@outlook.com',
    address: '104 Ocean Drive, Miami FL',
    emergency_contact: 'Dmitri Rostova - +1 (555) 444-3322',
    membership_plan_id: 'plan-2',
    membership_name: 'Standard Plan',
    assigned_trainer: 'Coach Sophia',
    joining_date: '2026-02-01',
    expiry_date: '2026-08-01',
    medical_notes: 'None',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    status: 'Active'
  },
  {
    id: 'mem-3',
    member_code: 'FS-8023',
    full_name: 'David Chen',
    gender: 'Male',
    dob: '1992-03-30',
    mobile: '+1 (555) 345-6789',
    email: 'david.chen@techcorp.io',
    address: '88 Cyber Way, Austin TX',
    emergency_contact: 'Lily Chen - +1 (555) 888-7766',
    membership_plan_id: 'plan-1',
    membership_name: 'Basic Plan',
    assigned_trainer: 'Unassigned',
    joining_date: '2026-07-05',
    expiry_date: '2026-08-05',
    medical_notes: 'Asthma - carries inhaler in gym bag.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    status: 'Active'
  },
  {
    id: 'mem-4',
    member_code: 'FS-8024',
    full_name: 'Jessica Thorne',
    gender: 'Female',
    dob: '1996-09-18',
    mobile: '+1 (555) 654-3210',
    email: 'jessica.thorne@gmail.com',
    address: '42 Pine Street, Seattle WA',
    emergency_contact: 'Mark Thorne - +1 (555) 222-1100',
    membership_plan_id: 'plan-2',
    membership_name: 'Standard Plan',
    assigned_trainer: 'Coach Brandon',
    joining_date: '2026-01-20',
    expiry_date: '2026-07-20',
    medical_notes: 'None',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    status: 'Expired'
  },
  {
    id: 'mem-5',
    member_code: 'FS-8025',
    full_name: 'Alexander Wright',
    gender: 'Male',
    dob: '1989-12-04',
    mobile: '+1 (555) 789-0123',
    email: 'alex.wright@finance.com',
    address: '500 Wall Street, New York NY',
    emergency_contact: 'Laura Wright - +1 (555) 333-4455',
    membership_plan_id: 'plan-3',
    membership_name: 'Premium VIP',
    assigned_trainer: 'Coach Alex',
    joining_date: '2026-07-28',
    expiry_date: '2027-07-28',
    medical_notes: 'Hypertension - monitor heavy deadlifts.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    status: 'Active'
  },
  {
    id: 'mem-6',
    member_code: 'FS-8026',
    full_name: 'Sophia Patel',
    gender: 'Female',
    dob: '2001-04-12',
    mobile: '+1 (555) 456-7890',
    email: 'sophia.patel@columbia.edu',
    address: '12 Amsterdam Ave, New York NY',
    emergency_contact: 'Raj Patel - +1 (555) 777-6655',
    membership_plan_id: 'plan-1',
    membership_name: 'Basic Plan',
    assigned_trainer: 'Unassigned',
    joining_date: '2026-07-10',
    expiry_date: '2026-08-10',
    medical_notes: 'None',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    status: 'Active'
  },
  {
    id: 'mem-7',
    member_code: 'FS-8027',
    full_name: 'Jordan Miller',
    gender: 'Male',
    dob: '1997-08-25',
    mobile: '+1 (555) 987-6543',
    email: 'jordan.m@designstudio.co',
    address: '303 Loft Way, Los Angeles CA',
    emergency_contact: 'Chris Miller - +1 (555) 111-9988',
    membership_plan_id: 'plan-2',
    membership_name: 'Standard Plan',
    assigned_trainer: 'Coach Sophia',
    joining_date: '2026-02-15',
    expiry_date: '2026-08-15',
    medical_notes: 'Slight lower back stiffness.',
    avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
    status: 'Active'
  },
  {
    id: 'mem-8',
    member_code: 'FS-8028',
    full_name: 'Chloe Bennett',
    gender: 'Female',
    dob: '1994-05-19',
    mobile: '+1 (555) 321-9876',
    email: 'chloe.b@fitness.org',
    address: '15 Sunset Blvd, Los Angeles CA',
    emergency_contact: 'Hannah Bennett - +1 (555) 666-5544',
    membership_plan_id: 'plan-3',
    membership_name: 'Premium VIP',
    assigned_trainer: 'Coach Brandon',
    joining_date: '2026-03-01',
    expiry_date: '2027-03-01',
    medical_notes: 'None',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    status: 'Active'
  }
];

const INITIAL_ATTENDANCE = [
  {
    id: 'att-1',
    date: '2026-08-03',
    member_id: 'mem-1',
    member_name: 'Marcus Vance',
    member_code: 'FS-8021',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    check_in: '06:15 AM',
    check_out: '07:45 AM',
    status: 'Present'
  },
  {
    id: 'att-2',
    date: '2026-08-03',
    member_id: 'mem-2',
    member_name: 'Elena Rostova',
    member_code: 'FS-8022',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    check_in: '07:00 AM',
    check_out: '08:30 AM',
    status: 'Present'
  },
  {
    id: 'att-3',
    date: '2026-08-03',
    member_id: 'mem-5',
    member_name: 'Alexander Wright',
    member_code: 'FS-8025',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    check_in: '07:45 AM',
    check_out: '09:15 AM',
    status: 'Present'
  },
  {
    id: 'att-4',
    date: '2026-08-03',
    member_id: 'mem-8',
    member_name: 'Chloe Bennett',
    member_code: 'FS-8028',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    check_in: '08:30 AM',
    check_out: 'In Progress',
    status: 'Present'
  },
  {
    id: 'att-5',
    date: '2026-08-03',
    member_id: 'mem-3',
    member_name: 'David Chen',
    member_code: 'FS-8023',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    check_in: '09:10 AM',
    check_out: 'In Progress',
    status: 'Late'
  },
  {
    id: 'att-6',
    date: '2026-08-02',
    member_id: 'mem-7',
    member_name: 'Jordan Miller',
    member_code: 'FS-8027',
    avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
    check_in: '05:30 PM',
    check_out: '07:00 PM',
    status: 'Present'
  }
];

const INITIAL_ACTIVITIES = [
  { id: 'act-1', time: '10 mins ago', title: 'New Member Registered', description: 'Alexander Wright joined Premium VIP Plan', type: 'member', icon: 'UserPlus' },
  { id: 'act-2', time: '35 mins ago', title: 'Attendance Scan', description: 'Chloe Bennett checked in at Front Desk', type: 'attendance', icon: 'QrCode' },
  { id: 'act-3', time: '2 hours ago', title: 'Membership Renewed', description: 'Elena Rostova extended Standard Plan (+6 Months)', type: 'payment', icon: 'CreditCard' },
  { id: 'act-4', time: '5 hours ago', title: 'Personal Training Session', description: 'Coach Brandon completed session with Marcus Vance', type: 'workout', icon: 'Dumbbell' }
];

// Helper to initialize local storage if empty
const getStorageItem = (key, defaultVal) => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultVal));
    return defaultVal;
  }
  return JSON.parse(stored);
};

const setStorageItem = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};

export const gymService = {
  // --- MEMBERS CRUD ---
  async getMembers() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('members').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return getStorageItem('fitsphere_members', INITIAL_MEMBERS);
  },

  async addMember(memberData) {
    const newMember = {
      ...memberData,
      id: 'mem-' + Date.now(),
      member_code: 'FS-' + Math.floor(1000 + Math.random() * 9000),
      joining_date: memberData.joining_date || new Date().toISOString().split('T')[0],
      avatar_url: memberData.avatar_url || `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random()*1000)}?auto=format&fit=crop&q=80&w=250`,
      status: memberData.status || 'Active'
    };

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('members').insert([newMember]).select();
      if (!error && data) return data[0];
    }

    const members = getStorageItem('fitsphere_members', INITIAL_MEMBERS);
    members.unshift(newMember);
    setStorageItem('fitsphere_members', members);
    return newMember;
  },

  async updateMember(id, memberData) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('members').update(memberData).eq('id', id).select();
      if (!error && data) return data[0];
    }

    const members = getStorageItem('fitsphere_members', INITIAL_MEMBERS);
    const index = members.findIndex(m => m.id === id);
    if (index !== -1) {
      members[index] = { ...members[index], ...memberData };
      setStorageItem('fitsphere_members', members);
      return members[index];
    }
    return null;
  },

  async deleteMember(id) {
    if (isSupabaseConfigured()) {
      await supabase.from('members').delete().eq('id', id);
    }
    const members = getStorageItem('fitsphere_members', INITIAL_MEMBERS);
    const filtered = members.filter(m => m.id !== id);
    setStorageItem('fitsphere_members', filtered);
    return true;
  },

  async bulkDeleteMembers(ids) {
    if (isSupabaseConfigured()) {
      await supabase.from('members').delete().in('id', ids);
    }
    const members = getStorageItem('fitsphere_members', INITIAL_MEMBERS);
    const filtered = members.filter(m => !ids.includes(m.id));
    setStorageItem('fitsphere_members', filtered);
    return true;
  },

  // --- MEMBERSHIP PLANS CRUD ---
  async getPlans() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('membership_plans').select('*');
      if (!error && data) return data;
    }
    return getStorageItem('fitsphere_plans', INITIAL_PLANS);
  },

  async addPlan(planData) {
    const newPlan = {
      ...planData,
      id: 'plan-' + Date.now(),
      members_count: 0,
      status: 'Active',
      created_at: new Date().toISOString().split('T')[0]
    };

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('membership_plans').insert([newPlan]).select();
      if (!error && data) return data[0];
    }

    const plans = getStorageItem('fitsphere_plans', INITIAL_PLANS);
    plans.push(newPlan);
    setStorageItem('fitsphere_plans', plans);
    return newPlan;
  },

  async updatePlan(id, planData) {
    const plans = getStorageItem('fitsphere_plans', INITIAL_PLANS);
    const idx = plans.findIndex(p => p.id === id);
    if (idx !== -1) {
      plans[idx] = { ...plans[idx], ...planData };
      setStorageItem('fitsphere_plans', plans);
      return plans[idx];
    }
    return null;
  },

  async deletePlan(id) {
    const plans = getStorageItem('fitsphere_plans', INITIAL_PLANS);
    const filtered = plans.filter(p => p.id !== id);
    setStorageItem('fitsphere_plans', filtered);
    return true;
  },

  async renewMembership(memberId, monthsToAdd = 6) {
    const members = getStorageItem('fitsphere_members', INITIAL_MEMBERS);
    const idx = members.findIndex(m => m.id === memberId);
    if (idx !== -1) {
      const currentExpiry = new Date(members[idx].expiry_date || new Date());
      currentExpiry.setMonth(currentExpiry.getMonth() + Number(monthsToAdd));
      members[idx].expiry_date = currentExpiry.toISOString().split('T')[0];
      members[idx].status = 'Active';
      setStorageItem('fitsphere_members', members);
      return members[idx];
    }
    return null;
  },

  // --- ATTENDANCE CRUD ---
  async getAttendance() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('attendance').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return getStorageItem('fitsphere_attendance', INITIAL_ATTENDANCE);
  },

  async markAttendance(attendanceData) {
    const members = await this.getMembers();
    const member = members.find(m => m.id === attendanceData.member_id) || members[0];
    
    const newRecord = {
      id: 'att-' + Date.now(),
      date: attendanceData.date || new Date().toISOString().split('T')[0],
      member_id: member.id,
      member_name: member.full_name,
      member_code: member.member_code,
      avatar_url: member.avatar_url,
      check_in: attendanceData.check_in || '09:00 AM',
      check_out: attendanceData.check_out || 'In Progress',
      status: attendanceData.status || 'Present'
    };

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('attendance').insert([newRecord]).select();
      if (!error && data) return data[0];
    }

    const attendance = getStorageItem('fitsphere_attendance', INITIAL_ATTENDANCE);
    attendance.unshift(newRecord);
    setStorageItem('fitsphere_attendance', attendance);
    return newRecord;
  },

  // --- ACTIVITIES ---
  getActivities() {
    return getStorageItem('fitsphere_activities', INITIAL_ACTIVITIES);
  }
};
