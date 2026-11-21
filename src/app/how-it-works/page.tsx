'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  CalendarX2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  CreditCard,
  FileCheck2,
  FileText,
  Headphones,
  IndianRupee,
  MapPin,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  UserCheck,
  Users,
  Wallet,
  Wrench,
  Zap,
} from 'lucide-react';
import { BOOKING_LIFECYCLE_STEPS } from '@/types/marketplace';
import heroSectionBg from './images/hero section bg.png';
import hybridPricingBg from './images/Hybrid Pricing Model.png';
import twilightVillasBg from '../about/images/Twilight Villas Along a Curving Road-2.png';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HowItWorksPage() {
  const [journeyTab, setJourneyTab] = useState<'customer' | 'provider'>(
    'customer'
  );

  const customerSteps = [
    {
      step: '01',
      title: 'Find & Compare Pros',
      bullets: [
        'Select your city & service',
        'Browse verified local categories',
        'Compare ratings, experience & fees',
      ],
      icon: <Search className="w-6 h-6 text-cyan-300" />,
      glow: 'from-[#07262d] to-[#041418]',
    },
    {
      step: '02',
      title: 'Book a Service',
      bullets: [
        'Select service & describe issue',
        'Upload optional photos & address',
        'Pick instant or scheduled slot',
      ],
      icon: <CalendarCheck className="w-6 h-6 text-emerald-300" />,
      glow: 'from-[#07262d] to-[#041418]',
    },
    {
      step: '03',
      title: 'Inspection & Estimate',
      bullets: [
        'Pro visits & inspects the issue',
        'Creates labour & material quote',
        'Sends estimate for your approval',
      ],
      icon: <ClipboardCheck className="w-6 h-6 text-teal-300" />,
      glow: 'from-[#07262d] to-[#041418]',
    },
    {
      step: '04',
      title: 'Work & Completion',
      bullets: [
        'Starts only after your approval',
        'Pro completes the service work',
        'Track live progress step by step',
      ],
      icon: <Wrench className="w-6 h-6 text-emerald-300" />,
      glow: 'from-[#07262d] to-[#041418]',
    },
    {
      step: '05',
      title: 'Payment & Review',
      bullets: [
        'Pay online, via UPI, or by cash',
        'Instant digital invoice generated',
        'Submit your rating and review',
      ],
      icon: <CreditCard className="w-6 h-6 text-cyan-300" />,
      glow: 'from-[#07262d] to-[#041418]',
    },
  ];

  const providerWorkflowSteps = [
    {
      step: '01',
      title: 'Register as Individual or Business',
      desc: 'Create an account as an independent technician or a multi-technician service agency.',
      icon: Users,
    },
    {
      step: '02',
      title: 'Submit Professional Info & Documents',
      desc: 'Provide identity proof, address details, and relevant skill or trade documents.',
      icon: FileText,
    },
    {
      step: '03',
      title: 'Complete Verification',
      desc: 'Admin team reviews your submission before approving and activating your profile.',
      icon: ShieldCheck,
    },
    {
      step: '04',
      title: 'Create Profile & Set Visiting Charges',
      desc: 'List your supported categories and configure transparent visiting charges.',
      icon: SlidersHorizontal,
    },
    {
      step: '05',
      title: 'Configure Working Hours & Service Areas',
      desc: 'Set weekly availability slots and select your active hyperlocal city zones.',
      icon: Clock,
    },
    {
      step: '06',
      title: 'Receive Booking Requests',
      desc: 'Get notified of nearby customer jobs with issue descriptions and uploaded photos.',
      icon: MapPin,
    },
    {
      step: '07',
      title: 'Accept or Reject Bookings',
      desc: 'Review schedule fit and problem details before confirming any incoming request.',
      icon: CalendarCheck,
    },
    {
      step: '08',
      title: 'Visit Customer & Inspect Problem',
      desc: 'Arrive on time, diagnose the issue thoroughly, and explain needed repairs.',
      icon: Search,
    },
    {
      step: '09',
      title: 'Prepare & Send Estimate',
      desc: 'Build an itemized quote separating labour and material costs for customer approval.',
      icon: ClipboardCheck,
    },
    {
      step: '10',
      title: 'Complete Approved Work',
      desc: 'Begin repair only after customer approval and mark milestones in real time.',
      icon: CheckCircle2,
    },
    {
      step: '11',
      title: 'Receive Payment & View Commission',
      desc: 'Collect payment via UPI/online/cash and view itemized labour commission breakdowns.',
      icon: IndianRupee,
    },
    {
      step: '12',
      title: 'Manage Earnings, Reviews & Availability',
      desc: 'Track net payouts, respond to customer ratings, and toggle availability anytime.',
      icon: Wallet,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-emerald-400/20 text-white">
        {/* Custom Hero Background Image */}
        <img
          src={heroSectionBg.src}
          alt="How Punjab Services Works background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#041418]/65" />

        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <motion.div {...fadeUp(0)} className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/15 border border-emerald-400/35 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                <Settings className="w-3.5 h-3.5" />
                Transparent Hyperlocal Marketplace Workflow
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
                How{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                  Punjab Services
                </span>{' '}
                Works
              </h1>

              <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                From discovering verified professionals in your city to
                approving itemized estimates and completing the work —
                here&apos;s how you get reliable, transparent and hassle-free
                service.
              </p>

              {/* 3 Trust Highlights */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-bold text-emerald-100">
                <div className="group inline-flex items-center gap-2.5 hover:text-emerald-300 hover:translate-x-0.5 transition-all cursor-default">
                  <span className="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-400/45 flex items-center justify-center text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-all">
                    <Zap className="w-4 h-4" />
                  </span>
                  <span>Estimate-First Hybrid Pricing</span>
                </div>
                <div className="group inline-flex items-center gap-2.5 hover:text-emerald-300 hover:translate-x-0.5 transition-all cursor-default">
                  <span className="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-400/45 flex items-center justify-center text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-all">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span>12-Stage Booking Lifecycle</span>
                </div>
                <div className="group inline-flex items-center gap-2.5 hover:text-emerald-300 hover:translate-x-0.5 transition-all cursor-default">
                  <span className="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-400/45 flex items-center justify-center text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-all">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <span>Verified Service Professionals</span>
                </div>
              </div>

              {/* Interactive Journey Toggle Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setJourneyTab('customer')}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center gap-2 ${
                    journeyTab === 'customer'
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-[0_8px_24px_rgba(16,185,129,0.45)]'
                      : 'bg-white/10 text-slate-100 border border-emerald-400/35 hover:bg-white/15'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Customer Journey</span>
                </button>
                <button
                  type="button"
                  onClick={() => setJourneyTab('provider')}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center gap-2 ${
                    journeyTab === 'provider'
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-[0_8px_24px_rgba(16,185,129,0.45)]'
                      : 'bg-white/10 text-slate-100 border border-emerald-400/35 hover:bg-white/15'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Service Provider Journey</span>
                </button>
              </div>
            </motion.div>

            {/* Right Verified Local Experts Badge (over custom hero background) */}
            <div className="lg:col-span-5 relative flex items-end justify-end min-h-[120px] lg:min-h-[300px]">
              <div className="bg-white/95 backdrop-blur-md text-slate-950 px-4 py-2.5 rounded-2xl shadow-2xl border border-emerald-200 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-extrabold">Verified</div>
                  <div className="text-[11px] font-bold text-slate-600">
                    Local Experts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {journeyTab === 'customer' ? (
          <>
            {/* 2. CUSTOMER JOURNEY – 5 STEPS */}
            <motion.section {...fadeUp(0.05)} className="space-y-8">
              <div className="text-center space-y-3">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#041418] border border-emerald-400/50 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider shadow">
                  <MapPin className="w-3.5 h-3.5" />
                  Customer Journey
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  A Simple 5-Step Booking Process
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                  Find, book and get your home or device repaired in just a few
                  easy steps.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 pt-6 relative">
                {customerSteps.map((s, idx) => (
                  <div key={s.step} className="relative flex items-stretch">
                    <div className="w-full relative group rounded-3xl bg-gradient-to-b from-[#0a2328] via-[#071a1f] to-[#051418] border border-emerald-400/25 hover:border-emerald-300/75 p-5 pt-10 flex flex-col items-center gap-3.5 shadow-xl hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(16,185,129,0.28)] transition-all duration-300">
                      {/* Floating Icon Straddling Top-Left Border */}
                      <div
                        className={`absolute -top-6 left-5 z-20 w-12 h-12 rounded-2xl bg-gradient-to-br ${s.glow} border border-emerald-400/50 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        {s.icon}
                      </div>

                      {/* Floating Step Number Pill Straddling Top-Right Border */}
                      <span className="absolute -top-3.5 right-5 z-20 px-3 py-1 rounded-full bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-lg">
                        {s.step}
                      </span>

                      <h3 className="text-base font-extrabold text-white text-center group-hover:text-emerald-300 transition-colors">
                        {s.title}
                      </h3>

                      <ul className="space-y-2 text-[11px] text-slate-300 w-full text-left pt-2 border-t border-white/10">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className="group/item flex items-start gap-1.5 hover:text-emerald-200 hover:translate-x-1 transition-all duration-200"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Connecting Arrow on Desktop */}
                    {idx < customerSteps.length - 1 && (
                      <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#072228] border border-emerald-400/45 items-center justify-center text-emerald-300 shadow">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* 3. HYBRID PRICING MODEL & VERIFICATION/SAFETY/REFUNDS */}
            <motion.section
              {...fadeUp(0.1)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-4"
            >
              {/* Left Card: Hybrid Pricing Model */}
              <div className="lg:col-span-7 group relative rounded-3xl border border-emerald-400/30 hover:border-emerald-300/75 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(16,185,129,0.28)] transition-all duration-300 shadow-2xl grid grid-cols-1 sm:grid-cols-12">
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <img
                    src={hybridPricingBg.src}
                    alt="Hybrid Pricing Model background"
                    className="w-full h-full object-cover object-right scale-[1.08] group-hover:scale-[1.11] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#041418]/45" />
                </div>

                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#041418] border border-emerald-400/50 group-hover:border-emerald-300 group-hover:scale-105 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap transition-all duration-300">
                  <IndianRupee className="w-3.5 h-3.5" />
                  Hybrid Pricing Model
                </span>

                <div className="sm:col-span-8 p-7 pt-9 space-y-4 relative z-10">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                    How{' '}
                    <span className="text-emerald-300">Estimates</span> &amp;{' '}
                    <span className="text-emerald-300">Charges</span> Work
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    No hidden costs, no guesswork. Every booking follows a
                    transparent, configurable estimate-first structure:
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-100 pt-1">
                    <li className="group/item flex items-start gap-2.5 hover:translate-x-1.5 hover:text-emerald-200 transition-all duration-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <span>
                        <strong className="text-white">
                          Booking Confirmation Fee (Configurable ₹99 – ₹149):
                        </strong>{' '}
                        Adjusted against the final bill when applicable.
                      </span>
                    </li>
                    <li className="group/item flex items-start gap-2.5 hover:translate-x-1.5 hover:text-emerald-200 transition-all duration-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <span>
                        <strong className="text-white">
                          Separate Labour &amp; Material Split:
                        </strong>{' '}
                        Labour charges and spare parts/material costs are itemized
                        separately for complete clarity.
                      </span>
                    </li>
                    <li className="group/item flex items-start gap-2.5 hover:translate-x-1.5 hover:text-emerald-200 transition-all duration-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <span>
                        <strong className="text-white">
                          Proposed Platform Commission (12% on Eligible Labour):
                        </strong>{' '}
                        Configurable commission applies only on eligible labour
                        charges —{' '}
                        <strong className="text-emerald-300">
                          0% commission on material costs
                        </strong>
                        .
                      </span>
                    </li>
                    <li className="group/item flex items-start gap-2.5 hover:translate-x-1.5 hover:text-emerald-200 transition-all duration-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <span>
                        <strong className="text-white">
                          Mandatory Customer Approval:
                        </strong>{' '}
                        Additional work begins only after you review and approve
                        the digital estimate.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Card: Verification, Safety & Refunds */}
              <div className="lg:col-span-5 group relative rounded-3xl bg-gradient-to-br from-[#092329] via-[#06181d] to-[#041418] border border-emerald-400/30 hover:border-emerald-300/75 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(16,185,129,0.28)] transition-all duration-300 p-7 pt-9 shadow-2xl space-y-4 flex flex-col justify-between">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#041418] border border-emerald-400/50 group-hover:border-emerald-300 group-hover:scale-105 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap transition-all duration-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verification, Safety &amp; Refunds
                </span>

                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-white leading-snug">
                    Provider <span className="text-emerald-300">Vetting</span> &amp;
                    Refund Protection
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Profiles go live only after admin review and approval of
                    submitted details.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 pt-2 pl-4">
                  <div className="group/sub relative pt-5 pb-3.5 pl-7 pr-4 rounded-2xl bg-white/5 border border-emerald-400/25 hover:border-emerald-300/75 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(16,185,129,0.22)] transition-all duration-300">
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-xl bg-[#072228] border border-emerald-400/50 text-emerald-300 group-hover/sub:bg-emerald-400 group-hover/sub:text-slate-950 group-hover/sub:scale-110 flex items-center justify-center shadow-lg transition-all duration-300">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 rounded-full bg-[#041418] border border-emerald-400/45 group-hover/sub:border-emerald-300 text-emerald-300 text-[11px] font-extrabold shadow-md whitespace-nowrap transition-colors">
                      Identity, Address &amp; Qualification Checks
                    </div>
                    <p className="text-[11px] text-slate-300 group-hover/sub:text-slate-100 leading-relaxed transition-colors">
                      Technician identity, local address/professional details,
                      and relevant qualification/document checks are reviewed
                      before admin approval activates the profile.
                    </p>
                  </div>

                  <div className="group/sub relative pt-5 pb-3.5 pl-7 pr-4 rounded-2xl bg-white/5 border border-emerald-400/25 hover:border-emerald-300/75 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(16,185,129,0.22)] transition-all duration-300">
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-xl bg-[#072228] border border-emerald-400/50 text-emerald-300 group-hover/sub:bg-emerald-400 group-hover/sub:text-slate-950 group-hover/sub:scale-110 flex items-center justify-center shadow-lg transition-all duration-300">
                      <CalendarX2 className="w-4 h-4" />
                    </div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 rounded-full bg-[#041418] border border-emerald-400/45 group-hover/sub:border-emerald-300 text-emerald-300 text-[11px] font-extrabold shadow-md whitespace-nowrap transition-colors">
                      Cancellation Rules
                    </div>
                    <p className="text-[11px] text-slate-300 group-hover/sub:text-slate-100 leading-relaxed transition-colors">
                      Cancel scheduled bookings free of charge up to 2 hours
                      before the slot; late cancellations follow transparent
                      platform rules.
                    </p>
                  </div>

                  <div className="group/sub relative pt-5 pb-3.5 pl-7 pr-4 rounded-2xl bg-white/5 border border-emerald-400/25 hover:border-emerald-300/75 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(16,185,129,0.22)] transition-all duration-300">
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-xl bg-[#072228] border border-emerald-400/50 text-emerald-300 group-hover/sub:bg-emerald-400 group-hover/sub:text-slate-950 group-hover/sub:scale-110 flex items-center justify-center shadow-lg transition-all duration-300">
                      <RefreshCcw className="w-4 h-4" />
                    </div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 rounded-full bg-[#041418] border border-emerald-400/45 group-hover/sub:border-emerald-300 text-emerald-300 text-[11px] font-extrabold shadow-md whitespace-nowrap transition-colors">
                      Refund Request Process &amp; Support
                    </div>
                    <p className="text-[11px] text-slate-300 group-hover/sub:text-slate-100 leading-relaxed transition-colors">
                      Submit refund requests directly from{' '}
                      <Link
                        href="/account/refunds"
                        className="text-emerald-300 underline hover:text-emerald-200"
                      >
                        your account
                      </Link>{' '}
                      or reach{' '}
                      <Link
                        href="/support"
                        className="text-emerald-300 underline hover:text-emerald-200 inline-flex items-center gap-0.5"
                      >
                        <Headphones className="w-3 h-3 inline" /> Customer
                        Support
                      </Link>{' '}
                      for quick resolution.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* All 12 Booking Status States Explained (Custom BG + Glow & Lighting Effects) */}
            <div className="relative rounded-3xl border border-emerald-400/40 p-7 pt-10 shadow-[0_20px_60px_rgba(16,185,129,0.22)] space-y-5 mt-4">
              {/* Background Image Layer (Symmetrical Houses Left & Right) */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <img
                  src={twilightVillasBg.src}
                  alt="Twilight Villas Along a Curving Road"
                  className="md:hidden w-full h-full object-cover object-right"
                />
                <img
                  src={twilightVillasBg.src}
                  alt=""
                  aria-hidden="true"
                  className="hidden md:block absolute left-0 top-0 bottom-0 w-1/2 h-full object-cover object-right -scale-x-100"
                />
                <img
                  src={twilightVillasBg.src}
                  alt="Twilight Villas Along a Curving Road"
                  className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 h-full object-cover object-right"
                />
                <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent" />
              </div>

              <h2 className="!mt-0 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 px-5 py-1.5 rounded-full bg-[#041418] border border-emerald-400/60 text-emerald-300 text-xs sm:text-sm font-extrabold shadow-[0_0_24px_rgba(16,185,129,0.45)] whitespace-nowrap">
                All 12 Live Booking Lifecycle States Explained
              </h2>
              <p className="relative z-10 !mt-0 text-xs text-emerald-100/90 text-center">
                Track every step of your service from booking confirmation to final invoice &amp; review.
              </p>
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {BOOKING_LIFECYCLE_STEPS.map((st, idx) => (
                  <div
                    key={st}
                    className="p-3.5 rounded-2xl bg-[#041418]/75 backdrop-blur-md text-white border border-emerald-400/35 hover:border-emerald-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(16,185,129,0.45)] transition-all duration-300 space-y-1"
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
          /* 7. SERVICE PROVIDER JOURNEY (12-STEP WORKFLOW) */
          <motion.section
            {...fadeUp(0.05)}
            className="rounded-3xl bg-gradient-to-br from-[#092329] via-[#06181d] to-[#041418] border border-emerald-400/30 p-7 sm:p-9 shadow-2xl space-y-7"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-300 text-xs font-extrabold">
                  For Independent Technicians &amp; Business Agencies
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  12-Step Service Provider Workflow
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  From onboarding and admin verification to sending itemized
                  estimates and tracking net payouts.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/provider/register"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 text-xs sm:text-sm font-extrabold inline-flex items-center gap-2 shadow-lg transition"
                >
                  <span>Join as a Professional</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/provider/dashboard"
                  className="px-5 py-3 rounded-xl bg-white/10 border border-emerald-400/35 text-white text-xs sm:text-sm font-bold hover:bg-white/15 transition"
                >
                  Provider Portal Demo
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {providerWorkflowSteps.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.step}
                    className="p-5 rounded-2xl bg-white/5 border border-emerald-400/20 hover:border-emerald-300/65 hover:-translate-y-1 transition-all duration-300 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300 text-[10px] font-extrabold">
                        STEP {item.step}
                      </span>
                    </div>
                    <div className="font-extrabold text-white text-sm">
                      {item.title}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* 8. FINAL CTA BANNER */}
        <motion.section
          {...fadeUp(0.1)}
          className="relative rounded-3xl border border-emerald-400/35 bg-gradient-to-r from-[#041418] via-[#092930] to-[#0f1c38] shadow-2xl mt-4"
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Modern Punjab home left"
              className="hidden md:block absolute left-0 top-0 bottom-0 w-1/3 h-full object-cover opacity-55"
            />
            <div className="hidden md:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[#072127]/90 to-[#092930]" />
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Modern Punjab home right"
              className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3 h-full object-cover opacity-55"
            />
            <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-transparent via-[#072127]/90 to-[#092930]" />
          </div>

          <h2 className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-5 py-1.5 rounded-full bg-[#041418] border border-emerald-400/50 text-white text-xs sm:text-sm font-extrabold shadow-lg whitespace-nowrap">
            Ready to Book a{' '}
            <span className="text-emerald-300">Trusted Professional?</span>
          </h2>

          <div className="relative z-10 p-7 pt-10 sm:p-9 sm:pt-11 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5">
              <p className="text-xs sm:text-sm text-slate-200">
                Find verified local electricians and plumbers and book your
                service with confidence.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/book"
                className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm transition inline-flex items-center gap-2 shadow-lg"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Book a Service Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs sm:text-sm transition inline-flex items-center gap-2"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-300" />
                <span>Explore All Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
