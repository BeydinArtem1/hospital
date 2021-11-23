import React, { useState, useEffect } from 'react';
import {
  useHistory
} from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import Header from '../HeaderComponent/HeaderComponent';
import MainInput from '../MainInputComponent/MainInputComponent';
import Table from '../TableComponent/TableComponent';
import ModalDelete from '../ModalDeleteComponent/ModalDeleteComponent';
import ModalEdit from '../ModalEditComponent/ModalEditComponent';

const MainComponent = () => {
  const [row, setRow] = useState({})
  const [id, setId] = useState('');
  const [appointments, setAppointment] = useState([]);
  const [editOpen, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:8000/allAppointments', {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(res => {
      setAppointment(res.data.data);
    });
  }, []);

  const handleLogout = () => {
    history.push('/');
    setAppointment([]);
    localStorage.removeItem('token');
  }

  return (
    <div>
      <Header header='Приемы'>
        <Button
          variant='outlined'
          onClick={() => handleLogout()}
        >
          Выход
        </Button>
      </Header>
      <MainInput
        appointments={appointments}
        setAppointment={setAppointment}
      />
      <Table
        appointments={appointments}
        setRow={setRow}
        setEdit={setEdit}
        setOpen={setOpen}
        setId={setId}
      />
      <ModalDelete
        open={open}
        setOpen={setOpen}
        id={id}
        setAppointment={setAppointment}
      />
      {editOpen && <ModalEdit
        row={row}
        editOpen={editOpen}
        setEdit={setEdit}
        setAppointment={setAppointment}
      />}
    </div>
  );
}

export default MainComponent;
