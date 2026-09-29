// src/App.jsx
import { Routes, Route, useNavigate, useParams, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsApp from './components/WhatsApp';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import TrayectoriaYValor from './components/TrayectoriaYValor';
import SEO from './components/SEO';
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

const ProyectoSEO = () => {
  const { slug } = useParams();
  const nombre = slug.replace(/-/g, ' ');
  return (
    <SEO
      title={`Proyecto ${nombre} | Impulso Proyectistas e Ingenieros`}
      description={`Conoce el proyecto ${nombre}, desarrollado por Impulso Proyectistas e Ingenieros S.A.C. en Huaraz, Ancash.`}
      path={`/proyecto/${slug}`}
    />
  );
};

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-impulso-dark text-white selection:bg-impulso-orange selection:text-white">
      <Routes>

        {/* Rutas CON Navbar y Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={
            <main>
              <SEO
                title="Impulso Proyectistas e Ingenieros S.A.C. | Arquitectura y Construcción en Huaraz"
                description="Estudio de arquitectura e ingeniería en Huaraz, Ancash. Diseño residencial, comercial y habilitaciones urbanas con metodología BIM."
                path="/"
              />
              <Hero />
              <section id="proyectos">
                <Gallery onVerProyecto={(slug) => navigate(`/proyecto/${slug}`)} />
              </section>
              <TrayectoriaYValor />
            </main>
          } />

          <Route path="/servicios" element={<>
            <SEO
              title="Servicios de Arquitectura e Ingeniería en Huaraz | Impulso"
              description="Diseño arquitectónico, ingeniería estructural, modelado BIM, supervisión de obra y construcción de edificios en Huaraz y Ancash."
              path="/servicios"
            />
            <ServiciosPage />
          </>} />

          <Route path="/obra" element={<>
            <SEO
              title="Obras en Ejecución en Huaraz | Impulso Proyectistas e Ingenieros"
              description="Conoce el avance de nuestras obras en ejecución en Huaraz, Ancash: edificios multifamiliares y proyectos comerciales."
              path="/obra"
            />
            <ObraPage />
          </>} />

          <Route path="/principios" element={<>
            <SEO
              title="Principios del Estudio | Impulso Proyectistas e Ingenieros"
              description="Los principios que guían nuestro trabajo: calidad, seguridad antisísmica, optimización de recursos y gestión integral de proyectos."
              path="/principios"
            />
            <PrincipiosPage />
          </>} />

          <Route path="/publicaciones" element={<>
            <SEO
              title="Publicaciones y Noticias | Impulso Proyectistas e Ingenieros"
              description="Artículos, novedades y publicaciones de Impulso Proyectistas e Ingenieros S.A.C. sobre arquitectura y construcción en Huaraz."
              path="/publicaciones"
            />
            <PublicacionesPage />
          </>} />

          <Route path="/contacto" element={<>
            <SEO
              title="Contacto y Asesoría | Impulso Proyectistas e Ingenieros en Huaraz"
              description="Agenda una asesoría para tu proyecto de arquitectura o construcción en Huaraz. Llámanos al +51 959 679 522 o escríbenos."
              path="/contacto"
            />
            <ContactoPage />
          </>} />

          <Route path="/libro-reclamaciones" element={<>
            <SEO
              title="Libro de Reclamaciones | Impulso Proyectistas e Ingenieros"
              description="Registra tu reclamo o queja en el libro de reclamaciones virtual de Impulso Proyectistas e Ingenieros S.A.C."
              path="/libro-reclamaciones"
            />
            <LibroReclamaciones />
          </>} />

          <Route path="/politicas-privacidad" element={<>
            <SEO
              title="Políticas de Privacidad | Impulso Proyectistas e Ingenieros"
              description="Políticas de privacidad y tratamiento de datos personales de Impulso Proyectistas e Ingenieros S.A.C."
              path="/politicas-privacidad"
            />
            <PoliticasPrivacidad />
          </>} />

          <Route path="/terminos-condiciones" element={<>
            <SEO
              title="Términos y Condiciones | Impulso Proyectistas e Ingenieros"
              description="Términos y condiciones de uso del sitio web de Impulso Proyectistas e Ingenieros S.A.C."
              path="/terminos-condiciones"
            />
            <TerminosCondiciones />
          </>} />
        </Route>

        {/* Ruta SIN Navbar/Footer — DetalleProyecto tiene los suyos propios */}
        <Route path="/proyecto/:slug" element={<>
          <ProyectoSEO />
          <DetalleProyectoPage onClose={() => navigate('/')} />
        </>} />

      </Routes>
    </div>
  );
}