import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  root: {
    margin: '0 1.8em 1em'
  }
};

const Data = props => {
  const { classes, lastWeek, thisMonth, lastMonth } = props;

  return (
    <div className={classes.root}>
      <Typography variant="subheading" color="textSecondary">
        Last week: {lastWeek}
      </Typography>
      <Typography variant="subheading" color="textSecondary">
        This month: {thisMonth}
      </Typography>
      <Typography variant="subheading" color="textSecondary">
        Last month: {lastMonth}
      </Typography>
    </div>
  )
}

export default withStyles(styles)(Data);