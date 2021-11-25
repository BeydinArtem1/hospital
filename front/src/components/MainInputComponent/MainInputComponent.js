import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Autocomplete
}from '@mui/material';
import './MainInputComponent.scss';

const MainInputComponent = ({ appointments, setAppointment }) => {
  const doctor = [
    {
      label: 'Иванов Иван Иванович'
    },
    {
      label: 'Петров Петр Николаевич'
    },
    {
      label: 'Ленин Владимир Ильич'
    },
    {
      label: 'Сидоров Николай Петрович'
    },
    {
      label: 'Пупкин Василий Анатольевич'
    },
    {
      label: 'Дудаев Илья Александрович'
    }
  ];

  const [value, setValue] = useState(doctor[0]);
  const [inputs, setInput] = useState({ name: '', date: '', cause: '' })
  const [doc, setDoc] = useState('');
  const { name, date, cause } = inputs;

  const saveAppointment = async () => {
    await axios.post('http://localhost:8000/saveAppointment', {
      name,
      doc,
      date,
      cause
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(res => {
      appointments.push(res.data.data);
      setAppointment([...appointments]);
      setInput({ name: '', date: '', cause: '' });
    });
  }

  return (
    <div className='values-container'>
      <div>
        <p>Имя:</p>
        <TextField
          variant='outlined'
          type='text'
          value={name}
          onChange={(e) => setInput({ ...inputs, name: e.target.value })}
        />
      </div>
      <div>
        <p>Врач:</p>
        <Autocomplete
          className='autocomplete-input'
          disablePortal
          id="controllable-states-demo"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          options={doctor}
          inputValue={doc}
          onInputChange={(event, newInputValue) => {
            setDoc(newInputValue);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div>
        <p>Дата:</p>
        <TextField
          id='date'
          type='date'
          defaultValue={date}
          onChange={(e) => setInput({ ...inputs, date: e.target.value })}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <p>Жалобы:</p>
        <TextField
          value={cause}
          variant='outlined'
          type='text'
          onChange={(e) => setInput({ ...inputs, cause: e.target.value })}
        />
      </div>
      <Button
        className='add-button'
        variant='outlined'
        disabled={(name && doc && date && cause) ? false : true}
        onClick={() => saveAppointment()}
      >
        Добавить
      </Button>
    </div>
  )
}

export default MainInputComponent