import React, { useState } from 'react';
//import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
//import './Navbar.css';


function Navbar() {
  const [click, setClick] = useState(false);
 

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

 
  return (
    <>
      <nav className='navbar' role='navigation' data-testid='nav'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          QA REAL ESTATE
          <i class='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/property' className='nav-links' onClick={closeMobileMenu}>
              Properties
            </Link>
          </li>
         
          <li className='nav-item'>
            <Link
              to='/seller'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Sellers
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/buyer'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Buyers
            </Link>
          </li>
          
        </ul>
        
      </nav>
    </>
  );
}

export default Navbar;