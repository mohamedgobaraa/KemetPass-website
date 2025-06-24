import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Chatbot from "./pages/Chatbot";
import ArExperience from "./pages/ArExperience";
import WhereAmI from "./pages/WhereAmI";
import WhoAmI from "./pages/WhoAmI";
import KnowMe from "./pages/KnowMe";
import Hieroglyphic from "./pages/Hieroglyphic";
import Weather from "./pages/Weather";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import Destinations from "./pages/Destinations";
import TripPlanner from "./pages/TripPlanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/ar" element={<ArExperience />} />
          <Route path="/where-am-i" element={<WhereAmI />} />
          <Route path="/who-am-i" element={<WhoAmI />} />
          <Route path="/know-me" element={<KnowMe />} />
          <Route path="/hieroglyphic" element={<Hieroglyphic />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
