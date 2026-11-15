export type Language = 'en' | 'pa' | 'hi';

export type CitySlug = 'mohali' | 'chandigarh' | 'hoshiarpur';

export type CategorySlug =
  | 'electrician'
  | 'plumber'
  | 'carpenter'
  | 'computer-repair'
  | 'mobile-repair';

export type ProviderType = 'individual' | 'business';

export type VerificationStatus =
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Additional Information Required'
  | 'Approved'
  | 'Rejected';

export type BookingStatus =
  | 'Booking Requested'
  | 'Provider Accepted'
  | 'Provider En Route'
  | 'Provider Arrived'
  | 'Inspection Started'
  | 'Estimate Sent'
  | 'Customer Approval Pending'
  | 'Estimate Approved'
  | 'Work In Progress'
  | 'Work Completed'
  | 'Payment Completed'
  | 'Review Submitted'
  | 'Cancelled'
  | 'Rejected';

export const BOOKING_LIFECYCLE_STEPS: BookingStatus[] = [
  'Booking Requested',
  'Provider Accepted',
  'Provider En Route',
  'Provider Arrived',
  'Inspection Started',
  'Estimate Sent',
  'Customer Approval Pending',
  'Estimate Approved',
  'Work In Progress',
  'Work Completed',
  'Payment Completed',
  'Review Submitted',
];

export type AdminRoleProfile =
  | 'Super Admin'
  | 'Operations Manager'
  | 'Verification Manager'
  | 'Finance Manager'
  | 'Support Executive'
  | 'Content Manager';

export interface SubcategoryItem {
  id: string;
  slug: string;
  categorySlug: CategorySlug;
  name: Record<Language, string>;
  shortDesc: Record<Language, string>;
  fullDesc: string;
  startingPrice: number;
  estimatedDuration: string;
  iconName: string;
  problemsCovered: string[];
  serviceOptions: {
    name: string;
    price: number;
    description: string;
    duration: string;
  }[];
  faqs: { q: string; a: string }[];
  active: boolean;
}

export interface CategoryItem {
  id: string;
  slug: CategorySlug;
  name: Record<Language, string>;
  tagline: Record<Language, string>;
  description: Record<Language, string>;
  iconName: string;
  heroImage: string;
  cardImage: string;
  baseVisitingFee: number;
  commissionPercent: number;
  providerCount: number;
  displayOrder: number;
  active: boolean;
  popularTags: string[];
}

export interface CityItem {
  id: string;
  slug: CitySlug;
  name: Record<Language, string>;
  state: string;
  tagline: string;
  description: string;
  heroImage: string;
  providerCount: number;
  activeBookingsCount: number;
  localities: string[];
  availableCategories: CategorySlug[];
  active: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  categorySlug: CategorySlug;
  image: string;
  completionDate: string;
}

export interface TeamTechnician {
  id: string;
  name: string;
  phone: string;
  role: string;
  experienceYears: number;
  skills: string[];
  avatar: string;
  available: boolean;
  active: boolean;
  assignedJobsCount: number;
}

export interface ProviderProfile {
  id: string;
  slug: string;
  name: string;
  businessName?: string;
  providerType: ProviderType;
  categorySlug: CategorySlug;
  categoryName: string;
  subcategories: string[];
  skills: string[];
  citySlug: CitySlug;
  cityName: string;
  serviceAreas: string[];
  serviceRadiusKm: number;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  experienceYears: number;
  visitingCharge: number;
  availableToday: boolean;
  instantBooking: boolean;
  scheduledBooking: boolean;
  verified: boolean;
  verificationStatus: VerificationStatus;
  verificationRemarks?: string;
  avatar: string;
  coverImage: string;
  phone: string;
  email: string;
  languagesSpoken: string[];
  about: string;
  workingDays: string[];
  workingHours: string;
  blockedDates: string[];
  documents: {
    id: string;
    name: string;
    type: 'Identity' | 'Address' | 'Certificate' | 'Business Registration';
    status: 'Verified' | 'Pending' | 'Action Required';
    uploadedAt: string;
  }[];
  portfolio: PortfolioItem[];
  teamMembers?: TeamTechnician[];
  active: boolean;
}

export interface CustomerAddress {
  id: string;
  label: 'Home' | 'Office' | 'Other';
  houseFlat: string;
  streetLocality: string;
  city: string;
  citySlug: CitySlug;
  state: string;
  pinCode: string;
  landmark: string;
  instructions?: string;
  isDefault: boolean;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  citySlug: CitySlug;
  avatar: string;
  preferredLanguage: Language;
  status: 'Active' | 'Suspended';
  joinedDate: string;
  totalBookings: number;
  addresses: CustomerAddress[];
  notificationPrefs: {
    email: boolean;
    sms: boolean;
    push: boolean;
    whatsappDemo: boolean;
    offers: boolean;
  };
}

export interface EstimateLineItem {
  id: string;
  type: 'labour' | 'material';
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface BookingEstimate {
  id: string;
  bookingId: string;
  providerId: string;
  providerName: string;
  createdAt: string;
  workDescription: string;
  visitingFee: number;
  labourItems: EstimateLineItem[];
  materialItems: EstimateLineItem[];
  additionalCharges: number;
  discount: number;
  taxPercent: number;
  subtotal: number;
  taxAmount: number;
  totalEstimate: number;
  notes: string;
  status: 'Pending Approval' | 'Approved' | 'Rejected' | 'Clarification Requested';
  customerFeedback?: string;
}

export interface BookingRecord {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  providerId: string;
  providerSlug: string;
  providerName: string;
  providerAvatar: string;
  providerPhone: string;
  assignedTechnicianId?: string;
  assignedTechnicianName?: string;
  categorySlug: CategorySlug;
  categoryName: string;
  subcategoryName: string;
  problemTitle: string;
  problemDescription: string;
  problemImages: string[];
  additionalInstructions?: string;
  address: CustomerAddress;
  bookingType: 'Instant' | 'Scheduled';
  date: string;
  timeSlot: string;
  status: BookingStatus;
  visitingFee: number;
  couponCode?: string;
  couponDiscount: number;
  estimate?: BookingEstimate;
  finalTotal: number;
  paymentStatus: 'Pending' | 'Visiting Fee Paid' | 'Paid in Full' | 'Refund Requested' | 'Refunded';
  paymentMethod: 'UPI (Demo)' | 'Card (Demo)' | 'NetBanking (Demo)' | 'Cash After Service';
  transactionRef: string;
  invoiceId: string;
  createdAt: string;
  timeline: {
    status: BookingStatus;
    timestamp: string;
    note: string;
  }[];
  cancellationReason?: string;
  cancellationComment?: string;
  refundStatus?: 'None' | 'Submitted' | 'Under Review' | 'Approved' | 'Processed';
  refundReason?: string;
  refundAmount?: number;
  refundRef?: string;
  completionNotes?: string;
  completionImages?: string[];
  adminNotes?: string;
  reviewSubmitted?: boolean;
}

export interface ReviewItem {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  city: string;
  providerId: string;
  providerSlug: string;
  providerName: string;
  categorySlug: CategorySlug;
  serviceName: string;
  rating: number;
  comment: string;
  date: string;
  providerReply?: string;
  status: 'Published' | 'Hidden' | 'Reported';
}

export interface PayoutItem {
  id: string;
  date: string;
  bookingId: string;
  providerId: string;
  providerName: string;
  customerName: string;
  serviceName: string;
  grossAmount: number;
  platformCommission: number;
  adjustment: number;
  netAmount: number;
  status: 'Paid' | 'Pending' | 'Processing' | 'On Hold';
  transactionRef: string;
}

export interface ReconciliationItem {
  id: string;
  date: string;
  bookingId: string;
  transactionRef: string;
  expectedAmount: number;
  recordedAmount: number;
  providerPayable: number;
  platformCommission: number;
  refundAmount: number;
  adjustmentAmount: number;
  status: 'Matched' | 'Unmatched' | 'Discrepancy Resolved';
  discrepancyNote?: string;
}

export interface SupportTicket {
  id: string;
  userType: 'Customer' | 'Provider';
  userName: string;
  userEmail: string;
  bookingId?: string;
  category: 'Booking Issue' | 'Estimate Dispute' | 'Payment & Refund' | 'Provider Verification' | 'Other';
  subject: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedExecutive: string;
  createdAt: string;
  internalNotes: string;
  messages: {
    sender: string;
    role: 'User' | 'Support' | 'Admin';
    text: string;
    timestamp: string;
  }[];
}

export interface OfferCoupon {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  type: 'Welcome' | 'Seasonal' | 'Referral' | 'Category';
  discountPercent?: number;
  flatDiscount: number;
  minBookingValue: number;
  validUntil: string;
  terms: string[];
  active: boolean;
}

export interface NotificationItem {
  id: string;
  targetRole: 'customer' | 'provider' | 'admin';
  category: 'Booking' | 'Estimate' | 'Payment' | 'Offer' | 'Support' | 'Verification';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface CmsSectionItem {
  id: string;
  page: string;
  sectionKey: string;
  title: string;
  subtitle: string;
  status: 'Published' | 'Draft';
  seoTitle: string;
  seoDescription: string;
  displayOrder: number;
  updatedAt: string;
}

export interface TranslationEntry {
  key: string;
  page: string;
  en: string;
  pa: string;
  hi: string;
  status: 'Published' | 'Draft';
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  roleProfile: AdminRoleProfile;
  cityScope: string;
  active: boolean;
  lastActive: string;
  permissions: {
    module: string;
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    approve: boolean;
    export: boolean;
  }[];
}
