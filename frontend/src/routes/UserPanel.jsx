import { Outlet } from 'react-router';
import { NavLink } from "react-router-dom";
import '../css/UserPanel.css';

export default function UserPanel() {
  return (
    <div className='user-panel'>
        <nav className='user-panel__nav' aria-label='user settings'>
            <ul className='user-panel__nav-menu'>
                <li className='user-panel__nav-menu-item'><NavLink className={'user-panel__nav-menu-item-link'} to="/user-data">Zmień dane profilowe</NavLink></li>
                <li className='user-panel__nav-menu-item'><NavLink className={'user-panel__nav-menu-item-link'} to="/stream-data">Inicjalizuj stream</NavLink></li>
                <li className='user-panel__nav-menu-item user-panel__nav-menu-item--pos-bottom'><NavLink className={'user-panel__nav-menu-item-link'} to="/logout" onClick={() => console.log("logouting...")}>Wyloguj się</NavLink></li>
            </ul>
        </nav>
        <div className='user-panel__content'>
            <Outlet/>
        </div>
    </div>
  );
}