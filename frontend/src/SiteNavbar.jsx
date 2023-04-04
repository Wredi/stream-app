import { NavLink } from 'react-router-dom';
import './SiteNavbar.css'
import {logout} from './utils.js';
import Logo from './Logo';

function SiteNavbar(props) {
  async function logoutCos() {
    await logout();
    window.location.href = '/';
  }

  return (
    <nav className='navbar'>
      <div className='navbar-inner'>
        <div className='navbar-inner-left'>
          <NavLink to="/"><Logo/></NavLink>
        </div>
        <div className='navbar-inner-right'>
          <NavLink className={'init-stream'} to="/stream-init">Inicjalizuj stream</NavLink>
          {props.isLogged ? <NavLink onClick={logoutCos}>Wyloguj się</NavLink> : <NavLink to="/login">Zaloguj się</NavLink>}
        </div>
      </div>
    </nav>
  );
}

export default SiteNavbar;