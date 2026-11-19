'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, FileText, ShieldCheck } from 'lucide-react';

export interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalDocTemplate({
  title,
  subtitle,
  lastUpdated,
  sections,
}: {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      <section className="bg-gradient-to-r from-[#041418] via-[#133882] to-[#0f1c38] text-white py-10">
        <div className="w-full px-4 sm:px-6 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-cyan-300 text-xs font-bold">
            <FileText className="w-3.5 h-3.5" /> Official Marketplace Policy
            Document • Last Updated: {lastUpdated}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">{title}</h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl">
            {subtitle}
          </p>
        </div>
      </section>

      <div className="w-full px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Left Navigation Sidebar */}
          <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-card space-y-3 lg:sticky lg:top-24">
            <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Legal & Policy Center
            </div>
            <nav className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
              <Link
                href="/terms-and-conditions"
                className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cancellation-refund-policy"
                className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700"
              >
                Cancellation & Refund Policy
              </Link>
              <Link
                href="/provider-terms"
                className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700"
              >
                Service Provider Terms
              </Link>
              <Link
                href="/community-guidelines"
                className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700"
              >
                Community Guidelines
              </Link>
              <Link
                href="/sitemap"
                className="px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-700"
              >
                Full Platform Sitemap
              </Link>
            </nav>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-1">
              <div className="font-extrabold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Draft Marked for Legal Review</span>
              </div>
              <p>
                Structured prototype legal draft prepared for Punjab Local
                Services Marketplace. Marked for formal legal counsel sign-off
                prior to production launch.
              </p>
            </div>
          </aside>

          {/* Right Document Content */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
            {sections.map((sec, idx) => (
              <div key={idx} className="space-y-2 border-b border-slate-100 pb-5 last:border-0">
                <h2 className="text-lg font-extrabold text-slate-900">
                  {idx + 1}. {sec.heading}
                </h2>
                {sec.body.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-xs sm:text-sm text-slate-600 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between text-xs text-emerald-950">
              <span className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Punjab Services Compliance & Legal Desk (Prototype Draft v2.4)
              </span>
              <Link href="/contact" className="font-bold text-emerald-700 hover:underline">
                Contact Legal Desk →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
