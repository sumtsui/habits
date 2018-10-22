import React from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  circle: {
    ...theme.typography.body1,
    margin: theme.spacing.unit / 2,
    marginBottom: 0,
    borderRadius: '50%',
    border: `1.2px ${theme.palette.grey['500']} solid`,
    width: theme.spacing.unit * 4.5,
    height: theme.spacing.unit * 4.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.775rem'
  },
  good: {
    color: 'orange',
    borderColor: 'orange',
  },
  bad: {
    color: 'purple',
    borderColor: 'purple',
  },
  bullet: {
    display: 'block',
    margin: '0 2px',
    transform: 'scale(1.2)',
  },
  today: {
    textAlign: 'center',
  }
});

const Week = ({ classes, isGood, thisWeek }) => {

  const dayOftheWeek = (new Date().getDay() === 0) ? 7 : new Date().getDay();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.root}>
      {
        [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ].map((day, index) => {
          let active = isGood ? classes.good : classes.bad;

          if (!thisWeek.includes(index + 1)) active = null;

          // today
          if ((index + 1 === dayOftheWeek)) {
            return (
              <div className={classes.today} key={day}>
                <div className={`${classes.circle} ${active}`}>
                  {day}
                </div>
                {bull}
              </div>
            )
          }

          return (
            <div className={`${classes.circle} ${active}`} key={day} >
              {day}
            </div>
          )
        })
      }
    </div>
  )
}

export default withStyles(styles)(Week);