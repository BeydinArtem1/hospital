import React, { useState, useEffect } from 'react';
import {
  useHistory
} from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import Header from '../HeaderComponent/HeaderComponent';
import MainInput from '../MainInputComponent/MainInputComponent';
import Sort from '../SortComponent/SortComponent';
import Filter from '../FilterComponent/FilterComponent';
import Table from '../TableComponent/TableComponent';
import ModalDelete from '../ModalDeleteComponent/ModalDeleteComponent';
import ModalEdit from '../ModalEditComponent/ModalEditComponent';

const MainComponent = () => {
  const [row, setRow] = useState({})
  const [id, setId] = useState('');
  const [appointments, setAppointment] = useState([]);
  const [editOpen, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [filterButton, setButton] = useState(false);
  const [filter, setFilter] = useState([]);
  const [sortClass, setSortClass] = useState(false);

  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:8000/allAppointments', {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(res => {
      setAppointment([...res.data.data]);
      setFilter([...res.data.data]);
    });
  }, []);

  const handleLogout = () => {
    history.push('/');
    setAppointment([]);
    localStorage.removeItem('token');
  }

  const handleCancelFilterButton = () => {
    setFilter([...appointments]);
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
        setSortClass={setSortClass}
        sortClass={sortClass}
        appointments={appointments}
        setAppointment={setAppointment}
        setFilter={setFilter}
        filter={filter}
      />
      <Sort
        setSortClass={setSortClass}
        sortClass={sortClass}
        filter={filter}
        setAppointment={setFilter}
        filterButton={filterButton}
        setButton={setButton}
      />
      {
        filterButton && <Filter
          setButton={setButton}
          appointments={filter}
          setFilter={setFilter}
          sortClass={sortClass}
          onCancelFilterButton={handleCancelFilterButton}
        />
      }
      <Table
        filter={filter}
        setRow={setRow}
        setEdit={setEdit}
        setOpen={setOpen}
        setId={setId}
      />
      <ModalDelete
        open={open}
        setFilter={setFilter}
        setOpen={setOpen}
        id={id}
        setAppointment={setAppointment}
      />
      {editOpen && <ModalEdit
        row={row}
        setFilter={setFilter}
        editOpen={editOpen}
        setEdit={setEdit}
        setAppointment={setAppointment}
      />}
    </div>
  );
}

export default MainComponent;
