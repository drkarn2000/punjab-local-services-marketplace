'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  Facebook,
  Home,
  Instagram,
  Linkedin,
  MapPin,
  Send,
  Youtube,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';

const FOOTER_BG_IMAGE =
  'https://images.unsplash.com/photo-1780571249151-3baafcc7b061?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D';

export function Footer() {
  const pathname = usePathname();
  const { showToast, setSelectedCity } = useMarketplace();
  const [email, setEmail] = useState('');

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/provider')) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address for newsletter updates.', 'warning');
      return;
    }
    showToast(`Subscribed ${email} to Punjab Services offers & updates!`, 'success');
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden text-slate-200 border-t border-cyan-400/30">
      {/* Background Image + Rich Sapphire Glass Overlay */}
      <img
        src={FOOTER_BG_IMAGE}
        alt="Punjab Services Footer Background"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#041418]/95 via-[#092930]/90 to-[#0f1c38]/90 backdrop-blur-[2px]" />
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Column 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_20px_rgba(56,189,248,0.45)] group-hover:scale-105 transition">
                <div className="relative flex items-center justify-center">
                  <Home className="w-5 h-5" />
                  <Zap className="w-3 h-3 text-amber-300 fill-amber-300 absolute -bottom-0.5 -right-1" />
                </div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-white leading-none group-hover:text-cyan-300 transition">
                  Punjab Services
                </div>
                <div className="text-[11px] text-cyan-300 font-semibold mt-0.5">
                  Local Home &amp; Tech Services
                </div>
              </div>
            </Link>
            <p className="text-xs text-emerald-100/85 leading-relaxed max-w-sm">
              Your trusted hyperlocal platform to discover, compare, and book
              verified electricians, plumbers, carpenters, laptop and mobile
              repair specialists at your doorstep.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={() => showToast('Opening Punjab Services Facebook Page (Demo)', 'info')}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-emerald-600 text-emerald-200 hover:text-white border border-white/15 hover:border-emerald-400 hover:-translate-y-1 hover:shadow-[0_0_16px_rgba(59,130,246,0.6)] flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={() => showToast('Opening Punjab Services Instagram Page (Demo)', 'info')}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-pink-600 text-pink-200 hover:text-white border border-white/15 hover:border-pink-400 hover:-translate-y-1 hover:shadow-[0_0_16px_rgba(236,72,153,0.6)] flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                onClick={() => showToast('Opening Punjab Services YouTube Channel (Demo)', 'info')}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-rose-600 text-rose-200 hover:text-white border border-white/15 hover:border-rose-400 hover:-translate-y-1 hover:shadow-[0_0_16px_rgba(244,63,94,0.6)] flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </button>
              <button
                onClick={() => showToast('Opening Punjab Services LinkedIn Page (Demo)', 'info')}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-teal-600 text-teal-200 hover:text-white border border-white/15 hover:border-teal-400 hover:-translate-y-1 hover:shadow-[0_0_16px_rgba(14,165,233,0.6)] flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-amber-300 font-extrabold text-xs uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs text-emerald-100/85">
              {[
                { label: 'Home', href: '/' },
                { label: 'All Services', href: '/services' },
                { label: 'How It Works', href: '/how-it-works' },
                { label: 'About Us', href: '/about' },
                { label: 'For Professionals', href: '/become-a-professional' },
                { label: 'Offers & Deals', href: '/offers' },
              ].map((lnk) => (
                <li key={lnk.href}>
                  <Link
                    href={lnk.href}
                    className="group inline-flex items-center gap-1.5 hover:text-amber-300 hover:translate-x-1 transition-all duration-200"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-amber-300 transition-all" />
                    <span>{lnk.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-amber-300 font-extrabold text-xs uppercase tracking-wider mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-xs text-emerald-100/85">
              {[
                { label: 'Electrician Services', href: '/services/electrician' },
                { label: 'Plumber Services', href: '/services/plumber' },
                { label: 'Carpenter Services', href: '/services/carpenter' },
                { label: 'Computer / Laptop Repair', href: '/services/computer-repair' },
                { label: 'Mobile Repair', href: '/services/mobile-repair' },
                { label: 'Search Professionals', href: '/search' },
              ].map((lnk) => (
                <li key={lnk.href}>
                  <Link
                    href={lnk.href}
                    className="group inline-flex items-center gap-1.5 hover:text-cyan-300 hover:translate-x-1 transition-all duration-200"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-cyan-300 transition-all" />
                    <span>{lnk.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support & Cities (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-amber-300 font-extrabold text-xs uppercase tracking-wider mb-4">
              Support &amp; Cities
            </h3>
            <ul className="space-y-2.5 text-xs text-emerald-100/85">
              {[
                { label: 'Help Center', href: '/support' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'FAQs', href: '/faq' },
                { label: 'Track Booking', href: '/booking/tracking?bookingId=PB-2026-8901' },
              ].map((lnk) => (
                <li key={lnk.href}>
                  <Link
                    href={lnk.href}
                    className="group inline-flex items-center gap-1.5 hover:text-cyan-300 hover:translate-x-1 transition-all duration-200"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-cyan-300 transition-all" />
                    <span>{lnk.label}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2 font-extrabold text-white text-[11px] uppercase tracking-wider">
                Launch Cities:
              </li>
              {[
                { name: 'Mohali', slug: 'mohali' as const },
                { name: 'Chandigarh', slug: 'chandigarh' as const },
                { name: 'Hoshiarpur', slug: 'hoshiarpur' as const },
              ].map((ct) => (
                <li key={ct.slug}>
                  <Link
                    href={`/${ct.slug}`}
                    onClick={() => setSelectedCity(ct.slug)}
                    className="inline-flex items-center gap-1.5 text-cyan-200 hover:text-amber-300 hover:translate-x-1 transition-all duration-200 font-semibold"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-300" /> {ct.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter Glass Card (2 cols -> use 2 cols or wrap nicely) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 shadow-lg hover:border-cyan-300/50 transition-all">
              <h3 className="text-white font-extrabold text-xs uppercase tracking-wider mb-2.5">
                Latest Updates
              </h3>
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex items-center bg-white rounded-xl p-1 shadow-inner">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full px-2 py-1.5 text-xs text-slate-900 bg-transparent focus:outline-none min-w-0"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 transition"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-emerald-100/80 leading-snug">
                  Seasonal offers &amp; Tricity updates.
                </p>
              </form>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <Link
                href="/provider"
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-amber-300/15 border border-amber-300/30 text-amber-300 hover:bg-amber-300 hover:text-slate-950 font-bold transition-all"
              >
                <span>Provider Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/admin"
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-400/15 border border-cyan-300/30 text-cyan-200 hover:bg-cyan-400 hover:text-slate-950 font-bold transition-all"
              >
                <span>Admin Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/75">
          <div>© 2026 Punjab Services. All Rights Reserved.</div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/terms-and-conditions"
              className="hover:text-amber-300 transition"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-white/25">|</span>
            <Link href="/privacy-policy" className="hover:text-amber-300 transition">
              Privacy Policy
            </Link>
            <span className="text-white/25">|</span>
            <Link
              href="/cancellation-refund-policy"
              className="hover:text-amber-300 transition"
            >
              Refund &amp; Cancellation
            </Link>
            <span className="text-white/25">|</span>
            <Link href="/provider-terms" className="hover:text-amber-300 transition">
              Provider Terms
            </Link>
            <span className="text-white/25">|</span>
            <Link
              href="/community-guidelines"
              className="hover:text-amber-300 transition"
            >
              Community Guidelines
            </Link>
            <span className="text-white/25">|</span>
            <Link href="/sitemap" className="hover:text-amber-300 transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
