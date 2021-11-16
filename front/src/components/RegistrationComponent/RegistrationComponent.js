import React from "react";
import { Link } from 'react-router-dom';
import './RegistrationComponent.scss'

const RegistrationComponent = () => {
  return (<div className='container'>
    <h1>Регистрация</h1>
    <div className='inputConainer'>
      <p className="label">Login:</p>
      <input type='text' placeholder='Login' />
      <p className="label">Password:</p>
      <input type='password' placeholder='Password' />
      <p className="label">Repeat password:</p>
      <input type='password' placeholder='Password' />
    </div>
    <div className='signVal'>
      <button>Зарегистрироваться</button>
      <Link to='/signin'><p className='label'>Авторизоваться</p></Link>
    </div>

  </div>)
}

export default RegistrationComponent