import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import EndSection from "./components/EndSection";
import MarathonDetail from "./pages/MarathonDetail";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import MarathonSignUpForm from "./pages/MarathonSignUpForm";
import PaymentResultPage from "./pages/Payment";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutusPage";
import ContactPage from "./pages/ContactusPage";
import TermsOfUse from "./pages/TermofUsePage";
import ValidatePage from "./pages/ValidatePage";
import ScrollToTop from "./components/ScrollToTop";



const App = () => {
  const queryClient = new QueryClient();
  const location = useLocation();

  const hideEndSection =
    location.pathname === '/auth' ||

    location.pathname === '/marathon';
  location.pathname === '/23818109.txt';
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col">
        {location.pathname !== '/auth' && location.pathname !== '/23818109.txt' && <Navbar />}
        <Routes>
          {/* <Route path="/" element={<MarathonSignUpForm/>} /> */}
         
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<MarathonDetail />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/term" element={<TermsOfUse />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route path="/marathon" element={<MarathonSignUpForm />} />
          <Route path="/payment" element={<PaymentResultPage />} />
        </Routes>
        {!hideEndSection && <EndSection />}
      </div>
      <Toaster richColors closeButton />
    </QueryClientProvider>

  );
};

export default App;
