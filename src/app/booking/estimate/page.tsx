'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  FileText,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Wrench,
  XCircle,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { BookingEstimate } from '@/types/marketplace';

function EstimateContent() {
  const searchParams = useSearchParams();
  const requestedId = searchParams?.get('bookingId') || 'PB-2026-8901';

  const {
    bookings,
    submitEstimate,
    respondToEstimate,
  } = useMarketplace();

  const [selectedBookingId, setSelectedBookingId] = useState(requestedId);
  const [clarificationNote, setClarificationNote] = useState('');

  const booking =
    bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const handleGenerateDemoEstimate = () => {
    const sampleEstimate: BookingEstimate = {
      id: `EST-${Date.now().toString().slice(-4)}`,
      bookingId: booking.id,
      providerId: booking.providerId,
      providerName: booking.providerName,
      createdAt: '14 Nov 2026, Just Now',
      workDescription: `Inspected ${booking.subcategoryName} at ${booking.address.streetLocality}. Below is the transparent breakdown of labour and spare materials required.`,
      visitingFee: booking.visitingFee,
      labourItems: [
        {
          id: 'li-a',
          type: 'labour',
          description: `${booking.subcategoryName} Fault Repair & Testing`,
          quantity: 1,
          unitPrice: 350,
        },
        {
          id: 'li-b',
          type: 'labour',
          description: 'Secondary Point Inspection & Safety Check',
          quantity: 1,
          unitPrice: 150,
        },
      ],
      materialItems: [
        {
          id: 'mi-a',
          type: 'material',
          description: 'Genuine Replacement Component (ISI Marked)',
          quantity: 1,
          unitPrice: 480,
        },
        {
          id: 'mi-b',
          type: 'material',
          description: 'Connectors, Fasteners & Consumables',
          quantity: 1,
          unitPrice: 140,
        },
      ],
      additionalCharges: 50,
      discount: booking.couponDiscount || 100,
      taxPercent: 5,
      subtotal: booking.visitingFee + 500 + 620 + 50 - (booking.couponDiscount || 100),
      taxAmount: 63,
      totalEstimate:
        booking.visitingFee + 500 + 620 + 50 - (booking.couponDiscount || 100) + 63,
      notes: 'Initial visiting fee is adjusted into this final bill. 15-day workmanship warranty included.',
      status: 'Pending Approval',
    };
    submitEstimate(booking.id, sampleEstimate);
  };

  const est = booking.estimate;

  const labourSubtotal = est
    ? est.labourItems.reduce((s, x) => s + x.quantity * x.unitPrice, 0)
    : 0;
  const materialSubtotal = est
    ? est.materialItems.reduce((s, x) => s + x.quantity * x.unitPrice, 0)
    : 0;

  return (
    <div className="min-h-screen bg-[#f0f5ff] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/booking/tracking?bookingId=${booking.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Live Booking Tracker</span>
          </Link>

          <select
            aria-label="Select Booking"
            value={booking.id}
            onChange={(e) => setSelectedBookingId(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-sm"
          >
            {bookings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.id} — {b.subcategoryName} ({b.providerName})
              </option>
            ))}
          </select>
        </div>

        {/* Main Estimate Card */}
        <div className="bg-white rounded-3xl border border-emerald-100 shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold">
                <FileText className="w-3.5 h-3.5" /> Hybrid Pricing & Digital
                Estimate
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Service Estimate — {booking.id}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Prepared by <strong>{booking.providerName}</strong> for{' '}
                {booking.categoryName} ({booking.subcategoryName})
              </p>
            </div>

            {est && (
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold ${
                  est.status === 'Approved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : est.status === 'Rejected'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                Estimate Status: {est.status}
              </span>
            )}
          </div>

          {!est ? (
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
              <Wrench className="w-10 h-10 text-emerald-600 mx-auto" />
              <h2 className="text-lg font-extrabold text-slate-900">
                Waiting for On-Site Inspection Estimate
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                In our Hybrid Pricing model, the technician inspects your issue
                at your doorstep first and then submits an itemized quote. Click
                below to simulate receiving the technician’s estimate right now!
              </p>
              <button
                onClick={handleGenerateDemoEstimate}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Simulate Receiving Technician Estimate Now</span>
              </button>
            </div>
          ) : (
            <>
              {/* Inspection Summary */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
                <div className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  <span>Technician Inspection Findings:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {est.workDescription}
                </p>
              </div>

              {/* Labour & Material Tables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Labour Items */}
                <div className="rounded-2xl border border-slate-200 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-extrabold text-slate-900 uppercase">
                      1. Provider Labour Charges
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      ₹{labourSubtotal}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {est.labourItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs text-slate-700"
                      >
                        <span>
                          {item.description} (x{item.quantity})
                        </span>
                        <span className="font-bold text-slate-900">
                          ₹{item.quantity * item.unitPrice}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Material Items */}
                <div className="rounded-2xl border border-slate-200 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-extrabold text-slate-900 uppercase">
                      2. Spare Parts & Material Cost
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      ₹{materialSubtotal}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {est.materialItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs text-slate-700"
                      >
                        <span>
                          {item.description} (x{item.quantity})
                        </span>
                        <span className="font-bold text-slate-900">
                          ₹{item.quantity * item.unitPrice}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Complete Hybrid Pricing Breakdown */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-2.5 text-xs sm:text-sm">
                <div className="font-extrabold text-slate-900 text-base pb-1 border-b border-slate-200">
                  Complete Hybrid Price Breakdown
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Platform Visiting & Inspection Fee</span>
                  <span className="font-bold">₹{est.visitingFee}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Provider Labour Charge</span>
                  <span className="font-bold">₹{labourSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Material / Spare Parts Cost</span>
                  <span className="font-bold">₹{materialSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Additional Work / Hardware Charge</span>
                  <span className="font-bold">₹{est.additionalCharges}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Promotional / Coupon Discount</span>
                  <span>-₹{est.discount}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes & GST ({est.taxPercent}% Demo Configurable)</span>
                  <span className="font-bold">₹{est.taxAmount}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-300 text-lg font-extrabold text-slate-900">
                  <span>Total Estimate Payable After Service</span>
                  <span className="text-emerald-700">₹{est.totalEstimate}</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Note: {est.notes}
                </p>
              </div>

              {/* Customer Decision Controls (Approve / Reject / Request Clarification) */}
              <div className="border-t border-slate-200 pt-5 space-y-4">
                <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3.5 py-2.5 rounded-xl font-medium">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Marketplace Protection Rule:</strong> The technician
                    cannot mark work in progress or completed in their portal
                    until you approve this estimate.
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => respondToEstimate(booking.id, 'Approved')}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Estimate (₹{est.totalEstimate})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      respondToEstimate(
                        booking.id,
                        'Rejected',
                        clarificationNote || 'Customer declined estimate'
                      )
                    }
                    className="px-5 py-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs sm:text-sm transition inline-flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject Estimate</span>
                  </button>
                </div>

                {/* Clarification Request Box */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <input
                    type="text"
                    value={clarificationNote}
                    onChange={(e) => setClarificationNote(e.target.value)}
                    placeholder="Have a question about a spare part or labour item? Ask the technician..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      respondToEstimate(
                        booking.id,
                        'Clarification Requested',
                        clarificationNote ||
                          'Please clarify spare part brand and warranty.'
                      );
                      setClarificationNote('');
                    }}
                    className="px-4 py-2.5 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-bold inline-flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Request Clarification</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingEstimatePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm">Loading estimate details...</div>}>
      <EstimateContent />
    </Suspense>
  );
}
