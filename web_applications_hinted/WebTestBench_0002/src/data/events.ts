export type EventCategory = 'concert' | 'conference' | 'workshop';

export interface TicketType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  image: string;
  ticketTypes: TicketType[];
  organizerId: string;
  featured?: boolean;
}

export interface Reservation {
  id: string;
  eventId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tickets: { ticketTypeId: string; quantity: number }[];
  totalAmount: number;
  createdAt: string;
}

export const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Jazz Festival',
    description: 'Experience an unforgettable evening of smooth jazz under the stars. Featuring world-renowned artists and emerging talents, this annual festival brings together jazz enthusiasts from around the globe for three nights of incredible music, delicious food, and vibrant community.',
    category: 'concert',
    date: '2026-07-15',
    time: '19:00',
    location: 'Central Park Amphitheater, New York',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop',
    ticketTypes: [
      { id: 't1', name: 'General Admission', price: 45, quantity: 500, description: 'Standing area with great views' },
      { id: 't2', name: 'VIP Seating', price: 120, quantity: 100, description: 'Reserved seating with complimentary drinks' },
      { id: 't3', name: 'Backstage Pass', price: 250, quantity: 20, description: 'Meet the artists and exclusive merchandise' },
    ],
    organizerId: 'org1',
    featured: true,
  },
  {
    id: '2',
    title: 'Tech Innovation Summit 2026',
    description: 'Join industry leaders and visionaries at the premier technology conference of the year. Explore cutting-edge innovations in AI, blockchain, and sustainable tech. Network with 2000+ professionals and gain insights that will shape the future of your business.',
    category: 'conference',
    date: '2026-09-20',
    time: '09:00',
    location: 'Convention Center, San Francisco',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
    ticketTypes: [
      { id: 't4', name: 'Standard Pass', price: 299, quantity: 1000, description: 'Full conference access' },
      { id: 't5', name: 'Premium Pass', price: 599, quantity: 200, description: 'Includes workshops and networking dinner' },
      { id: 't6', name: 'Executive Pass', price: 999, quantity: 50, description: 'Private sessions with speakers' },
    ],
    organizerId: 'org1',
    featured: true,
  },
  {
    id: '3',
    title: 'Watercolor Painting Workshop',
    description: 'Unlock your creative potential in this hands-on watercolor workshop. Perfect for beginners and intermediate artists, you\'ll learn essential techniques from a professional artist while creating your own beautiful landscape painting to take home.',
    category: 'workshop',
    date: '2026-06-28',
    time: '14:00',
    location: 'Art Studio Downtown, Seattle',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop',
    ticketTypes: [
      { id: 't7', name: 'Workshop Ticket', price: 75, quantity: 25, description: 'All materials included' },
    ],
    organizerId: 'org2',
  },
  {
    id: '4',
    title: 'Electronic Music Night',
    description: 'Dance the night away with top DJs spinning the best electronic beats. State-of-the-art sound system, stunning light show, and an electric atmosphere await you at this unforgettable night of music and celebration.',
    category: 'concert',
    date: '2026-08-02',
    time: '22:00',
    location: 'The Warehouse, Los Angeles',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop',
    ticketTypes: [
      { id: 't8', name: 'Early Bird', price: 35, quantity: 200, description: 'Limited availability' },
      { id: 't9', name: 'General Entry', price: 55, quantity: 500, description: 'Standard admission' },
      { id: 't10', name: 'VIP Table', price: 400, quantity: 10, description: 'Reserved table for 4 with bottle service' },
    ],
    organizerId: 'org2',
  },
  {
    id: '5',
    title: 'Leadership & Management Masterclass',
    description: 'Transform your leadership style with this intensive two-day masterclass. Learn from Fortune 500 executives and gain practical tools for building high-performing teams, driving innovation, and navigating organizational change.',
    category: 'conference',
    date: '2026-10-15',
    time: '08:30',
    location: 'Business Academy, Chicago',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
    ticketTypes: [
      { id: 't11', name: 'Two-Day Pass', price: 450, quantity: 80, description: 'Full masterclass access with materials' },
      { id: 't12', name: 'Team Package (5)', price: 1800, quantity: 8, description: 'For teams of 5, includes group coaching' },
    ],
    organizerId: 'org1',
  },
  {
    id: '6',
    title: 'Pottery & Ceramics Weekend',
    description: 'Get your hands dirty in this immersive pottery weekend. From throwing on the wheel to glazing techniques, you\'ll create three unique ceramic pieces under expert guidance. All skill levels welcome in our cozy studio environment.',
    category: 'workshop',
    date: '2026-07-30',
    time: '10:00',
    location: 'Clay Works Studio, Portland',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop',
    ticketTypes: [
      { id: 't13', name: 'Weekend Pass', price: 195, quantity: 8, description: 'Saturday & Sunday sessions, materials included' },
    ],
    organizerId: 'org2',
  },
];

export const initialReservations: Reservation[] = [
  {
    id: 'r1',
    eventId: '1',
    customerName: 'Alice Johnson',
    customerEmail: 'alice@email.com',
    customerPhone: '555-0101',
    tickets: [{ ticketTypeId: 't1', quantity: 2 }],
    totalAmount: 90,
    createdAt: '2026-01-15T10:30:00Z',
  },
  {
    id: 'r2',
    eventId: '2',
    customerName: 'Bob Smith',
    customerEmail: 'bob@email.com',
    customerPhone: '555-0102',
    tickets: [{ ticketTypeId: 't5', quantity: 1 }],
    totalAmount: 599,
    createdAt: '2026-01-18T14:20:00Z',
  },
  {
    id: 'r3',
    eventId: '1',
    customerName: 'Carol Davis',
    customerEmail: 'carol@email.com',
    customerPhone: '555-0103',
    tickets: [{ ticketTypeId: 't2', quantity: 4 }],
    totalAmount: 480,
    createdAt: '2026-01-20T09:15:00Z',
  },
];
