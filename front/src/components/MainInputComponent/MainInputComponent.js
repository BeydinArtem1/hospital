import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  Autocomplete
} from '@mui/material';
import ruLocale from 'date-fns/locale/ru';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import './MainInputComponent.scss';

const MainInputComponent = ({ appointments, setAppointment, setFilter, filter, setSortClass, sortClass }) => {
  const history = useHistory();
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
      label: 'Дударев Илья Александрович'
    }
  ];
  const localeMap = ruLocale;
  const maskMap = '__.__.____';
  const [value, setValue] = useState(doctor[0]);
  const [inputs, setInput] = useState({ name: '', date: moment().format('YYYY-MM-DD'), cause: '' });
  const [doc, setDoc] = useState('');
  const [className, setClassName] = useState(false);
  const { name, date, cause } = inputs;

  const saveAppointment = async () => {
    try {
      await axios.post('http://localhost:8000/saveAppointment', {
        name: name.trim(),
        doc,
        date,
        cause: cause.trim()
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(res => {
        appointments.push(res.data.data);
        setAppointment([...appointments]);
        filter.push(res.data.data);
        setFilter([...filter]);
        setInput({ name: '', date: moment().format('YYYY-MM-DD'), cause: '' });
        setClassName(false);
      });
    } catch {
      history.push('/');
    }
  }

  return (
    <div>
      <div className='phone-buttons'>
        <AddCircleIcon onClick={() => setClassName(!className)} />
        <FilterAltIcon onClick={() => setSortClass(!sortClass)} />
      </div>
      <div className={className ? 'phone-values' : 'values-container'}>
        <div className='inputs-container'>
          <p>Имя:</p>
          <TextField
            fullWidth
            variant='outlined'
            type='text'
            value={name}
            onChange={(e) => setInput({ ...inputs, name: e.target.value })}
          />
        </div>
        <div className='inputs-container'>
          <p>Врач:</p>
          <Autocomplete
            fullWidth
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
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </div>
        <div className='inputs-container'>
          <p>Дата:</p>
          <div className='date-adapter'>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={localeMap}
            >
              <DatePicker
                className='date-input'
                mask={maskMap}
                value={date}
                minDate={new Date("01-01-2021")}
                maxDate={new Date("12-31-2022")}
                onChange={(newValue) => setInput({ ...inputs, date: newValue })}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className='inputs-container'>
          <p>Жалобы:</p>
          <TextField
            fullWidth
            value={cause}
            variant='outlined'
            type='text'
            onChange={(e) => setInput({ ...inputs, cause: e.target.value })}
          />
        </div>
        <Button
          className='add-button'
          variant='outlined'
          disabled={(name.trim() && doc && date && cause.trim()) ? false : true}
          onClick={() => saveAppointment()}
        >
          Добавить
        </Button>
      </div>
    </div>
  )
}

export default MainInputComponent