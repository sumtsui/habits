import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

const icon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  success: {
    backgroundColor: green[ 600 ],
  },
  warning: {
    backgroundColor: amber[ 700 ],
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
});

class Hintbar extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message && this.props.message !== '') {
      this.setState({ open: true })
    }
  }

  state = {
    open: false
  }

  onClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { message, classes, variant } = this.props;
    const { open } = this.state;
    const Icon = icon[ variant ];
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={this.onClose}
        ContentProps={{ 'aria-describedby': 'message-id' }}
      >
        <SnackbarContent
          className={classes[ variant ]}
          message={
            <span id="message-id" className={classes.message}>
              <Icon className={classes.icon} />
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.onClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Snackbar>
    )
  }
}

Hintbar.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['error', 'success', 'warning', 'info']).isRequired
};

export default withStyles(styles)(Hintbar);
