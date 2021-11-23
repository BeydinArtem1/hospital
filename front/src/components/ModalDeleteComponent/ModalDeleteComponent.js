import React from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './ModalDeleteComponent.scss';

const ModalDeleteComponent = ({ open, setOpen, id, setAppointment }) => {
  const deleteAppointment = async () => {
    await axios.delete(`http://localhost:8000/deleteAppointment?_id=${id}`).then(res => {
      setAppointment(res.data.data);
    });
  }

  const handleDelete = () => {
    deleteAppointment();
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}>
        <List
          className='modal-box'
          sx={{ pt: 0 }}>
          <ListItem
            className='modal-header'
          >
            <h1>
              Удалить прием
            </h1>
          </ListItem>
          <ListItemText
            className='modal-body'
            primary='Вы действительно хотите удалить прием?'
          />
          <ListItem className='modal-button' >
            <Button
              className='cansel'
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className='delete'
              variant="outlined"
              onClick={() => handleDelete()}
              startIcon={
                <DeleteIcon />
              }
            >
              Delete
            </Button>
          </ListItem>
        </List>
      </Dialog>
    </div>
  )
}

export default ModalDeleteComponent