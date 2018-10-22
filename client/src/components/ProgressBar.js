import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  progress: {
    width: '100%'
  }
});

const ProgressBar = ({ classes }) => {
  return (
    <LinearProgress className={classes.progress} />
  )
}

export default withStyles(styles)(ProgressBar);
