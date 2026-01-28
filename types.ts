
export enum PersonaType {
  PROFESSIONAL = 'PROFESSIONAL',
  NOMAD = 'NOMAD',
  STUDENT = 'STUDENT'
}

export interface UserPersona {
  id: PersonaType;
  name: string;
  role: string;
  preferences: string[];
  avatar: string;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  neighborhood: string;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  utilities: string;
  deposit: string;
  leaseTerms: string;
  amenities: string[];
  lifestyleTags: string[];
  images: string[];
  isVerified: boolean;
  rating: number;
  coords: { x: number; y: number };
}

export interface NeighborhoodInsight {
  safety: number;
  connectivity: number;
  lifestyle: number;
  description: string;
}

// Property Manager Types
export enum AuthMethod {
  AUTORENTIC = 'AUTORENTIC',
  EMAIL_OTP = 'EMAIL_OTP',
  PHONE_OTP = 'PHONE_OTP'
}

export enum ListingStatus {
  DRAFT = 'DRAFT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  OCCUPIED = 'OCCUPIED',
  REJECTED = 'REJECTED'
}

export enum PMAccountType {
  AUTORENTIC = 'AUTORENTIC',
  PUBLIC = 'PUBLIC'
}

export interface PMUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  accountType: PMAccountType;
  isVerified: boolean;
  autorenticUserId?: string;
  createdAt: Date;
  listingCount: number;
  approvedListingCount: number;
}

export interface Listing extends Property {
  pmUserId: string;
  status: ListingStatus;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  autorenticUnitId?: string;
  reviewNotes?: string;
  isAvailable: boolean;
  promotionalPrice?: number;
}
