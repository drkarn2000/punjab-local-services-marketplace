'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AdminRoleProfile,
  AdminUserItem,
  BookingEstimate,
  BookingRecord,
  BookingStatus,
  CategoryItem,
  CategorySlug,
  CityItem,
  CitySlug,
  CmsSectionItem,
  CustomerAddress,
  CustomerProfile,
  Language,
  NotificationItem,
  OfferCoupon,
  PayoutItem,
  PortfolioItem,
  ProviderProfile,
  ReconciliationItem,
  ReviewItem,
  SubcategoryItem,
  SupportTicket,
  TeamTechnician,
  TranslationEntry,
  VerificationStatus,
} from '@/types/marketplace';
import {
  CATEGORIES,
  CITIES,
  INITIAL_ADMIN_USERS,
  INITIAL_BOOKINGS,
  INITIAL_CMS_SECTIONS,
  INITIAL_CUSTOMERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_OFFERS,
  INITIAL_PAYOUTS,
  INITIAL_RECONCILIATIONS,
  INITIAL_REVIEWS,
  INITIAL_TICKETS,
  PROVIDERS,
  SUBCATEGORIES,
} from '@/data/mockData';
import { INITIAL_TRANSLATION_ENTRIES, translateKey } from '@/data/translations';
import {
  isCategoryVisibleInCity,
  isSubcategoryVisibleInCity,
} from '@/data/serviceCatalogConfig';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface BookingDraft {
  categorySlug: CategorySlug;
  subcategoryName: string;
  problemTitle: string;
  problemDescription: string;
  problemImages: string[];
  additionalInstructions: string;
  categorySpecificDetails?: Record<string, string>;
  addressId: string;
  bookingType: 'Instant' | 'Scheduled';
  date: string;
  timeSlot: string;
  providerId: string;
  couponCode: string;
}

interface MarketplaceContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  selectedCity: CitySlug;
  setSelectedCity: (city: CitySlug) => void;
  currentRole: 'customer' | 'provider-individual' | 'provider-business' | 'admin';
  setCurrentRole: (role: 'customer' | 'provider-individual' | 'provider-business' | 'admin') => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  activeAdminProfile: AdminRoleProfile;
  setActiveAdminProfile: (role: AdminRoleProfile) => void;
  activeProviderId: string;
  setActiveProviderId: (id: string) => void;
  currentProvider: ProviderProfile;
  currentCustomer: CustomerProfile;

  // Datasets
  cities: CityItem[];
  setCities: React.Dispatch<React.SetStateAction<CityItem[]>>;
  categories: CategoryItem[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryItem[]>>;
  subcategories: SubcategoryItem[];
  setSubcategories: React.Dispatch<React.SetStateAction<SubcategoryItem[]>>;
  visibleCategories: CategoryItem[];
  visibleSubcategories: SubcategoryItem[];
  isCategoryAvailableInCity: (cat: CategoryItem, city?: CitySlug) => boolean;
  isSubcategoryAvailableInCity: (sub: SubcategoryItem, city?: CitySlug) => boolean;
  applyLaunchPreset: (mode: 'mohali-launch' | 'full-marketplace') => void;
  providers: ProviderProfile[];
  setProviders: React.Dispatch<React.SetStateAction<ProviderProfile[]>>;
  customers: CustomerProfile[];
  setCustomers: React.Dispatch<React.SetStateAction<CustomerProfile[]>>;
  bookings: BookingRecord[];
  setBookings: React.Dispatch<React.SetStateAction<BookingRecord[]>>;
  reviews: ReviewItem[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewItem[]>>;
  payouts: PayoutItem[];
  setPayouts: React.Dispatch<React.SetStateAction<PayoutItem[]>>;
  reconciliations: ReconciliationItem[];
  setReconciliations: React.Dispatch<React.SetStateAction<ReconciliationItem[]>>;
  tickets: SupportTicket[];
  setTickets: React.Dispatch<React.SetStateAction<SupportTicket[]>>;
  offers: OfferCoupon[];
  setOffers: React.Dispatch<React.SetStateAction<OfferCoupon[]>>;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  cmsSections: CmsSectionItem[];
  setCmsSections: React.Dispatch<React.SetStateAction<CmsSectionItem[]>>;
  translations: TranslationEntry[];
  setTranslations: React.Dispatch<React.SetStateAction<TranslationEntry[]>>;
  adminUsers: AdminUserItem[];
  setAdminUsers: React.Dispatch<React.SetStateAction<AdminUserItem[]>>;

  // Booking Wizard State
  bookingDraft: BookingDraft;
  updateBookingDraft: (partial: Partial<BookingDraft>) => void;
  appliedCoupon: string;
  setAppliedCoupon: (code: string) => void;

  // Actions
  createBookingFromDraft: () => BookingRecord;
  updateBookingStatus: (bookingId: string, status: BookingStatus, note?: string) => boolean;
  submitEstimate: (bookingId: string, estimate: BookingEstimate) => void;
  respondToEstimate: (
    bookingId: string,
    decision: 'Approved' | 'Rejected' | 'Clarification Requested',
    feedback?: string
  ) => void;
  completePayment: (bookingId: string, paymentMethod: BookingRecord['paymentMethod']) => void;
  submitReview: (bookingId: string, rating: number, comment: string) => void;
  cancelBooking: (bookingId: string, reason: string, comment?: string) => void;
  requestRefund: (bookingId: string, reason: string, amount: number) => void;
  verifyProvider: (providerId: string, status: VerificationStatus, remarks?: string) => void;
  registerProvider: (newProv: Partial<ProviderProfile>) => ProviderProfile;
  updateProviderProfile: (providerId: string, updates: Partial<ProviderProfile>) => void;
  assignTechnicianToBooking: (bookingId: string, techId: string, techName: string) => void;
  addTeamTechnician: (providerId: string, tech: Omit<TeamTechnician, 'id' | 'assignedJobsCount'>) => void;
  toggleTeamTechnician: (providerId: string, techId: string) => void;
  addPortfolioItem: (providerId: string, item: Omit<PortfolioItem, 'id'>) => void;
  deletePortfolioItem: (providerId: string, itemId: string) => void;
  addAddress: (addr: Omit<CustomerAddress, 'id'>) => CustomerAddress;
  updateAddress: (addr: CustomerAddress) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  updateCustomerProfile: (updates: Partial<CustomerProfile>) => void;
  markAllNotificationsRead: (role?: 'customer' | 'provider' | 'admin') => void;
  replyToReview: (reviewId: string, reply: string) => void;
  moderateReview: (reviewId: string, status: ReviewItem['status']) => void;
  createSupportTicket: (
    subject: string,
    category: SupportTicket['category'],
    message: string,
    bookingId?: string
  ) => SupportTicket;
  replyToTicket: (ticketId: string, sender: string, role: 'User' | 'Support' | 'Admin', text: string) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  updateTranslationEntry: (key: string, updates: Partial<TranslationEntry>) => void;
  updateCmsSection: (id: string, updates: Partial<CmsSectionItem>) => void;
  resolveReconciliation: (id: string, note: string) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
  resetDemoState: () => void;
}

const DEFAULT_DRAFT: BookingDraft = {
  categorySlug: 'electrician',
  subcategoryName: 'Wiring & Rewiring',
  problemTitle: 'Main switch is tripping frequently',
  problemDescription: 'Main switch is tripping frequently. Need inspection and wiring check in 2 rooms.',
  problemImages: [
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
  ],
  additionalInstructions: 'Please carry multimeter and 32A MCB.',
  categorySpecificDetails: {},
  addressId: 'addr-1',
  bookingType: 'Scheduled',
  date: '2026-11-14',
  timeSlot: '2:00 PM - 4:00 PM',
  providerId: 'prov-1',
  couponCode: '',
};

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedCity, setSelectedCity] = useState<CitySlug>('mohali');
  const [currentRole, setCurrentRole] = useState<
    'customer' | 'provider-individual' | 'provider-business' | 'admin'
  >('customer');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeAdminProfile, setActiveAdminProfile] = useState<AdminRoleProfile>('Super Admin');
  const [activeProviderId, setActiveProviderId] = useState<string>('prov-1');

  const [cities, setCities] = useState<CityItem[]>(CITIES);
  const [categories, setCategories] = useState<CategoryItem[]>(CATEGORIES);
  const [subcategories, setSubcategories] = useState<SubcategoryItem[]>(SUBCATEGORIES);
  const [providers, setProviders] = useState<ProviderProfile[]>(PROVIDERS);
  const [customers, setCustomers] = useState<CustomerProfile[]>(INITIAL_CUSTOMERS);
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [payouts, setPayouts] = useState<PayoutItem[]>(INITIAL_PAYOUTS);
  const [reconciliations, setReconciliations] = useState<ReconciliationItem[]>(INITIAL_RECONCILIATIONS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [offers, setOffers] = useState<OfferCoupon[]>(INITIAL_OFFERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [cmsSections, setCmsSections] = useState<CmsSectionItem[]>(INITIAL_CMS_SECTIONS);
  const [translations, setTranslations] = useState<TranslationEntry[]>(INITIAL_TRANSLATION_ENTRIES);
  const [adminUsers, setAdminUsers] = useState<AdminUserItem[]>(INITIAL_ADMIN_USERS);

  const [bookingDraft, setBookingDraft] = useState<BookingDraft>(DEFAULT_DRAFT);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist language & bookings in session/localStorage
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('ps_lang') as Language | null;
      if (savedLang && ['en', 'pa', 'hi'].includes(savedLang)) {
        setLanguage(savedLang);
      }
      const savedCity = localStorage.getItem('ps_city') as CitySlug | null;
      if (savedCity && ['mohali', 'chandigarh', 'hoshiarpur'].includes(savedCity)) {
        setSelectedCity(savedCity);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('ps_lang', lang);
    } catch {
      // ignore
    }
    const labels: Record<Language, string> = {
      en: 'Language switched to English',
      pa: 'ਭਾਸ਼ਾ ਪੰਜਾਬੀ (ਗੁਰਮੁਖੀ) ਵਿੱਚ ਬਦਲੀ ਗਈ',
      hi: 'भाषा हिन्दी (देवनागरी) में बदली गई',
    };
    showToast(labels[lang], 'info');
  };

  const handleSetCity = (city: CitySlug) => {
    setSelectedCity(city);
    try {
      localStorage.setItem('ps_city', city);
    } catch {
      // ignore
    }
  };

  const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4200);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  const t = (key: string, fallback?: string) => {
    return translateKey(translations, key, language, fallback);
  };

  const currentProvider =
    providers.find((p) => p.id === activeProviderId) || providers[0];
  const currentCustomer = customers[0];

  const isCategoryAvailableInCity = (
    cat: CategoryItem,
    city: CitySlug = selectedCity
  ) => isCategoryVisibleInCity(cat, city);

  const isSubcategoryAvailableInCity = (
    sub: SubcategoryItem,
    city: CitySlug = selectedCity
  ) => {
    const parent = categories.find((c) => c.slug === sub.categorySlug);
    return isSubcategoryVisibleInCity(sub, parent, city);
  };

  const visibleCategories = categories
    .filter((c) => isCategoryVisibleInCity(c, selectedCity))
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const visibleSubcategories = subcategories.filter((s) =>
    isSubcategoryAvailableInCity(s, selectedCity)
  );

  const applyLaunchPreset = (mode: 'mohali-launch' | 'full-marketplace') => {
    if (mode === 'mohali-launch') {
      setCategories((prev) =>
        prev.map((c) =>
          c.slug === 'electrician' || c.slug === 'plumber'
            ? {
                ...c,
                active: true,
                comingSoon: false,
                cityAvailability: ['mohali', 'chandigarh', 'hoshiarpur'],
              }
            : {
                ...c,
                cityAvailability: (c.cityAvailability || ['mohali', 'chandigarh', 'hoshiarpur']).filter(
                  (ct) => ct !== 'mohali'
                ),
              }
        )
      );
      showToast(
        'Mohali Initial Launch Mode enabled: Only Electrician & Plumber visible in Mohali; other categories remain hidden in Mohali.',
        'info'
      );
    } else {
      setCategories((prev) =>
        prev.map((c) => ({
          ...c,
          active: true,
          comingSoon: false,
          bookingsPaused: false,
          cityAvailability: ['mohali', 'chandigarh', 'hoshiarpur'],
        }))
      );
      setSubcategories((prev) =>
        prev.map((s) => ({
          ...s,
          active: true,
          comingSoon: false,
          bookingsPaused: false,
        }))
      );
      showToast(
        'Full Marketplace Mode enabled: All 16 categories & 70+ services are live across Mohali, Chandigarh & Hoshiarpur.',
        'success'
      );
    }
  };

  const updateBookingDraft = (partial: Partial<BookingDraft>) => {
    setBookingDraft((prev) => ({ ...prev, ...partial }));
  };

  const createBookingFromDraft = (): BookingRecord => {
    const provider =
      providers.find((p) => p.id === bookingDraft.providerId) || providers[0];
    const category =
      categories.find((c) => c.slug === bookingDraft.categorySlug) || categories[0];
    const address =
      currentCustomer.addresses.find((a) => a.id === bookingDraft.addressId) ||
      currentCustomer.addresses[0];

    const couponObj = offers.find(
      (o) =>
        o.code.toUpperCase() ===
        (bookingDraft.couponCode || appliedCoupon).toUpperCase()
    );
    const discount = couponObj ? couponObj.flatDiscount : 0;
    const newId = `PB-2026-${Math.floor(9000 + Math.random() * 900)}`;
    const nowStr = '14 Nov 2026, Just Now';

    const newBooking: BookingRecord = {
      id: newId,
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      customerPhone: currentCustomer.phone,
      providerId: provider.id,
      providerSlug: provider.slug,
      providerName: provider.name,
      providerAvatar: provider.avatar,
      providerPhone: provider.phone,
      categorySlug: category.slug,
      categoryName: category.name.en,
      subcategoryName: bookingDraft.subcategoryName,
      problemTitle:
        bookingDraft.problemTitle ||
        `${bookingDraft.subcategoryName} Service Request`,
      problemDescription: bookingDraft.problemDescription,
      problemImages: bookingDraft.problemImages,
      additionalInstructions: bookingDraft.additionalInstructions,
      categorySpecificDetails: bookingDraft.categorySpecificDetails,
      address,
      bookingType: bookingDraft.bookingType,
      date: bookingDraft.date,
      timeSlot:
        bookingDraft.bookingType === 'Instant'
          ? 'Instant (Within 45–60 Mins)'
          : bookingDraft.timeSlot,
      status: 'Booking Requested',
      visitingFee: provider.visitingCharge,
      couponCode: couponObj?.code,
      couponDiscount: discount,
      finalTotal: Math.max(49, provider.visitingCharge - discount),
      paymentStatus: 'Pending',
      paymentMethod: 'Cash After Service',
      transactionRef: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      invoiceId: `INV-${newId}`,
      createdAt: nowStr,
      timeline: [
        {
          status: 'Booking Requested',
          timestamp: nowStr,
          note: `Customer booked ${bookingDraft.subcategoryName} with ${provider.name}.`,
        },
      ],
    };

    setBookings((prev) => [newBooking, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        targetRole: 'provider',
        category: 'Booking',
        title: `New Booking Request (${newId})`,
        message: `${currentCustomer.name} booked ${bookingDraft.subcategoryName} in ${address.streetLocality}, ${address.city}.`,
        timestamp: 'Just now',
        read: false,
        link: '/provider/jobs',
      },
      {
        id: `notif-${Date.now() + 1}`,
        targetRole: 'customer',
        category: 'Booking',
        title: `Booking Confirmed (${newId})`,
        message: `Your request for ${bookingDraft.subcategoryName} with ${provider.name} has been placed.`,
        timestamp: 'Just now',
        read: false,
        link: `/booking/tracking?bookingId=${newId}`,
      },
      ...prev,
    ]);
    showToast(`Booking ${newId} confirmed with ${provider.name}!`, 'success');
    return newBooking;
  };

  const updateBookingStatus = (
    bookingId: string,
    newStatus: BookingStatus,
    note?: string
  ): boolean => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return false;

    // Enforce Hybrid Pricing Rule: Cannot start work or complete work unless estimate is approved
    if (
      (newStatus === 'Work In Progress' || newStatus === 'Work Completed') &&
      (!target.estimate || target.estimate.status !== 'Approved')
    ) {
      showToast(
        'Hybrid Pricing Rule: Customer must approve the itemized estimate before work can proceed or be marked completed.',
        'warning'
      );
      return false;
    }

    const timestamp = '14 Nov 2026, Just Now';
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: newStatus,
              timeline: [
                ...b.timeline,
                {
                  status: newStatus,
                  timestamp,
                  note: note || `Status updated to ${newStatus}.`,
                },
              ],
            }
          : b
      )
    );
    showToast(`Booking ${bookingId} status updated to "${newStatus}"`, 'success');
    return true;
  };

  const submitEstimate = (bookingId: string, estimate: BookingEstimate) => {
    const timestamp = '14 Nov 2026, Just Now';
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              estimate,
              finalTotal: estimate.totalEstimate,
              status: 'Customer Approval Pending',
              timeline: [
                ...b.timeline,
                {
                  status: 'Estimate Sent',
                  timestamp,
                  note: `Provider sent estimate of ₹${estimate.totalEstimate}.`,
                },
                {
                  status: 'Customer Approval Pending',
                  timestamp,
                  note: 'Waiting for customer approval before starting repair.',
                },
              ],
            }
          : b
      )
    );
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        targetRole: 'customer',
        category: 'Estimate',
        title: `Estimate Ready for Approval (${bookingId})`,
        message: `${estimate.providerName} submitted an itemized estimate of ₹${estimate.totalEstimate}.`,
        timestamp: 'Just now',
        read: false,
        link: `/booking/estimate?bookingId=${bookingId}`,
      },
      ...prev,
    ]);
    showToast(`Estimate of ₹${estimate.totalEstimate} sent to customer!`, 'success');
  };

  const respondToEstimate = (
    bookingId: string,
    decision: 'Approved' | 'Rejected' | 'Clarification Requested',
    feedback?: string
  ) => {
    const timestamp = '14 Nov 2026, Just Now';
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId || !b.estimate) return b;
        const nextStatus: BookingStatus =
          decision === 'Approved'
            ? 'Estimate Approved'
            : decision === 'Rejected'
            ? 'Cancelled'
            : 'Customer Approval Pending';
        return {
          ...b,
          status: nextStatus,
          estimate: {
            ...b.estimate,
            status: decision,
            customerFeedback: feedback,
          },
          timeline: [
            ...b.timeline,
            {
              status: nextStatus,
              timestamp,
              note:
                decision === 'Approved'
                  ? `Customer approved estimate of ₹${b.estimate.totalEstimate}. Work authorized.`
                  : decision === 'Rejected'
                  ? `Customer rejected estimate. Reason: ${feedback || 'Cost concern'}`
                  : `Customer requested clarification: ${feedback || 'Please clarify part cost'}`,
            },
          ],
        };
      })
    );
    showToast(
      decision === 'Approved'
        ? 'Estimate approved! The technician can now start work.'
        : decision === 'Rejected'
        ? 'Estimate rejected.'
        : 'Clarification request sent to technician.',
      decision === 'Approved' ? 'success' : 'info'
    );
  };

  const completePayment = (
    bookingId: string,
    paymentMethod: BookingRecord['paymentMethod']
  ) => {
    const timestamp = '14 Nov 2026, Just Now';
    const target = bookings.find((b) => b.id === bookingId);
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: 'Payment Completed',
              paymentStatus: 'Paid in Full',
              paymentMethod,
              timeline: [
                ...b.timeline,
                {
                  status: 'Payment Completed',
                  timestamp,
                  note: `Customer paid ₹${b.finalTotal} via ${paymentMethod}.`,
                },
              ],
            }
          : b
      )
    );
    if (target) {
      const commission = Math.round(target.finalTotal * 0.12);
      setPayouts((prev) => [
        {
          id: `PAY-2026-${Math.floor(600 + Math.random() * 300)}`,
          date: '2026-11-14',
          bookingId: target.id,
          providerId: target.providerId,
          providerName: target.providerName,
          customerName: target.customerName,
          serviceName: target.subcategoryName,
          grossAmount: target.finalTotal,
          platformCommission: commission,
          adjustment: 0,
          netAmount: target.finalTotal - commission,
          status: 'Pending',
          transactionRef: target.transactionRef,
        },
        ...prev,
      ]);
    }
    showToast(`Payment completed via ${paymentMethod}! Invoice generated.`, 'success');
  };

  const submitReview = (bookingId: string, rating: number, comment: string) => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return;
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      bookingId,
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      customerAvatar: currentCustomer.avatar,
      city: target.address.city,
      providerId: target.providerId,
      providerSlug: target.providerSlug,
      providerName: target.providerName,
      categorySlug: target.categorySlug,
      serviceName: target.subcategoryName,
      rating,
      comment,
      date: 'Just now',
      status: 'Published',
    };
    setReviews((prev) => [newRev, ...prev]);
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: 'Review Submitted',
              reviewSubmitted: true,
              timeline: [
                ...b.timeline,
                {
                  status: 'Review Submitted',
                  timestamp: '14 Nov 2026, Just Now',
                  note: `Customer rated ${rating} stars: "${comment}"`,
                },
              ],
            }
          : b
      )
    );
    showToast('Thank you! Your review has been published.', 'success');
  };

  const cancelBooking = (bookingId: string, reason: string, comment?: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: 'Cancelled',
              cancellationReason: reason,
              cancellationComment: comment,
              timeline: [
                ...b.timeline,
                {
                  status: 'Cancelled',
                  timestamp: '14 Nov 2026, Just Now',
                  note: `Booking cancelled. Reason: ${reason}`,
                },
              ],
            }
          : b
      )
    );
    showToast(`Booking ${bookingId} has been cancelled.`, 'warning');
  };

  const requestRefund = (bookingId: string, reason: string, amount: number) => {
    const refundRef = `RFD-2026-${Math.floor(5000 + Math.random() * 4000)}`;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              paymentStatus: 'Refund Requested',
              refundStatus: 'Submitted',
              refundReason: reason,
              refundAmount: amount,
              refundRef,
            }
          : b
      )
    );
    showToast(`Refund request ${refundRef} submitted for ₹${amount}.`, 'success');
  };

  const verifyProvider = (
    providerId: string,
    status: VerificationStatus,
    remarks?: string
  ) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId
          ? {
              ...p,
              verificationStatus: status,
              verified: status === 'Approved',
              verificationRemarks: remarks || p.verificationRemarks,
              documents: p.documents.map((d) => ({
                ...d,
                status: status === 'Approved' ? 'Verified' : d.status,
              })),
            }
          : p
      )
    );
    showToast(`Provider verification status updated to "${status}"`, 'success');
  };

  const registerProvider = (newProv: Partial<ProviderProfile>): ProviderProfile => {
    const id = `prov-${Date.now()}`;
    const name = newProv.name || 'New Punjab Professional';
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const created: ProviderProfile = {
      id,
      slug,
      name,
      businessName: newProv.businessName,
      providerType: newProv.providerType || 'individual',
      categorySlug: newProv.categorySlug || 'electrician',
      categoryName: newProv.categoryName || 'Electrician',
      subcategories: newProv.subcategories || ['Wiring & Rewiring', 'Fan Installation & Repair'],
      skills: newProv.skills || ['Wiring', 'Repair', 'Installation'],
      citySlug: newProv.citySlug || 'mohali',
      cityName: newProv.cityName || 'Mohali',
      serviceAreas: newProv.serviceAreas || ['Mohali', 'Phase 7', 'Sector 70'],
      serviceRadiusKm: newProv.serviceRadiusKm || 15,
      distanceKm: 2.5,
      rating: 4.9,
      reviewCount: 1,
      completedJobs: 0,
      experienceYears: newProv.experienceYears || 5,
      visitingCharge: newProv.visitingCharge || 199,
      availableToday: true,
      instantBooking: true,
      scheduledBooking: true,
      verified: false,
      verificationStatus: 'Submitted',
      verificationRemarks: 'Application submitted. Under Verification Manager review.',
      avatar:
        newProv.avatar ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      coverImage:
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      phone: newProv.phone || '+91 98765-00000 (Demo)',
      email: newProv.email || 'partner@punjabservices.demo',
      languagesSpoken: newProv.languagesSpoken || ['Punjabi', 'Hindi', 'English'],
      about:
        newProv.about ||
        'Dedicated service partner registered on Punjab Local Services Marketplace.',
      workingDays: newProv.workingDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      workingHours: newProv.workingHours || '09:00 AM - 07:00 PM',
      blockedDates: [],
      documents: [
        {
          id: `doc-${Date.now()}-1`,
          name: 'Aadhaar / Identity Proof (Demo)',
          type: 'Identity',
          status: 'Pending',
          uploadedAt: '2026-11-14',
        },
        {
          id: `doc-${Date.now()}-2`,
          name: 'Trade Skill / Business Certificate (Demo)',
          type: 'Certificate',
          status: 'Pending',
          uploadedAt: '2026-11-14',
        },
      ],
      portfolio: [],
      teamMembers: newProv.providerType === 'business' ? [] : undefined,
      active: true,
    };
    setProviders((prev) => [created, ...prev]);
    setActiveProviderId(created.id);
    showToast(`Registration submitted for ${created.name}!`, 'success');
    return created;
  };

  const updateProviderProfile = (
    providerId: string,
    updates: Partial<ProviderProfile>
  ) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, ...updates } : p))
    );
    showToast('Provider profile changes saved!', 'success');
  };

  const assignTechnicianToBooking = (
    bookingId: string,
    techId: string,
    techName: string
  ) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              assignedTechnicianId: techId,
              assignedTechnicianName: techName,
              timeline: [
                ...b.timeline,
                {
                  status: b.status,
                  timestamp: '14 Nov 2026, Just Now',
                  note: `Business assigned technician ${techName} to this job.`,
                },
              ],
            }
          : b
      )
    );
    showToast(`Technician ${techName} assigned to booking ${bookingId}!`, 'success');
  };

  const addTeamTechnician = (
    providerId: string,
    tech: Omit<TeamTechnician, 'id' | 'assignedJobsCount'>
  ) => {
    const newTech: TeamTechnician = {
      ...tech,
      id: `tech-${Date.now()}`,
      assignedJobsCount: 0,
    };
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId
          ? {
              ...p,
              teamMembers: [...(p.teamMembers || []), newTech],
            }
          : p
      )
    );
    showToast(`Team technician ${tech.name} added!`, 'success');
  };

  const toggleTeamTechnician = (providerId: string, techId: string) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId
          ? {
              ...p,
              teamMembers: (p.teamMembers || []).map((m) =>
                m.id === techId ? { ...m, active: !m.active } : m
              ),
            }
          : p
      )
    );
    showToast('Technician status updated!', 'info');
  };

  const addPortfolioItem = (
    providerId: string,
    item: Omit<PortfolioItem, 'id'>
  ) => {
    const newItem: PortfolioItem = { ...item, id: `port-${Date.now()}` };
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId
          ? { ...p, portfolio: [newItem, ...p.portfolio] }
          : p
      )
    );
    showToast('Portfolio work item added!', 'success');
  };

  const deletePortfolioItem = (providerId: string, itemId: string) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId
          ? { ...p, portfolio: p.portfolio.filter((x) => x.id !== itemId) }
          : p
      )
    );
    showToast('Portfolio item removed.', 'info');
  };

  const addAddress = (addr: Omit<CustomerAddress, 'id'>): CustomerAddress => {
    const created: CustomerAddress = { ...addr, id: `addr-${Date.now()}` };
    setCustomers((prev) =>
      prev.map((c, idx) =>
        idx === 0
          ? {
              ...c,
              addresses: created.isDefault
                ? [
                    ...c.addresses.map((a) => ({ ...a, isDefault: false })),
                    created,
                  ]
                : [...c.addresses, created],
            }
          : c
      )
    );
    showToast(`Address (${created.label}) saved!`, 'success');
    return created;
  };

  const updateAddress = (addr: CustomerAddress) => {
    setCustomers((prev) =>
      prev.map((c, idx) =>
        idx === 0
          ? {
              ...c,
              addresses: c.addresses.map((a) => (a.id === addr.id ? addr : a)),
            }
          : c
      )
    );
    showToast('Address updated!', 'success');
  };

  const deleteAddress = (id: string) => {
    setCustomers((prev) =>
      prev.map((c, idx) =>
        idx === 0
          ? {
              ...c,
              addresses: c.addresses.filter((a) => a.id !== id),
            }
          : c
      )
    );
    showToast('Address deleted.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setCustomers((prev) =>
      prev.map((c, idx) =>
        idx === 0
          ? {
              ...c,
              addresses: c.addresses.map((a) => ({
                ...a,
                isDefault: a.id === id,
              })),
            }
          : c
      )
    );
    showToast('Default address updated!', 'success');
  };

  const updateCustomerProfile = (updates: Partial<CustomerProfile>) => {
    setCustomers((prev) =>
      prev.map((c, idx) => (idx === 0 ? { ...c, ...updates } : c))
    );
    showToast('Profile updated successfully!', 'success');
  };

  const markAllNotificationsRead = (role?: 'customer' | 'provider' | 'admin') => {
    setNotifications((prev) =>
      prev.map((n) => (!role || n.targetRole === role ? { ...n, read: true } : n))
    );
    showToast('All notifications marked as read.', 'info');
  };

  const replyToReview = (reviewId: string, reply: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, providerReply: reply } : r))
    );
    showToast('Reply posted to customer review!', 'success');
  };

  const moderateReview = (reviewId: string, status: ReviewItem['status']) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status } : r))
    );
    showToast(`Review status updated to ${status}.`, 'info');
  };

  const createSupportTicket = (
    subject: string,
    category: SupportTicket['category'],
    message: string,
    bookingId?: string
  ): SupportTicket => {
    const newTkt: SupportTicket = {
      id: `TKT-2026-${Math.floor(200 + Math.random() * 700)}`,
      userType: currentRole === 'customer' ? 'Customer' : 'Provider',
      userName:
        currentRole === 'customer' ? currentCustomer.name : currentProvider.name,
      userEmail:
        currentRole === 'customer' ? currentCustomer.email : currentProvider.email,
      bookingId,
      category,
      subject,
      priority: 'Medium',
      status: 'Open',
      assignedExecutive: 'Navjot Kaur (Support Exec)',
      createdAt: '14 Nov 2026, Just Now',
      internalNotes: 'Newly created ticket from frontend prototype.',
      messages: [
        {
          sender:
            currentRole === 'customer'
              ? currentCustomer.name
              : currentProvider.name,
          role: 'User',
          text: message,
          timestamp: 'Just now',
        },
      ],
    };
    setTickets((prev) => [newTkt, ...prev]);
    showToast(`Support ticket ${newTkt.id} submitted!`, 'success');
    return newTkt;
  };

  const replyToTicket = (
    ticketId: string,
    sender: string,
    role: 'User' | 'Support' | 'Admin',
    text: string
  ) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              messages: [
                ...t.messages,
                { sender, role, text, timestamp: 'Just now' },
              ],
            }
          : t
      )
    );
    showToast('Reply sent on support ticket!', 'success');
  };

  const updateTicketStatus = (
    ticketId: string,
    status: SupportTicket['status']
  ) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status } : t))
    );
    showToast(`Ticket ${ticketId} marked as ${status}.`, 'success');
  };

  const updateTranslationEntry = (
    key: string,
    updates: Partial<TranslationEntry>
  ) => {
    setTranslations((prev) =>
      prev.map((item) => (item.key === key ? { ...item, ...updates } : item))
    );
    showToast(`Translation key "${key}" updated across live UI!`, 'success');
  };

  const updateCmsSection = (id: string, updates: Partial<CmsSectionItem>) => {
    setCmsSections((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, ...updates, updatedAt: '2026-11-14' } : s
      )
    );
    showToast('CMS section updated and published!', 'success');
  };

  const resolveReconciliation = (id: string, note: string) => {
    setReconciliations((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'Discrepancy Resolved',
              recordedAmount: r.expectedAmount,
              discrepancyNote: note,
            }
          : r
      )
    );
    showToast(`Reconciliation ${id} marked as Resolved!`, 'success');
  };

  const resetDemoState = () => {
    setCities(CITIES);
    setCategories(CATEGORIES);
    setSubcategories(SUBCATEGORIES);
    setProviders(PROVIDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setBookings(INITIAL_BOOKINGS);
    setReviews(INITIAL_REVIEWS);
    setPayouts(INITIAL_PAYOUTS);
    setReconciliations(INITIAL_RECONCILIATIONS);
    setTickets(INITIAL_TICKETS);
    setOffers(INITIAL_OFFERS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCmsSections(INITIAL_CMS_SECTIONS);
    setTranslations(INITIAL_TRANSLATION_ENTRIES);
    setAdminUsers(INITIAL_ADMIN_USERS);
    showToast('Demo state reset to initial defaults.', 'info');
  };

  return (
    <MarketplaceContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
        selectedCity,
        setSelectedCity: handleSetCity,
        currentRole,
        setCurrentRole,
        isLoggedIn,
        setIsLoggedIn,
        activeAdminProfile,
        setActiveAdminProfile,
        activeProviderId,
        setActiveProviderId,
        currentProvider,
        currentCustomer,
        cities,
        setCities,
        categories,
        setCategories,
        subcategories,
        setSubcategories,
        visibleCategories,
        visibleSubcategories,
        isCategoryAvailableInCity,
        isSubcategoryAvailableInCity,
        applyLaunchPreset,
        providers,
        setProviders,
        customers,
        setCustomers,
        bookings,
        setBookings,
        reviews,
        setReviews,
        payouts,
        setPayouts,
        reconciliations,
        setReconciliations,
        tickets,
        setTickets,
        offers,
        setOffers,
        notifications,
        setNotifications,
        cmsSections,
        setCmsSections,
        translations,
        setTranslations,
        adminUsers,
        setAdminUsers,
        bookingDraft,
        updateBookingDraft,
        appliedCoupon,
        setAppliedCoupon,
        createBookingFromDraft,
        updateBookingStatus,
        submitEstimate,
        respondToEstimate,
        completePayment,
        submitReview,
        cancelBooking,
        requestRefund,
        verifyProvider,
        registerProvider,
        updateProviderProfile,
        assignTechnicianToBooking,
        addTeamTechnician,
        toggleTeamTechnician,
        addPortfolioItem,
        deletePortfolioItem,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        updateCustomerProfile,
        markAllNotificationsRead,
        replyToReview,
        moderateReview,
        createSupportTicket,
        replyToTicket,
        updateTicketStatus,
        updateTranslationEntry,
        updateCmsSection,
        resolveReconciliation,
        toasts,
        showToast,
        dismissToast,
        resetDemoState,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) {
    throw new Error('useMarketplace must be used within MarketplaceProvider');
  }
  return ctx;
}
