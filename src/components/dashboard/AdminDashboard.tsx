import { motion } from 'framer-motion';
import { StatsCard } from '@/components/StatsCard';
import { GlassCard } from '@/components/GlassCard';
import { useAppStore } from '@/lib/store';
import { Users, CalendarCheck, DollarSign, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 53000 },
  { month: 'Mar', revenue: 61000 },
  { month: 'Apr', revenue: 48000 },
  { month: 'May', revenue: 72000 },
  { month: 'Jun', revenue: 85000 },
];

const categoryData = [
  { name: 'Cleaning', value: 35 },
  { name: 'Repair', value: 40 },
  { name: 'Beauty', value: 15 },
  { name: 'Home', value: 10 },
];

const COLORS = ['hsl(250,80%,60%)', 'hsl(280,70%,60%)', 'hsl(200,80%,55%)', 'hsl(150,60%,50%)'];

export default function AdminDashboard() {
  const bookings = useAppStore((s) => s.bookings);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-2xl font-bold font-display">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value="1,248" icon={Users} trend="+86 this month" delay={0} />
        <StatsCard title="Bookings" value={bookings.length} icon={CalendarCheck} delay={0.1} />
        <StatsCard title="Revenue" value="₹3.6L" icon={DollarSign} trend="+18% MoM" delay={0.2} />
        <StatsCard title="Growth" value="24%" icon={TrendingUp} delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false}>
          <h2 className="font-semibold text-lg mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard hover={false}>
          <h2 className="font-semibold text-lg mb-4">Service Categories</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {categoryData.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                {c.name} ({c.value}%)
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard hover={false}>
        <h2 className="font-semibold text-lg mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'New user registered', time: '2 min ago', type: 'user' },
            { action: 'Booking #1234 completed', time: '15 min ago', type: 'booking' },
            { action: 'Payment of ₹1,500 received', time: '1 hr ago', type: 'payment' },
            { action: 'Employee Raj assigned to job', time: '2 hrs ago', type: 'assignment' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
              <p className="text-sm font-medium">{item.action}</p>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
