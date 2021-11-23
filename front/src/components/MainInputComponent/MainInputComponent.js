import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './MainInputComponent.scss';

const MainInputComponent = ({ tasks, setTask }) => {
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

  const saveTask = async () => {
    await axios.post('http://localhost:8000/saveTask', {
      name,
      doc,
      date,
      cause
    }).then(res => {
      tasks.push(res.data.data);
      setTask([...tasks]);
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
        onClick={() => saveTask()}
      >
        Добавить
      </Button>
    </div>
  )
}

export default MainInputComponent