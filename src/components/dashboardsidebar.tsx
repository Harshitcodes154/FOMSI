import { useAppStore } from '@/lib/store';
import { NavLink } from '@/components/NavLink';
import {
  LayoutDashboard, CalendarCheck, Star, MessageSquare,
  Users, Settings, BarChart3, DollarSign, Briefcase,
  ClipboardList, Building2
} from 'lucide-react';

const customerLinks = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/bookings', label: 'My Bookings', icon: CalendarCheck },
  { to: '/dashboard/feedback', label: 'Feedback', icon: Star },
  { to: '/dashboard/complaints', label: 'Complaints', icon: MessageSquare },
];

const employeeLinks = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/jobs', label: 'My Jobs', icon: Briefcase },
  { to: '/dashboard/earnings', label: 'Earnings', icon: DollarSign },
  { to: '/dashboard/profile', label: 'Profile', icon: Settings },
];

const adminLinks = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/users', label: 'Users', icon: Users },
  { to: '/dashboard/assignments', label: 'Assignments', icon: ClipboardList },
  { to: '/dashboard/departments', label: 'Departments', icon: Building2 },
  { to: '/dashboard/reports', label: 'Reports', icon: BarChart3 },
  { to: '/dashboard/pricing', label: 'Pricing', icon: DollarSign },
];

export function DashboardSidebar() {
  const user = useAppStore((s) => s.user);
  const links = user?.role === 'admin' ? adminLinks : user?.role === 'employee' ? employeeLinks : customerLinks;

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-4rem)] glass border-r border-border p-4 gap-1">
      <div className="mb-4 px-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">Dashboard</p>
        <p className="font-semibold text-sm mt-1 capitalize">{user?.role} Panel</p>
      </div>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/dashboard'}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-accent/50 transition-colors"
          activeClassName="bg-primary/10 text-primary font-medium"
        >
          <link.icon className="h-4 w-4" />
          <span>{link.label}</span>
        </NavLink>
      ))}
    </aside>
  );
}
