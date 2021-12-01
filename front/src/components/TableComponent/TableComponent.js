import React from 'react';
import moment from 'moment';
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

const TableComponent = ({ filter, setOpen, setId, setEdit, setRow }) => {
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
          <TableHead className='table-head'>
            <TableRow>
              <TableCell className='tab-cell'>Имя</TableCell>
              {
                cells.map((value, index) => <TableCell
                  key={`row-${index}`}
                  align="center"
                  className='tab-cell'
                >
                  {value}
                </TableCell>
                )
              }
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>
            {filter.map((row) => (
              <TableRow
                key={row._id}
              >
                <TableCell
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell
                  className='table-row'
                  align="center"
                >
                  {row.doc}
                </TableCell>
                <TableCell
                  className='table-row'
                  align="center"
                >
                  {moment(row.date).format('DD.MM.YYYY')}
                </TableCell>
                <TableCell
                  className='table-row'
                  align="center"
                >
                  {row.cause}
                </TableCell>
                <TableCell
                  className='table-row'
                  align="center"
                >
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