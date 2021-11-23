import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './TableComponent.scss';

const TableComponent = ({ appointments, setOpen, setId, setEdit, setRow }) => {
  const cells = ['Врач', 'Дата', 'Жалобы', ''];

  const handleEditButtonClick = (row) => {
    setRow(row);
    setEdit(true);
  }

  const handleDelete = (id) => {
    setId(id);
    setOpen(true)
  }

  return (
    <div className='table-container'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              {
                cells.map((value, index) => <TableCell
                  key={`row-${index}`}
                  align="center"
                >
                  {value}
                </TableCell>
                )
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((row) => (
              <TableRow
                key={row._id}
              >
                <TableCell
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.doc}</TableCell>
                <TableCell align="center">{row.date.split('-').reverse().join('.')}</TableCell>
                <TableCell align="center">{row.cause}</TableCell>
                <TableCell align="center">
                  <EditIcon onClick={() => handleEditButtonClick(row)} />
                  <DeleteForeverIcon onClick={() => handleDelete(row._id)} />
                </TableCell>
              </TableRow>
            )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableComponent