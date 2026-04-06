import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GlassNavbar } from "@/components/glassnavbar";

// FIXED IMPORTS:
import LandingPage from "./Pages/LandingPage";    // Folder is "Pages"
import AuthPage from "./Pages/Authpages";        // File is "Authpages.tsx"
import ServicesPage from "./Pages/ServicesPages"; // File is "ServicesPages.tsx"
import DashboardPage from "../DashboardPage";      // File is in "src/DashboardPage.tsx"
import NotFound from "./Pages/Notfound";          // File is "Notfound.tsx"
import { useEffect } from "react";
import { useAppStore } from "./lib/store";

const queryClient = new QueryClient();

function ThemeInit() {
  const theme = useAppStore((s) => s.theme);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <ThemeInit />
        <GlassNavbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
