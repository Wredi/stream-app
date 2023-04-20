import { Outlet } from 'react-router';
import { NavLink } from "react-router-dom";
import '../css/UserPanel.css';
import {logout} from '../utils.js';

async function logoutUser(){
  await logout();
  window.location.href = '/';
}

export default function UserPanel() {
  return (
  <div className='user-panel-outer'>
    <h1>Ustawienia</h1>
    <div className='user-panel'>
        <nav className='user-panel__nav' aria-label='user settings'>
            <ul className='user-panel__nav-menu'>
                <li className='user-panel__nav-menu-item'><NavLink className={'user-panel__nav-menu-item-link'} to="channel">Zmień dane profilowe</NavLink></li>
                <li className='user-panel__nav-menu-item'><NavLink className={'user-panel__nav-menu-item-link'} to="stream">Inicjalizuj stream</NavLink></li>
                <li className='user-panel__nav-menu-item'><NavLink className={'user-panel__nav-menu-item-link user-panel__nav-menu-item-link--color-red'} to="/" onClick={logoutUser}>Wyloguj się</NavLink></li>
            </ul>
        </nav>
        <div className='user-panel__content'>
            <Outlet/>
            {/* <h1>Witaj!</h1>
            <p>ustawienia:</p>
            <span>lol</span>
            <label>
                Podaj dane:
                <input type="text" />
            </label> */}
        </div>
    </div>
  </div>
  );
}