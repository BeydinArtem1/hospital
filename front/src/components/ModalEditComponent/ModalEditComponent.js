import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Button,
  Dialog,
  List,
  Snackbar,
  ListItem,
  TextField,
  Autocomplete
} from '@mui/material';
import ruLocale from 'date-fns/locale/ru';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import './ModalEditComponent.scss';

const ModalEditComponent = ({ editOpen, setEdit, row, setAppointment, setFilter }) => {
  const { name, date, cause, _id } = row;
  const [inputs, setInputs] = useState({ inputName: name, inputDate: date, inputCause: cause });
  const { inputName, inputDate, inputCause } = inputs;
  const [doc, setDoc] = useState('');
  const [snack, setSnack] = useState({ open: false, alert: '' });
  const history = useHistory();
  const localeMap = ruLocale;
  const maskMap = '__.__.____';
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

  const [value, setValue] = useState(doctor[0]);

  const handleClick = () => {
    saveAppointment();
    setEdit(false);
  }

  const saveAppointment = async () => {
    if (inputName.trim() && inputCause.trim() && doc.trim()) {
      try {
        await axios.patch('http://localhost:8000/updateAppointment', {
          _id,
          name: inputName.trim(),
          doc,
          date: inputDate,
          cause: inputCause.trim()
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(res => {
          setAppointment(res.data.data);
          setFilter(res.data.data);
        });
      } catch {
        history.push('/');
      }
    } else setSnack({ open: true, alert: 'please fill all fields correctly' });
  }

  const { open, alert } = snack;
  return (
    <Dialog
      className='main-edit-container'
      onClose={() => setEdit(false)}
      open={editOpen}>
      <List
        className='modal-edit'>
        <ListItem
          className='modal-header'
        >
          <h1>
            Изменить прием
          </h1>
        </ListItem>
        <ListItem className='input-edit'>
          <div className='edit-input-container'>
            <p>Имя:</p>
            <TextField
              fullWidth
              variant='outlined'
              type='text'
              value={inputName}
              onChange={(e) => setInputs({ ...inputs, inputName: e.target.value })}
            />
          </div>
          <div className='edit-input-container'>
            <p>Врач:</p>
            <Autocomplete
              fullWidth
              className='autocomplete-input'
              disablePortal
              id='controllable-states-demo'
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
              options={doctor}
              inputValue={doc}
              onInputChange={(event, newInputValue) => setDoc(newInputValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className='edit-input-container'>
            <p>Дата:</p>
            <div className='date-adapter'>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={localeMap}
              >
                <DatePicker
                  className='date-input'
                  mask={maskMap}
                  value={inputDate}
                  minDate={new Date('01-01-2021')}
                  maxDate={new Date('12-31-2022')}
                  onChange={(newValue) => setInputs({ ...inputs, inputDate: newValue })}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className='edit-input-container'>
            <p>Жалобы:</p>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={inputCause}
              variant='outlined'
              type='text'
              onChange={(e) => setInputs({ ...inputs, inputCause: e.target.value })}
            />
          </div>
        </ListItem>
        <ListItem className='modal-button' >
          <Button
            className='cansel'
            variant='outlined'
            onClick={() => setEdit(false)}
          >
            Cancel
          </Button>
          <Button
            className='save'
            variant='outlined'
            onClick={() => handleClick()}
          >
            Save
          </Button>
        </ListItem>
      </List>
      <Snackbar
        onClose={() => setSnack({ open: false })}
        open={open}
        autoHideDuration={1500}
        message={alert}
      />
    </Dialog>
  )
}

export default ModalEditComponent
