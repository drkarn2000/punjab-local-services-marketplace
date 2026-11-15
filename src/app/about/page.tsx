'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Globe,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';

export default function AboutPage() {
  const { cities } = useMarketplace();

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      <section className="bg-gradient-to-r from-[#081d4a] via-[#133882] to-[#1e4db7] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-cyan-300 text-xs font-bold">
            <Sparkles className="w-4 h-4" /> Hyperlocal Marketplace Built for
            Punjab & Tricity
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold">
            About Punjab Services
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between households in Mohali, Chandigarh &
            Hoshiarpur and verified local Electricians, Plumbers, Carpenters,
            Computer & Mobile repair specialists.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 space-y-10">
        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Our Mission
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To make home and device repairs across Punjab effortless, transparent, and trustworthy by combining upfront visiting charges with digital post-inspection estimates in English, Punjabi (Gurmukhi), and Hindi.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Our Vision
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To become North India’s most trusted hyperlocal service infrastructure—empowering 10,000+ skilled local technicians and small service businesses with steady digital earnings and professional dignity.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Core Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              100% background verification, zero hidden charges, mandatory customer estimate approval before work starts, and native trilingual accessibility for every citizen.
            </p>
          </div>
        </div>

        {/* Customer Trust + Provider Empowerment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-card space-y-4">
            <div className="flex items-center gap-2 text-blue-700 font-extrabold text-xs uppercase">
              <ShieldCheck className="w-4 h-4" /> Customer Trust Commitment
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Why Households Trust Punjab Services
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Every professional’s identity, address, and trade certificate are verified before onboarding.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Hybrid Pricing guarantees you approve labour and spare-part costs digitally before repair begins.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Dedicated local support team in Mohali, Chandigarh, and Hoshiarpur.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-card space-y-4">
            <div className="flex items-center gap-2 text-amber-700 font-extrabold text-xs uppercase">
              <Users className="w-4 h-4" /> Provider Empowerment
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Built for Independent Pros & Local Agencies
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Zero lead-buying gamble—providers receive confirmed bookings in their selected sector radius.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Support for both Individual Technicians and multi-member Business Agencies with team assignment.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Transparent commission structure and detailed payout ledger.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Supported Cities */}
        <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-card space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Our Initial Launch Markets
              </h2>
              <p className="text-xs text-slate-500">
                Active hyperlocal operations across 3 key markets in Punjab & Chandigarh
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
              <Globe className="w-4 h-4" /> English • ਪੰਜਾਬੀ • हिन्दी
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cities.map((c) => (
              <Link
                key={c.id}
                href={`/${c.slug}`}
                className="p-5 rounded-2xl border border-slate-200 hover:border-blue-600 bg-slate-50/50 transition space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-lg text-slate-900 group-hover:text-blue-700 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {c.name.en}
                  </span>
                  <span className="text-xs font-bold text-blue-700">
                    {c.providerCount} Pros →
                  </span>
                </div>
                <p className="text-xs text-slate-600">{c.tagline}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-[#092154] to-[#1e4db7] text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold">
              Experience the Marketplace Prototype
            </h2>
            <p className="text-xs sm:text-sm text-blue-100">
              Book a professional or explore the Service Provider & Admin portals.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/book"
              className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm inline-flex items-center gap-2"
            >
              <span>Book a Service</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl bg-white/15 text-white font-bold text-xs sm:text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
