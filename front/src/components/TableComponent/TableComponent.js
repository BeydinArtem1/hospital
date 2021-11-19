import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './TableComponent.scss';

const TableComponent = ({ tasks }) => {
  return (
    <div className='table-container'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell align="center">Врач</TableCell>
              <TableCell align="center">Дата</TableCell>
              <TableCell align="center">Жалобы</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row) => (
              <TableRow
                key={row.name}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.doc}</TableCell>
                <TableCell align="center">{row.date.split('-').reverse().join('.')}</TableCell>
                <TableCell align="center">{row.cause}</TableCell>
                <TableCell align="center">
                  <EditIcon />
                  <DeleteForeverIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableComponent