'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Headphones,
  LayoutGrid,
  Mail,
  MessageCircle,
  MessageSquare,
  Paperclip,
  PhoneCall,
  RefreshCcw,
  Search,
  Send,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { SupportTicket } from '@/types/marketplace';
import supportHeroBg from './images/Friendly Punjab Services Support Center.png';
import ctaHomeBanner from '../services/images/Moody Modern Home Exterior Banner.png';

type ArticleTopic =
  | 'All'
  | 'Booking Assistance'
  | 'Payment & Billing'
  | 'Refunds & Cancellations'
  | 'Provider Support'
  | 'Account & Verification';

export default function SupportCentrePage() {
  const { tickets, bookings, createSupportTicket, replyToTicket, showToast } =
    useMarketplace();

  const [articleSearch, setArticleSearch] = useState('');
  const [activeTopic, setActiveTopic] = useState<ArticleTopic>('All');
  const [selectedCategory, setSelectedCategory] =
    useState<SupportTicket['category']>('Booking Issue');
  const [bookingId, setBookingId] = useState('PB-2026-8901');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachedFileName, setAttachedFileName] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const [activeTicketId, setActiveTicketId] = useState(
    tickets[0]?.id || 'TKT-2026-104'
  );

  const allHelpArticles = [
    {
      title: 'How the ₹199 Visiting & Inspection Charge is Adjusted',
      category: 'Payment & Billing' as const,
      summary:
        'When you approve the digital estimate after inspection, your initial visiting fee is adjusted into the final work invoice.',
      icon: FileText,
    },
    {
      title: 'Approving, Rejecting, or Requesting Clarification on an Estimate',
      category: 'Booking Assistance' as const,
      summary:
        'Every technician submits an itemized Labour + Material estimate. Learn how to review and approve it in one click.',
      icon: Calendar,
    },
    {
      title: 'Submitting & Tracking a Cancellation or Refund Request',
      category: 'Refunds & Cancellations' as const,
      summary:
        'Step-by-step guide to cancelling a scheduled slot and tracking your refund reference ID in /account/refunds.',
      icon: RefreshCcw,
    },
    {
      title: 'Provider Verification Checklist & Document Resubmission',
      category: 'Provider Support' as const,
      summary:
        'Guide for individual technicians and business agencies on uploading Aadhaar, skill certificates, and checking verification status.',
      icon: ShieldCheck,
    },
    {
      title: 'Managing Addresses, Phone Number & Account Verification',
      category: 'Account & Verification' as const,
      summary:
        'Update saved Mohali, Chandigarh or Hoshiarpur service addresses and verify your contact details for instant updates.',
      icon: UserCheck,
    },
  ];

  const helpArticles = allHelpArticles.filter((a) => {
    const matchesTopic = activeTopic === 'All' || a.category === activeTopic;
    const q = articleSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q);
    return matchesTopic && matchesSearch;
  });

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;
    const created = createSupportTicket(
      subject.trim(),
      selectedCategory,
      description.trim(),
      bookingId
    );
    setActiveTicketId(created.id);
    setSubject('');
    setDescription('');
    setAttachedFileName('');
  };

  const activeTicket =
    tickets.find((t) => t.id === activeTicketId) || tickets[0];

  const topicItems: { id: ArticleTopic; label: string; icon: React.ElementType }[] = [
    { id: 'All', label: `All Topics (${allHelpArticles.length})`, icon: LayoutGrid },
    { id: 'Booking Assistance', label: 'Booking Assistance', icon: Calendar },
    { id: 'Payment & Billing', label: 'Payment & Billing', icon: CreditCard },
    { id: 'Refunds & Cancellations', label: 'Refunds & Cancellations', icon: RefreshCcw },
    { id: 'Provider Support', label: 'Provider Support', icon: UserCheck },
    { id: 'Account & Verification', label: 'Account & Verification', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f6] pb-16">
      {/* 1. HERO SECTION WITH CUSTOM SUPPORT CENTER BACKGROUND IMAGE */}
      <section className="relative overflow-hidden text-white pt-12 pb-20 lg:py-16 border-b border-emerald-400/30">
        <img
          src={supportHeroBg.src}
          alt="Friendly Punjab Services Support Center"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041418]/75 border border-emerald-400/35 text-emerald-200 text-xs font-bold backdrop-blur-sm shadow-lg">
              <Headphones className="w-3.5 h-3.5 text-[#36f1a2]" />
              <span>24×7 Trilingual Support (English • Punjabi • Hindi)</span>
            </span>
          </div>

          <div className="max-w-2xl space-y-5">

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
                Punjab Services{' '}
                <span className="block text-[#36f1a2]">Support Centre</span>
              </h1>
              <p className="text-xs sm:text-sm text-emerald-50 max-w-xl leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.65)]">
                Get help, find answers, manage your bookings, payments, refunds
                and more — all in one place.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-full p-1.5 shadow-2xl flex items-center gap-2 max-w-xl text-slate-900 border border-emerald-200/60">
              <Search className="w-4 h-4 text-emerald-600 ml-3.5 shrink-0" />
              <input
                type="text"
                value={articleSearch}
                onChange={(e) => setArticleSearch(e.target.value)}
                placeholder='Search help articles, e.g. "refund", "visiting fee", "booking"...'
                className="w-full text-xs sm:text-sm py-2 px-1 bg-transparent focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  showToast(
                    `Showing ${helpArticles.length} matching help guide(s).`,
                    'info'
                  )
                }
                aria-label="Search help articles"
                className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 transition shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Popular Help Searches */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-emerald-100 font-semibold drop-shadow">
                Popular Searches:
              </span>
              {[
                { label: 'Booking Status', q: 'estimate' },
                { label: 'Refund Policy', q: 'refund' },
                { label: 'Visiting Fee', q: 'visiting' },
                { label: 'Estimate Approval', q: 'estimate' },
              ].map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => setArticleSearch(pill.q)}
                  className="px-3 py-1 rounded-full bg-[#041418]/70 hover:bg-emerald-400 hover:text-slate-950 border border-white/25 text-emerald-100 font-semibold text-[11px] transition"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 2. FOUR QUICK ASSISTANCE CARDS */}
        <section className="-mt-8 relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 pt-3">
          {[
            {
              title: 'Booking Assistance',
              desc: 'Reschedule, track arrival or review estimates.',
              icon: Calendar,
              href: '/booking/tracking?bookingId=PB-2026-8901',
              cardBg:
                'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-400/50 shadow-[0_14px_32px_rgba(5,150,105,0.28)]',
              iconBg: 'bg-[#041418] text-emerald-300 border-emerald-400/60',
            },
            {
              title: 'Payment Assistance',
              desc: 'Download invoices, check charges and fee adjustments.',
              icon: CreditCard,
              href: '/account/invoices',
              cardBg:
                'bg-gradient-to-br from-cyan-600 to-blue-700 text-white border-cyan-300/50 shadow-[0_14px_32px_rgba(8,145,178,0.28)]',
              iconBg: 'bg-[#041418] text-cyan-300 border-cyan-300/60',
            },
            {
              title: 'Refund Assistance',
              desc: 'Request a refund and check your refund status.',
              icon: RefreshCcw,
              href: '/account/refunds',
              cardBg:
                'bg-gradient-to-br from-[#06292d] via-[#08383d] to-[#041b1e] text-white border-emerald-400/50 shadow-[0_16px_36px_rgba(6,41,45,0.35)]',
              iconBg: 'bg-[#041418] text-[#36f1a2] border-emerald-400/60',
            },
            {
              title: 'Provider Assistance',
              desc: 'Onboarding, document verification and payouts.',
              icon: UserCheck,
              href: '/provider/verification',
              cardBg:
                'bg-gradient-to-br from-violet-600 to-indigo-700 text-white border-violet-300/50 shadow-[0_14px_32px_rgba(109,40,217,0.28)]',
              iconBg: 'bg-[#041418] text-violet-300 border-violet-300/60',
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className={`relative group rounded-2xl p-5 pt-8 border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between gap-3 ${card.cardBg}`}
              >
                <div
                  className={`absolute -top-5 left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-xl flex items-center justify-center shadow-md border transition-transform group-hover:scale-110 ${card.iconBg}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-sm text-white">
                      {card.title}
                    </h3>
                    <p className="text-xs mt-1 leading-relaxed text-white/85">
                      {card.desc}
                    </p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 shadow">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </section>

        {/* 3. HELP ARTICLES & GUIDES (Category Sidebar + Compact Article Cards) */}
        <section className="space-y-5">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Help Articles &amp; Guides
              </h2>
            </div>
            <p className="text-xs text-slate-600">
              Browse step-by-step guides and solutions for common questions.
            </p>
            <Link
              href="/faq"
              className="px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-emerald-500 text-xs font-extrabold text-emerald-700 inline-flex items-center gap-1.5 shadow-sm transition"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sticky Category Sidebar */}
            <aside className="lg:col-span-3 lg:sticky lg:top-24 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm space-y-1">
              {topicItems.map((topic) => {
                const Icon = topic.icon;
                const isActive = activeTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setActiveTopic(topic.id)}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition ${
                      isActive
                        ? 'bg-[#06292d] text-[#36f1a2] shadow'
                        : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{topic.label}</span>
                  </button>
                );
              })}
            </aside>

            {/* Compact Article Cards */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 pt-3">
              {helpArticles.length === 0 ? (
                <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
                  <div className="text-sm font-extrabold text-slate-900">
                    No matching articles found
                  </div>
                  <p className="text-xs text-slate-500">
                    Try clearing your search or selecting &ldquo;All Topics&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setArticleSearch('');
                      setActiveTopic('All');
                    }}
                    className="px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                helpArticles.map((art, i) => {
                  const Icon = art.icon;
                  const isOddLast =
                    helpArticles.length % 2 === 1 &&
                    i === helpArticles.length - 1;
                  return (
                    <div
                      key={i}
                      onClick={() =>
                        showToast(`Opened guide: "${art.title}"`, 'info')
                      }
                      className={`relative group bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 p-5 pt-7 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isOddLast
                          ? 'md:col-span-2 md:max-w-lg md:mx-auto w-full'
                          : ''
                      }`}
                    >
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3.5 py-0.5 rounded-full bg-[#041418] border border-emerald-400/50 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider shadow-md whitespace-nowrap">
                        {art.category}
                      </span>
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors">
                            {art.title}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {art.summary}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 shrink-0 mt-1 transition-all" />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* 4. COMPLAINT FORM + LIVE TICKET TRACKER SIDE-BY-SIDE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Left 6 Cols: Raise a Complaint Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-card space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Submit a Complaint or Support Ticket
                </h2>
                <p className="text-xs text-slate-500">
                  Facing an issue? Let us know and our support team will help you.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitComplaint} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Issue Category *
                  </label>
                  <select
                    aria-label="Issue Category"
                    value={selectedCategory}
                    onChange={(e) =>
                      setSelectedCategory(
                        e.target.value as SupportTicket['category']
                      )
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Booking Issue">Booking Issue</option>
                    <option value="Estimate Dispute">Estimate Dispute</option>
                    <option value="Payment & Refund">Payment &amp; Refund</option>
                    <option value="Provider Verification">
                      Provider Verification
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Related Booking ID (Optional)
                  </label>
                  <select
                    aria-label="Related Booking ID"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-emerald-500"
                  >
                    {bookings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.id} ({b.subcategoryName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief summary of your issue"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe how our support team can help you..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const demoFile = 'invoice-screenshot-demo.png';
                    setAttachedFileName(demoFile);
                    showToast(`Attached ${demoFile} (demo)`, 'info');
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 inline-flex items-center gap-1.5 transition"
                >
                  <Paperclip className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {attachedFileName || 'Attach Files (Optional)'}
                  </span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md transition inline-flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Support Ticket</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right 6 Cols: Live Support Ticket Tracker (Demo) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Live Support Ticket Tracker (Demo)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Track your raised tickets and get real-time updates.
                  </p>
                </div>
              </div>
              <select
                aria-label="Select Ticket"
                value={activeTicket?.id}
                onChange={(e) => setActiveTicketId(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
              >
                {tickets.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.id} — {t.status}
                  </option>
                ))}
              </select>
            </div>

            {activeTicket && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-extrabold text-emerald-900">
                      Reference: {activeTicket.id} • {activeTicket.category}
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      {activeTicket.subject}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Assigned to: {activeTicket.assignedExecutive}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold shrink-0">
                    {activeTicket.status}
                  </span>
                </div>

                {/* Conversation Thread */}
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {activeTicket.messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl text-xs ${
                        m.role === 'User'
                          ? 'bg-slate-100 text-slate-800 border border-slate-200/70'
                          : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white ml-4 shadow-sm'
                      }`}
                    >
                      <div className="font-bold flex justify-between text-[11px] opacity-85 mb-1">
                        <span>
                          {m.sender} ({m.role})
                        </span>
                        <span>{m.timestamp}</span>
                      </div>
                      <p className="leading-relaxed">{m.text}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <input
                    type="text"
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder="Add a reply to this support ticket..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    aria-label="Send ticket reply"
                    onClick={() => {
                      if (!replyInput.trim()) return;
                      replyToTicket(
                        activeTicket.id,
                        activeTicket.userName,
                        'User',
                        replyInput.trim()
                      );
                      setReplyInput('');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold inline-flex items-center gap-1.5 shadow transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 5. BOTTOM NEED IMMEDIATE HELP? BANNER (Live Chat, Call Support, Email Us + Symmetrical BG Image) */}
        <section className="relative overflow-hidden rounded-3xl border border-emerald-400/40 p-6 sm:p-8 shadow-2xl text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <img
              src={ctaHomeBanner.src}
              alt="Punjab Services Support"
              className="md:hidden w-full h-full object-cover object-right"
            />
            <img
              src={ctaHomeBanner.src}
              alt=""
              aria-hidden="true"
              className="hidden md:block absolute left-0 top-0 bottom-0 w-[50.5%] h-full object-cover object-right -scale-x-100"
            />
            <img
              src={ctaHomeBanner.src}
              alt="Punjab Services Support"
              className="hidden md:block absolute right-0 top-0 bottom-0 w-[50.5%] h-full object-cover object-right"
            />
            <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-24 bg-gradient-to-r from-transparent via-[#061c22]/75 to-transparent" />
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#041418]/85 border border-emerald-400/50 text-[#36f1a2] flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Need Immediate Help?
              </h2>
              <p className="text-xs text-emerald-100/90 max-w-md mt-0.5">
                For urgent booking, service delays or other critical issues,
                connect with our support team right away.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                showToast(
                  'Live Chat connected with Navjot Kaur (Support Exec — Demo).',
                  'success'
                )
              }
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm transition text-left"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900">
                  Live Chat
                </div>
                <div className="text-[11px] text-slate-500">Chat with us now</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                showToast('Demo Helpline: +91 98765 43210 (24×7 Tricity Desk)', 'info')
              }
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm transition text-left"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900">
                  Call Support
                </div>
                <div className="text-[11px] text-slate-500">+91 98765 43210</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                showToast('Support Email: support@punjabservices.in', 'info')
              }
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm transition text-left"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900">
                  Email Us
                </div>
                <div className="text-[11px] text-slate-500">
                  support@punjabservices.in
                </div>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
