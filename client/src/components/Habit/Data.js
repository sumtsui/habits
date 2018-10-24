import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = {
  root: {
    margin: '0 1em',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  chip: {
    margin: '0 1em .2em 0'
  }
};

const Data = props => {
  const { classes, lastWeek, thisMonth, lastMonth, isGood } = props;

  const color = isGood ? 'primary' : 'secondary';

  return (
    <div className={classes.root}>
      <Chip
        label={`Last week: ${lastWeek}`}
        color={color}
        className={classes.chip}
      />
      <Chip
        label={`This month: ${thisMonth}`}
        color={color}
        className={classes.chip}
      />
      <Chip
        label={`Last month: ${lastMonth}`}
        color={color}
        className={classes.chip}
      />
    </div>
  )
}

export default withStyles(styles)(Data);