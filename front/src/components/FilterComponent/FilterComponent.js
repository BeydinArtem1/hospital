import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ruLocale from 'date-fns/locale/ru';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment';
import './FilterComponent.scss';

const FilterComponent = ({ setButton, appointments, setFilter, onCancelFilterButton, sortClass }) => {
  const [since, setSience] = useState('');
  const [by, setBy] = useState('');
  const localeMap = ruLocale;
  const maskMap = '__.__.____';

  const filterDate = () => {
    if (!since && !by) return setFilter([...appointments]);
    let filtredArr = [...appointments];
    if (since) filtredArr = filtredArr.filter(item => item.date >= moment(since).format('YYYY-MM-DD'));
    if (by) filtredArr = filtredArr.filter(item => item.date <= moment(by).format('YYYY-MM-DD'));
    if (sortClass) setButton(false);
    return setFilter([...filtredArr]);    
  }

  const handleChangeFirstDate = (e) => {
    setSience(e);
  }

  const handleChangeSecondDate = (e) => {
    setBy(e);
  }

  const handleCansel = () => {
    onCancelFilterButton();
    setButton(false);
  }

  return (
    <div className='filter-selector'>
      <div className='date-selector'>
        <p>C:</p>
        <div className='date-adapter'>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            locale={localeMap}
          >
            <DatePicker
              className='date-input'
              mask={maskMap}
              value={since}
              minDate={new Date("01-01-2021")}
              maxDate={new Date("12-31-2022")}
              onChange={(newValue) => handleChangeFirstDate(newValue)}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className='date-selector'>
        <p>По:</p>
        <div className='date-adapter'>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            locale={localeMap}
          >
            <DatePicker
              className='date-input'
              mask={maskMap}
              value={by}
              minDate={new Date("01-01-2021")}
              maxDate={new Date("12-31-2022")}
              onChange={(newValue) => handleChangeSecondDate(newValue)}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className='filter-button-container'>
        <Button
          className='filter-submit'
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