'use client';

import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  ExternalLink,
  Globe,
  MapPin,
  ShieldCheck,
  User,
  Wrench,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';

export default function SitemapPage() {
  const { categories, subcategories, cities, providers } = useMarketplace();

  const publicRoutes = [
    { label: 'Homepage', href: '/' },
    { label: 'All Services Directory', href: '/services' },
    { label: 'Electrician Listing', href: '/services/electrician' },
    { label: 'Plumber Listing', href: '/services/plumber' },
    { label: 'Carpenter Listing', href: '/services/carpenter' },
    { label: 'Computer & Laptop Repair Listing', href: '/services/computer-repair' },
    { label: 'Mobile Repair Listing', href: '/services/mobile-repair' },
    { label: 'Global Search Results', href: '/search' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ Centre', href: '/faq' },
    { label: 'Offers & Coupons', href: '/offers' },
    { label: 'Become a Professional', href: '/become-a-professional' },
    { label: 'Support Centre', href: '/support' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Cancellation & Refund Policy', href: '/cancellation-refund-policy' },
    { label: 'Provider Terms', href: '/provider-terms' },
    { label: 'Community Guidelines', href: '/community-guidelines' },
  ];

  const customerAccountRoutes = [
    { label: 'Customer Login (Phone/OTP/Email)', href: '/login' },
    { label: 'Customer Registration', href: '/register' },
    { label: 'Forgot Password Recovery', href: '/forgot-password' },
    { label: '5-Step Booking Wizard', href: '/book' },
    { label: 'Booking Confirmation', href: '/booking/confirmation' },
    { label: 'Live 12-Step Booking Tracker', href: '/booking/tracking' },
    { label: 'Hybrid Estimate Approval Screen', href: '/booking/estimate' },
    { label: 'Customer Dashboard Overview', href: '/account' },
    { label: 'Profile Management', href: '/account/profile' },
    { label: 'Saved Addresses (Home/Office/Other)', href: '/account/addresses' },
    { label: 'My Bookings History', href: '/account/bookings' },
    { label: 'Booking Detail (#PB-2026-8901)', href: '/account/bookings/PB-2026-8901' },
    { label: 'Payments History', href: '/account/payments' },
    { label: 'Downloadable Invoices', href: '/account/invoices' },
    { label: 'My Reviews', href: '/account/reviews' },
    { label: 'Notifications Center', href: '/account/notifications' },
    { label: 'Notification & Language Preferences', href: '/account/preferences' },
    { label: 'Booking Cancellation Flow', href: '/account/cancellation' },
    { label: 'Refund Request & Status Tracker', href: '/account/refunds' },
  ];

  const providerRoutes = [
    { label: 'Provider Portal Home', href: '/provider' },
    { label: 'Provider Registration (Individual & Business)', href: '/provider/register' },
    { label: 'Verification Status & Checklist', href: '/provider/verification' },
    { label: 'Provider KPI Dashboard', href: '/provider/dashboard' },
    { label: 'Incoming Job Requests', href: '/provider/jobs' },
    { label: 'Job Request Detail (#PB-2026-8910)', href: '/provider/jobs/PB-2026-8910' },
    { label: 'Active Jobs Execution Flow', href: '/provider/active-jobs' },
    { label: 'Complete Hybrid Estimate Builder', href: '/provider/estimates' },
    { label: 'Job & Booking History', href: '/provider/history' },
    { label: 'Complete Availability Calendar', href: '/provider/calendar' },
    { label: 'Earnings & Commission Overview', href: '/provider/earnings' },
    { label: 'Detailed Payout Ledger', href: '/provider/payouts' },
    { label: 'Reviews Management & Replies', href: '/provider/reviews' },
    { label: 'Portfolio Gallery Manager', href: '/provider/portfolio' },
    { label: 'Complete Provider Profile Editor', href: '/provider/profile' },
    { label: 'Business Team & Technician Management', href: '/provider/team' },
  ];

  const adminRoutes = [
    { label: 'Admin Executive KPI Dashboard', href: '/admin' },
    { label: 'Customer Management', href: '/admin/customers' },
    { label: 'Provider Management', href: '/admin/providers' },
    { label: 'Provider Verification Queue', href: '/admin/verification' },
    { label: 'Category Management', href: '/admin/categories' },
    { label: 'Subcategory Management', href: '/admin/subcategories' },
    { label: 'Service & Visiting Fee Catalog', href: '/admin/services' },
    { label: 'City Management (Mohali, Chandigarh, Hoshiarpur)', href: '/admin/cities' },
    { label: 'Service Areas & Localities', href: '/admin/service-areas' },
    { label: 'Advanced Booking Management', href: '/admin/bookings' },
    { label: 'Pricing & Commission Settings', href: '/admin/pricing' },
    { label: 'Finance & Payment Transactions', href: '/admin/finance' },
    { label: 'Finance Reconciliation Simulator', href: '/admin/reconciliation' },
    { label: 'Provider Payouts Management', href: '/admin/payouts' },
    { label: 'Customer Refunds Management', href: '/admin/refunds' },
    { label: 'Complaints & Support Tickets', href: '/admin/support' },
    { label: 'Review Moderation', href: '/admin/reviews' },
    { label: 'CMS Content & SEO Manager', href: '/admin/cms' },
    { label: 'Full 3-Language Translation Editor (EN / PA / HI)', href: '/admin/translations' },
    { label: '11 Analytics & Exportable Reports', href: '/admin/reports' },
    { label: 'Admin Roles & Permission Profiles (RBAC)', href: '/admin/roles' },
    { label: 'Platform Configuration Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      <section className="bg-gradient-to-r from-[#041418] via-[#133882] to-[#0f1c38] text-white py-11">
        <div className="w-full px-4 sm:px-6 space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold">
            Complete Marketplace Sitemap
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            Interactive index of all implemented Customer Public, Customer
            Account, Service Provider Portal, Admin Dashboard, City SEO, and 40
            Subcategory routes.
          </p>
        </div>
      </section>

      <div className="w-full px-4 sm:px-6 pt-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Customer Public */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2.5">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>1. Customer Public ({publicRoutes.length})</span>
            </div>
            <ul className="space-y-1.5 text-xs">
              {publicRoutes.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="text-slate-700 hover:text-emerald-700 font-medium flex items-center justify-between py-0.5"
                  >
                    <span>{r.label}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Customer Account & Booking */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2.5">
              <User className="w-4 h-4 text-emerald-600" />
              <span>2. Customer Account & Booking ({customerAccountRoutes.length})</span>
            </div>
            <ul className="space-y-1.5 text-xs">
              {customerAccountRoutes.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="text-slate-700 hover:text-emerald-700 font-medium flex items-center justify-between py-0.5"
                  >
                    <span>{r.label}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Service Provider Portal */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2.5">
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>3. Provider Portal ({providerRoutes.length})</span>
            </div>
            <ul className="space-y-1.5 text-xs">
              {providerRoutes.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="text-slate-700 hover:text-emerald-700 font-medium flex items-center justify-between py-0.5"
                  >
                    <span>{r.label}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Admin Dashboard */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>4. Admin Console ({adminRoutes.length})</span>
            </div>
            <ul className="space-y-1.5 text-xs">
              {adminRoutes.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="text-slate-700 hover:text-emerald-700 font-medium flex items-center justify-between py-0.5"
                  >
                    <span>{r.label}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* City Landing Pages & SEO City/Category Combinations */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>City Hubs & 15 SEO City + Service Landing Pages</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <Link
                key={c.id}
                href={`/${c.slug}`}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                /{c.slug} ({c.name.en} Hub)
              </Link>
            ))}
            {cities.map((c) =>
              categories.map((cat) => (
                <Link
                  key={`${c.slug}-${cat.slug}`}
                  href={`/${c.slug}/${cat.slug}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-semibold"
                >
                  /{c.slug}/{cat.slug}
                </Link>
              ))
            )}
          </div>
        </div>

        {/* All 40 Subcategory Detail Pages & Provider Profiles */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base">
            <Wrench className="w-5 h-5 text-emerald-600" />
            <span>
              All 40 Subcategory Detail Pages & {providers.length} Provider
              Profiles
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 text-xs">
            {subcategories.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.categorySlug}/${s.slug}`}
                className="p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-medium truncate"
              >
                {s.name.en}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
            {providers.map((p) => (
              <Link
                key={p.id}
                href={`/professionals/${p.slug}`}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold hover:bg-emerald-100"
              >
                👤 {p.name} ({p.cityName})
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
