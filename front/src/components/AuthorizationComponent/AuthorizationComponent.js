import React from "react";
import { Link } from 'react-router-dom';
import './AuthorizationComponent.scss'

const AuthorizationComponent = () => {
  return (<div className='container'>
    <h1>Войти в систему</h1>
    <div className='inputConainer'>
      <p className="label">Login:</p>
      <input type='text' placeholder='Login' />
      <p className="label">Password:</p>
      <input type='password' placeholder='Password' />
    </div>
    <div className='signVal'>
      <button>Войти</button>
      <Link to='/signup'><p className='label'>Зарегистрироваться</p></Link>
    </div>

  </div>)
}

export default AuthorizationComponent