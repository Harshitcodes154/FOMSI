import { motion } from 'framer-motion';
import { StatsCard } from '@/components/StatsCard';
import { GlassCard } from '@/components/GlassCard';
import { useAppStore, services } from '@/lib/store';
import { Briefcase, DollarSign, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

export default function EmployeeDashboard() {
  const { bookings, updateBooking } = useAppStore();
  const pendingJobs = bookings.filter(b => b.status === 'pending' || b.status === 'assigned');

  const handleAccept = (id: string) => {
    updateBooking(id, { status: 'in-progress', employeeId: 'e-current' });
    toast({ title: 'Job accepted!' });
  };

  const handleComplete = (id: string) => {
    updateBooking(id, { status: 'completed' });
    toast({ title: 'Job completed!' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-2xl font-bold font-display">Employee Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Active Jobs" value={pendingJobs.length} icon={Briefcase} delay={0} />
        <StatsCard title="Completed" value={bookings.filter(b => b.status === 'completed').length} icon={CheckCircle} delay={0.1} />
        <StatsCard title="Earnings" value="₹24,500" icon={DollarSign} trend="+12% this week" delay={0.2} />
        <StatsCard title="Rating" value="4.9" icon={Star} delay={0.3} />
      </div>

      <GlassCard hover={false}>
        <h2 className="font-semibold text-lg mb-4">Job Requests</h2>
        <div className="space-y-3">
          {bookings.map((b) => {
            const svc = services.find(s => s.id === b.serviceId);
            return (
              <div key={b.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <div>
                  <p className="font-medium text-sm">{svc?.name}</p>
                  <p className="text-xs text-muted-foreground">{b.date} · {b.status}</p>
                </div>
                <div className="flex gap-2">
                  {b.status === 'pending' && (
                    <Button size="sm" className="gradient-primary text-primary-foreground border-0 rounded-xl" onClick={() => handleAccept(b.id)}>Accept</Button>
                  )}
                  {(b.status === 'in-progress' || b.status === 'assigned') && (
                    <Button size="sm" variant="outline" className="rounded-xl" onClick={() => handleComplete(b.id)}>Complete</Button>
                  )}
                  {b.status === 'completed' && <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">Done</Badge>}
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </motion.div>
  );
}
