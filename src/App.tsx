import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Partners from "./pages/Partners";
import Info from "./pages/Info";
import Contact from "./pages/Contact";
import EspaceCoachs from "./pages/EspaceCoachs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipe" element={<Team />} />
            <Route path="/partenaires" element={<Partners />} />
            <Route path="/infos" element={<Info />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/espace-coachs" element={<EspaceCoachs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;