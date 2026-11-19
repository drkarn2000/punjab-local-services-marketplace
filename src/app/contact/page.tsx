'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';

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
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      <section className="bg-gradient-to-r from-[#041418] via-[#133882] to-[#0f1c38] text-white py-12">
        <div className="w-full px-4 sm:px-6 text-center space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold">Contact Us</h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto">
            Have a question about a booking, estimate, or partner onboarding in
            Mohali, Chandigarh, or Hoshiarpur? Reach out to our local team.
          </p>
        </div>
      </section>

      <div className="w-full px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-5">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Send Us a Message
            </h2>

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
                    Your inquiry has been logged in our Support Centre and Admin
                    Ticket queue. Our team responds within 30 minutes during
                    operating hours.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jaspreet Kaur"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.demo"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 00000-00000 (Placeholder)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Subject <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Booking help / Estimate query / Partner inquiry"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Message <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your query or feedback..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>

          {/* Right 5 Columns: Contact Placeholders, Business Hours, Service Areas & Map Placeholder */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900">
                Contact Information (Placeholders)
              </h3>
              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">
                      Support Email Placeholder:
                    </strong>
                    <span>support-placeholder@punjabservices.demo</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">
                      Support Phone Placeholder:
                    </strong>
                    <span>+91 00000-00000 (Toll-Free Support Placeholder)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">
                      Business Hours:
                    </strong>
                    <span>Monday – Sunday: 08:00 AM to 09:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">
                      Service Areas & Regional Hubs:
                    </strong>
                    <span>
                      • Mohali Hub: Phase 7 / Sector 70 (Demo Hub Placeholder)
                      <br />• Chandigarh Hub: Sector 17 / Sector 35 (Demo Hub
                      Placeholder)
                      <br />• Hoshiarpur Hub: Model Town / Civil Lines (Demo Hub
                      Placeholder)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-6 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider">
                  Regional Coverage Map Placeholder
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="h-44 rounded-2xl bg-slate-950/50 border border-white/15 flex flex-col items-center justify-center p-4 text-center space-y-2">
                <MapPin className="w-8 h-8 text-amber-400" />
                <div className="text-sm font-bold">
                  Mohali • Chandigarh • Hoshiarpur
                </div>
                <p className="text-[11px] text-emerald-200 max-w-xs">
                  Interactive Map Placeholder (No external Google Maps API integration required in Frontend Prototype Phase).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
