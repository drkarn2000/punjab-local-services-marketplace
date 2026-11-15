'use client';

import React, { useMemo, useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Printer,
  Calendar,
  MapPin,
  IndianRupee,
  Users,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Star,
  Clock,
  Layers,
  RefreshCw,
  MessageSquare,
} from 'lucide-react';
import type {
  BookingRecord,
  ProviderProfile,
  CustomerProfile,
  CategoryItem,
  CityItem,
  SupportTicket,
  ReviewItem,
} from '@/types/marketplace';

interface AdminReportsAnalyticsProps {
  bookings: BookingRecord[];
  providers: ProviderProfile[];
  customers: CustomerProfile[];
  categories: CategoryItem[];
  cities: CityItem[];
  supportTickets: SupportTicket[];
  reviews: ReviewItem[];
  activeReportType: string;
  setActiveReportType: (val: string) => void;
  reportDateRange: string;
  setReportDateRange: (val: string) => void;
  exportCsvFile: (
    filename: string,
    headers: string[],
    rows: (string | number)[][]
  ) => void;
}

const REPORT_TYPES = [
  { id: 'Booking Report', icon: Calendar },
  { id: 'Revenue Report', icon: IndianRupee },
  { id: 'Commission Report', icon: TrendingUp },
  { id: 'Provider Performance Report', icon: Star },
  { id: 'City Performance Report', icon: MapPin },
  { id: 'Category Demand Report', icon: Layers },
  { id: 'Cancellation Report', icon: AlertTriangle },
  { id: 'Refund Report', icon: RefreshCw },
  { id: 'Verification Turnaround Report', icon: ShieldCheck },
  { id: 'Customer Acquisition Report', icon: Users },
  { id: 'Support Ticket Resolution Report', icon: MessageSquare },
];

const DATE_RANGES = [
  { label: 'Last 7 Days', mult: 0.35 },
  { label: 'Last 30 Days', mult: 1 },
  { label: 'Quarter-to-Date', mult: 2.6 },
  { label: 'FY 2026–27', mult: 5.4 },
];

export default function AdminReportsAnalytics({
  bookings,
  providers,
  customers,
  categories,
  cities,
  supportTickets,
  reviews,
  activeReportType,
  setActiveReportType,
  reportDateRange,
  setReportDateRange,
  exportCsvFile,
}: AdminReportsAnalyticsProps) {
  const [cityFilter, setCityFilter] = useState<string>('All Cities');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const rangeMultiplier =
    DATE_RANGES.find((d) => d.label === reportDateRange)?.mult ?? 1;
  const cityMultiplier =
    cityFilter === 'All Cities'
      ? 1
      : cityFilter === 'Mohali'
        ? 0.42
        : cityFilter === 'Chandigarh'
          ? 0.38
          : 0.2;
  const scale = rangeMultiplier * cityMultiplier;

  const grossValue = useMemo(
    () => bookings.reduce((s, b) => s + b.finalTotal, 0),
    [bookings]
  );

  // Build tailored analytics model per report type
  const reportModel = useMemo(() => {
    const sInt = (n: number) => Math.max(1, Math.round(n * scale));
    const sMoney = (n: number) => Math.max(500, Math.round(n * scale));

    const baseBars = [
      { label: 'Mon', a: 48, b: 36 },
      { label: 'Tue', a: 62, b: 49 },
      { label: 'Wed', a: 55, b: 44 },
      { label: 'Thu', a: 79, b: 64 },
      { label: 'Fri', a: 94, b: 77 },
      { label: 'Sat', a: 118, b: 96 },
      { label: 'Sun', a: 102, b: 84 },
    ];

    switch (activeReportType) {
      case 'Revenue Report':
        return {
          subtitle: 'Gross Merchandise Value (GMV), GST collection & net platform take',
          kpis: [
            { label: 'Gross Booking GMV', value: `₹${sMoney(284500).toLocaleString('en-IN')}`, delta: '+21.4%', grad: 'from-blue-600 to-indigo-800', glow: 'glow-blue' },
            { label: 'Net Platform Take', value: `₹${sMoney(42675).toLocaleString('en-IN')}`, delta: '+18.2%', grad: 'from-emerald-500 to-teal-700', glow: 'glow-emerald' },
            { label: 'Avg Ticket Size', value: `₹${Math.round(grossValue / Math.max(1, bookings.length) + 420).toLocaleString('en-IN')}`, delta: '+6.5%', grad: 'from-violet-600 to-purple-800', glow: 'glow-purple' },
            { label: 'UPI / Online Share', value: '84.6%', delta: '+4.1%', grad: 'from-amber-500 to-orange-600', glow: 'glow-amber' },
          ],
          chartTitle: 'Daily Revenue Trend (₹ Thousands)',
          seriesPrimaryLabel: 'Gross GMV (₹K)',
          seriesSecondaryLabel: 'Provider Payouts (₹K)',
          bars: baseBars.map((b) => ({
            label: b.label,
            primary: Math.round(b.a * 0.55 * scale),
            secondary: Math.round(b.b * 0.45 * scale),
          })),
          donutTitle: 'Revenue by City',
          donutCenterLabel: 'Total GMV',
          donutCenterValue: `₹${Math.round(sMoney(284500) / 1000)}K`,
          donutSlices: [
            { name: 'Mohali', pct: 42, color: '#3b82f6' },
            { name: 'Chandigarh', pct: 39, color: '#10b981' },
            { name: 'Hoshiarpur', pct: 19, color: '#f59e0b' },
          ],
          tableHeaders: ['Category', 'Completed Jobs', 'Gross GMV (₹)', 'Commission (15%)', 'Avg Order Value'],
          tableRows: categories.map((c, idx) => {
            const jobs = sInt(48 + idx * 14);
            const rev = jobs * (690 + idx * 110);
            return [c.name.en, jobs, `₹${rev.toLocaleString('en-IN')}`, `₹${Math.round(rev * 0.15).toLocaleString('en-IN')}`, `₹${690 + idx * 110}`];
          }),
        };

      case 'Commission Report':
        return {
          subtitle: 'Individual (15%) vs Business Agency (13%) commission slab earnings',
          kpis: [
            { label: 'Total Commission Earned', value: `₹${sMoney(42675).toLocaleString('en-IN')}`, delta: '+16.8%', grad: 'from-emerald-500 to-teal-700', glow: 'glow-emerald' },
            { label: 'Individual Pro Slabs (15%)', value: `₹${sMoney(29870).toLocaleString('en-IN')}`, delta: '70% Share', grad: 'from-blue-600 to-indigo-800', glow: 'glow-blue' },
            { label: 'Business Partner Slabs (13%)', value: `₹${sMoney(12805).toLocaleString('en-IN')}`, delta: '30% Share', grad: 'from-violet-600 to-purple-800', glow: 'glow-purple' },
            { label: 'Effective Blended Rate', value: '14.4%', delta: 'On Target', grad: 'from-amber-500 to-orange-600', glow: 'glow-amber' },
          ],
          chartTitle: 'Daily Platform Commission vs Visiting Fee Retention',
          seriesPrimaryLabel: 'Job Commission (₹00)',
          seriesSecondaryLabel: 'Visiting Fee Share (₹00)',
          bars: baseBars.map((b) => ({
            label: b.label,
            primary: Math.round(b.a * 0.75 * scale),
            secondary: Math.round(b.b * 0.35 * scale),
          })),
          donutTitle: 'Commission by Category',
          donutCenterLabel: 'Blended',
          donutCenterValue: '14.4%',
          donutSlices: [
            { name: 'Electrician & Plumber', pct: 46, color: '#6366f1' },
            { name: 'Laptop & Mobile', pct: 34, color: '#06b6d4' },
            { name: 'Carpenter', pct: 20, color: '#f59e0b' },
          ],
          tableHeaders: ['Category', 'Commission Slab', 'Taxable Base (₹)', 'Platform Fee (₹)', 'Net to Pros (₹)'],
          tableRows: categories.map((c, idx) => {
            const base = sMoney(42000 + idx * 9500);
            const fee = Math.round((base * c.commissionPercent) / 100);
            return [c.name.en, `${c.commissionPercent}%`, `₹${base.toLocaleString('en-IN')}`, `₹${fee.toLocaleString('en-IN')}`, `₹${(base - fee).toLocaleString('en-IN')}`];
          }),
        };

      case 'Provider Performance Report':
        return {
          subtitle: 'Completion rate, SLA punctuality, estimate approval & customer CSAT',
          kpis: [
            { label: 'Active Verified Pros', value: `${providers.filter((p) => p.verificationStatus === 'Approved').length}/${providers.length}`, delta: '92% Active', grad: 'from-blue-600 to-indigo-800', glow: 'glow-blue' },
            { label: 'Avg Marketplace Rating', value: '4.83 ★', delta: '+0.12', grad: 'from-amber-500 to-orange-600', glow: 'glow-amber' },
            { label: 'On-Time Arrival SLA', value: '94.8%', delta: '+2.4%', grad: 'from-emerald-500 to-teal-700', glow: 'glow-emerald' },
            { label: 'Estimate Approval Rate', value: '91.2%', delta: 'High Trust', grad: 'from-violet-600 to-purple-800', glow: 'glow-purple' },
          ],
          chartTitle: 'Jobs Completed vs 5-Star Ratings Received',
          seriesPrimaryLabel: 'Completed Jobs',
          seriesSecondaryLabel: '5-Star Reviews',
          bars: baseBars.map((b) => ({
            label: b.label,
            primary: Math.round(b.a * scale),
            secondary: Math.round(b.b * 0.85 * scale),
          })),
          donutTitle: 'Provider Tier Split',
          donutCenterLabel: 'Avg CSAT',
          donutCenterValue: '4.83 ★',
          donutSlices: [
            { name: 'Top Rated (4.8+)', pct: 64, color: '#10b981' },
            { name: 'Standard (4.2–4.7)', pct: 28, color: '#3b82f6' },
            { name: 'Probation (<4.2)', pct: 8, color: '#f43f5e' },
          ],
          tableHeaders: ['Professional / Agency', 'City', 'Category', 'Completed Jobs', 'Rating'],
          tableRows: providers.slice(0, 6).map((p) => [
            p.businessName || p.name,
            p.cityName,
            p.categoryName,
            p.completedJobs,
            `${p.rating} ★ (${p.reviewCount})`,
          ]),
        };

      case 'City Performance Report':
        return {
          subtitle: 'Hyperlocal demand, supply coverage & response time across Punjab launch cities',
          kpis: [
            { label: 'Mohali Bookings', value: sInt(184), delta: '42% Share', grad: 'from-blue-600 to-indigo-800', glow: 'glow-blue' },
            { label: 'Chandigarh Bookings', value: sInt(162), delta: '38% Share', grad: 'from-emerald-500 to-teal-700', glow: 'glow-emerald' },
            { label: 'Hoshiarpur Bookings', value: sInt(86), delta: '+29% YoY', grad: 'from-amber-500 to-orange-600', glow: 'glow-amber' },
            { label: 'Avg Dispatch Time', value: '18 mins', delta: '-4 mins', grad: 'from-violet-600 to-purple-800', glow: 'glow-purple' },
          ],
          chartTitle: 'Weekly City Booking Volume Comparison',
          seriesPrimaryLabel: 'Mohali + CHD',
          seriesSecondaryLabel: 'Hoshiarpur',
          bars: baseBars.map((b) => ({
            label: b.label,
            primary: Math.round(b.a * scale),
            secondary: Math.round(b.b * 0.42 * scale),
          })),
          donutTitle: 'Demand Distribution',
          donutCenterLabel: 'Cities',
          donutCenterValue: '3 Live',
          donutSlices: [
            { name: 'Mohali', pct: 42, color: '#3b82f6' },
            { name: 'Chandigarh', pct: 38, color: '#8b5cf6' },
            { name: 'Hoshiarpur', pct: 20, color: '#10b981' },
          ],
          tableHeaders: ['Launch City', 'Service Localities', 'Verified Pros', 'Active Bookings', 'Avg ETA'],
          tableRows: cities.map((ct, i) => [
            ct.name.en,
            `${ct.localities.length} Sectors/Areas`,
            ct.providerCount,
            sInt(ct.activeBookingsCount + 80),
            i === 0 ? '16 mins' : i === 1 ? '18 mins' : '22 mins',
          ]),
        };

      case 'Category Demand Report':
        return {
          subtitle: 'Booking velocity across all 5 service verticals & 40 subcategories',
          kpis: [
            { label: 'Top Vertical', value: 'Electrician', delta: '31% Demand', grad: 'from-amber-500 to-orange-600', glow: 'glow-amber' },
            { label: 'Fastest Growing', value: 'Laptop Repair', delta: '+34% MoM', grad: 'from-violet-600 to-purple-800', glow: 'glow-purple' },
            { label: 'Total Subcategories', value: '40 Active', delta: '100% Live', grad: 'from-blue-600 to-indigo-800', glow: 'glow-blue' },
            { label: 'Repeat Booking Rate', value: '41.5%', delta: '+5.2%', grad: 'from-emerald-500 to-teal-700', glow: 'glow-emerald' },
          ],
          chartTitle: 'Daily Service Requests vs Fulfilled Jobs',
          seriesPrimaryLabel: 'Total Requests',
          seriesSecondaryLabel: 'Fulfilled Jobs',
          bars: baseBars.map((b) => ({
            label: b.label,
            primary: Math.round(b.a * scale),
            secondary: Math.round(b.a * 0.92 * scale),
          })),
          donutTitle: 'Category Share',
          donutCenterLabel: 'Verticals',
          donutCenterValue: '5 Core',
          donutSlices: [
            { name: 'Electrician & Plumber', pct: 52, color: '#f59e0b' },
            { name: 'Laptop & Mobile', pct: 30, color: '#3b82f6' },
            { name: 'Carpenter', pct: 18, color: '#10b981' },
          ],
          tableHeaders: ['Service Category', 'Visiting Fee', 'Active Pros', 'Demand Share', 'Top Subcategory'],
          tableRows: categories.map((c, idx) => [
            c.name.en,
            `₹${c.baseVisitingFee}`,
            c.providerCount,
            `${[31, 24, 18, 15, 12][idx] || 15}%`,
            c.popularTags[0] || 'Standard Service',
          ]),
        };

      case 'Cancellation Report':
        return {
          subtitle: 'Customer vs Provider cancellations, slot reschedules & root-cause analysis',
          kpis: [
            { label: 'Overall Cancel Rate', value: '4.8%', delta: '-1.1% Improved', grad: 'from-rose-500 to-pink-700', glow: 'glow-rose' },
            { label: 'Customer Initiated', value: sInt(14), delta: '64% of Cancels', grad: 'from-amber-500 to-orange-600', glow: 'glow-amber' },
            { label: 'Provider No-Show', value: sInt(4), delta: '18% of Cancels', grad: 'from-violet-600 to-purple-800', glow: 'glow-purple' },
            { label: 'Rescheduled & Saved', value: '72%', delta: 'Recovered', grad: 'from-emerald-500 to-teal-700', glow: 'glow-emerald' },
          ],
          chartTitle: 'Daily Cancellations vs Recovered Reschedules',
          seriesPrimaryLabel: 'Cancelled',
          seriesSecondaryLabel: 'Rescheduled',
          bars: baseBars.map((b) => ({
            label: b.label,
            primary: Math.max(1, Math.round(b.a * 0.08 * scale)),
            secondary: Math.max(1, Math.round(b.b * 0.12 * scale)),
          })),
          donutTitle: 'Cancellation Reasons',
          donutCenterLabel: 'Cancel Rate',
          donutCenterValue: '4.8%',
          donutSlices: [
            { name: 'Schedule Change', pct: 48, color: '#f59e0b' },
            { name: 'Price / Estimate', pct: 30, color: '#f43f5e' },
            { name: 'Pro Unavailable', pct: 22, color: '#6366f1' },
          ],
          tableHeaders: ['Reason Code', 'Incidents', 'Share %', 'Avg Timing', 'Action Taken'],
          tableRows: [
            ['Customer Schedule Conflict', sInt(9), '45%', '4 hrs before slot', 'Auto-reschedule offered'],
            ['Estimate Higher Than Budget', sInt(5), '25%', 'Post-inspection', 'Visiting fee only billed'],
            ['Technician Traffic / Delay', sInt(4), '20%', '30 mins before slot', 'Reassigned to nearest pro'],
            ['Duplicate Booking', sInt(2), '10%', 'Within 10 mins', 'Instant 100% refund'],
          ],
        };

      case 'Refund Report':
        return {
          subtitle: 'Refund turnaround time, dispute payouts & UPI reversal tracking',
          kpis: [
            { label: 'Total Refunds Processed', value: `₹${sMoney(4820).toLocaleString('en-IN')}`, delta: '1.7% of GMV', grad: 'from-rose-500 to-pink-700', glow: 'glow-rose' },
            { label: 'Avg Settlement TAT', value: '4.2 hrs', delta: 'Under 24h SLA', grad: 'from-emerald-500 to-teal-700', glow: 'glow-emerald' },
            { label: 'Pending Refund Queue', value: bookings.filter((b) => b.refundStatus && b.refundStatus !== 'None').length || 2, delta: 'Actionable', grad: 'from-amber-500 to-orange-600', glow: 'glow-amber' },
            { label: 'Auto-Approved UPI', value: '88%', delta: 'Instant Reversal', grad: 'from-blue-600 to-indigo-800', glow: 'glow-blue' },
          ],
          chartTitle: 'Daily Refund Volume (₹ Hundreds)',
          seriesPrimaryLabel: 'Processed (₹00)',
          seriesSecondaryLabel: 'Disputed (₹00)',
          bars: baseBars.map((b) => ({
            label: b.label,
            primary: Math.max(2, Math.round(b.a * 0.14 * scale)),
            secondary: Math.max(1, Math.round(b.b * 0.05 * scale)),
          })),
          donutTitle: 'Refund Channel Split',
          donutCenterLabel: 'Avg TAT',
          donutCenterValue: '4.2 hrs',
          donutSlices: [
            { name: 'UPI Instant', pct: 68, color: '#10b981' },
            { name: 'Card Reversal', pct: 22, color: '#3b82f6' },
            { name: 'Wallet Credit', pct: 10, color: '#8b5cf6' },
          ],
          tableHeaders: ['Refund ID', 'Booking Ref', 'Reason', 'Amount (₹)', 'Status'],
          tableRows: [
            ['RF-2026-101', 'PB-2026-8904', 'Early cancellation (>2h)', '₹199', 'Processed (UPI)'],
            ['RF-2026-102', 'PB-2026-8909', 'Duplicate visiting charge', '₹249', 'Processed (UPI)'],
            ['RF-2026-103', 'PB-2026-8912', 'Service quality partial credit', '₹350', 'Under Review'],
          ],
        };

      case 'Verification Turnaround Report':
        return {
          subtitle: 'Provider KYC, Aadhaar/PAN & skill certificate audit velocity',
          kpis: [
            { label: 'Avg Verification TAT', value: '6.4 hrs', delta: 'Target <12h', grad: 'from-blue-600 to-indigo-800', glow: 'glow-blue' },
            { label: 'First-Pass Approval', value: '86.5%', delta: '+4.2%', grad: 'from-emerald-500 to-teal-700', glow: 'glow-emerald' },
            { label: 'Pending KYC Queue', value: providers.filter((p) => p.verificationStatus !== 'Approved').length, delta: 'Needs Review', grad: 'from-amber-500 to-orange-600', glow: 'glow-amber' },
            { label: 'Docs Audited This Period', value: sInt(38), delta: '100% Logged', grad: 'from-violet-600 to-purple-800', glow: 'glow-purple' },
          ],
          chartTitle: 'Applications Reviewed vs Approved',
          seriesPrimaryLabel: 'Submitted',
          seriesSecondaryLabel: 'Approved',
          bars: baseBars.map((b) => ({
            label: b.label,
            primary: Math.max(2, Math.round(b.a * 0.16 * scale)),
            secondary: Math.max(2, Math.round(b.a * 0.14 * scale)),
          })),
          donutTitle: 'KYC Queue Status',
          donutCenterLabel: 'First-Pass',
          donutCenterValue: '86.5%',
          donutSlices: [
            { name: 'Approved', pct: 78, color: '#10b981' },
            { name: 'Under Review', pct: 14, color: '#f59e0b' },
            { name: 'Info Requested', pct: 8, color: '#f43f5e' },
          ],
          tableHeaders: ['Document Type', 'Avg Audit Time', 'Rejection Rate', 'Top Issue', 'SLA Status'],
          tableRows: [
            ['Aadhaar / Voter ID', '2.1 hrs', '4%', 'Blurry front scan', 'Within SLA'],
            ['Police / Address Proof', '3.8 hrs', '9%', 'Expired utility bill', 'Within SLA'],
            ['ITI / Trade Certificate', '4.5 hrs', '6%', 'Missing seal', 'Within SLA'],
            ['Agency GST / Shop Act', '5.2 hrs', '3%', 'Mismatch in trade name', 'Within SLA'],
          ],
        };

      case 'Customer Acquisition Report':
        return {
          subtitle: 'New customer signups, referral conversion & repeat retention cohorts',
          kpis: [
            { label: 'New Customers', value: sInt(312), delta: '+24.6%', grad: 'from-blue-600 to-indigo-800', glow: 'glow-blue' },
            { label: 'Repeat Customers', value: '44.2%', delta: '+6.1%', grad: 'from-emerald-500 to-teal-700', glow: 'glow-emerald' },
            { label: 'Coupon Redemptions', value: sInt(128), delta: 'PUNJAB100 Top', grad: 'from-amber-500 to-orange-600', glow: 'glow-amber' },
            { label: 'Active Profiles', value: customers.length, delta: 'Verified Mobile', grad: 'from-violet-600 to-purple-800', glow: 'glow-purple' },
          ],
          chartTitle: 'Daily New Signups vs Repeat Bookings',
          seriesPrimaryLabel: 'New Users',
          seriesSecondaryLabel: 'Repeat Bookings',
          bars: baseBars.map((b) => ({
            label: b.label,
            primary: Math.round(b.a * 0.65 * scale),
            secondary: Math.round(b.b * 0.52 * scale),
          })),
          donutTitle: 'Acquisition Channels',
          donutCenterLabel: 'Repeat',
          donutCenterValue: '44.2%',
          donutSlices: [
            { name: 'Google Local SEO', pct: 49, color: '#3b82f6' },
            { name: 'Customer Referrals', pct: 31, color: '#10b981' },
            { name: 'Direct / Offers', pct: 20, color: '#f59e0b' },
          ],
          tableHeaders: ['Acquisition Source', 'New Signups', 'First Booking %', 'Avg LTV (₹)', 'Retention'],
          tableRows: [
            ['City SEO Pages (/mohali/electrician)', sInt(152), '68%', '₹2,480', '48%'],
            ['WhatsApp / Friend Referral', sInt(96), '74%', '₹2,890', '54%'],
            ['Offer Banners (PUNJAB100)', sInt(64), '61%', '₹1,920', '36%'],
          ],
        };

      case 'Support Ticket Resolution Report':
        return {
          subtitle: 'Helpdesk ticket inflow, first-response SLA & dispute closure metrics',
          kpis: [
            { label: 'Total Tickets', value: Math.max(supportTickets.length, sInt(28)), delta: 'Low Escalation', grad: 'from-blue-600 to-indigo-800', glow: 'glow-blue' },
            { label: 'First Response Time', value: '14 mins', delta: 'SLA <30m', grad: 'from-emerald-500 to-teal-700', glow: 'glow-emerald' },
            { label: 'Resolved Within 24h', value: '95.4%', delta: '+3.1%', grad: 'from-violet-600 to-purple-800', glow: 'glow-purple' },
            { label: 'Open / Escalated', value: supportTickets.filter((t) => t.status !== 'Resolved').length, delta: 'Active Queue', grad: 'from-rose-500 to-pink-700', glow: 'glow-rose' },
          ],
          chartTitle: 'Daily Tickets Opened vs Closed',
          seriesPrimaryLabel: 'Opened',
          seriesSecondaryLabel: 'Resolved',
          bars: baseBars.map((b) => ({
            label: b.label,
            primary: Math.max(1, Math.round(b.a * 0.1 * scale)),
            secondary: Math.max(1, Math.round(b.a * 0.095 * scale)),
          })),
          donutTitle: 'Ticket Categories',
          donutCenterLabel: '24h SLA',
          donutCenterValue: '95.4%',
          donutSlices: [
            { name: 'Booking & Slot', pct: 44, color: '#3b82f6' },
            { name: 'Estimate Query', pct: 32, color: '#f59e0b' },
            { name: 'Payment / Invoice', pct: 24, color: '#10b981' },
          ],
          tableHeaders: ['Ticket ID', 'Subject', 'Category', 'Priority', 'Status'],
          tableRows: supportTickets.map((t) => [
            t.id,
            t.subject,
            t.category,
            t.priority,
            t.status,
          ]),
        };

      default: // Booking Report
        return {
          subtitle: 'End-to-end booking funnel, instant vs scheduled split & completion rate',
          kpis: [
            { label: 'Total Bookings', value: sInt(416), delta: '+18.4%', grad: 'from-blue-600 to-indigo-800', glow: 'glow-blue' },
            { label: 'Completion Rate', value: '96.2%', delta: '+1.9%', grad: 'from-emerald-500 to-teal-700', glow: 'glow-emerald' },
            { label: 'Instant vs Scheduled', value: '62% / 38%', delta: 'Instant Rising', grad: 'from-violet-600 to-purple-800', glow: 'glow-purple' },
            { label: 'Active in Field', value: bookings.filter((b) => !['Work Completed', 'Payment Completed', 'Review Submitted', 'Cancelled'].includes(b.status)).length, delta: 'Live Tracking', grad: 'from-amber-500 to-orange-600', glow: 'glow-amber' },
          ],
          chartTitle: 'Daily Bookings Volume (Instant vs Scheduled)',
          seriesPrimaryLabel: 'Total Bookings',
          seriesSecondaryLabel: 'Completed',
          bars: baseBars.map((b) => ({
            label: b.label,
            primary: Math.round(b.a * scale),
            secondary: Math.round(b.b * scale),
          })),
          donutTitle: 'Bookings by City',
          donutCenterLabel: 'Fulfillment',
          donutCenterValue: '96.2%',
          donutSlices: [
            { name: 'Mohali', pct: 42, color: '#3b82f6' },
            { name: 'Chandigarh', pct: 38, color: '#10b981' },
            { name: 'Hoshiarpur', pct: 20, color: '#f59e0b' },
          ],
          tableHeaders: ['Booking ID', 'Customer', 'Service & Pro', 'City', 'Total (₹) / Status'],
          tableRows: bookings.map((b) => [
            b.id,
            b.customerName,
            `${b.subcategoryName} (${b.providerName})`,
            b.address.city,
            `₹${b.finalTotal} • ${b.status}`,
          ]),
        };
    }
  }, [
    activeReportType,
    bookings,
    categories,
    cities,
    customers.length,
    grossValue,
    providers,
    scale,
    supportTickets,
    reviews.length,
  ]);

  const maxBarValue = Math.max(
    1,
    ...reportModel.bars.map((b) => Math.max(b.primary, b.secondary))
  );

  // Compute SVG donut stroke offsets
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  let runningOffset = 0;

  return (
    <div className="space-y-6">
      {/* Animated Right-to-Left Strip Header (Sticky on Scroll) */}
      <div className="w-full overflow-hidden rounded-2xl bg-[#091432]/95 backdrop-blur-md border border-cyan-400/30 py-2.5 px-4 shadow-[0_8px_24px_rgba(6,182,212,0.18)] lg:sticky lg:top-[68px] z-30">
        <div className="animate-marquee-rtl items-center gap-3 text-xs font-extrabold uppercase tracking-wider text-cyan-300">
          <BarChart3 className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Analytics &amp; Intelligence Suite</span>
          <span className="text-blue-400">•</span>
          <span className="text-white">{cityFilter}</span>
          <span className="text-blue-400">•</span>
          <span className="text-amber-300">{activeReportType}</span>
          <span className="text-blue-400">•</span>
          <span className="text-white">{reportModel.subtitle}</span>
        </div>
      </div>

      {/* Interactive Filters Bar */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0f1c3f] via-[#16295c] to-[#1e3a8a] border border-blue-400/30 p-4 sm:p-5 text-white shadow-xl flex flex-wrap items-center justify-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <select
            value={activeReportType}
            onChange={(e) => setActiveReportType(e.target.value)}
            aria-label="Select Report Type"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 border border-cyan-300/60 rounded-xl px-3.5 py-2 text-xs font-extrabold text-white focus:outline-none cursor-pointer shadow-md"
          >
            {REPORT_TYPES.map((rep) => (
              <option key={rep.id} value={rep.id} className="bg-slate-900 text-white font-bold">
                {rep.id}
              </option>
            ))}
          </select>

          <select
            value={reportDateRange}
            onChange={(e) => setReportDateRange(e.target.value)}
            className="bg-slate-900/90 border border-cyan-400/40 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none cursor-pointer"
          >
            {DATE_RANGES.map((d) => (
              <option key={d.label} value={d.label} className="bg-slate-900 text-white font-bold">
                {d.label}
              </option>
            ))}
          </select>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-slate-900/90 border border-cyan-400/40 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none cursor-pointer"
          >
            <option value="All Cities" className="bg-slate-900 text-white font-bold">All Cities</option>
            <option value="Mohali" className="bg-slate-900 text-white font-bold">Mohali</option>
            <option value="Chandigarh" className="bg-slate-900 text-white font-bold">Chandigarh</option>
            <option value="Hoshiarpur" className="bg-slate-900 text-white font-bold">Hoshiarpur</option>
          </select>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </button>

          <button
            onClick={() =>
              exportCsvFile(
                `${activeReportType.toLowerCase().replace(/\s+/g, '-')}-${cityFilter.toLowerCase().replace(/\s+/g, '-')}.csv`,
                reportModel.tableHeaders,
                reportModel.tableRows
              )
            }
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-lg hover:scale-105 transition"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* 4 Colorful Gradient KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {reportModel.kpis.map((kpi) => (
          <div
            key={kpi.label}
            className={`rounded-2xl p-5 text-white bg-gradient-to-br ${kpi.grad} ${kpi.glow} shadow-lg hover:-translate-y-1 transition-all`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-white/85">{kpi.label}</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold">
                {kpi.delta}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold mt-2">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid: Interactive Bar Chart + SVG Donut Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Multi-Series Bar Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-blue-200 p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {reportModel.chartTitle}
              </h3>
              <p className="text-xs text-slate-500">
                Hover over any day bar to inspect exact period figures
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-blue-600 to-cyan-400 inline-block" />
                {reportModel.seriesPrimaryLabel}
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-emerald-600 to-teal-400 inline-block" />
                {reportModel.seriesSecondaryLabel}
              </span>
            </div>
          </div>

          <div className="relative h-64 flex items-end justify-between gap-3 pt-8 pb-2 px-2 border-b border-l border-slate-200 bg-gradient-to-b from-slate-50/70 to-white rounded-xl">
            {/* Horizontal grid lines */}
            <div className="absolute inset-x-0 top-8 bottom-8 flex flex-col justify-between pointer-events-none px-2">
              {[0, 1, 2, 3].map((line) => (
                <div key={line} className="w-full border-t border-dashed border-slate-200" />
              ))}
            </div>

            {reportModel.bars.map((bar, idx) => {
              const pHeight = Math.max(10, Math.round((bar.primary / maxBarValue) * 100));
              const sHeight = Math.max(8, Math.round((bar.secondary / maxBarValue) * 100));
              const isHovered = hoveredBar === idx;
              return (
                <div
                  key={bar.label}
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                  className="flex-1 flex flex-col items-center justify-end h-full relative z-10 group cursor-pointer"
                >
                  {isHovered && (
                    <div className="absolute -top-2 bg-slate-950 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap z-20">
                      {bar.label}: {bar.primary} / {bar.secondary}
                    </div>
                  )}
                  <div className="w-full flex items-end justify-center gap-1.5 h-44 px-1">
                    <div
                      style={{ height: `${pHeight}%` }}
                      className="w-4 sm:w-5 rounded-t-lg bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-400 shadow-md group-hover:brightness-110 transition-all duration-300"
                    />
                    <div
                      style={{ height: `${sHeight}%` }}
                      className="w-4 sm:w-5 rounded-t-lg bg-gradient-to-t from-emerald-600 to-teal-400 shadow-md group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-600 mt-2">
                    {bar.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SVG Donut Breakdown Card (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-blue-200 p-6 shadow-xl flex flex-col justify-between space-y-5">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {reportModel.donutTitle}
            </h3>
            <p className="text-xs text-slate-500">Proportional share breakdown</p>
          </div>

          <div className="flex items-center justify-center relative my-2">
            <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                fill="transparent"
                stroke="#f1f5f9"
                strokeWidth="18"
              />
              {reportModel.donutSlices.map((slice) => {
                const dash = (slice.pct / 100) * circumference;
                const offset = -runningOffset;
                runningOffset += dash;
                return (
                  <circle
                    key={slice.name}
                    cx="72"
                    cy="72"
                    r={radius}
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth="18"
                    strokeDasharray={`${dash} ${circumference - dash}`}
                    strokeDashoffset={offset}
                    strokeLinecap="butt"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400">
                {reportModel.donutCenterLabel}
              </span>
              <span className="text-lg font-extrabold text-slate-900">
                {reportModel.donutCenterValue}
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            {reportModel.donutSlices.map((slice) => (
              <div key={slice.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-slate-700">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: slice.color }}
                    />
                    {slice.name}
                  </span>
                  <span className="text-slate-900 font-extrabold">{slice.pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${slice.pct}%`, backgroundColor: slice.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SLA & Marketplace Health Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-md flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">SLA Benchmark</div>
            <div className="text-base font-extrabold text-slate-900">96.2% On-Time Fulfillment</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-md flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Median Response</div>
            <div className="text-base font-extrabold text-slate-900">18 Mins Dispatch Time</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-md flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Verified Customer CSAT</div>
            <div className="text-base font-extrabold text-slate-900">
              4.83 / 5.0 ({reviews.length} Sample Reviews)
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Report Data Table */}
      <div className="bg-white rounded-3xl border border-blue-200 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {activeReportType} — Detailed Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Showing {reportModel.tableRows.length} records for {reportDateRange} ({cityFilter})
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#0f1c3f] to-[#1e3a8a] text-white">
                {reportModel.tableHeaders.map((h, i) => (
                  <th
                    key={h}
                    className={`p-3.5 text-left font-extrabold ${
                      i === 0 ? 'rounded-tl-xl' : ''
                    } ${i === reportModel.tableHeaders.length - 1 ? 'rounded-tr-xl' : ''}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportModel.tableRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-blue-50/60 transition">
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`p-3.5 ${
                        cIdx === 0
                          ? 'font-extrabold text-slate-900'
                          : 'font-semibold text-slate-700'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

