'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  ChevronRight,
  HelpCircle,
  MapPin,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CitySlug } from '@/types/marketplace';

export function CityHubTemplate({ citySlug }: { citySlug: CitySlug }) {
  const router = useRouter();
  const {
    language,
    setSelectedCity,
    cities,
    setCities,
    categories,
    subcategories,
    providers,
    updateBookingDraft,
    showToast,
  } = useMarketplace();

  useEffect(() => {
    setSelectedCity(citySlug);
  }, [citySlug, setSelectedCity]);

  const city = cities.find((c) => c.slug === citySlug) || cities[0];
  const cityProviders = providers.filter(
    (p) =>
      p.citySlug === city.slug ||
      p.serviceAreas.some((a) => a.toLowerCase() === city.slug.toLowerCase())
  );

  const [newLocality, setNewLocality] = useState('');

  const handleAddLocality = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocality.trim()) return;
    setCities((prev) =>
      prev.map((c) =>
        c.slug === city.slug
          ? { ...c, localities: [...c.localities, newLocality.trim()] }
          : c
      )
    );
    showToast(
      `Added locality "${newLocality.trim()}" to ${city.name.en} coverage!`,
      'success'
    );
    setNewLocality('');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* City Hero */}
      <section className="bg-gradient-to-r from-[#041418] via-[#133882] to-[#0f1c38] text-white py-12">
        <div className="w-full px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-xs text-emerald-200 font-medium mb-4">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">
              {city.name[language]} Hub
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold">
                <MapPin className="w-3.5 h-3.5" /> Active Hyperlocal Hub:{' '}
                {city.name[language]}, {city.state}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold">
                {city.tagline}
              </h1>
              <p className="text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
                {city.description}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/book"
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Professional in {city.name.en}</span>
                </Link>
                <Link
                  href="/services"
                  className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm"
                >
                  Browse All 5 Categories
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 space-y-3">
              <div className="text-xs font-bold text-cyan-300 uppercase">
                {city.name.en} Live City Stats
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/40">
                  <div className="text-2xl font-extrabold text-white">
                    {city.providerCount}
                  </div>
                  <div className="text-[11px] text-emerald-200">
                    Verified Local Pros
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/40">
                  <div className="text-2xl font-extrabold text-emerald-300">
                    45 Min
                  </div>
                  <div className="text-[11px] text-emerald-200">
                    Avg Arrival Time
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-emerald-100">
                SEO Title: {city.seoTitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-4 sm:px-6 pt-10 space-y-10">
        {/* SEO City + Category Combinations Grid */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Available Service Categories in {city.name[language]}
              </h2>
              <p className="text-xs text-slate-500">
                Click any category below to open its dedicated {city.name.en} SEO landing page (/{city.slug}/:service)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card flex flex-col justify-between gap-4 hover:border-emerald-500 transition"
              >
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                    ₹{cat.baseVisitingFee} Visit Fee
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-2">
                    {cat.name[language]} in {city.name.en}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {cat.tagline[language]}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <Link
                    href={`/${city.slug}/${cat.slug}`}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Open {city.name.en} Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/services/${cat.slug}`}
                    className="block text-center text-[11px] font-bold text-slate-600 hover:text-emerald-700"
                  >
                    All {cat.name.en} Filter View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Coverage Areas / Localities (Editable Demo Content) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Service Coverage Localities & Sectors in {city.name.en}
              </h2>
              <p className="text-xs text-slate-500">
                Doorstep coverage across all listed sectors & colonies (Editable Demo Locality List)
              </p>
            </div>
            <form onSubmit={handleAddLocality} className="flex gap-2">
              <input
                type="text"
                value={newLocality}
                onChange={(e) => setNewLocality(e.target.value)}
                placeholder={`Add ${city.name.en} locality/sector...`}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Area
              </button>
            </form>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {city.localities.map((loc) => (
              <span
                key={loc}
                className="px-4 py-2 rounded-full bg-gradient-to-br from-[#041418] via-[#092930] to-[#0f1c38] border border-emerald-400/35 hover:border-emerald-300/80 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(16,185,129,0.4)] transition-all duration-300 text-white text-xs font-bold flex items-center gap-1.5 cursor-default"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>{loc}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Featured Local Providers in this City */}
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Featured Local Professionals in {city.name.en}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cityProviders.slice(0, 4).map((prov) => (
              <div
                key={prov.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card flex flex-col justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={prov.avatar}
                    alt={prov.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <Link
                      href={`/professionals/${prov.slug}`}
                      className="font-extrabold text-slate-900 hover:text-emerald-700 text-sm flex items-center gap-1"
                    >
                      <span>{prov.name}</span>
                      <BadgeCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                    </Link>
                    <div className="text-xs text-slate-500">
                      {prov.categoryName} • {prov.cityName}
                    </div>
                    <div className="flex items-center gap-1 text-xs mt-0.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold">{prov.rating}</span>
                      <span className="text-slate-400">
                        ({prov.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900">
                    Visit: ₹{prov.visitingCharge}
                  </span>
                  <button
                    onClick={() => {
                      updateBookingDraft({
                        categorySlug: prov.categorySlug,
                        subcategoryName:
                          prov.subcategories[0] || prov.categoryName,
                        providerId: prov.id,
                      });
                      router.push('/book');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Subcategories in City */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900">
            Popular Subcategory Bookings in {city.name.en}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {subcategories.slice(0, 8).map((sub) => (
              <Link
                key={sub.id}
                href={`/services/${sub.categorySlug}/${sub.slug}`}
                className="group p-4 rounded-2xl bg-gradient-to-br from-[#041418] via-[#092930] to-[#0f1c38] text-white border border-emerald-400/30 hover:border-emerald-300/80 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(16,185,129,0.4)] transition-all duration-300 text-xs font-extrabold flex items-center justify-between gap-2"
              >
                <span className="group-hover:text-emerald-300 transition-colors">
                  {sub.name.en}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-400/20 text-emerald-300 group-hover:bg-emerald-400 group-hover:text-slate-950 font-extrabold transition-colors shrink-0">
                  ₹{sub.startingPrice}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
