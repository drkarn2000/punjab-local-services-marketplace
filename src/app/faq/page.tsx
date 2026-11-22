'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  HelpCircle,
  MessageSquarePlus,
  Search,
} from 'lucide-react';
import { FAQ_ITEMS } from '@/data/mockData';

const EXTRA_FAQS = [
  ...FAQ_ITEMS,
  {
    id: 'faq-8',
    category: 'Customer',
    q: 'Can I switch the website language between English, Punjabi, and Hindi?',
    a: 'Yes! Use the global language selector in the top header to switch between English (EN), Punjabi (Gurmukhi), and Hindi (Devanagari) at any time.',
  },
  {
    id: 'faq-9',
    category: 'Booking',
    q: 'What is the difference between Instant Booking and Scheduled Booking?',
    a: 'Instant Booking dispatches the earliest available nearby professional within 45–60 minutes. Scheduled Booking lets you pick a convenient 2-hour slot on your preferred date.',
  },
  {
    id: 'faq-10',
    category: 'Payment',
    q: 'Can I download a printable invoice after paying for my service?',
    a: 'Yes, every booking generates a digital invoice in /account/invoices and on the Live Booking Tracking screen with one-click Print and PDF download.',
  },
  {
    id: 'faq-11',
    category: 'Cancellation',
    q: 'How do I request a refund for a cancelled or disputed booking?',
    a: 'Visit /account/refunds, select the eligible booking, choose your refund reason, and submit. You will immediately receive a demo refund reference ID to track.',
  },
  {
    id: 'faq-12',
    category: 'Provider',
    q: 'Can a Business Provider add multiple technicians and assign them to jobs?',
    a: 'Yes! Business accounts have a dedicated Team Management module (/provider/team) where they can add technicians, manage availability, and assign specific technicians to incoming bookings.',
  },
  {
    id: 'faq-13',
    category: 'Verification',
    q: 'What documents are required for Provider Verification?',
    a: 'Individual professionals submit Government Identity (Aadhaar/PAN), Local Address Proof, and Trade/Skill Certificate. Business agencies additionally provide Shop/MSME/GST registration.',
  },
  {
    id: 'faq-14',
    category: 'Account',
    q: 'How do I manage my notification preferences?',
    a: 'Inside /account/preferences or /account/notifications, you can toggle demo Email, SMS, Push, and Promotional Offer notifications.',
  },
];

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [openId, setOpenId] = useState<string>('faq-1');

  const categories = [
    'All',
    'Customer',
    'Booking',
    'Payment',
    'Cancellation',
    'Provider',
    'Verification',
    'Account',
  ];

  const filteredFaqs = EXTRA_FAQS.filter((item) => {
    if (activeCat !== 'All' && item.category !== activeCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      <section className="bg-gradient-to-r from-[#041418] via-[#133882] to-[#0f1c38] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            Everything you need to know about bookings, hybrid estimates,
            payments, refunds, and partner verification.
          </p>

          <div className="bg-white rounded-2xl p-2 shadow-xl flex items-center gap-2 max-w-xl mx-auto text-slate-900">
            <Search className="w-4 h-4 text-emerald-600 ml-2 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions (e.g. visiting fee, estimate, refund, verification)..."
              className="w-full text-xs sm:text-sm py-2 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                activeCat === cat
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400'
              }`}
            >
              {cat === 'Cancellation' ? 'Cancellation & Refund' : `${cat} FAQs`}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-6 pt-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="relative bg-white rounded-2xl border border-slate-200 shadow-sm pt-2"
              >
                <span className="absolute -top-3 left-5 z-20 px-3.5 py-0.5 rounded-full bg-[#041418] border border-emerald-400/50 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider shadow-md whitespace-nowrap">
                  {faq.category}
                </span>
                <button
                  onClick={() => setOpenId(isOpen ? '' : faq.id)}
                  className="w-full p-5 rounded-2xl text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support CTA */}
        <div className="bg-emerald-50 rounded-3xl border border-emerald-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Still have a question?
              </h3>
              <p className="text-xs text-slate-600">
                Raise a ticket in our Support Centre or contact our local team.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5">
            <Link
              href="/support"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Open Support Centre</span>
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
