import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
              setLogin('');
              setPassword('');
              setRepeat('');
              history.push('/main');
            });
          } catch {
            setSnack({ open: true, alert: 'this user already exists' });
          }
        } else setSnack({ open: true, alert: 'Passwords art different' });
      } else setSnack({ open: true, alert: 'Password is invalid' });
    } else setSnack({ open: true, alert: 'invalid login' });
  }
  const { open, alert } = snack;

  return (
    <div className='container'>
      <h1>Регистрация</h1>
      <div className='input-conainer'>
        <p className='label'>Login:</p>
        <TextField
          id='outlined-basic'
          label='Login'
          variant='outlined'
          type='text'          
          onChange={(e) => setLogin(e.target.value)} />
        <p className='label'>Password:</p>
        <TextField
          id='outlined-basic'
          label='Password'
          variant='outlined'
          type='password'          
          onChange={(e) => setPassword(e.target.value)} />
        <p className='label'>Repeat password:</p>
        <TextField
          id='outlined-basic'
          label='Password'
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