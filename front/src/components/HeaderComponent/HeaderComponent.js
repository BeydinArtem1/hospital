import React from 'react';
import logo from '../../source/Vector.svg'
import './HeaderComponent.scss';

const HeaderComponent = ({ header, children }) => {
  return (
    <div className="header">
      <div className='header-container'>
        <img src={logo} alt='' />
        <p>{header}</p>
      </div>
      <div className='children'>
        {children}
      </div>
    </div>
  );
}

export default HeaderComponent