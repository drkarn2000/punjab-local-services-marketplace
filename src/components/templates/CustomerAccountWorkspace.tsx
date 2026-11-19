'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Calendar,
  CheckCircle2,
  CreditCard,
  Download,
  Edit3,
  FileText,
  Filter,
  Globe,
  Headphones,
  Home,
  LayoutDashboard,
  MapPin,
  Plus,
  Printer,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Trash2,
  User,
  XCircle,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CitySlug, Language } from '@/types/marketplace';

export type CustomerAccountSection =
  | 'overview'
  | 'profile'
  | 'addresses'
  | 'bookings'
  | 'booking-detail'
  | 'payments'
  | 'invoices'
  | 'reviews'
  | 'notifications'
  | 'preferences'
  | 'cancellation'
  | 'refunds';

export function CustomerAccountWorkspace({
  section,
  bookingDetailId,
}: {
  section: CustomerAccountSection;
  bookingDetailId?: string;
}) {
  const {
    language,
    setLanguage,
    currentCustomer,
    updateCustomerProfile,
    addAddress,
    deleteAddress,
    setDefaultAddress,
    bookings,
    reviews,
    setReviews,
    notifications,
    markAllNotificationsRead,
    cancelBooking,
    requestRefund,
    respondToEstimate,
    completePayment,
    showToast,
  } = useMarketplace();

  // Profile Edit State
  const [nameInput, setNameInput] = useState(currentCustomer.name);
  const [phoneInput, setPhoneInput] = useState(currentCustomer.phone);
  const [emailInput, setEmailInput] = useState(currentCustomer.email);

  // Address Form State
  const [addrLabel, setAddrLabel] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [houseFlat, setHouseFlat] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState<CitySlug>('mohali');
  const [pinCode, setPinCode] = useState('160062');
  const [landmark, setLandmark] = useState('');

  // Bookings Filter State
  const [bookingTab, setBookingTab] = useState<
    'All' | 'Upcoming' | 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'
  >('All');
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingCatFilter, setBookingCatFilter] = useState('all');

  // Cancellation & Refund State
  const [cancelTargetId, setCancelTargetId] = useState(
    bookings[0]?.id || 'PB-2026-8901'
  );
  const [cancelReason, setCancelReason] = useState(
    'Change of schedule / No longer needed today'
  );
  const [cancelComment, setCancelComment] = useState('');

  const [refundTargetId, setRefundTargetId] = useState(
    bookings[0]?.id || 'PB-2026-8901'
  );
  const [refundReason, setRefundReason] = useState(
    'Cancelled prior to technician dispatch — visiting fee refund'
  );
  const [refundAmount, setRefundAmount] = useState(199);

  // Notification Filter
  const [notifFilter, setNotifFilter] = useState('All');

  const navItems: {
    id: CustomerAccountSection;
    label: string;
    href: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      href: '/account',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'profile',
      label: 'Profile Management',
      href: '/account/profile',
      icon: <User className="w-4 h-4" />,
    },
    {
      id: 'addresses',
      label: 'Saved Addresses',
      href: '/account/addresses',
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      id: 'bookings',
      label: 'My Bookings',
      href: '/account/bookings',
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: 'payments',
      label: 'Payment History',
      href: '/account/payments',
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      id: 'invoices',
      label: 'GST / Tax Invoices',
      href: '/account/invoices',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'reviews',
      label: 'My Reviews',
      href: '/account/reviews',
      icon: <Star className="w-4 h-4" />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      href: '/account/notifications',
      icon: <Bell className="w-4 h-4" />,
    },
    {
      id: 'preferences',
      label: 'Preferences & Language',
      href: '/account/preferences',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: 'cancellation',
      label: 'Cancel Booking',
      href: '/account/cancellation',
      icon: <XCircle className="w-4 h-4" />,
    },
    {
      id: 'refunds',
      label: 'Refund Requests',
      href: '/account/refunds',
      icon: <RefreshCcw className="w-4 h-4" />,
    },
  ];

  const filteredBookings = bookings.filter((b) => {
    if (bookingTab === 'Upcoming') {
      if (
        !['Booking Requested', 'Provider Accepted', 'Provider En Route'].includes(
          b.status
        )
      )
        return false;
    } else if (bookingTab === 'Pending') {
      if (
        ![
          'Booking Requested',
          'Estimate Sent',
          'Customer Approval Pending',
        ].includes(b.status)
      )
        return false;
    } else if (bookingTab === 'In Progress') {
      if (
        ![
          'Provider Arrived',
          'Inspection Started',
          'Estimate Approved',
          'Work In Progress',
        ].includes(b.status)
      )
        return false;
    } else if (bookingTab === 'Completed') {
      if (
        !['Work Completed', 'Payment Completed', 'Review Submitted'].includes(
          b.status
        )
      )
        return false;
    } else if (bookingTab === 'Cancelled') {
      if (b.status !== 'Cancelled' && b.status !== 'Rejected') return false;
    }

    if (bookingCatFilter !== 'all' && b.categorySlug !== bookingCatFilter) {
      return false;
    }
    if (bookingSearch.trim()) {
      const q = bookingSearch.toLowerCase();
      return (
        b.id.toLowerCase().includes(q) ||
        b.providerName.toLowerCase().includes(q) ||
        b.subcategoryName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const detailBooking =
    bookings.find((b) => b.id === bookingDetailId) || bookings[0];

  const customerNotifications = notifications.filter(
    (n) =>
      n.targetRole === 'customer' &&
      (notifFilter === 'All' || n.category === notifFilter)
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Sidebar Navigation (3 cols) */}
        <aside className="lg:col-span-3 bg-gradient-to-b from-[#041418] to-[#0f1c38] text-white rounded-3xl border border-teal-900/60 p-5 shadow-2xl space-y-5 sticky top-24">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <img
              src={currentCustomer.avatar}
              alt={currentCustomer.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-cyan-400/50 shadow-md"
            />
            <div className="min-w-0">
              <div className="font-extrabold text-white text-sm truncate">
                {currentCustomer.name}
              </div>
              <div className="text-xs text-cyan-300 font-semibold truncate">
                {currentCustomer.phone}
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active =
                section === item.id ||
                (section === 'booking-detail' && item.id === 'bookings');
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-emerald-600 to-cyan-500 text-white shadow-lg shadow-blue-600/30 translate-x-1'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/10">
            <Link
              href="/support"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold hover:bg-amber-500/30 transition"
            >
              <Headphones className="w-4 h-4" />
              <span>Need Help? Support Desk</span>
            </Link>
          </div>
        </aside>

        {/* Right Main Content (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* 1. DASHBOARD OVERVIEW (/account) */}
          {section === 'overview' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#041418] via-[#092930] to-[#0ea5e9] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl glow-blue">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-cyan-200 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                    Verified Customer Portal • {currentCustomer.citySlug.toUpperCase()}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold">
                    Sat Sri Akal, {currentCustomer.name}!
                  </h1>
                  <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                    Manage your bookings, approve technician estimates, and download invoices from your personal dashboard.
                  </p>
                </div>
                <Link
                  href="/book"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-extrabold text-xs sm:text-sm shrink-0 shadow-lg hover:scale-105 transition"
                >
                  + Book New Service
                </Link>
              </div>

              {/* 4 Clickable Colorful KPI Widgets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Link
                  href="/account/bookings"
                  className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition-all glow-blue group"
                >
                  <div className="text-xs text-emerald-100 font-bold">
                    Total Bookings
                  </div>
                  <div className="text-3xl font-extrabold mt-1">
                    {bookings.length}
                  </div>
                  <div className="text-[11px] text-cyan-200 font-bold mt-2 group-hover:translate-x-1 transition-transform">
                    View All Bookings →
                  </div>
                </Link>
                <Link
                  href="/booking/tracking?bookingId=PB-2026-8901"
                  className="bg-gradient-to-br from-violet-600 to-purple-800 text-white rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition-all glow-purple group"
                >
                  <div className="text-xs text-purple-100 font-bold">
                    Upcoming / Active
                  </div>
                  <div className="text-3xl font-extrabold mt-1">
                    {
                      bookings.filter(
                        (b) =>
                          b.status !== 'Review Submitted' &&
                          b.status !== 'Cancelled'
                      ).length
                    }
                  </div>
                  <div className="text-[11px] text-purple-200 font-bold mt-2 group-hover:translate-x-1 transition-transform">
                    Live Track Active →
                  </div>
                </Link>
                <Link
                  href="/account/invoices"
                  className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition-all glow-emerald group"
                >
                  <div className="text-xs text-emerald-100 font-bold">
                    Completed Jobs
                  </div>
                  <div className="text-3xl font-extrabold mt-1">
                    {
                      bookings.filter((b) =>
                        [
                          'Work Completed',
                          'Payment Completed',
                          'Review Submitted',
                        ].includes(b.status)
                      ).length
                    }
                  </div>
                  <div className="text-[11px] text-emerald-100 font-bold mt-2 group-hover:translate-x-1 transition-transform">
                    Download Invoices →
                  </div>
                </Link>
                <Link
                  href="/booking/estimate?bookingId=PB-2026-8901"
                  className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition-all glow-amber group"
                >
                  <div className="text-xs text-amber-100 font-bold">
                    Pending Estimates
                  </div>
                  <div className="text-3xl font-extrabold mt-1">
                    {
                      bookings.filter(
                        (b) => b.status === 'Customer Approval Pending'
                      ).length
                    }
                  </div>
                  <div className="text-[11px] text-amber-100 font-bold mt-2 group-hover:translate-x-1 transition-transform">
                    Review Estimate →
                  </div>
                </Link>
              </div>

              {/* Recent Bookings & Quick Actions */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Recent Bookings & Estimate Approvals
                  </h2>
                  <Link
                    href="/account/bookings"
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    View All Bookings →
                  </Link>
                </div>

                <div className="space-y-3">
                  {bookings.slice(0, 3).map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-emerald-700">
                            {b.id}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                            {b.status}
                          </span>
                        </div>
                        <div className="font-bold text-slate-900 text-sm">
                          {b.categoryName} — {b.subcategoryName} ({b.providerName})
                        </div>
                        <div className="text-xs text-slate-500">
                          {b.date} • {b.timeSlot} • Total: ₹{b.finalTotal}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/account/bookings/${b.id}`}
                          className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:border-emerald-600"
                        >
                          Details
                        </Link>
                        <Link
                          href={`/booking/tracking?bookingId=${b.id}`}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                        >
                          Track Live
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. PROFILE MANAGEMENT (/account/profile) */}
          {section === 'profile' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-5">
              <h1 className="text-2xl font-extrabold text-slate-900">
                Profile Management
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Preferred Language
                  </label>
                  <select
                    aria-label="Preferred Language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50"
                  >
                    <option value="en">English (EN)</option>
                    <option value="pa">ਪੰਜਾਬੀ (Gurmukhi)</option>
                    <option value="hi">हिन्दी (Devanagari)</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() =>
                    updateCustomerProfile({
                      name: nameInput,
                      phone: phoneInput,
                      email: emailInput,
                    })
                  }
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          )}

          {/* 3. SAVED ADDRESSES (/account/addresses) */}
          {section === 'addresses' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Saved Service Addresses
                </h1>
                <div className="space-y-3">
                  {currentCustomer.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-sm">
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                              Default Address
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {addr.houseFlat}, {addr.streetLocality}, {addr.city},{' '}
                          {addr.state} - {addr.pinCode}
                        </p>
                        {addr.landmark && (
                          <p className="text-[11px] text-slate-400">
                            Landmark: {addr.landmark}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {!addr.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="px-3 py-1.5 rounded-lg border border-emerald-200 text-emerald-700 text-xs font-bold hover:bg-emerald-50"
                          >
                            Set Default
                          </button>
                        )}
                        {currentCustomer.addresses.length > 1 && (
                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50"
                            aria-label="Delete address"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Address Form */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Add New Address (Simulated Location)
                </h2>
                <div className="flex gap-2">
                  {(['Home', 'Office', 'Other'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setAddrLabel(l)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border ${
                        addrLabel === l
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="House / Flat Number *"
                    value={houseFlat}
                    onChange={(e) => setHouseFlat(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                  <input
                    type="text"
                    placeholder="Street / Sector / Locality *"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                  <select
                    aria-label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value as CitySlug)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 font-semibold"
                  >
                    <option value="mohali">Mohali</option>
                    <option value="chandigarh">Chandigarh</option>
                    <option value="hoshiarpur">Hoshiarpur</option>
                  </select>
                  <input
                    type="text"
                    placeholder="PIN Code"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Landmark & Address Instructions"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                />

                <button
                  onClick={() => {
                    if (!houseFlat.trim() || !street.trim()) {
                      showToast('Enter house number and locality.', 'warning');
                      return;
                    }
                    addAddress({
                      label: addrLabel,
                      houseFlat: houseFlat.trim(),
                      streetLocality: street.trim(),
                      city:
                        city === 'mohali'
                          ? 'Mohali'
                          : city === 'chandigarh'
                          ? 'Chandigarh'
                          : 'Hoshiarpur',
                      citySlug: city,
                      state: 'Punjab',
                      pinCode,
                      landmark,
                      isDefault: false,
                    });
                    setHouseFlat('');
                    setStreet('');
                    setLandmark('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Save Address
                </button>
              </div>
            </div>
          )}

          {/* 4. MY BOOKINGS (/account/bookings) */}
          {section === 'bookings' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  My Bookings ({filteredBookings.length})
                </h1>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    placeholder="Search ID, provider, service..."
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                  <select
                    aria-label="Filter by Category"
                    value={bookingCatFilter}
                    onChange={(e) => setBookingCatFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
                  >
                    <option value="all">All Categories</option>
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="computer-repair">Computer Repair</option>
                    <option value="mobile-repair">Mobile Repair</option>
                  </select>
                </div>
              </div>

              {/* Status Tabs */}
              <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3">
                {(
                  [
                    'All',
                    'Upcoming',
                    'Pending',
                    'In Progress',
                    'Completed',
                    'Cancelled',
                  ] as const
                ).map((t) => (
                  <button
                    key={t}
                    onClick={() => setBookingTab(t)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      bookingTab === t
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl border border-slate-200 space-y-3 hover:border-emerald-400 transition"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-emerald-700 text-xs">
                          {b.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 text-[11px] font-bold">
                          {b.status}
                        </span>
                        <span className="text-xs text-slate-400">
                          • {b.date} ({b.timeSlot})
                        </span>
                      </div>
                      <div className="text-sm font-extrabold text-slate-900">
                        Total: ₹{b.finalTotal}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="font-extrabold text-slate-900 text-base">
                          {b.categoryName} — {b.subcategoryName}
                        </div>
                        <p className="text-xs text-slate-600">
                          Professional: <strong>{b.providerName}</strong> •{' '}
                          {b.address.houseFlat}, {b.address.streetLocality},{' '}
                          {b.address.city}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/account/bookings/${b.id}`}
                          className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:border-emerald-600"
                        >
                          Booking Details
                        </Link>
                        <Link
                          href={`/booking/tracking?bookingId=${b.id}`}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                        >
                          Track Booking
                        </Link>
                        <Link
                          href={`/booking/estimate?bookingId=${b.id}`}
                          className="px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold"
                        >
                          Estimate
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. BOOKING DETAIL (/account/bookings/[id]) */}
          {section === 'booking-detail' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <Link
                    href="/account/bookings"
                    className="text-xs font-bold text-emerald-600 hover:underline"
                  >
                    ← Back to My Bookings
                  </Link>
                  <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
                    Booking Details — {detailBooking.id}
                  </h1>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold">
                  {detailBooking.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Service & Provider
                  </div>
                  <div>
                    <strong>Category:</strong> {detailBooking.categoryName} (
                    {detailBooking.subcategoryName})
                  </div>
                  <div>
                    <strong>Professional:</strong> {detailBooking.providerName}{' '}
                    ({detailBooking.providerPhone})
                  </div>
                  <div>
                    <strong>Problem Reported:</strong>{' '}
                    {detailBooking.problemDescription}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Location, Schedule & Payment
                  </div>
                  <div>
                    <strong>Address:</strong> {detailBooking.address.houseFlat},{' '}
                    {detailBooking.address.streetLocality},{' '}
                    {detailBooking.address.city}
                  </div>
                  <div>
                    <strong>Date & Slot:</strong> {detailBooking.date} (
                    {detailBooking.timeSlot})
                  </div>
                  <div>
                    <strong>Payment Status:</strong>{' '}
                    {detailBooking.paymentStatus} ({detailBooking.paymentMethod})
                  </div>
                  <div>
                    <strong>Invoice Ref:</strong> {detailBooking.invoiceId}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/booking/tracking?bookingId=${detailBooking.id}`}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Open Live Tracker
                </Link>
                <Link
                  href={`/booking/estimate?bookingId=${detailBooking.id}`}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold"
                >
                  Review Hybrid Estimate
                </Link>
                <Link
                  href="/account/invoices"
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold"
                >
                  Download Invoice
                </Link>
              </div>
            </div>
          )}

          {/* 6. PAYMENTS & METHODS (/account/payments) */}
          {section === 'payments' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-cyan-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl glow-blue flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-cyan-200 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                    Customer Wallet & UPI Vault
                  </span>
                  <h1 className="text-2xl font-extrabold">
                    Payments, Saved UPI & Transaction Ledger
                  </h1>
                  <p className="text-xs text-emerald-100 mt-1">
                    Manage your saved payment methods and track every booking transaction in real time.
                  </p>
                </div>
                <Link
                  href="/account/invoices"
                  className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-md hover:bg-emerald-50 transition shrink-0"
                >
                  Open GST Tax Invoices →
                </Link>
              </div>

              {/* Saved Payment Methods */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white p-5 shadow-lg glow-blue">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-200">
                      Primary UPI ID
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 text-[10px] font-extrabold">
                      VERIFIED
                    </span>
                  </div>
                  <div className="text-lg font-extrabold mt-3">
                    jaspreet.kaur@okhdfcbank
                  </div>
                  <div className="text-xs text-emerald-200 mt-1">
                    Google Pay / PhonePe Auto-Approve Enabled
                  </div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 text-white p-5 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                      Saved Debit / Credit Card
                    </span>
                    <span className="text-xs font-extrabold">VISA</span>
                  </div>
                  <div className="text-lg font-extrabold mt-3 tracking-widest">
                    •••• •••• •••• 4829
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    HDFC Regalia • Expires 08/29
                  </div>
                </div>
                <button
                  onClick={() =>
                    showToast(
                      'Demo UPI / Card token linked to your Punjab Services profile!',
                      'success'
                    )
                  }
                  className="rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-100/60 text-emerald-700 p-5 flex flex-col items-center justify-center gap-2 font-extrabold text-xs transition"
                >
                  <CreditCard className="w-6 h-6 text-emerald-600" />
                  <span>+ Add New UPI ID or Card</span>
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Payment Transaction History
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-slate-900 to-teal-950 text-white">
                        <th className="p-3.5 text-left rounded-tl-xl">Transaction Ref</th>
                        <th className="p-3.5 text-left">Booking & Service</th>
                        <th className="p-3.5 text-left">Payment Mode</th>
                        <th className="p-3.5 text-left">Status</th>
                        <th className="p-3.5 text-right rounded-tr-xl">Amount Paid</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-emerald-50/40 transition">
                          <td className="p-3.5 font-extrabold text-teal-700">
                            {b.transactionRef}
                            <span className="block text-[11px] text-slate-500">
                              {b.date}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900">
                              {b.subcategoryName} ({b.id})
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Professional: {b.providerName}
                            </div>
                          </td>
                          <td className="p-3.5 font-semibold text-slate-700">
                            {b.paymentMethod}
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px]">
                              {b.paymentStatus}
                            </span>
                          </td>
                          <td className="p-3.5 text-right font-extrabold text-slate-900 text-sm">
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

          {/* 7. GST / TAX INVOICES (/account/invoices) */}
          {section === 'invoices' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl glow-emerald flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-emerald-200 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                    GST Compliant Tax Invoices
                  </span>
                  <h1 className="text-2xl font-extrabold">
                    Tax Invoices & Warranty Certificates
                  </h1>
                  <p className="text-xs text-emerald-100 mt-1">
                    Download official GST invoices with itemized visiting charge, labor, parts, and 30-day service warranty certificate.
                  </p>
                </div>
                <button
                  onClick={() =>
                    showToast(
                      'Exported All FY 2026-27 GST Invoices as ZIP archive!',
                      'success'
                    )
                  }
                  className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md hover:bg-amber-300 transition shrink-0 inline-flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download All (ZIP)
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-3xl border border-slate-200 p-5 shadow-card hover:border-teal-400 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-teal-50 text-teal-800 font-extrabold text-xs border border-teal-200">
                          {b.invoiceId}
                        </span>
                        <span className="text-xs font-bold text-emerald-600">
                          Booking #{b.id}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                          30-Day Warranty Active
                        </span>
                      </div>
                      <div className="text-base font-extrabold text-slate-900">
                        {b.subcategoryName} — {b.providerName}
                      </div>
                      <div className="text-xs text-slate-500">
                        Service Date: {b.date} • Visit Fee: ₹{b.visitingFee} • Total Billed (incl. GST):{' '}
                        <strong className="text-slate-900">₹{b.finalTotal}</strong>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() =>
                          showToast(
                            `Downloaded ${b.invoiceId}.pdf (GST Tax Invoice)`,
                            'success'
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-xs inline-flex items-center gap-1.5 shadow-sm hover:opacity-95"
                      >
                        <Download className="w-3.5 h-3.5" /> Download PDF
                      </button>
                      <button
                        onClick={() => {
                          if (typeof window !== 'undefined') window.print();
                        }}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 hover:bg-slate-50"
                      >
                        <Printer className="w-3.5 h-3.5" /> Print
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. REVIEWS (/account/reviews) */}
          {section === 'reviews' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
              <h1 className="text-2xl font-extrabold text-slate-900">
                My Submitted Reviews ({reviews.length})
              </h1>
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">
                          {r.providerName} — {r.serviceName}
                        </span>
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />{' '}
                          {r.rating}.0
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{r.comment}</p>
                      <span className="text-[11px] text-slate-400">
                        Booking Ref: {r.bookingId} • {r.date}
                      </span>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() =>
                          showToast(
                            `Review for ${r.providerName} updated!`,
                            'success'
                          )
                        }
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setReviews((prev) =>
                            prev.filter((item) => item.id !== r.id)
                          );
                          showToast('Review deleted (Demo).', 'info');
                        }}
                        className="px-3 py-1.5 rounded-lg border border-rose-200 text-xs font-bold text-rose-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. NOTIFICATIONS (/account/notifications) */}
          {section === 'notifications' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Notifications Center
                </h1>
                <button
                  onClick={() => markAllNotificationsRead('customer')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold"
                >
                  Mark All as Read
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {['All', 'Booking', 'Estimate', 'Payment', 'Offer', 'Support'].map(
                  (c) => (
                    <button
                      key={c}
                      onClick={() => setNotifFilter(c)}
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        notifFilter === c
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {c}
                    </button>
                  )
                )}
              </div>

              <div className="space-y-2.5">
                {customerNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                      n.read
                        ? 'bg-white border-slate-200'
                        : 'bg-emerald-50/50 border-emerald-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {n.category}
                        </span>
                        <span className="font-extrabold text-slate-900 text-sm">
                          {n.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{n.message}</p>
                      <span className="text-[10px] text-slate-400">
                        {n.timestamp}
                      </span>
                    </div>
                    {n.link && (
                      <Link
                        href={n.link}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shrink-0"
                      >
                        Open
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. PREFERENCES (/account/preferences) */}
          {section === 'preferences' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-5">
              <h1 className="text-2xl font-extrabold text-slate-900">
                Notification & Language Preferences
              </h1>

              <div className="space-y-3">
                {[
                  {
                    key: 'email',
                    title: 'Email Booking & Invoice Alerts',
                    desc: 'Receive digital estimates and PDF invoices via email.',
                  },
                  {
                    key: 'sms',
                    title: 'SMS Status Updates (Visual Demo Only)',
                    desc: 'Alerts when technician accepts or arrives at your doorstep.',
                  },
                  {
                    key: 'push',
                    title: 'Browser Push Notifications',
                    desc: 'Real-time estimate approval reminders.',
                  },
                  {
                    key: 'offers',
                    title: 'Seasonal Offers & Coupons',
                    desc: 'Receive Tricity & Hoshiarpur promotional deals.',
                  },
                ].map((pref) => {
                  const checked =
                    currentCustomer.notificationPrefs[
                      pref.key as keyof typeof currentCustomer.notificationPrefs
                    ];
                  return (
                    <label
                      key={pref.key}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 cursor-pointer"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-sm">
                          {pref.title}
                        </div>
                        <div className="text-xs text-slate-500">{pref.desc}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          updateCustomerProfile({
                            notificationPrefs: {
                              ...currentCustomer.notificationPrefs,
                              [pref.key]: e.target.checked,
                            },
                          })
                        }
                        className="w-5 h-5 rounded text-emerald-600"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* 11. CANCELLATION FLOW (/account/cancellation) */}
          {section === 'cancellation' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
              <h1 className="text-2xl font-extrabold text-slate-900">
                Booking Cancellation Flow
              </h1>
              <p className="text-xs text-slate-500">
                Select a booking below, choose your cancellation reason, and confirm cancellation.
              </p>

              <div className="space-y-3 max-w-xl">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Select Booking
                  </label>
                  <select
                    aria-label="Select Booking to Cancel"
                    value={cancelTargetId}
                    onChange={(e) => setCancelTargetId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
                  >
                    {bookings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.id} — {b.subcategoryName} ({b.status})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Cancellation Reason
                  </label>
                  <select
                    aria-label="Cancellation Reason"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
                  >
                    <option>Change of schedule / No longer needed today</option>
                    <option>Booked wrong service subcategory</option>
                    <option>Estimate higher than expected budget</option>
                    <option>Technician delayed</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Optional Comments
                  </label>
                  <textarea
                    rows={3}
                    value={cancelComment}
                    onChange={(e) => setCancelComment(e.target.value)}
                    placeholder="Additional notes..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>

                <button
                  onClick={() =>
                    cancelBooking(cancelTargetId, cancelReason, cancelComment)
                  }
                  className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                >
                  Confirm Booking Cancellation
                </button>
              </div>
            </div>
          )}

          {/* 12. REFUNDS FLOW (/account/refunds) */}
          {section === 'refunds' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Submit a Refund Request (Demo)
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Select Eligible Booking
                    </label>
                    <select
                      aria-label="Select Eligible Booking"
                      value={refundTargetId}
                      onChange={(e) => setRefundTargetId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
                    >
                      {bookings.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.id} — {b.subcategoryName} (₹{b.finalTotal})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Refund Amount Requested (₹)
                    </label>
                    <input
                      type="number"
                      value={refundAmount}
                      onChange={(e) => setRefundAmount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
                    />
                  </div>
                </div>
                <div className="max-w-2xl">
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Refund Reason & Details
                  </label>
                  <input
                    type="text"
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                </div>
                <button
                  onClick={() =>
                    requestRefund(refundTargetId, refundReason, refundAmount)
                  }
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  Submit Refund Request
                </button>
              </div>

              {/* Refund History */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-3">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Refund Request History & References
                </h2>
                {bookings
                  .filter((b) => b.refundStatus && b.refundStatus !== 'None')
                  .map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-extrabold text-slate-900">
                          Refund Ref: {b.refundRef || 'RFD-DEMO'} • Booking:{' '}
                          {b.id}
                        </div>
                        <div className="text-slate-600">{b.refundReason}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-slate-900">
                          ₹{b.refundAmount || b.visitingFee}
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                          {b.refundStatus}
                        </span>
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
