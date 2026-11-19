'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  HelpCircle,
  IndianRupee,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from 'lucide-react';

export default function BecomeProfessionalPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#041418] via-[#133882] to-[#0f1c38] text-white py-14">
        <div className="w-full px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5" /> Partner with Punjab Services
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              Grow Your Income as a Verified Local Professional
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 max-w-xl leading-relaxed">
              Join 430+ Electricians, Plumbers, Carpenters, Computer & Mobile
              repair specialists across Mohali, Chandigarh & Hoshiarpur. Set
              your own visiting charges, work in your chosen radius, and get
              transparent payouts.
            </p>

            {/* Dual Registration CTAs (Individual vs Business) */}
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
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold text-xs sm:text-sm shadow-lg transition inline-flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Register as Business / Agency</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-extrabold text-amber-300">
                Why Skilled Pros Prefer Punjab Services
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-emerald-50">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Guaranteed Visiting Fee:</strong> Earn ₹199–₹249
                    inspection fee on every doorstep visit.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Digital Estimate Builder:</strong> Quote fair labour
                    and spare parts after inspecting the job—no blind underquoting.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Flexible Availability Calendar:</strong> Choose your
                    working days, hours, and block holidays anytime.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Multi-Technician Team Support:</strong> Business
                    agencies can onboard their technicians and assign jobs easily.
                  </span>
                </li>
              </ul>
              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
                <span>Already registered in demo?</span>
                <Link
                  href="/provider/dashboard"
                  className="font-bold text-cyan-300 hover:underline"
                >
                  Open Provider Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-4 sm:px-6 pt-12 space-y-12">
        {/* Individual vs Business Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              1. Independent Professional (Individual)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Ideal for self-employed Electricians, Plumbers, Carpenters, Laptop
              and Mobile repair technicians.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Personal
                Verified Profile & Portfolio Gallery
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Direct Job
                Requests in Your Chosen Sector Radius
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Simple
                Aadhaar + Skill Certificate Verification
              </li>
            </ul>
            <Link
              href="/provider/register?type=individual"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
            >
              <span>Start Individual Registration</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              2. Service Agency / Business Partner
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Ideal for service contractors, repair shops, and agencies with 2
              or more technicians on staff.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> Dedicated
                Team Management Module (/provider/team)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> Assign
                Available Technicians to Accepted Bookings
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> Consolidated
                Business Earnings & Payout Statements
              </li>
            </ul>
            <Link
              href="/provider/register?type=business"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold"
            >
              <span>Start Business Registration</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Eligibility & 4 Registration Steps */}
        <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-card space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Provider Eligibility & 4-Step Onboarding
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: 'Step 1',
                title: 'Complete Profile',
                desc: 'Enter your personal/business details, experience years, categories, skills, and service radius in Mohali, Chandigarh, or Hoshiarpur.',
              },
              {
                step: 'Step 2',
                title: 'Upload Documents (Demo)',
                desc: 'Submit demo identity proof (Aadhaar/PAN), local address proof, and trade/business registration.',
              },
              {
                step: 'Step 3',
                title: 'Admin Verification',
                desc: 'Our Verification Manager reviews your checklist and activates your blue Verified badge.',
              },
              {
                step: 'Step 4',
                title: 'Accept Jobs & Earn',
                desc: 'Configure your calendar, accept incoming jobs, send digital estimates, and receive transparent payouts.',
              },
            ].map((s) => (
              <div
                key={s.step}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
              >
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold">
                  {s.step}
                </span>
                <div className="font-extrabold text-slate-900 text-sm">
                  {s.title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
