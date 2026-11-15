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
    categories,
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
                : 'bg-slate-900/95 text-white border-blue-500'
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

      {/* Main Public Header (Shown on all public & customer routes) */}
      {!isAdminRoute && !isProviderRoute && (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition">
                <div className="relative flex items-center justify-center">
                  <Home className="w-6 h-6 stroke-[2.2]" />
                  <Zap className="w-3 h-3 text-amber-300 fill-amber-300 absolute -bottom-0.5 -right-1" />
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                  Punjab <span className="text-blue-700">Services</span>
                </div>
                <div className="text-[11px] font-medium text-slate-500 tracking-wide mt-0.5">
                  Local Home & Tech Services
                </div>
              </div>
            </Link>

            {/* Desktop Center Navigation */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700 whitespace-nowrap">
              <Link
                href="/"
                className={`py-2 relative transition whitespace-nowrap ${
                  pathname === '/'
                    ? 'text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-700 after:rounded-full'
                    : 'hover:text-blue-700'
                }`}
              >
                {t('nav.home', 'Home')}
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  onClick={() => router.push('/services')}
                  className={`flex items-center gap-1 py-2 relative transition whitespace-nowrap ${
                    pathname?.startsWith('/services')
                      ? 'text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-700 after:rounded-full'
                      : 'hover:text-blue-700'
                  }`}
                >
                  <span>{t('nav.services', 'Services')}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {servicesOpen && (
                  <div className="absolute left-0 top-full pt-2 w-80 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 grid gap-1">
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="px-3 py-2 rounded-xl bg-blue-50/70 text-blue-700 font-bold text-xs flex items-center justify-between hover:bg-blue-100/70 transition"
                      >
                        <span>Browse All 5 Categories & 40 Services</span>
                        <span>→</span>
                      </Link>
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/services/${cat.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                            <Wrench className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm group-hover:text-blue-700">
                              {cat.name[language]}
                            </div>
                            <div className="text-xs text-slate-500 line-clamp-1">
                              {cat.tagline[language]}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/how-it-works"
                className={`py-2 relative transition whitespace-nowrap ${
                  pathname === '/how-it-works'
                    ? 'text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-700 after:rounded-full'
                    : 'hover:text-blue-700'
                }`}
              >
                {t('nav.howItWorks', 'How it Works')}
              </Link>

              <Link
                href="/become-a-professional"
                className={`py-2 relative transition whitespace-nowrap ${
                  pathname === '/become-a-professional'
                    ? 'text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-700 after:rounded-full'
                    : 'hover:text-blue-700'
                }`}
              >
                {t('nav.forProfessionals', 'For Professionals')}
              </Link>

              <Link
                href="/offers"
                className={`py-2 relative transition whitespace-nowrap ${
                  pathname === '/offers'
                    ? 'text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-700 after:rounded-full'
                    : 'hover:text-blue-700'
                }`}
              >
                {t('nav.offers', 'Offers')}
              </Link>

              <Link
                href="/support"
                className={`py-2 relative transition whitespace-nowrap ${
                  pathname === '/support'
                    ? 'text-blue-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-700 after:rounded-full'
                    : 'hover:text-blue-700'
                }`}
              >
                {t('nav.support', 'Support')}
              </Link>
            </nav>

            {/* Right Controls: Search Icon, Language Pill, Login OR Logged-in Customer Account */}
            <div className="flex items-center gap-2.5 shrink-0">
              <Link
                href="/search"
                className="p-2.5 rounded-full text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition"
                title="Search Services"
              >
                <Search className="w-4 h-4" />
              </Link>

              {/* Language Dropdown (`🌐 EN v`) */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold transition border border-slate-200 whitespace-nowrap"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-700" />
                  <span>{langBadge[language]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
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
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-blue-50 ${
                          language === item.code
                            ? 'bg-blue-50/70 text-blue-700 font-bold'
                            : 'text-slate-700 font-medium'
                        }`}
                      >
                        <span>{item.label}</span>
                        {language === item.code && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
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
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-blue-600 text-blue-700 hover:bg-blue-50 text-xs font-bold transition whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t('nav.login', 'Login')}</span>
                </Link>
              ) : (
                <>
                  {/* Notifications Bell (Only when logged in) */}
                  <Link
                    href="/account/notifications"
                    className="relative p-2.5 rounded-full text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition"
                    title="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Link>

                  {/* Logged-In Customer Account Pill */}
                  <div className="relative">
                    <button
                      onClick={() => setAccountOpen(!accountOpen)}
                      className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 transition whitespace-nowrap"
                      title="Customer Account Menu"
                    >
                      <img
                        src={currentCustomer.avatar}
                        alt={currentCustomer.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-xs font-bold text-blue-950">
                        {currentCustomer.name.split(' ')[0]}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-blue-700" />
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
                            className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Customer Dashboard</span>
                          </Link>
                          <Link
                            href="/account/bookings"
                            onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>My Bookings & Estimates</span>
                          </Link>
                          <Link
                            href="/account/addresses"
                            onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium"
                          >
                            <MapPin className="w-4 h-4" />
                            <span>Saved Addresses</span>
                          </Link>
                          <Link
                            href="/account/invoices"
                            onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium"
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
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
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
                    className="flex-1 text-center py-2.5 rounded-xl border border-blue-600 text-blue-700 font-bold text-xs"
                  >
                    Login
                  </Link>
                ) : (
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl border border-blue-600 text-blue-700 font-bold text-xs"
                  >
                    My Account ({currentCustomer.name.split(' ')[0]})
                  </Link>
                )}
                <Link
                  href="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl bg-blue-700 text-white font-bold text-xs"
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
