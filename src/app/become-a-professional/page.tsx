'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileCheck2,
  FileText,
  IndianRupee,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Wallet,
  Wrench,
} from 'lucide-react';
import heroBg from '../how-it-works/images/For Professionals Hero BG.png';
import electricianPanelBanner from './Images/Electrician Repairing Electrical Panel.png';
import servicePartnerBanner from './Images/Modern Office Facade with Lavender Waves.png';
import eligibilityBg from './Images/Verified Technicians with Shield and Checklist.png';
import openHandSunsetBg from '../about/images/Chandigarh Open Hand Sunset-1.png';
import modernServiceVanBg from './Images/Modern Service Van at Sunset.png';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function BecomeProfessionalPage() {
  const onboardingSteps = [
    {
      step: 'Step 1',
      title: 'Complete Profile',
      desc: 'Enter personal or business information, experience, service categories, skills and service areas.',
      icon: FileText,
      accent: 'from-emerald-400 to-teal-400',
    },
    {
      step: 'Step 2',
      title: 'Submit Documents',
      desc: 'Provide identity, address and relevant professional documents for verification.',
      icon: ClipboardCheck,
      accent: 'from-cyan-400 to-emerald-400',
    },
    {
      step: 'Step 3',
      title: 'Admin Verification',
      desc: 'The verification team reviews the submitted information and approves or requests additional details.',
      icon: ShieldCheck,
      accent: 'from-emerald-400 to-teal-500',
    },
    {
      step: 'Step 4',
      title: 'Start Receiving Bookings',
      desc: 'Configure availability, accept booking requests, submit estimates and manage earnings.',
      icon: Briefcase,
      accent: 'from-teal-400 to-cyan-400',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16 overflow-x-hidden">
      {/* 1. HERO SECTION – PREMIUM PROFESSIONAL LANDING */}
      <section className="relative overflow-hidden border-b border-emerald-400/25 text-white">
        {/* Supplied 3-Technician Hero Background */}
        <img
          src={heroBg.src}
          alt="Verified local technicians at Punjab Services"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Left-dark scrim for crisp text readability while preserving technicians on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041418]/95 via-[#041418]/75 to-[#041418]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041418] via-transparent to-transparent pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-8 pt-10 pb-8 lg:pt-12 lg:pb-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content (7 cols) */}
            <motion.div {...fadeUp(0)} className="lg:col-span-7 space-y-5 lg:pb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Partner with Punjab Services</span>
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.12] text-white">
                Grow Your Income as a{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                  Verified Local Professional
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed">
                Join our growing network of local electricians and plumbers. Set
                your own visiting charges, choose your service areas, accept
                bookings and grow your independent business.
              </p>

              {/* 3 Trust Highlights */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-bold text-emerald-100">
                <div className="group inline-flex items-center gap-2 hover:text-emerald-300 hover:translate-x-0.5 transition-all cursor-default">
                  <span className="w-7 h-7 rounded-full bg-emerald-400/20 border border-emerald-400/45 flex items-center justify-center text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-all">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <span>Free Provider Registration</span>
                </div>
                <div className="group inline-flex items-center gap-2 hover:text-emerald-300 hover:translate-x-0.5 transition-all cursor-default">
                  <span className="w-7 h-7 rounded-full bg-emerald-400/20 border border-emerald-400/45 flex items-center justify-center text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-all">
                    <Clock className="w-3.5 h-3.5" />
                  </span>
                  <span>Flexible Working Hours</span>
                </div>
                <div className="group inline-flex items-center gap-2 hover:text-emerald-300 hover:translate-x-0.5 transition-all cursor-default">
                  <span className="w-7 h-7 rounded-full bg-emerald-400/20 border border-emerald-400/45 flex items-center justify-center text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-all">
                    <IndianRupee className="w-3.5 h-3.5" />
                  </span>
                  <span>Transparent Commission &amp; Payouts</span>
                </div>
              </div>

              {/* Dual Registration CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/provider/register?type=individual"
                  className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition inline-flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Register as Individual Professional</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/provider/register?type=business"
                  className="px-6 py-3.5 rounded-xl bg-white/95 hover:bg-white text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition inline-flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  <span>Register as Business / Agency</span>
                </Link>
              </div>
            </motion.div>

            {/* Lower-Right Glassmorphism Info Card (5 cols) */}
            <motion.div {...fadeUp(0.1)} className="lg:col-span-5 lg:mt-44">
              <div className="bg-[#041418]/85 backdrop-blur-xl border border-emerald-400/35 hover:border-emerald-300/80 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(16,185,129,0.28)] transition-all duration-300 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.55)] space-y-3">
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  Why Skilled{' '}
                  <span className="text-emerald-300">
                    Pros Prefer Punjab Services
                  </span>
                </h2>

                <ul className="space-y-2 text-[11px] sm:text-xs text-slate-200">
                  <li className="group/item flex items-start gap-2.5 hover:translate-x-1.5 hover:text-emerald-200 transition-all duration-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span>
                      <strong className="text-white">Free Registration</strong>{' '}
                      – No joining fee or monthly subscription.
                    </span>
                  </li>
                  <li className="group/item flex items-start gap-2.5 hover:translate-x-1.5 hover:text-emerald-200 transition-all duration-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span>
                      <strong className="text-white">
                        Flexible Availability
                      </strong>{' '}
                      – Choose working days, hours and service radius.
                    </span>
                  </li>
                  <li className="group/item flex items-start gap-2.5 hover:translate-x-1.5 hover:text-emerald-200 transition-all duration-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span>
                      <strong className="text-white">
                        Digital Estimate Builder
                      </strong>{' '}
                      – Submit labour and material estimates.
                    </span>
                  </li>
                  <li className="group/item flex items-start gap-2.5 hover:translate-x-1.5 hover:text-emerald-200 transition-all duration-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span>
                      <strong className="text-white">
                        Transparent Commission
                      </strong>{' '}
                      – Proposed 12% commission on eligible labour charges.
                    </span>
                  </li>
                  <li className="group/item flex items-start gap-2.5 hover:translate-x-1.5 hover:text-emerald-200 transition-all duration-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span>
                      <strong className="text-white">Provider Dashboard</strong>{' '}
                      – Manage bookings, earnings and customer reviews.
                    </span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2 text-xs">
                  <span className="text-slate-300">Already registered?</span>
                  <Link
                    href="/provider/dashboard"
                    className="font-extrabold text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1 transition"
                  >
                    <span>Open Provider Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAIN BODY */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-12 space-y-14">
        {/* 2. PROFESSIONAL REGISTRATION OPTIONS */}
        <motion.section
          {...fadeUp(0.05)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 pb-4"
        >
          {/* Card 1: Independent Professional (Individual) */}
          <div className="group relative rounded-3xl border border-emerald-400/35 hover:border-emerald-300/75 shadow-2xl grid grid-cols-1 sm:grid-cols-12 transition-all duration-300 hover:-translate-y-1">
            {/* Full Card Custom Electrician Panel Background */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <img
                src={electricianPanelBanner.src}
                alt="Electrician Repairing Electrical Panel"
                className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Icon + Title Straddling Top Border */}
            <div className="!mt-0 absolute top-0 -translate-y-1/2 left-5 right-5 sm:right-auto z-20 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-[#041418] border border-emerald-400/50 shadow-lg w-fit max-w-full">
              <div className="w-7 h-7 rounded-xl bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <h2 className="text-xs sm:text-sm font-extrabold text-white truncate">
                1. Independent Professional (Individual)
              </h2>
            </div>

            <div className="sm:col-span-7 p-7 pt-9 pb-10 space-y-4 relative z-10 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ideal for self-employed electricians and plumbers who want to
                  receive additional customer bookings.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-200 pt-1">
                  {[
                    'Individual professional profile',
                    'Skills and service selection',
                    'Service area configuration',
                    'Visiting charge configuration',
                    'Availability management',
                    'Customer ratings and reviews',
                    'Direct booking requests',
                  ].map((item) => (
                    <li
                      key={item}
                      className="group/item flex items-center gap-2 hover:translate-x-1.5 hover:text-emerald-200 transition-all duration-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover/item:scale-110 transition-transform" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href="/provider/register?type=individual"
              className="!mt-0 absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 z-20 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 text-xs font-extrabold shadow-xl transition whitespace-nowrap"
            >
              <span>Start Individual Registration</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Service Agency / Business Partner */}
          <div className="group relative rounded-3xl border border-indigo-400/50 hover:border-indigo-400 shadow-2xl grid grid-cols-1 sm:grid-cols-12 transition-all duration-300 hover:-translate-y-1">
            {/* Full Card Custom Storefront Banner Background */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <img
                src={servicePartnerBanner.src}
                alt="Service Agency Storefront Banner"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Icon + Title Straddling Top Border */}
            <div className="!mt-0 absolute top-0 -translate-y-1/2 left-5 right-5 sm:right-auto z-20 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-[#041418] border border-indigo-400/60 shadow-lg w-fit max-w-full">
              <div className="w-7 h-7 rounded-xl bg-indigo-400/20 border border-indigo-400/40 text-indigo-300 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="text-xs sm:text-sm font-extrabold text-white truncate">
                2. Service Agency / Business Partner
              </h2>
            </div>

            <div className="sm:col-span-7 p-7 pt-9 pb-10 space-y-4 relative z-10 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  Ideal for repair shops, service contractors and businesses
                  managing multiple technicians.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-900 font-semibold pt-1">
                  {[
                    'Business profile',
                    'Multiple technician management',
                    'Team member assignment',
                    'Booking management',
                    'Consolidated earnings',
                    'Commission and payout records',
                  ].map((item) => (
                    <li
                      key={item}
                      className="group/item flex items-center gap-2 hover:translate-x-1.5 hover:text-indigo-700 transition-all duration-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 group-hover/item:scale-110 transition-transform" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href="/provider/register?type=business"
              className="!mt-0 absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 z-20 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-extrabold shadow-xl transition whitespace-nowrap"
            >
              <span>Start Business Registration</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.section>

        {/* 3. PROVIDER ELIGIBILITY & REQUIREMENTS */}
        <motion.section
          {...fadeUp(0.05)}
          className="relative rounded-3xl border border-emerald-400/35 p-7 pt-10 sm:p-9 sm:pt-11 shadow-2xl space-y-8 mt-4"
        >
          {/* Custom Eligibility & Verification Background Image (No Dark Scrim) */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <img
              src={eligibilityBg.src}
              alt="Verified Technicians with Shield and Checklist"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <span className="!mt-0 absolute top-0 -translate-y-1/2 left-6 sm:left-8 z-20 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#041418] border border-emerald-400/50 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap">
            <UserCheck className="w-3.5 h-3.5" />
            Eligibility &amp; Verification
          </span>

          <div className="!mt-0 lg:absolute lg:top-0 lg:-translate-y-1/2 lg:right-8 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041418] border border-emerald-400/50 text-[11px] text-emerald-200 font-semibold shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span>
              Initial Launch: Mohali (Electrician &amp; Plumber — 5 pros each;
              additional cities planned later)
            </span>
          </div>

          <h2 className="relative z-10 text-2xl sm:text-3xl font-extrabold text-white !mt-0">
            Who Can Join Punjab Services?
          </h2>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {/* Requirements + Admin Approval Notice */}
            <div className="group/box relative rounded-2xl bg-white/5 border border-emerald-400/25 hover:border-emerald-300/70 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(16,185,129,0.2)] transition-all duration-300 p-6 pt-8 space-y-4">
              <h3 className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-[#041418] border border-emerald-400/50 group-hover/box:border-emerald-300 text-xs font-extrabold text-emerald-300 shadow-md whitespace-nowrap transition-colors">
                Onboarding Requirements
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
                {[
                  'Valid contact details',
                  'Identity verification',
                  'Address verification',
                  'Relevant experience and skills',
                  'Supporting professional documents (where applicable)',
                  'Agreement to platform policies',
                ].map((req) => (
                  <li
                    key={req}
                    className="group/item flex items-start gap-2 hover:translate-x-1 hover:text-emerald-200 transition-all duration-200"
                  >
                    <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
              <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-300/35 hover:border-amber-300/80 hover:bg-amber-400/15 text-xs text-amber-200 leading-relaxed transition-all duration-200">
                <strong>Important:</strong> Submitting registration does not
                automatically activate a provider profile. Admin verification and
                approval are required before your profile goes live to
                customers.
              </div>
            </div>

            {/* Who Can Join */}
            <div className="group/box relative rounded-2xl bg-white/5 border border-emerald-400/25 hover:border-emerald-300/70 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(16,185,129,0.2)] transition-all duration-300 p-6 pt-8 space-y-3">
              <h3 className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-[#041418] border border-emerald-400/50 group-hover/box:border-emerald-300 text-xs font-extrabold text-emerald-300 shadow-md whitespace-nowrap transition-colors">
                Eligible Professionals &amp; Partners
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                {[
                  'Independent electricians',
                  'Independent plumbers',
                  'Experienced service professionals',
                  'Registered repair shops and agencies',
                  'Businesses with multiple technicians',
                ].map((el) => (
                  <li
                    key={el}
                    className="group/item flex items-center gap-2.5 hover:translate-x-1.5 hover:text-emerald-200 transition-all duration-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 group-hover/item:scale-110 transition-transform" />
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* 4. FOUR-STEP PROVIDER ONBOARDING */}
        <motion.section {...fadeUp(0.05)} className="space-y-7">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#041418] border border-emerald-400/50 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider shadow">
              <Sparkles className="w-3.5 h-3.5" />
              Onboarding Timeline
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              4-Step{' '}
              <span className="text-emerald-600">Provider Onboarding</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Simple, transparent verification so trusted local technicians can
              start receiving Mohali bookings.
            </p>
          </div>

          <div className="relative pt-6">
            {/* Horizontal connecting line on desktop */}
            <div className="hidden lg:block absolute top-6 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-emerald-400/30 via-teal-300/60 to-emerald-400/30 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-5 relative z-10">
              {onboardingSteps.map((s) => {
                const IconComp = s.icon;
                return (
                  <div
                    key={s.step}
                    className="group relative rounded-3xl bg-gradient-to-b from-[#0a2328] via-[#071a1f] to-[#051418] border border-emerald-400/25 hover:border-emerald-300/75 p-6 pt-10 text-center flex flex-col items-center gap-3 shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div
                      className={`absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 w-14 h-14 rounded-full bg-gradient-to-br ${s.accent} text-slate-950 flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.45)] group-hover:scale-110 transition-transform`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-0.5 rounded-full bg-emerald-400/15 border border-emerald-400/40 text-emerald-300 text-[11px] font-extrabold">
                      {s.step}
                    </span>
                    <h3 className="text-base font-extrabold text-white">
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* 5. HOW PROVIDERS EARN (PROPOSED MODEL + ILLUSTRATIVE CALCULATION) */}
        <motion.section
          {...fadeUp(0.05)}
          className="relative rounded-3xl border border-emerald-400/35 p-7 pt-10 sm:p-9 sm:pt-11 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4 text-white"
        >
          {/* Chandigarh Open Hand Sunset Background Image */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <img
              src={openHandSunsetBg.src}
              alt="Chandigarh Open Hand Sunset"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <span className="!mt-0 absolute top-0 -translate-y-1/2 left-6 sm:left-8 z-20 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#041418] border border-emerald-400/50 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap">
            <IndianRupee className="w-3.5 h-3.5" />
            Proposed Earnings &amp; Commission Model
          </span>

          <div className="lg:col-span-7 space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              How Providers <span className="text-emerald-300">Earn</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              {[
                'Free registration with no monthly subscription fees.',
                'Proposed 12% platform commission applies only on eligible labour/service charges.',
                'No platform commission on material or spare parts costs.',
                'Provider receives the remaining eligible amount after platform commission.',
                'Both online payments and direct cash/UPI payments are supported.',
                'Cash/direct UPI commission settlements are recorded transparently in the provider ledger.',
              ].map((pt) => (
                <li
                  key={pt}
                  className="group/item flex items-start gap-2.5 hover:translate-x-1.5 hover:text-emerald-200 transition-all duration-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Illustrative Calculation Card */}
          <div className="lg:col-span-5 relative z-10">
            <div className="group/calc relative rounded-2xl bg-[#041418]/90 border border-emerald-400/40 hover:border-emerald-300/80 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,185,129,0.28)] transition-all duration-300 p-6 pt-8 shadow-xl space-y-4">
              <span className="!mt-0 absolute top-0 -translate-y-1/2 left-5 z-20 px-3.5 py-1 rounded-full bg-[#041418] border border-emerald-400/50 text-xs font-extrabold text-emerald-300 uppercase tracking-wider shadow-md whitespace-nowrap">
                Illustrative Calculation
              </span>
              <span className="!mt-0 absolute top-0 -translate-y-1/2 right-5 z-20 px-2.5 py-0.5 rounded-full bg-[#072228] border border-white/20 text-slate-200 text-[10px] font-bold shadow-md whitespace-nowrap">
                Example Only
              </span>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1.5 px-2 -mx-2 rounded-lg border-b border-white/10 hover:bg-white/5 hover:translate-x-1 transition-all duration-200">
                  <span className="text-slate-300">Labour Charges</span>
                  <span className="font-bold text-white">₹1,000</span>
                </div>
                <div className="flex items-center justify-between py-1.5 px-2 -mx-2 rounded-lg border-b border-white/10 hover:bg-white/5 hover:translate-x-1 transition-all duration-200">
                  <span className="text-slate-300">
                    Material Cost (0% commission)
                  </span>
                  <span className="font-bold text-white">₹500</span>
                </div>
                <div className="flex items-center justify-between py-1.5 px-2 -mx-2 rounded-lg border-b border-white/10 hover:bg-white/5 hover:translate-x-1 transition-all duration-200">
                  <span className="text-slate-300">
                    Platform Commission (12% of labour)
                  </span>
                  <span className="font-bold text-amber-300">- ₹120</span>
                </div>
                <div className="flex items-center justify-between pt-2 px-2 -mx-2 rounded-lg hover:bg-emerald-400/10 transition-all duration-200">
                  <span className="font-extrabold text-emerald-300">
                    Provider Net Amount
                  </span>
                  <span className="text-xl font-extrabold text-emerald-300">
                    ₹1,380
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                * Illustrative example only. Actual earnings depend on accepted
                bookings and approved estimates; monthly income is not
                guaranteed.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 6. PROVIDER DASHBOARD PREVIEW (DEMO) */}
        <motion.section
          {...fadeUp(0.05)}
          className="relative rounded-3xl border border-emerald-400/30 p-7 pt-10 sm:p-9 sm:pt-11 shadow-2xl space-y-6 mt-4"
        >
          {/* Modern Service Van at Sunset Background Image */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <img
              src={modernServiceVanBg.src}
              alt="Modern Service Van at Sunset"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <span className="!mt-0 absolute top-0 -translate-y-1/2 left-6 sm:left-8 z-20 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#041418] border border-emerald-400/50 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Illustrative Portal Preview (Demo Data)
          </span>

          <Link
            href="/provider/dashboard"
            className="!mt-0 lg:absolute lg:top-0 lg:-translate-y-1/2 lg:right-8 z-20 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 text-xs font-extrabold inline-flex items-center gap-2 shadow-lg transition w-fit"
          >
            <span>Explore Provider Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <h2 className="relative z-10 text-2xl sm:text-3xl font-extrabold text-white text-center !mt-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]">
            Provider Dashboard Preview
          </h2>

          {/* 6 KPI Stat Cards */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4">
            {[
              { label: 'Total Bookings', value: '24', accent: 'text-white' },
              {
                label: 'Pending Requests',
                value: '3',
                accent: 'text-amber-300',
              },
              {
                label: 'Completed Jobs',
                value: '19',
                accent: 'text-emerald-300',
              },
              {
                label: 'Gross Earnings',
                value: '₹22,400',
                accent: 'text-white',
              },
              {
                label: 'Platform Commission',
                value: '₹1,848',
                accent: 'text-amber-300',
              },
              {
                label: 'Net Earnings',
                value: '₹20,552',
                accent: 'text-emerald-300',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative px-3 pt-6 pb-4 rounded-2xl bg-[#041418]/85 border border-emerald-400/25 hover:border-emerald-300/75 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(16,185,129,0.25)] transition-all duration-300 flex items-center justify-center text-center"
              >
                <div
                  className={`!mt-0 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 px-3.5 py-0.5 rounded-full bg-[#041418] border border-emerald-400/55 shadow-lg text-base font-extrabold whitespace-nowrap ${stat.accent}`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-slate-200 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Availability Calendar + Recent Booking Requests */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-3">
            <div className="lg:col-span-5 relative rounded-2xl bg-[#041418]/85 border border-emerald-400/25 hover:border-emerald-300/65 transition-all duration-300 p-5 pt-7 space-y-3">
              <div className="absolute top-0 -translate-y-1/2 left-5 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#041418] border border-emerald-400/50 text-[10px] font-extrabold text-emerald-300 uppercase tracking-wider shadow-md whitespace-nowrap">
                <Calendar className="w-3.5 h-3.5" />
                <span>Availability Calendar (Demo)</span>
              </div>
              <div className="flex items-center justify-end">
                <span className="text-[11px] text-slate-300">Mohali Zone</span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-center text-[11px]">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                  (day, idx) => (
                    <div
                      key={day}
                      className={`py-2 rounded-xl font-bold border transition-all duration-200 cursor-pointer hover:-translate-y-1 ${
                        idx === 6
                          ? 'bg-white/5 border-white/10 text-slate-500 hover:border-slate-400/50 hover:text-slate-300'
                          : 'bg-emerald-400/15 border-emerald-400/35 text-emerald-200 hover:bg-emerald-400 hover:text-slate-950 hover:border-emerald-300'
                      }`}
                    >
                      <div>{day}</div>
                      <div className="text-[9px] mt-0.5">
                        {idx === 6 ? 'Off' : '9a-7p'}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="lg:col-span-7 relative rounded-2xl bg-[#041418]/85 border border-emerald-400/25 hover:border-emerald-300/65 transition-all duration-300 p-5 pt-8 space-y-3">
              <div className="absolute top-0 -translate-y-1/2 left-5 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#041418] border border-emerald-400/50 text-[10px] font-extrabold text-emerald-300 uppercase tracking-wider shadow-md whitespace-nowrap">
                <Wallet className="w-3.5 h-3.5" />
                <span>Recent Booking Requests (Demo)</span>
              </div>
              <span className="!mt-0 absolute top-0 -translate-y-1/2 right-5 z-20 px-2.5 py-0.5 rounded-full bg-[#072228] border border-white/20 text-[10px] font-bold text-slate-200 shadow-md whitespace-nowrap">
                Illustrative Preview
              </span>
              <div className="space-y-2.5 text-xs">
                {[
                  {
                    id: 'PB-DEMO-104',
                    service: 'MCB & Switchboard Inspection (Electrician)',
                    area: 'Phase 7, Mohali',
                    status: 'Pending Request',
                  },
                  {
                    id: 'PB-DEMO-103',
                    service: 'Kitchen Pipe Leakage Fix (Plumber)',
                    area: 'Sector 68, Mohali',
                    status: 'Estimate Approved',
                  },
                ].map((req) => (
                  <div
                    key={req.id}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/55 hover:bg-white/10 hover:translate-x-1 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-white">{req.service}</div>
                      <div className="text-[11px] text-slate-400">
                        {req.id} • {req.area}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-400/15 border border-emerald-400/35 text-emerald-300 text-[10px] font-extrabold w-fit">
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 7. FINAL CTA SECTION */}
        <motion.section
          {...fadeUp(0.05)}
          className="relative rounded-3xl border border-emerald-400/40 bg-gradient-to-r from-[#041418] via-[#092930] to-[#0f1c38] p-8 pt-10 sm:p-10 sm:pt-11 shadow-2xl mt-4"
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
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-400/15 blur-3xl" />
          </div>

          <h2 className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 px-5 py-1.5 rounded-full bg-[#041418] border border-emerald-400/60 text-white text-xs sm:text-sm font-extrabold shadow-lg whitespace-nowrap">
            Ready to Grow Your{' '}
            <span className="text-emerald-300">Professional Business?</span>
          </h2>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Join Punjab Services and connect with customers looking for
              reliable local professionals.
            </p>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/provider/register"
                className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg transition"
              >
                <Wrench className="w-4 h-4" />
                <span>Register as Professional</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-300" />
                <span>Explore How It Works</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
