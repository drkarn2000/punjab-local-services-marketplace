'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Star,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CategorySlug, CitySlug } from '@/types/marketplace';

export function CityServiceTemplate({
  citySlug,
  serviceSlug,
}: {
  citySlug: CitySlug;
  serviceSlug: string;
}) {
  const router = useRouter();
  const {
    language,
    setSelectedCity,
    cities,
    categories,
    subcategories,
    providers,
    updateBookingDraft,
  } = useMarketplace();

  useEffect(() => {
    setSelectedCity(citySlug);
  }, [citySlug, setSelectedCity]);

  const city = cities.find((c) => c.slug === citySlug) || cities[0];
  const category =
    categories.find((c) => c.slug === (serviceSlug as CategorySlug)) ||
    categories[0];

  const categorySubs = subcategories.filter(
    (s) => s.categorySlug === category.slug
  );

  const localProviders = providers.filter(
    (p) =>
      p.categorySlug === category.slug &&
      (p.citySlug === city.slug ||
        p.serviceAreas.some((a) => a.toLowerCase() === city.slug.toLowerCase()))
  );

  const displayProviders =
    localProviders.length > 0
      ? localProviders
      : providers.filter((p) => p.categorySlug === category.slug);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* SEO City + Service Hero */}
      <section className="bg-gradient-to-r from-[#041418] via-[#133882] to-[#0f1c38] text-white py-11">
        <div className="w-full px-4 sm:px-6 space-y-4">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-emerald-200 font-medium">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/${city.slug}`} className="hover:text-white">
              {city.name[language]}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">
              {category.name[language]} in {city.name[language]}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold">
                <MapPin className="w-3.5 h-3.5" /> Verified Local{' '}
                {category.name.en}s in {city.name.en}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold">
                Best {category.name[language]} Services in {city.name[language]}
              </h1>
              <p className="text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
                Book background-verified {category.name.en.toLowerCase()}s across{' '}
                {city.localities.slice(0, 5).join(', ')} and all sectors of{' '}
                {city.name.en}. Transparent ₹{category.baseVisitingFee} visiting
                fee and itemized digital estimates before work begins.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  onClick={() => {
                    updateBookingDraft({
                      categorySlug: category.slug,
                      subcategoryName:
                        categorySubs[0]?.name.en || category.name.en,
                      providerId: displayProviders[0]?.id || 'prov-1',
                    });
                    router.push('/book');
                  }}
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    Book {category.name.en} in {city.name.en} (₹
                    {category.baseVisitingFee})
                  </span>
                </button>
                <Link
                  href={`/services/${category.slug}`}
                  className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm"
                >
                  Full Filter Directory
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-950/35 backdrop-blur-md border border-white/15 rounded-3xl p-5 space-y-2.5 text-xs">
              <div className="text-cyan-300 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> SEO Landing Metadata
              </div>
              <div className="font-bold text-white text-sm">
                Top {category.name.en} in {city.name.en} — 60-Min Doorstep
                Service | Punjab Services
              </div>
              <p className="text-emerald-200 leading-relaxed">
                Canonical Route: /{city.slug}/{category.slug} • Covering{' '}
                {city.localities.length} localities in {city.name.en},{' '}
                {city.state}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-4 sm:px-6 pt-10 space-y-10">
        {/* Local Providers in City */}
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Top-Rated {category.name.en}s Serving {city.name.en}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayProviders.map((prov) => (
              <div
                key={prov.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card flex flex-col justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={prov.avatar}
                    alt={prov.name}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <Link
                      href={`/professionals/${prov.slug}`}
                      className="text-lg font-extrabold text-slate-900 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <span>{prov.name}</span>
                      <BadgeCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-slate-900">
                        {prov.rating}
                      </span>
                      <span>({prov.reviewCount} reviews)</span>
                      <span>• {prov.experienceYears}+ yrs exp</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {prov.about}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="text-xs">
                    <span className="text-slate-500">Visiting Charge: </span>
                    <strong className="text-base text-slate-900">
                      ₹{prov.visitingCharge}
                    </strong>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/professionals/${prov.slug}`}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => {
                        updateBookingDraft({
                          categorySlug: category.slug,
                          subcategoryName:
                            prov.subcategories[0] || category.name.en,
                          providerId: prov.id,
                        });
                        router.push('/book');
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All 8 Subcategories for this Category in this City */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900">
            Specialized {category.name.en} Subcategories Available in{' '}
            {city.name.en}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {categorySubs.map((sub) => (
              <Link
                key={sub.id}
                href={`/services/${category.slug}/${sub.slug}`}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 space-y-1.5 transition group"
              >
                <div className="font-bold text-slate-900 text-xs group-hover:text-emerald-700 flex items-center justify-between">
                  <span>{sub.name[language]}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {sub.shortDesc.en}
                </p>
                <div className="text-xs font-extrabold text-emerald-700 pt-1">
                  Visit ₹{sub.startingPrice} • {sub.estimatedDuration}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Internal Links to Other City + Service Combinations */}
        <div className="bg-slate-900 text-slate-200 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Explore Other Hyperlocal City & Service Combinations
          </h3>
          <div className="flex flex-wrap gap-2">
            {cities.map((c) =>
              categories.map((cat) => (
                <Link
                  key={`${c.slug}-${cat.slug}`}
                  href={`/${c.slug}/${cat.slug}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    c.slug === city.slug && cat.slug === category.slug
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {cat.name.en} in {c.name.en}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
