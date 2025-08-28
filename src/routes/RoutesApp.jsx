// AppRoutes.jsx
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';
import { Sesion } from '../pages/Sesion';
import { ShowProduct } from '../pages/ShowProduct';
import { RecoverPass } from '../pages/RecoverPass';
import { Nav } from '../layouts/Nav';
import { Footer } from '../layouts/Footer';
import { Location } from '../pages/Location';
import { AllProducts } from '../pages/AllProducts';
import { CategoryProducts } from '../pages/CategoryProducts';
import { SearchProducts } from '../pages/SearchProducts';
import { Type } from '../pages/Type';
import { AllService } from '../pages/AllService';
import { ShowService } from '../pages/ShowService';
import { Favorites } from '../pages/Favorites';
import { Bag } from '../pages/Bag';
import { ScrollTop } from '../hooks/ScrollTop';
import { Chat } from '../components/Chat';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';


function RoutesApp() {
  const token = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <RoutesWithNav token={token} />
    </BrowserRouter>
  );
}

function RoutesWithNav({ token }) {

  const location = useLocation();

  const bodyStyleAdd = location.pathname == '/' && document.querySelector('body').classList.add('body-degra')
  const bodyStyleRemove = location.pathname != '/' && document.querySelector('body').classList.remove('body-degra')

  const ocultarNav = ['/registrar', '/sesion'].includes(location.pathname) ||
    location.pathname.startsWith('/recuperacion/');

  return (
    <>
      <ScrollTop />
      {!ocultarNav && <Nav />}

      {token && <Chat />}

      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/ubicacion" element={<Location />} />
        <Route path="/productos" element={<AllProducts />} />
        <Route path="/producto/:product_id" element={<ShowProduct />} />
        <Route path="/coleccion/:category_id" element={<CategoryProducts />} />
        <Route path="/busqueda/:search" element={<SearchProducts />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/bolsa" element={<Bag />} />
        {!token && <Route path="/recuperacion/:token" element={<RecoverPass />} />}
        {!token && <Route path="/registrar" element={<Register />} />}
        {!token && <Route path="/sesion" element={<Sesion />} />}
      </Routes>
      {!ocultarNav && <Footer />}
    </>
  );
}

export default RoutesApp;
