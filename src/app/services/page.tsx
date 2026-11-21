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
import { CategorySlug, CitySlug } from '@/types/marketplace';
import openHandSunsetBg from '../about/images/Chandigarh Open Hand Sunset-1.png';
import twilightVillasBg from '../about/images/Twilight Villas Along a Curving Road-2.png';

export default function AllServicesPage() {
  const {
    language,
    selectedCity,
    setSelectedCity,
    categories,
    subcategories,
    showToast,
  } = useMarketplace();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<CategorySlug[]>([]);
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'pros-desc'>('popular');
  const [browseSlideIndex, setBrowseSlideIndex] = useState(0);
  const [browsePaused, setBrowsePaused] = useState(false);

  const toggleCategory = (slug: CategorySlug) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const filteredCategories = useMemo(() => {
    let list = [...categories];
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

  const filteredSubcategories = useMemo(() => {
    return subcategories.filter((sub) => {
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

  const categoryIcon: Record<CategorySlug, React.ReactNode> = {
    electrician: <Zap className="w-6 h-6 text-amber-500 fill-amber-400" />,
    plumber: <Droplets className="w-6 h-6 text-sky-500 fill-sky-400" />,
    carpenter: <Hammer className="w-6 h-6 text-orange-500" />,
    'computer-repair': <Laptop className="w-6 h-6 text-indigo-600" />,
    'mobile-repair': <Smartphone className="w-6 h-6 text-blue-600" />,
  };

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

      {/* 5 Interactive Category Mosaic Tiles (Half Inside Hero, Half Below Border) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 -mt-14 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {categories.map((c) => (
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
                  {categoryIcon[c.slug]}
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

            {/* Service Category Filter */}
            <div className="space-y-2 border-b border-white/15 pb-4">
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
                  className="relative md:mx-6 my-6"
                  onMouseEnter={() => setBrowsePaused(true)}
                  onMouseLeave={() => setBrowsePaused(false)}
                >
                  {/* Layered Custom-Effects Viewport (Centered Content) */}
                  <div className="relative h-[340px] sm:h-[360px] rounded-3xl overflow-hidden border border-emerald-400/35 bg-[#041418] shadow-2xl">
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
                          {/* Background Image with Slow Zoom Reveal */}
                          <img
                            src={cat.cardImage}
                            alt={cat.name[language]}
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out ${
                              isActive ? 'scale-100 opacity-50' : 'scale-110 opacity-20'
                            }`}
                          />

                          {/* Balanced Radial/Vertical Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-[#041418]/75 via-[#092930]/85 to-[#041418]/90" />

                          {/* Centered Staggered Content Layer */}
                          <div className="relative z-10 h-full px-6 sm:px-16 md:px-28 py-8 flex flex-col items-center justify-center text-center gap-4">
                            <div
                              className={`flex flex-wrap items-center justify-center gap-3 transition-all duration-700 ${
                                isActive
                                  ? 'opacity-100 translate-y-0'
                                  : 'opacity-0 translate-y-4'
                              }`}
                            >
                              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg">
                                {categoryIcon[cat.slug]}
                              </div>
                              <span className="px-3.5 py-1 rounded-full bg-emerald-400 text-slate-950 text-xs font-extrabold shadow">
                                ₹{cat.baseVisitingFee} Visit
                              </span>
                              <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-xs font-bold">
                                {cat.providerCount} Verified Pros
                              </span>
                            </div>

                            <div className="space-y-2 max-w-2xl">
                              <h3
                                className={`text-2xl sm:text-4xl font-extrabold text-white tracking-tight transition-all duration-700 delay-100 ${
                                  isActive
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-4'
                                }`}
                              >
                                {cat.name[language]}
                              </h3>
                              <p
                                className={`text-sm sm:text-base text-slate-200 leading-relaxed line-clamp-2 transition-all duration-700 delay-150 ${
                                  isActive
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-4'
                                }`}
                              >
                                {cat.tagline[language]} — {cat.description[language]}
                              </p>
                            </div>

                            <div
                              className={`flex items-center justify-center gap-3 transition-all duration-700 delay-200 ${
                                isActive
                                  ? 'opacity-100 translate-y-0'
                                  : 'opacity-0 translate-y-4'
                              }`}
                            >
                              <Link
                                href={`/services/${cat.slug}`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition"
                              >
                                <span>Explore {cat.name[language]}</span>
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                              <span className="text-xs font-semibold text-emerald-200/80">
                                {idx + 1} / {filteredCategories.length}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Interactive Category Pills Straddling All 4 Borders (Desktop) */}
                  {filteredCategories.length > 1 && (
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:mt-0 md:block">
                      {filteredCategories.map((cat, idx) => {
                        const isActive =
                          idx === browseSlideIndex % filteredCategories.length;
                        const borderPosClasses = [
                          'md:absolute md:-left-5 md:top-1/2 md:-translate-y-1/2',
                          'md:absolute md:left-[26%] md:-bottom-4 md:-translate-x-1/2',
                          'md:absolute md:right-[26%] md:-bottom-4 md:translate-x-1/2',
                          'md:absolute md:left-1/2 md:-top-4 md:-translate-x-1/2',
                          'md:absolute md:-right-5 md:top-1/2 md:-translate-y-1/2',
                        ];
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setBrowseSlideIndex(idx)}
                            className={`z-30 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-extrabold transition-all shadow-lg whitespace-nowrap ${
                              borderPosClasses[idx] ?? ''
                            } ${
                              isActive
                                ? 'bg-[#041418] text-emerald-300 border border-emerald-400 shadow-[0_8px_24px_rgba(16,185,129,0.45)] scale-105'
                                : 'bg-white text-slate-800 border border-emerald-300/60 hover:bg-emerald-50 hover:text-emerald-800'
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full transition-colors ${
                                isActive ? 'bg-emerald-400' : 'bg-slate-300'
                              }`}
                            />
                            <span>{cat.name[language]}</span>
                          </button>
                        );
                      })}
                    </div>
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
                      <span className="scale-75 -my-1 bg-[#041418] p-1 rounded-md">{categoryIcon[cat.slug]}</span>
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

                    <div className="relative z-10 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 pt-3 pb-3">
                      {catSubs.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/services/${cat.slug}/${sub.slug}`}
                          className="relative px-4 pt-6 pb-7 rounded-2xl bg-gradient-to-br from-[#041418] via-[#092930] to-[#0f1c38] text-white border border-emerald-400/30 hover:border-emerald-300/80 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(16,185,129,0.35)] transition-all duration-300 flex flex-col justify-center group"
                        >
                          {/* Top Border Centered Subcategory Name */}
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 border border-emerald-200 text-slate-950 text-[11px] font-extrabold shadow-md whitespace-nowrap max-w-[92%] truncate transition-colors">
                            {sub.name[language]}
                          </span>

                          <p className="text-[11px] text-slate-200 text-center leading-relaxed line-clamp-2">
                            {sub.shortDesc.en}
                          </p>

                          {/* Bottom Border Visit Fee & Duration Pills */}
                          <div className="absolute -bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 text-[10px]">
                            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 border border-emerald-200 font-extrabold text-slate-950 shadow">
                              Visit ₹{sub.startingPrice}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 border border-emerald-200 font-extrabold text-slate-950 shadow">
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
