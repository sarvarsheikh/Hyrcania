import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import EndSection from "./components/EndSection";
import MarathonDetail from "./pages/MarathonDetail";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import MarathonSignUpForm from "./pages/MarathonSignUpForm";
import PaymentResultPage from "./pages/Payment";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactusPage";
import TermsOfUse from "./pages/TermofUsePage";
import { Toaster } from "sonner";
import Preloader from "./pages/pre-loader";
import AboutPage from "./pages/AboutusPage";


const App = () => {
  const queryClient = new QueryClient();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // ✅ loading state

  // ✅ Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2700); // 1 sec
    return () => clearTimeout(timer);
  }, []);

  const hideEndSection =
    location.pathname === "/auth" ||
    location.pathname === "/marathon" ||
    location.pathname === "/23818109.txt";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col">
        {loading && <Preloader />} {/* ✅ show preloader on top */}
        {!loading && location.pathname !== "/auth" && location.pathname !== "/23818109.txt" && (
          <Navbar />
        )}
        {!loading && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<MarathonDetail />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/term" element={<TermsOfUse />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/marathon" element={<MarathonSignUpForm />} />
            <Route path="/payment" element={<PaymentResultPage />} />
          </Routes>
        )}
        {!loading && !hideEndSection && <EndSection />}
      </div>
      <Toaster richColors closeButton />
    </QueryClientProvider>
  );
};

export default App;
