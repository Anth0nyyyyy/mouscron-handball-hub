import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Partners from "./pages/Partners";
import Info from "./pages/Info";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const App = () => (
  // basename = "/" en local/OVH, "/mouscron-handball-hub/" sur GitHub Pages
  <BrowserRouter
    basename={import.meta.env.BASE_URL}
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <ScrollToTop />
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipe" element={<Team />} />
        <Route path="/partenaires" element={<Partners />} />
        <Route path="/infos" element={<Info />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
