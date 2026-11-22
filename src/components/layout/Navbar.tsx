'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Globe,
  Home,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  User,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CitySlug, Language } from '@/types/marketplace';
import {
  getCategoryVerticalGroup,
  renderCategoryIcon,
  SERVICE_VERTICAL_GROUPS,
} from '@/data/serviceCatalogConfig';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    language,
    setLanguage,
    t,
    selectedCity,
    isLoggedIn,
    setIsLoggedIn,
    currentCustomer,
    visibleCategories,
    visibleSubcategories,
    notifications,
    toasts,
    dismissToast,
    showToast,
  } = useMarketplace();

  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(
    (n) => n.targetRole === 'customer' && !n.read
  ).length;

  const isProviderRoute = pathname?.startsWith('/provider');
  const isAdminRoute = pathname?.startsWith('/admin');

  const cityLabels: Record<CitySlug, string> = {
    mohali: language === 'pa' ? 'ਮੋਹਾਲੀ' : language === 'hi' ? 'मोहाली' : 'Mohali',
    chandigarh:
      language === 'pa' ? 'ਚੰਡੀਗੜ੍ਹ' : language === 'hi' ? 'चंडीगढ़' : 'Chandigarh',
    hoshiarpur:
      language === 'pa'
        ? 'ਹੁਸ਼ਿਆਰਪੁਰ'
        : language === 'hi'
        ? 'होशियारपुर'
        : 'Hoshiarpur',
  };

  const langBadge: Record<Language, string> = {
    en: 'EN',
    pa: 'ਪੰਜਾਬੀ',
    hi: 'हिन्दी',
  };

  return (
    <>
      {/* Global Toast Notification Stack */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium transition-all ${
              toast.type === 'success'
                ? 'bg-emerald-950/95 text-emerald-50 border-emerald-600'
                : toast.type === 'warning'
                ? 'bg-amber-950/95 text-amber-50 border-amber-500'
                : toast.type === 'error'
                ? 'bg-rose-950/95 text-rose-50 border-rose-500'
                : 'bg-slate-900/95 text-white border-emerald-500'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Main Public Header (Vibrant Logo-Matched Emerald-Teal Navbar) */}
      {!isAdminRoute && !isProviderRoute && (
        <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-400 to-teal-400 border-b border-emerald-500/40 shadow-[0_8px_30px_rgba(16,185,129,0.28)] text-slate-950">
          <div className="w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-11 h-11 rounded-xl bg-[#041418] flex items-center justify-center text-emerald-300 shadow-[0_6px_18px_rgba(4,20,24,0.35)] group-hover:scale-105 transition">
                <div className="relative flex items-center justify-center">
                  <Home className="w-6 h-6 stroke-[2.3]" />
                  <Zap className="w-3 h-3 text-emerald-300 fill-emerald-300 absolute -bottom-0.5 -right-1" />
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold tracking-tight text-slate-950 leading-none">
                  Punjab <span className="text-emerald-950">Services</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-900/80 tracking-wide mt-0.5">
                  Local Home &amp; Tech Services
                </div>
              </div>
            </Link>

            {/* Desktop Center Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-xs xl:text-sm font-bold text-slate-100 whitespace-nowrap bg-[#041418]/90 border border-emerald-200/30 rounded-full px-2 py-1.5 backdrop-blur-xl shadow-[0_10px_28px_rgba(4,20,24,0.32)]">
              <Link
                href="/"
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                  pathname === '/'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold shadow-[0_0_16px_rgba(52,211,153,0.45)]'
                    : 'text-slate-100 hover:bg-white/10 hover:text-emerald-300'
                }`}
              >
                {t('nav.home', 'Home')}
              </Link>

              <Link
                href="/about"
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                  pathname === '/about'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold shadow-[0_0_16px_rgba(52,211,153,0.45)]'
                    : 'text-slate-100 hover:bg-white/10 hover:text-emerald-300'
                }`}
              >
                {t('nav.about', 'About Us')}
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  onClick={() => router.push('/services')}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                    pathname?.startsWith('/services')
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold shadow-[0_0_16px_rgba(52,211,153,0.45)]'
                      : 'text-slate-100 hover:bg-white/10 hover:text-emerald-300'
                  }`}
                >
                  <span>{t('nav.services', 'Services')}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {servicesOpen && (
                  <div className="absolute left-0 top-full pt-3 w-[480px] z-50 whitespace-normal">
                    <div className="bg-[#061c22] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.65)] border border-emerald-400/40 p-3 grid gap-2 text-white max-h-[72vh] overflow-y-auto">
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="px-3 py-2 rounded-xl bg-emerald-400/20 text-emerald-300 font-bold text-xs flex items-center justify-between hover:bg-emerald-400 hover:text-slate-950 transition"
                      >
                        <span>
                          Browse All {visibleCategories.length} Categories &amp; {visibleSubcategories.length} Services
                        </span>
                        <span>→</span>
                      </Link>
                      {SERVICE_VERTICAL_GROUPS.map((grp) => {
                        const grpCats = visibleCategories.filter(
                          (c) => getCategoryVerticalGroup(c) === grp.id
                        );
                        if (grpCats.length === 0) return null;
                        return (
                          <div key={grp.id} className="space-y-1 pt-1">
                            <div className="px-2.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-300/80">
                              {grp.shortTitle}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                              {grpCats.map((cat) => (
                                <Link
                                  key={cat.id}
                                  href={`/services/${cat.slug}`}
                                  onClick={() => setServicesOpen(false)}
                                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/10 transition group"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-emerald-400/15 text-emerald-300 flex items-center justify-center shrink-0 group-hover:bg-emerald-400 group-hover:text-slate-950 transition">
                                    {renderCategoryIcon(cat.iconName || cat.slug, 'w-4 h-4')}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-bold text-white text-xs group-hover:text-emerald-300 flex items-center gap-1.5 truncate">
                                      <span className="truncate">{cat.name[language]}</span>
                                      {cat.comingSoon && (
                                        <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[9px] font-bold shrink-0">
                                          Soon
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-slate-300 line-clamp-1">
                                      {cat.tagline[language]}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/how-it-works"
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                  pathname === '/how-it-works'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold shadow-[0_0_16px_rgba(52,211,153,0.45)]'
                    : 'text-slate-100 hover:bg-white/10 hover:text-emerald-300'
                }`}
              >
                {t('nav.howItWorks', 'How it Works')}
              </Link>

              <Link
                href="/become-a-professional"
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                  pathname === '/become-a-professional'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold shadow-[0_0_16px_rgba(52,211,153,0.45)]'
                    : 'text-slate-100 hover:bg-white/10 hover:text-emerald-300'
                }`}
              >
                {t('nav.forProfessionals', 'For Professionals')}
              </Link>

              <Link
                href="/offers"
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                  pathname === '/offers'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold shadow-[0_0_16px_rgba(52,211,153,0.45)]'
                    : 'text-slate-100 hover:bg-white/10 hover:text-emerald-300'
                }`}
              >
                {t('nav.offers', 'Offers')}
              </Link>

              <Link
                href="/support"
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                  pathname === '/support'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold shadow-[0_0_16px_rgba(52,211,153,0.45)]'
                    : 'text-slate-100 hover:bg-white/10 hover:text-emerald-300'
                }`}
              >
                {t('nav.support', 'Support')}
              </Link>
            </nav>

            {/* Right Controls: Search Icon, Language Pill, Login OR Logged-in Customer Account */}
            <div className="flex items-center gap-2.5 shrink-0">
              <Link
                href="/search"
                className="p-2.5 rounded-full bg-[#041418]/10 border border-[#041418]/15 text-slate-950 hover:text-emerald-300 hover:bg-[#041418] transition"
                title="Search Services"
              >
                <Search className="w-4 h-4" />
              </Link>

              {/* Language Dropdown (`🌐 EN v`) */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#041418]/10 hover:bg-[#041418]/20 text-slate-950 text-xs font-bold transition border border-[#041418]/15 whitespace-nowrap"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-900" />
                  <span>{langBadge[language]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-900" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#061c22]/95 backdrop-blur-xl rounded-xl shadow-2xl border border-emerald-400/35 py-1.5 z-50 text-white">
                    {(
                      [
                        { code: 'en', label: 'English (EN)' },
                        { code: 'pa', label: 'ਪੰਜਾਬੀ (Gurmukhi)' },
                        { code: 'hi', label: 'हिन्दी (Devanagari)' },
                      ] as { code: Language; label: string }[]
                    ).map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLanguage(item.code);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-white/10 ${
                          language === item.code
                            ? 'bg-emerald-400/20 text-emerald-300 font-bold'
                            : 'text-slate-200 font-medium'
                        }`}
                      >
                        <span>{item.label}</span>
                        {language === item.code && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Show Login button when NOT logged in; show Notifications + Customer Profile Pill ONLY after login */}
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#041418] hover:bg-[#092930] text-emerald-300 text-xs font-extrabold shadow-[0_6px_16px_rgba(4,20,24,0.3)] transition whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t('nav.login', 'Login')}</span>
                </Link>
              ) : (
                <>
                  {/* Notifications Bell (Only when logged in) */}
                  <Link
                    href="/account/notifications"
                    className="relative p-2.5 rounded-full bg-[#041418]/10 border border-[#041418]/15 text-slate-950 hover:text-emerald-300 hover:bg-[#041418] transition"
                    title="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Link>

                  {/* Logged-In Customer Account Pill */}
                  <div className="relative">
                    <button
                      onClick={() => setAccountOpen(!accountOpen)}
                      className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-[#041418]/10 hover:bg-[#041418]/20 border border-[#041418]/20 transition whitespace-nowrap"
                      title="Customer Account Menu"
                    >
                      <img
                        src={currentCustomer.avatar}
                        alt={currentCustomer.name}
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-[#041418]/50"
                      />
                      <span className="text-xs font-bold text-slate-950">
                        {currentCustomer.name.split(' ')[0]}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-900" />
                    </button>

                    {accountOpen && (
                      <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 text-xs">
                        <div className="px-4 py-2.5 border-b border-slate-100">
                          <div className="font-bold text-slate-900 text-sm">
                            {currentCustomer.name}
                          </div>
                          <div className="text-slate-500">
                            {currentCustomer.phone} • {cityLabels[selectedCity]}
                          </div>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/account"
                            onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Customer Dashboard</span>
                          </Link>
                          <Link
                            href="/account/bookings"
                            onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>My Bookings & Estimates</span>
                          </Link>
                          <Link
                            href="/account/addresses"
                            onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
                          >
                            <MapPin className="w-4 h-4" />
                            <span>Saved Addresses</span>
                          </Link>
                          <Link
                            href="/account/invoices"
                            onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>Payments & Invoices</span>
                          </Link>
                          <button
                            onClick={() => {
                              setIsLoggedIn(false);
                              setAccountOpen(false);
                              showToast('Logged out successfully.', 'info');
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 font-semibold border-t border-slate-100 mt-1"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Log Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-950 hover:bg-[#041418]/10 transition"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-xl">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-50 font-semibold text-sm text-slate-800"
                >
                  {t('nav.home', 'Home')}
                </Link>
                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-50 font-semibold text-sm text-slate-800"
                >
                  {t('nav.services', 'Services')}
                </Link>
                <Link
                  href="/how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-50 font-semibold text-sm text-slate-800"
                >
                  {t('nav.howItWorks', 'How it Works')}
                </Link>
                <Link
                  href="/offers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-50 font-semibold text-sm text-slate-800"
                >
                  {t('nav.offers', 'Offers')}
                </Link>
                <Link
                  href="/become-a-professional"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-50 font-semibold text-sm text-slate-800"
                >
                  {t('nav.forProfessionals', 'For Professionals')}
                </Link>
                <Link
                  href="/support"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-50 font-semibold text-sm text-slate-800"
                >
                  {t('nav.support', 'Support')}
                </Link>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl border border-emerald-600 text-emerald-700 font-bold text-xs"
                  >
                    Login
                  </Link>
                ) : (
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl border border-emerald-600 text-emerald-700 font-bold text-xs"
                  >
                    My Account ({currentCustomer.name.split(' ')[0]})
                  </Link>
                )}
                <Link
                  href="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                >
                  Book Now
                </Link>
              </div>
            </div>
          )}
        </header>
      )}
    </>
  );
}
