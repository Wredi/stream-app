import { NavLink } from 'react-router-dom';
import '../css/SiteNavbar.css'
import Logo from './Logo';
import { FaUserAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

function SiteNavbar(props) {
  return (
    <nav className='navbar'>
      <div className='navbar-inner'>
        <div className='navbar-inner-left'>
          <NavLink to="/"><Logo/></NavLink>
        </div>
        <div className='navbar-inner-right'>
          {props.isLogged ? 
          <>
            <NavLink className={'init-stream'} to="/stream-init">Inicjalizuj stream</NavLink>
            <NavLink to="/user-data">
              <IconContext.Provider value={{ className: "shared-class", size: 20 }}>
                    <FaUserAlt/>
              </IconContext.Provider>
            </NavLink>
          </>
           : <NavLink to="/login">Zaloguj się</NavLink>}
        </div>
      </div>
    </nav>
  );
}

export default SiteNavbar;