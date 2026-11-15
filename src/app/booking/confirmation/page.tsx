'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams?.get('bookingId') || 'PB-2026-8901';
  const { bookings } = useMarketplace();

  const booking =
    bookings.find((b) => b.id === bookingId) || bookings[0];

  return (
    <div className="min-h-screen bg-[#f0f5ff] py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl border border-blue-100 shadow-2xl p-6 sm:p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5" /> Booking Reference: {booking.id}
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Booking Confirmed!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Your service request for <strong>{booking.subcategoryName}</strong>{' '}
            has been sent to <strong>{booking.providerName}</strong>. You can
            track live technician acceptance, arrival, and digital estimate below.
          </p>

          {/* Provider & Schedule Summary Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-left grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
            <div className="flex items-center gap-3.5">
              <img
                src={booking.providerAvatar}
                alt={booking.providerName}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white shadow"
              />
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">
                  Assigned Professional
                </div>
                <div className="text-sm font-extrabold text-slate-900 flex items-center gap-1">
                  <span>{booking.providerName}</span>
                  <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-100" />
                </div>
                <div className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-blue-600" />
                  <span>{booking.providerPhone}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>Date & Slot:</strong> {booking.date} ({booking.timeSlot})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>Address:</strong> {booking.address.houseFlat},{' '}
                  {booking.address.streetLocality}, {booking.address.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Visiting Charge:</strong> ₹{booking.visitingFee}{' '}
                  (Adjustable in final bill)
                </span>
              </div>
            </div>
          </div>

          {/* Initial Timeline Preview */}
          <div className="text-left bg-blue-50/50 rounded-2xl border border-blue-100 p-4 space-y-2">
            <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Recent Booking Timeline</span>
            </div>
            {booking.timeline.slice(-3).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs text-slate-700 bg-white px-3 py-2 rounded-xl border border-blue-100/80"
              >
                <div>
                  <strong className="text-blue-900">{item.status}:</strong>{' '}
                  {item.note}
                </div>
                <span className="text-[11px] text-slate-400 shrink-0 ml-2">
                  {item.timestamp}
                </span>
              </div>
            ))}
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href={`/booking/tracking?bookingId=${booking.id}`}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/25 transition inline-flex items-center gap-2"
            >
              <span>Track Live Booking Status</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={`/booking/estimate?bookingId=${booking.id}`}
              className="px-5 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition inline-flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>View / Approve Hybrid Estimate</span>
            </Link>

            <Link
              href="/"
              className="px-5 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition inline-flex items-center gap-1.5"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm">Loading booking confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
