import { create } from 'zustand';

export type UserRole = 'customer' | 'employee' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
  category: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  customerId: string;
  employeeId?: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  date: string;
  rating?: number;
  feedback?: string;
}

interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  bookings: Booking[];
  setUser: (user: User | null) => void;
  toggleTheme: () => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, data: Partial<Booking>) => void;
}

export const services: Service[] = [
  { id: '1', name: 'Home Cleaning', price: 1200, icon: 'Sparkles', description: 'Professional deep cleaning for your entire home', category: 'Cleaning' },
  { id: '2', name: 'Electrician', price: 900, icon: 'Zap', description: 'Expert electrical repairs and installations', category: 'Repair' },
  { id: '3', name: 'Plumbing', price: 1000, icon: 'Droplets', description: 'Fix leaks, installations and pipe repairs', category: 'Repair' },
  { id: '4', name: 'AC Repair', price: 1500, icon: 'Wind', description: 'AC servicing, gas refill and repair', category: 'Repair' },
  { id: '5', name: 'Salon at Home', price: 1800, icon: 'Scissors', description: 'Premium salon services at your doorstep', category: 'Beauty' },
  { id: '6', name: 'Painting', price: 2000, icon: 'Paintbrush', description: 'Interior and exterior painting services', category: 'Home' },
  { id: '7', name: 'Carpentry', price: 1300, icon: 'Hammer', description: 'Custom furniture and wood repair work', category: 'Home' },
  { id: '8', name: 'Pest Control', price: 1700, icon: 'Bug', description: 'Complete pest elimination solutions', category: 'Cleaning' },
  { id: '9', name: 'Appliance Repair', price: 1400, icon: 'Wrench', description: 'Fix any home appliance quickly', category: 'Repair' },
  { id: '10', name: 'Bathroom Cleaning', price: 1100, icon: 'Bath', description: 'Deep sanitization of bathrooms', category: 'Cleaning' },
];

export const useAppStore = create<AppState>((set) => ({
  user: null,
  theme: 'dark',
  bookings: [
    { id: 'b1', serviceId: '1', customerId: 'c1', employeeId: 'e1', status: 'completed', date: '2026-03-28', rating: 5, feedback: 'Excellent service!' },
    { id: 'b2', serviceId: '4', customerId: 'c1', status: 'pending', date: '2026-03-31' },
    { id: 'b3', serviceId: '2', customerId: 'c2', employeeId: 'e1', status: 'in-progress', date: '2026-03-30' },
    { id: 'b4', serviceId: '5', customerId: 'c3', employeeId: 'e2', status: 'assigned', date: '2026-04-01' },
  ],
  setUser: (user) => set({ user }),
  toggleTheme: () => set((s) => {
    const next = s.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    return { theme: next };
  }),
  addBooking: (booking) => set((s) => ({ bookings: [...s.bookings, booking] })),
  updateBooking: (id, data) => set((s) => ({
    bookings: s.bookings.map(b => b.id === id ? { ...b, ...data } : b),
  })),
}));
