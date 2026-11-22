'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Headphones,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Tag,
  User,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import contactHeroBg from './images/Sunset Open Hand Monument Park Support Banner.png';
import twilightVillasBg from '../about/images/Twilight Villas Along a Curving Road-2.png';
import moodyModernHomeBanner from '../services/images/Moody Modern Home Exterior Banner.png';

export default function ContactPage() {
  const { createSupportTicket, showToast } = useMarketplace();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('Please complete all required fields before submitting.');
      showToast('Please fill out all required contact fields.', 'warning');
      return;
    }
    setErrorMsg(null);
    const tkt = createSupportTicket(subject.trim(), 'Other', message.trim());
    setSubmittedRef(tkt.id);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] pb-16">
      {/* 1. HERO SECTION WITH CHANDIGARH SUNSET OPEN HAND BANNER */}
      <section className="relative text-white py-12 pb-16 lg:py-16 lg:pb-20 border-b border-emerald-400/30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={contactHeroBg.src}
            alt="Sunset Open Hand Monument Park Support Banner"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#031618]/55 via-[#031618]/65 to-[#031618]/75" />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#041418]/75 border border-emerald-400/45 text-emerald-200 text-xs font-bold backdrop-blur-sm">
              <Headphones className="w-3.5 h-3.5 text-[#36f1a2]" />
              <span>Get in Touch</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
              Contact Us
            </h1>

            <p className="text-xs sm:text-sm text-emerald-50/95 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              Have a question about a booking, estimate, or partner onboarding in
              Mohali, Chandigarh, or Hoshiarpur? Reach out to our local team.
            </p>
          </div>
        </div>

        {/* Bottom Border Centered Trust Strip */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 inline-flex items-center justify-center gap-x-4 sm:gap-x-5 px-5 py-2 rounded-full bg-[#041418] border border-emerald-400/50 text-xs font-bold text-emerald-100 shadow-[0_10px_28px_rgba(4,20,24,0.45)] whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#36f1a2]" />
            Quick Response
          </span>
          <span className="text-white/30">|</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#36f1a2]" />
            Verified Support
          </span>
          <span className="text-white/30">|</span>
          <span className="inline-flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-[#36f1a2]" />
            Local Team
          </span>
        </div>
      </section>

      {/* 2. BALANCED TWO-COLUMN MAIN WORKSPACE */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-7 items-stretch pt-2">
          {/* Left 6 Columns: Send Us a Message Form */}
          <div className="lg:col-span-6 relative bg-white rounded-3xl border border-slate-200 p-6 pt-9 sm:p-8 sm:pt-10 shadow-sm flex flex-col justify-between space-y-5">
            <h2 className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041418] border border-emerald-400/50 text-white text-xs sm:text-sm font-extrabold shadow-lg whitespace-nowrap">
              <Mail className="w-4 h-4 text-[#36f1a2]" />
              <span>Send Us a Message</span>
            </h2>

            <div className="space-y-5">
              <p className="text-xs text-slate-500 text-center">
                Fill out the form below and our support team will get back to you
                shortly.
              </p>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
                  {errorMsg}
                </div>
              )}

              {submittedRef && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950 space-y-1">
                    <div className="font-extrabold text-sm">
                      Message Received! Demo Reference: {submittedRef}
                    </div>
                    <p>
                      Your inquiry has been logged in our Support Centre and
                      Admin Ticket queue. Our team responds within 30 minutes
                      during operating hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Jaspreet Kaur"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.demo"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600 transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 00000-00000"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Subject <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <Tag className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Booking Help / Estimate Query"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600 transition"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">
                    Message <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5 pointer-events-none" />
                    <textarea
                      rows={5}
                      maxLength={500}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your query, request, or feedback here..."
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-emerald-200 text-xs sm:text-sm bg-emerald-50/80 focus:bg-emerald-50/40 focus:outline-none focus:border-emerald-600 transition"
                    />
                  </div>
                  <div className="text-right text-[11px] text-slate-400 mt-1 font-medium">
                    {message.length} / 500
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition inline-flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right 6 Columns: Contact Info (3 Equal Cols) + Regional Hub Cards + Live Chat CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-5">
            {/* Card 1: Contact Information in 3 Equal Columns */}
            <div className="relative rounded-3xl border border-emerald-400/35 p-6 pt-9 shadow-xl text-white space-y-5">
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <img
                  src={twilightVillasBg.src}
                  alt="Contact Information background"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#041418]/70" />
              </div>

              <h2 className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041418] border border-emerald-400/50 text-white text-xs sm:text-sm font-extrabold shadow-lg whitespace-nowrap">
                <Phone className="w-4 h-4 text-[#36f1a2]" />
                <span>Contact Information</span>
              </h2>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15 text-center">
                <div className="py-3 sm:py-1 sm:px-3 flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/15 border border-emerald-400/35 text-[#36f1a2] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-extrabold text-white">
                    Email Us
                  </div>
                  <div className="text-[11px] text-emerald-100/90 break-all">
                    support@punjabservices.demo
                  </div>
                </div>

                <div className="py-3 sm:py-1 sm:px-3 flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/15 border border-emerald-400/35 text-[#36f1a2] flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-extrabold text-white">
                    Call Support
                  </div>
                  <div className="text-[11px] text-emerald-100/90">
                    +91 00000-00000
                    <span className="block text-[10px] text-emerald-200/70">
                      (Toll-Free Placeholder)
                    </span>
                  </div>
                </div>

                <div className="py-3 sm:py-1 sm:px-3 flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/15 border border-emerald-400/35 text-[#36f1a2] flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-extrabold text-white">
                    Business Hours
                  </div>
                  <div className="text-[11px] text-emerald-100/90">
                    Mon – Sun
                    <span className="block text-[10px] text-emerald-200/70">
                      08:00 AM – 09:00 PM IST
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Service Areas & Regional Hubs (Separate Cards for Mohali, Chandigarh, Hoshiarpur) */}
            <div className="rounded-3xl bg-gradient-to-br from-[#041b1e] via-[#06292d] to-[#041418] border border-emerald-400/35 p-6 shadow-xl text-white space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-400/15 border border-emerald-400/35 text-[#36f1a2] flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-white">
                    Service Areas &amp; Regional Hubs
                  </h3>
                </div>
                <Link
                  href="/services"
                  className="px-3.5 py-1.5 rounded-full bg-[#36f1a2] hover:bg-emerald-300 text-slate-950 text-[11px] font-extrabold inline-flex items-center gap-1 shadow transition"
                >
                  <span>View Coverage Map</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    city: 'Mohali',
                    area: 'Phase 7 / Sector 70',
                    note: '(Demo Hub)',
                    href: '/mohali',
                  },
                  {
                    city: 'Chandigarh',
                    area: 'Sector 17 / Sector 35',
                    note: '(Demo Hub)',
                    href: '/chandigarh',
                  },
                  {
                    city: 'Hoshiarpur',
                    area: 'Model Town / Civil Lines',
                    note: '(Demo Hub)',
                    href: '/hoshiarpur',
                  },
                ].map((hub) => (
                  <Link
                    key={hub.city}
                    href={hub.href}
                    className="group rounded-2xl bg-white/5 hover:bg-white/10 border border-emerald-400/25 hover:border-emerald-300/70 p-3.5 transition-all flex items-start gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-400/15 text-[#36f1a2] flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold text-white group-hover:text-[#36f1a2] transition-colors">
                        {hub.city}
                      </div>
                      <div className="text-[11px] text-emerald-100/80 leading-snug mt-0.5">
                        {hub.area}
                      </div>
                      <div className="text-[10px] text-emerald-200/60">
                        {hub.note}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Card 3: Need Immediate Help? Live Chat CTA */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-400/35 p-5 sm:p-6 shadow-xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <img
                  src={moodyModernHomeBanner.src}
                  alt="Immediate Help background"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#041418]/70" />
              </div>

              <div className="relative z-10 flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-400/15 border border-emerald-400/40 text-[#36f1a2] flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white">
                    Need Immediate Help?
                  </h3>
                  <p className="text-xs text-emerald-100/90 mt-0.5 leading-relaxed">
                    For urgent queries, booking issues, or service delays, connect
                    with our support team right away.
                  </p>
                </div>
              </div>

              <Link
                href="/support"
                onClick={() =>
                  showToast('Opening Support Centre Live Chat...', 'info')
                }
                className="relative z-10 px-5 py-2.5 rounded-xl bg-[#36f1a2] hover:bg-emerald-300 text-slate-950 text-xs font-extrabold inline-flex items-center justify-center gap-2 shadow-md shrink-0 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Live Chat Now</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
