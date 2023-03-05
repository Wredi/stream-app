import './SiteNavbar.css'

function SiteNavbar() {
  return (
    <nav className='navbar'>
      <div className='navbar-inner'>
        <div className='navbar-inner-left'>
          <span>LOGO</span>
        </div>
        <div className='navbar-inner-right'>
          <a href="#" className='init-stream'>Inicjalizuj stream</a>
          <a href="#">Zaloguj sie</a>
        </div>
      </div>
    </nav>
  );
}

export default SiteNavbar;