import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeProvider";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home";
import About from "./pages/About";
import Impact from "./pages/Impact";
import Calculator from "./pages/Calculator";
import Destinations from "./pages/Destinations";
import Tips from "./pages/Tips";
import Data from "./pages/Data";
import News from "./pages/News";
import Community from "./pages/Community";
import Notes from "./pages/Notes";
import Feedback from "./pages/Feedback";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider defaultTheme="system" storageKey="ecotravel-theme">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/impact" element={<Impact />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/destinations" element={<Destinations />} />
                  <Route path="/tips" element={<Tips />} />
                  <Route path="/data" element={<Data />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/notes" element={<Notes />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/profile" element={<Profile />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <Chatbot />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
