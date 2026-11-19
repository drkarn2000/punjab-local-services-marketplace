'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Compass,
  Eye,
  Gem,
  Handshake,
  IndianRupee,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Target Households',
      note: 'Illustrative Goal',
    },
    {
      icon: Wrench,
      value: 'Verified',
      label: 'Pro Network',
      note: 'Demo Roster Active',
    },
    {
      icon: MapPin,
      value: '1 + 2',
      label: 'Launch & Expansion Cities',
      note: 'Mohali Live • CHD & HSP Next',
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Trust & Transparency',
      note: 'Estimate-First Model',
    },
  ];

  const householdTrustPoints = [
    'Verified identity and professional credentials',
    'Transparent estimates before work starts',
    'Customer approval before additional work',
    'Local customer support',
    'Booking tracking and service history',
  ];

  const providerBenefits = [
    'Free registration',
    'No monthly subscription',
    'Additional customer opportunities',
    'Transparent 12% commission on eligible labour charges',
    'No commission on material costs',
    'Flexible booking acceptance',
    'Transparent earnings and payout records',
  ];

  const launchMarkets = [
    {
      name: 'Mohali',
      slug: 'mohali',
      badge: 'Initial Launch City',
      badgeStyle: 'bg-emerald-400 text-slate-950',
      description:
        'Our primary launch hub across Phases 1–11, Sectors 66–82, Kharar, and Zirakpur for verified doorstep repairs.',
      image:
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'Chandigarh',
      slug: 'chandigarh',
      badge: 'Expansion Market',
      badgeStyle: 'bg-[#072026] text-emerald-300 border border-emerald-400/50',
      description:
        'Planned expansion across Tricity Sectors 1–63 and Manimajra, onboarding vetted electricians and plumbers.',
      image:
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80',
    },
    {
      name: 'Hoshiarpur',
      slug: 'hoshiarpur',
      badge: 'Expansion Market',
      badgeStyle: 'bg-[#072026] text-emerald-300 border border-emerald-400/50',
      description:
        'Upcoming expansion for Model Town, Civil Lines, and surrounding localities with verified local technicians.',
      image:
        'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80',
    },
  ];

  const trustSteps = [
    {
      step: '01',
      title: 'Onboard Local Professionals',
      desc: 'Skilled independent technicians and local agencies register their trade skills and service areas.',
      icon: UserPlus,
    },
    {
      step: '02',
      title: 'Verify & Approve',
      desc: 'Identity documents, address proof, and skill credentials are reviewed before profile activation.',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: 'Go Live in Your City',
      desc: 'Approved experts appear in local search with transparent visiting charges and slot availability.',
      icon: Rocket,
    },
    {
      step: '04',
      title: 'Grow Together',
      desc: 'Consistent service quality, upfront estimates, and verified reviews build lasting local trust.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* =========================================================
          SECTION 1: PREMIUM HERO SECTION
         ========================================================= */}
      <section className="relative bg-gradient-to-br from-[#041418] via-[#092930] to-[#0f1c38] text-white pt-12 pb-24 lg:pt-16 lg:pb-28 overflow-hidden border-b border-emerald-400/20">
        {/* Ambient Glowing Shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[420px] h-[420px] rounded-full bg-teal-400/15 blur-3xl pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy (7 cols) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/15 border border-emerald-300/35 text-emerald-300 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                About Punjab Services
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                About{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-green-400 bg-clip-text text-transparent">
                  Punjab Services
                </span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                A trusted hyperlocal marketplace connecting households across Punjab with verified local electricians, plumbers, carpenters, and device repair specialists — built around transparent estimates and reliable doorstep service.
              </p>

              {/* 3 Trust Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                {[
                  { icon: ShieldCheck, label: 'Verified Professionals' },
                  { icon: Zap, label: 'Quick & Reliable Service' },
                  { icon: IndianRupee, label: 'Transparent & Fair Pricing' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="group flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 border border-emerald-200 shadow-lg hover:bg-none hover:bg-white/10 hover:backdrop-blur-md hover:border-emerald-300/60 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#041418] text-emerald-300 group-hover:bg-emerald-400/20 group-hover:text-emerald-300 flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-950 group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Visual Showcase (5 cols) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              {/* Layered Decorative Green Shapes */}
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-emerald-500/30 via-teal-400/20 to-transparent blur-xl pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-300/35 bg-gradient-to-br from-[#092930] to-[#041418] p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="relative rounded-2xl overflow-hidden h-64 sm:h-72">
                    <img
                      src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=80"
                      alt="Verified Indian Electrician"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041418]/90 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-emerald-400 text-slate-950 text-[11px] font-extrabold">
                      Electrician Experts
                    </span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden h-64 sm:h-72">
                    <img
                      src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80"
                      alt="Verified Indian Plumber & Technician"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041418]/90 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-teal-300 text-slate-950 text-[11px] font-extrabold">
                      Plumbing &amp; Repairs
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Trust Badge (Centered on Top Border) */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-md text-slate-950 px-4 py-2.5 rounded-2xl shadow-2xl border border-emerald-200 flex items-center gap-2.5 w-max">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-950">
                    Trusted Local Experts
                  </div>
                  <div className="text-[11px] text-slate-600 font-semibold">
                    KYC &amp; Skill Screened Prototype
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: HORIZONTAL PLATFORM STATISTICS PANEL
         ========================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-10 -mt-12 relative z-20">
        <motion.div
          {...fadeUp(0.05)}
          className="rounded-3xl bg-gradient-to-r from-[#061c22]/95 via-[#0b2f38]/95 to-[#102442]/95 backdrop-blur-xl border border-emerald-400/35 px-5 sm:px-7 pt-8 pb-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5"
        >
          {stats.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.label}
                className="relative group flex items-center gap-4 px-4 pt-6 pb-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 border border-emerald-200 shadow-lg hover:bg-none hover:bg-[#092930]/90 hover:border-emerald-300/60 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-[#041418] border border-emerald-400/50 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider shadow-md whitespace-nowrap">
                  {st.label}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#041418] border border-emerald-300/30 text-emerald-300 group-hover:bg-emerald-400/20 group-hover:text-emerald-300 flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-950 group-hover:text-white transition-colors">
                    {st.value}
                  </div>
                  <div className="text-[10px] text-slate-800 group-hover:text-emerald-200 font-bold uppercase tracking-wider mt-0.5 transition-colors">
                    {st.note}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* =========================================================
          SECTION 3: MISSION, VISION & CORE VALUES (3 CARDS)
         ========================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {/* Card 1: Our Mission */}
          <motion.div
            {...fadeUp(0.05)}
            className="relative group rounded-3xl bg-gradient-to-br from-emerald-100 via-teal-50 to-white text-slate-900 p-7 pt-10 border border-emerald-200 shadow-xl hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(16,185,129,0.28)] transition-all duration-300"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-2xl bg-white shadow-md whitespace-nowrap">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider">
                Our Mission
              </h2>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-slate-800">
              {[
                'Effortless doorstep home & device repairs',
                'Transparent upfront visiting charges',
                'Itemized digital estimates before work',
                'Verified local skilled professionals',
                'Reliable service across Punjab households',
              ].map((pt) => (
                <li
                  key={pt}
                  className="flex items-center gap-2 hover:translate-x-1.5 hover:text-emerald-700 transition-all duration-200 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 2: Our Vision */}
          <motion.div
            {...fadeUp(0.12)}
            className="relative group rounded-3xl bg-gradient-to-br from-indigo-100 via-purple-50 to-white text-slate-900 p-7 pt-10 border border-indigo-200 shadow-xl hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(99,102,241,0.25)] transition-all duration-300"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-2xl bg-white shadow-md whitespace-nowrap">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                <Eye className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider">
                Our Vision
              </h2>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-slate-800">
              {[
                'Trusted hyperlocal services marketplace',
                'Empowering independent technicians',
                'Supporting local service businesses',
                'Fair earnings with zero monthly fees',
                'Consistent quality in every launch city',
              ].map((pt) => (
                <li
                  key={pt}
                  className="flex items-center gap-2 hover:translate-x-1.5 hover:text-indigo-700 transition-all duration-200 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 3: Our Core Values */}
          <motion.div
            {...fadeUp(0.18)}
            className="relative group rounded-3xl bg-gradient-to-br from-cyan-100 via-sky-50 to-white text-slate-900 p-7 pt-10 border border-cyan-200 shadow-xl hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(6,182,212,0.25)] transition-all duration-300"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-2xl bg-white shadow-md whitespace-nowrap">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                <Gem className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider">
                Our Core Values
              </h2>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-slate-800">
              {[
                'Trust & Safety First',
                'Verified Professionals',
                'Transparent & Fair Pricing',
                'Customer-Centric Service',
                'Support for Local Talent',
              ].map((val) => (
                <li
                  key={val}
                  className="flex items-center gap-2 hover:translate-x-1.5 hover:text-cyan-700 transition-all duration-200 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>{val}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: WHY HOUSEHOLDS TRUST PUNJAB SERVICES (2-COL)
         ========================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-10 py-10">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#061c22] via-[#092930] to-[#0f1c38] text-white border border-emerald-400/25 p-6 sm:p-10 lg:p-12 shadow-2xl">
          <span className="absolute -top-3.5 left-6 sm:left-10 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#061c22] border border-emerald-400/50 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
            Our Commitment
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Trust Points (6 cols) */}
            <motion.div {...fadeUp(0.05)} className="lg:col-span-6 space-y-5">

              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Why Households Trust{' '}
                <span className="text-emerald-300">Punjab Services</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                We combine dependable local craftsmanship with digital clarity — so every household knows who is arriving, what the inspection covers, and the exact estimate before repairs begin.
              </p>

              <ul className="space-y-3 pt-1">
                {householdTrustPoints.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-300/40 transition"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-100">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right Residential Showcase Image (6 cols) */}
            <motion.div {...fadeUp(0.15)} className="lg:col-span-6 relative mb-6 lg:mb-4">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-500/25 to-teal-400/15 blur-2xl pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-400/35 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Punjab Residential Home"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041418]/85 via-transparent to-transparent" />
              </div>

              {/* Floating Trust Badge (Centered Half Over Bottom Border, Half Below) */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-20 rounded-2xl bg-[#041418]/95 backdrop-blur-xl border border-emerald-400/50 p-4 shadow-[0_12px_32px_rgba(16,185,129,0.35)] flex items-center gap-3 w-[90%] sm:w-max max-w-sm">
                <div className="w-11 h-11 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-extrabold text-white">
                    A Reliable Service Partner for Your Home
                  </div>
                  <div className="text-[11px] text-emerald-300 font-semibold">
                    Estimate Approval Before Work Starts
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5: PROVIDER EMPOWERMENT
         ========================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-10 py-10">
        <motion.div
          {...fadeUp(0.05)}
          className="relative rounded-3xl bg-gradient-to-r from-[#072228] via-[#0b333d] to-[#0f2544] text-white border border-emerald-400/30 p-6 sm:p-10 shadow-2xl"
        >
          <span className="absolute -top-3.5 left-6 sm:left-10 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#072228] border border-emerald-400/50 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
            <Handshake className="w-3.5 h-3.5" />
            Provider Empowerment
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                Built for Independent{' '}
                <span className="text-emerald-300">Electricians &amp; Plumbers</span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We empower skilled technicians and local agencies with fair economics, zero monthly fees, and complete control over their schedule and payouts.
              </p>
              <div className="pt-2">
                <Link
                  href="/provider/register"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold text-sm shadow-[0_0_24px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 transition-all"
                >
                  <span>Join as a Professional</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {providerBenefits.map((benefit, idx) => (
                <div
                  key={benefit}
                  className={`flex items-center gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-emerald-300/60 transition ${
                    idx === providerBenefits.length - 1
                      ? 'sm:col-span-2 sm:w-fit sm:mx-auto sm:px-6'
                      : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================
          SECTION 6: INITIAL LAUNCH MARKETS
         ========================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-10 py-10 space-y-6">
        <div className="flex flex-col items-center text-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-extrabold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            Our Initial Launch Markets
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Starting Strong in Punjab
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            Launching first in Mohali with planned expansion into Chandigarh and Hoshiarpur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 pt-3 pb-4">
          {launchMarkets.map((city, idx) => (
            <motion.div
              key={city.slug}
              {...fadeUp(idx * 0.08)}
              className="group relative rounded-3xl border border-emerald-400/30 bg-[#072026] shadow-2xl hover:border-emerald-300/70 hover:-translate-y-1.5 transition-all duration-300 min-h-[290px] flex flex-col items-center justify-center"
            >
              {/* Top Border Centered Badge */}
              <span
                className={`absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full text-[11px] font-extrabold shadow-lg whitespace-nowrap ${city.badgeStyle}`}
              >
                {city.badge}
              </span>

              {/* Full-Bleed Background Image + Overlay */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover opacity-55 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#041418]/75 via-[#072026]/80 to-[#041418]/90" />
              </div>

              {/* Vertically & Horizontally Centered Content */}
              <div className="relative z-10 p-8 flex flex-col items-center justify-center text-center space-y-2.5 max-w-sm">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <h3 className="text-2xl font-extrabold text-white">
                    {city.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {city.description}
                </p>
              </div>

              {/* Bottom Border Centered CTA Button */}
              <Link
                href={`/${city.slug}`}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#072026] hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 text-emerald-300 hover:text-slate-950 font-extrabold text-xs border border-emerald-400/50 shadow-lg transition-all whitespace-nowrap"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION 7: HOW WE BUILD TRUST (4-STEP HORIZONTAL PROCESS)
         ========================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-10 py-10">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#061c22] via-[#092930] to-[#0f1c38] text-white border border-emerald-400/25 p-6 sm:p-10 shadow-2xl space-y-8">
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#061c22] border border-emerald-400/50 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap">
            Our Approach • How We Build Trust
          </span>
          <div className="flex flex-col items-center text-center pt-2">
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              A transparent, step-by-step onboarding and verification flow that protects both households and local professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-5 pt-3 relative">
            {trustSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  {...fadeUp(idx * 0.08)}
                  className="relative group rounded-2xl bg-white/5 border border-white/15 hover:border-emerald-300/60 hover:bg-white/10 p-5 pt-8 transition-all duration-300 space-y-3"
                >
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-full bg-[#061c22] border border-emerald-400/50 text-emerald-300 text-[11px] font-extrabold shadow-lg whitespace-nowrap">
                    {step.title}
                  </span>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 border border-emerald-300/30 text-emerald-300 group-hover:bg-emerald-400 group-hover:text-slate-950 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold text-emerald-300/70">
                      STEP {step.step}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 8: PREMIUM FINAL CTA
         ========================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-10 pt-6 pb-16">
        <motion.div
          {...fadeUp(0.05)}
          className="relative rounded-3xl bg-gradient-to-r from-[#072b28] via-[#0c3f3b] to-[#113154] border border-emerald-300/40 p-8 sm:p-10 shadow-[0_20px_50px_rgba(16,185,129,0.25)] flex flex-col items-center text-center justify-center gap-5"
        >
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#061c22] border border-emerald-400/50 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap">
            Be a Part of Our Local Services Network
          </span>
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl" />
          </div>
          <div className="relative z-10 max-w-xl pt-2">
            <p className="text-xs sm:text-sm text-emerald-100">
              Book a service or join as a professional and grow with Punjab Services.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/book"
              className="px-6 py-3.5 rounded-xl bg-amber-300 hover:bg-amber-200 text-slate-950 font-extrabold text-sm inline-flex items-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span>Book a Service</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/provider/register"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-extrabold text-sm inline-flex items-center gap-2 backdrop-blur-sm hover:-translate-y-0.5 transition-all"
            >
              <span>Join as a Professional</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
