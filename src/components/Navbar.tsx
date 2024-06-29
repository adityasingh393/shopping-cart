import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

  return (
    <nav className='navbar'>
      <Link to={isCartPage ? '/' : '/cart'}>
        {isCartPage ? 'Go to Products' : 'Go to Cart'}
      </Link>
    </nav>
  );
};

export default Navbar;
