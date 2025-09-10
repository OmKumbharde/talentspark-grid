import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ErrorPage from "./pages/ErrorPage";
import OnboardingFlow from "./components/OnboardingFlow";
import Dashboard from "./components/Dashboard";
import WorkspaceLayout from "./components/WorkspaceLayout";
import ProfileSection from "./components/ProfileSection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* Protected routes */}
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <OnboardingFlow onComplete={() => window.location.href = '/dashboard'} />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute requireOnboarding>
              <Dashboard userData={{} as any} onStartProject={(id) => window.location.href = `/workspace/${id}`} />
            </ProtectedRoute>
          } />
          
          <Route path="/workspace/:projectId" element={
            <ProtectedRoute requireOnboarding>
              <WorkspaceLayout projectId="" onBack={() => window.location.href = '/dashboard'} />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute requireOnboarding>
              <ProfileSection />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute requireOnboarding>
              <div className="p-8"><h1>Settings - Coming Soon</h1></div>
            </ProtectedRoute>
          } />
          
          {/* Error routes */}
          <Route path="/404" element={<ErrorPage />} />
          <Route path="/500" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
