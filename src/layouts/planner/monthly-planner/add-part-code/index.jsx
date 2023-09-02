import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import alertAndLoaders from 'utils/alertAndLoaders';
import { useDispatch } from "react-redux"

const AddPartCode = ({ buttonText, onAddPartCode }) => {
  const dispatch = useDispatch();
  const [partCodeValue, setPartCodeValue] = useState('');

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleAddPartCode = useCallback(() => {
    onAddPartCode(partCodeValue);
    if (partCodeValue.length === 0 || partCodeValue.length < 14) {
      alertAndLoaders("UNSHOW_ALERT", dispatch, "Please enter valid part code.", "warning");
    } else {
      setOpen(false);
      setPartCodeValue("");
    }

  }, [dispatch, onAddPartCode, partCodeValue]);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={handleClickOpen} style={{ float: 'right', background: '#344767',color:"white" }}>
        {buttonText}
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        PaperProps={{ style:{
          backgroundColor:"#202940"
        }}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add Part Code</DialogTitle>
        <DialogContent style={{ padding: '10px', marginLeft: '10px' }}>
          <div>
            <TextField
              onChange={(e) => setPartCodeValue(e.target.value)}
              value={partCodeValue}
              id="outlined-basic"
              label="Add Part Code"
              variant="outlined"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPartCode}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddPartCode.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onAddPartCode: PropTypes.func.isRequired,
};

export default React.memo(AddPartCode);

