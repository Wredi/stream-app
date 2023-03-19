import { NavLink,  } from 'react-router-dom';
import './SiteNavbar.css'

function SiteNavbar(props) {
  return (
    <nav className='navbar'>
      <div className='navbar-inner'>
        <div className='navbar-inner-left'>
          <NavLink to="/">LOGO</NavLink>
        </div>
        <div className='navbar-inner-right'>
          <NavLink className={'init-stream'} to="/stream-init">Inicjalizuj stream</NavLink>
          {props.isLogged ? <NavLink reloadDocument to='/logout'>Wyloguj się</NavLink> : <NavLink to="/login">Zaloguj się</NavLink>}
        </div>
      </div>
    </nav>
  );
}

export default SiteNavbar;