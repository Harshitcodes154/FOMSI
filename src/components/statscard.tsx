import { GlassCard } from './GlassCard';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  delay?: number;
}

export function StatsCard({ title, value, icon: Icon, trend, delay = 0 }: StatsCardProps) {
  return (
    <GlassCard delay={delay} hover={false}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {trend && <p className="text-xs text-green-500 mt-1">{trend}</p>}
        </div>
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>
    </GlassCard>
  );
}
