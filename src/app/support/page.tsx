'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  CreditCard,
  Headphones,
  MessageSquare,
  RefreshCcw,
  Search,
  Send,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { SupportTicket } from '@/types/marketplace';

export default function SupportCentrePage() {
  const { tickets, bookings, createSupportTicket, replyToTicket } =
    useMarketplace();

  const [articleSearch, setArticleSearch] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<SupportTicket['category']>('Booking Issue');
  const [bookingId, setBookingId] = useState('PB-2026-8901');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const [activeTicketId, setActiveTicketId] = useState(
    tickets[0]?.id || 'TKT-2026-104'
  );

  const helpArticles = [
    {
      title: 'How the ₹199 Visiting & Inspection Charge is Adjusted',
      category: 'Payment Assistance',
      summary:
        'When you approve the digital estimate after inspection, your initial visiting fee is adjusted into the final work invoice.',
    },
    {
      title: 'Approving, Rejecting, or Requesting Clarification on an Estimate',
      category: 'Booking Assistance',
      summary:
        'Every technician submits an itemized Labour + Material estimate. Learn how to review and approve it in one click.',
    },
    {
      title: 'Submitting & Tracking a Cancellation or Refund Request',
      category: 'Refund Assistance',
      summary:
        'Step-by-step guide to cancelling a scheduled slot and tracking your refund reference ID in /account/refunds.',
    },
    {
      title: 'Provider Verification Checklist & Document Resubmission',
      category: 'Provider Assistance',
      summary:
        'Guide for individual technicians and business agencies on uploading Aadhaar, skill certificates, and checking verification status.',
    },
  ].filter(
    (a) =>
      !articleSearch.trim() ||
      a.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      a.summary.toLowerCase().includes(articleSearch.toLowerCase())
  );

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
  };

  const activeTicket =
    tickets.find((t) => t.id === activeTicketId) || tickets[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      <section className="bg-gradient-to-r from-[#081d4a] via-[#133882] to-[#1e4db7] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-cyan-300 text-xs font-bold">
            <Headphones className="w-4 h-4" /> 24×7 Trilingual Customer & Partner
            Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold">
            Punjab Services Support Centre
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto">
            Search help articles, get booking & refund assistance, raise a
            complaint, or track your live support ticket reference.
          </p>

          <div className="bg-white rounded-2xl p-2 shadow-xl flex items-center gap-2 max-w-xl mx-auto text-slate-900">
            <Search className="w-4 h-4 text-blue-600 ml-2 shrink-0" />
            <input
              type="text"
              value={articleSearch}
              onChange={(e) => setArticleSearch(e.target.value)}
              placeholder="Search help articles (e.g. estimate, refund, visiting fee, verification)..."
              className="w-full text-xs sm:text-sm py-2 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 space-y-10">
        {/* 4 Assistance Category Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'Booking Assistance',
              desc: 'Reschedule slots, track arrival, or review hybrid estimates.',
              icon: <Calendar className="w-5 h-5 text-blue-600" />,
              href: '/booking/tracking?bookingId=PB-2026-8901',
            },
            {
              title: 'Payment Assistance',
              desc: 'Download GST/demo invoices and check visiting fee adjustments.',
              icon: <CreditCard className="w-5 h-5 text-blue-600" />,
              href: '/account/invoices',
            },
            {
              title: 'Refund Assistance',
              desc: 'Submit a refund request and check your refund reference status.',
              icon: <RefreshCcw className="w-5 h-5 text-blue-600" />,
              href: '/account/refunds',
            },
            {
              title: 'Provider Assistance',
              desc: 'Help with partner onboarding, document verification & payouts.',
              icon: <UserCheck className="w-5 h-5 text-blue-600" />,
              href: '/provider/verification',
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:border-blue-500 transition space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                {card.title}
              </h3>
              <p className="text-xs text-slate-600">{card.desc}</p>
            </Link>
          ))}
        </div>

        {/* Help Articles */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Help Articles & Guides ({helpArticles.length})</span>
            </h2>
            <Link
              href="/faq"
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              View All FAQs →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helpArticles.map((art, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-1.5"
              >
                <span className="text-[10px] font-extrabold uppercase text-blue-700">
                  {art.category}
                </span>
                <div className="font-bold text-slate-900 text-sm">
                  {art.title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {art.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Complaint Submission + Live Ticket Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Left 6 Cols: Raise a Complaint Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900">
              Submit a Complaint or Support Ticket
            </h2>
            <form onSubmit={handleSubmitComplaint} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Issue Category
                  </label>
                  <select
                    aria-label="Issue Category"
                    value={selectedCategory}
                    onChange={(e) =>
                      setSelectedCategory(
                        e.target.value as SupportTicket['category']
                      )
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
                  >
                    <option value="Booking Issue">Booking Issue</option>
                    <option value="Estimate Dispute">Estimate Dispute</option>
                    <option value="Payment & Refund">Payment & Refund</option>
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
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe how our support team can help you..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow transition inline-flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Support Ticket</span>
              </button>
            </form>
          </div>

          {/* Right 6 Cols: Live Support Ticket Status & Conversation */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">
                Live Support Ticket Tracker (Demo)
              </h2>
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
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-extrabold text-blue-900">
                      Reference: {activeTicket.id} • {activeTicket.category}
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      {activeTicket.subject}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Assigned to: {activeTicket.assignedExecutive}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0">
                    {activeTicket.status}
                  </span>
                </div>

                {/* Conversation Thread */}
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {activeTicket.messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl text-xs ${
                        m.role === 'User'
                          ? 'bg-slate-100 text-slate-800'
                          : 'bg-blue-600 text-white ml-4'
                      }`}
                    >
                      <div className="font-bold flex justify-between text-[11px] opacity-80 mb-0.5">
                        <span>
                          {m.sender} ({m.role})
                        </span>
                        <span>{m.timestamp}</span>
                      </div>
                      <p>{m.text}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <input
                    type="text"
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder="Add a reply to this support ticket..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                  <button
                    type="button"
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
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
