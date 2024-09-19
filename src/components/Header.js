import React from 'react';
import './Header.css';

import logo from '../assets/NinjaOneLogo.SVG';

function Header() {
  return (
    <header>
        <div className="global-header padding-1-flat">
            <img src={logo} alt="logo" className='logo padding-1'></img>
        </div>
    </header>
  );
}

export default Header;
