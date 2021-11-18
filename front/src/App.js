import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from './components/HeaderComponent/HeaderComponent';
import MainInput from './components/MainInputComponent/MainInputComponent';
import Authorization from './components/AuthorizationComponent/AuthorizationComponent';
import Registration from './components/RegistrationComponent/RegistrationComponent';
import Button from '@mui/material/Button';
import logo from './source/firstLogo.svg';
import './App.scss';

const App = () => {
  const history = useHistory();
  return (
    <Switch>
      <Route path='/signin'>
        <Header header='Войти в систему' />
        <div className='main-container'>
          <img
            className='logo'
            src={logo} alt=''
          />
          <Authorization />
        </div>
      </Route>
      <Route path='/signup'>
        <Header header='Зарегистрироваться в системе' />
        <div className='main-container'>
          <img
            className='logo'
            src={logo} alt=''
          />
          <Registration />
        </div>
      </Route>
      <Route path='/main'>
        <Header header='Приемы'>
          <Button
            variant='outlined'
            onClick={() => history.push('/')}
          >
            Выход
          </Button>
        </Header>
        <MainInput />
      </Route>
      <Redirect from='/' to='/signin' />
    </Switch>
  );
}

export default App;
