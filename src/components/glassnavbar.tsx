import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, LogOut, Menu, X } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function GlassNavbar() {
  const { user, theme, toggleTheme, setUser } = useAppStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">F</span>
          </div>
          <span className="font-display font-bold text-lg hidden sm:block">FOMSI</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
              <span className="text-xs px-2 py-1 rounded-full gradient-primary text-primary-foreground capitalize">{user.role}</span>
              <Button variant="ghost" size="icon" onClick={handleLogout}><LogOut className="h-4 w-4" /></Button>
            </>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="gradient-primary text-primary-foreground border-0">Login</Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-strong border-t border-border overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-3">
              <Link to="/services" onClick={() => setMobileOpen(false)} className="text-sm py-2">Services</Link>
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-sm py-2">Dashboard</Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-sm py-2 text-left text-destructive">Logout</button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setMobileOpen(false)} className="text-sm py-2">Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
