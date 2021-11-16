import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/HeaderComponent/HeaderComponent';
import Authorization from './components/AuthorizationComponent/AuthorizationComponent';
import Registration from './components/RegistrationComponent/RegistrationComponent';
import logo from './source/firstLogo.svg';
import './App.scss';

const App = () => {
  return (<Switch>
    <Route path='/signin'>
    <Header header='Войти в систему' />
   <div className='main'>
   <img className='logo' src={logo} alt=''/>
    <Authorization />
   </div>
    </Route>
    <Route path='/signup'>
    <Header header='Зарегистрироваться в системе' />  
    <img className='logo' src={logo} alt=''/>
    <Registration />
    </Route>
    <Redirect from='/' to='/signin' />
  </Switch>   
 );
}

export default App;
