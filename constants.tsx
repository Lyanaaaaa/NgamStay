
import { Property, PersonaType, UserPersona } from './types';

export const PERSONAS: UserPersona[] = [
  {
    id: PersonaType.PROFESSIONAL,
    name: 'Farah',
    role: 'Corporate Strategist',
    preferences: ['Near MRT', 'Security', 'Modern Gym'],
    avatar: 'https://picsum.photos/seed/farah/200'
  },
  {
    id: PersonaType.NOMAD,
    name: 'Liam',
    role: 'Software Engineer',
    preferences: ['High-speed WiFi', 'Coworking Nearby', 'Flexible Lease'],
    avatar: 'https://picsum.photos/seed/liam/200'
  },
  {
    id: PersonaType.STUDENT,
    name: 'Wei',
    role: 'Graduate Student',
    preferences: ['Affordable', 'Near University', 'Roommate Friendly'],
    avatar: 'https://picsum.photos/seed/wei/200'
  }
];

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Studio at Bangsar South',
    price: 2400,
    location: 'Bangsar South, KL',
    neighborhood: 'Bangsar',
    type: 'Serviced Apartment',
    beds: 1,
    baths: 1,
    sqft: 550,
    utilities: 'Included except Electricity',
    deposit: '2 + 0.5 Months',
    leaseTerms: 'Minimum 12 Months',
    amenities: ['Gym', 'Pool', 'Rooftop Garden', '24/7 Security'],
    lifestyleTags: ['Near MRT', 'Cafe Culture', 'Pet Friendly'],
    images: ['https://picsum.photos/seed/prop1/800/600', 'https://picsum.photos/seed/prop1b/800/600'],
    isVerified: true,
    rating: 4.8,
    coords: { x: 30, y: 40 }
  },
  {
    id: '2',
    title: 'Digital Nomad Nest - Mont Kiara',
    price: 3200,
    location: 'Mont Kiara, KL',
    neighborhood: 'Mont Kiara',
    type: 'Condo',
    beds: 2,
    baths: 2,
    sqft: 950,
    utilities: 'High-speed Fiber Included',
    deposit: '1 Month Flexible',
    leaseTerms: '6 - 24 Months',
    amenities: ['Coworking Hub', 'Tennis Court', 'Sauna'],
    lifestyleTags: ['Nomad Ready', 'Expats Fav', 'Foodie Hub'],
    images: ['https://picsum.photos/seed/prop2/800/600', 'https://picsum.photos/seed/prop2b/800/600'],
    isVerified: true,
    rating: 4.9,
    coords: { x: 50, y: 20 }
  },
  {
    id: '3',
    title: 'Cozy Room in Subang Smart Home',
    price: 950,
    location: 'SS15, Subang Jaya',
    neighborhood: 'Subang Jaya',
    type: 'Room Rental',
    beds: 1,
    baths: 1,
    sqft: 180,
    utilities: 'All-inclusive',
    deposit: '1 Month Only',
    leaseTerms: 'Short Term OK',
    amenities: ['Kitchenette', 'Study Lounge', 'Laundry'],
    lifestyleTags: ['Student Hub', 'Near LRT', 'Budget Friendly'],
    images: ['https://picsum.photos/seed/prop3/800/600', 'https://picsum.photos/seed/prop3b/800/600'],
    isVerified: false,
    rating: 4.2,
    coords: { x: 20, y: 70 }
  },
  {
    id: '4',
    title: 'Cyberjaya Tech-Hub Duplex',
    price: 1800,
    location: 'Cyberjaya, Selangor',
    neighborhood: 'Cyberjaya',
    type: 'Duplex',
    beds: 1,
    baths: 2,
    sqft: 750,
    utilities: 'Smart Meter Installed',
    deposit: '2 Months',
    leaseTerms: '12 Months',
    amenities: ['Smart Lock', 'Infinity Pool', 'Gaming Room'],
    lifestyleTags: ['Quiet', 'Fast Internet', 'Modern Living'],
    images: ['https://picsum.photos/seed/prop4/800/600', 'https://picsum.photos/seed/prop4b/800/600'],
    isVerified: true,
    rating: 4.5,
    coords: { x: 70, y: 80 }
  },
  {
    id: '5',
    title: 'Luxury Suites @ Bukit Bintang',
    price: 4500,
    location: 'Bukit Bintang, KL City',
    neighborhood: 'City Center',
    type: 'Luxury Suite',
    beds: 1,
    baths: 1,
    sqft: 680,
    utilities: 'Excluded',
    deposit: '3 Months',
    leaseTerms: 'Long Term Preferred',
    amenities: ['Concierge', 'Sky Deck', 'Private Gym'],
    lifestyleTags: ['City Life', 'Nightlife', 'Premium'],
    images: ['https://picsum.photos/seed/prop5/800/600', 'https://picsum.photos/seed/prop5b/800/600'],
    isVerified: true,
    rating: 5.0,
    coords: { x: 60, y: 45 }
  }
];
