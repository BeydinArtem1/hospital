import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './MainInputComponent.scss';

const MainInputComponent = () => {
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
    }
  ];

  return (
    <div className='values-container'>
      <div>
        <p>Имя:</p>
        <TextField
          label='Имя'
          variant='outlined'
          type='text'
        />
      </div>
      <div>
        <p>Врач:</p>
        <Autocomplete
          className='autocomplete-input'
          disablePortal
          id='combo-box-demo'
          options={doctor}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params}
            label='Врач'
          />}
        />
      </div>
      <div>
        <p>Дата:</p>
        <TextField
          id='date'
          type='date'
          defaultValue=''
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <p>Жалобы:</p>
        <TextField
          label='Жалобы'
          variant='outlined'
          type='text'
        />
      </div>
      <Button
        className='add-button'
        variant='outlined'
      >
        Добавить
      </Button>
    </div>
  )
}

export default MainInputComponent