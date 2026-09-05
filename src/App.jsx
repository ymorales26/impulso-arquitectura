// src/App.jsx
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsApp from './components/WhatsApp';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import TrayectoriaYValor from './components/TrayectoriaYValor';
import DetalleProyectoPage from './pages/DetalleProyectoPage';
import ContactoPage from './pages/ContactoPage';
import ServiciosPage from './pages/ServiciosPage';
import ObraPage from './pages/ObraPage';
import PrincipiosPage from './pages/PrincipiosPage';
import PublicacionesPage from './pages/PublicacionesPage';
import LibroReclamaciones from './pages/LibroReclamaciones';
import PoliticasPrivacidad from './pages/PoliticasPrivacidad';
import TerminosCondiciones from './pages/TerminosCondiciones';

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
    <WhatsApp />
  </>
);

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-impulso-dark text-white selection:bg-impulso-orange selection:text-white">
      <Routes>

        {/* Rutas CON Navbar y Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={
            <main>
              <Hero />
              <section id="proyectos">
                <Gallery onVerProyecto={(slug) => navigate(`/proyecto/${slug}`)} />
              </section>
              <TrayectoriaYValor />
            </main>
          } />
          <Route path="/servicios"     element={<ServiciosPage />} />
          <Route path="/obra"          element={<ObraPage />} />
          <Route path="/principios"    element={<PrincipiosPage />} />
          <Route path="/publicaciones" element={<PublicacionesPage />} />
          <Route path="/contacto"      element={<ContactoPage />} />
          <Route path="/libro-reclamaciones" element={<LibroReclamaciones />} />
          <Route path="/politicas-privacidad" element={<PoliticasPrivacidad />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
        </Route>

        {/* Ruta SIN Navbar/Footer — DetalleProyecto tiene los suyos propios */}
        <Route path="/proyecto/:slug" element={
          <DetalleProyectoPage onClose={() => navigate('/')} />
        } />

      </Routes>
    </div>
  );
}