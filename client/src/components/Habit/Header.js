import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { recordHabit, undoRecordHabit } from '../../actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

const styles = theme => ({
  grow: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit
  },
  toggle: {
    display: 'flex',
    width: '6em'
  },
  label: {
    color: theme.palette.primary
  },
  good: {
    color: 'orange',
    borderColor: 'orange',
  },
  bad: {
    color: 'purple',
    borderColor: 'purple',
  },
});

const Header = props => {
  const { classes, title, isGood, _id, recordHabit, undoRecordHabit, todayLogged, loading, loggedID } = props;
  const kind = isGood ? classes.good : classes.bad;
  const color = isGood ? 'primary' : 'secondary';
  return (
    <div>
      <Toolbar>
        <Typography
          variant="title"
          className={classNames(classes.grow, kind)}
        >
          {title}
        </Typography>
        <FormControlLabel
          className={classNames(classes.toggle, classes.label)}
          control={
            <Switch
              checked={todayLogged}
              onChange={(e) => {
                (e.target.checked) 
                ? recordHabit(e.target, _id)
                : undoRecordHabit(e.target, _id)
              }}
              color={color}
            />
          }
          label={
            (loading && loggedID === _id) 
            ? <CircularProgress size={24} className={classes.buttonProgress} color={color} /> 
            : <Typography variant="body1" color={todayLogged ? color : 'textSecondary'} >Did it</Typography>
          }
        />
      </Toolbar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    loggedID: state.habit.toggledHabitID
  }
}


export default connect(mapStateToProps, { recordHabit, undoRecordHabit })(withStyles(styles)(Header));