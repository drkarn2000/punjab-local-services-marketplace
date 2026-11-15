'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  HelpCircle,
  ShieldCheck,
  Star,
  Wrench,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CategorySlug } from '@/types/marketplace';

export default function SubcategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = (params?.category as CategorySlug) || 'electrician';
  const subcategorySlug = (params?.subcategory as string) || '';

  const {
    language,
    selectedCity,
    categories,
    subcategories,
    providers,
    updateBookingDraft,
  } = useMarketplace();

  const category =
    categories.find((c) => c.slug === categorySlug) || categories[0];
  const subcategory =
    subcategories.find(
      (s) => s.categorySlug === category.slug && s.slug === subcategorySlug
    ) ||
    subcategories.find((s) => s.categorySlug === category.slug) ||
    subcategories[0];

  const relatedSubs = subcategories.filter(
    (s) => s.categorySlug === category.slug && s.id !== subcategory.id
  );

  const matchingProviders = providers.filter(
    (p) => p.categorySlug === category.slug
  );

  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);

  const handleBookSubcategory = (providerId?: string) => {
    const selectedOption = subcategory.serviceOptions[selectedOptionIdx];
    updateBookingDraft({
      categorySlug: category.slug,
      subcategoryName: subcategory.name.en,
      problemTitle: selectedOption
        ? selectedOption.name
        : `${subcategory.name.en} Request`,
      providerId: providerId || matchingProviders[0]?.id || 'prov-1',
    });
    router.push('/book');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* Subcategory Hero */}
      <section className="bg-gradient-to-r from-[#092154] via-[#133882] to-[#1e4db7] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-blue-200 font-medium mb-4">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/services/${category.slug}`}
              className="hover:text-white"
            >
              {category.name[language]}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">
              {subcategory.name[language]}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-cyan-200 text-xs font-bold">
                <Wrench className="w-3.5 h-3.5" />
                <span>
                  Verified {category.name.en} Specialist Service in{' '}
                  {selectedCity.toUpperCase()}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold">
                {subcategory.name[language]}
              </h1>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl">
                {subcategory.fullDesc}
              </p>
              <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-semibold text-blue-100">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-300" /> Typical Duration:{' '}
                  {subcategory.estimatedDuration}
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" /> Visiting
                  Fee: ₹{subcategory.startingPrice} (Adjusted in Final Bill)
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9
                  Avg Customer Rating
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="bg-white text-slate-900 rounded-2xl p-5 shadow-2xl w-full max-w-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    Inspection & Visiting Fee
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                    Available Today
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">
                    ₹{subcategory.startingPrice}
                  </span>
                  <span className="text-xs text-slate-500">
                    (Adjustable in final bill)
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Includes doorstep technician visit, fault inspection, and
                  upfront digital estimate before repair starts.
                </p>
                <button
                  onClick={() => handleBookSubcategory()}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book {subcategory.name.en} Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 8 Columns */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Problems Covered */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">
                Common Problems Covered Under {subcategory.name.en}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {subcategory.problemsCovered.map((prob, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3.5 rounded-xl bg-blue-50/50 border border-blue-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {prob}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Available Service Options */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Available Service Options
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose the option that best matches your requirement. Final spare parts or additional labour are quoted after on-site inspection.
                </p>
              </div>

              <div className="space-y-3">
                {subcategory.serviceOptions.map((opt, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedOptionIdx(idx)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      selectedOptionIdx === idx
                        ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/15'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">
                          {opt.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">
                          {opt.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{opt.description}</p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <div className="text-lg font-extrabold text-slate-900">
                        ₹{opt.price}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOptionIdx(idx);
                          handleBookSubcategory();
                        }}
                        className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
                      >
                        Select & Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Available Providers for this Subcategory */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Available {subcategory.name.en} Specialists
                  </h2>
                  <p className="text-xs text-slate-500">
                    Verified technicians ready to serve you in Mohali, Chandigarh & Hoshiarpur
                  </p>
                </div>
                <Link
                  href={`/services/${category.slug}`}
                  className="text-xs font-bold text-blue-700 hover:underline"
                >
                  View All {category.name.en}s →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchingProviders.slice(0, 4).map((prov) => (
                  <div
                    key={prov.id}
                    className="p-4 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3 hover:border-blue-400 transition"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={prov.avatar}
                        alt={prov.name}
                        className="w-14 h-14 rounded-full object-cover shrink-0"
                      />
                      <div>
                        <Link
                          href={`/professionals/${prov.slug}`}
                          className="font-extrabold text-slate-900 hover:text-blue-700 text-sm flex items-center gap-1"
                        >
                          <span>{prov.name}</span>
                          {prov.verified && (
                            <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-100" />
                          )}
                        </Link>
                        <div className="flex items-center gap-1 text-xs mt-0.5">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-bold">{prov.rating}</span>
                          <span className="text-slate-500">
                            ({prov.reviewCount}) • {prov.experienceYears} yrs
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {prov.cityName} • Visiting Fee ₹{prov.visitingCharge}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handleBookSubcategory(prov.id)}
                        className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
                      >
                        Book {prov.name.split(' ')[0]}
                      </button>
                      <Link
                        href={`/professionals/${prov.slug}`}
                        className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:border-blue-600"
                      >
                        Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. FAQs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>Frequently Asked Questions — {subcategory.name.en}</span>
              </h2>
              <div className="space-y-2.5">
                {subcategory.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setOpenFaqIdx(openFaqIdx === idx ? -1 : idx)
                      }
                      className="w-full px-4 py-3 text-left flex items-center justify-between gap-2 bg-slate-50/70 hover:bg-slate-100 text-xs sm:text-sm font-bold text-slate-900"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition ${
                          openFaqIdx === idx ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    {openFaqIdx === idx && (
                      <div className="px-4 py-3 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: How Booking Works + Related Services + SEO Metadata */}
          <div className="lg:col-span-4 space-y-6">
            {/* How Booking Works */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">
                How {subcategory.name.en} Booking Works
              </h3>
              <ol className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900 block">
                      Describe Issue & Upload Photos
                    </strong>
                    Select instant or scheduled slot and add optional problem photos.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900 block">
                      Doorstep Inspection (₹{subcategory.startingPrice} Visit Fee)
                    </strong>
                    Verified professional arrives and diagnoses the exact fault.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900 block">
                      Approve Digital Estimate First
                    </strong>
                    Review itemized labour & material costs. Work begins only after your approval.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-slate-900 block">
                      Pay After Completion & Invoice
                    </strong>
                    Pay online or cash after testing and download your GST/demo invoice.
                  </div>
                </li>
              </ol>
            </div>

            {/* Related Services in Category */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <h3 className="font-extrabold text-slate-900 text-base">
                Related {category.name.en} Services
              </h3>
              <div className="space-y-2">
                {relatedSubs.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/services/${category.slug}/${rel.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-blue-400 hover:bg-blue-50/40 transition text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-800">
                        {rel.name[language]}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Visit ₹{rel.startingPrice} • {rel.estimatedDuration}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                  </Link>
                ))}
              </div>
            </div>

            {/* SEO Metadata Preview Block */}
            <div className="bg-slate-900 text-slate-300 rounded-2xl p-4 text-[11px] space-y-1.5">
              <div className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> SEO Metadata Structure
              </div>
              <div className="font-bold text-white">
                {subcategory.name.en} in {selectedCity.toUpperCase()} — Starting ₹
                {subcategory.startingPrice} | Punjab Services
              </div>
              <p className="text-slate-400">
                Book verified {category.name.en.toLowerCase()}s for{' '}
                {subcategory.name.en.toLowerCase()} across Mohali, Chandigarh &
                Hoshiarpur. Upfront estimates & same-day doorstep arrival.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
