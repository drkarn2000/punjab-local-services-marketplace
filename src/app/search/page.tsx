'use client';

import React, { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Calendar,
  Clock,
  Filter,
  History,
  MapPin,
  RotateCcw,
  Search,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CategorySlug, CitySlug, ProviderType } from '@/types/marketplace';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    language,
    selectedCity,
    setSelectedCity,
    categories,
    subcategories,
    providers,
    updateBookingDraft,
    showToast,
  } = useMarketplace();

  const initialQuery = searchParams?.get('q') || '';
  const initialCat = (searchParams?.get('category') as CategorySlug) || '';

  const [query, setQuery] = useState(initialQuery);
  const [catFilter, setCatFilter] = useState<string>(initialCat);
  const [subFilter, setSubFilter] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [providerType, setProviderType] = useState<'all' | ProviderType>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(400);
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price-asc' | 'exp'>('relevance');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'MCB tripping repair Mohali',
    'Under-sink pipe leakage',
    'Laptop SSD upgrade Hoshiarpur',
    'BLDC ceiling fan installation',
  ]);

  const popularSearches = [
    'Fan Installation',
    'Switch & Socket Repair',
    'Pipe Leakage',
    'Geyser Plumbing',
    'Modular Kitchen Carpenter',
    'Windows 11 Installation',
    'Mobile Screen Replacement',
  ];

  // Live Autocomplete Suggestions
  const liveSuggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return subcategories
      .filter(
        (s) =>
          s.name.en.toLowerCase().includes(q) ||
          s.shortDesc.en.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [query, subcategories]);

  const matchedProviders = useMemo(() => {
    let list = [...providers];
    if (catFilter) {
      list = list.filter((p) => p.categorySlug === catFilter);
    }
    if (subFilter) {
      list = list.filter((p) =>
        p.subcategories.some((s) =>
          s.toLowerCase().includes(subFilter.toLowerCase())
        )
      );
    }
    if (cityFilter !== 'all') {
      list = list.filter(
        (p) =>
          p.citySlug === cityFilter ||
          p.serviceAreas.some(
            (a) => a.toLowerCase() === cityFilter.toLowerCase()
          )
      );
    }
    if (providerType !== 'all') {
      list = list.filter((p) => p.providerType === providerType);
    }
    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }
    if (maxPrice < 400) {
      list = list.filter((p) => p.visitingCharge <= maxPrice);
    }
    if (availableOnly) {
      list = list.filter((p) => p.availableToday);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.cityName.toLowerCase().includes(q) ||
          p.skills.some((sk) => sk.toLowerCase().includes(q)) ||
          p.subcategories.some((sc) => sc.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.visitingCharge - b.visitingCharge);
    } else if (sortBy === 'exp') {
      list.sort((a, b) => b.experienceYears - a.experienceYears);
    }
    return list;
  }, [
    providers,
    catFilter,
    subFilter,
    cityFilter,
    providerType,
    minRating,
    maxPrice,
    availableOnly,
    query,
    sortBy,
  ]);

  const handleRunSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches((prev) => [query.trim(), ...prev.slice(0, 4)]);
    }
    showToast(`Found ${matchedProviders.length} matching professionals.`, 'info');
  };

  const clearAll = () => {
    setQuery('');
    setCatFilter('');
    setSubFilter('');
    setCityFilter('all');
    setProviderType('all');
    setMinRating(0);
    setMaxPrice(400);
    setAvailableOnly(false);
    setSortBy('relevance');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* Top Search Hero */}
      <section className="bg-gradient-to-r from-[#041418] via-[#133882] to-[#0f1c38] text-white py-9">
        <div className="w-full px-4 sm:px-6 space-y-5">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold">
              Search Services & Verified Professionals
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              Find and compare rated Electricians, Plumbers, Carpenters, Laptop & Mobile repair pros across Mohali, Chandigarh & Hoshiarpur.
            </p>
          </div>

          <form
            onSubmit={handleRunSearch}
            className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-slate-900 max-w-3xl"
          >
            <div className="flex items-center gap-2 px-3 py-2 flex-1">
              <Search className="w-4 h-4 text-emerald-600 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by service, issue, or provider name (e.g. Gurmeet, Fan, Leakage, SSD)..."
                className="w-full text-xs sm:text-sm focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition"
            >
              Search
            </button>
          </form>

          {/* Live Suggestions if typing */}
          {liveSuggestions.length > 0 && (
            <div className="bg-white/95 text-slate-900 rounded-2xl p-3 max-w-3xl shadow-lg border border-emerald-100 space-y-1">
              <div className="text-[11px] font-bold text-emerald-700 uppercase px-2">
                Matching Subcategory Services:
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {liveSuggestions.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.categorySlug}/${s.slug}`}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-900 hover:text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <span>{s.name.en}</span>
                    <span className="opacity-75">• ₹{s.startingPrice}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recent & Popular Searches */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-100">
            <div className="flex flex-wrap items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-cyan-300" />
              <span className="font-bold text-white">Recent:</span>
              {recentSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item.split(' ')[0])}
                  className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/25 transition"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-bold text-white">Popular:</span>
              {popularSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item.split(' ')[0])}
                  className="px-2.5 py-0.5 rounded-full bg-amber-400/20 hover:bg-amber-400/35 text-amber-200 border border-amber-300/30 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="w-full px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Left Multi-Facet Filters (3 cols) */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                <Filter className="w-4 h-4 text-emerald-600" />
                <span>Search Filters</span>
              </div>
              <button
                onClick={clearAll}
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                Clear All
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                City
              </label>
              <select
                aria-label="Filter by City"
                value={cityFilter}
                onChange={(e) => {
                  setCityFilter(e.target.value);
                  if (e.target.value !== 'all') {
                    setSelectedCity(e.target.value as CitySlug);
                  }
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
              >
                <option value="all">All Cities (Mohali, Chandigarh, Hoshiarpur)</option>
                <option value="mohali">Mohali</option>
                <option value="chandigarh">Chandigarh</option>
                <option value="hoshiarpur">Hoshiarpur</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Category
              </label>
              <select
                aria-label="Filter by Category"
                value={catFilter}
                onChange={(e) => {
                  setCatFilter(e.target.value);
                  setSubFilter('');
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
              >
                <option value="">All 5 Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name[language]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Subcategory
              </label>
              <select
                aria-label="Filter by Subcategory"
                value={subFilter}
                onChange={(e) => setSubFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
              >
                <option value="">All Subcategories</option>
                {subcategories
                  .filter((s) => !catFilter || s.categorySlug === catFilter)
                  .map((s) => (
                    <option key={s.id} value={s.name.en.split(' ')[0]}>
                      {s.name.en}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Provider Type
              </label>
              <select
                aria-label="Filter by Provider Type"
                value={providerType}
                onChange={(e) =>
                  setProviderType(e.target.value as 'all' | ProviderType)
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
              >
                <option value="all">Individual & Business</option>
                <option value="individual">Independent Individual</option>
                <option value="business">Business Agency</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Minimum Rating
              </label>
              <select
                aria-label="Minimum Rating"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
              >
                <option value={0}>Any Rating</option>
                <option value={4.8}>4.8 ★ & above</option>
                <option value={4.5}>4.5 ★ & above</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Max Visiting Fee: ₹{maxPrice}
              </label>
              <input
                type="range"
                min={149}
                max={399}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="rounded text-emerald-600 w-4 h-4"
              />
              <span>Available Today Only</span>
            </label>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Sort Results
              </label>
              <select
                aria-label="Sort Results"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as 'relevance' | 'rating' | 'price-asc' | 'exp'
                  )
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
              >
                <option value="relevance">Relevance / Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Visiting Fee: Low to High</option>
                <option value="exp">Most Experienced</option>
              </select>
            </div>
          </aside>

          {/* Right Results Area (9 cols) */}
          <div className="lg:col-span-9 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
              <div className="text-sm font-extrabold text-slate-900">
                Showing {matchedProviders.length} Matching Professionals
                {query ? ` for "${query}"` : ''}
              </div>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  Clear Search Term
                </button>
              )}
            </div>

            {matchedProviders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4">
                <RotateCcw className="w-10 h-10 text-emerald-600 mx-auto" />
                <h2 className="text-xl font-extrabold text-slate-900">
                  No Exact Match Found for &ldquo;{query}&rdquo;
                </h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try clearing your search filters or explore our suggested popular categories below.
                </p>
                <button
                  onClick={clearAll}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                >
                  Reset All Filters
                </button>

                {/* Suggested Alternative Services */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-700 mb-3">
                    Suggested Alternative Services:
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((c) => (
                      <Link
                        key={c.id}
                        href={`/services/${c.slug}`}
                        className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-600 hover:text-white transition"
                      >
                        {c.name.en} (₹{c.baseVisitingFee})
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedProviders.map((prov) => (
                  <div
                    key={prov.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover flex flex-col justify-between gap-4 transition"
                  >
                    <div className="flex items-start gap-3.5">
                      <img
                        src={prov.avatar}
                        alt={prov.name}
                        className="w-16 h-16 rounded-2xl object-cover shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                            {prov.categoryName}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                            • Available Today
                          </span>
                        </div>
                        <Link
                          href={`/professionals/${prov.slug}`}
                          className="text-base font-extrabold text-slate-900 hover:text-emerald-700 flex items-center gap-1"
                        >
                          <span>{prov.name}</span>
                          {prov.verified && (
                            <BadgeCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                          )}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="flex items-center gap-1 font-bold text-slate-900">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            {prov.rating} ({prov.reviewCount})
                          </span>
                          <span>•</span>
                          <span>{prov.experienceYears}+ yrs</span>
                          <span>•</span>
                          <span>{prov.cityName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {prov.skills.slice(0, 4).map((sk) => (
                        <span
                          key={sk}
                          className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] text-slate-500 block">
                          Visiting Fee
                        </span>
                        <span className="text-lg font-extrabold text-slate-900">
                          ₹{prov.visitingCharge}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/professionals/${prov.slug}`}
                          className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-emerald-600 text-slate-700 text-xs font-bold"
                        >
                          View Profile
                        </Link>
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
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
                        >
                          <Calendar className="w-3.5 h-3.5" /> Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm">Loading search experience...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
