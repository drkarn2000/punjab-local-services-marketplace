'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle,
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Edit3,
  ExternalLink,
  FileText,
  Filter,
  Globe,
  History,
  Home,
  Image as ImageIcon,
  IndianRupee,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  TrendingUp,
  Upload,
  UserCheck,
  Users,
  Wallet,
  Wrench,
  XCircle,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  BookingEstimate,
  CategorySlug,
  CitySlug,
  EstimateLineItem,
  Language,
  ProviderType,
  VerificationStatus,
} from '@/types/marketplace';

export type ProviderPortalSection =
  | 'dashboard'
  | 'register'
  | 'verification'
  | 'jobs'
  | 'job-detail'
  | 'active-jobs'
  | 'estimates'
  | 'history'
  | 'calendar'
  | 'earnings'
  | 'payouts'
  | 'reviews'
  | 'portfolio'
  | 'profile'
  | 'team';

export function ProviderPortalWorkspace({
  section,
  jobId,
}: {
  section: ProviderPortalSection;
  jobId?: string;
}) {
  const router = useRouter();
  const {
    language,
    setLanguage,
    providers,
    activeProviderId,
    setActiveProviderId,
    currentProvider,
    bookings,
    payouts,
    reviews,
    updateBookingStatus,
    submitEstimate,
    respondToEstimate,
    registerProvider,
    updateProviderProfile,
    verifyProvider,
    assignTechnicianToBooking,
    addTeamTechnician,
    toggleTeamTechnician,
    addPortfolioItem,
    deletePortfolioItem,
    replyToReview,
    showToast,
  } = useMarketplace();

  // Registration Form State
  const [regType, setRegType] = useState<ProviderType>('individual');
  const [regName, setRegName] = useState('');
  const [regBusinessName, setRegBusinessName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCat, setRegCat] = useState<CategorySlug>('electrician');
  const [regCity, setRegCity] = useState<CitySlug>('mohali');
  const [regLocality, setRegLocality] = useState('Phase 7, Mohali');
  const [regRadius, setRegRadius] = useState(15);
  const [regVisitingFee, setRegVisitingFee] = useState(199);
  const [regExp, setRegExp] = useState(6);
  const [regHours, setRegHours] = useState('08:30 AM - 07:30 PM');
  const [regIntro, setRegIntro] = useState(
    'Certified technician offering punctual doorstep service with genuine tools.'
  );

  // Estimate Builder State
  const [estBookingId, setEstBookingId] = useState(
    bookings[0]?.id || 'PB-2026-8901'
  );
  const [estWorkDesc, setEstWorkDesc] = useState(
    'Completed fault inspection. Identified burnt MCB and loose neutral wire requiring replacement.'
  );
  const [labourItems, setLabourItems] = useState<EstimateLineItem[]>([
    {
      id: 'l-1',
      type: 'labour',
      description: 'Circuit Fault Repair & DB Balancing',
      quantity: 1,
      unitPrice: 350,
    },
    {
      id: 'l-2',
      type: 'labour',
      description: '16A Power Socket Installation',
      quantity: 2,
      unitPrice: 120,
    },
  ]);
  const [materialItems, setMaterialItems] = useState<EstimateLineItem[]>([
    {
      id: 'm-1',
      type: 'material',
      description: 'Havells 32A DP MCB Switch (ISI)',
      quantity: 1,
      unitPrice: 480,
    },
    {
      id: 'm-2',
      type: 'material',
      description: 'Anchor Roma 16A Socket + Switch Set',
      quantity: 2,
      unitPrice: 210,
    },
  ]);
  const [estAdditional, setEstAdditional] = useState(0);
  const [estDiscount, setEstDiscount] = useState(100);
  const [estNotes, setEstNotes] = useState(
    'Visiting fee included. 15-day workmanship warranty.'
  );

  // Calendar View State
  const [calendarView, setCalendarView] = useState<
    'Month' | 'Week' | 'Day' | 'List'
  >('Week');
  const [newBlockedDate, setNewBlockedDate] = useState('2026-11-22');

  // Portfolio Form State
  const [portTitle, setPortTitle] = useState('');
  const [portDesc, setPortDesc] = useState('');

  // Team Form State
  const [techName, setTechName] = useState('');
  const [techRole, setTechRole] = useState('Senior Service Technician');
  const [techPhone, setTechPhone] = useState('+91 98765-11223');
  const [techExp, setTechExp] = useState(5);

  // Review Reply State
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});

  // History & Payout Filter State
  const [historyTab, setHistoryTab] = useState<
    'All' | 'Completed' | 'Cancelled' | 'Rejected'
  >('All');
  const [payoutStatusFilter, setPayoutStatusFilter] = useState('All');

  // Completion Notes State
  const [completionNotes, setCompletionNotes] = useState(
    'Tested load under full operation. Area cleaned after work.'
  );
  const [rejectReason, setRejectReason] = useState(
    'Slot conflict / Currently attending an emergency breakdown'
  );

  // Profile Edit State
  const [profName, setProfName] = useState(currentProvider.name);
  const [profFee, setProfFee] = useState(currentProvider.visitingCharge);
  const [profRadius, setProfRadius] = useState(currentProvider.serviceRadiusKm);
  const [profAbout, setProfAbout] = useState(currentProvider.about);

  const navItems: {
    id: ProviderPortalSection;
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Provider Dashboard',
      href: '/provider/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'jobs',
      label: 'New Job Requests',
      href: '/provider/jobs',
      icon: <Briefcase className="w-4 h-4" />,
      badge: String(
        bookings.filter((b) => b.status === 'Booking Requested').length
      ),
    },
    {
      id: 'active-jobs',
      label: 'Active Jobs Execution',
      href: '/provider/active-jobs',
      icon: <Wrench className="w-4 h-4" />,
    },
    {
      id: 'estimates',
      label: 'Estimate Builder',
      href: '/provider/estimates',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'calendar',
      label: 'Availability Calendar',
      href: '/provider/calendar',
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: 'history',
      label: 'Booking History',
      href: '/provider/history',
      icon: <History className="w-4 h-4" />,
    },
    {
      id: 'earnings',
      label: 'Earnings Overview',
      href: '/provider/earnings',
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: 'payouts',
      label: 'Payout Ledger',
      href: '/provider/payouts',
      icon: <Wallet className="w-4 h-4" />,
    },
    {
      id: 'reviews',
      label: 'Reviews & Ratings',
      href: '/provider/reviews',
      icon: <Star className="w-4 h-4" />,
    },
    {
      id: 'portfolio',
      label: 'Portfolio Gallery',
      href: '/provider/portfolio',
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      id: 'team',
      label: 'Business Team (Agency)',
      href: '/provider/team',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'verification',
      label: 'Verification Status',
      href: '/provider/verification',
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      id: 'profile',
      label: 'Profile Editor',
      href: '/provider/profile',
      icon: <Edit3 className="w-4 h-4" />,
    },
    {
      id: 'register',
      label: 'Partner Registration',
      href: '/provider/register',
      icon: <UserCheck className="w-4 h-4" />,
    },
  ];

  // Calculate Estimate Totals
  const labourTotal = labourItems.reduce(
    (s, x) => s + x.quantity * x.unitPrice,
    0
  );
  const materialTotal = materialItems.reduce(
    (s, x) => s + x.quantity * x.unitPrice,
    0
  );
  const subtotalCalc = Math.max(
    0,
    currentProvider.visitingCharge +
      labourTotal +
      materialTotal +
      estAdditional -
      estDiscount
  );
  const taxCalc = Math.round(subtotalCalc * 0.05);
  const finalEstimateCalc = subtotalCalc + taxCalc;

  const grossEarnings = payouts.reduce((s, p) => s + p.grossAmount, 0);
  const totalCommission = payouts.reduce((s, p) => s + p.platformCommission, 0);
  const netEarnings = payouts.reduce((s, p) => s + p.netAmount, 0);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col">
      {/* Provider Portal Dedicated Topbar */}
      <header className="bg-[#091e42] text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/provider/dashboard"
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base leading-none">
                  Punjab Services <span className="text-amber-400">Partner</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Individual & Business Provider Portal
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Switch Demo Provider Account (Individual vs Business vs Pending Verification) */}
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
              <span className="text-slate-400 hidden sm:inline">
                Active Demo Pro:
              </span>
              <select
                aria-label="Switch Active Provider"
                value={activeProviderId}
                onChange={(e) => {
                  setActiveProviderId(e.target.value);
                  const found = providers.find((p) => p.id === e.target.value);
                  if (found) {
                    setProfName(found.name);
                    setProfFee(found.visitingCharge);
                    setProfRadius(found.serviceRadiusKm);
                    setProfAbout(found.about);
                  }
                }}
                className="bg-transparent font-bold text-amber-300 focus:outline-none cursor-pointer"
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id} className="text-slate-900">
                    {p.name} ({p.providerType.toUpperCase()} • {p.cityName})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector */}
            <select
              aria-label="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-slate-800 border border-slate-700 text-xs font-bold px-2.5 py-1.5 rounded-xl text-white"
            >
              <option value="en">EN</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
              <option value="hi">हिन्दी</option>
            </select>

            <Link
              href={`/professionals/${currentProvider.slug}`}
              className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold"
            >
              <span>Public Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="w-full w-full px-4 sm:px-6 py-7 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start flex-1">
        {/* Left Sidebar (3 cols) */}
        <aside className="lg:col-span-3 bg-gradient-to-b from-[#041418] to-[#0f1c38] text-white rounded-3xl border border-emerald-400/30 p-4 shadow-[0_12px_36px_rgba(0,0,0,0.35)] space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 border border-white/15 pb-3.5">
            <img
              src={currentProvider.avatar}
              alt={currentProvider.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-cyan-400"
            />
            <div className="min-w-0">
              <div className="font-extrabold text-white text-sm truncate flex items-center gap-1">
                <span className="truncate">{currentProvider.name}</span>
                {currentProvider.verified && (
                  <BadgeCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                )}
              </div>
              <div className="text-[11px] text-emerald-200">
                {currentProvider.providerType === 'business'
                  ? 'Business Agency'
                  : 'Individual Professional'}{' '}
                • {currentProvider.cityName}
              </div>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-extrabold">
                Verification: {currentProvider.verificationStatus}
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                section === item.id ||
                (section === 'job-detail' && item.id === 'jobs');
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.55)] translate-x-1'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Right Module Area (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* =========================================================
              7.3 PROVIDER DASHBOARD (/provider & /provider/dashboard)
             ========================================================= */}
          {section === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#091e42] via-[#1d3fa8] to-[#2563eb] text-white rounded-3xl p-6 shadow-[0_12px_32px_rgba(37,99,235,0.35)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold uppercase">
                    {currentProvider.providerType} Partner Console
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold mt-1.5">
                    Welcome, {currentProvider.name}
                  </h1>
                  <p className="text-xs text-emerald-100 mt-0.5">
                    Visiting Fee: ₹{currentProvider.visitingCharge} • Operating
                    Radius: {currentProvider.serviceRadiusKm} km around{' '}
                    {currentProvider.cityName}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/provider/jobs"
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold shadow-lg"
                  >
                    View Job Requests
                  </Link>
                  <Link
                    href="/provider/estimates"
                    className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-sm"
                  >
                    + Create Estimate
                  </Link>
                </div>
              </div>

              {/* 8 Clickable Colorful Gradient KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    label: 'Total Jobs',
                    val: currentProvider.completedJobs + 12,
                    sub: 'Open job history →',
                    href: '/provider/history',
                    grad: 'from-emerald-600 to-teal-800',
                  },
                  {
                    label: 'New Requests',
                    val: bookings.filter((b) => b.status === 'Booking Requested').length,
                    sub: 'Accept or reject →',
                    href: '/provider/jobs',
                    grad: 'from-amber-500 to-orange-600',
                  },
                  {
                    label: 'Active Jobs',
                    val: bookings.filter((b) =>
                      [
                        'Provider Accepted',
                        'Provider En Route',
                        'Provider Arrived',
                        'Inspection Started',
                        'Customer Approval Pending',
                        'Estimate Approved',
                        'Work In Progress',
                      ].includes(b.status)
                    ).length,
                    sub: 'Manage field execution →',
                    href: '/provider/active-jobs',
                    grad: 'from-violet-600 to-purple-800',
                  },
                  {
                    label: 'Completed Jobs',
                    val: currentProvider.completedJobs,
                    sub: 'View completed →',
                    href: '/provider/history',
                    grad: 'from-emerald-500 to-teal-700',
                  },
                  {
                    label: 'Cancelled Jobs',
                    val: bookings.filter((b) => b.status === 'Cancelled').length,
                    sub: 'View cancellations →',
                    href: '/provider/history',
                    grad: 'from-rose-500 to-pink-700',
                  },
                  {
                    label: 'Net Earnings',
                    val: `₹${netEarnings.toLocaleString()}`,
                    sub: 'Open earnings chart →',
                    href: '/provider/earnings',
                    grad: 'from-teal-500 to-emerald-800',
                  },
                  {
                    label: 'Pending Payouts',
                    val: '₹1,452',
                    sub: 'Open payout ledger →',
                    href: '/provider/payouts',
                    grad: 'from-cyan-600 to-emerald-800',
                  },
                  {
                    label: 'Average Rating',
                    val: `${currentProvider.rating} ★ (${currentProvider.reviewCount})`,
                    sub: 'Read & reply reviews →',
                    href: '/provider/reviews',
                    grad: 'from-teal-600 to-purple-800',
                  },
                ].map((kpi) => (
                  <Link
                    key={kpi.label}
                    href={kpi.href}
                    className={`rounded-2xl p-4 text-white bg-gradient-to-br ${kpi.grad} shadow-lg hover:shadow-[0_12px_28px_rgba(59,130,246,0.4)] hover:-translate-y-1 transition-all flex flex-col justify-between`}
                  >
                    <div className="text-xs font-bold text-white/85">
                      {kpi.label}
                    </div>
                    <div className="text-xl font-extrabold mt-1.5">
                      {kpi.val}
                    </div>
                    <div className="text-[11px] text-white/90 underline mt-1.5">
                      {kpi.sub}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Performance Chart + Upcoming Appointments */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-extrabold text-slate-900">
                      Weekly Earnings & Completed Jobs Performance
                    </h2>
                    <span className="text-xs font-bold text-emerald-600">
                      +18% vs Last Week
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-2 items-end h-40 pt-4 px-2 bg-slate-50 rounded-2xl border border-slate-100">
                    {[
                      { day: 'Mon', pct: '55%', amt: '₹1.8k' },
                      { day: 'Tue', pct: '70%', amt: '₹2.4k' },
                      { day: 'Wed', pct: '60%', amt: '₹2.1k' },
                      { day: 'Thu', pct: '85%', amt: '₹3.2k' },
                      { day: 'Fri', pct: '95%', amt: '₹3.9k' },
                      { day: 'Sat', pct: '100%', amt: '₹4.4k' },
                      { day: 'Sun', pct: '75%', amt: '₹2.8k' },
                    ].map((bar) => (
                      <div
                        key={bar.day}
                        className="flex flex-col items-center gap-1.5 h-full justify-end"
                      >
                        <span className="text-[10px] font-bold text-slate-600">
                          {bar.amt}
                        </span>
                        <div
                          className="w-full rounded-t-xl bg-gradient-to-t from-emerald-700 to-cyan-500"
                          style={{ height: bar.pct }}
                        />
                        <span className="text-[11px] font-bold text-slate-700 pb-1">
                          {bar.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-extrabold text-slate-900">
                      Upcoming Appointments
                    </h2>
                    <Link
                      href="/provider/active-jobs"
                      className="text-xs font-bold text-emerald-600 hover:underline"
                    >
                      Manage →
                    </Link>
                  </div>
                  <div className="space-y-2.5">
                    {bookings.slice(0, 3).map((b) => (
                      <div
                        key={b.id}
                        className="p-3 rounded-2xl border border-slate-200 text-xs space-y-1"
                      >
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{b.subcategoryName}</span>
                          <span className="text-emerald-600">{b.id}</span>
                        </div>
                        <div className="text-slate-600">
                          {b.customerName} • {b.address.streetLocality},{' '}
                          {b.address.city}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {b.date} ({b.timeSlot}) • Status: {b.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              7.1 PROVIDER REGISTRATION (/provider/register)
             ========================================================= */}
          {section === 'register' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Service Provider Registration (Individual & Business)
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Register as an independent technician or a multi-technician business agency in Mohali, Chandigarh, or Hoshiarpur.
                </p>
              </div>

              {/* Toggle Individual vs Business */}
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 max-w-md">
                <button
                  type="button"
                  onClick={() => setRegType('individual')}
                  className={`py-2.5 rounded-xl text-xs font-extrabold transition ${
                    regType === 'individual'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-700'
                  }`}
                >
                  Individual Professional
                </button>
                <button
                  type="button"
                  onClick={() => setRegType('business')}
                  className={`py-2.5 rounded-xl text-xs font-extrabold transition ${
                    regType === 'business'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-700'
                  }`}
                >
                  Business / Service Agency
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Sukhwinder Singh"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>

                {regType === 'business' && (
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Registered Business / Agency Name *
                    </label>
                    <input
                      type="text"
                      value={regBusinessName}
                      onChange={(e) => setRegBusinessName(e.target.value)}
                      placeholder="e.g. Punjab Smart Electricals & Plumbing"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98765-XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="partner@punjabservices.demo"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Primary Service Category *
                  </label>
                  <select
                    aria-label="Service Category"
                    value={regCat}
                    onChange={(e) => setRegCat(e.target.value as CategorySlug)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
                  >
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="computer-repair">
                      Computer & Laptop Repair
                    </option>
                    <option value="mobile-repair">Mobile Repair</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Base City *
                  </label>
                  <select
                    aria-label="Base City"
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value as CitySlug)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
                  >
                    <option value="mohali">Mohali</option>
                    <option value="chandigarh">Chandigarh</option>
                    <option value="hoshiarpur">Hoshiarpur</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Base Locality & Service Areas
                  </label>
                  <input
                    type="text"
                    value={regLocality}
                    onChange={(e) => setRegLocality(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Exp (Yrs)
                    </label>
                    <input
                      type="number"
                      value={regExp}
                      onChange={(e) => setRegExp(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Radius (km)
                    </label>
                    <input
                      type="number"
                      value={regRadius}
                      onChange={(e) => setRegRadius(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Visit Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={regVisitingFee}
                      onChange={(e) =>
                        setRegVisitingFee(Number(e.target.value))
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Working Hours & Short Introduction
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={regHours}
                    onChange={(e) => setRegHours(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                  <input
                    type="text"
                    value={regIntro}
                    onChange={(e) => setRegIntro(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>
              </div>

              {/* Demo Document Upload Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  'Identity Document (Aadhaar / PAN)',
                  'Supporting Trade / Business Certificate',
                  'Work Portfolio Images (Preview)',
                ].map((docLabel) => (
                  <button
                    key={docLabel}
                    type="button"
                    onClick={() =>
                      showToast(
                        `${docLabel} attached for verification preview!`,
                        'info'
                      )
                    }
                    className="p-4 rounded-2xl border-2 border-dashed border-emerald-200 hover:border-emerald-500 bg-emerald-50/40 text-left space-y-1 transition"
                  >
                    <Upload className="w-5 h-5 text-emerald-600" />
                    <div className="text-xs font-bold text-slate-800">
                      {docLabel}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold">
                      ✓ Ready for demo submission
                    </div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  registerProvider({
                    name:
                      regBusinessName.trim() ||
                      regName.trim() ||
                      'Sukhwinder Electricals',
                    businessName: regBusinessName.trim() || undefined,
                    providerType: regType,
                    categorySlug: regCat,
                    citySlug: regCity,
                    cityName:
                      regCity === 'mohali'
                        ? 'Mohali'
                        : regCity === 'chandigarh'
                        ? 'Chandigarh'
                        : 'Hoshiarpur',
                    experienceYears: regExp,
                    serviceRadiusKm: regRadius,
                    visitingCharge: regVisitingFee,
                    workingHours: regHours,
                    about: regIntro,
                  });
                  router.push('/provider/verification');
                }}
                className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold shadow-md"
              >
                Submit Partner Registration & View Verification Status →
              </button>
            </div>
          )}

          {/* =========================================================
              7.2 VERIFICATION STATUS (/provider/verification)
             ========================================================= */}
          {section === 'verification' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">
                    Provider Verification Status
                  </h1>
                  <p className="text-xs text-slate-500">
                    Track document verification and test all 6 verification states interactively
                  </p>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-extrabold">
                  Current State: {currentProvider.verificationStatus}
                </span>
              </div>

              {/* Interactive State Switcher for Prototype Demonstration */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="text-xs font-extrabold text-slate-700">
                  Simulate Verification State Transition:
                </div>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      'Draft',
                      'Submitted',
                      'Under Review',
                      'Additional Information Required',
                      'Approved',
                      'Rejected',
                    ] as VerificationStatus[]
                  ).map((st) => (
                    <button
                      key={st}
                      onClick={() =>
                        verifyProvider(
                          currentProvider.id,
                          st,
                          `Status updated to ${st} in verification demo.`
                        )
                      }
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                        currentProvider.verificationStatus === st
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-400'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Uploaded Documents List */}
              <div className="space-y-3">
                <h2 className="text-base font-extrabold text-slate-900">
                  Submitted Documents & Admin Feedback
                </h2>
                {currentProvider.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {doc.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        Type: {doc.type} • Uploaded: {doc.uploadedAt}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        doc.status === 'Verified'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>

              {currentProvider.verificationRemarks && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <strong>Verification Manager Remarks:</strong>{' '}
                  {currentProvider.verificationRemarks}
                </div>
              )}

              <button
                onClick={() =>
                  verifyProvider(
                    currentProvider.id,
                    'Submitted',
                    'Provider re-uploaded requested documents.'
                  )
                }
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                Resubmit Updated Documents (Demo)
              </button>
            </div>
          )}

          {/* =========================================================
              7.4 JOB REQUESTS (/provider/jobs & /provider/jobs/[id])
             ========================================================= */}
          {(section === 'jobs' || section === 'job-detail') && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">
                    Incoming Job Requests
                  </h1>
                  <p className="text-xs text-slate-500">
                    Review customer problem descriptions, uploaded photos, and accept or reject requests
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {bookings
                  .filter((b) =>
                    section === 'job-detail' && jobId ? b.id === jobId : true
                  )
                  .map((b) => (
                    <div
                      key={b.id}
                      className="p-5 rounded-2xl border border-slate-200 space-y-4 hover:border-emerald-400 transition"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-emerald-700 text-xs">
                            {b.id}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                            {b.status}
                          </span>
                          <span className="text-xs text-slate-500">
                            • Visiting Fee: ₹{b.visitingFee}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                          Requested Slot: {b.date} ({b.timeSlot})
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-8 space-y-1.5">
                          <div className="text-base font-extrabold text-slate-900">
                            {b.subcategoryName} — {b.problemTitle}
                          </div>
                          <p className="text-xs text-slate-600">
                            {b.problemDescription}
                          </p>
                          <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                            <span>
                              Customer: <strong>{b.customerName}</strong> •{' '}
                              {b.address.houseFlat}, {b.address.streetLocality},{' '}
                              {b.address.city}
                            </span>
                          </div>
                          {b.problemImages.length > 0 && (
                            <div className="flex gap-2 pt-2">
                              {b.problemImages.map((img, i) => (
                                <img
                                  key={i}
                                  src={img}
                                  alt="Customer problem"
                                  className="w-16 h-12 rounded-lg object-cover border border-slate-200"
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-4 flex flex-col justify-between gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() =>
                                updateBookingStatus(
                                  b.id,
                                  'Provider Accepted',
                                  `${currentProvider.name} accepted the job request.`
                                )
                              }
                              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                            >
                              Accept Job
                            </button>
                            <button
                              onClick={() =>
                                updateBookingStatus(
                                  b.id,
                                  'Rejected',
                                  `Rejected by provider: ${rejectReason}`
                                )
                              }
                              className="flex-1 py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold"
                            >
                              Reject
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              showToast(
                                `Clarification request sent to ${b.customerName}!`,
                                'info'
                              )
                            }
                            className="w-full py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                          >
                            Request Customer Clarification
                          </button>

                          {currentProvider.teamMembers &&
                            currentProvider.teamMembers.length > 0 && (
                              <select
                                aria-label="Assign Team Technician"
                                value={b.assignedTechnicianId || ''}
                                onChange={(e) => {
                                  const tech =
                                    currentProvider.teamMembers?.find(
                                      (t) => t.id === e.target.value
                                    );
                                  if (tech) {
                                    assignTechnicianToBooking(
                                      b.id,
                                      tech.id,
                                      tech.name
                                    );
                                  }
                                }}
                                className="w-full px-2.5 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 text-xs font-bold"
                              >
                                <option value="">
                                  Assign Team Technician...
                                </option>
                                {currentProvider.teamMembers.map((tm) => (
                                  <option key={tm.id} value={tm.id}>
                                    {tm.name} ({tm.role})
                                  </option>
                                ))}
                              </select>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* =========================================================
              7.5 ACTIVE JOBS EXECUTION (/provider/active-jobs)
             ========================================================= */}
          {section === 'active-jobs' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-5">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Active Jobs Execution Workflow
                </h1>
                <p className="text-xs text-slate-500">
                  Execute jobs step-by-step: Start Journey → Mark Arrived → Start Inspection → Create Estimate → Work In Progress → Mark Completed
                </p>
              </div>

              <div className="space-y-4">
                {bookings
                  .filter(
                    (b) => b.status !== 'Cancelled' && b.status !== 'Rejected'
                  )
                  .map((b) => {
                    const estimateApproved =
                      b.estimate && b.estimate.status === 'Approved';
                    return (
                      <div
                        key={b.id}
                        className="p-5 rounded-2xl border border-slate-200 space-y-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div>
                            <span className="text-xs font-extrabold text-emerald-600">
                              {b.id} • {b.customerName}
                            </span>
                            <h3 className="text-lg font-extrabold text-slate-900">
                              {b.subcategoryName} ({b.address.streetLocality},{' '}
                              {b.address.city})
                            </h3>
                          </div>
                          <span className="px-3.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                            Status: {b.status}
                          </span>
                        </div>

                        {/* Step Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              updateBookingStatus(
                                b.id,
                                'Provider En Route',
                                'Technician started journey to customer location.'
                              )
                            }
                            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold transition"
                          >
                            1. Start Journey
                          </button>

                          <button
                            onClick={() =>
                              updateBookingStatus(
                                b.id,
                                'Provider Arrived',
                                'Technician arrived at customer doorstep.'
                              )
                            }
                            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold transition"
                          >
                            2. Mark Arrived
                          </button>

                          <button
                            onClick={() =>
                              updateBookingStatus(
                                b.id,
                                'Inspection Started',
                                'Started fault inspection and diagnosis.'
                              )
                            }
                            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold transition"
                          >
                            3. Start Inspection
                          </button>

                          <Link
                            href="/provider/estimates"
                            onClick={() => setEstBookingId(b.id)}
                            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold transition"
                          >
                            4. Create / Edit Estimate
                          </Link>

                          <button
                            onClick={() =>
                              updateBookingStatus(
                                b.id,
                                'Work In Progress',
                                'Estimate approved; repair work in progress.'
                              )
                            }
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                              estimateApproved
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            5. Work In Progress{' '}
                            {!estimateApproved && '🔒 (Needs Approval)'}
                          </button>

                          <button
                            onClick={() =>
                              updateBookingStatus(
                                b.id,
                                'Work Completed',
                                `Job completed. Notes: ${completionNotes}`
                              )
                            }
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                              estimateApproved
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            6. Mark Completed{' '}
                            {!estimateApproved && '🔒 (Needs Approval)'}
                          </button>
                        </div>

                        {!estimateApproved && b.estimate && (
                          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-950">
                            <span>
                              <strong>Hybrid Pricing Gate:</strong> Customer has
                              not yet approved Estimate {b.estimate.id} (₹
                              {b.estimate.totalEstimate}).
                            </span>
                            <button
                              onClick={() =>
                                respondToEstimate(b.id, 'Approved')
                              }
                              className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold"
                            >
                              Simulate Customer Approval Now
                            </button>
                          </div>
                        )}

                        {/* Completion Notes & Photo Upload Preview */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
                          <input
                            type="text"
                            value={completionNotes}
                            onChange={(e) => setCompletionNotes(e.target.value)}
                            placeholder="Completion notes..."
                            className="sm:col-span-9 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              showToast(
                                'Completion work photo attached (Preview)!',
                                'info'
                              )
                            }
                            className="sm:col-span-3 py-2 px-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1"
                          >
                            <Upload className="w-3.5 h-3.5" /> Add Work Photo
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* =========================================================
              7.6 COMPLETE ESTIMATE BUILDER (/provider/estimates)
             ========================================================= */}
          {section === 'estimates' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Complete Hybrid Estimate Builder
                </h1>
                <p className="text-xs text-slate-500">
                  Build itemized Labour + Material estimates and send directly to the customer’s screen
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Select Booking
                  </label>
                  <select
                    aria-label="Select Booking for Estimate"
                    value={estBookingId}
                    onChange={(e) => setEstBookingId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
                  >
                    {bookings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.id} — {b.subcategoryName} ({b.customerName})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Inspection Summary / Work Description
                  </label>
                  <input
                    type="text"
                    value={estWorkDesc}
                    onChange={(e) => setEstWorkDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>
              </div>

              {/* Labour Items Builder */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 uppercase">
                    1. Labour Items (₹{labourTotal})
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setLabourItems((prev) => [
                        ...prev,
                        {
                          id: `l-${Date.now()}`,
                          type: 'labour',
                          description: 'Additional Point Repair Labour',
                          quantity: 1,
                          unitPrice: 150,
                        },
                      ])
                    }
                    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Labour Item
                  </button>
                </div>

                {labourItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-2 items-center"
                  >
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        setLabourItems((prev) =>
                          prev.map((x, i) =>
                            i === idx
                              ? { ...x, description: e.target.value }
                              : x
                          )
                        )
                      }
                      className="col-span-6 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                    />
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        setLabourItems((prev) =>
                          prev.map((x, i) =>
                            i === idx
                              ? { ...x, quantity: Number(e.target.value) }
                              : x
                          )
                        )
                      }
                      className="col-span-2 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                    />
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) =>
                        setLabourItems((prev) =>
                          prev.map((x, i) =>
                            i === idx
                              ? { ...x, unitPrice: Number(e.target.value) }
                              : x
                          )
                        )
                      }
                      className="col-span-3 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setLabourItems((prev) =>
                          prev.filter((_, i) => i !== idx)
                        )
                      }
                      className="col-span-1 text-rose-500 hover:text-rose-700 flex justify-center"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Material Items Builder */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 uppercase">
                    2. Spare Parts & Material Items (₹{materialTotal})
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setMaterialItems((prev) => [
                        ...prev,
                        {
                          id: `m-${Date.now()}`,
                          type: 'material',
                          description: 'ISI Copper Wire / Connector',
                          quantity: 1,
                          unitPrice: 180,
                        },
                      ])
                    }
                    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Material Item
                  </button>
                </div>

                {materialItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-2 items-center"
                  >
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        setMaterialItems((prev) =>
                          prev.map((x, i) =>
                            i === idx
                              ? { ...x, description: e.target.value }
                              : x
                          )
                        )
                      }
                      className="col-span-6 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                    />
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        setMaterialItems((prev) =>
                          prev.map((x, i) =>
                            i === idx
                              ? { ...x, quantity: Number(e.target.value) }
                              : x
                          )
                        )
                      }
                      className="col-span-2 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                    />
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) =>
                        setMaterialItems((prev) =>
                          prev.map((x, i) =>
                            i === idx
                              ? { ...x, unitPrice: Number(e.target.value) }
                              : x
                          )
                        )
                      }
                      className="col-span-3 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setMaterialItems((prev) =>
                          prev.filter((_, i) => i !== idx)
                        )
                      }
                      className="col-span-1 text-rose-500 hover:text-rose-700 flex justify-center"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Additional Charges, Discount & Live Total */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Additional Charges (₹)
                  </label>
                  <input
                    type="number"
                    value={estAdditional}
                    onChange={(e) => setEstAdditional(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Discount (₹)
                  </label>
                  <input
                    type="number"
                    value={estDiscount}
                    onChange={(e) => setEstDiscount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Warranty / Technician Notes
                  </label>
                  <input
                    type="text"
                    value={estNotes}
                    onChange={(e) => setEstNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-700 space-y-0.5">
                  <div>
                    Visiting Fee: ₹{currentProvider.visitingCharge} + Labour: ₹
                    {labourTotal} + Material: ₹{materialTotal} - Discount: ₹
                    {estDiscount} + 5% GST: ₹{taxCalc}
                  </div>
                  <div className="text-lg font-extrabold text-slate-900">
                    Calculated Final Estimate: ₹{finalEstimateCalc}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newEst: BookingEstimate = {
                      id: `EST-${Date.now().toString().slice(-4)}`,
                      bookingId: estBookingId,
                      providerId: currentProvider.id,
                      providerName: currentProvider.name,
                      createdAt: '14 Nov 2026, Just Now',
                      workDescription: estWorkDesc,
                      visitingFee: currentProvider.visitingCharge,
                      labourItems,
                      materialItems,
                      additionalCharges: estAdditional,
                      discount: estDiscount,
                      taxPercent: 5,
                      subtotal: subtotalCalc,
                      taxAmount: taxCalc,
                      totalEstimate: finalEstimateCalc,
                      notes: estNotes,
                      status: 'Pending Approval',
                    };
                    submitEstimate(estBookingId, newEst);
                  }}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold shadow-md inline-flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Estimate to Customer</span>
                </button>
              </div>
            </div>
          )}

          {/* =========================================================
              7.8 COMPLETE AVAILABILITY CALENDAR (/provider/calendar)
             ========================================================= */}
          {section === 'calendar' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">
                    Complete Availability Calendar
                  </h1>
                  <p className="text-xs text-slate-500">
                    Configure working days, hours, holidays, and inspect slot conflict warnings
                  </p>
                </div>

                {/* Month / Week / Day / List View Switcher */}
                <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
                  {(['Month', 'Week', 'Day', 'List'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setCalendarView(v)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                        calendarView === v
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-700'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Working Days Toggle */}
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-slate-900">
                  Working Days & Hours ({currentProvider.workingHours})
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                    (day) => {
                      const active =
                        currentProvider.workingDays.includes(day);
                      return (
                        <button
                          key={day}
                          onClick={() => {
                            const updated = active
                              ? currentProvider.workingDays.filter(
                                  (d) => d !== day
                                )
                              : [...currentProvider.workingDays, day];
                            updateProviderProfile(currentProvider.id, {
                              workingDays: updated,
                            });
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                            active
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-slate-50 text-slate-500 border-slate-200'
                          }`}
                        >
                          {day} {active ? '✓' : 'Off'}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Block Date / Holiday Control */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={newBlockedDate}
                    onChange={(e) => setNewBlockedDate(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                  />
                  <button
                    onClick={() => {
                      updateProviderProfile(currentProvider.id, {
                        blockedDates: [
                          ...currentProvider.blockedDates,
                          newBlockedDate,
                        ],
                      });
                    }}
                    className="px-4 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold"
                  >
                    Block Holiday Date
                  </button>
                </div>
                <div className="text-xs text-slate-600">
                  Blocked Dates:{' '}
                  <strong>
                    {currentProvider.blockedDates.join(', ') || 'None'}
                  </strong>
                </div>
              </div>

              {/* Conflict Warning Demo */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-xs text-amber-950">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Slot Conflict Warning (Demo):</strong> Booking{' '}
                    <strong>PB-2026-8901</strong> is already scheduled for 14
                    Nov (2:00 PM – 4:00 PM). Blocking this slot will prompt
                    reassignment.
                  </span>
                </div>
              </div>

              {/* Calendar Grid View */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-1 text-xs"
                  >
                    <div className="font-extrabold text-emerald-900">
                      {b.date} • {b.timeSlot}
                    </div>
                    <div className="font-bold text-slate-900">
                      {b.subcategoryName} ({b.customerName})
                    </div>
                    <div className="text-slate-500">
                      {b.address.streetLocality}, {b.address.city}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              7.7 BOOKING HISTORY (/provider/history)
             ========================================================= */}
          {section === 'history' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Job & Booking History
                </h1>
                <div className="flex gap-1.5">
                  {(['All', 'Completed', 'Cancelled', 'Rejected'] as const).map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setHistoryTab(tab)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${
                          historyTab === tab
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {tab}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {bookings
                  .filter((b) => {
                    if (historyTab === 'Completed')
                      return [
                        'Work Completed',
                        'Payment Completed',
                        'Review Submitted',
                      ].includes(b.status);
                    if (historyTab === 'Cancelled')
                      return b.status === 'Cancelled';
                    if (historyTab === 'Rejected')
                      return b.status === 'Rejected';
                    return true;
                  })
                  .map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm">
                          {b.id} — {b.subcategoryName} ({b.customerName})
                        </div>
                        <div className="text-slate-500">
                          {b.date} • {b.address.streetLocality},{' '}
                          {b.address.city}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-slate-900">
                          ₹{b.finalTotal}
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* =========================================================
              7.9A DEDICATED EARNINGS OVERVIEW (/provider/earnings)
             ========================================================= */}
          {section === 'earnings' && (
            <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-extrabold uppercase text-emerald-600">
                    Partner Revenue Intelligence
                  </span>
                  <h1 className="text-2xl font-extrabold text-slate-900">
                    Earnings & Commission Analytics
                  </h1>
                  <p className="text-xs text-slate-500">
                    Real-time breakdown of Visiting Fees, Approved Estimates, Platform Commission, and Net Take-Home Pay.
                  </p>
                </div>
                <Link
                  href="/provider/payouts"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold shadow-lg"
                >
                  Open Bank Payout Ledger →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl text-white bg-gradient-to-br from-emerald-600 to-teal-800 shadow-lg">
                  <div className="text-xs font-bold uppercase opacity-85">
                    Gross Booking Earnings
                  </div>
                  <div className="text-2xl font-extrabold mt-1">
                    ₹{grossEarnings.toLocaleString()}
                  </div>
                  <div className="text-[11px] mt-1 opacity-85">
                    Visiting Fees + Approved Estimates
                  </div>
                </div>
                <div className="p-5 rounded-2xl text-white bg-gradient-to-br from-rose-500 to-pink-700 shadow-lg">
                  <div className="text-xs font-bold uppercase opacity-85">
                    Platform Commission (12%–15%)
                  </div>
                  <div className="text-2xl font-extrabold mt-1">
                    -₹{totalCommission.toLocaleString()}
                  </div>
                  <div className="text-[11px] mt-1 opacity-85">
                    Marketplace service & lead fee
                  </div>
                </div>
                <div className="p-5 rounded-2xl text-white bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg">
                  <div className="text-xs font-bold uppercase opacity-85">
                    Net Take-Home Earnings
                  </div>
                  <div className="text-2xl font-extrabold mt-1">
                    ₹{netEarnings.toLocaleString()}
                  </div>
                  <div className="text-[11px] mt-1 opacity-85">
                    85%+ Partner Retention Rate
                  </div>
                </div>
              </div>

              {/* Monthly Earnings Trend Bars */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Month-on-Month Net Partner Earnings (2026)
                </h3>
                <div className="grid grid-cols-6 gap-3 items-end h-40 pt-4 px-3 bg-white rounded-2xl border border-emerald-100">
                  {[
                    { m: 'Jun', pct: '45%', val: '₹24.5k' },
                    { m: 'Jul', pct: '58%', val: '₹31.2k' },
                    { m: 'Aug', pct: '66%', val: '₹35.8k' },
                    { m: 'Sep', pct: '78%', val: '₹41.4k' },
                    { m: 'Oct', pct: '88%', val: '₹46.9k' },
                    { m: 'Nov', pct: '100%', val: '₹52.4k' },
                  ].map((item) => (
                    <div
                      key={item.m}
                      className="flex flex-col items-center gap-1.5 h-full justify-end"
                    >
                      <span className="text-[10px] font-extrabold text-emerald-700">
                        {item.val}
                      </span>
                      <div
                        className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600 to-teal-400 shadow"
                        style={{ height: item.pct }}
                      />
                      <span className="text-xs font-bold text-slate-700 pb-1">
                        {item.m}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              7.9B DEDICATED PAYOUT SETTLEMENT LEDGER (/provider/payouts)
             ========================================================= */}
          {section === 'payouts' && (
            <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-extrabold uppercase text-emerald-600">
                    Bank & UPI Settlement Ledger
                  </span>
                  <h1 className="text-2xl font-extrabold text-slate-900">
                    Detailed Payout Ledger & Statements
                  </h1>
                  <p className="text-xs text-slate-500">
                    Track settled bank transfers, pending disbursals, and download GST/commission statements.
                  </p>
                </div>
                <button
                  onClick={() =>
                    showToast(
                      'Downloaded Provider_Payout_Statement_Nov2026.csv (Demo)!',
                      'success'
                    )
                  }
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-extrabold inline-flex items-center gap-1.5 shadow-lg"
                >
                  <Download className="w-3.5 h-3.5" /> Download Statement CSV
                </button>
              </div>

              <div className="flex items-center gap-2">
                {['All', 'Paid', 'Pending'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setPayoutStatusFilter(st)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold ${
                      payoutStatusFilter === st
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st} Settlements
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto rounded-2xl border border-emerald-200">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white text-[11px] font-extrabold uppercase">
                      <th className="p-3.5 text-left">Payout / Date</th>
                      <th className="p-3.5 text-left">Booking & Service</th>
                      <th className="p-3.5 text-right">Gross</th>
                      <th className="p-3.5 text-right">Commission</th>
                      <th className="p-3.5 text-right">Net Payable</th>
                      <th className="p-3.5 text-right">Status & Bank Ref</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {payouts
                      .filter(
                        (p) =>
                          payoutStatusFilter === 'All' ||
                          p.status === payoutStatusFilter
                      )
                      .map((p) => (
                        <tr key={p.id} className="hover:bg-emerald-50/40">
                          <td className="p-3.5 font-extrabold text-slate-900">
                            {p.id}
                            <span className="block text-[10px] text-slate-500 font-normal">
                              {p.date}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-emerald-700">
                              {p.bookingId}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {p.serviceName} ({p.customerName})
                            </div>
                          </td>
                          <td className="p-3.5 text-right font-semibold">
                            ₹{p.grossAmount}
                          </td>
                          <td className="p-3.5 text-right text-rose-600 font-bold">
                            -₹{p.platformCommission}
                          </td>
                          <td className="p-3.5 text-right font-extrabold text-emerald-700 text-sm">
                            ₹{p.netAmount}
                          </td>
                          <td className="p-3.5 text-right">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              {p.status}
                            </span>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                              {p.transactionRef}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================
              7.10 REVIEWS MANAGEMENT (/provider/reviews)
             ========================================================= */}
          {section === 'reviews' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-5">
              <h1 className="text-2xl font-extrabold text-slate-900">
                Customer Reviews & Provider Responses
              </h1>

              <div className="space-y-4">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-2xl border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-slate-900 text-sm">
                        {r.customerName} ({r.city}) — {r.serviceName}
                      </div>
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-4 h-4 fill-amber-400" /> {r.rating}.0
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{r.comment}</p>
                    {r.providerReply && (
                      <div className="p-3 rounded-xl bg-emerald-50 text-xs text-emerald-950">
                        <strong>Your Response:</strong> {r.providerReply}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyTexts[r.id] || ''}
                        onChange={(e) =>
                          setReplyTexts((prev) => ({
                            ...prev,
                            [r.id]: e.target.value,
                          }))
                        }
                        placeholder="Write a public response to this customer..."
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                      />
                      <button
                        onClick={() => {
                          if (!replyTexts[r.id]?.trim()) return;
                          replyToReview(r.id, replyTexts[r.id].trim());
                          setReplyTexts((prev) => ({ ...prev, [r.id]: '' }));
                        }}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                      >
                        Post Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              7.11 PORTFOLIO MANAGEMENT (/provider/portfolio)
             ========================================================= */}
          {section === 'portfolio' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-6">
              <h1 className="text-2xl font-extrabold text-slate-900">
                Portfolio Gallery Manager
              </h1>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={portTitle}
                  onChange={(e) => setPortTitle(e.target.value)}
                  placeholder="Work Title (e.g. 3-Phase DB Setup)"
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                />
                <input
                  type="text"
                  value={portDesc}
                  onChange={(e) => setPortDesc(e.target.value)}
                  placeholder="Short description..."
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                />
                <button
                  onClick={() => {
                    if (!portTitle.trim()) return;
                    addPortfolioItem(currentProvider.id, {
                      title: portTitle.trim(),
                      description:
                        portDesc.trim() ||
                        'Completed for residential client in Mohali.',
                      categorySlug: currentProvider.categorySlug,
                      image:
                        'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
                      completionDate: '2026-11-14',
                    });
                    setPortTitle('');
                    setPortDesc('');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  + Add Portfolio Item
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentProvider.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 flex items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.description}
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          deletePortfolioItem(currentProvider.id, item.id)
                        }
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                        aria-label="Delete portfolio item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              7.12 PROVIDER PROFILE EDITOR (/provider/profile)
             ========================================================= */}
          {section === 'profile' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-5">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Complete Provider Profile Editor
                </h1>
                <Link
                  href={`/professionals/${currentProvider.slug}`}
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  Preview Public Profile →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Display Name / Agency Name
                  </label>
                  <input
                    type="text"
                    value={profName}
                    onChange={(e) => setProfName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Visiting Charge (₹)
                  </label>
                  <input
                    type="number"
                    value={profFee}
                    onChange={(e) => setProfFee(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Operating Radius (km)
                  </label>
                  <input
                    type="number"
                    value={profRadius}
                    onChange={(e) => setProfRadius(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  About Professional Bio
                </label>
                <textarea
                  rows={3}
                  value={profAbout}
                  onChange={(e) => setProfAbout(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                />
              </div>

              <button
                onClick={() =>
                  updateProviderProfile(currentProvider.id, {
                    name: profName,
                    visitingCharge: profFee,
                    serviceRadiusKm: profRadius,
                    about: profAbout,
                  })
                }
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                Save Profile & Publish Live
              </button>
            </div>
          )}

          {/* =========================================================
              7.13 BUSINESS TEAM MANAGEMENT (/provider/team)
             ========================================================= */}
          {section === 'team' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">
                    Business Team & Technician Roster
                  </h1>
                  <p className="text-xs text-slate-500">
                    Add technicians, toggle active status, and assign team members to incoming bookings
                  </p>
                </div>
                {currentProvider.providerType !== 'business' && (
                  <button
                    onClick={() => setActiveProviderId('prov-2')}
                    className="px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-extrabold"
                  >
                    Switch to Business Agency (Aman Electrical Works)
                  </button>
                )}
              </div>

              {/* Add Technician Form */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  value={techName}
                  onChange={(e) => setTechName(e.target.value)}
                  placeholder="Technician Name *"
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                />
                <input
                  type="text"
                  value={techRole}
                  onChange={(e) => setTechRole(e.target.value)}
                  placeholder="Specialization Role"
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                />
                <input
                  type="text"
                  value={techPhone}
                  onChange={(e) => setTechPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                />
                <button
                  onClick={() => {
                    if (!techName.trim()) return;
                    addTeamTechnician(currentProvider.id, {
                      name: techName.trim(),
                      role: techRole,
                      phone: techPhone,
                      experienceYears: techExp,
                      skills: ['Wiring & Rewiring', 'Fan Installation'],
                      avatar:
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                      available: true,
                      active: true,
                    });
                    setTechName('');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  + Add Technician
                </button>
              </div>

              {/* Team Roster List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(currentProvider.teamMembers || []).map((tech) => (
                  <div
                    key={tech.id}
                    className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={tech.avatar}
                        alt={tech.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm">
                          {tech.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {tech.role} • {tech.experienceYears} yrs exp
                        </div>
                        <div className="text-[11px] text-emerald-600 font-bold">
                          Assigned Jobs: {tech.assignedJobsCount}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <button
                        onClick={() =>
                          toggleTeamTechnician(currentProvider.id, tech.id)
                        }
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          tech.active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {tech.active ? 'Active' : 'Disabled'}
                      </button>
                      <button
                        onClick={() =>
                          assignTechnicianToBooking(
                            bookings[0]?.id || 'PB-2026-8901',
                            tech.id,
                            tech.name
                          )
                        }
                        className="text-[11px] font-bold text-emerald-600 hover:underline"
                      >
                        Assign to #PB-2026-8901
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
