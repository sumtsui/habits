import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { onPromptClose } from '../actions';

const ConfirmPrompt = ({ open, action, onPromptClose, message }) => {
  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
      <DialogActions>
        <Button onClick={() => { action(); onPromptClose(); }} color="primary">
          Yes
        </Button>
        <Button onClick={() => { onPromptClose() }} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmPrompt.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const { nav } = state;
  return {
    open: nav.promptOpen, 
  }
}

export default connect(mapStateToProps, { onPromptClose })(ConfirmPrompt);