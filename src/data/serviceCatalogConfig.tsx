import React from 'react';
import {
  Bug,
  Camera,
  Car,
  Droplets,
  Filter,
  Hammer,
  Laptop,
  Package,
  Paintbrush,
  Plug,
  ShieldAlert,
  Smartphone,
  Sparkles,
  Truck,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react';
import {
  BookingFormTemplateKey,
  CategoryFormField,
  CategoryItem,
  CategorySlug,
  CitySlug,
  ServiceVerticalGroup,
  SubcategoryItem,
} from '@/types/marketplace';

export interface VerticalGroupMeta {
  id: ServiceVerticalGroup;
  title: string;
  shortTitle: string;
  subtitle: string;
  badge: string;
  accentGradient: string;
}

export const SERVICE_VERTICAL_GROUPS: VerticalGroupMeta[] = [
  {
    id: 'home-services',
    title: 'Home Services & Maintenance',
    shortTitle: 'Home Services',
    subtitle:
      'Electricians, plumbers, carpenters, home deep cleaning, painting, AC, appliance & pest control.',
    badge: 'Group A • Home Care',
    accentGradient: 'from-emerald-400 to-teal-400',
  },
  {
    id: 'computer-tech',
    title: 'Computer & Technology Services',
    shortTitle: 'Computer & Tech',
    subtitle:
      'Laptop/desktop repair, mobile repair, Windows & software setup, hardware upgrades, Wi-Fi & CCTV.',
    badge: 'Group B • Tech & Security',
    accentGradient: 'from-cyan-400 to-sky-400',
  },
  {
    id: 'vehicle-roadside',
    title: 'Vehicle & Roadside Assistance',
    shortTitle: 'Vehicle & Roadside',
    subtitle:
      'Car, bike & scooter servicing, battery jump-start, tyre puncture, breakdown help & towing.',
    badge: 'Group C • Auto & Emergency',
    accentGradient: 'from-amber-400 to-orange-400',
  },
  {
    id: 'other-future',
    title: 'Other & Future Services',
    shortTitle: 'Other Services',
    subtitle:
      'Packers & movers, RO water purifier repair, and expandable local household services.',
    badge: 'Group D • Specialty',
    accentGradient: 'from-violet-400 to-fuchsia-400',
  },
];

export function getCategoryVerticalGroup(
  catOrSlug: CategoryItem | CategorySlug
): ServiceVerticalGroup {
  if (typeof catOrSlug !== 'string' && catOrSlug.verticalGroup) {
    return catOrSlug.verticalGroup;
  }
  const slug = typeof catOrSlug === 'string' ? catOrSlug : catOrSlug.slug;
  if (
    [
      'electrician',
      'plumber',
      'carpenter',
      'home-cleaning',
      'painting',
      'ac-repair',
      'appliance-repair',
      'pest-control',
    ].includes(slug)
  ) {
    return 'home-services';
  }
  if (['computer-repair', 'mobile-repair', 'cctv-installation'].includes(slug)) {
    return 'computer-tech';
  }
  if (['vehicle-repair', 'roadside-assistance'].includes(slug)) {
    return 'vehicle-roadside';
  }
  return 'other-future';
}

export function renderCategoryIcon(
  iconNameOrSlug: string,
  className = 'w-5 h-5'
): React.ReactNode {
  const key = iconNameOrSlug.toLowerCase();
  if (key.includes('zap') || key.includes('electric')) {
    return <Zap className={`${className} text-amber-400`} />;
  }
  if (key.includes('droplet') || key.includes('plumb')) {
    return <Droplets className={`${className} text-sky-400`} />;
  }
  if (key.includes('hammer') || key.includes('carpent')) {
    return <Hammer className={`${className} text-orange-400`} />;
  }
  if (key.includes('sparkle') || key.includes('clean')) {
    return <Sparkles className={`${className} text-emerald-300`} />;
  }
  if (key.includes('paint')) {
    return <Paintbrush className={`${className} text-rose-400`} />;
  }
  if (key.includes('wind') || key.includes('ac-repair')) {
    return <Wind className={`${className} text-cyan-300`} />;
  }
  if (key.includes('plug') || key.includes('appliance')) {
    return <Plug className={`${className} text-teal-300`} />;
  }
  if (key.includes('bug') || key.includes('pest')) {
    return <Bug className={`${className} text-lime-400`} />;
  }
  if (key.includes('laptop') || key.includes('computer')) {
    return <Laptop className={`${className} text-indigo-300`} />;
  }
  if (key.includes('smartphone') || key.includes('mobile')) {
    return <Smartphone className={`${className} text-emerald-300`} />;
  }
  if (key.includes('camera') || key.includes('cctv')) {
    return <Camera className={`${className} text-sky-300`} />;
  }
  if (key.includes('car') || key.includes('vehicle')) {
    return <Car className={`${className} text-amber-300`} />;
  }
  if (key.includes('shield') || key.includes('roadside')) {
    return <ShieldAlert className={`${className} text-rose-400`} />;
  }
  if (key.includes('truck') || key.includes('packers')) {
    return <Truck className={`${className} text-violet-300`} />;
  }
  if (key.includes('filter') || key.includes('purifier')) {
    return <Filter className={`${className} text-cyan-300`} />;
  }
  if (key.includes('package')) {
    return <Package className={`${className} text-teal-300`} />;
  }
  return <Wrench className={`${className} text-emerald-300`} />;
}

export interface BookingFormTemplate {
  key: BookingFormTemplateKey;
  title: string;
  subtitle: string;
  fields: CategoryFormField[];
}

export const BOOKING_FORM_CONFIGS: Record<
  BookingFormTemplateKey,
  BookingFormTemplate
> = {
  'home-cleaning': {
    key: 'home-cleaning',
    title: 'Home Cleaning Property Details',
    subtitle:
      'Share your property size and cleaning scope so the team arrives with the right equipment and supplies.',
    fields: [
      {
        name: 'propertyType',
        label: 'Property Type',
        type: 'select',
        options: ['Apartment / Flat', 'Independent House / Kothi', 'Villa', 'Office / Studio'],
        required: true,
      },
      {
        name: 'bhkSize',
        label: 'Home Configuration (BHK)',
        type: 'select',
        options: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'],
        required: true,
      },
      {
        name: 'bathroomsCount',
        label: 'Number of Bathrooms',
        type: 'select',
        options: ['1 Bathroom', '2 Bathrooms', '3 Bathrooms', '4+ Bathrooms'],
        required: true,
      },
      {
        name: 'cleaningType',
        label: 'Cleaning Type',
        type: 'select',
        options: [
          'Full Home Deep Cleaning',
          'Kitchen Deep Cleaning',
          'Bathroom Deep Cleaning',
          'Sofa & Upholstery Cleaning',
          'Carpet Cleaning',
          'Move-in / Move-out Cleaning',
        ],
        required: true,
      },
      {
        name: 'homeSizeSqFt',
        label: 'Approximate Home Size (sq. ft.)',
        type: 'text',
        placeholder: 'e.g., 1,250 sq. ft.',
      },
    ],
  },
  electrician: {
    key: 'electrician',
    title: 'Electrical Service Details',
    subtitle:
      'Specify the electrical issue and service type for accurate tools and safety gear.',
    fields: [
      {
        name: 'electricalProblem',
        label: 'Electrical Problem',
        type: 'select',
        options: [
          'MCB / Fuse Tripping',
          'Switch / Socket Repair',
          'Ceiling Fan / Exhaust Installation',
          'Inverter / Stabilizer Issue',
          'Short Circuit / Wiring Fault',
          'Light / Chandelier Fitting',
        ],
        required: true,
      },
      {
        name: 'serviceType',
        label: 'Service Type',
        type: 'select',
        options: [
          'Repair / Fault Diagnosis',
          'New Installation',
          'Replacement / Upgrade',
          'Full Home Safety Check',
        ],
        required: true,
      },
    ],
  },
  plumber: {
    key: 'plumber',
    title: 'Plumbing Service Details',
    subtitle:
      'Help the plumber prepare the right valves, seals, and pipe fittings before arrival.',
    fields: [
      {
        name: 'plumbingType',
        label: 'Plumbing Need',
        type: 'select',
        options: ['Leakage', 'Blockage / Drain Cleaning', 'New Installation', 'Repair / Replacement'],
        required: true,
      },
      {
        name: 'affectedArea',
        label: 'Affected Area / Fixture',
        type: 'select',
        options: [
          'Kitchen Sink / Tap',
          'Bathroom / Shower / Flush',
          'Overhead Water Tank / Motor',
          'Underground / Wall Pipe',
          'Geyser / Washing Machine Inlet',
        ],
      },
    ],
  },
  'vehicle-repair': {
    key: 'vehicle-repair',
    title: 'Vehicle & Roadside Assistance Details',
    subtitle:
      'Provide your vehicle details, breakdown location, and urgency so the right mechanic is dispatched.',
    fields: [
      {
        name: 'vehicleType',
        label: 'Vehicle Type',
        type: 'select',
        options: ['Car', 'Bike', 'Scooter'],
        required: true,
      },
      {
        name: 'vehicleBrandModel',
        label: 'Vehicle Brand & Model',
        type: 'text',
        placeholder: 'e.g., Maruti Swift VXi / Honda Activa 6G / Royal Enfield Classic 350',
        required: true,
      },
      {
        name: 'registrationNumber',
        label: 'Registration Number (Optional)',
        type: 'text',
        placeholder: 'e.g., PB-65-AB-1234',
      },
      {
        name: 'problemType',
        label: 'Problem Type',
        type: 'select',
        options: [
          'Engine / Starting Trouble',
          'Battery Jump-start / Dead Battery',
          'Tyre & Puncture Repair',
          'Periodic Servicing & Oil Change',
          'Brake / Clutch / Chain Issue',
          'Towing / Recovery Needed',
          'Pre-purchase / Full Vehicle Inspection',
        ],
        required: true,
      },
      {
        name: 'repairMode',
        label: 'Breakdown or Normal Repair',
        type: 'select',
        options: ['Normal Repair / Scheduled Service', 'On-Spot Roadside Breakdown'],
        required: true,
      },
      {
        name: 'currentLocation',
        label: 'Current Location / Landmark',
        type: 'text',
        placeholder: 'e.g., Near Phase 7 Traffic Light, Mohali',
        required: true,
      },
      {
        name: 'urgencyLevel',
        label: 'Urgency Level',
        type: 'select',
        options: ['Standard (Same Day)', 'Urgent (Within 2 Hours)', 'Emergency Breakdown (Immediate)'],
        required: true,
      },
    ],
  },
  'computer-mobile': {
    key: 'computer-mobile',
    title: 'Device & Tech Support Details',
    subtitle:
      'Tell us your device brand, problem category, and preferred service mode.',
    fields: [
      {
        name: 'deviceType',
        label: 'Device Type',
        type: 'select',
        options: ['Laptop', 'Desktop PC', 'Mobile Phone', 'Tablet', 'Wi-Fi Router / CCTV'],
        required: true,
      },
      {
        name: 'deviceBrandModel',
        label: 'Brand & Model',
        type: 'text',
        placeholder: 'e.g., Dell Inspiron 15 / MacBook Air / iPhone 14 / Samsung Galaxy',
        required: true,
      },
      {
        name: 'problemCategory',
        label: 'Problem Category',
        type: 'select',
        options: [
          'Screen / Display Damage',
          'Battery / Charging Issue',
          'Windows / OS / Software Installation',
          'SSD / RAM Hardware Upgrade',
          'Slow Performance / Virus Removal',
          'Wi-Fi / Networking / CCTV Setup',
          'No Power / Motherboard Issue',
        ],
        required: true,
      },
      {
        name: 'preferredServiceType',
        label: 'Preferred Service Type',
        type: 'select',
        options: [
          'Doorstep Visit (At Home/Office)',
          'Pickup & Lab Repair',
          'On-Site Setup & Testing',
        ],
        required: true,
      },
    ],
  },
  generic: {
    key: 'generic',
    title: 'Service Requirement Details',
    subtitle:
      'Add specific property, appliance, or scope details to help your technician prepare.',
    fields: [
      {
        name: 'serviceScope',
        label: 'Service Scope / Asset Type',
        type: 'text',
        placeholder: 'e.g., 1.5 Ton Split AC / 2 BHK Painting / RO Purifier / 2 BHK Shifting',
        required: true,
      },
      {
        name: 'urgencyLevel',
        label: 'Priority',
        type: 'select',
        options: ['Standard Visit', 'Same-Day Priority', 'Flexible Schedule'],
      },
    ],
  },
};

export function getBookingFormTemplate(
  category?: CategoryItem | null
): BookingFormTemplate {
  if (!category) return BOOKING_FORM_CONFIGS.generic;
  if (category.bookingFormKey && BOOKING_FORM_CONFIGS[category.bookingFormKey]) {
    return BOOKING_FORM_CONFIGS[category.bookingFormKey];
  }
  const slug = category.slug;
  if (slug === 'electrician') return BOOKING_FORM_CONFIGS.electrician;
  if (slug === 'plumber') return BOOKING_FORM_CONFIGS.plumber;
  if (slug === 'home-cleaning') return BOOKING_FORM_CONFIGS['home-cleaning'];
  if (slug === 'vehicle-repair' || slug === 'roadside-assistance') {
    return BOOKING_FORM_CONFIGS['vehicle-repair'];
  }
  if (
    slug === 'computer-repair' ||
    slug === 'mobile-repair' ||
    slug === 'cctv-installation'
  ) {
    return BOOKING_FORM_CONFIGS['computer-mobile'];
  }
  return BOOKING_FORM_CONFIGS.generic;
}

export function isCategoryVisibleInCity(
  cat: CategoryItem,
  city: CitySlug
): boolean {
  if (!cat.active) return false;
  if (cat.cityAvailability && cat.cityAvailability.length > 0) {
    return cat.cityAvailability.includes(city);
  }
  return true;
}

export function isSubcategoryVisibleInCity(
  sub: SubcategoryItem,
  cat: CategoryItem | undefined,
  city: CitySlug
): boolean {
  if (!sub.active) return false;
  if (cat && !isCategoryVisibleInCity(cat, city)) return false;
  if (sub.cityAvailability && sub.cityAvailability.length > 0) {
    return sub.cityAvailability.includes(city);
  }
  return true;
}
