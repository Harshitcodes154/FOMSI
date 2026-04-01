import { motion } from 'framer-motion';
import { StatsCard } from '@/components/StatsCard';
import { GlassCard } from '@/components/GlassCard';
import { useAppStore, services } from '@/lib/store';
import { CalendarCheck, Clock, CheckCircle, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  assigned: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'in-progress': 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-green-500/10 text-green-600 border-green-500/20',
};

export default function CustomerDashboard() {
  const bookings = useAppStore((s) => s.bookings);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-2xl font-bold font-display">My Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Bookings" value={bookings.length} icon={CalendarCheck} delay={0} />
        <StatsCard title="Pending" value={bookings.filter(b => b.status === 'pending').length} icon={Clock} delay={0.1} />
        <StatsCard title="Completed" value={bookings.filter(b => b.status === 'completed').length} icon={CheckCircle} delay={0.2} />
        <StatsCard title="Avg Rating" value="4.8" icon={Star} trend="+0.3 this month" delay={0.3} />
      </div>

      <GlassCard hover={false}>
        <h2 className="font-semibold text-lg mb-4">Recent Bookings</h2>
        <div className="space-y-3">
          {bookings.map((b) => {
            const svc = services.find(s => s.id === b.serviceId);
            return (
              <div key={b.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div>
                  <p className="font-medium text-sm">{svc?.name || 'Service'}</p>
                  <p className="text-xs text-muted-foreground">{b.date}</p>
                </div>
                <Badge variant="outline" className={statusColors[b.status]}>
                  {b.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </motion.div>
  );
}
