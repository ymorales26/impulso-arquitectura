import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsApp from './components/WhatsApp';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import DetalleProyectoPage from './pages/DetalleProyectoPage';
import ContactoPage from './pages/ContactoPage';
import ServiciosPage from './pages/ServiciosPage';
import LibroReclamaciones from './pages/LibroReclamaciones';
import PoliticasPrivacidad from './pages/PoliticasPrivacidad'; // Importación 1
import TerminosCondiciones from './pages/TerminosCondiciones'; // Importación 2
import TrayectoriaYValor from "./components/TrayectoriaYValor";

// Este componente "Layout" define qué páginas SÍ tienen Navbar y Footer
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet /> {/* Aquí se renderiza el contenido de las rutas hijas */}
    <Footer />
    <WhatsApp />
  </>
);

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-impulso-dark text-white selection:bg-impulso-orange selection:text-white">
      <Routes>
        {/* Rutas QUE LLEVAN Header y Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={
            <main>
              <Hero />
              
              <section id="proyectos">
                <Gallery onVerProyecto={(slug) => navigate(`/proyecto/${slug}`)} />
              </section>

              {/* 2. INYECTAMOS EL COMPONENTE AQUÍ JUSTO DEBAJO DE GALLERY 👇 */}
              <TrayectoriaYValor />
            </main>
          } />
          
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/libro-reclamaciones" element={<LibroReclamaciones />} />
          <Route path="/politicas-privacidad" element={<PoliticasPrivacidad />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} /> 
        </Route>

        {/* Ruta que NO lleva Header y Footer */}
        <Route path="/proyecto/:slug" element={
          <DetalleProyectoPage onClose={() => navigate('/')} />
        } />
      </Routes>
    </div>
  );
}