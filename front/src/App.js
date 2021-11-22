import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import Header from './components/HeaderComponent/HeaderComponent';
import MainInput from './components/MainInputComponent/MainInputComponent';
import Authorization from './components/AuthorizationComponent/AuthorizationComponent';
import Registration from './components/RegistrationComponent/RegistrationComponent';
import Table from './components/TableComponent/TableComponent';
import ModalDelete from './components/ModalDeleteComponent/ModalDeleteComponent';
import logo from './source/firstLogo.svg';
import './App.scss';

const App = () => {
  const [id, setId] = useState('');
  const [tasks, setTask] = useState([]);
  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/allTasks').then(res => {
      setTask(res.data.data);
    });
  }, []);

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
        <MainInput
          tasks={tasks}
          setTask={setTask}
        />
        <Table
          tasks={tasks}
          setOpen={setOpen}
          setId={setId}
        />
        <ModalDelete
          open={open}
          setOpen={setOpen}
          id={id}
          setTask={setTask}
        />
      </Route>
      <Redirect from='/' to='/signin' />
    </Switch>
  );
}

export default App;
