import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import {
  Snackbar,
  Button,
  TextField
} from '@mui/material';
import './RegistrationComponent.scss';

const RegistrationComponent = () => {
  const history = useHistory();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeat] = useState('');
  const [snack, setSnack] = useState({ open: false, alert: '' });

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

  const addNewUser = async () => {
    if (validationLogin()) {
      if (validationPass()) {
        if (password === repeatPass) {
          try {
            await axios.post('http://localhost:8000/createUser', {
              login,
              password
            }).then(res => {
              localStorage.setItem('token', res.data.token);
              history.push('/main');
            });
          } catch {
            setSnack({ open: true, alert: 'this user already exists' });
          }
        } else setSnack({ open: true, alert: 'Passwords art different' });
      } else setSnack({ open: true, alert: 'password should contain at least 6 letters and at least 1 symvol' });
    } else setSnack({ open: true, alert: 'login should contain at least 6 letters' });
  }
  const { open, alert } = snack;

  return (
    <div className='container'>
      <h1>Регистрация</h1>
      <div className='input-conainer'>
        <p className='label'>Login:</p>
        <TextField
          fullWidth
          id='outlined-basic'
          variant='outlined'
          type='text'
          onChange={(e) => setLogin(e.target.value)} />
        <p className='label'>Password:</p>
        <TextField
          fullWidth
          id='outlined-basic'
          variant='outlined'
          type='password'
          onChange={(e) => setPassword(e.target.value)} />
        <p className='label'>Repeat password:</p>
        <TextField
          fullWidth
          id='outlined-basic'
          variant='outlined'
          type='password'
          onChange={(e) => setRepeat(e.target.value)} />
      </div>
      <div className='sign-val'>
        <Button
          variant='outlined'
          onClick={() => addNewUser()}
        >
          Зарегистрироваться
        </Button>
        <Link
          to='/signin'
          className='label'
        >
          Авторизоваться
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

export default RegistrationComponent;