import { GlassCard } from './GlassCard';
import { Button } from '@/components/ui/button';
import { Service } from '@/lib/store';
import * as Icons from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
  delay?: number;
}

export function ServiceCard({ service, onBook, delay = 0 }: ServiceCardProps) {
  const IconComponent = (Icons as any)[service.icon] || Icons.Wrench;

  return (
    <GlassCard delay={delay} className="flex flex-col h-full">
      <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-4">
        <IconComponent className="h-6 w-6 text-primary-foreground" />
      </div>
      <h3 className="font-semibold text-lg">{service.name}</h3>
      <p className="text-sm text-muted-foreground mt-1 flex-1">{service.description}</p>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <span className="text-xl font-bold gradient-text">₹{service.price}</span>
        <Button
          size="sm"
          className="gradient-primary text-primary-foreground border-0 rounded-xl"
          onClick={() => onBook(service)}
        >
          Book Now
        </Button>
      </div>
    </GlassCard>
  );
}
