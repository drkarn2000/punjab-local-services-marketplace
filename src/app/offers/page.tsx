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
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';

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
      <section className="bg-gradient-to-r from-[#081d4a] via-[#133882] to-[#1e4db7] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold">
            <Gift className="w-3.5 h-3.5" /> Exclusive Punjab & Tricity Deals
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold">
            Offers, Coupons & Referral Rewards
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto">
            Copy any promotional coupon below or apply it with one click directly into your 5-step service booking flow (Demo Promotional Values).
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-7">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['All', 'Welcome', 'Seasonal', 'Category', 'Referral'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                filterType === t
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400'
              }`}
            >
              {t} Offers
            </button>
          ))}
        </div>

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 flex flex-col justify-between gap-5 relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold">
                    {offer.type} Offer
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Valid till {offer.validUntil}
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-slate-900">
                  {offer.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  {offer.subtitle}
                </p>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">
                    Terms & Conditions:
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    {offer.terms.map((term, i) => (
                      <li key={i}>{term}</li>
                    ))}
                    <li>Minimum booking / estimate value: ₹{offer.minBookingValue}</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 bg-amber-50 border-2 border-dashed border-amber-300 px-3.5 py-2 rounded-xl">
                  <Tag className="w-4 h-4 text-amber-600" />
                  <span className="font-mono font-extrabold text-sm text-slate-900 tracking-wider">
                    {offer.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(offer.code)}
                    className="ml-2 px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 text-xs font-bold text-slate-800 border border-amber-200 inline-flex items-center gap-1 transition"
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
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apply in Booking Flow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
