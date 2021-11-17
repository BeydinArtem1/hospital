import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './AuthorizationComponent.scss';

const AuthorizationComponent = () => {
  return (
    <div className='container'>
      <h1>Войти в систему</h1>
      <div className='input-conainer'>
        <p className="label">Login:</p>
        <TextField
          id='outlined-basic'
          label='Login'
          variant='outlined'
          type='text'
        />
        <p className="label">Password:</p>
        <TextField
          id='outlined-basic'
          label='Password'
          variant='outlined'
          type='password'
        />
      </div>
      <div className='sign-val'>
        <Button
          variant='outlined'
        >
          Войти
        </Button>
        <Link
          to='/signup'
          className='label'
        >
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}

export default AuthorizationComponent