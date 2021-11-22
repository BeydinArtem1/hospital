import React from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Modal,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MoadlDeleteComponent = ({ open, setOpen, id, setTask }) => {
  const deleteTask = async () => {
    await axios.delete(`http://localhost:8000/deleteTask?_id=${id}`).then(res => {
      setTask(res.data.data);
    });
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  console.log(open)
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Удалить прием
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Вы действительно хотите удалить прием?
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
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
        </Box>
      </Modal>
    </div>
  )
}

export default MoadlDeleteComponent