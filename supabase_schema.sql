-- ====================================================================
-- FITSPHERE - SMART GYM & FITNESS MANAGEMENT SYSTEM
-- PostgreSQL Database Schema for Supabase with Admin OTP Auth Support
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMINS TABLE (Updated with Username, Hashed Password, OTP Expiry & Verification Status)
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID UNIQUE, -- linked to supabase auth.users if available
    username VARCHAR(100) DEFAULT 'Manav',
    full_name VARCHAR(120) NOT NULL DEFAULT 'Manav Padghan',
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'Super Admin',
    password_hash TEXT, -- Hashed Admin Password (never plain text)
    reset_otp VARCHAR(10), -- Encrypted 6-digit OTP
    otp_expiry TIMESTAMP WITH TIME ZONE, -- 5-minute expiration timestamp
    otp_verified BOOLEAN DEFAULT FALSE, -- Single-use status flag
    attempts_count INT DEFAULT 0, -- Rate limiting attempt counter
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. MEMBERSHIP PLANS TABLE
CREATE TABLE IF NOT EXISTS public.membership_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL, -- Basic, Standard, Premium
    duration_months INT NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    facilities TEXT[] DEFAULT '{}', -- e.g. ARRAY['Gym Access', 'Locker Room', 'Cardio Zone']
    description TEXT,
    status VARCHAR(20) DEFAULT 'Active', -- Active, Inactive
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_code VARCHAR(20) UNIQUE NOT NULL, -- e.g., FS-1001
    full_name VARCHAR(150) NOT NULL,
    gender VARCHAR(20) CHECK (gender IN ('Male', 'Female', 'Other')),
    dob DATE,
    mobile VARCHAR(30) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    emergency_contact VARCHAR(100),
    assigned_trainer VARCHAR(120) DEFAULT 'Unassigned',
    medical_notes TEXT,
    avatar_url TEXT,
    status VARCHAR(20) DEFAULT 'Active', -- Active, Expired, Suspended
    joining_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. MEMBERSHIPS TABLE (Subscriptions)
CREATE TABLE IF NOT EXISTS public.memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES public.membership_plans(id) ON DELETE RESTRICT,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(30) DEFAULT 'Paid', -- Paid, Pending, Refunded
    status VARCHAR(20) DEFAULT 'Active', -- Active, Expired, Cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    check_in TIME WITH TIME ZONE DEFAULT NOW(),
    check_out TIME WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'Present', -- Present, Late, Absent
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for High Performance Search & Queries
CREATE INDEX IF NOT EXISTS idx_admins_email ON public.admins(email);
CREATE INDEX IF NOT EXISTS idx_members_status ON public.members(status);
CREATE INDEX IF NOT EXISTS idx_members_member_code ON public.members(member_code);
CREATE INDEX IF NOT EXISTS idx_memberships_member_id ON public.memberships(member_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON public.attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_member_id ON public.attendance(member_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Default RLS Policies (Allow Read/Write for authenticated users or public for demo)
CREATE POLICY "Allow read access to all users" ON public.admins FOR SELECT USING (true);
CREATE POLICY "Allow read access to plans" ON public.membership_plans FOR SELECT USING (true);
CREATE POLICY "Allow all access to members" ON public.members FOR ALL USING (true);
CREATE POLICY "Allow all access to memberships" ON public.memberships FOR ALL USING (true);
CREATE POLICY "Allow all access to attendance" ON public.attendance FOR ALL USING (true);

-- SEED DATA SETUP
INSERT INTO public.membership_plans (id, name, duration_months, price, facilities, description, status) VALUES
('b1111111-1111-1111-1111-111111111111', 'Basic Plan', 1, 49.00, ARRAY['Gym Access', 'Locker Room', 'Cardio Zone'], 'Essential gym access for casual workouts', 'Active'),
('b2222222-2222-2222-2222-222222222222', 'Standard Plan', 6, 249.00, ARRAY['Gym Access', 'Locker Room', 'Cardio Zone', 'Free Weights', 'Sauna Access', 'Group Classes'], 'Most popular for regular gym-goers', 'Active'),
('b3333333-3333-3333-3333-333333333333', 'Premium VIP', 12, 499.00, ARRAY['24/7 VIP Access', 'Personal Trainer (4x/mo)', 'Nutrition Consultation', 'All Group Classes', 'Sauna & Steam Bath', 'Free Protein Shakes'], 'Complete unlimited fitness transformation package', 'Active')
ON CONFLICT (id) DO NOTHING;

-- Seed Admin Profile for Manav (manavpadghan2622@gmail.com)
INSERT INTO public.admins (id, username, full_name, email, role, avatar_url) VALUES
('a0000000-0000-0000-0000-000000000001', 'Manav', 'Manav Padghan', 'manavpadghan2622@gmail.com', 'Super Admin', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300')
ON CONFLICT (email) DO UPDATE SET username = 'Manav', full_name = 'Manav Padghan';
