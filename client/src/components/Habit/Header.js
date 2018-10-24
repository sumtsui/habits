import React, { Component } from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { logHabit, undoLogHabit } from '../../actions';
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

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logged: this.props.todayLogged
    }
  }

  render () {
    const { classes, title, isGood, _id, logHabit, undoLogHabit, loading, habitID } = this.props;
    const kind = isGood ? classes.good : classes.bad;
    const color = isGood ? 'primary' : 'secondary';
    const emotion = isGood ? '😄' : '😫';

    return (
      <div>
        <Toolbar>
          <Typography
            variant="title"
            className={classNames(classes.grow, kind)}
            children={title}
          />
          <Button
            color={color}
            variant="outlined"
            onClick={() => {
              this.state.logged ? undoLogHabit(_id) : logHabit(_id);
              this.setState({ logged: !this.state.logged });
            }}
            children={(loading && habitID === _id)
              ? <CircularProgress size={24} className={classes.buttonProgress} color={color} />
              : (this.state.logged) 
                ? emotion
                : 'log'
            }
          />
        </Toolbar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    habitID: state.habit.loggedHabitID
  }
}


export default connect(mapStateToProps, { logHabit, undoLogHabit })(withStyles(styles)(Header));