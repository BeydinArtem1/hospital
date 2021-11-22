import React from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  List,
  ListItem  
} from '@mui/material';

const ModalEditComponent = ({ id, editOpen, setEdit, setTask }) => {
  return (
    <Dialog
      onClose={() => setEdit(false)}
      open={editOpen}>
      <List
        className='modal-box'
        sx={{ pt: 0 }}>
        <ListItem
          className='modal-header'
        >
          <h1>
            Изменить прием
          </h1>
        </ListItem>
        <ListItem>

        </ListItem>       
        <ListItem className='modal-button' >
          <Button
            className='cansel'
            variant="outlined"
            onClick={() => setEdit(false)}
          >
            Cancel
          </Button>
          <Button
            className='save'
            variant="outlined"
            onClick={() => {              
              setEdit(false);
              }
            }            
          >
            Save
          </Button>
        </ListItem>
      </List>
    </Dialog>)
}

export default ModalEditComponent
