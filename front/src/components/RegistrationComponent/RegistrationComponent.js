import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './RegistrationComponent.scss';

const RegistrationComponent = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeat] = useState('');
  const [open, setOpen] = useState(false);
  const [alertText, setAlert] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const validationLogin = () => {
    let flag = false;
    const regLogin = /^[A-Za-z0-9]{6,}$/;
    flag = regLogin.test(login);
    return flag;
  }

  const validationPass = () => {
    let flag = false;
    const regPass = /^[A-Za-z0-9]{5,}\d{1,}$/;
    flag = regPass.test(password);
    return flag;
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const addNewUser = async () => {
    if (validationLogin()) {
      if (validationPass()) {
        if (password === repeatPass) {
          await axios.post('http://localhost:8000/createUser', {
            login,
            password
          }).then(res => {
            setLogin(''.trim());
            setPassword(''.trim());
            setRepeat(''.trim());
          });
        } else {
          setAlert('passwords are different. Please try again');
          setOpen(true);          
          setRepeat(''.trim());
        }
      } else
        setAlert('Password is invalid');
        setOpen(true);
    } else {
      setAlert('invalid login');
      setOpen(true);
    }
  }

  return (<div className='container'>
    <h1>Регистрация</h1>
    <div className='inputConainer'>
      <p className="label">Login:</p>
      <input type='text' placeholder='Login' onChange={(e) => setLogin(e.target.value)} />
      <p className="label">Password:</p>
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      <p className="label">Repeat password:</p>
      <input type='password' placeholder='Password' onChange={(e) => setRepeat(e.target.value)} />
    </div>
    <div className='signVal'>
      <button onClick={() => addNewUser()}>Зарегистрироваться</button>
      <Link to='/signin'><p className='label'>Авторизоваться</p></Link>
    </div>
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
      message={alertText}
      action={action}
    />
  </div>)
}

export default RegistrationComponent;