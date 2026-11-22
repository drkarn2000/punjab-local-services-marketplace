'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Cpu,
  DoorOpen,
  Droplets,
  Fan,
  Filter,
  Flame,
  Hammer,
  Laptop,
  MapPin,
  Plug,
  Search,
  ShieldCheck,
  Smartphone,
  Sofa,
  Sparkles,
  Star,
  Wrench,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  CategorySlug,
  CitySlug,
  ServiceVerticalGroup,
} from '@/types/marketplace';
import {
  getCategoryVerticalGroup,
  renderCategoryIcon,
  SERVICE_VERTICAL_GROUPS,
} from '@/data/serviceCatalogConfig';
import openHandSunsetBg from '../about/images/Chandigarh Open Hand Sunset-1.png';
import twilightVillasBg from '../about/images/Twilight Villas Along a Curving Road-2.png';

export default function AllServicesPage() {
  const {
    language,
    selectedCity,
    setSelectedCity,
    visibleCategories: categories,
    visibleSubcategories: subcategories,
    showToast,
  } = useMarketplace();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVertical, setSelectedVertical] = useState<
    'all' | ServiceVerticalGroup
  >('all');
  const [selectedCategories, setSelectedCategories] = useState<CategorySlug[]>([]);
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'pros-desc'>('popular');
  const [browseSlideIndex, setBrowseSlideIndex] = useState(0);
  const [browsePaused, setBrowsePaused] = useState(false);
  const [mosaicIdx, setMosaicIdx] = useState(0);
  const [mosaicPaused, setMosaicPaused] = useState(false);

  const toggleCategory = (slug: CategorySlug) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const filteredCategories = useMemo(() => {
    let list = [...categories];
    if (selectedVertical !== 'all') {
      list = list.filter(
        (c) => getCategoryVerticalGroup(c) === selectedVertical
      );
    }
    if (selectedCategories.length > 0) {
      list = list.filter((c) => selectedCategories.includes(c.slug));
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.en.toLowerCase().includes(q) ||
          c.tagline.en.toLowerCase().includes(q) ||
          subcategories.some(
            (s) =>
              s.categorySlug === c.slug &&
              (s.name.en.toLowerCase().includes(q) ||
                s.shortDesc.en.toLowerCase().includes(q))
          )
      );
    }
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.baseVisitingFee - b.baseVisitingFee);
    } else if (sortBy === 'pros-desc') {
      list.sort((a, b) => b.providerCount - a.providerCount);
    }
    return list;
  }, [categories, subcategories, selectedCategories, searchTerm, sortBy]);

  useEffect(() => {
    setBrowseSlideIndex(0);
  }, [filteredCategories.length]);

  useEffect(() => {
    if (filteredCategories.length <= 1 || browsePaused) return;
    const timer = setInterval(() => {
      setBrowseSlideIndex((prev) => (prev + 1) % filteredCategories.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [filteredCategories.length, browsePaused]);

  const displayedMosaicCategories =
    categories.length <= 5
      ? categories
      : Array.from(
          { length: 5 },
          (_, offset) => categories[(mosaicIdx + offset) % categories.length]
        );

  useEffect(() => {
    if (categories.length <= 5 || mosaicPaused) return;
    const timer = setInterval(() => {
      setMosaicIdx((prev) => (prev + 1) % categories.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [categories.length, mosaicPaused]);

  const filteredSubcategories = useMemo(() => {
    return subcategories.filter((sub) => {
      if (selectedVertical !== 'all') {
        const parentCat = categories.find((c) => c.slug === sub.categorySlug);
        if (parentCat && getCategoryVerticalGroup(parentCat) !== selectedVertical) {
          return false;
        }
      }
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(sub.categorySlug)
      ) {
        return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          sub.name.en.toLowerCase().includes(q) ||
          sub.shortDesc.en.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [subcategories, selectedCategories, searchTerm]);

  // Icons rendered centrally via renderCategoryIcon in serviceCatalogConfig.ts

  const popularTiles = [
    {
      label: 'Fan Installation',
      href: '/services/electrician/fan-installation-repair',
      icon: <Fan className="w-6 h-6 text-blue-700" />,
    },
    {
      label: 'Water Leakage Repair',
      href: '/services/plumber/pipe-leakage',
      icon: <Droplets className="w-6 h-6 text-blue-700" />,
    },
    {
      label: 'Furniture Repair',
      href: '/services/carpenter/furniture-repair',
      icon: <Sofa className="w-6 h-6 text-blue-700" />,
    },
    {
      label: 'Laptop Service',
      href: '/services/computer-repair/laptop-repair',
      icon: <Laptop className="w-6 h-6 text-blue-700" />,
    },
    {
      label: 'Mobile Screen Repair',
      href: '/services/mobile-repair/screen-replacement',
      icon: <Smartphone className="w-6 h-6 text-blue-700" />,
    },
    {
      label: 'Switch & Socket Repair',
      href: '/services/electrician/switch-socket-repair',
      icon: <Plug className="w-6 h-6 text-blue-700" />,
    },
    {
      label: 'Pipe Fitting',
      href: '/services/plumber/bathroom-plumbing',
      icon: <Wrench className="w-6 h-6 text-blue-700" />,
    },
    {
      label: 'Door & Lock Repair',
      href: '/services/carpenter/lock-handle-installation',
      icon: <DoorOpen className="w-6 h-6 text-blue-700" />,
    },
  ];

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setAvailableTodayOnly(false);
    setMinRating(0);
    setSearchTerm('');
    setSortBy('popular');
    showToast('Service filters reset.', 'info');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* DISTINCT EDITORIAL DIRECTORY HERO BANNER (Modern Home BG + Increased Height) */}
      <section className="relative text-white pt-16 lg:pt-20 pb-36 lg:pb-44 overflow-hidden border-b border-emerald-400/25">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
          alt="Modern Punjab Residential Home"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041418]/75 via-[#061c22]/55 to-[#041418]/80 pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          {/* Centered Header + Search Command Bar */}
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <nav className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-slate-200 font-medium">
                <Link href="/" className="hover:text-emerald-300 transition">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-emerald-300 font-bold">Services Directory</span>
              </nav>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-300/30 text-emerald-200 text-[11px] font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                438+ Verified Pros • Same-Day Visit
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.12]">
              Every Home &amp; Tech Service,{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                One Verified Directory
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Browse all 5 core categories and 40+ specialized doorstep services across Mohali, Chandigarh &amp; Hoshiarpur.
            </p>

            {/* Sleek Glassmorphic Command Search Bar */}
            <div className="bg-white/10 backdrop-blur-xl border border-emerald-300/35 rounded-2xl p-2 shadow-[0_18px_50px_rgba(0,0,0,0.45)] flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-3xl mx-auto">
              <div className="flex items-center gap-2 px-3 py-2 sm:border-r border-white/15 min-w-[150px]">
                <MapPin className="w-4 h-4 text-emerald-300 shrink-0" />
                <select
                  aria-label="Select City"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value as CitySlug)}
                  className="bg-transparent font-extrabold text-xs sm:text-sm text-white focus:outline-none cursor-pointer w-full"
                >
                  <option value="mohali" className="bg-slate-900 text-white">Mohali</option>
                  <option value="chandigarh" className="bg-slate-900 text-white">Chandigarh</option>
                  <option value="hoshiarpur" className="bg-slate-900 text-white">Hoshiarpur</option>
                </select>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 flex-1">
                <Search className="w-4 h-4 text-emerald-200 shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search any service (e.g. Fan repair, Pipe leakage, Laptop OS...)"
                  className="w-full text-xs sm:text-sm font-medium bg-transparent text-white placeholder:text-slate-300 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  showToast(
                    `Showing services matching "${searchTerm || 'All Categories'}" in ${selectedCity.toUpperCase()}`,
                    'info'
                  )
                }
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-1.5 shadow-lg transition shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Find Services</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Category Mosaic Slider (Single Row, Auto-Slides Every 2s) */}
      <section
        onMouseEnter={() => setMosaicPaused(true)}
        onMouseLeave={() => setMosaicPaused(false)}
        className="w-full px-4 sm:px-6 lg:px-8 -mt-14 relative z-20 space-y-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {displayedMosaicCategories.map((c) => (
            <Link
              key={c.id}
              href={`/services/${c.slug}`}
              className="relative group rounded-2xl bg-gradient-to-br from-[#041418] via-[#092930] to-[#0f1c38] border border-emerald-400/35 hover:border-emerald-300/80 px-4 pt-7 pb-4 shadow-[0_14px_34px_rgba(4,20,24,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(16,185,129,0.4)] flex flex-col justify-between gap-3"
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <img
                  src={c.cardImage}
                  alt={c.name[language]}
                  className="w-full h-full object-cover opacity-35 group-hover:opacity-45 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041418]/95 via-[#092930]/75 to-[#0f1c38]/55" />
              </div>

              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-full bg-[#041418] border border-emerald-400/50 text-white group-hover:text-emerald-300 text-xs font-extrabold shadow-lg whitespace-nowrap transition-colors">
                {c.name[language]}
              </span>
              <div className="relative z-10 flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center group-hover:scale-110 transition">
                  {renderCategoryIcon(c.iconName || c.slug, 'w-6 h-6')}
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 text-[10px] font-extrabold">
                  ₹{c.baseVisitingFee} Visit
                </span>
              </div>
              <div className="relative z-10 text-[11px] text-slate-300 flex items-center justify-between pt-1 border-t border-white/10">
                <span>{c.providerCount} Verified Pros</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {categories.length > 5 && (
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() =>
                setMosaicIdx(
                  (prev) => (prev - 1 + categories.length) % categories.length
                )
              }
              aria-label="Previous category slide"
              className="w-8 h-8 rounded-full bg-[#041418] border border-emerald-400/50 hover:border-emerald-300 text-emerald-300 flex items-center justify-center shadow transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {categories.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setMosaicIdx(idx)}
                  aria-label={`Show ${c.name.en}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === mosaicIdx % categories.length
                      ? 'w-5 bg-emerald-600'
                      : 'w-1.5 bg-slate-300 hover:bg-emerald-400'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setMosaicIdx((prev) => (prev + 1) % categories.length)
              }
              aria-label="Next category slide"
              className="w-8 h-8 rounded-full bg-[#041418] border border-emerald-400/50 hover:border-emerald-300 text-emerald-300 flex items-center justify-center shadow transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* MAIN CONTENT: Left Filter Sidebar + Right Browse Services */}
      <div className="w-full px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* LEFT FILTER SIDEBAR (Midnight Emerald-Teal Theme) */}
          <aside className="lg:col-span-3 bg-gradient-to-b from-[#041418] via-[#092930] to-[#0f1c38] text-white rounded-3xl border border-emerald-400/30 shadow-2xl p-5 space-y-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2 font-extrabold text-white text-base">
                <Filter className="w-4 h-4 text-emerald-300" />
                <span>Filter Services</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-extrabold">
                LIVE
              </span>
            </div>

            {/* City Filter */}
            <div className="space-y-2 border-b border-white/15 pb-4">
              <div className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                City
              </div>
              {(
                [
                  { slug: 'mohali', label: 'Mohali (124)' },
                  { slug: 'chandigarh', label: 'Chandigarh (218)' },
                  { slug: 'hoshiarpur', label: 'Hoshiarpur (96)' },
                ] as { slug: CitySlug; label: string }[]
              ).map((c) => (
                <label
                  key={c.slug}
                  className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer hover:text-emerald-300 transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedCity === c.slug}
                    onChange={() => setSelectedCity(c.slug)}
                    className="rounded border-emerald-400/50 bg-slate-900 accent-emerald-400 w-4 h-4"
                  />
                  <span className="font-medium">{c.label}</span>
                </label>
              ))}
            </div>

            {/* Vertical Group Filter */}
            <div className="space-y-2 border-b border-white/15 pb-4">
              <div className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                Service Vertical
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedVertical('all')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition ${
                    selectedVertical === 'all'
                      ? 'bg-emerald-400 text-slate-950 border-emerald-200'
                      : 'bg-white/5 text-slate-200 border-white/15 hover:border-emerald-300/60'
                  }`}
                >
                  All ({categories.length})
                </button>
                {SERVICE_VERTICAL_GROUPS.map((grp) => (
                  <button
                    key={grp.id}
                    type="button"
                    onClick={() => setSelectedVertical(grp.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition ${
                      selectedVertical === grp.id
                        ? 'bg-emerald-400 text-slate-950 border-emerald-200'
                        : 'bg-white/5 text-slate-200 border-white/15 hover:border-emerald-300/60'
                    }`}
                  >
                    {grp.shortTitle}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Category Filter */}
            <div className="space-y-2 border-b border-white/15 pb-4 max-h-60 overflow-y-auto pr-1">
              <div className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                Service Category
              </div>
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer hover:text-emerald-300 transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.slug)}
                    onChange={() => toggleCategory(cat.slug)}
                    className="rounded border-emerald-400/50 bg-slate-900 accent-emerald-400 w-4 h-4"
                  />
                  <span className="font-medium">
                    {cat.name[language]} ({cat.providerCount})
                  </span>
                </label>
              ))}
            </div>

            {/* Availability */}
            <div className="space-y-2 border-b border-white/15 pb-4">
              <div className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                Availability
              </div>
              <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer hover:text-emerald-300 transition">
                <input
                  type="checkbox"
                  checked={availableTodayOnly}
                  onChange={(e) => setAvailableTodayOnly(e.target.checked)}
                  className="rounded border-emerald-400/50 bg-slate-900 accent-emerald-400 w-4 h-4"
                />
                <span className="font-medium">Available Today (182)</span>
              </label>
            </div>

            {/* Rating */}
            <div className="space-y-2 border-b border-white/15 pb-4">
              <div className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                Rating
              </div>
              {[
                { val: 4.5, label: '4.5 & above (148)' },
                { val: 4.0, label: '4.0 & above (201)' },
                { val: 3.5, label: '3.5 & above (248)' },
              ].map((r) => (
                <label
                  key={r.val}
                  className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer hover:text-emerald-300 transition"
                >
                  <input
                    type="checkbox"
                    checked={minRating === r.val}
                    onChange={() =>
                      setMinRating(minRating === r.val ? 0 : r.val)
                    }
                    className="rounded border-emerald-400/50 bg-slate-900 accent-emerald-400 w-4 h-4"
                  />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-medium">{r.label}</span>
                </label>
              ))}
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <div className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                Sort By
              </div>
              <select
                aria-label="Sort Services By"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'popular' | 'price-asc' | 'pros-desc')
                }
                className="w-full px-3 py-2 rounded-xl border border-emerald-400/35 text-xs font-bold text-white bg-slate-900/90 focus:outline-none focus:border-emerald-300 cursor-pointer"
              >
                <option value="popular" className="bg-slate-900 text-white">Most Popular</option>
                <option value="price-asc" className="bg-slate-900 text-white">Visiting Fee: Low to High</option>
                <option value="pros-desc" className="bg-slate-900 text-white">Most Verified Professionals</option>
              </select>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() =>
                  showToast('Filters applied to service directory.', 'success')
                }
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Apply Filters</span>
              </button>
              <button
                onClick={clearAllFilters}
                className="w-full py-1.5 text-xs font-bold text-emerald-300 hover:text-white hover:underline text-center transition"
              >
                Clear All
              </button>
            </div>
          </aside>

          {/* RIGHT CONTENT AREA */}
          <div className="lg:col-span-9 space-y-10 min-w-0">
            {/* Browse Services Section — Pure CSS Custom-Effects Showcase Slider */}
            <div>
              <div className="mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Browse Services
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Explore our service categories and book the right professional for your needs.
                  </p>
                </div>
                {filteredCategories.length > 1 && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setBrowseSlideIndex((prev) =>
                          prev <= 0 ? filteredCategories.length - 1 : prev - 1
                        )
                      }
                      className="w-9 h-9 rounded-full border border-slate-300 bg-white hover:bg-emerald-50 hover:border-emerald-400 text-slate-800 flex items-center justify-center shadow-sm transition"
                      aria-label="Previous service card"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setBrowseSlideIndex(
                          (prev) => (prev + 1) % filteredCategories.length
                        )
                      }
                      className="w-9 h-9 rounded-full border border-slate-300 bg-white hover:bg-emerald-50 hover:border-emerald-400 text-slate-800 flex items-center justify-center shadow-sm transition"
                      aria-label="Next service card"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {filteredCategories.length > 0 && (
                <div
                  className="relative md:mx-4 my-5"
                  onMouseEnter={() => setBrowsePaused(true)}
                  onMouseLeave={() => setBrowsePaused(false)}
                >
                  {/* Split Hero-Banner Slider Viewport (Left Dark Panel + Right Half Service Image) */}
                  <div className="relative h-[340px] sm:h-[360px] rounded-3xl overflow-hidden border border-emerald-400/35 bg-[#031618] shadow-2xl">
                    {filteredCategories.map((cat, idx) => {
                      const isActive = idx === browseSlideIndex % filteredCategories.length;
                      return (
                        <div
                          key={cat.id}
                          className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isActive
                              ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                              : 'opacity-0 scale-105 z-0 pointer-events-none'
                          }`}
                        >
                          {/* Right-Half Full-Bleed Service Image */}
                          <div className="absolute inset-y-0 right-0 w-full md:w-[56%] overflow-hidden pointer-events-none">
                            <img
                              src={cat.heroImage || cat.cardImage}
                              alt={cat.name[language]}
                              className={`w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-out ${
                                isActive ? 'scale-100' : 'scale-110'
                              }`}
                            />
                            {/* Mobile dark readability scrim */}
                            <div className="md:hidden absolute inset-0 bg-[#031618]/80" />
                            {/* Desktop left-edge blend + glowing curved emerald arc */}
                            <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#031618] via-[#031618]/70 to-transparent" />
                            <div className="hidden md:block absolute -top-16 -bottom-16 left-2 w-24 rounded-l-[100%] border-l-2 border-emerald-400/90 shadow-[-10px_0_28px_rgba(52,211,153,0.55)] pointer-events-none" />
                          </div>

                          {/* Left Content Column */}
                          <div className="relative z-10 h-full w-full md:w-[54%] px-7 sm:px-12 py-7 flex flex-col justify-center items-start gap-3.5">
                            <div
                              className={`flex flex-wrap items-center gap-2 transition-all duration-700 ${
                                isActive
                                  ? 'opacity-100 translate-y-0'
                                  : 'opacity-0 translate-y-4'
                              }`}
                            >
                              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#36f1a2] text-slate-950 text-xs font-extrabold shadow">
                                <Star className="w-3.5 h-3.5 fill-slate-950" />
                                <span>Featured Service</span>
                              </span>
                              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-xs font-bold">
                                ₹{cat.baseVisitingFee} Visit • {cat.providerCount} Pros
                              </span>
                            </div>

                            <div className="space-y-1.5">
                              <h3
                                className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight transition-all duration-700 delay-100 ${
                                  isActive
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-4'
                                }`}
                              >
                                {cat.name[language]}
                              </h3>
                              <p
                                className={`text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-2 max-w-md transition-all duration-700 delay-150 ${
                                  isActive
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-4'
                                }`}
                              >
                                {cat.description[language]}
                              </p>
                            </div>

                            {/* 3 Inline Trust Highlights */}
                            <div
                              className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] sm:text-xs font-semibold text-emerald-100 transition-all duration-700 delay-150 ${
                                isActive
                                  ? 'opacity-100 translate-y-0'
                                  : 'opacity-0 translate-y-4'
                              }`}
                            >
                              <span className="inline-flex items-center gap-1.5">
                                <BadgeCheck className="w-4 h-4 text-[#36f1a2]" />
                                Verified Pros
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-[#36f1a2]" />
                                Fast Response
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-[#36f1a2]" />
                                On-site Service
                              </span>
                            </div>

                            <div
                              className={`pt-1 flex items-center gap-3 transition-all duration-700 delay-200 ${
                                isActive
                                  ? 'opacity-100 translate-y-0'
                                  : 'opacity-0 translate-y-4'
                              }`}
                            >
                              <Link
                                href={`/services/${cat.slug}`}
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#36f1a2] hover:bg-emerald-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-[0_8px_24px_rgba(54,241,162,0.35)] transition"
                              >
                                <span>Book Now</span>
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* White Circular Prev / Next Edge Buttons */}
                  {filteredCategories.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setBrowseSlideIndex((prev) =>
                            prev <= 0 ? filteredCategories.length - 1 : prev - 1
                          )
                        }
                        aria-label="Previous featured service"
                        className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white hover:bg-emerald-50 text-slate-900 border border-slate-200 shadow-lg flex items-center justify-center transition"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setBrowseSlideIndex(
                            (prev) => (prev + 1) % filteredCategories.length
                          )
                        }
                        aria-label="Next featured service"
                        className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white hover:bg-emerald-50 text-slate-900 border border-slate-200 shadow-lg flex items-center justify-center transition"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Clean Pagination Dots */}
                      <div className="flex items-center justify-center gap-1.5 mt-3">
                        {filteredCategories.map((c, idx) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setBrowseSlideIndex(idx)}
                            aria-label={`Slide ${idx + 1}: ${c.name.en}`}
                            className={`h-2 rounded-full transition-all ${
                              idx === browseSlideIndex % filteredCategories.length
                                ? 'w-5 bg-emerald-600'
                                : 'w-2 bg-slate-300 hover:bg-emerald-400'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Popular Services — Animated Glowing Single-Line Strip */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Flame className="w-5 h-5 text-orange-500 fill-orange-400" />
                    <span>Popular Services</span>
                  </h2>
                  <p className="text-xs text-slate-600">
                    Most booked services by customers in your area — hover any service to pause.
                  </p>
                </div>
                <Link
                  href="/book"
                  className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1 shrink-0"
                >
                  <span>Book Any Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#041418] via-[#092930] to-[#0f1c38] border border-emerald-400/35 p-3.5 shadow-[0_14px_34px_rgba(4,20,24,0.35)]">
                <div className="animate-popular-strip gap-3.5">
                  {[...popularTiles, ...popularTiles].map((tile, idx) => (
                    <Link
                      key={`${tile.label}-${idx}`}
                      href={tile.href}
                      className="group inline-flex items-center gap-2.5 whitespace-nowrap px-4 py-2.5 rounded-xl bg-white/10 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 border border-white/15 hover:border-emerald-200 text-white hover:text-slate-950 font-bold text-xs shadow-sm hover:shadow-[0_0_22px_rgba(16,185,129,0.65)] transition-all duration-300 shrink-0"
                    >
                      <span className="w-7 h-7 rounded-lg bg-white/15 group-hover:bg-slate-950/15 flex items-center justify-center shrink-0">
                        {tile.icon}
                      </span>
                      <span className="whitespace-nowrap">{tile.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Complete Subcategories Directory (All 40 Subcategories grouped by Category) */}
            <div className="space-y-9 pt-2">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Complete Specialized Subcategory Directory ({filteredSubcategories.length} Services)
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Click any specialized service below to view problems covered, upfront visiting charges, FAQs, and available technicians.
                </p>
              </div>

              {filteredCategories.map((cat, catIdx) => {
                const catSubs = filteredSubcategories.filter(
                  (s) => s.categorySlug === cat.slug
                );
                if (catSubs.length === 0) return null;
                const bgImage =
                  catIdx % 2 === 0 ? twilightVillasBg.src : openHandSunsetBg.src;
                return (
                  <div
                    key={cat.id}
                    className="relative text-white rounded-3xl border border-emerald-400/45 px-5 pt-7 pb-6 shadow-[0_18px_45px_rgba(4,20,24,0.22)]"
                  >
                    {/* Clipped Background Image Layer (keeps top border pills unclipped) */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                      <img
                        src={bgImage}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Top-Left Border Title Pill */}
                    <div className="sm:absolute sm:-top-4 sm:left-5 z-20 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 border border-emerald-200 text-slate-950 text-xs font-extrabold shadow-lg">
                      <span className="scale-75 -my-1 bg-[#041418] p-1 rounded-md">
                        {renderCategoryIcon(cat.iconName || cat.slug, 'w-5 h-5')}
                      </span>
                      <span>{cat.name[language]} Subcategories</span>
                    </div>

                    {/* Top-Right Border Listing Link Pill */}
                    <Link
                      href={`/services/${cat.slug}`}
                      className="sm:absolute sm:-top-3.5 sm:right-5 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 border border-emerald-200 text-[11px] font-extrabold shadow-lg transition-all"
                    >
                      <span>View {cat.name.en} Listing Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="relative z-10 border-b border-white/20 pb-2.5 flex items-center justify-between">
                      <p className="text-xs font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        Base Visiting Charge: ₹{cat.baseVisitingFee} •{' '}
                        {cat.providerCount} Verified Professionals
                      </p>
                    </div>

                    <div className="relative z-10 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1 pb-1">
                      {catSubs.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/services/${cat.slug}/${sub.slug}`}
                          className="p-4 rounded-2xl bg-gradient-to-br from-[#041418] via-[#092930] to-[#0f1c38] text-white border border-emerald-400/30 hover:border-emerald-300/80 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(16,185,129,0.35)] transition-all duration-300 flex flex-col justify-between gap-3 group"
                        >
                          {/* Top Centered Subcategory Name Inside Card */}
                          <span className="self-center px-3 py-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 border border-emerald-200 text-slate-950 text-[11px] font-extrabold shadow-sm whitespace-nowrap max-w-full truncate">
                            {sub.name[language]}
                          </span>

                          <p className="text-[11px] text-slate-200 text-center leading-relaxed line-clamp-2">
                            {sub.shortDesc.en}
                          </p>

                          {/* Bottom Visit Fee & Duration Inside Card */}
                          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-[10px]">
                            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 border border-emerald-200 font-extrabold text-slate-950 shadow-sm">
                              Visit ₹{sub.startingPrice}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 border border-emerald-200 font-extrabold text-slate-950 shadow-sm">
                              ~{sub.estimatedDuration}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
