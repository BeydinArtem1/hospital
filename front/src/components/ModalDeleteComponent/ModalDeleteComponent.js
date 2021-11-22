import React from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Modal,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './ModalDeleteComponent.scss';

const ModalDeleteComponent = ({ open, setOpen, id, setTask }) => {
  const deleteTask = async () => {
    await axios.delete(`http://localhost:8000/deleteTask?_id=${id}`).then(res => {
      setTask(res.data.data);
    });
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='modal-box'>
          <Typography
            className='modal-header'
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Удалить прием
          </Typography>
          <Typography
            className='modal-body'
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Вы действительно хотите удалить прием?
          </Typography>
          <div className='modal-button'>
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
              onClick={() => {
                deleteTask();
                setOpen(false);
              }
              }
              startIcon={
                <DeleteIcon />
              }
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalDeleteComponent