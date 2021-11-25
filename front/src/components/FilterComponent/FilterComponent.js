import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './FilterComponent.scss';

const FilterComponent = ({ setButton, appointments, setFilter }) => {
  const [since, setSience] = useState('');
  const [by, setBy] = useState('');

  const filterDate = () => {
    if (since) {
      const FiltredArr = appointments.filter(item => item.date >= since);
      setFilter([...FiltredArr]);
    } else if (by) {
      const FiltredArr = appointments.filter(item => item.date <= by);
      setFilter([...FiltredArr]);
    }
    if (!since && !by) {
      setFilter([...appointments]);
    } else {
      const FiltredArr = appointments.filter(item => item.date >= since).filter(item => item.date <= by);
      setFilter([...FiltredArr]);
    }
  }

  const handleChangeFirstDate = (e) => {
    setSience(e.target.value);
  }

  const handleChangeSecondDate = (e) => {
    setBy(e.target.value);
  }

  const handleCansel = () => {
    setFilter([...appointments]);
    setButton(false);
  }

  return (
    <div className='filter-selector'>
      <div className='date-selector'>
        <p>C:</p>
        <TextField
          fullWidth
          className='date-input'
          id='date'
          type='date'
          defaultValue=''
          onChange={(e) => handleChangeFirstDate(e)}
          InputLabelProps={{ shrink: true, }}
        />
      </div>
      <div className='date-selector'>
        <p>По:</p>
        <TextField
          fullWidth
          className='date-input'
          id='date'
          type='date'
          defaultValue=''
          onChange={(e) => handleChangeSecondDate(e)}
          InputLabelProps={{ shrink: true, }}
        />
      </div>
      <div className='filter-button-container'>
        <Button
          className='filter'
          variant="outlined"
          onClick={() => filterDate()}
        >
          Фильтровать
        </Button>
        <DeleteOutlineIcon
          onClick={() => handleCansel()}
          className='delete-filter-icon'
        />
      </div>
    </div>
  )
}

export default FilterComponent