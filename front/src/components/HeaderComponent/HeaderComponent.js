import React from "react";
import logo from '../../source/Vector.svg'
import './HeaderComponent.scss';

const HeaderComponent = ({header}) => {
  return (<div className="header">
    <img src={logo} alt='' />
    <p>{header}</p>
  </div>)
}

export default HeaderComponent