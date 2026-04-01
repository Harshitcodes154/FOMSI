import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore, UserRole } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/GlassCard';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, User, Briefcase, Shield } from 'lucide-react';

const roles: { value: UserRole; label: string; icon: any; desc: string }[] = [
  { value: 'customer', label: 'Customer', icon: User, desc: 'Book home services' },
  { value: 'employee', label: 'Employee', icon: Briefcase, desc: 'Provide services' },
  { value: 'admin', label: 'Admin', icon: Shield, desc: 'Manage platform' },
];

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [showPw, setShowPw] = useState(false);
  const [forgotPw, setForgotPw] = useState(false);
  const { setUser } = useAppStore();
  const navigate = useNavigate();

  const validatePassword = (pw: string) => pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'Error', description: 'Please fill all fields', variant: 'destructive' });
      return;
    }
    if (!isLogin && !validatePassword(password)) {
      toast({ title: 'Weak Password', description: 'Min 8 chars, 1 uppercase, 1 number', variant: 'destructive' });
      return;
    }
    setUser({ id: Date.now().toString(), name: name || email.split('@')[0], email, role });
    toast({ title: `Welcome${isLogin ? ' back' : ''}!`, description: `Logged in as ${role}` });
    navigate('/dashboard');
  };

  const handleForgotPw = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Email Sent', description: 'Check your inbox for reset instructions' });
    setForgotPw(false);
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient" />
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <GlassCard hover={false} className="p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-foreground font-bold text-xl">F</span>
            </div>
            <h1 className="text-2xl font-bold font-display">
              {forgotPw ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {forgotPw ? 'Enter your email to reset' : isLogin ? 'Sign in to your account' : 'Join FOMSI today'}
            </p>
          </div>

          {forgotPw ? (
            <form onSubmit={handleForgotPw} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 rounded-xl glass" />
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground rounded-xl border-0">Send Reset Link</Button>
              <button type="button" onClick={() => setForgotPw(false)} className="text-sm text-primary w-full text-center">Back to login</button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <Label>Full Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="mt-1 rounded-xl glass" />
                  </div>
                  <div>
                    <Label className="mb-2 block">Role</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {roles.map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => setRole(r.value)}
                          className={`p-3 rounded-xl text-center text-xs transition-all border ${
                            role === r.value
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border glass hover:border-primary/50'
                          }`}
                        >
                          <r.icon className="h-4 w-4 mx-auto mb-1" />
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 rounded-xl glass" />
              </div>
              <div>
                <Label>Password</Label>
                <div className="relative mt-1">
                  <Input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="rounded-xl glass pr-10"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {!isLogin && password.length > 0 && (
                  <p className={`text-xs mt-1 ${validatePassword(password) ? 'text-green-500' : 'text-destructive'}`}>
                    {validatePassword(password) ? '✓ Strong password' : 'Min 8 chars, 1 uppercase, 1 number'}
                  </p>
                )}
              </div>
              {isLogin && (
                <button type="button" onClick={() => setForgotPw(true)} className="text-xs text-primary">Forgot password?</button>
              )}
              <Button type="submit" className="w-full gradient-primary text-primary-foreground rounded-xl border-0 glow-primary">
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
          )}

          {!forgotPw && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
