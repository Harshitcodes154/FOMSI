import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { services } from '@/lib/store';
import * as Icons from 'lucide-react';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';

const features = [
  { icon: Shield, title: 'Verified Pros', desc: 'Background-checked & trained professionals' },
  { icon: Clock, title: 'On-Time Service', desc: 'Guaranteed punctual service delivery' },
  { icon: Star, title: 'Quality Assured', desc: 'Rated & reviewed by real customers' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 animate-gradient" />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Now serving 50+ cities
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight">
              Connecting Skills with Needs —{' '}
              <span className="gradient-text">Instantly</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto">
              Premium home services at your fingertips. From cleaning to repairs, book trusted professionals in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link to="/services">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 rounded-2xl px-8 glow-primary">
                  Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="rounded-2xl px-8 glass">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <GlassCard key={f.title} delay={i * 0.1} glow={i === 1}>
                <f.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display">Popular Services</h2>
            <p className="text-muted-foreground mt-2">Most booked services this month</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {services.slice(0, 5).map((s, i) => {
              const Icon = (Icons as any)[s.icon] || Icons.Wrench;
              return (
                <GlassCard key={s.id} delay={i * 0.08} className="text-center">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <p className="font-medium text-sm">{s.name}</p>
                  <p className="text-primary font-bold mt-1">₹{s.price}</p>
                </GlassCard>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link to="/services">
              <Button variant="outline" className="rounded-2xl glass">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Fidel 'o' Manus Services (FOMSI). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
