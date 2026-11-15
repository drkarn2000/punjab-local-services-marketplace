'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  DollarSign,
  Download,
  FileSpreadsheet,
  FileText,
  Globe,
  IndianRupee,
  Layers,
  LayoutDashboard,
  Lock,
  MapPin,
  MessageSquare,
  Plus,
  Printer,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
  Users,
  Wallet,
  Wrench,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import AdminReportsAnalytics from '@/components/templates/AdminReportsAnalytics';
import {
  AdminRoleProfile,
  BOOKING_LIFECYCLE_STEPS,
  BookingStatus,
  CategorySlug,
  CitySlug,
} from '@/types/marketplace';

export type AdminPortalSection =
  | 'dashboard'
  | 'customers'
  | 'providers'
  | 'verification'
  | 'categories'
  | 'subcategories'
  | 'services'
  | 'cities'
  | 'service-areas'
  | 'bookings'
  | 'pricing'
  | 'finance'
  | 'reconciliation'
  | 'payouts'
  | 'refunds'
  | 'support'
  | 'reviews'
  | 'cms'
  | 'translations'
  | 'reports'
  | 'roles'
  | 'settings';

const ADMIN_PROFILES: AdminRoleProfile[] = [
  'Super Admin',
  'Operations Manager',
  'Verification Manager',
  'Finance Manager',
  'Support Executive',
  'Content Manager',
];

const PROFILE_DEFAULT_ROUTE: Record<AdminRoleProfile, string> = {
  'Super Admin': '/admin',
  'Operations Manager': '/admin/bookings',
  'Verification Manager': '/admin/verification',
  'Finance Manager': '/admin/reconciliation',
  'Support Executive': '/admin/support',
  'Content Manager': '/admin/cms',
};

const PROFILE_META: Record<
  AdminRoleProfile,
  { badgeColor: string; tagline: string; focusDesc: string }
> = {
  'Super Admin': {
    badgeColor: 'from-amber-400 via-orange-500 to-rose-500',
    tagline: 'Full-Platform Governance & RBAC Control',
    focusDesc:
      'Unrestricted access across all 22 modules: Operations, KYC Verification, Finance, CMS, Multilingual Translations & System Security.',
  },
  'Operations Manager': {
    badgeColor: 'from-blue-500 via-indigo-500 to-cyan-500',
    tagline: 'Live Dispatch, Bookings & Service Operations',
    focusDesc:
      'Focused workspace for managing live bookings, customers, providers, categories, subcategories, services, and Punjab city coverage.',
  },
  'Verification Manager': {
    badgeColor: 'from-emerald-500 via-teal-500 to-cyan-600',
    tagline: 'Provider KYC, Background & Skill Compliance',
    focusDesc:
      'Focused workspace for auditing provider identity documents, trade certificates, compliance checklists, and issuing Verified badges.',
  },
  'Finance Manager': {
    badgeColor: 'from-violet-600 via-purple-600 to-fuchsia-600',
    tagline: 'Ledger, Commissions, Payouts & Reconciliation',
    focusDesc:
      'Focused workspace for platform commissions, hybrid estimate audits, provider payout releases, customer refunds, and reconciliation.',
  },
  'Support Executive': {
    badgeColor: 'from-rose-500 via-pink-600 to-orange-500',
    tagline: 'Customer & Partner Helpdesk Resolution',
    focusDesc:
      'Focused workspace for resolving customer complaints, estimate disputes, booking issues, refund requests, and review moderation.',
  },
  'Content Manager': {
    badgeColor: 'from-cyan-500 via-blue-600 to-indigo-600',
    tagline: 'CMS, Banners, Local SEO & Trilingual Dictionary',
    focusDesc:
      'Focused workspace for managing homepage sections, promotional banners, city SEO landing pages, and English/Punjabi/Hindi translations.',
  },
};

const PROFILE_ALLOWED_SECTIONS: Record<AdminRoleProfile, AdminPortalSection[]> = {
  'Super Admin': [
    'dashboard',
    'customers',
    'providers',
    'verification',
    'categories',
    'subcategories',
    'services',
    'cities',
    'service-areas',
    'bookings',
    'pricing',
    'finance',
    'reconciliation',
    'payouts',
    'refunds',
    'support',
    'reviews',
    'cms',
    'translations',
    'reports',
    'roles',
    'settings',
  ],
  'Operations Manager': [
    'dashboard',
    'bookings',
    'customers',
    'providers',
    'categories',
    'subcategories',
    'services',
    'cities',
    'service-areas',
    'reports',
  ],
  'Verification Manager': ['dashboard', 'verification', 'providers', 'reports'],
  'Finance Manager': [
    'dashboard',
    'reconciliation',
    'finance',
    'payouts',
    'refunds',
    'pricing',
    'bookings',
    'reports',
  ],
  'Support Executive': [
    'dashboard',
    'support',
    'refunds',
    'reviews',
    'bookings',
    'customers',
  ],
  'Content Manager': [
    'dashboard',
    'cms',
    'translations',
    'categories',
    'subcategories',
    'cities',
  ],
};

export function AdminPortalWorkspace({
  section,
}: {
  section: AdminPortalSection;
}) {
  const router = useRouter();
  const {
    activeAdminProfile,
    setActiveAdminProfile,
    setCurrentRole,
    cities,
    setCities,
    categories,
    setCategories,
    subcategories,
    setSubcategories,
    providers,
    setProviders,
    customers,
    setCustomers,
    bookings,
    setBookings,
    reviews,
    payouts,
    setPayouts,
    reconciliations,
    resolveReconciliation,
    tickets,
    replyToTicket,
    updateTicketStatus,
    offers,
    setOffers,
    cmsSections,
    updateCmsSection,
    setCmsSections,
    translations,
    updateTranslationEntry,
    adminUsers,
    setAdminUsers,
    verifyProvider,
    updateBookingStatus,
    moderateReview,
    showToast,
  } = useMarketplace();

  // Filter States
  const [globalSearch, setGlobalSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [providerTypeFilter, setProviderTypeFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');

  // Customer Detail State
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    customers[0]?.id || null
  );

  // Provider Detail & Verification State
  const [selectedProviderDetailId, setSelectedProviderDetailId] = useState<string | null>(
    providers[0]?.id || null
  );
  const [selectedProviderId, setSelectedProviderId] = useState<string>('prov-11');
  const [verificationRemark, setVerificationRemark] = useState<string>(
    'Documents verified against Punjab Trade Registry & Aadhaar KYC.'
  );
  const [checklistState, setChecklistState] = useState({
    identity: true,
    address: true,
    skills: true,
    background: true,
  });

  // Category / Subcategory / Service Add State
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryFee, setNewCategoryFee] = useState(199);
  const [newCategoryComm, setNewCategoryComm] = useState(15);

  const [newSubcatName, setNewSubcatName] = useState('');
  const [newSubcatParent, setNewSubcatParent] = useState<CategorySlug>('electrician');
  const [newSubcatPrice, setNewSubcatPrice] = useState(299);
  const [newSubcatSeoTitle, setNewSubcatSeoTitle] = useState('');

  const [selectedSubcatForService, setSelectedSubcatForService] = useState<string>(
    subcategories[0]?.id || 'sub-1'
  );
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState(349);
  const [newServiceDuration, setNewServiceDuration] = useState('45 mins');

  const [newLocalityName, setNewLocalityName] = useState('');
  const [selectedCitySlugForArea, setSelectedCitySlugForArea] = useState<CitySlug>('mohali');

  // Booking Management Detail Inspector
  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    bookings[0]?.id || 'PB-84920'
  );
  const [adminNoteDraft, setAdminNoteDraft] = useState('');
  const [reassignProviderId, setReassignProviderId] = useState('');

  // Pricing Calculator & Coupon State
  const [calcServiceAmt, setCalcServiceAmt] = useState(1450);
  const [calcProviderType, setCalcProviderType] = useState<'individual' | 'business'>('individual');
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(150);

  // Reconciliation Note State
  const [reconNotes, setReconNotes] = useState<Record<string, string>>({});

  // Support Ticket Reply State
  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    tickets[0]?.id || 'TKT-2041'
  );
  const [ticketReplyText, setTicketReplyText] = useState('');

  // CMS New Content State
  const [newCmsTitle, setNewCmsTitle] = useState('');
  const [newCmsPage, setNewCmsPage] = useState('Homepage');
  const [newCmsSeoTitle, setNewCmsSeoTitle] = useState('');

  // Translation Editor State
  const [translationSearch, setTranslationSearch] = useState('');
  const [translationPageFilter, setTranslationPageFilter] = useState('all');
  const [editingTranslationKey, setEditingTranslationKey] = useState<string | null>(null);
  const [transEn, setTransEn] = useState('');
  const [transPa, setTransPa] = useState('');
  const [transHi, setTransHi] = useState('');

  // Reports State
  const [activeReportType, setActiveReportType] = useState<string>('Booking Report');
  const [reportDateRange, setReportDateRange] = useState<string>('Last 30 Days');

  // Admin User State
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<AdminRoleProfile>('Operations Manager');
  const [selectedAdminUserId, setSelectedAdminUserId] = useState<string>(
    adminUsers[0]?.id || 'adm-1'
  );

  // Platform Settings State
  const [platformSettings, setPlatformSettings] = useState({
    platformName: 'Punjab Services — Local Home & Tech Services',
    supportEmail: 'support@punjabservices.demo',
    supportHotline: '+91 172-XXX-XXXX (Demo)',
    defaultLanguage: 'en',
    cancellationWindowHours: 2,
    freeCancellationBeforeDispatch: true,
    defaultVisitingCharge: 199,
    defaultCommissionPercent: 15,
    businessCommissionDiscount: 2,
    maintenanceMode: false,
    requireCustomerEstimateApproval: true,
  });

  const allowedSections = PROFILE_ALLOWED_SECTIONS[activeAdminProfile];
  const hasAccess = allowedSections.includes(section);
  const profileInfo = PROFILE_META[activeAdminProfile];

  const handleProfileSwitch = (nextProfile: AdminRoleProfile) => {
    setActiveAdminProfile(nextProfile);
    setCurrentRole('admin');
    const targetRoute = PROFILE_DEFAULT_ROUTE[nextProfile];
    showToast(
      `Active Profile: ${nextProfile} — Opening ${targetRoute}`,
      'info'
    );
    router.push(targetRoute);
  };

  const exportCsvFile = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        headers.join(','),
        ...rows.map((r) =>
          r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')
        ),
      ].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filename} successfully.`, 'success');
  };

  // KPI Metrics
  const totalCustomers = customers.length;
  const totalProviders = providers.length;
  const verifiedProviders = providers.filter((p) => p.verificationStatus === 'Approved').length;
  const pendingVerifications = providers.filter(
    (p) =>
      p.verificationStatus === 'Under Review' ||
      p.verificationStatus === 'Submitted' ||
      p.verificationStatus === 'Additional Information Required'
  ).length;
  const totalBookings = bookings.length;
  const todaysBookings = bookings.filter((b) => b.date.includes('2026-11-14')).length;
  const activeJobs = bookings.filter(
    (b) =>
      ![
        'Work Completed',
        'Payment Completed',
        'Review Submitted',
        'Cancelled',
        'Rejected',
      ].includes(b.status)
  ).length;
  const completedJobs = bookings.filter((b) =>
    ['Work Completed', 'Payment Completed', 'Review Submitted'].includes(b.status)
  ).length;
  const cancelledBookings = bookings.filter((b) =>
    ['Cancelled', 'Rejected'].includes(b.status)
  ).length;
  const grossBookingValue = bookings.reduce((sum, b) => sum + b.finalTotal, 0);
  const totalPlatformCommission = payouts.reduce((sum, p) => sum + p.platformCommission, 0);

  const navGroups = [
    {
      group: 'Overview & Users',
      items: [
        { id: 'dashboard', label: 'Overview Dashboard', href: '/admin', icon: LayoutDashboard },
        { id: 'customers', label: 'Customers Directory', href: '/admin/customers', icon: Users },
        { id: 'providers', label: 'Service Providers', href: '/admin/providers', icon: Wrench },
        {
          id: 'verification',
          label: 'Verification Queue',
          href: '/admin/verification',
          icon: ShieldCheck,
          badge: pendingVerifications,
        },
      ],
    },
    {
      group: 'Catalog & Cities',
      items: [
        { id: 'categories', label: '5 Main Categories', href: '/admin/categories', icon: Layers },
        { id: 'subcategories', label: '40 Subcategories', href: '/admin/subcategories', icon: Tag },
        { id: 'services', label: 'Service Rate Cards', href: '/admin/services', icon: Sliders },
        { id: 'cities', label: 'Launch Cities (3)', href: '/admin/cities', icon: Building2 },
        { id: 'service-areas', label: 'Sector / Area Matrix', href: '/admin/service-areas', icon: MapPin },
      ],
    },
    {
      group: 'Operations & Finance',
      items: [
        { id: 'bookings', label: 'Master Bookings', href: '/admin/bookings', icon: Calendar },
        { id: 'pricing', label: 'Pricing & Coupons', href: '/admin/pricing', icon: DollarSign },
        { id: 'finance', label: 'Finance & Revenue', href: '/admin/finance', icon: IndianRupee },
        {
          id: 'reconciliation',
          label: 'Reconciliation Audit',
          href: '/admin/reconciliation',
          icon: FileSpreadsheet,
        },
        { id: 'payouts', label: 'Provider Payouts', href: '/admin/payouts', icon: Wallet },
        { id: 'refunds', label: 'Customer Refunds', href: '/admin/refunds', icon: RefreshCw },
      ],
    },
    {
      group: 'Trust, CMS & System',
      items: [
        { id: 'support', label: 'Support Helpdesk', href: '/admin/support', icon: MessageSquare },
        { id: 'reviews', label: 'Review Moderation', href: '/admin/reviews', icon: Star },
        { id: 'cms', label: 'CMS & SEO Studio', href: '/admin/cms', icon: FileText },
        {
          id: 'translations',
          label: 'Translations (EN/PA/HI)',
          href: '/admin/translations',
          icon: Globe,
        },
        { id: 'reports', label: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3 },
        { id: 'roles', label: 'Roles & Permissions', href: '/admin/roles', icon: Shield },
        { id: 'settings', label: 'Platform Settings', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b132b] via-[#111d42] to-[#1b2a5e] text-slate-900 pb-16">
      {/* Glowing Admin Top Command Bar */}
      <div className="bg-gradient-to-r from-[#060d21] via-[#0c1b40] to-[#152759] text-white border-b border-blue-500/30 shadow-[0_8px_32px_rgba(37,99,235,0.28)] sticky top-0 z-40 backdrop-blur-xl">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-center gap-3">
          {/* Controls: Search + Active Role Switcher + Portal Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-cyan-300 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  setSearchQuery(e.target.value);
                }}
                placeholder="Filter records..."
                className="bg-slate-900/90 border border-blue-400/40 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 w-44 shadow-inner"
              />
            </div>

            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-950/90 to-indigo-950/90 border border-cyan-400/40 rounded-xl px-3.5 py-2 shadow-[0_0_18px_rgba(6,182,212,0.2)]">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-xs flex items-center gap-1.5">
                <span className="text-cyan-300 text-[11px] font-extrabold uppercase tracking-wider">
                  Active
                </span>
                <select
                  value={activeAdminProfile}
                  onChange={(e) =>
                    handleProfileSwitch(e.target.value as AdminRoleProfile)
                  }
                  className="bg-transparent text-white font-extrabold focus:outline-none cursor-pointer pr-1"
                >
                  {ADMIN_PROFILES.map((prof) => (
                    <option key={prof} value={prof} className="bg-slate-900 text-white font-bold">
                      {prof}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Link
              href="/provider/dashboard"
              className="text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-xl shadow-[0_0_16px_rgba(124,58,237,0.45)] transition"
            >
              Provider Portal →
            </Link>
            <Link
              href="/"
              className="text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2.5 rounded-xl shadow-[0_0_16px_rgba(6,182,212,0.45)] transition"
            >
              Customer Website →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Navigation (Dynamically filtered by Active Permission Profile!) */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-gradient-to-b from-[#111e42] to-[#0d1736] text-white rounded-3xl border border-blue-400/30 shadow-[0_12px_36px_rgba(0,0,0,0.45)] p-4 space-y-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7.5rem)] lg:overflow-y-auto">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-600/25 to-indigo-600/25 border border-blue-400/30">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-300">
                Active Role Scope
              </div>
              <div className="text-sm font-extrabold text-white mt-0.5">
                {activeAdminProfile}
              </div>
              <div className="text-[11px] text-blue-200 mt-0.5">
                Showing {allowedSections.length} authorized modules
              </div>
            </div>

            {navGroups.map((group) => {
              const visibleItems = group.items.filter((i) =>
                allowedSections.includes(i.id as AdminPortalSection)
              );
              if (visibleItems.length === 0) return null;
              return (
                <div key={group.group}>
                  <div className="px-2.5 pb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-cyan-400/90">
                    {group.group}
                  </div>
                  <div className="space-y-1">
                    {visibleItems.map((item) => {
                      const Icon = item.icon;
                      const active = section === item.id;
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            active
                              ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.55)] translate-x-1'
                              : 'text-slate-200 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2.5 truncate">
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </span>
                          {item.badge ? (
                            <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-amber-400 text-slate-950 shadow">
                              {item.badge}
                            </span>
                          ) : null}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {activeAdminProfile !== 'Super Admin' && (
              <button
                onClick={() => handleProfileSwitch('Super Admin')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-lg transition"
              >
                Unlock All 22 Modules (Super Admin)
              </button>
            )}
          </div>
        </aside>

        {/* Main Section Content */}
        <main className="lg:col-span-9 space-y-6">
          {!hasAccess ? (
            <div className="bg-white rounded-3xl border-2 border-rose-300 p-8 text-center shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full bg-rose-100 text-rose-800">
                Role Permission Restricted
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-3">
                {activeAdminProfile} does not have access to &ldquo;{section}&rdquo;
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2">
                Authorized modules for <strong>{activeAdminProfile}</strong>:{' '}
                {allowedSections.join(', ')}.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => handleProfileSwitch('Super Admin')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg"
                >
                  Switch to Super Admin (Full Access)
                </button>
                <Link
                  href={PROFILE_DEFAULT_ROUTE[activeAdminProfile]}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm"
                >
                  Go to {activeAdminProfile} Home →
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* =========================================================
                  8.1 ADMIN OVERVIEW DASHBOARD (/admin) — ALL CARDS CLICKABLE & COLORFUL
                 ========================================================= */}
              {section === 'dashboard' && (
                <div className="space-y-6">
                  {/* Animated Right-to-Left Governance Strip (Sticky on Scroll) */}
                  <div className="w-full overflow-hidden rounded-2xl bg-[#091432]/95 backdrop-blur-md border border-cyan-400/30 py-2.5 px-4 shadow-[0_8px_24px_rgba(6,182,212,0.18)] lg:sticky lg:top-[64px] z-30">
                    <div className="animate-marquee-rtl items-center gap-3 text-[11px] font-extrabold uppercase tracking-wider text-white">
                      <span
                        className={`px-2.5 py-0.5 rounded-full bg-gradient-to-r ${profileInfo.badgeColor} text-white shadow-sm`}
                      >
                        {activeAdminProfile} Mode
                      </span>
                      <span className="text-cyan-300">{profileInfo.tagline}</span>
                      <span className="text-blue-400">•</span>
                      <span className="text-white">{profileInfo.focusDesc}</span>
                    </div>
                  </div>

                  {/* 12 Clickable Colorful Gradient KPI Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[
                      {
                        label: 'Total Customers',
                        value: totalCustomers,
                        sub: 'Click to manage customers →',
                        href: '/admin/customers',
                        grad: 'from-blue-600 via-blue-700 to-indigo-800',
                      },
                      {
                        label: 'Total Providers',
                        value: totalProviders,
                        sub: 'Click to view directory →',
                        href: '/admin/providers',
                        grad: 'from-indigo-600 via-purple-700 to-violet-800',
                      },
                      {
                        label: 'Verified Providers',
                        value: verifiedProviders,
                        sub: 'KYC & skill approved →',
                        href: '/admin/providers',
                        grad: 'from-emerald-500 via-emerald-600 to-teal-800',
                      },
                      {
                        label: 'Pending Verifications',
                        value: pendingVerifications,
                        sub: 'Open KYC Queue →',
                        href: '/admin/verification',
                        grad: 'from-amber-500 via-orange-500 to-red-600',
                      },
                      {
                        label: 'Total Bookings',
                        value: totalBookings,
                        sub: 'Open Master Bookings →',
                        href: '/admin/bookings',
                        grad: 'from-cyan-600 via-blue-600 to-indigo-700',
                      },
                      {
                        label: "Today's Bookings",
                        value: todaysBookings,
                        sub: 'View today schedule →',
                        href: '/admin/bookings',
                        grad: 'from-sky-500 via-blue-600 to-blue-800',
                      },
                      {
                        label: 'Active Jobs in Field',
                        value: activeJobs,
                        sub: 'Track live status →',
                        href: '/admin/bookings',
                        grad: 'from-violet-600 via-fuchsia-600 to-purple-800',
                      },
                      {
                        label: 'Completed Jobs',
                        value: completedJobs,
                        sub: 'View settled jobs →',
                        href: '/admin/reconciliation',
                        grad: 'from-teal-500 via-emerald-600 to-green-800',
                      },
                      {
                        label: 'Cancelled / Refunds',
                        value: cancelledBookings,
                        sub: 'Manage refunds →',
                        href: '/admin/refunds',
                        grad: 'from-rose-500 via-pink-600 to-red-800',
                      },
                      {
                        label: 'Total Revenue (GMV)',
                        value: `₹${grossBookingValue.toLocaleString('en-IN')}`,
                        sub: 'Open Finance Ledger →',
                        href: '/admin/finance',
                        grad: 'from-emerald-600 via-teal-600 to-cyan-800',
                      },
                      {
                        label: 'Platform Commission',
                        value: `₹${totalPlatformCommission.toLocaleString('en-IN')}`,
                        sub: 'Configure rates →',
                        href: '/admin/pricing',
                        grad: 'from-blue-600 via-indigo-600 to-purple-800',
                      },
                      {
                        label: 'Open Support Tickets',
                        value: tickets.filter((t) => t.status !== 'Closed').length,
                        sub: 'Open Helpdesk →',
                        href: '/admin/support',
                        grad: 'from-orange-500 via-amber-600 to-rose-700',
                      },
                    ].map((kpi) => (
                      <Link
                        key={kpi.label}
                        href={kpi.href}
                        className={`group rounded-2xl p-4 text-white bg-gradient-to-br ${kpi.grad} shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_35px_rgba(59,130,246,0.45)] hover:-translate-y-1 transition-all border border-white/15 flex flex-col justify-between`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white/85">
                            {kpi.label}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </div>
                        <div className="text-2xl font-extrabold mt-2 tracking-tight">
                          {kpi.value}
                        </div>
                        <span className="mt-2 text-[11px] font-semibold text-white/90 underline decoration-white/40">
                          {kpi.sub}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* 6 Visual Charts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-900">
                            1. Bookings by Category (Click to Filter)
                          </h3>
                          <p className="text-xs text-slate-500">
                            Distribution across 5 core categories
                          </p>
                        </div>
                        <Link
                          href="/admin/categories"
                          className="text-xs font-bold text-blue-600 hover:underline"
                        >
                          Manage Categories →
                        </Link>
                      </div>
                      <div className="space-y-3">
                        {[
                          { name: 'Electrician', pct: 34, count: 142, color: 'from-blue-500 to-indigo-600' },
                          { name: 'Plumber', pct: 24, count: 98, color: 'from-cyan-500 to-blue-600' },
                          {
                            name: 'Computer & Laptop Repair',
                            pct: 18,
                            count: 76,
                            color: 'from-violet-500 to-purple-600',
                          },
                          { name: 'Carpenter', pct: 14, count: 58, color: 'from-amber-500 to-orange-600' },
                          { name: 'Mobile Repair', pct: 10, count: 42, color: 'from-emerald-500 to-teal-600' },
                        ].map((row) => (
                          <Link
                            href="/admin/categories"
                            key={row.name}
                            className="block group"
                          >
                            <div className="flex justify-between text-xs font-bold text-slate-700 group-hover:text-blue-700 mb-1">
                              <span>{row.name}</span>
                              <span>
                                {row.count} bookings ({row.pct}%)
                              </span>
                            </div>
                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${row.color}`}
                                style={{ width: `${row.pct}%` }}
                              />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-900">
                            2. Launch City Performance
                          </h3>
                          <p className="text-xs text-slate-500">
                            Mohali, Chandigarh & Hoshiarpur split
                          </p>
                        </div>
                        <Link
                          href="/admin/cities"
                          className="text-xs font-bold text-blue-600 hover:underline"
                        >
                          Manage Cities →
                        </Link>
                      </div>
                      <div className="space-y-3">
                        {[
                          {
                            city: 'Chandigarh',
                            pct: 46,
                            count: 192,
                            gmv: '₹1,48,500',
                            color: 'from-blue-600 to-cyan-500',
                          },
                          {
                            city: 'Mohali',
                            pct: 38,
                            count: 158,
                            gmv: '₹1,22,400',
                            color: 'from-emerald-600 to-teal-500',
                          },
                          {
                            city: 'Hoshiarpur',
                            pct: 16,
                            count: 66,
                            gmv: '₹51,200',
                            color: 'from-amber-500 to-orange-500',
                          },
                        ].map((item) => (
                          <Link
                            href="/admin/cities"
                            key={item.city}
                            className="block p-3 rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border border-blue-200/70 hover:border-blue-400 transition"
                          >
                            <div className="flex justify-between items-center text-xs font-extrabold text-slate-800 mb-1.5">
                              <span>{item.city}</span>
                              <span className="text-blue-700">
                                {item.count} jobs • {item.gmv}
                              </span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                                style={{ width: `${item.pct}%` }}
                              />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity Widgets */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-extrabold text-sm text-slate-900">
                          Recent Bookings (Click to Inspect)
                        </h3>
                        <Link
                          href="/admin/bookings"
                          className="text-xs font-bold text-blue-600 hover:underline"
                        >
                          Open Master Bookings →
                        </Link>
                      </div>
                      <div className="space-y-2.5">
                        {bookings.slice(0, 4).map((b) => (
                          <Link
                            href="/admin/bookings"
                            key={b.id}
                            className="p-3 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/60 border border-blue-100 hover:border-blue-400 flex items-center justify-between gap-2 transition"
                          >
                            <div>
                              <div className="text-xs font-extrabold text-slate-900">
                                {b.id} • {b.subcategoryName}
                              </div>
                              <div className="text-[11px] text-slate-600">
                                {b.customerName} → {b.providerName} ({b.address.city})
                              </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-sm">
                              {b.status}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-extrabold text-sm text-slate-900">
                          Pending Provider Verifications
                        </h3>
                        <Link
                          href="/admin/verification"
                          className="text-xs font-bold text-blue-600 hover:underline"
                        >
                          Open KYC Queue →
                        </Link>
                      </div>
                      <div className="space-y-2.5">
                        {providers
                          .filter((p) => p.verificationStatus !== 'Approved')
                          .map((p) => (
                            <Link
                              href="/admin/verification"
                              key={p.id}
                              className="p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/70 border border-amber-200 hover:border-amber-400 flex items-center justify-between gap-2 transition"
                            >
                              <div>
                                <div className="text-xs font-extrabold text-slate-900 capitalize">
                                  {p.name} ({p.providerType})
                                </div>
                                <div className="text-[11px] text-slate-600">
                                  {p.categoryName} • {p.cityName} • {p.documents.length} Docs
                                </div>
                              </div>
                              <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[11px] font-bold shadow">
                                Verify Now →
                              </span>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.2 CUSTOMER MANAGEMENT (/admin/customers)
                 ========================================================= */}
              {section === 'customers' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900">
                        Customer Directory & Account Governance
                      </h2>
                      <p className="text-xs text-slate-500">
                        Search customers, inspect 360° booking/payment/review history, and suspend or reactivate accounts.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      >
                        <option value="all">All Cities</option>
                        <option value="mohali">Mohali</option>
                        <option value="chandigarh">Chandigarh</option>
                        <option value="hoshiarpur">Hoshiarpur</option>
                      </select>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search customer name, phone..."
                        className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs w-56"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-[11px] font-extrabold uppercase">
                            <th className="p-3.5">Customer</th>
                            <th className="p-3.5">City</th>
                            <th className="p-3.5">Contact (Demo)</th>
                            <th className="p-3.5">Bookings</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-xs">
                          {customers
                            .filter(
                              (c) =>
                                (cityFilter === 'all' || c.citySlug === cityFilter) &&
                                (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  c.phone.toLowerCase().includes(searchQuery.toLowerCase()))
                            )
                            .map((cust) => (
                              <tr key={cust.id} className="hover:bg-blue-50/50">
                                <td className="p-3.5 font-bold text-slate-900">
                                  {cust.name}
                                  <div className="text-[11px] font-normal text-slate-500">
                                    Joined {cust.joinedDate}
                                  </div>
                                </td>
                                <td className="p-3.5 capitalize font-semibold text-slate-700">
                                  {cust.citySlug}
                                </td>
                                <td className="p-3.5 text-slate-600">
                                  <div>{cust.phone}</div>
                                  <div className="text-[11px] text-slate-400">{cust.email}</div>
                                </td>
                                <td className="p-3.5 font-bold text-blue-700">
                                  {cust.totalBookings} bookings
                                </td>
                                <td className="p-3.5">
                                  <span
                                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                      cust.status === 'Active'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-rose-100 text-rose-800'
                                    }`}
                                  >
                                    {cust.status}
                                  </span>
                                </td>
                                <td className="p-3.5 text-right space-x-2">
                                  <button
                                    onClick={() => setSelectedCustomerId(cust.id)}
                                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-sm"
                                  >
                                    Inspect 360°
                                  </button>
                                  <button
                                    onClick={() => {
                                      const nextStatus =
                                        cust.status === 'Active' ? 'Suspended' : 'Active';
                                      setCustomers((prev) =>
                                        prev.map((item) =>
                                          item.id === cust.id
                                            ? { ...item, status: nextStatus }
                                            : item
                                        )
                                      );
                                      showToast(
                                        `Customer ${cust.name} marked as ${nextStatus}`,
                                        nextStatus === 'Active' ? 'success' : 'warning'
                                      );
                                    }}
                                    className={`px-3 py-1.5 rounded-lg font-bold ${
                                      cust.status === 'Active'
                                        ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                    }`}
                                  >
                                    {cust.status === 'Active' ? 'Suspend' : 'Reactivate'}
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {selectedCustomerId && (
                    <div className="bg-white rounded-2xl border-2 border-blue-400 p-5 shadow-xl space-y-4">
                      {(() => {
                        const cust = customers.find((c) => c.id === selectedCustomerId);
                        if (!cust) return null;
                        const custBookings = bookings.filter((b) => b.customerId === cust.id);
                        const custReviews = reviews.filter((r) => r.customerId === cust.id);
                        return (
                          <>
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                              <div>
                                <span className="text-[11px] font-extrabold uppercase text-blue-600">
                                  Customer 360° Profile & Ledger
                                </span>
                                <h3 className="font-extrabold text-base text-slate-900">
                                  {cust.name} ({cust.id})
                                </h3>
                              </div>
                              <button
                                onClick={() => setSelectedCustomerId(null)}
                                className="text-xs font-bold text-rose-600"
                              >
                                Close ✕
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
                                <div className="text-xs font-extrabold text-blue-900 mb-2">
                                  Saved Addresses
                                </div>
                                {cust.addresses.map((addr) => (
                                  <div key={addr.id} className="text-xs text-slate-700 mb-1.5">
                                    <strong>{addr.label}:</strong> {addr.houseFlat}, {addr.streetLocality}, {addr.city}
                                  </div>
                                ))}
                              </div>
                              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                                <div className="text-xs font-extrabold text-emerald-900 mb-2">
                                  Bookings ({custBookings.length})
                                </div>
                                {custBookings.map((b) => (
                                  <div
                                    key={b.id}
                                    className="text-xs text-slate-700 mb-1.5 flex justify-between"
                                  >
                                    <span>
                                      <strong>{b.id}</strong> • {b.subcategoryName}
                                    </span>
                                    <span className="font-bold text-emerald-700">
                                      ₹{b.finalTotal}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                                <div className="text-xs font-extrabold text-amber-900 mb-2">
                                  Submitted Reviews ({custReviews.length})
                                </div>
                                {custReviews.map((r) => (
                                  <div key={r.id} className="text-xs text-slate-700 mb-1.5">
                                    ★ {r.rating}.0 on {r.providerName}: &ldquo;{r.comment}&rdquo;
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}

              {/* =========================================================
                  8.3 PROVIDER MANAGEMENT (/admin/providers)
                 ========================================================= */}
              {section === 'providers' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900">
                        Service Provider Directory (Individual & Business)
                      </h2>
                      <p className="text-xs text-slate-500">
                        Filter by provider type, category, city, rating, or verification status.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={providerTypeFilter}
                        onChange={(e) => setProviderTypeFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      >
                        <option value="all">All Provider Types</option>
                        <option value="individual">Individual Only</option>
                        <option value="business">Business / Agency Only</option>
                      </select>
                      <select
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      >
                        <option value="all">All Cities</option>
                        <option value="mohali">Mohali</option>
                        <option value="chandigarh">Chandigarh</option>
                        <option value="hoshiarpur">Hoshiarpur</option>
                      </select>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat.slug} value={cat.slug}>
                            {cat.name.en}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white text-[11px] font-extrabold uppercase">
                            <th className="p-3.5">Provider</th>
                            <th className="p-3.5">Type</th>
                            <th className="p-3.5">Category & City</th>
                            <th className="p-3.5">Rating & Jobs</th>
                            <th className="p-3.5">Visiting Fee</th>
                            <th className="p-3.5">Verification</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-xs">
                          {providers
                            .filter(
                              (p) =>
                                (providerTypeFilter === 'all' ||
                                  p.providerType === providerTypeFilter) &&
                                (cityFilter === 'all' || p.citySlug === cityFilter) &&
                                (categoryFilter === 'all' || p.categorySlug === categoryFilter)
                            )
                            .map((prov) => (
                              <tr key={prov.id} className="hover:bg-indigo-50/40">
                                <td className="p-3.5 font-bold text-slate-900">
                                  <div className="flex items-center gap-2.5">
                                    <img
                                      src={prov.avatar}
                                      alt={prov.name}
                                      className="w-9 h-9 rounded-xl object-cover ring-2 ring-blue-200"
                                    />
                                    <div>
                                      <div>{prov.name}</div>
                                      <div className="text-[11px] font-normal text-slate-500">
                                        {prov.experienceYears} yrs exp
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3.5">
                                  <span
                                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ${
                                      prov.providerType === 'business'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}
                                  >
                                    {prov.providerType}
                                  </span>
                                </td>
                                <td className="p-3.5">
                                  <div className="font-semibold text-slate-800">
                                    {prov.categoryName}
                                  </div>
                                  <div className="text-[11px] text-slate-500">{prov.cityName}</div>
                                </td>
                                <td className="p-3.5">
                                  <span className="font-bold text-amber-600">★ {prov.rating}</span>{' '}
                                  ({prov.reviewCount})
                                  <div className="text-[11px] text-slate-500">
                                    {prov.completedJobs} jobs done
                                  </div>
                                </td>
                                <td className="p-3.5 font-extrabold text-blue-700">
                                  ₹{prov.visitingCharge}
                                </td>
                                <td className="p-3.5">
                                  <span
                                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                      prov.verificationStatus === 'Approved'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}
                                  >
                                    {prov.verificationStatus}
                                  </span>
                                </td>
                                <td className="p-3.5 text-right space-x-1.5">
                                  <button
                                    onClick={() => setSelectedProviderDetailId(prov.id)}
                                    className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold"
                                  >
                                    Dossier
                                  </button>
                                  <Link
                                    href={`/professionals/${prov.slug}`}
                                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold inline-block"
                                  >
                                    Public View
                                  </Link>
                                  <button
                                    onClick={() => {
                                      setProviders((prev) =>
                                        prev.map((item) =>
                                          item.id === prov.id
                                            ? { ...item, active: !item.active }
                                            : item
                                        )
                                      );
                                      showToast(
                                        `${prov.name} ${prov.active ? 'deactivated' : 'activated'}.`,
                                        'info'
                                      );
                                    }}
                                    className={`px-2.5 py-1.5 rounded-lg font-bold ${
                                      prov.active
                                        ? 'bg-rose-100 text-rose-700'
                                        : 'bg-emerald-100 text-emerald-700'
                                    }`}
                                  >
                                    {prov.active ? 'Deactivate' : 'Activate'}
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.4 PROVIDER VERIFICATION WORKSPACE (/admin/verification)
                 ========================================================= */}
              {section === 'verification' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <div className="lg:col-span-5 space-y-3">
                      {providers.map((prov) => (
                        <button
                          key={prov.id}
                          onClick={() => setSelectedProviderId(prov.id)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                            selectedProviderId === prov.id
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-cyan-400 shadow-[0_0_24px_rgba(59,130,246,0.5)]'
                              : 'bg-white border-slate-200 hover:border-blue-400 text-slate-900'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-sm">{prov.name}</span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                prov.verificationStatus === 'Approved'
                                  ? 'bg-emerald-400 text-slate-950'
                                  : prov.verificationStatus === 'Rejected'
                                  ? 'bg-rose-400 text-white'
                                  : 'bg-amber-300 text-slate-950'
                              }`}
                            >
                              {prov.verificationStatus}
                            </span>
                          </div>
                          <div
                            className={`text-xs mt-1 capitalize ${
                              selectedProviderId === prov.id
                                ? 'text-blue-100'
                                : 'text-slate-500'
                            }`}
                          >
                            {prov.categoryName} • {prov.cityName} • {prov.providerType}
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="lg:col-span-7">
                      {(() => {
                        const prov =
                          providers.find((p) => p.id === selectedProviderId) || providers[0];
                        return (
                          <div className="bg-white rounded-3xl border border-blue-200 p-6 shadow-xl space-y-5">
                            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                              <div className="flex items-center gap-3.5">
                                <img
                                  src={prov.avatar}
                                  alt={prov.name}
                                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-100"
                                />
                                <div>
                                  <h3 className="text-lg font-extrabold text-slate-900">
                                    {prov.name}
                                  </h3>
                                  <p className="text-xs text-slate-500 capitalize">
                                    {prov.categoryName} • {prov.cityName} • {prov.experienceYears} Years Exp ({prov.providerType})
                                  </p>
                                  <span className="inline-block mt-1.5 px-3 py-0.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                    Status: {prov.verificationStatus}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 mb-2.5">
                                Submitted KYC & Trade Documents ({prov.documents.length})
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {prov.documents.map((doc) => (
                                  <div
                                    key={doc.id}
                                    className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-between"
                                  >
                                    <div>
                                      <div className="text-xs font-bold text-slate-900">
                                        {doc.name}
                                      </div>
                                      <div className="text-[11px] text-slate-500">
                                        {doc.type} • {doc.uploadedAt}
                                      </div>
                                    </div>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                      {doc.status}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 mb-2.5">
                                Mandatory Compliance Checklist
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                {[
                                  { key: 'identity', label: 'Government ID Proof Matched' },
                                  { key: 'address', label: 'Punjab Local Address Verified' },
                                  { key: 'skills', label: 'Category Skills & Tools Checked' },
                                  { key: 'background', label: 'Police / Reference Check Clear' },
                                ].map((item) => (
                                  <label
                                    key={item.key}
                                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={
                                        checklistState[item.key as keyof typeof checklistState]
                                      }
                                      onChange={(e) =>
                                        setChecklistState((prev) => ({
                                          ...prev,
                                          [item.key]: e.target.checked,
                                        }))
                                      }
                                      className="rounded text-blue-600"
                                    />
                                    <span className="font-semibold text-slate-800">
                                      {item.label}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                Verification Officer Remarks / Audit Note
                              </label>
                              <textarea
                                rows={2}
                                value={verificationRemark}
                                onChange={(e) => setVerificationRemark(e.target.value)}
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                              />
                            </div>

                            <div className="flex flex-wrap gap-2.5 pt-2">
                              <button
                                onClick={() =>
                                  verifyProvider(prov.id, 'Approved', verificationRemark)
                                }
                                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-extrabold shadow-lg transition"
                              >
                                ✓ Approve & Issue Verified Badge
                              </button>
                              <button
                                onClick={() =>
                                  verifyProvider(
                                    prov.id,
                                    'Additional Information Required',
                                    verificationRemark || 'Please re-upload clearer ID proof.'
                                  )
                                }
                                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold shadow-lg transition"
                              >
                                Request Additional Info
                              </button>
                              <button
                                onClick={() =>
                                  verifyProvider(prov.id, 'Rejected', verificationRemark)
                                }
                                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white text-xs font-extrabold shadow-lg transition"
                              >
                                Reject Application
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.5A DEDICATED CATEGORIES STUDIO (/admin/categories)
                 ========================================================= */}
              {section === 'categories' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg">
                    <h2 className="text-lg font-extrabold text-slate-900">
                      5 Primary Marketplace Service Categories Studio
                    </h2>
                    <p className="text-xs text-slate-500">
                      Manage main service verticals, trilingual titles (EN/PA/HI), base visiting charges, commission rates, and active visibility.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categories.map((cat, idx) => {
                      const cardGrads = [
                        'from-blue-600 to-indigo-700',
                        'from-cyan-600 to-blue-700',
                        'from-amber-500 to-orange-600',
                        'from-violet-600 to-purple-700',
                        'from-emerald-500 to-teal-700',
                      ];
                      return (
                        <div
                          key={cat.id}
                          className="bg-white rounded-3xl border border-blue-200 overflow-hidden shadow-lg flex flex-col justify-between"
                        >
                          <div
                            className={`p-4 text-white bg-gradient-to-r ${
                              cardGrads[idx % cardGrads.length]
                            } flex items-center justify-between`}
                          >
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-85">
                                Display Order #{cat.displayOrder}
                              </span>
                              <h3 className="text-base font-extrabold">{cat.name.en}</h3>
                              <div className="text-xs opacity-90">
                                {cat.name.pa} • {cat.name.hi}
                              </div>
                            </div>
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                                cat.active
                                  ? 'bg-emerald-300 text-slate-950'
                                  : 'bg-rose-300 text-slate-950'
                              }`}
                            >
                              {cat.active ? 'Active' : 'Archived'}
                            </span>
                          </div>

                          <div className="p-4 space-y-3 text-xs">
                            <p className="text-slate-600">{cat.tagline.en}</p>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                                <label className="text-[10px] font-bold text-blue-700 block">
                                  Base Visiting Fee (₹)
                                </label>
                                <input
                                  type="number"
                                  value={cat.baseVisitingFee}
                                  onChange={(e) => {
                                    const val = Number(e.target.value);
                                    setCategories((prev) =>
                                      prev.map((c) =>
                                        c.id === cat.id ? { ...c, baseVisitingFee: val } : c
                                      )
                                    );
                                  }}
                                  className="w-full mt-1 px-2 py-1 rounded bg-white border border-blue-300 font-extrabold text-slate-900"
                                />
                              </div>
                              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
                                <label className="text-[10px] font-bold text-purple-700 block">
                                  Commission (%)
                                </label>
                                <input
                                  type="number"
                                  value={cat.commissionPercent}
                                  onChange={(e) => {
                                    const val = Number(e.target.value);
                                    setCategories((prev) =>
                                      prev.map((c) =>
                                        c.id === cat.id ? { ...c, commissionPercent: val } : c
                                      )
                                    );
                                  }}
                                  className="w-full mt-1 px-2 py-1 rounded bg-white border border-purple-300 font-extrabold text-slate-900"
                                />
                              </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <button
                                onClick={() => {
                                  setCategories((prev) =>
                                    prev.map((c) =>
                                      c.id === cat.id ? { ...c, active: !c.active } : c
                                    )
                                  );
                                  showToast(`Toggled status for ${cat.name.en}`, 'info');
                                }}
                                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold"
                              >
                                {cat.active ? 'Archive Category' : 'Activate Category'}
                              </button>
                              <Link
                                href={`/services/${cat.slug}`}
                                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                              >
                                View Live →
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.5B DEDICATED 40 SUBCATEGORIES DIRECTORY (/admin/subcategories)
                 ========================================================= */}
              {section === 'subcategories' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg">
                    <h2 className="text-lg font-extrabold text-slate-900">
                      40 Specialized Subcategories & Local SEO Directory
                    </h2>
                    <p className="text-xs text-slate-500">
                      Add new subcategories, assign parent category, configure starting price, and edit trilingual names.
                    </p>
                  </div>

                  {/* Add New Subcategory Card */}
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg space-y-3">
                    <h3 className="font-extrabold text-sm text-blue-900">
                      + Create New Subcategory Page
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      <select
                        value={newSubcatParent}
                        onChange={(e) => setNewSubcatParent(e.target.value as CategorySlug)}
                        className="px-3 py-2.5 rounded-xl border border-slate-300 font-bold"
                      >
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name.en}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={newSubcatName}
                        onChange={(e) => setNewSubcatName(e.target.value)}
                        placeholder="Subcategory Title (e.g. Solar Inverter Setup)"
                        className="px-3 py-2.5 rounded-xl border border-slate-300"
                      />
                      <input
                        type="number"
                        value={newSubcatPrice}
                        onChange={(e) => setNewSubcatPrice(Number(e.target.value))}
                        placeholder="Starting Price (₹)"
                        className="px-3 py-2.5 rounded-xl border border-slate-300 font-bold"
                      />
                      <button
                        onClick={() => {
                          if (!newSubcatName.trim()) return;
                          const slug = newSubcatName
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-');
                          setSubcategories((prev) => [
                            {
                              id: `sub-${Date.now()}`,
                              slug,
                              categorySlug: newSubcatParent,
                              name: {
                                en: newSubcatName,
                                pa: newSubcatName,
                                hi: newSubcatName,
                              },
                              shortDesc: {
                                en: `Verified ${newSubcatName} service in Mohali, Chandigarh & Hoshiarpur.`,
                                pa: `${newSubcatName} ਸੇਵਾ ਮੋਹਾਲੀ, ਚੰਡੀਗੜ੍ਹ ਅਤੇ ਹੁਸ਼ਿਆਰਪੁਰ ਵਿੱਚ।`,
                                hi: `${newSubcatName} सेवा मोहाली, चंडीगढ़ और होशियारपुर में।`,
                              },
                              fullDesc: `Professional ${newSubcatName} by verified technicians.`,
                              startingPrice: newSubcatPrice,
                              estimatedDuration: '45 - 60 mins',
                              iconName: 'Wrench',
                              problemsCovered: ['Complete diagnosis', 'Standard repair'],
                              serviceOptions: [
                                {
                                  name: `${newSubcatName} Standard Service`,
                                  price: newSubcatPrice,
                                  description: 'On-site inspection and transparent estimate.',
                                  duration: '45 mins',
                                },
                              ],
                              faqs: [
                                {
                                  q: `What is the visiting charge for ${newSubcatName}?`,
                                  a: 'Standard visiting charge applies and is adjusted in the final bill.',
                                },
                              ],
                              active: true,
                            },
                            ...prev,
                          ]);
                          setNewSubcatName('');
                          showToast(`Published new subcategory "${newSubcatName}"`, 'success');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-md"
                      >
                        + Add Subcategory
                      </button>
                    </div>
                  </div>

                  {/* Filterable Subcategories Table */}
                  <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden shadow-lg">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-extrabold text-slate-700">
                        Showing {subcategories.length} Subcategories
                      </span>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold"
                      >
                        <option value="all">All 5 Parent Categories</option>
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name.en}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="overflow-x-auto max-h-[480px]">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-[11px] font-extrabold uppercase">
                            <th className="p-3.5">Subcategory (EN / PA / HI)</th>
                            <th className="p-3.5">Parent Category</th>
                            <th className="p-3.5">SEO Route</th>
                            <th className="p-3.5">Starting Price</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {subcategories
                            .filter(
                              (s) =>
                                categoryFilter === 'all' || s.categorySlug === categoryFilter
                            )
                            .map((sub) => (
                              <tr key={sub.id} className="hover:bg-blue-50/50">
                                <td className="p-3.5">
                                  <div className="font-extrabold text-slate-900">
                                    {sub.name.en}
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    {sub.name.pa} • {sub.name.hi}
                                  </div>
                                </td>
                                <td className="p-3.5 capitalize font-bold text-indigo-700">
                                  {sub.categorySlug}
                                </td>
                                <td className="p-3.5 font-mono text-[11px] text-slate-500">
                                  /services/{sub.categorySlug}/{sub.slug}
                                </td>
                                <td className="p-3.5 font-extrabold text-emerald-700">
                                  ₹{sub.startingPrice}
                                </td>
                                <td className="p-3.5 text-right space-x-2">
                                  <Link
                                    href={`/services/${sub.categorySlug}/${sub.slug}`}
                                    className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 font-bold"
                                  >
                                    Open Page →
                                  </Link>
                                  <button
                                    onClick={() => {
                                      setSubcategories((prev) =>
                                        prev.map((s) =>
                                          s.id === sub.id ? { ...s, active: !s.active } : s
                                        )
                                      );
                                      showToast(`Updated ${sub.name.en}`, 'info');
                                    }}
                                    className={`px-2.5 py-1 rounded-lg font-bold ${
                                      sub.active
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-rose-100 text-rose-800'
                                    }`}
                                  >
                                    {sub.active ? 'Active' : 'Archived'}
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.6 DEDICATED SERVICE RATE CARDS & OPTIONS (/admin/services)
                 ========================================================= */}
              {section === 'services' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg">
                    <h2 className="text-lg font-extrabold text-slate-900">
                      Individual Service Rate Cards, Visiting Fees & Duration Matrix
                    </h2>
                    <p className="text-xs text-slate-500">
                      Configure granular service line-items, base visiting fees, estimated service durations, and city availability.
                    </p>
                  </div>

                  {/* Add New Service Line-Item to any Subcategory */}
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg space-y-3">
                    <h3 className="font-extrabold text-sm text-indigo-900">
                      + Add New Service Package / Rate Card Option
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      <select
                        value={selectedSubcatForService}
                        onChange={(e) => setSelectedSubcatForService(e.target.value)}
                        className="px-3 py-2.5 rounded-xl border border-slate-300 font-bold"
                      >
                        {subcategories.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name.en} ({s.categorySlug})
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                        placeholder="Service Option Name (e.g. Double Door Hinge Fix)"
                        className="px-3 py-2.5 rounded-xl border border-slate-300"
                      />
                      <input
                        type="number"
                        value={newServicePrice}
                        onChange={(e) => setNewServicePrice(Number(e.target.value))}
                        placeholder="Base Guide Price (₹)"
                        className="px-3 py-2.5 rounded-xl border border-slate-300 font-bold"
                      />
                      <button
                        onClick={() => {
                          if (!newServiceName.trim()) return;
                          setSubcategories((prev) =>
                            prev.map((s) =>
                              s.id === selectedSubcatForService
                                ? {
                                    ...s,
                                    serviceOptions: [
                                      ...s.serviceOptions,
                                      {
                                        name: newServiceName.trim(),
                                        price: newServicePrice,
                                        description:
                                          'Includes on-site inspection and standard labour.',
                                        duration: newServiceDuration,
                                      },
                                    ],
                                  }
                                : s
                            )
                          );
                          setNewServiceName('');
                          showToast(`Added service option "${newServiceName}"`, 'success');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold shadow-md"
                      >
                        + Add Service Option
                      </button>
                    </div>
                  </div>

                  {/* Service Options Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subcategories.slice(0, 10).map((sub) => (
                      <div
                        key={sub.id}
                        className="bg-white rounded-2xl border border-blue-200 p-4 shadow-md space-y-2.5"
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase text-indigo-600">
                              {sub.categorySlug}
                            </span>
                            <h4 className="text-sm font-extrabold text-slate-900">
                              {sub.name.en}
                            </h4>
                          </div>
                          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                            Starts ₹{sub.startingPrice}
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          {sub.serviceOptions.map((opt, i) => (
                            <div
                              key={i}
                              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                            >
                              <div>
                                <div className="font-bold text-slate-800">{opt.name}</div>
                                <div className="text-[11px] text-slate-500">
                                  Duration: {opt.duration} • Mohali, Chandigarh, Hoshiarpur
                                </div>
                              </div>
                              <span className="font-extrabold text-blue-700">
                                ₹{opt.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.7A DEDICATED LAUNCH CITIES COMMAND CENTER (/admin/cities)
                 ========================================================= */}
              {section === 'cities' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg">
                    <h2 className="text-lg font-extrabold text-slate-900">
                      Punjab Launch Cities Command Center (Mohali • Chandigarh • Hoshiarpur)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Manage active launch cities, city-level SEO metadata, partner density, and market status.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {cities.map((city, i) => {
                      const cityGrads = [
                        'from-blue-600 to-indigo-800',
                        'from-emerald-600 to-teal-800',
                        'from-purple-600 to-indigo-800',
                      ];
                      return (
                        <div
                          key={city.id}
                          className="bg-white rounded-3xl border border-blue-200 overflow-hidden shadow-xl flex flex-col justify-between"
                        >
                          <div
                            className={`p-5 text-white bg-gradient-to-br ${
                              cityGrads[i % cityGrads.length]
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold uppercase tracking-wider opacity-85">
                                {city.state}
                              </span>
                              <button
                                onClick={() => {
                                  setCities((prev) =>
                                    prev.map((c) =>
                                      c.id === city.id ? { ...c, active: !c.active } : c
                                    )
                                  );
                                  showToast(`Toggled status for ${city.name.en}`, 'info');
                                }}
                                className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-300 text-slate-950"
                              >
                                {city.active ? 'Active Market' : 'Paused'}
                              </button>
                            </div>
                            <h3 className="text-2xl font-extrabold mt-1">{city.name.en}</h3>
                            <div className="text-xs opacity-90">
                              {city.name.pa} • {city.name.hi}
                            </div>
                          </div>

                          <div className="p-5 space-y-3 text-xs">
                            <p className="text-slate-600">{city.tagline}</p>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                                <div className="text-[10px] text-slate-500">Verified Pros</div>
                                <div className="text-base font-extrabold text-blue-800">
                                  {city.providerCount}
                                </div>
                              </div>
                              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                                <div className="text-[10px] text-slate-500">Localities</div>
                                <div className="text-base font-extrabold text-emerald-800">
                                  {city.localities.length} Zones
                                </div>
                              </div>
                            </div>
                            <div className="pt-2 flex items-center justify-between">
                              <Link
                                href="/admin/service-areas"
                                className="font-bold text-indigo-600 hover:underline"
                              >
                                Manage Sectors →
                              </Link>
                              <Link
                                href={`/${city.slug}`}
                                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold"
                              >
                                Open City Hub →
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.7B DEDICATED HYPERLOCAL SERVICE AREAS MATRIX (/admin/service-areas)
                 ========================================================= */}
              {section === 'service-areas' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg">
                    <h2 className="text-lg font-extrabold text-slate-900">
                      Hyperlocal Sector, Phase & Locality Coverage Matrix
                    </h2>
                    <p className="text-xs text-slate-500">
                      Add or manage covered sectors, phases, and colonies across Mohali, Chandigarh, and Hoshiarpur.
                    </p>
                  </div>

                  {/* Add New Sector / Locality */}
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg">
                    <h3 className="font-extrabold text-sm text-slate-900 mb-3">
                      + Add New Sector / Locality to Serviceable Zone
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        value={selectedCitySlugForArea}
                        onChange={(e) =>
                          setSelectedCitySlugForArea(e.target.value as CitySlug)
                        }
                        className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                      >
                        <option value="mohali">Mohali (SAS Nagar)</option>
                        <option value="chandigarh">Chandigarh (Tricity)</option>
                        <option value="hoshiarpur">Hoshiarpur</option>
                      </select>
                      <input
                        type="text"
                        value={newLocalityName}
                        onChange={(e) => setNewLocalityName(e.target.value)}
                        placeholder="e.g. Sector 82 JLPL / Aerocity Block D"
                        className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs flex-1"
                      />
                      <button
                        onClick={() => {
                          if (!newLocalityName.trim()) return;
                          setCities((prev) =>
                            prev.map((c) =>
                              c.slug === selectedCitySlugForArea
                                ? { ...c, localities: [...c.localities, newLocalityName.trim()] }
                                : c
                            )
                          );
                          setNewLocalityName('');
                          showToast(
                            `Added locality "${newLocalityName}" to ${selectedCitySlugForArea}`,
                            'success'
                          );
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold shadow-md"
                      >
                        + Add Service Locality
                      </button>
                    </div>
                  </div>

                  {/* City-by-City Sector Matrix */}
                  <div className="space-y-4">
                    {cities.map((city) => (
                      <div
                        key={city.id}
                        className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-extrabold text-slate-900">
                            {city.name.en} — Active Serviceable Localities ({city.localities.length})
                          </h3>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                            15 km Operating Radius Active
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {city.localities.map((loc) => (
                            <div
                              key={loc}
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-xs font-bold text-blue-900 flex items-center gap-2"
                            >
                              <MapPin className="w-3.5 h-3.5 text-blue-600" />
                              <span>{loc}</span>
                              <button
                                onClick={() => {
                                  setCities((prev) =>
                                    prev.map((c) =>
                                      c.id === city.id
                                        ? {
                                            ...c,
                                            localities: c.localities.filter((l) => l !== loc),
                                          }
                                        : c
                                    )
                                  );
                                  showToast(`Removed ${loc} from ${city.name.en}`, 'info');
                                }}
                                className="text-rose-500 hover:text-rose-700 font-extrabold ml-1"
                                title="Remove locality"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.8 BOOKING MANAGEMENT (/admin/bookings)
                 ========================================================= */}
              {section === 'bookings' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900">
                        Master Booking Operations & 12-Step Lifecycle Control
                      </h2>
                      <p className="text-xs text-slate-500">
                        Inspect booking timelines, hybrid estimates, reassign providers, override statuses, or export CSV.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      >
                        <option value="all">All Cities</option>
                        <option value="mohali">Mohali</option>
                        <option value="chandigarh">Chandigarh</option>
                        <option value="hoshiarpur">Hoshiarpur</option>
                      </select>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      >
                        <option value="all">All Statuses</option>
                        {BOOKING_LIFECYCLE_STEPS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() =>
                          exportCsvFile(
                            'punjab-services-bookings.csv',
                            [
                              'Booking ID',
                              'Customer',
                              'Provider',
                              'Service',
                              'City',
                              'Status',
                              'Total INR',
                            ],
                            bookings.map((b) => [
                              b.id,
                              b.customerName,
                              b.providerName,
                              b.subcategoryName,
                              b.address.city,
                              b.status,
                              b.finalTotal,
                            ])
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Export CSV
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-[11px] font-extrabold uppercase">
                            <th className="p-3.5">Booking ID</th>
                            <th className="p-3.5">Service & City</th>
                            <th className="p-3.5">Customer → Provider</th>
                            <th className="p-3.5">Schedule</th>
                            <th className="p-3.5">Financials</th>
                            <th className="p-3.5">Current Lifecycle State</th>
                            <th className="p-3.5 text-right">Actions & Override</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {bookings
                            .filter(
                              (b) =>
                                (statusFilter === 'all' || b.status === statusFilter) &&
                                (cityFilter === 'all' || b.address.citySlug === cityFilter)
                            )
                            .map((b) => (
                              <tr key={b.id} className="hover:bg-blue-50/50">
                                <td className="p-3.5 font-extrabold text-blue-700">{b.id}</td>
                                <td className="p-3.5">
                                  <div className="font-bold text-slate-900">
                                    {b.subcategoryName}
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    {b.address.city} ({b.bookingType})
                                  </div>
                                </td>
                                <td className="p-3.5">
                                  <div className="font-semibold text-slate-800">
                                    {b.customerName}
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    → {b.providerName}
                                  </div>
                                </td>
                                <td className="p-3.5 text-slate-600">
                                  <div>{b.date}</div>
                                  <div className="text-[11px]">{b.timeSlot}</div>
                                </td>
                                <td className="p-3.5">
                                  <div className="font-extrabold text-emerald-700">
                                    ₹{b.finalTotal}
                                  </div>
                                  <div className="text-[10px] text-slate-500">
                                    Visit: ₹{b.visitingFee}
                                  </div>
                                </td>
                                <td className="p-3.5">
                                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                                    {b.status}
                                  </span>
                                </td>
                                <td className="p-3.5 text-right space-x-2">
                                  <button
                                    onClick={() => setSelectedBookingId(b.id)}
                                    className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold"
                                  >
                                    Inspect
                                  </button>
                                  <select
                                    value={b.status}
                                    onChange={(e) =>
                                      updateBookingStatus(
                                        b.id,
                                        e.target.value as BookingStatus,
                                        'Status updated by Admin Operations'
                                      )
                                    }
                                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-semibold"
                                  >
                                    {BOOKING_LIFECYCLE_STEPS.map((st) => (
                                      <option key={st} value={st}>
                                        {st}
                                      </option>
                                    ))}
                                    <option value="Cancelled">Cancelled</option>
                                  </select>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Selected Booking Deep Inspector */}
                  {selectedBookingId && (
                    <div className="bg-white rounded-2xl border-2 border-blue-400 p-5 shadow-xl space-y-4">
                      {(() => {
                        const b =
                          bookings.find((item) => item.id === selectedBookingId) ||
                          bookings[0];
                        if (!b) return null;
                        return (
                          <>
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                              <div>
                                <span className="text-[11px] font-extrabold uppercase text-blue-600">
                                  Booking Timeline, Hybrid Estimate & Reassignment Inspector
                                </span>
                                <h3 className="text-base font-extrabold text-slate-900">
                                  {b.id}: {b.problemTitle} ({b.subcategoryName})
                                </h3>
                              </div>
                              <select
                                value={reassignProviderId}
                                onChange={(e) => {
                                  const nextProv = providers.find(
                                    (p) => p.id === e.target.value
                                  );
                                  if (!nextProv) return;
                                  setReassignProviderId(e.target.value);
                                  setBookings((prev) =>
                                    prev.map((item) =>
                                      item.id === b.id
                                        ? {
                                            ...item,
                                            providerId: nextProv.id,
                                            providerName: nextProv.name,
                                            providerSlug: nextProv.slug,
                                          }
                                        : item
                                    )
                                  );
                                  showToast(
                                    `Reassigned booking ${b.id} to ${nextProv.name}`,
                                    'success'
                                  );
                                }}
                                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold"
                              >
                                <option value="">Reassign Provider...</option>
                                {providers.map((p) => (
                                  <option key={p.id} value={p.id}>
                                    {p.name} ({p.cityName})
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                                <div className="font-extrabold text-blue-950">
                                  Audit Timeline ({b.timeline.length} events)
                                </div>
                                {b.timeline.map((ev, idx) => (
                                  <div key={idx} className="text-slate-700">
                                    • <strong>{ev.status}</strong> ({ev.timestamp}) — {ev.note}
                                  </div>
                                ))}
                              </div>
                              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2">
                                <div className="font-extrabold text-indigo-950">
                                  Estimate & Admin Internal Notes
                                </div>
                                {b.estimate ? (
                                  <div className="text-slate-700">
                                    Estimate Status: <strong>{b.estimate.status}</strong> • Total: ₹
                                    {b.estimate.totalEstimate}
                                  </div>
                                ) : (
                                  <div className="text-slate-500">
                                    Visiting Fee Only: ₹{b.visitingFee}
                                  </div>
                                )}
                                <div className="flex gap-2 pt-2">
                                  <input
                                    type="text"
                                    value={adminNoteDraft}
                                    onChange={(e) => setAdminNoteDraft(e.target.value)}
                                    placeholder="Add internal operations note..."
                                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                                  />
                                  <button
                                    onClick={() => {
                                      if (!adminNoteDraft.trim()) return;
                                      setBookings((prev) =>
                                        prev.map((item) =>
                                          item.id === b.id
                                            ? { ...item, adminNotes: adminNoteDraft }
                                            : item
                                        )
                                      );
                                      setAdminNoteDraft('');
                                      showToast(`Saved admin note on ${b.id}`, 'success');
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold"
                                  >
                                    Save Note
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}

              {/* =========================================================
                  8.9 PRICING, COMMISSIONS & COUPONS (/admin/pricing)
                 ========================================================= */}
              {section === 'pricing' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg space-y-3">
                      <h3 className="font-extrabold text-sm text-slate-900">
                        Category Visiting Fee & Platform Commission
                      </h3>
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="text-xs font-extrabold text-slate-900">
                              {cat.name.en}
                            </div>
                            <div className="text-[11px] text-slate-600">
                              Base Visiting Charge: ₹{cat.baseVisitingFee}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-indigo-800">
                              Commission %:
                            </span>
                            <input
                              type="number"
                              value={cat.commissionPercent}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setCategories((prev) =>
                                  prev.map((c) =>
                                    c.id === cat.id ? { ...c, commissionPercent: val } : c
                                  )
                                );
                              }}
                              className="w-16 px-2 py-1 rounded-lg border border-indigo-300 bg-white text-xs font-extrabold text-center"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg space-y-4">
                      <h3 className="font-extrabold text-sm text-slate-900">
                        Interactive Hybrid Pricing & Commission Simulator
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">
                            Approved Estimate Total (₹)
                          </label>
                          <input
                            type="number"
                            value={calcServiceAmt}
                            onChange={(e) => setCalcServiceAmt(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">
                            Provider Type
                          </label>
                          <select
                            value={calcProviderType}
                            onChange={(e) =>
                              setCalcProviderType(
                                e.target.value as 'individual' | 'business'
                              )
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                          >
                            <option value="individual">Individual (Standard 15%)</option>
                            <option value="business">Business Partner (13% Preferred)</option>
                          </select>
                        </div>
                      </div>
                      {(() => {
                        const rate = calcProviderType === 'business' ? 0.13 : 0.15;
                        const comm = Math.round(calcServiceAmt * rate);
                        const gst = Math.round(calcServiceAmt * 0.05);
                        const netProvider = calcServiceAmt - comm;
                        return (
                          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white space-y-2 text-xs shadow-lg">
                            <div className="flex justify-between">
                              <span className="text-blue-100">Approved Estimate Amount:</span>
                              <span className="font-bold">₹{calcServiceAmt}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-100">
                                Platform Commission ({Math.round(rate * 100)}%):
                              </span>
                              <span className="font-bold text-amber-300">- ₹{comm}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-100">Customer GST (5%):</span>
                              <span className="font-bold">+ ₹{gst}</span>
                            </div>
                            <div className="border-t border-white/20 pt-2 flex justify-between text-sm font-extrabold text-emerald-300">
                              <span>Net Provider Payout:</span>
                              <span>₹{netProvider}</span>
                            </div>
                          </div>
                        );
                      })()}

                      <div className="pt-3 border-t border-slate-200 space-y-2">
                        <div className="font-extrabold text-xs text-slate-900">
                          Create Promotional Coupon ({offers.length} Active)
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newCouponCode}
                            onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                            placeholder="CODE (e.g. PUNJAB200)"
                            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs flex-1"
                          />
                          <input
                            type="number"
                            value={newCouponDiscount}
                            onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                            className="w-24 px-2 py-1.5 rounded-lg border border-slate-300 text-xs"
                          />
                          <button
                            onClick={() => {
                              if (!newCouponCode.trim()) return;
                              setOffers((prev) => [
                                {
                                  id: `off-${Date.now()}`,
                                  code: newCouponCode.trim(),
                                  title: `Flat ₹${newCouponDiscount} Off`,
                                  subtitle: 'Valid across Mohali, Chandigarh & Hoshiarpur',
                                  type: 'Seasonal',
                                  flatDiscount: newCouponDiscount,
                                  minBookingValue: 499,
                                  validUntil: '31 Dec 2026',
                                  terms: ['Applicable on final approved invoice'],
                                  active: true,
                                },
                                ...prev,
                              ]);
                              setNewCouponCode('');
                              showToast(`Created promo code ${newCouponCode}`, 'success');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold"
                          >
                            + Add Coupon
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.10A DEDICATED MASTER FINANCE & REVENUE LEDGER (/admin/finance)
                 ========================================================= */}
              {section === 'finance' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-2xl p-5 text-white bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg">
                      <div className="text-xs font-bold uppercase opacity-85">
                        Gross Customer Payments
                      </div>
                      <div className="text-2xl font-extrabold mt-1">
                        ₹{grossBookingValue.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] mt-1 opacity-90">
                        UPI (Demo) • Card • Cash After Service
                      </div>
                    </div>
                    <div className="rounded-2xl p-5 text-white bg-gradient-to-br from-blue-600 to-indigo-800 shadow-lg">
                      <div className="text-xs font-bold uppercase opacity-85">
                        Platform Commission Earned
                      </div>
                      <div className="text-2xl font-extrabold mt-1">
                        ₹{totalPlatformCommission.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] mt-1 opacity-90">
                        15% Avg Marketplace Take-Rate
                      </div>
                    </div>
                    <div className="rounded-2xl p-5 text-white bg-gradient-to-br from-purple-600 to-fuchsia-800 shadow-lg">
                      <div className="text-xs font-bold uppercase opacity-85">
                        Net Partner Disbursals
                      </div>
                      <div className="text-2xl font-extrabold mt-1">
                        ₹
                        {payouts
                          .reduce((s, p) => s + p.netAmount, 0)
                          .toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] mt-1 opacity-90">
                        Across {payouts.length} settlement batches
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden shadow-lg">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <h3 className="font-extrabold text-sm text-slate-900">
                        Customer Payment Transactions Ledger
                      </h3>
                      <button
                        onClick={() =>
                          exportCsvFile(
                            'punjab-services-finance-ledger.csv',
                            ['Txn Ref', 'Booking ID', 'Customer', 'Method', 'Payment Status', 'Amount'],
                            bookings.map((b) => [
                              b.transactionRef,
                              b.id,
                              b.customerName,
                              b.paymentMethod,
                              b.paymentStatus,
                              b.finalTotal,
                            ])
                          )
                        }
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
                      >
                        Export Finance CSV
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-gradient-to-r from-slate-900 to-blue-950 text-white text-[11px] font-extrabold uppercase">
                            <th className="p-3.5">Transaction Ref</th>
                            <th className="p-3.5">Booking & Service</th>
                            <th className="p-3.5">Customer</th>
                            <th className="p-3.5">Payment Method</th>
                            <th className="p-3.5">Payment Status</th>
                            <th className="p-3.5 text-right">Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {bookings.map((b) => (
                            <tr key={b.id} className="hover:bg-blue-50/50">
                              <td className="p-3.5 font-mono font-bold text-blue-700">
                                {b.transactionRef}
                              </td>
                              <td className="p-3.5">
                                <div className="font-bold text-slate-900">{b.id}</div>
                                <div className="text-[11px] text-slate-500">
                                  {b.subcategoryName}
                                </div>
                              </td>
                              <td className="p-3.5 font-semibold">{b.customerName}</td>
                              <td className="p-3.5">{b.paymentMethod}</td>
                              <td className="p-3.5">
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                  {b.paymentStatus}
                                </span>
                              </td>
                              <td className="p-3.5 text-right font-extrabold text-slate-900">
                                ₹{b.finalTotal}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.10B DEDICATED FINANCIAL RECONCILIATION AUDIT (/admin/reconciliation)
                 ========================================================= */}
              {section === 'reconciliation' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900">
                        Automated Financial Reconciliation & Discrepancy Resolver
                      </h2>
                      <p className="text-xs text-slate-500">
                        Audit expected invoice totals against recorded collections, commission deductions, and partner payables.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        exportCsvFile(
                          'punjab-services-reconciliation.csv',
                          [
                            'Recon ID',
                            'Booking ID',
                            'Txn Ref',
                            'Expected INR',
                            'Recorded INR',
                            'Provider Payable',
                            'Commission',
                            'Status',
                          ],
                          reconciliations.map((r) => [
                            r.id,
                            r.bookingId,
                            r.transactionRef,
                            r.expectedAmount,
                            r.recordedAmount,
                            r.providerPayable,
                            r.platformCommission,
                            r.status,
                          ])
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export Reconciliation CSV
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-gradient-to-r from-violet-900 to-indigo-900 text-white text-[11px] font-extrabold uppercase">
                            <th className="p-3.5">Recon ID / Booking</th>
                            <th className="p-3.5">Expected vs Recorded</th>
                            <th className="p-3.5">Commission</th>
                            <th className="p-3.5">Provider Payable</th>
                            <th className="p-3.5">Audit Status</th>
                            <th className="p-3.5 text-right">Discrepancy Resolution</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {reconciliations.map((rec) => (
                            <tr key={rec.id} className="hover:bg-purple-50/40">
                              <td className="p-3.5">
                                <div className="font-extrabold text-slate-900">{rec.id}</div>
                                <div className="text-[11px] text-blue-600 font-semibold">
                                  Booking: {rec.bookingId}
                                </div>
                              </td>
                              <td className="p-3.5">
                                <div>Expected: ₹{rec.expectedAmount}</div>
                                <div className="font-bold text-slate-900">
                                  Recorded: ₹{rec.recordedAmount}
                                </div>
                              </td>
                              <td className="p-3.5 font-bold text-rose-600">
                                ₹{rec.platformCommission}
                              </td>
                              <td className="p-3.5 font-extrabold text-emerald-700">
                                ₹{rec.providerPayable}
                              </td>
                              <td className="p-3.5">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                    rec.status === 'Matched'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : rec.status === 'Discrepancy Resolved'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  {rec.status}
                                </span>
                                {rec.discrepancyNote && (
                                  <div className="text-[11px] text-slate-500 mt-1">
                                    {rec.discrepancyNote}
                                  </div>
                                )}
                              </td>
                              <td className="p-3.5 text-right">
                                {rec.status === 'Unmatched' ? (
                                  <div className="flex items-center justify-end gap-1.5">
                                    <input
                                      type="text"
                                      placeholder="Resolution note..."
                                      value={reconNotes[rec.id] || ''}
                                      onChange={(e) =>
                                        setReconNotes((prev) => ({
                                          ...prev,
                                          [rec.id]: e.target.value,
                                        }))
                                      }
                                      className="px-2.5 py-1 rounded-lg border border-slate-300 text-[11px] w-36"
                                    />
                                    <button
                                      onClick={() =>
                                        resolveReconciliation(
                                          rec.id,
                                          reconNotes[rec.id] ||
                                            'Verified coupon adjustment & matched ledger.'
                                        )
                                      }
                                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-[11px]"
                                    >
                                      Resolve Match
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-[11px] text-emerald-700 font-bold">
                                    ✓ Reconciled
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.10C DEDICATED PROVIDER PAYOUTS QUEUE (/admin/payouts)
                 ========================================================= */}
              {section === 'payouts' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg">
                    <h2 className="text-lg font-extrabold text-slate-900">
                      Provider Payout Settlement Queue & Disbursal Controls
                    </h2>
                    <p className="text-xs text-slate-500">
                      Review partner net earnings after platform commission and release or hold bank/UPI settlements.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white text-[11px] font-extrabold uppercase">
                            <th className="p-3.5">Payout ID</th>
                            <th className="p-3.5">Provider & Service</th>
                            <th className="p-3.5">Gross</th>
                            <th className="p-3.5">Commission</th>
                            <th className="p-3.5">Net Payable</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Settlement Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {payouts.map((pay) => (
                            <tr key={pay.id} className="hover:bg-emerald-50/40">
                              <td className="p-3.5 font-extrabold text-slate-900">{pay.id}</td>
                              <td className="p-3.5">
                                <div className="font-bold text-slate-800">{pay.providerName}</div>
                                <div className="text-[11px] text-slate-500">
                                  {pay.serviceName} ({pay.bookingId})
                                </div>
                              </td>
                              <td className="p-3.5">₹{pay.grossAmount}</td>
                              <td className="p-3.5 text-rose-600 font-bold">
                                -₹{pay.platformCommission}
                              </td>
                              <td className="p-3.5 font-extrabold text-emerald-700 text-sm">
                                ₹{pay.netAmount}
                              </td>
                              <td className="p-3.5">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                    pay.status === 'Paid'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  {pay.status}
                                </span>
                              </td>
                              <td className="p-3.5 text-right space-x-2">
                                {pay.status !== 'Paid' ? (
                                  <button
                                    onClick={() => {
                                      setPayouts((prev) =>
                                        prev.map((p) =>
                                          p.id === pay.id ? { ...p, status: 'Paid' } : p
                                        )
                                      );
                                      showToast(
                                        `Released payout ${pay.id} to ${pay.providerName}`,
                                        'success'
                                      );
                                    }}
                                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-[11px] shadow"
                                  >
                                    Release Payout
                                  </button>
                                ) : (
                                  <span className="text-[11px] font-bold text-emerald-700">
                                    ✓ Disbursed ({pay.transactionRef})
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.10D DEDICATED CUSTOMER REFUNDS DESK (/admin/refunds)
                 ========================================================= */}
              {section === 'refunds' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg">
                    <h2 className="text-lg font-extrabold text-slate-900">
                      Customer Cancellations & Refund Resolution Desk
                    </h2>
                    <p className="text-xs text-slate-500">
                      Evaluate visiting fee refund requests, inspect cancellation windows, and approve or reject demo refunds.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookings.map((b) => (
                      <div
                        key={b.id}
                        className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg flex flex-col justify-between gap-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[11px] font-extrabold uppercase text-rose-600">
                              Booking {b.id} • {b.address.city}
                            </span>
                            <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                              {b.customerName} — {b.subcategoryName}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
                              Visiting Charge: ₹{b.visitingFee} • Total Paid: ₹{b.finalTotal}
                            </p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                            {b.refundStatus || 'Eligible for Review'}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setBookings((prev) =>
                                prev.map((item) =>
                                  item.id === b.id
                                    ? {
                                        ...item,
                                        refundStatus: 'Processed',
                                        paymentStatus: 'Refunded',
                                      }
                                    : item
                                )
                              );
                              showToast(`Approved & processed demo refund for ${b.id}`, 'success');
                            }}
                            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-extrabold shadow"
                          >
                            ✓ Approve & Process Refund
                          </button>
                          <button
                            onClick={() => {
                              setBookings((prev) =>
                                prev.map((item) =>
                                  item.id === b.id ? { ...item, refundStatus: 'None' } : item
                                )
                              );
                              showToast(`Marked refund request for ${b.id} as declined.`, 'warning');
                            }}
                            className="px-4 py-2 rounded-xl bg-rose-100 text-rose-700 text-xs font-bold"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.11 COMPLAINTS & SUPPORT TICKETS (/admin/support)
                 ========================================================= */}
              {section === 'support' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <div className="lg:col-span-5 space-y-3">
                      {tickets.map((tkt) => (
                        <button
                          key={tkt.id}
                          onClick={() => setSelectedTicketId(tkt.id)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition ${
                            selectedTicketId === tkt.id
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-cyan-400 shadow-lg'
                              : 'bg-white border-slate-200 hover:border-blue-400 text-slate-900'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span
                              className={`text-xs font-extrabold ${
                                selectedTicketId === tkt.id ? 'text-cyan-300' : 'text-blue-700'
                              }`}
                            >
                              {tkt.id} • {tkt.priority} Priority
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-300 text-slate-950">
                              {tkt.status}
                            </span>
                          </div>
                          <div className="font-bold text-sm mt-1">{tkt.subject}</div>
                          <div
                            className={`text-xs mt-0.5 ${
                              selectedTicketId === tkt.id ? 'text-blue-100' : 'text-slate-500'
                            }`}
                          >
                            {tkt.userName} ({tkt.userType}) • Booking: {tkt.bookingId || 'N/A'}
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="lg:col-span-7">
                      {(() => {
                        const tkt =
                          tickets.find((t) => t.id === selectedTicketId) || tickets[0];
                        return (
                          <div className="bg-white rounded-3xl border border-blue-200 p-5 shadow-xl space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                              <div>
                                <h3 className="font-extrabold text-base text-slate-900">
                                  {tkt.subject}
                                </h3>
                                <p className="text-xs text-slate-500">
                                  Assigned Executive: {tkt.assignedExecutive} • Category: {tkt.category}
                                </p>
                              </div>
                              <select
                                value={tkt.status}
                                onChange={(e) =>
                                  updateTicketStatus(
                                    tkt.id,
                                    e.target.value as typeof tkt.status
                                  )
                                }
                                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold"
                              >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </div>

                            <div className="space-y-2.5 max-h-64 overflow-y-auto p-3 rounded-xl bg-slate-50 border border-slate-200">
                              {tkt.messages.map((m, idx) => (
                                <div
                                  key={idx}
                                  className={`p-3 rounded-xl text-xs ${
                                    m.role === 'User'
                                      ? 'bg-white border border-slate-200'
                                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white ml-6'
                                  }`}
                                >
                                  <div className="font-bold mb-0.5">
                                    {m.sender} ({m.role}) • {m.timestamp}
                                  </div>
                                  <div>{m.text}</div>
                                </div>
                              ))}
                            </div>

                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={ticketReplyText}
                                onChange={(e) => setTicketReplyText(e.target.value)}
                                placeholder="Type official support response..."
                                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                              />
                              <button
                                onClick={() => {
                                  if (!ticketReplyText.trim()) return;
                                  replyToTicket(
                                    tkt.id,
                                    activeAdminProfile,
                                    'Admin',
                                    ticketReplyText
                                  );
                                  setTicketReplyText('');
                                }}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold shadow"
                              >
                                Send Reply
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.12 REVIEW MODERATION (/admin/reviews)
                 ========================================================= */}
              {section === 'reviews' && (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900">
                            {rev.customerName}
                          </span>
                          <span className="text-xs text-slate-500">
                            reviewed <strong>{rev.providerName}</strong> ({rev.serviceName})
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                            ★ {rev.rating}.0
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              rev.status === 'Published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {rev.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 mt-1.5">&ldquo;{rev.comment}&rdquo;</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => moderateReview(rev.id, 'Published')}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => moderateReview(rev.id, 'Hidden')}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white text-xs font-bold shadow"
                        >
                          Hide Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* =========================================================
                  8.13 CMS & CONTENT MANAGEMENT (/admin/cms)
                 ========================================================= */}
              {section === 'cms' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg space-y-3">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      + Create New CMS Banner / SEO Content Block
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      <select
                        value={newCmsPage}
                        onChange={(e) => setNewCmsPage(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 font-bold"
                      >
                        <option value="Homepage">Homepage</option>
                        <option value="City Landing">City Landing</option>
                        <option value="Offers Banner">Offers Banner</option>
                        <option value="Legal Policy">Legal Policy</option>
                      </select>
                      <input
                        type="text"
                        value={newCmsTitle}
                        onChange={(e) => setNewCmsTitle(e.target.value)}
                        placeholder="Section Headline..."
                        className="px-3 py-2 rounded-xl border border-slate-300"
                      />
                      <input
                        type="text"
                        value={newCmsSeoTitle}
                        onChange={(e) => setNewCmsSeoTitle(e.target.value)}
                        placeholder="SEO Meta Title..."
                        className="px-3 py-2 rounded-xl border border-slate-300"
                      />
                      <button
                        onClick={() => {
                          if (!newCmsTitle.trim()) return;
                          setCmsSections((prev) => [
                            {
                              id: `cms-${Date.now()}`,
                              page: newCmsPage,
                              sectionKey: `custom_${Date.now()}`,
                              title: newCmsTitle,
                              subtitle: 'Updated via Admin CMS Manager',
                              status: 'Published',
                              seoTitle: newCmsSeoTitle || newCmsTitle,
                              seoDescription: newCmsTitle,
                              displayOrder: prev.length + 1,
                              updatedAt: 'Just now',
                            },
                            ...prev,
                          ]);
                          setNewCmsTitle('');
                          setNewCmsSeoTitle('');
                          showToast('Published new CMS content block.', 'success');
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow"
                      >
                        Create & Publish
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {cmsSections.map((cms) => (
                      <div
                        key={cms.id}
                        className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[11px] font-extrabold uppercase text-blue-600">
                              {cms.page} • {cms.sectionKey}
                            </span>
                            <h3 className="text-sm font-extrabold text-slate-900">
                              {cms.title}
                            </h3>
                          </div>
                          <button
                            onClick={() =>
                              updateCmsSection(cms.id, {
                                status: cms.status === 'Published' ? 'Draft' : 'Published',
                              })
                            }
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              cms.status === 'Published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {cms.status} (Click to Toggle)
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="font-bold text-slate-600 block mb-1">
                              Section Headline
                            </label>
                            <input
                              type="text"
                              value={cms.title}
                              onChange={(e) =>
                                updateCmsSection(cms.id, { title: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-300"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-slate-600 block mb-1">
                              SEO Meta Title
                            </label>
                            <input
                              type="text"
                              value={cms.seoTitle}
                              onChange={(e) =>
                                updateCmsSection(cms.id, { seoTitle: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-300"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.14 MULTILINGUAL CONTENT MANAGEMENT (/admin/translations)
                 ========================================================= */}
              {section === 'translations' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900">
                        Live Trilingual Dictionary Editor (English • ਪੰਜਾਬੀ • हिन्दी)
                      </h2>
                      <p className="text-xs text-slate-500">
                        Edit translation strings in real time. Changes immediately reflect across the entire platform.
                      </p>
                    </div>
                    <input
                      type="text"
                      value={translationSearch}
                      onChange={(e) => setTranslationSearch(e.target.value)}
                      placeholder="Search key or Punjabi/Hindi text..."
                      className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs w-64"
                    />
                  </div>

                  <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-[11px] font-extrabold uppercase">
                            <th className="p-3.5">Key & Page</th>
                            <th className="p-3.5">English (EN)</th>
                            <th className="p-3.5">Punjabi (ਪੰਜਾਬੀ Gurmukhi)</th>
                            <th className="p-3.5">Hindi (हिन्दी Devanagari)</th>
                            <th className="p-3.5 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {translations
                            .filter(
                              (tr) =>
                                tr.key
                                  .toLowerCase()
                                  .includes(translationSearch.toLowerCase()) ||
                                tr.en
                                  .toLowerCase()
                                  .includes(translationSearch.toLowerCase()) ||
                                tr.pa.includes(translationSearch) ||
                                tr.hi.includes(translationSearch)
                            )
                            .map((tr) => {
                              const isEditing = editingTranslationKey === tr.key;
                              return (
                                <tr key={tr.key} className="hover:bg-blue-50/40">
                                  <td className="p-3.5">
                                    <div className="font-mono font-bold text-blue-700">
                                      {tr.key}
                                    </div>
                                    <div className="text-[11px] text-slate-400">{tr.page}</div>
                                  </td>
                                  <td className="p-3.5">
                                    {isEditing ? (
                                      <input
                                        type="text"
                                        value={transEn}
                                        onChange={(e) => setTransEn(e.target.value)}
                                        className="w-full px-2 py-1 rounded border border-blue-400"
                                      />
                                    ) : (
                                      tr.en
                                    )}
                                  </td>
                                  <td className="p-3.5 font-medium">
                                    {isEditing ? (
                                      <input
                                        type="text"
                                        value={transPa}
                                        onChange={(e) => setTransPa(e.target.value)}
                                        className="w-full px-2 py-1 rounded border border-blue-400"
                                      />
                                    ) : (
                                      tr.pa
                                    )}
                                  </td>
                                  <td className="p-3.5 font-medium">
                                    {isEditing ? (
                                      <input
                                        type="text"
                                        value={transHi}
                                        onChange={(e) => setTransHi(e.target.value)}
                                        className="w-full px-2 py-1 rounded border border-blue-400"
                                      />
                                    ) : (
                                      tr.hi
                                    )}
                                  </td>
                                  <td className="p-3.5 text-right">
                                    {isEditing ? (
                                      <button
                                        onClick={() => {
                                          updateTranslationEntry(tr.key, {
                                            en: transEn,
                                            pa: transPa,
                                            hi: transHi,
                                            status: 'Published',
                                          });
                                          setEditingTranslationKey(null);
                                        }}
                                        className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold"
                                      >
                                        Publish
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setEditingTranslationKey(tr.key);
                                          setTransEn(tr.en);
                                          setTransPa(tr.pa);
                                          setTransHi(tr.hi);
                                        }}
                                        className="px-3 py-1 rounded-lg bg-blue-100 text-blue-800 font-bold"
                                      >
                                        Edit
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.15 REPORTS & ANALYTICS (/admin/reports)
                 ========================================================= */}
              {section === 'reports' && (
                <AdminReportsAnalytics
                  bookings={bookings}
                  providers={providers}
                  customers={customers}
                  categories={categories}
                  cities={cities}
                  supportTickets={tickets}
                  reviews={reviews}
                  activeReportType={activeReportType}
                  setActiveReportType={setActiveReportType}
                  reportDateRange={reportDateRange}
                  setReportDateRange={setReportDateRange}
                  exportCsvFile={exportCsvFile}
                />
              )}

              {/* =========================================================
                  8.16 & 8.17 ADMIN USERS, ROLES & PERMISSIONS (/admin/roles)
                 ========================================================= */}
              {section === 'roles' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg space-y-4">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Authorized Admin Team Members ({adminUsers.length}) — Click to Activate Role
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {adminUsers.map((adm) => (
                        <div
                          key={adm.id}
                          className="p-4 rounded-2xl border border-blue-200 bg-gradient-to-r from-white to-blue-50/60 flex items-center justify-between gap-3 shadow-sm"
                        >
                          <div>
                            <div className="font-extrabold text-sm text-slate-900">
                              {adm.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {adm.email} • Scope: {adm.cityScope}
                            </div>
                            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white">
                              {adm.roleProfile}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedAdminUserId(adm.id)}
                              className="px-3 py-1.5 rounded-xl bg-blue-100 text-blue-800 text-xs font-bold"
                            >
                              Matrix
                            </button>
                            <button
                              onClick={() => handleProfileSwitch(adm.roleProfile)}
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow"
                            >
                              Launch Role →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Module-Wise Permission Matrix */}
                  <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-lg space-y-3">
                    {(() => {
                      const adm =
                        adminUsers.find((u) => u.id === selectedAdminUserId) || adminUsers[0];
                      if (!adm) return null;
                      return (
                        <>
                          <h3 className="text-sm font-extrabold text-slate-900">
                            Interactive Module Permission Matrix: {adm.name} ({adm.roleProfile})
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-[11px] font-extrabold uppercase">
                                  <th className="p-3">Module</th>
                                  <th className="p-3 text-center">View</th>
                                  <th className="p-3 text-center">Create</th>
                                  <th className="p-3 text-center">Edit</th>
                                  <th className="p-3 text-center">Delete</th>
                                  <th className="p-3 text-center">Approve</th>
                                  <th className="p-3 text-center">Export</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {adm.permissions.map((perm, pIdx) => (
                                  <tr key={perm.module} className="hover:bg-blue-50/40">
                                    <td className="p-3 font-bold text-slate-900">
                                      {perm.module}
                                    </td>
                                    {(
                                      [
                                        'view',
                                        'create',
                                        'edit',
                                        'delete',
                                        'approve',
                                        'export',
                                      ] as const
                                    ).map((field) => (
                                      <td key={field} className="p-3 text-center">
                                        <input
                                          type="checkbox"
                                          checked={perm[field]}
                                          onChange={(e) => {
                                            const checked = e.target.checked;
                                            setAdminUsers((prev) =>
                                              prev.map((u) =>
                                                u.id === adm.id
                                                  ? {
                                                      ...u,
                                                      permissions: u.permissions.map(
                                                        (pm, i) =>
                                                          i === pIdx
                                                            ? { ...pm, [field]: checked }
                                                            : pm
                                                      ),
                                                    }
                                                  : u
                                              )
                                            );
                                            showToast(
                                              `Updated ${perm.module} (${field}) permission`,
                                              'info'
                                            );
                                          }}
                                          className="rounded text-blue-600 cursor-pointer"
                                        />
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* =========================================================
                  8.18 PLATFORM SETTINGS (/admin/settings)
                 ========================================================= */}
              {section === 'settings' && (
                <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-lg space-y-4">
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Global Platform Configuration & Policy Controls
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Platform Brand Title
                      </label>
                      <input
                        type="text"
                        value={platformSettings.platformName}
                        onChange={(e) =>
                          setPlatformSettings((p) => ({ ...p, platformName: e.target.value }))
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Support Email (Demo)
                      </label>
                      <input
                        type="text"
                        value={platformSettings.supportEmail}
                        onChange={(e) =>
                          setPlatformSettings((p) => ({ ...p, supportEmail: e.target.value }))
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      showToast('Saved global platform settings successfully.', 'success')
                    }
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold shadow-lg"
                  >
                    Save Platform Configuration
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
