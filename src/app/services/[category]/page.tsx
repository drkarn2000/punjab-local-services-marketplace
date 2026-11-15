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
    providers,
    updateBookingDraft,
    showToast,
  } = useMarketplace();

  const category =
    categories.find((c) => c.slug === categorySlug) || categories[0];
  const categorySubs = subcategories.filter(
    (s) => s.categorySlug === category.slug
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
    let list = providers.filter((p) => p.categorySlug === category.slug);

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

  const categoryIcon: Record<CategorySlug, React.ReactNode> = {
    electrician: <Zap className="w-8 h-8 text-amber-400 fill-amber-400" />,
    plumber: <Droplets className="w-8 h-8 text-cyan-300 fill-cyan-300" />,
    carpenter: <Hammer className="w-8 h-8 text-amber-300" />,
    'computer-repair': <Laptop className="w-8 h-8 text-cyan-300" />,
    'mobile-repair': <Smartphone className="w-8 h-8 text-cyan-300" />,
  };

  const cityDisplayName =
    selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* 1. CATEGORY HERO SECTION matching Image 3 */}
      <section className="bg-gradient-to-r from-[#081d4a] via-[#133882] to-[#2354bf] text-white py-9 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3.5">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-xs text-blue-200 font-medium">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href="/services" className="hover:text-white">
                  Services
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white font-semibold">
                  {category.name[language]}
                </span>
              </nav>

              <div className="flex items-center gap-3">
                {categoryIcon[category.slug]}
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {category.name[language]} Services
                </h1>
              </div>

              <p className="text-sm sm:text-base text-blue-100 max-w-xl leading-relaxed">
                {category.description[language]}
              </p>

              {/* 4 Trust Badges Row matching Image 3 */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-blue-100">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-300" /> Verified{' '}
                  {category.name.en}s
                </span>
                <span className="text-blue-400/50">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-300" /> Same Day Service
                </span>
                <span className="text-blue-400/50">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-cyan-300" /> Transparent
                  Pricing
                </span>
                <span className="text-blue-400/50">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />{' '}
                  Rated by Customers
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:flex justify-end relative">
              <div className="relative">
                <div className="absolute -top-2 -right-2 z-20 transform rotate-2 bg-amber-300 text-slate-950 px-4 py-2 rounded-2xl shadow-lg font-extrabold text-xs leading-tight">
                  {category.tagline.en}
                </div>
                <img
                  src={category.heroImage}
                  alt={category.name.en}
                  className="w-80 h-48 object-cover rounded-2xl border-2 border-white/25 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUBCATEGORY NAVIGATION BAR matching Image 3 */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubPill('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition ${
              activeSubPill === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All {category.name.en} Services
          </button>

          {categorySubs.map((sub) => {
            const isSelected = activeSubPill === sub.name.en.split(' ')[0];
            return (
              <div key={sub.id} className="flex items-center shrink-0">
                <button
                  onClick={() =>
                    setActiveSubPill(
                      isSelected ? 'all' : sub.name.en.split(' ')[0]
                    )
                  }
                  className={`px-3.5 py-2 rounded-l-full text-xs font-semibold transition border-y border-l ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 border-blue-600 font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {sub.name[language]}
                </button>
                <Link
                  href={`/services/${category.slug}/${sub.slug}`}
                  title={`Open ${sub.name.en} Detail Page`}
                  className="px-2 py-2 rounded-r-full text-xs bg-slate-50 hover:bg-blue-600 text-slate-500 hover:text-white border border-slate-200 transition"
                >
                  ↗
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. MAIN CONTENT: Left Filter Sidebar + Right Provider Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* LEFT FILTER SIDEBAR matching Image 3 + All Section 3.3 Filters */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                <Filter className="w-4 h-4 text-blue-700" />
                <span>Filter Results</span>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-bold text-blue-600 hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Location Selector */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="text-xs font-bold text-slate-900">Location</div>
              <div className="flex items-center justify-between bg-blue-50/70 px-3 py-2 rounded-xl border border-blue-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <MapPin className="w-3.5 h-3.5 text-blue-700" />
                  <select
                    aria-label="Filter Location"
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value as CitySlug);
                      setCityFilterAll(false);
                    }}
                    className="bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="mohali">Mohali</option>
                    <option value="chandigarh">Chandigarh</option>
                    <option value="hoshiarpur">Hoshiarpur</option>
                  </select>
                </div>
                <button
                  onClick={() => setCityFilterAll(!cityFilterAll)}
                  className="text-[11px] font-semibold text-blue-700 hover:underline"
                >
                  {cityFilterAll ? 'City Only' : 'Show All 3 Cities'}
                </button>
              </div>
            </div>

            {/* Search Within Category */}
            <div className="space-y-1.5 border-b border-slate-100 pb-4">
              <label className="text-xs font-bold text-slate-900 block">
                Search in {category.name.en}
              </label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchWithin}
                  onChange={(e) => setSearchWithin(e.target.value)}
                  placeholder="Name or skill (e.g. Gurmeet, MCB)"
                  className="w-full text-xs bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Service Type Checkboxes */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="text-xs font-bold text-slate-900">
                Service Type
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeSubPill === 'all'}
                  onChange={() => setActiveSubPill('all')}
                  className="rounded text-blue-600 w-4 h-4"
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
                    className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-blue-700"
                  >
                    <input
                      type="checkbox"
                      checked={activeSubPill === keyWord}
                      onChange={() =>
                        setActiveSubPill(
                          activeSubPill === keyWord ? 'all' : keyWord
                        )
                      }
                      className="rounded text-blue-600 w-4 h-4"
                    />
                    <span>{sub.name[language]}</span>
                  </label>
                );
              })}
            </div>

            {/* Availability & Booking Mode */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="text-xs font-bold text-slate-900">
                Availability & Booking Type
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availableTodayOnly}
                  onChange={(e) => setAvailableTodayOnly(e.target.checked)}
                  className="rounded text-blue-600 w-4 h-4"
                />
                <span>Available Today (28)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={instantOnly}
                  onChange={(e) => setInstantOnly(e.target.checked)}
                  className="rounded text-blue-600 w-4 h-4"
                />
                <span>Instant Booking (60-Min Arrival)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={scheduledOnly}
                  onChange={(e) => setScheduledOnly(e.target.checked)}
                  className="rounded text-blue-600 w-4 h-4"
                />
                <span>Scheduled Slot Booking</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-blue-600 w-4 h-4"
                />
                <span>Verified Badge Only</span>
              </label>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="text-xs font-bold text-slate-900">Rating</div>
              {[
                { val: 4.8, label: '4.8 & above' },
                { val: 4.5, label: '4.5 & above' },
                { val: 4.0, label: '4.0 & above' },
              ].map((r) => (
                <label
                  key={r.val}
                  className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={minRating === r.val}
                    onChange={() =>
                      setMinRating(minRating === r.val ? 0 : r.val)
                    }
                    className="rounded text-blue-600 w-4 h-4"
                  />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>

            {/* Experience & Price Range & Provider Type */}
            <div className="space-y-3 border-b border-slate-100 pb-4">
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Minimum Experience
                </label>
                <select
                  aria-label="Minimum Experience"
                  value={minExperience}
                  onChange={(e) => setMinExperience(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 font-medium"
                >
                  <option value={0}>Any Experience</option>
                  <option value={5}>5+ Years Experience</option>
                  <option value={8}>8+ Years Experience</option>
                  <option value={10}>10+ Years Experience</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Visiting Charge Limit: ₹{maxPrice}
                </label>
                <input
                  type="range"
                  min={149}
                  max={399}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>₹149</span>
                  <span>₹199</span>
                  <span>₹249</span>
                  <span>₹399</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Provider Classification
                </label>
                <select
                  aria-label="Provider Classification"
                  value={providerTypeFilter}
                  onChange={(e) =>
                    setProviderTypeFilter(e.target.value as 'all' | ProviderType)
                  }
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 font-medium"
                >
                  <option value="all">All (Individual & Business)</option>
                  <option value="individual">Independent Individual</option>
                  <option value="business">Registered Business / Agency</option>
                </select>
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 block">
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
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="experience">Most Experienced</option>
              </select>
            </div>

            <button
              onClick={() =>
                showToast(
                  `Updated ${category.name.en} results (${filteredProviders.length} matched).`,
                  'success'
                )
              }
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Apply Filters</span>
            </button>
          </aside>

          {/* RIGHT LISTING AREA matching Image 3 */}
          <div className="lg:col-span-9 space-y-5">
            {/* Top Bar: Count + List/Map View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Available {category.name[language]}s in{' '}
                  {cityFilterAll ? 'Punjab (All Launch Cities)' : cityDisplayName}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {filteredProviders.length} verified {category.name.en.toLowerCase()}{' '}
                  professionals ready for doorstep service
                </p>
              </div>

              <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List View</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    viewMode === 'map'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Map View</span>
                </button>
              </div>
            </div>

            {/* Simulated Map View if selected */}
            {viewMode === 'map' && (
              <div className="bg-gradient-to-br from-blue-50 via-slate-100 to-cyan-50 rounded-2xl border border-blue-200 p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-700 text-white text-[11px] font-bold">
                      Simulated Hyperlocal Coverage Map — {cityDisplayName}
                    </span>
                    <p className="text-xs text-slate-600 mt-1">
                      Showing approximate sector & locality pins for {filteredProviders.length} providers (Simulated Frontend Map — No live GPS).
                    </p>
                  </div>
                  <button
                    onClick={() => setViewMode('list')}
                    className="text-xs font-bold text-blue-700 hover:underline"
                  >
                    Back to List View
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {filteredProviders.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-xl p-3.5 border border-blue-200 shadow-sm flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
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
                        className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold"
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
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
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
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
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
              /* HORIZONTAL PROVIDER CARDS matching Image 3 */
              <div className="space-y-4">
                {filteredProviders.map((prov) => (
                  <div
                    key={prov.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover p-5 transition grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
                  >
                    {/* Left Info (5 cols) */}
                    <div className="md:col-span-5 flex items-start gap-4">
                      <img
                        src={prov.avatar}
                        alt={prov.name}
                        className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-50 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {prov.availableToday && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                              • Available Today
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                            {prov.providerType === 'business'
                              ? 'Business Agency'
                              : 'Individual Pro'}
                          </span>
                        </div>

                        <Link
                          href={`/professionals/${prov.slug}`}
                          className="text-lg font-extrabold text-slate-900 hover:text-blue-700 flex items-center gap-1.5 pt-0.5"
                        >
                          <span>{prov.name}</span>
                          {prov.verified && (
                            <BadgeCheck className="w-5 h-5 text-blue-600 fill-blue-100 shrink-0" />
                          )}
                        </Link>

                        <div className="flex items-center gap-1.5 text-xs">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-slate-900">
                            {prov.rating}
                          </span>
                          <span className="text-slate-500">
                            ({prov.reviewCount} reviews)
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prov.experienceYears}+ years experience</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          <span>
                            {prov.cityName}, {prov.distanceKm} km away
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Services Offered Pills (4 cols) */}
                    <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5">
                      <div className="text-xs font-bold text-slate-800 mb-2">
                        Services Offered
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {prov.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg bg-blue-50/70 text-slate-700 text-xs font-medium border border-blue-100/80"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2.5 flex items-center gap-3 text-[11px] text-slate-500">
                        {prov.instantBooking && (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                            <Zap className="w-3 h-3" /> Instant Booking
                          </span>
                        )}
                        {prov.scheduledBooking && (
                          <span className="inline-flex items-center gap-1 text-blue-700 font-medium">
                            <Calendar className="w-3 h-3" /> Scheduled Slots
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Visiting Charge & CTA Buttons (3 cols) */}
                    <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5 flex flex-col justify-between gap-3">
                      <div>
                        <div className="text-xs text-slate-500 font-medium">
                          Visiting Charge
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-2xl font-extrabold text-slate-900">
                            ₹{prov.visitingCharge}
                          </span>
                          <span
                            title="Inspection & visiting charge. Adjusted in final repair bill upon estimate approval."
                            className="text-slate-400 hover:text-blue-600 cursor-help"
                          >
                            <Info className="w-4 h-4" />
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">
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
                          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Now</span>
                        </button>
                        <Link
                          href={`/professionals/${prov.slug}`}
                          className="w-full py-2 px-4 rounded-xl border border-slate-200 hover:border-blue-600 text-slate-700 hover:text-blue-700 text-xs font-bold transition flex items-center justify-center gap-1"
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

            {/* Pagination Bar matching Image 3 */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <div>
                Showing 1 – {filteredProviders.length} of{' '}
                {category.providerCount} {category.name.en.toLowerCase()}s
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"
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
                    className={`w-8 h-8 rounded-lg font-bold transition ${
                      currentPage === num
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"
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
