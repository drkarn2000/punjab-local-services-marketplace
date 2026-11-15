'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
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
  Smartphone,
  Sofa,
  Star,
  Wrench,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CategorySlug, CitySlug } from '@/types/marketplace';

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
      {/* HERO BANNER matching Image 2 */}
      <section className="bg-gradient-to-r from-[#092154] via-[#123885] to-[#2356c5] text-white py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-xs text-blue-200 font-medium">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white font-semibold">Services</span>
              </nav>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Our Services
              </h1>
              <p className="text-sm sm:text-base text-blue-100 max-w-xl leading-relaxed">
                Choose from a wide range of trusted home and tech services from
                verified professionals in Mohali, Chandigarh & Hoshiarpur.
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl text-slate-800">
                <div className="flex items-center gap-2 px-3 py-2 sm:border-r border-slate-200 min-w-[140px]">
                  <MapPin className="w-4 h-4 text-blue-700 shrink-0" />
                  <select
                    aria-label="Select City"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value as CitySlug)}
                    className="bg-transparent font-bold text-xs sm:text-sm text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="mohali">Mohali</option>
                    <option value="chandigarh">Chandigarh</option>
                    <option value="hoshiarpur">Hoshiarpur</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 flex-1">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a service (e.g. Fan repair, Laptop service...)"
                    className="w-full text-xs sm:text-sm text-slate-900 focus:outline-none"
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
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-1.5 transition"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Right Banner Visual */}
            <div className="lg:col-span-5 relative hidden lg:flex justify-end">
              <div className="relative">
                <div className="absolute -top-2 -right-2 z-20 transform -rotate-3 bg-amber-300 text-slate-950 px-4 py-2 rounded-2xl shadow-lg font-extrabold text-xs leading-tight">
                  Book Local
                  <br />
                  Professionals
                  <br />
                  in Your City
                </div>
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=80"
                  alt="Punjab Services Technician"
                  className="w-80 h-52 object-cover rounded-2xl border-2 border-white/25 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT: Left Filter Sidebar + Right Browse Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* LEFT FILTER SIDEBAR matching Image 2 */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 space-y-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base">
                <Filter className="w-4 h-4 text-blue-700" />
                <span>Filter Services</span>
              </div>
            </div>

            {/* City Filter */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
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
                  className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-blue-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedCity === c.slug}
                    onChange={() => setSelectedCity(c.slug)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="font-medium">{c.label}</span>
                </label>
              ))}
            </div>

            {/* Service Category Filter */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Service Category
              </div>
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-blue-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.slug)}
                    onChange={() => toggleCategory(cat.slug)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="font-medium">
                    {cat.name[language]} ({cat.providerCount})
                  </span>
                </label>
              ))}
            </div>

            {/* Availability */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Availability
              </div>
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availableTodayOnly}
                  onChange={(e) => setAvailableTodayOnly(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="font-medium">Available Today (182)</span>
              </label>
            </div>

            {/* Rating */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Rating
              </div>
              {[
                { val: 4.5, label: '4.5 & above (148)' },
                { val: 4.0, label: '4.0 & above (201)' },
                { val: 3.5, label: '3.5 & above (248)' },
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
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-medium">{r.label}</span>
                </label>
              ))}
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Sort By
              </div>
              <select
                aria-label="Sort Services By"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'popular' | 'price-asc' | 'pros-desc')
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:border-blue-600"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Visiting Fee: Low to High</option>
                <option value="pros-desc">Most Verified Professionals</option>
              </select>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() =>
                  showToast('Filters applied to service directory.', 'success')
                }
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Apply Filters</span>
              </button>
              <button
                onClick={clearAllFilters}
                className="w-full py-1.5 text-xs font-bold text-blue-700 hover:underline text-center"
              >
                Clear All
              </button>
            </div>
          </aside>

          {/* RIGHT CONTENT AREA matching Image 2 */}
          <div className="lg:col-span-9 space-y-10">
            {/* Browse Services Section */}
            <div>
              <div className="mb-5">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Browse Services
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Explore our service categories and book the right professional
                  for your needs.
                </p>
              </div>

              {/* 3 + 2 Grid Layout matching Image 2 */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                {filteredCategories.map((cat, index) => {
                  const colSpan = index < 3 ? 'md:col-span-2' : 'md:col-span-3';
                  return (
                    <Link
                      key={cat.id}
                      href={`/services/${cat.slug}`}
                      className={`${colSpan} group bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover overflow-hidden flex flex-col sm:flex-row transition`}
                    >
                      <div className="sm:w-2/5 h-44 sm:h-auto overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={cat.cardImage}
                          alt={cat.name[language]}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="mb-1.5">{categoryIcon[cat.slug]}</div>
                          <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-700 transition">
                            {cat.name[language]}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {cat.tagline[language]}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px]">
                            {cat.providerCount} Professionals
                          </span>
                          <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 text-slate-700 group-hover:text-white flex items-center justify-center transition">
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Popular Services 8 Quick Tiles matching Image 2 */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Flame className="w-5 h-5 text-orange-500 fill-orange-400" />
                    <span>Popular Services</span>
                  </h2>
                  <p className="text-xs text-slate-600">
                    Most booked services by customers in your area.
                  </p>
                </div>
                <Link
                  href="/book"
                  className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
                >
                  <span>Book Any Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {popularTiles.map((tile) => (
                  <Link
                    key={tile.label}
                    href={tile.href}
                    className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-sm hover:border-blue-500 hover:shadow-md transition flex flex-col items-center text-center gap-2 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-blue-600/10 flex items-center justify-center">
                      {tile.icon}
                    </div>
                    <span className="text-[11px] font-bold text-slate-800 group-hover:text-blue-700 leading-tight">
                      {tile.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Complete Subcategories Directory (All 40 Subcategories grouped by Category) */}
            <div className="space-y-6 pt-2">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Complete Specialized Subcategory Directory ({filteredSubcategories.length} Services)
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Click any specialized service below to view problems covered, upfront visiting charges, FAQs, and available technicians.
                </p>
              </div>

              {filteredCategories.map((cat) => {
                const catSubs = filteredSubcategories.filter(
                  (s) => s.categorySlug === cat.slug
                );
                if (catSubs.length === 0) return null;
                return (
                  <div
                    key={cat.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        {categoryIcon[cat.slug]}
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-base">
                            {cat.name[language]} Subcategories
                          </h3>
                          <p className="text-xs text-slate-500">
                            Base Visiting Charge: ₹{cat.baseVisitingFee} •{' '}
                            {cat.providerCount} Verified Professionals
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/services/${cat.slug}`}
                        className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
                      >
                        <span>View {cat.name.en} Listing Page</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {catSubs.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/services/${cat.slug}/${sub.slug}`}
                          className="p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-500 hover:bg-blue-50/30 transition flex flex-col justify-between group"
                        >
                          <div>
                            <div className="font-bold text-slate-900 text-xs group-hover:text-blue-700 flex items-center justify-between gap-1">
                              <span>{sub.name[language]}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                              {sub.shortDesc.en}
                            </p>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className="font-bold text-blue-700">
                              Visit ₹{sub.startingPrice}
                            </span>
                            <span className="text-slate-400">
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
