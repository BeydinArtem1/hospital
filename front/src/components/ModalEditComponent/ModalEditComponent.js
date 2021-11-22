import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  List,
  ListItem,
  TextField,
  Autocomplete
} from '@mui/material';
import './ModalEditComponent.scss';

const ModalEditComponent = ({ editOpen, setEdit, task, setTask }) => {
  const { name, date, cause, _id } = task;
  console.log(task);
  const [nameVal, setName] = useState(name);
  const [causeVal, setCause] = useState(cause);
  const [dateVal, setDate] = useState(date);
  const [doc, setDoc] = useState('');
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


  const saveTask = async () => {
    await axios.patch('http://localhost:8000/updateTask', {
      _id,
      name: nameVal,
      doc,
      date: dateVal,
      cause: causeVal
    }).then(res => {
      setTask(res.data.data);
    });
  }

  return (
    <Dialog
      className='main-edit-container'
      onClose={() => setEdit(false)}
      open={editOpen}>
      <List
        className='modal-edit'
        sx={{ pt: 0 }}>
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
              value={nameVal}
              onChange={(e) => {
                setName(e.target.value);
                }
              }
            />
          </div>
          <div className='edit-input-container'>
            <p>Врач:</p>
            <Autocomplete
              fullWidth
              className='autocomplete-input'
              disablePortal
              id="controllable-states-demo"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                }
              }
              options={doctor}
              inputValue={doc}
              onInputChange={(event, newInputValue) => {
                setDoc(newInputValue);
                }
              }
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className='edit-input-container'>
            <p>Дата:</p>
            <TextField
              fullWidth
              className='date-input'
              id='date'
              type='date'
              defaultValue={date}
              onChange={(e) => setDate(e.target.value)}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
                }
              }
            />
          </div>
          <div className='edit-input-container'>
            <p>Жалобы:</p>
            <TextField
              fullWidth
              value={causeVal}
              variant='outlined'
              type='text'
              onChange={(e) => {
                setCause(e.target.value);
                }
              }
            />
          </div>
        </ListItem>
        <ListItem className='modal-button' >
          <Button
            className='cansel'
            variant="outlined"
            onClick={() => setEdit(false)}
          >
            Cancel
          </Button>
          <Button
            className='save'
            variant="outlined"
            onClick={() => {
              saveTask();
              setEdit(false);
              }
            }
          >
            Save
          </Button>
        </ListItem>
      </List>
    </Dialog>
  )
}

export default ModalEditComponent
