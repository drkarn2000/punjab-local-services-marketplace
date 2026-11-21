'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplets,
  Hammer,
  Headphones,
  IndianRupee,
  Laptop,
  LayoutGrid,
  MapPin,
  Search,
  ShieldCheck,
  Smartphone,
  Star,
  Tag,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CategorySlug, CitySlug } from '@/types/marketplace';
import homeHeroBg from './how-it-works/images/home page hero bg.png';
import sukhnaLakeBg from './become-a-professional/Images/Sukhna Lake with Open Hand Monument.png';
import modernTealServicesBanner from './services/images/Modern Teal Services Banner.png';
import moodyModernHomeBanner from './services/images/Moody Modern Home Exterior Banner.png';

export default function HomePage() {
  const router = useRouter();
  const {
    language,
    t,
    selectedCity,
    setSelectedCity,
    categories,
    cities,
    providers,
    reviews,
    updateBookingDraft,
  } = useMarketplace();

  const [heroCategory, setHeroCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [testimonialIdx, setTestimonialIdx] = useState<number>(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState<boolean>(false);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroCategory && !searchQuery.trim()) {
      router.push(`/services/${heroCategory}`);
      return;
    }
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (heroCategory) params.set('category', heroCategory);
    params.set('city', selectedCity);
    router.push(`/search?${params.toString()}`);
  };

  const categoryIconMap: Record<CategorySlug, React.ReactNode> = {
    electrician: <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />,
    plumber: <Droplets className="w-5 h-5 text-sky-500 fill-sky-400" />,
    carpenter: <Hammer className="w-5 h-5 text-orange-500" />,
    'computer-repair': <Laptop className="w-5 h-5 text-indigo-600" />,
    'mobile-repair': <Smartphone className="w-5 h-5 text-blue-600" />,
  };

  const popularQuickPills: { label: string; cat: CategorySlug; sub: string }[] = [
    { label: 'Fan Installation', cat: 'electrician', sub: 'fan-installation-repair' },
    { label: 'Water Leakage', cat: 'plumber', sub: 'pipe-leakage' },
    { label: 'Furniture Repair', cat: 'carpenter', sub: 'furniture-repair' },
    { label: 'Laptop Repair', cat: 'computer-repair', sub: 'laptop-repair' },
    { label: 'Mobile Screen Repair', cat: 'mobile-repair', sub: 'screen-replacement' },
  ];

  // Prioritize providers in selected city, or show top 4 overall
  const topProviders = [
    ...providers.filter((p) => p.verified && p.citySlug === selectedCity),
    ...providers.filter((p) => p.verified && p.citySlug !== selectedCity),
  ].slice(0, 4);

  const publishedReviews = reviews.filter((r) => r.status === 'Published');
  const currentReview = publishedReviews[testimonialIdx % publishedReviews.length] || publishedReviews[0];

  useEffect(() => {
    if (isTestimonialPaused || publishedReviews.length <= 1) return;
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % publishedReviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isTestimonialPaused, publishedReviews.length]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* 1. HERO SECTION (Custom Hero Background Image) */}
      <section className="relative text-white overflow-hidden pb-44 lg:pb-52 pt-4 lg:pt-6 border-b border-emerald-400/20">
        {/* Custom Home Hero Background Image */}
        <img
          src={homeHeroBg.src}
          alt="Punjab Services Home Hero"
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-[#041418]/50 pointer-events-none" />

        <div className="w-full px-4 sm:px-6 relative z-10">
          {/* Centered Floating Strip: Verified Local Experts Card ONLY */}
          <div className="mb-4 lg:mb-0 lg:absolute lg:top-[106px] lg:left-1/2 lg:-translate-x-1/2 z-20 flex justify-center">
            <div className="inline-flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md text-slate-900 px-3 py-2 rounded-2xl shadow-xl border border-emerald-200">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2 shrink-0">
                  {providers.slice(0, 3).map((p) => (
                    <img
                      key={p.id}
                      src={p.avatar}
                      alt={p.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                    />
                  ))}
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                    <span>438+ Verified Local Experts</span>
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                  </div>
                  <div className="text-[10px] text-slate-600">
                    Visiting Charge starts at ₹199 (Adjustable in final bill)
                  </div>
                </div>
              </div>
              <Link
                href="/book"
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 text-xs font-extrabold shrink-0 transition shadow"
              >
                Book Now
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* City Selector Pill */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-emerald-300/35 text-white px-3.5 py-1.5 rounded-full shadow-md text-xs font-bold">
                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                <select
                  aria-label="Select City"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value as CitySlug)}
                  className="bg-transparent font-bold text-white focus:outline-none cursor-pointer pr-1"
                >
                  <option value="mohali" className="bg-slate-900 text-white">Mohali</option>
                  <option value="chandigarh" className="bg-slate-900 text-white">Chandigarh</option>
                  <option value="hoshiarpur" className="bg-slate-900 text-white">Hoshiarpur</option>
                </select>
              </div>
              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]">
                <span className="block">{t('hero.titleLine1', 'Find Trusted Professionals')}</span>
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                  {t('hero.titleHighlight', 'Near You')}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-200 text-sm sm:text-base max-w-xl leading-relaxed">
                {t(
                  'hero.subtitle',
                  'Book reliable Electricians, Plumbers, Carpenters and Device Repair experts in Mohali, Chandigarh & Hoshiarpur.'
                )}
              </p>

              {/* Unified Glassmorphic Search Bar */}
              <form
                onSubmit={handleHeroSearch}
                className="bg-white/10 backdrop-blur-xl border border-emerald-300/35 rounded-2xl p-2 shadow-[0_18px_50px_rgba(0,0,0,0.45)] flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl text-white"
              >
                <div className="flex items-center gap-2 px-3 py-2 sm:border-r border-white/15 min-w-[175px]">
                  <LayoutGrid className="w-4 h-4 text-emerald-300 shrink-0" />
                  <select
                    aria-label="Select a Service Category"
                    value={heroCategory}
                    onChange={(e) => setHeroCategory(e.target.value)}
                    className="w-full text-xs sm:text-sm font-bold text-white bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-900 text-white">
                      {t('hero.selectService', 'Select a Service')}
                    </option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug} className="bg-slate-900 text-white">
                        {c.name[language]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 flex-1">
                  <Search className="w-4 h-4 text-emerald-200 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t(
                      'hero.searchPlaceholder',
                      'e.g. Fan repair, Pipe leakage, Laptop repair'
                    )}
                    className="w-full text-xs sm:text-sm font-medium bg-transparent text-white placeholder:text-slate-300 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>{t('hero.searchBtn', 'Search')}</span>
                </button>
              </form>
            </div>

            {/* Right Column (5 cols) — Floating Serving Badge Over Custom Hero BG */}
            <div className="lg:col-span-5 relative flex justify-end items-start self-start">
              {/* Tilted Emerald Serving Badge */}
              <div className="transform -rotate-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 px-4 py-2 rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-slate-950 shrink-0" />
                <div className="text-xs font-extrabold leading-tight">
                  Serving
                  <br />
                  Mohali, Chandigarh
                  <br />& Hoshiarpur
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST HIGHLIGHTS STRIP (With Popular Pills on Top Border + House BG) */}
      <section className="w-full px-4 sm:px-6 -mt-8 relative z-20">
        <div className="relative bg-gradient-to-r from-[#041418] via-[#092930] to-[#0f1c38] text-white rounded-2xl shadow-[0_14px_38px_rgba(4,20,24,0.45)] border border-emerald-400/40 px-4 sm:px-5 pt-4 lg:pt-5 pb-2.5 sm:pb-3">
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Modern Punjab home left"
              className="hidden md:block absolute left-0 top-0 bottom-0 w-1/3 h-full object-cover opacity-50"
            />
            <div className="hidden md:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[#072127]/90 to-[#092930]" />
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Modern Punjab home right"
              className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3 h-full object-cover opacity-50"
            />
            <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-transparent via-[#072127]/90 to-[#092930]" />
          </div>

          {/* Popular Quick Pills Sitting on Top Border */}
          <div className="lg:absolute lg:-top-4 lg:left-6 lg:right-6 z-30 flex flex-wrap items-center justify-center lg:justify-between gap-2 mb-4 lg:mb-0 text-xs">
            <span className="px-3.5 py-1 rounded-full bg-[#041418] text-amber-300 border border-emerald-400/50 font-extrabold uppercase tracking-wider text-[11px] shadow-lg">
              {t('hero.popularLabel', 'Popular:')}
            </span>
            {popularQuickPills.map((pill) => (
              <Link
                key={pill.label}
                href={`/services/${pill.cat}/${pill.sub}`}
                className="px-3.5 py-1 rounded-full bg-[#041418] hover:bg-white text-emerald-300 hover:text-slate-950 border border-emerald-400/50 shadow-lg transition font-extrabold text-[11px]"
              >
                {pill.label}
              </Link>
            ))}
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              icon: <ShieldCheck className="w-6 h-6" />,
              title: t('trust.verifiedTitle', 'Verified Professionals'),
              desc: t('trust.verifiedDesc', 'Background checked & trusted'),
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: t('trust.quickTitle', 'Quick & Easy Booking'),
              desc: t('trust.quickDesc', 'Book in just a few clicks'),
            },
            {
              icon: <IndianRupee className="w-6 h-6" />,
              title: t('trust.pricingTitle', 'Transparent Pricing'),
              desc: t('trust.pricingDesc', 'No hidden charges'),
            },
            {
              icon: <Headphones className="w-6 h-6" />,
              title: t('trust.supportTitle', 'Local Support'),
              desc: t('trust.supportDesc', 'Real help, in your language'),
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group flex items-center gap-3 p-2 rounded-xl border border-transparent hover:border-emerald-400/35 hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-400/15 border border-emerald-400/35 text-emerald-300 group-hover:bg-emerald-400 group-hover:text-slate-950 group-hover:scale-110 flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm">
                {item.icon}
              </div>
              <div>
                <div className="font-extrabold text-white group-hover:text-emerald-300 text-sm transition-colors">
                  {item.title}
                </div>
                <div className="text-xs text-slate-300 font-medium">{item.desc}</div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES (Redesigned Full-Bleed Glassmorphic Showcase) */}
      <section className="w-full px-4 sm:px-6 pt-14 pb-10">
        <div className="relative border border-emerald-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
          <span className="absolute -top-3.5 left-6 sm:left-8 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#041418] border border-emerald-400/50 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
            5 Specialized Verticals
          </span>
          <Link
            href="/services"
            className="absolute -top-3.5 right-6 sm:right-8 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#041418] hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 text-emerald-300 hover:text-slate-950 border border-emerald-400/50 text-[11px] font-extrabold uppercase tracking-wider shadow-lg transition-all group"
          >
            <span>{t('home.viewAllServices', 'View All Services')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
          </Link>

          <h2 className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 px-5 py-1.5 rounded-full bg-[#041418] border border-emerald-400/60 text-white text-sm sm:text-base font-extrabold shadow-[0_0_20px_rgba(16,185,129,0.35)] whitespace-nowrap">
            {t('home.ourServicesTitle', 'Our Services')}
          </h2>

          {/* Modern Teal Services Banner Background Image (Symmetrical House Left & Right) */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <img
              src={modernTealServicesBanner.src}
              alt="Modern Teal Services Banner"
              className="md:hidden w-full h-full object-cover object-right"
            />
            <img
              src={modernTealServicesBanner.src}
              alt=""
              aria-hidden="true"
              className="hidden md:block absolute left-0 top-0 bottom-0 w-1/2 h-full object-cover object-right -scale-x-100"
            />
            <img
              src={modernTealServicesBanner.src}
              alt="Modern Teal Services Banner"
              className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 h-full object-cover object-right"
            />
          </div>

          <div className="relative z-10 text-center mb-8 pt-4">
            <p className="text-sm text-slate-300 font-medium">
              {t(
                'home.ourServicesSub',
                'Choose from a range of professional services at your doorstep'
              )}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/services/${cat.slug}`}
                className="group relative rounded-3xl border border-emerald-400/30 bg-[#041418] min-h-[285px] flex flex-col justify-end shadow-xl hover:-translate-y-2 hover:border-emerald-300/80 hover:shadow-[0_20px_44px_rgba(16,185,129,0.42)] transition-all duration-300"
              >
                {/* Full-Bleed Service Image (Clipped Inside Rounded Frame) */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  <img
                    src={cat.cardImage}
                    alt={cat.name[language]}
                    className="w-full h-full object-cover opacity-55 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041418] via-[#041418]/75 to-[#041418]/30 group-hover:via-[#061f25]/65 transition-all duration-300" />
                </div>

                {/* Top Border Floating Icon (Left) + Visit Fee Pill (Right) */}
                <div className="absolute -top-4 left-4 z-20 w-10 h-10 rounded-xl bg-[#041418] border border-emerald-400/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-300 shadow-lg">
                  {categoryIconMap[cat.slug]}
                </div>
                <span className="absolute -top-3.5 right-4 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 text-[11px] font-extrabold shadow-lg border border-emerald-200">
                  ₹{cat.baseVisitingFee} Visit
                </span>

                {/* Bottom Glassmorphic Info (Switches to Emerald-Teal Gradient on Hover) */}
                <div className="relative z-10 p-4 pt-8 space-y-3 rounded-b-3xl group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                  <div>
                    <h3 className="font-extrabold text-white text-lg leading-snug group-hover:text-slate-950 transition-colors duration-300">
                      {cat.name[language]}
                    </h3>
                    <p className="text-xs text-slate-200 group-hover:text-slate-900 font-medium mt-1 leading-relaxed line-clamp-2 transition-colors duration-300">
                      {cat.tagline[language]}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-white/15 group-hover:border-slate-950/20 flex items-center justify-between gap-2 transition-colors duration-300">
                    <span className="text-[11px] font-extrabold text-emerald-300 group-hover:text-slate-950 transition-colors duration-300">
                      {cat.providerCount} Verified Pros
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#041418] text-white group-hover:text-emerald-300 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 shadow">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (Moody Modern Home Symmetrical BG + Hover Glow Cards) */}
      <section className="w-full px-4 sm:px-6 py-6">
        <div className="relative text-white border border-emerald-400/30 shadow-[0_14px_38px_rgba(4,20,24,0.35)] rounded-3xl p-6 sm:p-8">
          {/* Moody Modern Home Exterior Banner (Symmetrical House Left & Right) */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <img
              src={moodyModernHomeBanner.src}
              alt="Moody Modern Home Exterior"
              className="md:hidden w-full h-full object-cover object-right"
            />
            <img
              src={moodyModernHomeBanner.src}
              alt=""
              aria-hidden="true"
              className="hidden md:block absolute left-0 top-0 bottom-0 w-1/2 h-full object-cover object-right -scale-x-100"
            />
            <img
              src={moodyModernHomeBanner.src}
              alt="Moody Modern Home Exterior"
              className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 h-full object-cover object-right"
            />
          </div>

          <span className="absolute -top-3.5 left-6 sm:left-8 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#041418] border border-emerald-400/50 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
            {t('home.howItWorksTitle', 'How It Works')}
          </span>
          <div className="relative z-10 flex flex-col items-center text-center gap-1.5 mb-6 pt-2">
            <p className="text-sm text-slate-200 font-medium">
              {t('home.howItWorksSub', 'Get your work done in 4 simple steps')}
            </p>
            <Link
              href="/how-it-works"
              className="text-xs font-bold text-emerald-300 hover:text-white hover:underline transition"
            >
              Learn more about Hybrid Estimates & Safety →
            </Link>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                num: '1',
                title: t('home.step1Title', 'Choose a Service'),
                desc: t('home.step1Desc', 'Select what you need'),
                icon: <LayoutGrid className="w-5 h-5" />,
              },
              {
                num: '2',
                title: t('home.step2Title', 'Find a Professional'),
                desc: t('home.step2Desc', 'See nearby, verified experts'),
                icon: <MapPin className="w-5 h-5" />,
              },
              {
                num: '3',
                title: t('home.step3Title', 'Book & Confirm'),
                desc: t('home.step3Desc', 'Book now or schedule later'),
                icon: <CalendarCheck className="w-5 h-5" />,
              },
              {
                num: '4',
                title: t('home.step4Title', 'Get It Done'),
                desc: t('home.step4Desc', 'Work completed, pay & rate'),
                icon: <CheckCircle2 className="w-5 h-5" />,
              },
            ].map((step) => (
              <div
                key={step.num}
                className="group bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 rounded-2xl p-4 border border-emerald-200 shadow-lg hover:-translate-y-1.5 hover:shadow-[0_14px_32px_rgba(16,185,129,0.45)] transition-all duration-300 cursor-pointer flex items-center gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-[#041418] text-emerald-300 group-hover:scale-110 flex items-center justify-center shrink-0 transition-transform duration-300 shadow">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#041418] text-emerald-300 text-[11px] font-extrabold flex items-center justify-center">
                      {step.num}
                    </span>
                    <span className="font-extrabold text-slate-950 text-sm">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-900 font-semibold mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE PUNJAB SERVICES? (Symmetrical House BG + Colorful Cards) */}
      <section className="w-full px-4 sm:px-6 py-8">
        <div className="relative bg-gradient-to-r from-[#041418] via-[#092930] to-[#0f1c38] text-white border border-emerald-400/30 shadow-[0_14px_38px_rgba(4,20,24,0.35)] rounded-3xl p-6 sm:p-8">
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Modern Punjab home left"
              className="hidden md:block absolute left-0 top-0 bottom-0 w-1/3 h-full object-cover opacity-50"
            />
            <div className="hidden md:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[#072127]/90 to-[#092930]" />
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Modern Punjab home right"
              className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3 h-full object-cover opacity-50"
            />
            <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-transparent via-[#072127]/90 to-[#092930]" />
          </div>

          <span className="absolute -top-3.5 left-6 sm:left-8 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#041418] border border-emerald-400/50 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
            {t('home.whyChooseTitle', 'Why Choose Punjab Services?')}
          </span>
          <div className="relative z-10 mb-6 pt-1">
            <p className="text-sm text-slate-300 font-medium">
              {t(
                'home.whyChooseSub',
                'A trusted platform for your home and device repair needs.'
              )}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 pt-6">
            {[
              {
                icon: <BadgeCheck className="w-6 h-6" />,
                title: 'Trusted & Verified Professionals',
                grad: 'from-blue-600 to-indigo-700',
                glow: 'hover:shadow-[0_12px_28px_rgba(59,130,246,0.55)]',
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: 'Fast Response & On-Time Service',
                grad: 'from-cyan-500 to-blue-700',
                glow: 'hover:shadow-[0_12px_28px_rgba(6,182,212,0.55)]',
              },
              {
                icon: <Tag className="w-6 h-6" />,
                title: 'Fair & Transparent Pricing',
                grad: 'from-emerald-500 to-teal-700',
                glow: 'hover:shadow-[0_12px_28px_rgba(16,185,129,0.55)]',
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: 'Safe & Secure Booking',
                grad: 'from-violet-600 to-purple-800',
                glow: 'hover:shadow-[0_12px_28px_rgba(139,92,246,0.55)]',
              },
              {
                icon: <Headphones className="w-6 h-6" />,
                title: 'Multilingual Support',
                sub: 'English, Punjabi & Hindi',
                grad: 'from-amber-500 to-orange-600',
                glow: 'hover:shadow-[0_12px_28px_rgba(245,158,11,0.55)]',
              },
              {
                icon: <Star className="w-6 h-6" />,
                title: 'Rated by Local Customers',
                grad: 'from-rose-500 to-pink-700',
                glow: 'hover:shadow-[0_12px_28px_rgba(244,63,94,0.55)]',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`group relative bg-gradient-to-br ${item.grad} rounded-2xl px-4 pt-8 pb-4 border border-white/25 shadow-lg text-center flex flex-col items-center justify-center gap-2 hover:-translate-y-1.5 hover:scale-[1.03] hover:border-white/60 ${item.glow} transition-all duration-300 cursor-pointer`}
              >
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 w-11 h-11 rounded-full bg-[#041418] border-2 border-white/40 text-white group-hover:bg-white group-hover:text-slate-900 group-hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-lg">
                  {item.icon}
                </div>
                <div className="text-xs font-extrabold text-white leading-snug">
                  {item.title}
                </div>
                {item.sub && (
                  <div className="text-[11px] text-white/90 font-medium -mt-1">{item.sub}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TOP RATED PROFESSIONALS NEAR YOU (4 Provider Cards matching Image 1) */}
      <section className="w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col items-center text-center gap-2 mb-7">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t('home.topProsTitle', 'Top Rated Professionals Near You')}
          </h2>
          <p className="text-sm text-slate-600">
            {t(
              'home.topProsSub',
              'Highly rated and trusted service experts in your area.'
            )}
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald-700 hover:text-emerald-800 mt-1"
          >
            <span>View All Professionals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-5 pt-3 pb-5">
          {topProviders.map((prov) => (
            <div
              key={prov.id}
              className="group relative bg-gradient-to-br from-[#041418] via-[#092930] to-[#0f1c38] text-white rounded-2xl border border-emerald-400/30 shadow-card hover:shadow-[0_14px_34px_rgba(16,185,129,0.35)] hover:border-emerald-300/70 hover:-translate-y-1.5 px-5 pt-7 pb-8 flex flex-col justify-between transition-all duration-300"
            >
              {/* Top Border Centered Name Pill */}
              <Link
                href={`/professionals/${prov.slug}`}
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-full bg-[#041418] border border-emerald-400/50 hover:border-emerald-300 text-white hover:text-emerald-300 font-extrabold text-xs flex items-center gap-1.5 shadow-lg whitespace-nowrap max-w-[90%]"
              >
                <span className="truncate">{prov.name}</span>
                {prov.verified && (
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                )}
              </Link>

              <div className="flex items-center gap-3.5">
                <img
                  src={prov.avatar}
                  alt={prov.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-400/60 shadow-md shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-extrabold text-white">{prov.rating}</span>
                    <span className="text-slate-300 font-medium">
                      ({prov.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="text-xs text-emerald-200 mt-1 font-semibold">
                    {prov.categoryName} • {prov.cityName}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-slate-300 font-medium">
                <span>{prov.experienceYears}+ yrs exp</span>
                <span className="font-extrabold text-white">
                  Visit: ₹{prov.visitingCharge}
                </span>
              </div>

              <div className="mt-3">
                <span className="block w-full text-center py-1 rounded-full bg-emerald-400/15 text-emerald-300 font-extrabold text-[11px] border border-emerald-400/30">
                  • {t('common.availableToday', 'Available Today')}
                </span>
              </div>

              {/* Bottom Border Book Now + View Profile Buttons */}
              <div className="absolute -bottom-4 left-4 right-4 z-20 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    updateBookingDraft({
                      categorySlug: prov.categorySlug,
                      subcategoryName: prov.subcategories[0] || prov.categoryName,
                      providerId: prov.id,
                    });
                    router.push('/book');
                  }}
                  className="py-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 text-xs font-extrabold transition shadow-lg border border-emerald-200"
                >
                  {t('common.bookNow', 'Book Now')}
                </button>
                <Link
                  href={`/professionals/${prov.slug}`}
                  className="py-2 rounded-full bg-[#092930] hover:bg-white border border-emerald-400/50 text-white hover:text-slate-950 text-xs font-extrabold text-center transition shadow-lg"
                >
                  {t('common.viewProfile', 'View Profile')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHAT OUR CUSTOMERS SAY (Midnight Emerald-Teal Banner with Auto-Slider Carousel) */}
      <section className="w-full px-4 sm:px-6 py-8">
        <div
          onMouseEnter={() => setIsTestimonialPaused(true)}
          onMouseLeave={() => setIsTestimonialPaused(false)}
          className="relative bg-gradient-to-r from-[#041418] via-[#092930] to-[#0f1c38] border border-emerald-400/30 rounded-3xl p-6 sm:p-10 text-white shadow-xl"
        >
          {/* Symmetrical Modern Home Background (matching Why Choose Punjab Services) */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Modern Punjab home left"
              className="hidden md:block absolute left-0 top-0 bottom-0 w-1/3 h-full object-cover opacity-50"
            />
            <div className="hidden md:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[#072127]/90 to-[#092930]" />
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Modern Punjab home right"
              className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3 h-full object-cover opacity-50"
            />
            <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-transparent via-[#072127]/90 to-[#092930]" />
          </div>

          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#041418] border border-emerald-400/50 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap">
            {t('home.testimonialsTitle', 'What Our Customers Say')}
          </span>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-1">
            <div className="lg:col-span-4 space-y-2">
              <p className="text-slate-200 text-base sm:text-lg font-bold leading-snug">
                Real experiences from our happy customers across Punjab.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() =>
                    setTestimonialIdx((prev) =>
                      prev === 0 ? publishedReviews.length - 1 : prev - 1
                    )
                  }
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setTestimonialIdx((prev) => (prev + 1) % publishedReviews.length)
                  }
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="text-xs text-blue-200 ml-2">
                  {(testimonialIdx % publishedReviews.length) + 1} /{' '}
                  {publishedReviews.length}
                </span>
              </div>
            </div>

            <div className="lg:col-span-8">
              {currentReview && (
                <div className="relative overflow-hidden text-slate-900 rounded-2xl p-6 shadow-lg border border-emerald-200/70 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <img
                    src={sukhnaLakeBg.src}
                    alt="Sukhna Lake with Open Hand Monument"
                    className="absolute inset-0 w-full h-full object-cover object-right"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />

                  <img
                    src={currentReview.customerAvatar}
                    alt={currentReview.customerName}
                    className="relative z-10 w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md shrink-0"
                  />
                  <div className="relative z-10 space-y-2 flex-1 max-w-xl">
                    <p className="text-sm sm:text-base font-semibold text-slate-900 italic leading-relaxed">
                      “{currentReview.comment}”
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div>
                        <span className="font-extrabold text-slate-950 text-sm">
                          — {currentReview.customerName}, {currentReview.city}
                        </span>
                        <span className="block text-xs font-medium text-slate-700">
                          Service: {currentReview.serviceName} ({currentReview.providerName})
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: currentReview.rating }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-4 h-4 text-amber-400 fill-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. SERVICE CITIES SHOWCASE (Mohali, Chandigarh, Hoshiarpur) */}
      <section className="w-full px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Hyperlocal Launch Markets in Punjab & Tricity
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select your city to explore localized professionals, sector-wise coverage, and same-day availability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cities.map((city) => (
            <div
              key={city.id}
              className={`group relative overflow-hidden rounded-3xl border p-6 shadow-xl transition-all duration-300 flex flex-col justify-between text-white hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(30,77,183,0.45),0_0_24px_rgba(56,189,248,0.35)] ${
                selectedCity === city.slug
                  ? 'border-cyan-400 ring-2 ring-cyan-400/40'
                  : 'border-blue-300/30 hover:border-cyan-300/70'
              }`}
            >
              {/* Background Image + Midnight Emerald-Teal Gradient Overlay */}
              <img
                src={city.heroImage}
                alt={city.name[language]}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041418]/95 via-[#092930]/85 to-[#0f1c38]/70 group-hover:from-[#041418]/90 group-hover:via-[#092930]/75 transition-all duration-300" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm text-cyan-300 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center transition-colors duration-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xl text-white">
                        {city.name[language]}
                      </h3>
                      <span className="text-[11px] text-cyan-200 font-semibold">
                        {city.state} • {city.providerCount} Verified Pros
                      </span>
                    </div>
                  </div>
                  {selectedCity === city.slug && (
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold shadow">
                      Selected
                    </span>
                  )}
                </div>

                <p className="text-xs text-blue-100 mt-3.5 leading-relaxed">
                  {city.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {city.localities.slice(0, 5).map((loc) => (
                    <span
                      key={loc}
                      className="px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-sm border border-white/15 text-white text-[11px] font-medium"
                    >
                      {loc}
                    </span>
                  ))}
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-400/20 border border-cyan-300/30 text-cyan-200 text-[11px] font-bold">
                    +{city.localities.length - 5} more
                  </span>
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-3.5 border-t border-white/20 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCity(city.slug)}
                  className="text-xs font-bold text-blue-100 hover:text-amber-300 transition"
                >
                  Set as Active City
                </button>
                <Link
                  href={`/${city.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-cyan-400 hover:text-slate-950 text-white text-xs font-extrabold transition-all"
                >
                  <span>Explore {city.name.en} Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. ARE YOU A SKILLED PROFESSIONAL? PARTNER CTA BANNER (Moody Modern Home Symmetrical BG) */}
      <section className="w-full px-4 sm:px-6 py-6 pb-10">
        <div className="relative border border-emerald-400/30 rounded-3xl p-6 sm:p-8 shadow-xl text-white hover:shadow-[0_16px_38px_rgba(16,185,129,0.28)] transition-all duration-300">
          {/* Moody Modern Home Exterior Banner (Symmetrical House Left & Right) */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <img
              src={moodyModernHomeBanner.src}
              alt="Moody Modern Home Exterior"
              className="md:hidden w-full h-full object-cover object-right"
            />
            <img
              src={moodyModernHomeBanner.src}
              alt=""
              aria-hidden="true"
              className="hidden md:block absolute left-0 top-0 bottom-0 w-1/2 h-full object-cover object-right -scale-x-100"
            />
            <img
              src={moodyModernHomeBanner.src}
              alt="Moody Modern Home Exterior"
              className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 h-full object-cover object-right"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 flex items-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                alt="Skilled Professional Partner"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-emerald-400/60 shadow-lg shrink-0"
              />
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {t('home.partnerCtaTitle', 'Are You a Skilled Professional?')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                  {t(
                    'home.partnerCtaSub',
                    'Grow your business, get more customers and earn consistently with Punjab Services.'
                  )}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-xs font-bold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Get genuine service requests</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Work in your preferred area</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Transparent payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Build your professional reputation</span>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-end gap-2">
              <Link
                href="/provider/register"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 hover:-translate-y-0.5 text-slate-950 font-extrabold text-sm inline-flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>{t('home.joinPartnerBtn', 'Join as a Partner')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/become-a-professional"
                className="text-xs font-extrabold text-emerald-300 hover:text-white hover:underline text-center"
              >
                Explore Partner Benefits & Eligibility →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
