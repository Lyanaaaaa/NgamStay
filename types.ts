
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
