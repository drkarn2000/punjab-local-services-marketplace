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
      {/* 1. HERO SECTION matching Image 1 */}
      <section className="relative bg-gradient-to-r from-[#081d4a] via-[#11347a] to-[#1e4db7] text-white overflow-hidden pb-16 pt-8 lg:pt-12">
        {/* Subtle decorative background glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_75%_30%,#38bdf8_0%,transparent_55%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* City Selector Pill */}
              <div className="inline-flex items-center gap-2 bg-white text-slate-900 px-3.5 py-1.5 rounded-full shadow-md text-xs font-bold">
                <MapPin className="w-3.5 h-3.5 text-blue-700 fill-blue-100" />
                <select
                  aria-label="Select City"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value as CitySlug)}
                  className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="mohali">Mohali</option>
                  <option value="chandigarh">Chandigarh</option>
                  <option value="hoshiarpur">Hoshiarpur</option>
                </select>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]">
                <span className="block">{t('hero.titleLine1', 'Find Trusted Professionals')}</span>
                <span className="text-cyan-300">{t('hero.titleHighlight', 'Near You')}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-blue-100 text-sm sm:text-base max-w-xl leading-relaxed">
                {t(
                  'hero.subtitle',
                  'Book reliable Electricians, Plumbers, Carpenters and Device Repair experts in Mohali, Chandigarh & Hoshiarpur.'
                )}
              </p>

              {/* Unified Search Bar matching Image 1 */}
              <form
                onSubmit={handleHeroSearch}
                className="bg-amber-300 border-2 border-amber-200 rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl text-slate-950"
              >
                <div className="flex items-center gap-2 px-3 py-2 sm:border-r border-amber-400/70 min-w-[175px]">
                  <LayoutGrid className="w-4 h-4 text-blue-900 shrink-0" />
                  <select
                    aria-label="Select a Service Category"
                    value={heroCategory}
                    onChange={(e) => setHeroCategory(e.target.value)}
                    className="w-full text-xs sm:text-sm font-bold text-slate-950 bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="" className="bg-amber-200 text-slate-950">
                      {t('hero.selectService', 'Select a Service')}
                    </option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug} className="bg-amber-200 text-slate-950">
                        {c.name[language]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 flex-1">
                  <Search className="w-4 h-4 text-slate-800 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t(
                      'hero.searchPlaceholder',
                      'e.g. Fan repair, Pipe leakage, Laptop repair'
                    )}
                    className="w-full text-xs sm:text-sm font-medium bg-transparent text-slate-950 placeholder:text-slate-700 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 transition shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>{t('hero.searchBtn', 'Search')}</span>
                </button>
              </form>

              {/* Popular Quick Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="font-semibold text-blue-200">
                  {t('hero.popularLabel', 'Popular:')}
                </span>
                {popularQuickPills.map((pill) => (
                  <Link
                    key={pill.label}
                    href={`/services/${pill.cat}/${pill.sub}`}
                    className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm border border-white/15 transition font-medium"
                  >
                    {pill.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column (5 cols) — Professional Team Showcase & Yellow Serving Badge */}
            <div className="lg:col-span-5 relative">
              {/* Tilted Yellow Serving Badge matching Image 1 */}
              <div className="absolute -top-3 right-2 z-20 transform -rotate-2 bg-amber-300 text-slate-950 px-4 py-2 rounded-2xl shadow-lg border-2 border-amber-200 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-900 fill-amber-400 shrink-0" />
                <div className="text-xs font-extrabold leading-tight">
                  Serving
                  <br />
                  Mohali, Chandigarh
                  <br />& Hoshiarpur
                </div>
              </div>

              {/* Hero Team Card */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-gradient-to-b from-blue-900/40 to-slate-900/80">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
                  alt="Punjab Services Verified Technicians"
                  className="w-full h-[310px] sm:h-[340px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md text-slate-900 p-3.5 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {providers.slice(0, 3).map((p) => (
                        <img
                          key={p.id}
                          src={p.avatar}
                          alt={p.name}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
                        />
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                        <span>438+ Verified Local Experts</span>
                        <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-100" />
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Visiting Charge starts at ₹199 (Adjustable in final bill)
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/book"
                    className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shrink-0 transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST HIGHLIGHTS STRIP (Amber-300 BG + Hover Effects) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-amber-300 text-slate-950 rounded-2xl shadow-[0_14px_38px_rgba(8,29,74,0.28)] border-2 border-amber-200 p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
              className="group flex items-center gap-3.5 p-3 rounded-xl border border-transparent hover:border-blue-900/25 hover:bg-white/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-900 text-amber-300 group-hover:bg-blue-800 group-hover:scale-110 flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm">
                {item.icon}
              </div>
              <div>
                <div className="font-extrabold text-slate-950 text-sm group-hover:text-blue-950 transition-colors">
                  {item.title}
                </div>
                <div className="text-xs text-slate-800 font-medium">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OUR SERVICES (Amber-300 Section BG + Hover Lighting Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-amber-300 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                {t('home.ourServicesTitle', 'Our Services')}
              </h2>
              <p className="text-sm text-slate-800 font-medium mt-1">
                {t(
                  'home.ourServicesSub',
                  'Choose from a range of professional services at your doorstep'
                )}
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-extrabold text-blue-900 hover:text-blue-950 group"
            >
              <span>{t('home.viewAllServices', 'View All Services')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/services/${cat.slug}`}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-[0_18px_40px_rgba(30,77,183,0.42),0_0_24px_rgba(56,189,248,0.35)] hover:border-cyan-400/70 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="h-36 overflow-hidden relative bg-slate-100">
                <img
                  src={cat.cardImage}
                  alt={cat.name[language]}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081d4a]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/75 group-hover:bg-cyan-400 group-hover:text-slate-950 backdrop-blur-sm text-white text-[11px] font-bold transition-colors duration-300">
                  ₹{cat.baseVisitingFee} Visit
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between bg-white group-hover:bg-gradient-to-r group-hover:from-[#081d4a] group-hover:via-[#11347a] group-hover:to-[#1e4db7] transition-all duration-300">
                <div>
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base group-hover:text-white transition-colors duration-300">
                    {categoryIconMap[cat.slug]}
                    <span>{cat.name[language]}</span>
                  </div>
                  <p className="text-xs text-slate-500 group-hover:text-blue-100 mt-1.5 leading-relaxed transition-colors duration-300">
                    {cat.tagline[language]}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100 group-hover:border-white/20 transition-colors duration-300">
                  <span className="text-[11px] font-semibold text-blue-700 group-hover:text-cyan-300 transition-colors duration-300">
                    {cat.providerCount} Verified Pros
                  </span>
                  <span className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-amber-400 text-blue-700 group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (Hero BG + Hover Glow Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="bg-gradient-to-r from-[#081d4a] via-[#11347a] to-[#1e4db7] text-white border border-blue-400/30 shadow-[0_14px_38px_rgba(8,29,74,0.3)] rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white">
                {t('home.howItWorksTitle', 'How It Works')}
              </h2>
              <p className="text-sm text-blue-100 mt-0.5">
                {t('home.howItWorksSub', 'Get your work done in 4 simple steps')}
              </p>
            </div>
            <Link
              href="/how-it-works"
              className="text-xs font-bold text-cyan-300 hover:text-white hover:underline transition"
            >
              Learn more about Hybrid Estimates & Safety →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 hover:-translate-y-1.5 hover:border-cyan-300/60 hover:shadow-[0_12px_30px_rgba(56,189,248,0.3)] transition-all duration-300 cursor-pointer flex items-center gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-white/15 text-cyan-300 group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:scale-110 flex items-center justify-center shrink-0 transition-all duration-300">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 text-[11px] font-extrabold flex items-center justify-center">
                      {step.num}
                    </span>
                    <span className="font-bold text-white group-hover:text-cyan-200 text-sm transition-colors">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-xs text-blue-100 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE PUNJAB SERVICES? (Hero BG + Colorful Gradient Cards with Hover Glow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-gradient-to-r from-[#081d4a] via-[#11347a] to-[#1e4db7] text-white border border-blue-400/30 shadow-[0_14px_38px_rgba(8,29,74,0.3)] rounded-3xl p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t('home.whyChooseTitle', 'Why Choose Punjab Services?')}
            </h2>
            <p className="text-sm text-blue-100 mt-1">
              {t(
                'home.whyChooseSub',
                'A trusted platform for your home and device repair needs.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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
                className={`group bg-gradient-to-br ${item.grad} rounded-2xl p-4 border border-white/25 shadow-lg text-center flex flex-col items-center justify-center gap-2.5 hover:-translate-y-1.5 hover:scale-[1.03] hover:border-white/60 ${item.glow} transition-all duration-300 cursor-pointer`}
              >
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm text-white group-hover:bg-white group-hover:text-slate-900 group-hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-inner">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('home.topProsTitle', 'Top Rated Professionals Near You')}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {t(
                'home.topProsSub',
                'Highly rated and trusted service experts in your area.'
              )}
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800"
          >
            <span>View All Professionals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topProviders.map((prov) => (
            <div
              key={prov.id}
              className="group bg-amber-300 rounded-2xl border-2 border-amber-200 shadow-card hover:shadow-[0_14px_34px_rgba(245,158,11,0.35)] hover:-translate-y-1.5 p-5 flex flex-col justify-between transition-all duration-300"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={prov.avatar}
                  alt={prov.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-md shrink-0"
                />
                <div className="min-w-0">
                  <Link
                    href={`/professionals/${prov.slug}`}
                    className="font-extrabold text-slate-950 hover:text-blue-900 text-sm flex items-center gap-1 truncate"
                  >
                    <span className="truncate">{prov.name}</span>
                    {prov.verified && (
                      <BadgeCheck className="w-4 h-4 text-blue-700 fill-white shrink-0" />
                    )}
                  </Link>

                  <div className="flex items-center gap-1 text-xs mt-1">
                    <Star className="w-3.5 h-3.5 text-blue-900 fill-blue-900" />
                    <span className="font-extrabold text-slate-950">{prov.rating}</span>
                    <span className="text-slate-800 font-medium">
                      ({prov.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="text-xs text-slate-800 mt-1 font-semibold">
                    {prov.categoryName} • {prov.cityName}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-400/70 flex items-center justify-between text-xs text-slate-900 font-medium">
                <span>{prov.experienceYears}+ yrs exp</span>
                <span className="font-extrabold text-slate-950">
                  Visit: ₹{prov.visitingCharge}
                </span>
              </div>

              <div className="mt-3 flex flex-col items-center gap-2">
                <span className="w-full text-center py-1 rounded-full bg-white/75 text-emerald-800 font-extrabold text-[11px] border border-emerald-300">
                  • {t('common.availableToday', 'Available Today')}
                </span>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <button
                    onClick={() => {
                      updateBookingDraft({
                        categorySlug: prov.categorySlug,
                        subcategoryName: prov.subcategories[0] || prov.categoryName,
                        providerId: prov.id,
                      });
                      router.push('/book');
                    }}
                    className="py-2 rounded-full bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold transition shadow-sm"
                  >
                    {t('common.bookNow', 'Book Now')}
                  </button>
                  <Link
                    href={`/professionals/${prov.slug}`}
                    className="py-2 rounded-full bg-white/80 hover:bg-white border border-amber-400 text-slate-900 hover:text-blue-900 text-xs font-bold text-center transition"
                  >
                    {t('common.viewProfile', 'View Profile')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHAT OUR CUSTOMERS SAY (Blue Gradient Banner with Auto-Slider Carousel) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div
          onMouseEnter={() => setIsTestimonialPaused(true)}
          onMouseLeave={() => setIsTestimonialPaused(false)}
          className="bg-gradient-to-r from-[#0b2768] via-[#1c449c] to-[#3461c7] rounded-3xl p-6 sm:p-10 text-white shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                {t('home.testimonialsTitle', 'What Our Customers Say')}
              </h2>
              <p className="text-blue-100 text-sm">
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
                <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <img
                    src={currentReview.customerAvatar}
                    alt={currentReview.customerName}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-50 shrink-0"
                  />
                  <div className="space-y-2 flex-1">
                    <p className="text-sm sm:text-base font-medium text-slate-800 italic leading-relaxed">
                      “{currentReview.comment}”
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div>
                        <span className="font-extrabold text-slate-900 text-sm">
                          — {currentReview.customerName}, {currentReview.city}
                        </span>
                        <span className="block text-xs text-slate-500">
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

      {/* 8. ARE YOU A SKILLED PROFESSIONAL? PARTNER CTA BANNER (Amber-300 Theme) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-amber-300 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-[0_16px_38px_rgba(245,158,11,0.3)] transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 flex items-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                alt="Skilled Professional Partner"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg shrink-0"
              />
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                  {t('home.partnerCtaTitle', 'Are You a Skilled Professional?')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1">
                  {t(
                    'home.partnerCtaSub',
                    'Grow your business, get more customers and earn consistently with Punjab Services.'
                  )}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-xs font-bold text-slate-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>Get genuine service requests</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>Work in your preferred area</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>Transparent payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>Build your professional reputation</span>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-end gap-2">
              <Link
                href="/provider/register"
                className="px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 hover:-translate-y-0.5 text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>{t('home.joinPartnerBtn', 'Join as a Partner')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/become-a-professional"
                className="text-xs font-extrabold text-blue-950 hover:underline text-center"
              >
                Explore Partner Benefits & Eligibility →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SERVICE CITIES SHOWCASE (Mohali, Chandigarh, Hoshiarpur) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
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
              {/* Background Image + Gradient Overlay */}
              <img
                src={city.heroImage}
                alt={city.name[language]}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061438]/95 via-[#0a2158]/85 to-[#0e2d73]/70 group-hover:from-[#061438]/90 group-hover:via-[#0a2158]/75 transition-all duration-300" />

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
    </div>
  );
}
