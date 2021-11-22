import React from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Modal,
  Button
} from '@mui/material';

const ModalEditComponent = () => {
return ( <div>
  <Modal
    // open={open}
    // onClose={() => setOpen(false)}
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
        Изменить прием
      </Typography>
      <Typography
        className='modal-body'
        id="modal-modal-description"
        sx={{ mt: 2 }}
      >
        
      </Typography>
      <div className='modal-button'>
        <Button
          className='cansel'
          variant="outlined"
          // onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          className='save'
          variant="outlined"
          onClick={() => {
            
            // setOpen(false);
          }
          }          
        >
          Delete
        </Button>
      </div>
    </Box>
  </Modal>
</div>)
}

export default ModalEditComponent
