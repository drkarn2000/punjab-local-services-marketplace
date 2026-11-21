'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Check,
  Copy,
  Gift,
  Sparkles,
  Tag,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import offersHeroBg from '../become-a-professional/Images/Provider Earnings in Glowing Green.png';
import offerWelcomeBg from './images/offer-welcome.png';
import offerSeasonalBg from './images/offer-seasonal.png';
import offerCategoryBg from './images/offer-category.png';
import offerReferralBg from './images/offer-referral.png';

const offerBannerByType: Record<string, string> = {
  Welcome: `${offerWelcomeBg.src}?v=2`,
  Seasonal: `${offerSeasonalBg.src}?v=2`,
  Category: `${offerCategoryBg.src}?v=2`,
  Referral: `${offerReferralBg.src}?v=2`,
};

export default function OffersPage() {
  const router = useRouter();
  const { offers, setAppliedCoupon, updateBookingDraft, showToast } =
    useMarketplace();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('All');

  const filteredOffers = offers.filter(
    (o) => filterType === 'All' || o.type === filterType
  );

  const handleCopyCode = (code: string) => {
    setCopiedCode(code);
    setAppliedCoupon(code);
    updateBookingDraft({ couponCode: code });
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    showToast(`Coupon code "${code}" copied & saved to your booking draft!`, 'success');
  };

  const handleApplyAndBook = (code: string) => {
    setAppliedCoupon(code);
    updateBookingDraft({ couponCode: code });
    showToast(`Applied ${code}! Proceeding to 5-step booking.`, 'success');
    router.push('/book');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* HERO SECTION (Custom Glowing Emerald Background) */}
      <section className="relative overflow-hidden border-b border-emerald-400/25 text-white">
        <img
          src={offersHeroBg.src}
          alt="Punjab Services Offers and Rewards"
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041418]/90 via-[#041418]/55 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041418]/70 via-transparent to-transparent pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
          <div className="max-w-2xl space-y-5">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all duration-300 cursor-default">
              <Gift className="w-3.5 h-3.5" />
              <span>Exclusive Punjab &amp; Tricity Deals</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.12]">
              Offers, Coupons &amp;{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                Referral Rewards
              </span>
            </h1>

            <p className="text-xs sm:text-base text-slate-200 max-w-xl leading-relaxed">
              Copy any promotional coupon below or apply it with one click
              directly into your 5-step service booking flow (Demo Promotional
              Values).
            </p>

            {/* 3 Quick Deal Highlights */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-bold text-emerald-100">
              <div className="group inline-flex items-center gap-2 hover:text-emerald-300 hover:translate-x-0.5 transition-all cursor-default">
                <span className="w-7 h-7 rounded-full bg-emerald-400/20 border border-emerald-400/45 flex items-center justify-center text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-all">
                  <Copy className="w-3.5 h-3.5" />
                </span>
                <span>One-Click Coupon Copy</span>
              </div>
              <div className="group inline-flex items-center gap-2 hover:text-emerald-300 hover:translate-x-0.5 transition-all cursor-default">
                <span className="w-7 h-7 rounded-full bg-emerald-400/20 border border-emerald-400/45 flex items-center justify-center text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-all">
                  <Zap className="w-3.5 h-3.5" />
                </span>
                <span>Instant Booking Apply</span>
              </div>
              <div className="group inline-flex items-center gap-2 hover:text-emerald-300 hover:translate-x-0.5 transition-all cursor-default">
                <span className="w-7 h-7 rounded-full bg-emerald-400/20 border border-emerald-400/45 flex items-center justify-center text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-all">
                  <Tag className="w-3.5 h-3.5" />
                </span>
                <span>{offers.length} Active Promo Deals</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#offers-list"
                className="group px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(16,185,129,0.45)] transition-all duration-300 inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Browse Active Coupons</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="offers-list" className="w-full px-4 sm:px-6 pt-8 space-y-8">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {['All', 'Welcome', 'Seasonal', 'Category', 'Referral'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 ${
                filterType === t
                  ? 'bg-emerald-600 text-white shadow-[0_6px_18px_rgba(16,185,129,0.35)]'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400 hover:text-emerald-700 hover:shadow-md'
              }`}
            >
              {t} Offers
            </button>
          ))}
        </div>

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 pt-4">
          {filteredOffers.map((offer) => {
            const bannerSrc = offerBannerByType[offer.type] ?? offerWelcomeBg.src;
            return (
              <div
                key={offer.id}
                className="group bg-white rounded-3xl border border-emerald-300/60 hover:border-emerald-400 shadow-card hover:shadow-[0_20px_46px_rgba(16,185,129,0.28)] p-6 pt-8 flex flex-col justify-between gap-5 relative transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Lifestyle Offer Background Image + Left Readability Gradient */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <img
                    src={bannerSrc}
                    alt={offer.title}
                    className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
                </div>

                {/* Floating Top-Left Offer Type Badge on Card Border */}
                <span className="absolute top-0 -translate-y-1/2 left-6 z-20 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-400 group-hover:scale-105 text-emerald-800 text-xs font-extrabold shadow-md transition-all duration-300 whitespace-nowrap">
                  {offer.type} Offer
                </span>

                {/* Floating Top-Right Valid Till Badge on Card Border */}
                <span className="absolute top-0 -translate-y-1/2 right-6 z-20 px-3 py-1 rounded-full bg-white border border-slate-200 group-hover:border-emerald-400 group-hover:text-emerald-800 group-hover:scale-105 text-xs text-slate-700 font-semibold shadow-md transition-all duration-300 whitespace-nowrap">
                  Valid till {offer.validUntil}
                </span>

                <div className="relative z-10 space-y-4">
                  <div className="space-y-1.5">
                    <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors max-w-md">
                      {offer.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-md group-hover:text-slate-900 transition-colors">
                      {offer.subtitle}
                    </p>
                  </div>

                  {/* Terms & Conditions with 50% Gradient BG + Glowing Border + Floating Top-Border Title */}
                  <div className="relative mt-4 p-4 pt-5 rounded-2xl bg-gradient-to-r from-emerald-500/50 via-teal-400/50 to-cyan-400/50 backdrop-blur-md border border-emerald-400/75 shadow-[0_0_24px_rgba(16,185,129,0.28)] hover:border-emerald-300 hover:shadow-[0_0_34px_rgba(16,185,129,0.45)] transition-all duration-300 max-w-md">
                    <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 rounded-full bg-[#041418] border border-emerald-400/70 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider shadow-[0_0_14px_rgba(16,185,129,0.4)] whitespace-nowrap">
                      Terms &amp; Conditions:
                    </div>
                    <ul className="list-disc list-inside text-xs font-semibold text-slate-950 space-y-1">
                      {offer.terms.map((term, i) => (
                        <li
                          key={i}
                          className="hover:translate-x-1.5 hover:text-emerald-950 transition-all duration-200 cursor-default"
                        >
                          {term}
                        </li>
                      ))}
                      <li className="hover:translate-x-1.5 hover:text-emerald-950 transition-all duration-200 cursor-default">
                        Minimum booking / estimate value: ₹{offer.minBookingValue}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 bg-amber-50/95 backdrop-blur-sm border-2 border-dashed border-amber-300 hover:border-amber-500 hover:bg-amber-100/90 hover:scale-[1.02] px-3.5 py-2 rounded-xl shadow-sm transition-all duration-200">
                    <Tag className="w-4 h-4 text-amber-600" />
                    <span className="font-mono font-extrabold text-sm text-slate-900 tracking-wider">
                      {offer.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(offer.code)}
                      className="ml-2 px-2.5 py-1 rounded-lg bg-white hover:bg-amber-200 hover:scale-105 text-xs font-bold text-slate-800 border border-amber-200 inline-flex items-center gap-1 transition-all duration-200"
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApplyAndBook(offer.code)}
                    className="group/btn px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_10px_26px_rgba(16,185,129,0.45)] transition-all duration-200 inline-flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />
                    <span>Apply in Booking Flow</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
