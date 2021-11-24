import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import './SortComponent.scss';

const SortComponent = ({ appointments, setAppointment }) => {
  const [section, setSection] = useState('');
  const [vector, setVector] = useState('ascending');
  const direction = [
    {
      key: 'ascending',
      label: 'По возрастанию'
    },
    {
      key: 'descending',
      label: 'По убыванию'
    }
  ];
  const selectors = [
    {
      key: 'name',
      label: 'Имя'
    },
    {
      key: 'doc',
      label: 'Врач'
    },
    {
      key: 'date',
      label: 'Дата'
    },
    {
      key: 'none',
      label: 'none'
    }
  ];

  const sortAppointment = (field, dir) => {
    if (field === 'none') field = '_id';
    appointments.sort((a, b) => a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0);
    if (dir === 'descending') appointments.reverse();
    setAppointment([...appointments]);
  }

  const handleSortValue = (e) => {
    setVector(e);
    sortAppointment(section, e);
  }

  const handleField = (e) => {
    setSection(e);
    sortAppointment(e, vector);
  }

  return (
    <div className='sort-container'>
      <div className='sort-by'>
        <p>Сортировать по:</p>
        <FormControl
          fullWidth
          className='sort-form'
        >
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={section}
            onChange={(e) => handleField(e.target.value)}
          >
            {
              selectors.map((value, index) =>
                <MenuItem
                  key={`selector-${index}`}
                  value={value.key}
                >
                  {value.label}
                </MenuItem>
              )
            }
          </Select>
        </FormControl>
      </div>
      {
        section && (section !== 'none') && <div className='sort-direction'>
          <p>Направление:</p>
          <FormControl
            fullWidth
            className='vector'
          >
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={vector}
              onChange={(e) => handleSortValue(e.target.value)}
            >
              {
                direction.map((value, index) =>
                  <MenuItem
                    key={`direction-${index}`}
                    value={value.key}
                  >
                    {value.label}
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
        </div>
      }
    </div>
  )
}

export default SortComponent