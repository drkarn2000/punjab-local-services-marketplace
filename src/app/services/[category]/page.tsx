'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplets,
  Filter,
  Hammer,
  IndianRupee,
  Info,
  Laptop,
  List,
  Map as MapIcon,
  MapPin,
  RotateCcw,
  Search,
  ShieldCheck,
  Smartphone,
  Star,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CategorySlug, CitySlug, ProviderType } from '@/types/marketplace';
import { renderCategoryIcon } from '@/data/serviceCatalogConfig';

export default function CategoryListingPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = (params?.category as CategorySlug) || 'electrician';

  const {
    language,
    selectedCity,
    setSelectedCity,
    categories,
    subcategories,
    isCategoryAvailableInCity,
    providers,
    updateBookingDraft,
    showToast,
  } = useMarketplace();

  const category =
    categories.find((c) => c.slug === categorySlug) || categories[0];
  const isAvailableInSelectedCity = isCategoryAvailableInCity(category, selectedCity);
  const categorySubs = subcategories.filter(
    (s) => s.categorySlug === category.slug && s.active !== false
  );

  // Filter & Sort State
  const [activeSubPill, setActiveSubPill] = useState<string>('all');
  const [searchWithin, setSearchWithin] = useState<string>('');
  const [availableTodayOnly, setAvailableTodayOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [instantOnly, setInstantOnly] = useState<boolean>(false);
  const [scheduledOnly, setScheduledOnly] = useState<boolean>(false);
  const [providerTypeFilter, setProviderTypeFilter] = useState<
    'all' | ProviderType
  >('all');
  const [cityFilterAll, setCityFilterAll] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<
    'recommended' | 'rating' | 'price-asc' | 'price-desc' | 'experience'
  >('recommended');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredProviders = useMemo(() => {
    let list = providers.filter(
      (p) =>
        p.categorySlug === category.slug ||
        p.categorySlugs?.includes(category.slug)
    );

    // If not "All Punjab Cities", prioritize selectedCity or providers whose serviceAreas include selectedCity
    if (!cityFilterAll) {
      const cityMatch = list.filter(
        (p) =>
          p.citySlug === selectedCity ||
          p.serviceAreas.some(
            (a) => a.toLowerCase() === selectedCity.toLowerCase()
          )
      );
      if (cityMatch.length > 0) {
        list = cityMatch;
      }
    }

    if (activeSubPill !== 'all') {
      const q = activeSubPill.toLowerCase();
      list = list.filter(
        (p) =>
          p.subcategories.some((s) => s.toLowerCase().includes(q)) ||
          p.skills.some((sk) => sk.toLowerCase().includes(q))
      );
    }

    if (searchWithin.trim()) {
      const q = searchWithin.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.about.toLowerCase().includes(q) ||
          p.skills.some((sk) => sk.toLowerCase().includes(q)) ||
          p.subcategories.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (availableTodayOnly) {
      list = list.filter((p) => p.availableToday);
    }
    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }
    if (minExperience > 0) {
      list = list.filter((p) => p.experienceYears >= minExperience);
    }
    if (maxPrice < 500) {
      list = list.filter((p) => p.visitingCharge <= maxPrice);
    }
    if (verifiedOnly) {
      list = list.filter((p) => p.verified);
    }
    if (instantOnly) {
      list = list.filter((p) => p.instantBooking);
    }
    if (scheduledOnly) {
      list = list.filter((p) => p.scheduledBooking);
    }
    if (providerTypeFilter !== 'all') {
      list = list.filter((p) => p.providerType === providerTypeFilter);
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.visitingCharge - b.visitingCharge);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.visitingCharge - a.visitingCharge);
    } else if (sortBy === 'experience') {
      list.sort((a, b) => b.experienceYears - a.experienceYears);
    } else {
      // recommended
      list.sort(
        (a, b) =>
          Number(b.verified) - Number(a.verified) ||
          b.rating - a.rating ||
          a.distanceKm - b.distanceKm
      );
    }

    return list;
  }, [
    providers,
    category.slug,
    selectedCity,
    cityFilterAll,
    activeSubPill,
    searchWithin,
    availableTodayOnly,
    minRating,
    minExperience,
    maxPrice,
    verifiedOnly,
    instantOnly,
    scheduledOnly,
    providerTypeFilter,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setActiveSubPill('all');
    setSearchWithin('');
    setAvailableTodayOnly(false);
    setMinRating(0);
    setMinExperience(0);
    setMaxPrice(500);
    setVerifiedOnly(false);
    setInstantOnly(false);
    setScheduledOnly(false);
    setProviderTypeFilter('all');
    setCityFilterAll(false);
    setSortBy('recommended');
    setCurrentPage(1);
    showToast('All category filters cleared.', 'info');
  };

  // Category icons rendered via renderCategoryIcon in serviceCatalogConfig.tsx

  const cityDisplayName =
    selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* 1. CATEGORY HERO SECTION (Full-Bleed Service BG Image + Midnight Emerald-Teal Overlay) */}
      <section className="relative text-white py-12 lg:py-14 overflow-hidden border-b border-emerald-400/30">
        <img
          src={category.heroImage || category.cardImage}
          alt={category.name[language]}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041418]/95 via-[#092930]/85 to-[#0f1c38]/75" />
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              {/* Breadcrumb */}
              <nav className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-emerald-200 font-medium">
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href="/services" className="hover:text-white transition">
                  Services
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-emerald-300 font-bold">
                  {category.name[language]}
                </span>
              </nav>

              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-300/40 flex items-center justify-center shadow-lg">
                  {renderCategoryIcon(category.iconName || category.slug, 'w-8 h-8')}
                </div>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                    {category.name[language]}{' '}
                    <span className="text-emerald-300">Services</span>
                  </h1>
                  <p className="text-xs font-bold text-cyan-200 mt-0.5">
                    {category.tagline[language]}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                {category.description[language]}
              </p>

              {/* 4 Trust Badges Row */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold text-emerald-100">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" /> Verified{' '}
                  {category.name.en}s
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
                  <Clock className="w-4 h-4 text-cyan-300" /> Same Day Service
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
                  <IndianRupee className="w-4 h-4 text-emerald-300" /> Transparent Pricing
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Rated by Customers
                </span>
              </div>
            </div>

            {/* Right Glassmorphic Quick-Book Card */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-emerald-300/35 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                      category.comingSoon
                        ? 'bg-amber-400 text-slate-950'
                        : category.bookingsPaused
                        ? 'bg-rose-400 text-slate-950'
                        : !isAvailableInSelectedCity
                        ? 'bg-slate-300 text-slate-950'
                        : 'bg-emerald-400 text-slate-950'
                    }`}
                  >
                    {category.comingSoon
                      ? 'Coming Soon'
                      : category.bookingsPaused
                      ? 'Bookings Paused'
                      : !isAvailableInSelectedCity
                      ? `Not Live in ${cityDisplayName}`
                      : `${cityDisplayName} Live`}
                  </span>
                  <span className="text-xs font-bold text-emerald-200">
                    {category.providerCount}+ Verified Pros
                  </span>
                </div>
                <div>
                  <div className="text-xs text-slate-300 font-medium">
                    Standard Inspection / Visit Charge
                  </div>
                  <div className="text-3xl font-extrabold text-white mt-0.5">
                    ₹{category.baseVisitingFee}
                    <span className="text-xs font-normal text-emerald-200 ml-1.5">
                      (Adjustable in final bill)
                    </span>
                  </div>
                </div>
                <Link
                  href="/book"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book {category.name.en} Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FIXED TITLE PILL + ANIMATED RIGHT-TO-LEFT SUBCATEGORY STRIP */}
      <div className="bg-gradient-to-r from-[#041418] via-[#092930] to-[#0f1c38] border-b border-emerald-400/30 shadow-lg overflow-hidden">
        <div className="w-full px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => setActiveSubPill('all')}
            className={`px-4 py-2 rounded-full text-xs font-extrabold shrink-0 transition whitespace-nowrap z-10 ${
              activeSubPill === 'all'
                ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-[0_0_16px_rgba(16,185,129,0.5)]'
                : 'bg-white/10 text-white border border-white/15 hover:bg-white/20'
            }`}
          >
            All {category.name.en} Services
          </button>

          <div className="flex-1 overflow-hidden">
            <div className="animate-popular-strip-reverse items-center gap-2.5">
              {[0, 1].map((dupIdx) => (
                <div key={dupIdx} className="flex items-center gap-2.5 shrink-0">
                  {categorySubs.map((sub) => {
                    const isSelected = activeSubPill === sub.name.en.split(' ')[0];
                    return (
                      <div key={`${dupIdx}-${sub.id}`} className="flex items-center shrink-0">
                        <button
                          onClick={() =>
                            setActiveSubPill(
                              isSelected ? 'all' : sub.name.en.split(' ')[0]
                            )
                          }
                          className={`px-3.5 py-2 rounded-l-full text-xs font-bold transition border-y border-l whitespace-nowrap ${
                            isSelected
                              ? 'bg-emerald-400 text-slate-950 border-emerald-300'
                              : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                          }`}
                        >
                          {sub.name[language]}
                        </button>
                        <Link
                          href={`/services/${category.slug}/${sub.slug}`}
                          title={`Open ${sub.name.en} Detail Page`}
                          className="px-2.5 py-2 rounded-r-full text-xs bg-white/15 hover:bg-emerald-400 text-emerald-200 hover:text-slate-950 border border-white/15 transition font-bold"
                        >
                          ↗
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT: Left Filter Sidebar + Right Provider Listing */}
      <div className="w-full px-4 sm:px-6 pt-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* LEFT FILTER SIDEBAR (Midnight Emerald-Teal Gradient) */}
          <aside className="lg:col-span-3 bg-gradient-to-b from-[#041418] via-[#092930] to-[#0f1c38] text-white rounded-3xl border border-emerald-400/30 shadow-2xl p-5 space-y-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2 font-extrabold text-white text-sm">
                <Filter className="w-4 h-4 text-emerald-300" />
                <span>Filter Results</span>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-bold text-emerald-300 hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Location Selector */}
            <div className="space-y-2 border-b border-white/15 pb-4">
              <div className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">Location</div>
              <div className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-xl border border-emerald-400/30">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  <select
                    aria-label="Filter Location"
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value as CitySlug);
                      setCityFilterAll(false);
                    }}
                    className="bg-transparent text-white focus:outline-none cursor-pointer"
                  >
                    <option value="mohali" className="bg-slate-900 text-white">Mohali</option>
                    <option value="chandigarh" className="bg-slate-900 text-white">Chandigarh</option>
                    <option value="hoshiarpur" className="bg-slate-900 text-white">Hoshiarpur</option>
                  </select>
                </div>
                <button
                  onClick={() => setCityFilterAll(!cityFilterAll)}
                  className="text-[11px] font-semibold text-emerald-300 hover:underline"
                >
                  {cityFilterAll ? 'City Only' : 'Show All 3 Cities'}
                </button>
              </div>
            </div>

            {/* Search Within Category */}
            <div className="space-y-1.5 border-b border-white/15 pb-4">
              <label className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider block">
                Search in {category.name.en}
              </label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-400/30 bg-white/10">
                <Search className="w-3.5 h-3.5 text-emerald-300" />
                <input
                  type="text"
                  value={searchWithin}
                  onChange={(e) => setSearchWithin(e.target.value)}
                  placeholder="Name or skill (e.g. Gurmeet, MCB)"
                  className="w-full text-xs bg-transparent text-white placeholder:text-slate-300 focus:outline-none"
                />
              </div>
            </div>

            {/* Service Type Checkboxes */}
            <div className="space-y-2 border-b border-white/15 pb-4">
              <div className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                Service Type
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer hover:text-emerald-300">
                <input
                  type="checkbox"
                  checked={activeSubPill === 'all'}
                  onChange={() => setActiveSubPill('all')}
                  className="rounded accent-emerald-400 w-4 h-4"
                />
                <span className="font-semibold">
                  All {category.name.en} Services
                </span>
              </label>
              {categorySubs.slice(0, 6).map((sub) => {
                const keyWord = sub.name.en.split(' ')[0];
                return (
                  <label
                    key={sub.id}
                    className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer hover:text-emerald-300"
                  >
                    <input
                      type="checkbox"
                      checked={activeSubPill === keyWord}
                      onChange={() =>
                        setActiveSubPill(
                          activeSubPill === keyWord ? 'all' : keyWord
                        )
                      }
                      className="rounded accent-emerald-400 w-4 h-4"
                    />
                    <span>{sub.name[language]}</span>
                  </label>
                );
              })}
            </div>

            {/* Availability & Booking Mode */}
            <div className="space-y-2 border-b border-white/15 pb-4">
              <div className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                Availability & Booking Type
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer hover:text-emerald-300">
                <input
                  type="checkbox"
                  checked={availableTodayOnly}
                  onChange={(e) => setAvailableTodayOnly(e.target.checked)}
                  className="rounded accent-emerald-400 w-4 h-4"
                />
                <span>Available Today (28)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer hover:text-emerald-300">
                <input
                  type="checkbox"
                  checked={instantOnly}
                  onChange={(e) => setInstantOnly(e.target.checked)}
                  className="rounded accent-emerald-400 w-4 h-4"
                />
                <span>Instant Booking (60-Min Arrival)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer hover:text-emerald-300">
                <input
                  type="checkbox"
                  checked={scheduledOnly}
                  onChange={(e) => setScheduledOnly(e.target.checked)}
                  className="rounded accent-emerald-400 w-4 h-4"
                />
                <span>Scheduled Slot Booking</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer hover:text-emerald-300">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded accent-emerald-400 w-4 h-4"
                />
                <span>Verified Badge Only</span>
              </label>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2 border-b border-white/15 pb-4">
              <div className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">Rating</div>
              {[
                { val: 4.8, label: '4.8 & above' },
                { val: 4.5, label: '4.5 & above' },
                { val: 4.0, label: '4.0 & above' },
              ].map((r) => (
                <label
                  key={r.val}
                  className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer hover:text-emerald-300"
                >
                  <input
                    type="checkbox"
                    checked={minRating === r.val}
                    onChange={() =>
                      setMinRating(minRating === r.val ? 0 : r.val)
                    }
                    className="rounded accent-emerald-400 w-4 h-4"
                  />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>

            {/* Experience & Price Range & Provider Type */}
            <div className="space-y-3 border-b border-white/15 pb-4">
              <div>
                <label className="text-xs font-extrabold text-emerald-300 block mb-1">
                  Minimum Experience
                </label>
                <select
                  aria-label="Minimum Experience"
                  value={minExperience}
                  onChange={(e) => setMinExperience(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl border border-emerald-400/30 text-xs bg-slate-900/90 text-white font-medium"
                >
                  <option value={0} className="bg-slate-900 text-white">Any Experience</option>
                  <option value={5} className="bg-slate-900 text-white">5+ Years Experience</option>
                  <option value={8} className="bg-slate-900 text-white">8+ Years Experience</option>
                  <option value={10} className="bg-slate-900 text-white">10+ Years Experience</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-extrabold text-emerald-300 block mb-1">
                  Visiting Charge Limit: ₹{maxPrice}
                </label>
                <input
                  type="range"
                  min={149}
                  max={399}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-slate-300">
                  <span>₹149</span>
                  <span>₹199</span>
                  <span>₹249</span>
                  <span>₹399</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-emerald-300 block mb-1">
                  Provider Classification
                </label>
                <select
                  aria-label="Provider Classification"
                  value={providerTypeFilter}
                  onChange={(e) =>
                    setProviderTypeFilter(e.target.value as 'all' | ProviderType)
                  }
                  className="w-full px-3 py-1.5 rounded-xl border border-emerald-400/30 text-xs bg-slate-900/90 text-white font-medium"
                >
                  <option value="all" className="bg-slate-900 text-white">All (Individual & Business)</option>
                  <option value="individual" className="bg-slate-900 text-white">Independent Individual</option>
                  <option value="business" className="bg-slate-900 text-white">Registered Business / Agency</option>
                </select>
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-emerald-300 block">
                Sort By
              </label>
              <select
                aria-label="Sort Providers By"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | 'recommended'
                      | 'rating'
                      | 'price-asc'
                      | 'price-desc'
                      | 'experience'
                  )
                }
                className="w-full px-3 py-2 rounded-xl border border-emerald-400/30 text-xs font-semibold text-white bg-slate-900/90"
              >
                <option value="recommended" className="bg-slate-900 text-white">Recommended</option>
                <option value="rating" className="bg-slate-900 text-white">Top Rated</option>
                <option value="price-asc" className="bg-slate-900 text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-slate-900 text-white">Price: High to Low</option>
                <option value="experience" className="bg-slate-900 text-white">Most Experienced</option>
              </select>
            </div>

            <button
              onClick={() =>
                showToast(
                  `Updated ${category.name.en} results (${filteredProviders.length} matched).`,
                  'success'
                )
              }
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Apply Filters</span>
            </button>
          </aside>

          {/* RIGHT LISTING AREA */}
          <div className="lg:col-span-9 space-y-5">
            {/* Top Bar: Gradient BG + Count + List/Map View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-[#041418] via-[#092930] to-[#0f1c38] text-white p-5 rounded-3xl border border-emerald-400/30 shadow-xl">
              <div>
                <h2 className="text-xl font-extrabold text-white">
                  Available {category.name[language]}s in{' '}
                  <span className="text-emerald-300">
                    {cityFilterAll ? 'Punjab (All Launch Cities)' : cityDisplayName}
                  </span>
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  {filteredProviders.length} verified {category.name.en.toLowerCase()}{' '}
                  professionals ready for doorstep service
                </p>
              </div>

              <div className="inline-flex items-center bg-white/10 p-1 rounded-xl border border-white/15 self-start sm:self-auto">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-sm'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List View</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition ${
                    viewMode === 'map'
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-sm'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Map View</span>
                </button>
              </div>
            </div>

            {/* Simulated Map View if selected */}
            {viewMode === 'map' && (
              <div className="bg-gradient-to-br from-emerald-50 via-slate-100 to-cyan-50 rounded-2xl border border-emerald-200 p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[11px] font-bold">
                      Simulated Hyperlocal Coverage Map — {cityDisplayName}
                    </span>
                    <p className="text-xs text-slate-600 mt-1">
                      Showing approximate sector & locality pins for {filteredProviders.length} providers (Simulated Frontend Map — No live GPS).
                    </p>
                  </div>
                  <button
                    onClick={() => setViewMode('list')}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    Back to List View
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {filteredProviders.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-xl p-3.5 border border-emerald-200 shadow-sm flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {p.cityName} • {p.distanceKm} km away • ₹
                            {p.visitingCharge}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/professionals/${p.slug}`}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State if filters exclude all providers */}
            {filteredProviders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  No {category.name.en}s Match Your Exact Filter Combination
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try clearing some filters or switching to &ldquo;Show All 3 Cities&rdquo; to see more verified professionals across Mohali, Chandigarh, and Hoshiarpur.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={clearAllFilters}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => setCityFilterAll(true)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
                  >
                    Show All Punjab Cities
                  </button>
                </div>
              </div>
            ) : (
              /* HORIZONTAL PROVIDER CARDS (Midnight Emerald-Teal Gradient) */
              <div className="space-y-4">
                {filteredProviders.map((prov) => (
                  <div
                    key={prov.id}
                    className="bg-gradient-to-br from-[#041418] via-[#092930] to-[#0f1c38] text-white rounded-3xl border border-emerald-400/30 shadow-xl hover:border-emerald-300/70 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(16,185,129,0.3)] p-5 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
                  >
                    {/* Left Info (5 cols) */}
                    <div className="md:col-span-5 flex items-start gap-4">
                      <img
                        src={prov.avatar}
                        alt={prov.name}
                        className="w-20 h-20 rounded-2xl object-cover ring-2 ring-emerald-400/60 shadow-md shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {prov.availableToday && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30">
                              • Available Today
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-200 text-[10px] font-bold uppercase">
                            {prov.providerType === 'business'
                              ? 'Business Agency'
                              : 'Individual Pro'}
                          </span>
                        </div>

                        <Link
                          href={`/professionals/${prov.slug}`}
                          className="text-lg font-extrabold text-white hover:text-emerald-300 flex items-center gap-1.5 pt-0.5"
                        >
                          <span>{prov.name}</span>
                          {prov.verified && (
                            <BadgeCheck className="w-5 h-5 text-emerald-300 shrink-0" />
                          )}
                        </Link>

                        <div className="flex items-center gap-1.5 text-xs">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-white">
                            {prov.rating}
                          </span>
                          <span className="text-slate-300">
                            ({prov.reviewCount} reviews)
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                          <Briefcase className="w-3.5 h-3.5 text-emerald-300" />
                          <span>{prov.experienceYears}+ years experience</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                          <span>
                            {prov.cityName}, {prov.distanceKm} km away
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Services Offered Pills (4 cols) */}
                    <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/15 pt-3 md:pt-0 md:pl-5">
                      <div className="text-xs font-extrabold text-emerald-300 mb-2">
                        Services Offered
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {prov.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-100 text-xs font-medium border border-white/15"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2.5 flex items-center gap-3 text-[11px] text-emerald-200">
                        {prov.instantBooking && (
                          <span className="inline-flex items-center gap-1 font-semibold">
                            <Zap className="w-3 h-3 text-emerald-300" /> Instant Booking
                          </span>
                        )}
                        {prov.scheduledBooking && (
                          <span className="inline-flex items-center gap-1 font-semibold">
                            <Calendar className="w-3 h-3 text-cyan-300" /> Scheduled Slots
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Visiting Charge & CTA Buttons (3 cols) */}
                    <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-white/15 pt-3 md:pt-0 md:pl-5 flex flex-col justify-between gap-3">
                      <div>
                        <div className="text-xs text-slate-300 font-medium">
                          Visiting Charge
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-2xl font-extrabold text-white">
                            ₹{prov.visitingCharge}
                          </span>
                          <span
                            title="Inspection & visiting charge. Adjusted in final repair bill upon estimate approval."
                            className="text-emerald-300 hover:text-white cursor-help"
                          >
                            <Info className="w-4 h-4" />
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-300">
                          (Adjustable in final bill)
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
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
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 text-xs font-extrabold shadow-lg transition flex items-center justify-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Now</span>
                        </button>
                        <Link
                          href={`/professionals/${prov.slug}`}
                          className="w-full py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition flex items-center justify-center gap-1"
                        >
                          <span>View Profile</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Bar (Gradient BG) */}
            <div className="bg-gradient-to-r from-[#041418] via-[#092930] to-[#0f1c38] text-white rounded-2xl border border-emerald-400/30 shadow-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="text-slate-200 font-semibold">
                Showing 1 – {filteredProviders.length} of{' '}
                {category.providerCount} {category.name.en.toLowerCase()}s
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-lg border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setCurrentPage(num);
                      showToast(`Viewing page ${num} of ${category.name.en} results`, 'info');
                    }}
                    className={`w-8 h-8 rounded-lg font-extrabold transition ${
                      currentPage === num
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-md'
                        : 'border border-white/20 bg-white/10 text-slate-200 hover:bg-white/20'
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                  className="w-8 h-8 rounded-lg border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
