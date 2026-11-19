'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  FileText,
  HelpCircle,
  IndianRupee,
  RefreshCcw,
  Search,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';
import { BOOKING_LIFECYCLE_STEPS } from '@/types/marketplace';
import { FAQ_ITEMS } from '@/data/mockData';

export default function HowItWorksPage() {
  const [journeyTab, setJourneyTab] = useState<'customer' | 'provider'>(
    'customer'
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#041418] via-[#092930] to-[#0f1c38] text-white py-14 lg:py-16 overflow-hidden border-b border-emerald-400/25">
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-teal-400/15 blur-3xl pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-400/15 border border-emerald-300/35 text-emerald-300 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" /> Transparent Hyperlocal Marketplace Workflow
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            How{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              Punjab Services
            </span>{' '}
            Works
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From discovering verified professionals in Mohali, Chandigarh &amp; Hoshiarpur to approving itemized digital estimates before any work starts—everything is built for complete peace of mind.
          </p>

          {/* 3 Quick Highlight Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs font-bold text-emerald-100">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
              ✓ Estimate-First Hybrid Pricing
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
              ✓ 12-Stage Live Tracking
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
              ✓ KYC Verified Technicians
            </span>
          </div>

          {/* Toggle Customer vs Provider Journey */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-300/30 shadow-xl mt-2">
            <button
              onClick={() => setJourneyTab('customer')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center gap-2 ${
                journeyTab === 'customer'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-lg'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customer Journey</span>
            </button>
            <button
              onClick={() => setJourneyTab('provider')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center gap-2 ${
                journeyTab === 'provider'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-lg'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Service Provider Journey</span>
            </button>
          </div>
        </div>
      </section>

      <div className="w-full px-4 sm:px-6 pt-10 space-y-12">
        {journeyTab === 'customer' ? (
          <>
            {/* Step-by-Step Customer Journey */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Find & Compare Pros',
                  desc: 'Select Mohali, Chandigarh, or Hoshiarpur, browse 5 categories & 40 subcategories, and compare verified technician ratings, experience, and upfront visiting fees.',
                  icon: <Search className="w-6 h-6 text-emerald-600" />,
                },
                {
                  step: '02',
                  title: '5-Step Guided Booking',
                  desc: 'Describe your problem, upload optional photos, pick your saved Home/Office address, and choose Instant (60-min) or Scheduled slot booking.',
                  icon: <CalendarCheck className="w-6 h-6 text-emerald-600" />,
                },
                {
                  step: '03',
                  title: 'Inspection & Hybrid Estimate',
                  desc: 'The professional arrives, inspects the issue, and sends an itemized digital estimate separating Labour and Material costs. Work starts ONLY after you click Approve.',
                  icon: <FileText className="w-6 h-6 text-emerald-600" />,
                },
                {
                  step: '04',
                  title: 'Completion, Payment & Review',
                  desc: 'Once the repair is tested and marked completed, pay via UPI/Card/Cash, download your invoice, and rate the professional.',
                  icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="bg-emerald-50 rounded-3xl border border-emerald-200/90 p-6 shadow-card hover:border-emerald-400 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                      {s.icon}
                    </div>
                    <span className="text-2xl font-extrabold text-emerald-600/40">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Hybrid Estimate & Payment Explanation (Soft Gradient Tint + Centered Titles) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-50/90 via-teal-50/60 to-white rounded-3xl border border-emerald-200/90 p-7 shadow-card space-y-4">
                <div className="text-center flex flex-col items-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-extrabold">
                    <IndianRupee className="w-4 h-4" /> Hybrid Pricing Model
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    How Estimates &amp; Visiting Charges Work
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center">
                  Unlike blind fixed quotes that often lead to disputes on arrival, Punjab Services uses a transparent Hybrid Pricing structure:
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 pt-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Upfront Visiting Fee (₹199–₹249):</strong> Shown clearly before you confirm booking. Adjusted into your final repair bill when you approve the estimate.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Itemized Labour &amp; Material Split:</strong> Every digital estimate lists Labour items, Spare Parts/Material items, Additional work, Discounts, and Taxes separately.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Mandatory Customer Approval Gate:</strong> The system locks the technician from marking work in progress or completed until you approve the estimate.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-teal-50/90 via-cyan-50/60 to-white rounded-3xl border border-teal-200/90 p-7 shadow-card space-y-4">
                <div className="text-center flex flex-col items-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100/80 text-teal-800 text-xs font-extrabold">
                    <RefreshCcw className="w-4 h-4" /> Safety, Cancellation &amp; Refunds
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    3-Step Verification &amp; Easy Refunds
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center">
                  Every technician and business agency on Punjab Services is vetted by our local verification team before going live:
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 pt-1">
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Identity &amp; Address Check:</strong> Aadhaar, PAN, and local residence/shop verification in Mohali, Chandigarh, or Hoshiarpur.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Free Cancellation Window:</strong> Cancel any scheduled booking up to 2 hours before the time slot with zero penalty.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Self-Serve Refund Tracking:</strong> Submit refund requests from your Customer Account (/account/refunds) and track status in real time.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* All 12 Booking Status States Explained (Dark Emerald-Teal Stage Cards) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-card space-y-5">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  All 12 Live Booking Lifecycle States Explained
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Track every step of your service from booking confirmation to final invoice &amp; review.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {BOOKING_LIFECYCLE_STEPS.map((st, idx) => (
                  <div
                    key={st}
                    className="p-3.5 rounded-2xl bg-gradient-to-br from-[#041418] via-[#092930] to-[#0f1c38] text-white border border-emerald-400/30 hover:border-emerald-300/80 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(16,185,129,0.3)] transition-all duration-300 space-y-1"
                  >
                    <span className="text-[10px] font-extrabold text-emerald-300">
                      STAGE {idx + 1}
                    </span>
                    <div className="text-xs font-extrabold text-white">
                      {st}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Provider Journey Explanation */
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-card space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold">
                For Independent Technicians & Business Agencies
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                How the Service Provider Portal Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: '1. Register & Verify Documents',
                  desc: 'Sign up as an Individual Technician or a Multi-Technician Business Agency. Upload demo ID/skill certificates, configure your operating radius and visiting charges.',
                },
                {
                  title: '2. Accept Jobs & Build Estimates',
                  desc: 'Receive hyperlocal requests with problem photos. Mark arrival, inspect the job, and use the built-in Estimate Builder to send itemized quotes.',
                },
                {
                  title: '3. Complete Work & Track Payouts',
                  desc: 'Once the customer approves your estimate, complete the repair, upload completion notes, and track gross earnings, platform commission, and net payouts.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2"
                >
                  <div className="font-extrabold text-slate-900 text-base">
                    {item.title}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/provider/register"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2"
              >
                <span>Register as a Provider</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/provider/dashboard"
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-800 text-xs sm:text-sm font-bold hover:bg-slate-50"
              >
                Explore Live Provider Portal Demo
              </Link>
            </div>
          </div>
        )}

        {/* FAQs Preview + Book CTA */}
        <div className="bg-gradient-to-r from-[#041418] to-[#1d4ed8] text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold">
              Ready to Book a Trusted Professional?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100">
              Try our interactive 5-step booking flow or browse all 70+ FAQs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/book"
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm transition inline-flex items-center gap-2"
            >
              <Wrench className="w-4 h-4" />
              <span>Book a Service Now</span>
            </Link>
            <Link
              href="/faq"
              className="px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm transition inline-flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4" />
              <span>View All FAQs</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
