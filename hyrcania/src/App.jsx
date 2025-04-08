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



const App = () => {
  const queryClient = new QueryClient();
  const location = useLocation(); 
  return (
    <QueryClientProvider client={queryClient}>  
      <div className="flex flex-col">
        { 
          location.pathname !== '/auth' && <Navbar />
        }
        <Routes>
          <Route path="/" element={<MarathonSignUpForm/>} />
          <Route path="/blog" element={<MarathonDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
        { // Conditionally render EndSection
          location.pathname !== '/auth' && <EndSection />
        }
      </div> 
      <Toaster richColors closeButton />
    </QueryClientProvider>
    // <LoginPage/>
  );
};

export default App;
