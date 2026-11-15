'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  Home,
  Image as ImageIcon,
  Info,
  LayoutGrid,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Trophy,
  Upload,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';

export default function ProviderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || 'gurmeet-electrician';

  const {
    providers,
    reviews,
    updateBookingDraft,
    showToast,
  } = useMarketplace();

  const provider =
    providers.find((p) => p.slug === slug) || providers[0];

  const providerReviews = reviews.filter(
    (r) =>
      r.providerId === provider.id ||
      r.providerSlug === provider.slug ||
      r.categorySlug === provider.categorySlug
  );

  const similarProviders = providers
    .filter(
      (p) => p.categorySlug === provider.categorySlug && p.id !== provider.id
    )
    .slice(0, 3);

  // Tabs & Booking Card State
  const [activeTab, setActiveTab] = useState<
    'overview' | 'reviews' | 'portfolio' | 'services' | 'availability'
  >('overview');
  const [bookingMode, setBookingMode] = useState<'Instant' | 'Scheduled'>(
    'Instant'
  );
  const [selectedService, setSelectedService] = useState<string>(
    provider.subcategories[0] || provider.categoryName
  );
  const [requirement, setRequirement] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-14');
  const [selectedSlot, setSelectedSlot] = useState<string>('2:00 PM - 4:00 PM');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const defaultPortfolioImages =
    provider.portfolio.length > 0
      ? provider.portfolio.map((p) => p.image)
      : [
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80',
        ];

  const handleAddDemoPhoto = () => {
    if (uploadedPhotos.length >= 5) {
      showToast('Maximum 5 photos allowed.', 'warning');
      return;
    }
    const samplePhotos = [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    ];
    const nextPhoto = samplePhotos[uploadedPhotos.length % samplePhotos.length];
    setUploadedPhotos((prev) => [...prev, nextPhoto]);
    showToast('Problem photo attached for technician preview.', 'info');
  };

  const handleContinueToBook = () => {
    updateBookingDraft({
      categorySlug: provider.categorySlug,
      subcategoryName: selectedService,
      problemTitle: `${selectedService} with ${provider.name}`,
      problemDescription:
        requirement.trim() ||
        `Need ${selectedService} inspection and service at my address.`,
      problemImages:
        uploadedPhotos.length > 0
          ? uploadedPhotos
          : [
              'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80',
            ],
      bookingType: bookingMode,
      date: selectedDate,
      timeSlot: selectedSlot,
      providerId: provider.id,
    });
    router.push('/book');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* Lightbox Modal for Portfolio Photos */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative max-w-3xl w-full">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-amber-300 flex items-center gap-1 text-xs font-bold"
            >
              <X className="w-5 h-5" /> Close Preview
            </button>
            <img
              src={lightboxImage}
              alt="Portfolio Work Preview"
              className="w-full max-h-[80vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* 1. HERO PROFILE COVER matching Image 4 */}
      <section className="relative bg-gradient-to-r from-[#081d4a] via-[#12357a] to-[#1d4ed8] text-white py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-blue-200 font-medium mb-5">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/services/${provider.categorySlug}`}
              className="hover:text-white"
            >
              {provider.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">{provider.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left 8 Cols: Avatar + Provider Identity */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative shrink-0">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white/90 shadow-2xl"
                />
                {provider.verified && (
                  <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full bg-emerald-500 ring-4 ring-[#0c2661] flex items-center justify-center text-white">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                    {provider.name}
                  </h1>
                  {provider.verified && (
                    <BadgeCheck className="w-7 h-7 text-sky-300 fill-blue-600" />
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider text-cyan-200">
                    {provider.providerType === 'business'
                      ? 'Registered Business'
                      : 'Individual Specialist'}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-blue-100">
                  Professional {provider.categoryName} Services in{' '}
                  {provider.serviceAreas.slice(0, 3).join(', ')} & Nearby
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{provider.rating}</span>
                    <span className="text-blue-200 font-medium">
                      ({provider.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-blue-100">
                    <Briefcase className="w-4 h-4 text-cyan-300" />
                    <span>{provider.experienceYears}+ years experience</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-blue-100">
                    <MapPin className="w-4 h-4 text-cyan-300" />
                    <span>
                      {provider.cityName}, {provider.distanceKm} km away
                    </span>
                  </div>

                  {provider.availableToday && (
                    <span className="px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-200 font-bold text-xs">
                      Available Today
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: 3 Trust Highlights matching Image 4 */}
            <div className="lg:col-span-4 bg-slate-950/35 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white">
                    Verified Professional
                  </div>
                  <div className="text-[11px] text-blue-200">
                    ID, Address & Skills Verified
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white">
                    {provider.completedJobs}+ Happy Customers
                  </div>
                  <div className="text-[11px] text-blue-200">
                    High quality, reliable service
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white">
                    Same Day Service
                  </div>
                  <div className="text-[11px] text-blue-200">
                    Quick and on-time response
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT: Left 8 Cols (Tabs & Sections) + Right 4 Cols (Sticky Booking Card) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* LEFT 8 COLUMNS */}
          <div className="lg:col-span-8 space-y-7">
            {/* Navigation Tabs matching Image 4 */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-1.5 shadow-sm flex flex-wrap items-center gap-1.5">
              {[
                {
                  id: 'overview',
                  label: 'Overview',
                  icon: <Home className="w-4 h-4" />,
                },
                {
                  id: 'reviews',
                  label: `Reviews (${provider.reviewCount})`,
                  icon: <Star className="w-4 h-4" />,
                },
                {
                  id: 'portfolio',
                  label: `Portfolio (${defaultPortfolioImages.length})`,
                  icon: <ImageIcon className="w-4 h-4" />,
                },
                {
                  id: 'services',
                  label: 'Services',
                  icon: <LayoutGrid className="w-4 h-4" />,
                },
                {
                  id: 'availability',
                  label: 'Availability',
                  icon: <Calendar className="w-4 h-4" />,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(
                      tab.id as
                        | 'overview'
                        | 'reviews'
                        | 'portfolio'
                        | 'services'
                        | 'availability'
                    )
                  }
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* ABOUT + SERVICE AREAS ROW matching Image 4 */}
            {(activeTab === 'overview' || activeTab === 'availability') && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card space-y-4">
                  <h2 className="text-lg font-extrabold text-slate-900">
                    About {provider.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {provider.about}
                  </p>

                  {/* 4 Stat Badges matching Image 4 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600 shrink-0" />
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">
                          {provider.experienceYears}+ Years
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Experience
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600 shrink-0" />
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">
                          {provider.completedJobs}+
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Completed Jobs
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5 text-blue-600 shrink-0" />
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">
                          {provider.rating}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Customer Rating
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">
                          Verified
                        </div>
                        <div className="text-[10px] text-slate-500">
                          & Trusted
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Areas & Languages Card matching Image 4 */}
                <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>Service Areas</span>
                    </h3>
                    <span className="text-[11px] font-semibold text-blue-700">
                      {provider.serviceRadiusKm} km radius
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {provider.serviceAreas.map((area) => (
                      <span
                        key={area}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50/80 text-blue-900 text-xs font-semibold border border-blue-100"
                      >
                        <MapPin className="w-3 h-3 text-blue-600" />
                        {area}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        <strong>Languages:</strong>{' '}
                        {provider.languagesSpoken.join(', ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        <strong>Hours:</strong> {provider.workingHours} (
                        {provider.workingDays.join(', ')})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES OFFERED SECTION matching Image 4 */}
            {(activeTab === 'overview' || activeTab === 'services') && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
                    <span>Services Offered</span>
                  </h2>
                  <span className="text-xs text-slate-500">
                    Click a service to select in booking box
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {provider.subcategories.map((subName) => {
                    const isSelected = selectedService === subName;
                    return (
                      <button
                        key={subName}
                        type="button"
                        onClick={() => {
                          setSelectedService(subName);
                          showToast(`Selected "${subName}" for booking`, 'info');
                        }}
                        className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 transition ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20'
                            : 'border-slate-200 hover:border-blue-400 bg-slate-50/40'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 leading-tight">
                          {subName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* RECENT WORK (PORTFOLIO) GALLERY matching Image 4 */}
            {(activeTab === 'overview' || activeTab === 'portfolio') && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                    <span>Recent Work (Portfolio)</span>
                  </h2>
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>
                      View All Photos ({defaultPortfolioImages.length})
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {defaultPortfolioImages.map((imgUrl, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setLightboxImage(imgUrl)}
                      className="h-24 rounded-xl overflow-hidden border border-slate-200 group relative"
                    >
                      <img
                        src={imgUrl}
                        alt={`Work sample ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded">
                          Zoom
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CUSTOMER REVIEWS SECTION matching Image 4 */}
            {(activeTab === 'overview' || activeTab === 'reviews') && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span>Customer Reviews ({provider.reviewCount})</span>
                  </h2>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>View All Reviews</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {providerReviews.slice(0, 3).map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-2.5 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={rev.customerAvatar}
                              alt={rev.customerName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="text-xs font-extrabold text-slate-900">
                                {rev.customerName}
                              </div>
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: rev.rating }).map(
                                  (_, i) => (
                                    <Star
                                      key={i}
                                      className="w-3 h-3 text-amber-400 fill-amber-400"
                                    />
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {rev.date}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>

                      {rev.providerReply && (
                        <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-slate-700">
                          <strong className="text-blue-900 block">
                            Reply from {provider.name}:
                          </strong>
                          {rev.providerReply}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AVAILABILITY SCHEDULE TAB CONTENT */}
            {activeTab === 'availability' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card space-y-4">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Live Slot Availability — {provider.name}
                </h2>
                <p className="text-xs text-slate-600">
                  Working Days: {provider.workingDays.join(', ')} • Working
                  Hours: {provider.workingHours}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    '9:00 AM - 11:00 AM',
                    '11:00 AM - 1:00 PM',
                    '2:00 PM - 4:00 PM',
                    '4:00 PM - 6:00 PM',
                    '6:00 PM - 8:00 PM',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setBookingMode('Scheduled');
                        setSelectedSlot(slot);
                        showToast(`Selected slot: ${slot}`, 'info');
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold transition ${
                        selectedSlot === slot
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-emerald-50/60 text-emerald-900 border-emerald-200 hover:border-blue-500'
                      }`}
                    >
                      {slot}
                      <span className="block text-[10px] font-normal opacity-80 mt-0.5">
                        Available
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIMILAR PROFESSIONALS NEAR YOU matching Image 4 */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Similar Professionals Near You</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarProviders.map((sim) => (
                  <div
                    key={sim.id}
                    className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 hover:border-blue-400 transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={sim.avatar}
                        alt={sim.name}
                        className="w-12 h-12 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold text-slate-900 truncate">
                          {sim.name}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-600">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="font-bold">{sim.rating}</span>
                          <span>({sim.reviewCount})</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {sim.distanceKm} km • {sim.cityName}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/professionals/${sim.slug}`}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-[11px] font-bold shrink-0 transition"
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT 4 COLUMNS: STICKY BOOKING CARD matching Image 4 */}
          <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 space-y-4">
              <div className="flex items-center gap-2 font-extrabold text-slate-900 text-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Book This Professional</span>
              </div>

              {/* Book Now vs Schedule Later Toggle matching Image 4 */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setBookingMode('Instant')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition text-center ${
                    bookingMode === 'Instant'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <div>Book Now</div>
                  <div className="text-[10px] font-normal opacity-85">
                    (Today)
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setBookingMode('Scheduled')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition text-center ${
                    bookingMode === 'Scheduled'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <div>Schedule Later</div>
                  <div className="text-[10px] font-normal opacity-85">
                    (Choose Date & Time)
                  </div>
                </button>
              </div>

              {bookingMode === 'Scheduled' && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Time Slot
                    </label>
                    <select
                      aria-label="Time Slot"
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                    >
                      <option>9:00 AM - 11:00 AM</option>
                      <option>11:00 AM - 1:00 PM</option>
                      <option>2:00 PM - 4:00 PM</option>
                      <option>4:00 PM - 6:00 PM</option>
                      <option>6:00 PM - 8:00 PM</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Select Service Dropdown */}
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1.5">
                  Select Service
                </label>
                <select
                  aria-label="Select Service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:border-blue-600"
                >
                  {provider.subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      ⚡ {sub}
                    </option>
                  ))}
                </select>
              </div>

              {/* Describe Requirement */}
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1.5">
                  Describe Your Requirement
                </label>
                <textarea
                  rows={3}
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder="e.g. Fan not working, new wiring, switch repair..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Add Photos (Optional) matching Image 4 */}
              <div>
                <button
                  type="button"
                  onClick={handleAddDemoPhoto}
                  className="w-full p-3 rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-500 bg-blue-50/40 flex items-center gap-3 text-left transition"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      Add Photos (Optional)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      JPG, PNG up to 5 MB (Max 5 files) — Click to add demo photo
                    </div>
                  </div>
                </button>

                {uploadedPhotos.length > 0 && (
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {uploadedPhotos.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200"
                      >
                        <img
                          src={url}
                          alt="Uploaded preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setUploadedPhotos((prev) =>
                              prev.filter((_, i) => i !== idx)
                            )
                          }
                          className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-slate-900/80 text-white flex items-center justify-center text-[10px]"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Visiting Charge Box matching Image 4 */}
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>Visiting Charge</span>
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    (Adjustable in final bill based on actual work)
                  </div>
                </div>
                <div className="text-xl font-extrabold text-slate-900">
                  ₹{provider.visitingCharge}
                </div>
              </div>

              {/* Primary CTA Button */}
              <button
                type="button"
                onClick={handleContinueToBook}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </button>
            </div>

            {/* Green Why Book Card matching Image 4 */}
            <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200/80 p-5 space-y-2.5">
              <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Why Book with Punjab Services?</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Verified & background checked professional</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Secure booking and transparent pricing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Real customer reviews and ratings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Dedicated customer support</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
