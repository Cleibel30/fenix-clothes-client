import '../styles/nav.css';
import { Search } from '../components/Search';
import { useDolar } from '../services/useDolar';
import { useEffect, useRef, useState } from 'react';
import { useCateogories } from '../services/useCateogories';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Notifications } from '../components/Notifications';
import busqueda from "../assets/icons/busqueda.svg"
import bag from "../assets/icons/bag.svg"
import user from "../assets/icons/user.svg"
import { Bag } from '../components/Bag'
import { useFunctionEffects } from '../hooks/useFunctionEffects'
import { GoogleUser } from '../components/GoogleUser';
import { useBag } from '../services/useBag';



export const Nav = () => {
  const token = localStorage.getItem('token');
  const { getBagAll } = useBag()
  const location = useLocation();
  const { getCategoriesAll } = useCateogories();
  const [responseApi, setresponseApi] = useState(undefined);
  const [dolar, setdolar] = useState(undefined)
  const [responseBag, setresponseBag] = useState(undefined)
  const { getDolar } = useDolar()


  const menuRef = useRef(null);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBag = () => {
    bagEfect()
    getBagAll(setresponseBag)
  }

  const changeCategories = (e) => {
    const value = e.target.value;
    if (value) {
      window.location.href = value;
    }
  }

  useEffect(() => {
    getDolar(setdolar)
    getCategoriesAll(setresponseApi);
  }, [])



  const { bagEfect, searchEfect, showDesple, showProfile, showMenu, closedCont, activeShadow } = useFunctionEffects()


  return (

    <>
      <header className="header">
        <nav className="nav ">
          <button onClick={showMenu} className='button text-light btn-menu'><i class="fa-solid fa-bars"></i></button>
          <ul className="logo-cont d-flex align-items-center p-0 h-100">
            <li><NavLink to="/" className="logo text-decoration-none">Fenix Clothes</NavLink></li>
          </ul>

          <ul className="menu-nav d-flex align-items-center p-0 h-100 gap-3">

            <li className='relative'>
              <NavLink className="item-link  text-decoration-none item-desple" onClick={showDesple}>COLECCIONES</NavLink>
              <ul className='desple-nav bg-light p-2'>
                {responseApi && responseApi.success && (
                  responseApi.data.map(item => (
                    <li>
                      <NavLink to={`coleccion/${item.category_id}`} className="d-block p-2 item item-border special text-decoration-none text-dark">{item.title} </NavLink>
                    </li>
                  ))
                )}

              </ul>
            </li>
            <li>
              <NavLink to="/productos" className="item-link pt-5  text-decoration-none">PRODUCTOS</NavLink>
            </li>
            <li>
              <NavLink to="/favoritos" className="item-link  text-decoration-none">FAVORITOS</NavLink>
            </li>
          </ul>


          <ul className="d-flex align-items-center p-0 h-100 gap-3">
            <li>
              <button className='btn-icon'><img src={busqueda} onClick={searchEfect} alt="" /></button>
            </li>

            {token && (
              <>
                <li><Notifications /></li>
                <li>
                  <button className='btn-icon'><img src={bag} onClick={getBag} alt="" /></button>
                </li>
                <li>
                  <button className='btn-icon relative'><img src={user} alt="" onClick={showProfile} /></button>
                  <ul className='desple-nav-profile bg-light p-2'>
                    <li>
                      <button
                        onClick={() => {
                          localStorage.removeItem('token');
                          window.location.href = '/cerrar-sesion';
                        }}
                        className="d-block p-2  item special text-decoration-none text-dark button">Cerrar Sesión <i class="fs-5 ms-2 fa-solid fa-door-open"></i></button>
                    </li>
                  </ul>
                </li>
              </>
            )}
            {!token && (
              <>
                <li className='position-absolute top-100 end-0 me-2 mt-2 bg-dark p-2 rounded shadow-sm'>
                  <GoogleUser />
                </li>
              </>
            )}


          </ul>
        </nav>
      </header>
      <Search></Search>
      <Bag responseApi={responseBag}></Bag>
      {activeShadow && <div className="shadow-cont" onClick={closedCont}></div>}

    </>
  )
}
