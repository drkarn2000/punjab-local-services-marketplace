'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  BadgeCheck,
  Calendar,
  Check,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  MapPin,
  Phone,
  Printer,
  ShieldCheck,
  Sparkles,
  Star,
  XCircle,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  BOOKING_LIFECYCLE_STEPS,
  BookingEstimate,
  BookingStatus,
} from '@/types/marketplace';

function TrackingContent() {
  const searchParams = useSearchParams();
  const requestedId = searchParams?.get('bookingId') || 'PB-2026-8901';

  const {
    bookings,
    updateBookingStatus,
    submitEstimate,
    respondToEstimate,
    completePayment,
    submitReview,
    cancelBooking,
    showToast,
  } = useMarketplace();

  const [selectedBookingId, setSelectedBookingId] = useState(requestedId);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState(
    'Arrived on time, shared a transparent estimate before starting work, and fixed the problem neatly!'
  );
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const booking =
    bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const currentStepIndex = BOOKING_LIFECYCLE_STEPS.indexOf(booking.status);

  const handleAdvanceNextStep = () => {
    // If estimate is not created yet and we reach Estimate Sent / Customer Approval Pending, create a sample estimate automatically
    if (
      (booking.status === 'Inspection Started' ||
        booking.status === 'Estimate Sent') &&
      !booking.estimate
    ) {
      const autoEst: BookingEstimate = {
        id: `EST-${Date.now().toString().slice(-4)}`,
        bookingId: booking.id,
        providerId: booking.providerId,
        providerName: booking.providerName,
        createdAt: '14 Nov 2026, Just Now',
        workDescription: `Completed on-site inspection for ${booking.subcategoryName}. Identified required repair and spare replacement.`,
        visitingFee: booking.visitingFee,
        labourItems: [
          {
            id: 'l-1',
            type: 'labour',
            description: `${booking.subcategoryName} Standard Labour`,
            quantity: 1,
            unitPrice: 350,
          },
        ],
        materialItems: [
          {
            id: 'm-1',
            type: 'material',
            description: 'Genuine ISI Marked Replacement Component',
            quantity: 1,
            unitPrice: 450,
          },
        ],
        additionalCharges: 0,
        discount: booking.couponDiscount || 0,
        taxPercent: 5,
        subtotal: booking.visitingFee + 350 + 450 - (booking.couponDiscount || 0),
        taxAmount: 45,
        totalEstimate:
          booking.visitingFee + 350 + 450 - (booking.couponDiscount || 0) + 45,
        notes: 'Visiting fee adjusted. 15-day workmanship warranty included.',
        status: 'Pending Approval',
      };
      submitEstimate(booking.id, autoEst);
      return;
    }

    if (booking.status === 'Customer Approval Pending') {
      respondToEstimate(booking.id, 'Approved');
      return;
    }

    if (booking.status === 'Work Completed') {
      completePayment(booking.id, 'UPI (Demo)');
      return;
    }

    if (booking.status === 'Payment Completed') {
      submitReview(booking.id, rating, reviewText);
      return;
    }

    const nextIdx = currentStepIndex + 1;
    if (nextIdx >= 0 && nextIdx < BOOKING_LIFECYCLE_STEPS.length) {
      updateBookingStatus(booking.id, BOOKING_LIFECYCLE_STEPS[nextIdx]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6">
      {/* Printable Demo Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="text-lg font-extrabold text-emerald-900">
                  PUNJAB SERVICES — TAX INVOICE (DEMO)
                </div>
                <div className="text-xs text-slate-500">
                  Invoice ID: {booking.invoiceId} • Booking Ref: {booking.id}
                </div>
              </div>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-slate-700">
              <div>
                <div className="font-bold text-slate-900">Billed To:</div>
                <div>{booking.customerName}</div>
                <div>
                  {booking.address.houseFlat}, {booking.address.streetLocality},{' '}
                  {booking.address.city} - {booking.address.pinCode}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-900">
                  Service Professional:
                </div>
                <div>{booking.providerName}</div>
                <div>Category: {booking.categoryName}</div>
                <div>Payment Ref: {booking.transactionRef}</div>
              </div>
            </div>

            <table className="w-full text-xs border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="p-2.5 text-left border border-slate-200">
                    Item Description
                  </th>
                  <th className="p-2.5 text-center border border-slate-200">
                    Type
                  </th>
                  <th className="p-2.5 text-right border border-slate-200">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2.5 border border-slate-200">
                    Platform Visiting & Inspection Charge
                  </td>
                  <td className="p-2.5 text-center border border-slate-200">
                    Visiting Fee
                  </td>
                  <td className="p-2.5 text-right border border-slate-200 font-semibold">
                    ₹{booking.visitingFee}
                  </td>
                </tr>
                {booking.estimate?.labourItems.map((li) => (
                  <tr key={li.id}>
                    <td className="p-2.5 border border-slate-200">
                      {li.description} (x{li.quantity})
                    </td>
                    <td className="p-2.5 text-center border border-slate-200">
                      Labour
                    </td>
                    <td className="p-2.5 text-right border border-slate-200 font-semibold">
                      ₹{li.quantity * li.unitPrice}
                    </td>
                  </tr>
                ))}
                {booking.estimate?.materialItems.map((mi) => (
                  <tr key={mi.id}>
                    <td className="p-2.5 border border-slate-200">
                      {mi.description} (x{mi.quantity})
                    </td>
                    <td className="p-2.5 text-center border border-slate-200">
                      Material
                    </td>
                    <td className="p-2.5 text-right border border-slate-200 font-semibold">
                      ₹{mi.quantity * mi.unitPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="text-xs text-slate-500">
                Payment Status:{' '}
                <strong className="text-emerald-700">
                  {booking.paymentStatus} ({booking.paymentMethod})
                </strong>
              </div>
              <div className="text-lg font-extrabold text-slate-900">
                Total: ₹{booking.finalTotal}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') window.print();
                }}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50"
              >
                <Printer className="w-3.5 h-3.5" /> Print Invoice
              </button>
              <button
                onClick={() => {
                  showToast(
                    `Downloaded ${booking.invoiceId}.pdf (Frontend Demo Document)`,
                    'success'
                  );
                  setShowInvoiceModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-700"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full space-y-6">
        {/* Top Demo Simulator Bar */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Live 12-Step Booking Tracker
            </span>
            <select
              aria-label="Switch Booking"
              value={booking.id}
              onChange={(e) => setSelectedBookingId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl text-white"
            >
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id} — {b.subcategoryName} ({b.status})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {currentStepIndex < BOOKING_LIFECYCLE_STEPS.length - 1 &&
              booking.status !== 'Cancelled' && (
                <button
                  onClick={handleAdvanceNextStep}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow"
                >
                  Simulate Next Step:{' '}
                  {BOOKING_LIFECYCLE_STEPS[currentStepIndex + 1]} →
                </button>
              )}
            <Link
              href={`/booking/estimate?bookingId=${booking.id}`}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition"
            >
              Open Hybrid Estimate Screen
            </Link>
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" /> View Invoice
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Left 8 Columns: 12-Step Lifecycle Status Grid + Timeline */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-600">
                    Booking ID: {booking.id}
                  </span>
                  <h1 className="text-2xl font-extrabold text-slate-900">
                    {booking.categoryName} — {booking.subcategoryName}
                  </h1>
                </div>
                <span
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold ${
                    booking.status === 'Cancelled' ||
                    booking.status === 'Rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  Current Status: {booking.status}
                </span>
              </div>

              {/* All 12 States Interactive Progress Grid */}
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  12-Stage Marketplace Lifecycle (Click any stage to test transition)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {BOOKING_LIFECYCLE_STEPS.map((st, idx) => {
                    const isDone = currentStepIndex > idx;
                    const isCurrent = booking.status === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => updateBookingStatus(booking.id, st)}
                        className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                          isCurrent
                            ? 'border-emerald-600 bg-emerald-600 text-white shadow-md'
                            : isDone
                            ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950'
                            : 'border-slate-200 bg-slate-50/60 text-slate-500 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold opacity-80">
                            STEP {idx + 1}
                          </span>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : isCurrent ? (
                            <Sparkles className="w-4 h-4 text-amber-300" />
                          ) : null}
                        </div>
                        <div className="text-xs font-bold leading-snug">
                          {st}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Banner if Estimate Approval or Payment or Review is Next */}
              {booking.status === 'Customer Approval Pending' &&
                booking.estimate && (
                  <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-extrabold text-slate-900">
                        Action Required: Review & Approve Estimate (₹
                        {booking.estimate.totalEstimate})
                      </div>
                      <p className="text-xs text-slate-700">
                        {booking.providerName} has inspected the issue and sent
                        an itemized estimate. Work cannot begin until you approve.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => respondToEstimate(booking.id, 'Approved')}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow"
                      >
                        Approve Estimate (₹{booking.estimate.totalEstimate})
                      </button>
                      <Link
                        href={`/booking/estimate?bookingId=${booking.id}`}
                        className="px-3.5 py-2.5 rounded-xl bg-white border border-amber-400 text-slate-900 text-xs font-bold"
                      >
                        Inspect Breakdown
                      </Link>
                    </div>
                  </div>
                )}

              {booking.status === 'Work Completed' && (
                <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">
                      Work Completed! Complete Demo Payment (₹
                      {booking.finalTotal})
                    </div>
                    <p className="text-xs text-slate-600">
                      Choose your preferred demo payment mode to settle the
                      invoice.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => completePayment(booking.id, 'UPI (Demo)')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" /> Pay via UPI (Demo)
                    </button>
                    <button
                      onClick={() =>
                        completePayment(booking.id, 'Cash After Service')
                      }
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                    >
                      Mark Cash Paid
                    </button>
                  </div>
                </div>
              )}

              {(booking.status === 'Payment Completed' ||
                booking.status === 'Work Completed') &&
                !booking.reviewSubmitted && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Rate Your Experience with {booking.providerName}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((starNum) => (
                        <button
                          key={starNum}
                          type="button"
                          onClick={() => setRating(starNum)}
                          className="p-1"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              starNum <= rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-2">
                        {rating} / 5 Stars
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white"
                    />
                    <button
                      onClick={() =>
                        submitReview(booking.id, rating, reviewText)
                      }
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                    >
                      Submit Verified Review
                    </button>
                  </div>
                )}

              {/* Chronological Activity Log */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Chronological Booking Timeline
                </h3>
                <div className="space-y-2.5 border-l-2 border-emerald-200 ml-2 pl-4">
                  {booking.timeline.map((event, i) => (
                    <div key={i} className="relative">
                      <span className="w-3 h-3 rounded-full bg-emerald-600 absolute -left-[23px] top-1 ring-4 ring-white" />
                      <div className="text-xs font-extrabold text-slate-900">
                        {event.status}{' '}
                        <span className="font-normal text-slate-400 ml-1">
                          • {event.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{event.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Provider Card + Price Summary + Cancel/Support */}
          <aside className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-card space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase">
                Assigned Professional
              </div>
              <div className="flex items-center gap-3.5">
                <img
                  src={booking.providerAvatar}
                  alt={booking.providerName}
                  className="w-16 h-16 rounded-2xl object-cover"
                />
                <div>
                  <Link
                    href={`/professionals/${booking.providerSlug}`}
                    className="text-base font-extrabold text-slate-900 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <span>{booking.providerName}</span>
                    <BadgeCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  </Link>
                  <div className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{booking.providerPhone}</span>
                  </div>
                  {booking.assignedTechnicianName && (
                    <div className="text-[11px] text-emerald-700 font-bold mt-1">
                      Assigned Team Tech: {booking.assignedTechnicianName}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    {booking.address.houseFlat},{' '}
                    {booking.address.streetLocality}, {booking.address.city} -{' '}
                    {booking.address.pinCode}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {booking.date} • {booking.timeSlot}
                  </span>
                </div>
              </div>

              {/* Price Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="font-extrabold text-slate-900 text-sm">
                  Hybrid Price Summary
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Platform Visiting Fee</span>
                  <span className="font-bold">₹{booking.visitingFee}</span>
                </div>
                {booking.estimate && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-600">
                        Labour Charges ({booking.estimate.labourItems.length})
                      </span>
                      <span className="font-bold">
                        ₹
                        {booking.estimate.labourItems.reduce(
                          (acc, x) => acc + x.quantity * x.unitPrice,
                          0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">
                        Material Cost ({booking.estimate.materialItems.length})
                      </span>
                      <span className="font-bold">
                        ₹
                        {booking.estimate.materialItems.reduce(
                          (acc, x) => acc + x.quantity * x.unitPrice,
                          0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">GST / Taxes</span>
                      <span className="font-bold">
                        ₹{booking.estimate.taxAmount}
                      </span>
                    </div>
                  </>
                )}
                {booking.couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({booking.couponCode})</span>
                    <span>-₹{booking.couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold text-slate-900">
                  <span>Final Total</span>
                  <span>₹{booking.finalTotal}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/booking/estimate?bookingId=${booking.id}`}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center"
                >
                  Review Estimate
                </Link>
                <button
                  onClick={() => setShowInvoiceModal(true)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-emerald-600 text-slate-700 text-xs font-bold"
                >
                  Invoice PDF
                </button>
              </div>

              {booking.status !== 'Cancelled' &&
                booking.status !== 'Work Completed' &&
                booking.status !== 'Payment Completed' &&
                booking.status !== 'Review Submitted' && (
                  <button
                    onClick={() =>
                      cancelBooking(
                        booking.id,
                        'Customer cancelled from tracking screen'
                      )
                    }
                    className="w-full py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Cancel Booking
                  </button>
                )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function BookingTrackingPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm">Loading live booking tracker...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
