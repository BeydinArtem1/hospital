import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Snackbar,
  TextField
} from '@mui/material';
import './AuthorizationComponent.scss';

const AuthorizationComponent = () => {
  const history = useHistory();
  const [snack, setSnack] = useState({ open: false, alert: '' });
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const validationLogin = () => {
    const regLogin = /^[A-Za-z0-9]{6,}$/;
    const flag = regLogin.test(login);
    return flag;
  }

  const validationPass = () => {
    const regPass = /^[A-Za-z0-9]{5,}\d{1,}$/;
    const flag = regPass.test(password);
    return flag;
  }

  const signIn = async () => {
    if (validationLogin()) {
      if (validationPass()) {
        try {
          await axios.post('http://localhost:8000/authorize', {
            login,
            password
          }).then(res => {
            localStorage.setItem('token', res.data);
            history.push('/main');
          });
        } catch {
          setSnack({ open: true, alert: 'invalid login or password' });
        }
      } else setSnack({ open: true, alert: 'invalid password' });
    } else setSnack({ open: true, alert: 'invalid login' });
  }

  const { open, alert } = snack;
  return (
    <div className='container'>
      <h1>Войти в систему</h1>
      <div className='input-conainer'>
        <p className="label">Login:</p>
        <TextField
          fullWidth
          variant='outlined'
          type='text'
          onChange={(e) => setLogin(e.target.value)}
        />
        <p className="label">Password:</p>
        <TextField
          fullWidth
          variant='outlined'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='sign-val'>
        <Button
          onClick={() => signIn()}
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
      <Snackbar
        onClose={() => setSnack({ open: false })}
        open={open}
        autoHideDuration={1500}
        message={alert}
      />
    </div>
  );
}

export default AuthorizationComponent