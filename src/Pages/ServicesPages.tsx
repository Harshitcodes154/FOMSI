import { useState } from 'react';
import { motion } from 'framer-motion';
import { services, Service, useAppStore } from '@/lib/store';
import { ServiceCard } from '@/components/ServiceCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Cleaning', 'Repair', 'Beauty', 'Home'];

export default function ServicesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const { user, addBooking } = useAppStore();
  const navigate = useNavigate();

  const filtered = services.filter(s =>
    (category === 'All' || s.category === category) &&
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = (service: Service) => {
    if (!user) {
      toast({ title: 'Please login first', variant: 'destructive' });
      navigate('/auth');
      return;
    }
    addBooking({
      id: `b-${Date.now()}`,
      serviceId: service.id,
      customerId: user.id,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    });
    toast({ title: 'Booked!', description: `${service.name} booked successfully` });
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold font-display">Our Services</h1>
          <p className="text-muted-foreground mt-2">Professional services at your doorstep</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services..."
              className="pl-10 rounded-xl glass"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <Button
                key={c}
                variant={category === c ? 'default' : 'outline'}
                size="sm"
                className={`rounded-xl ${category === c ? 'gradient-primary text-primary-foreground border-0' : 'glass'}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((s, i) => (
            <ServiceCard key={s.id} service={s} onBook={handleBook} delay={i * 0.05} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No services found</div>
        )}
      </div>
    </div>
  );
}
