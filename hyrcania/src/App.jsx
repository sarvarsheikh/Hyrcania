import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import EndSection from "./components/EndSection";
import MarathonDetail from "./pages/MarathonDetail";
import Dashboard from "./Pages/Dashboard";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<MarathonDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <EndSection />
      </div>
    </QueryClientProvider>
    // <LoginPage/>
  );
};

export default App;
