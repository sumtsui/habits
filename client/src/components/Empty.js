import React from 'react';
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/AddCircleOutline';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '80vh',
    marginLeft: 2 * theme.spacing.unit,
    marginRight: 2 * theme.spacing.unit,
  },
  content: {
    textAlign: 'center',
    color: theme.palette.text.hint
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 4 * theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  buttonText: {
    textDecoration: 'none',
    '&:visited': {
      color: theme.palette.text.secondary,
    },
    color: theme.palette.text.secondary,
  }
});

const Empty = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography
        className={classes.content}
        variant="body1"
      >
        Keep track of your habits both good and bad.<br/>
        <Link to={`/new-habit`} className={classes.buttonText} >
          <Button variant="contained" color="primary" className={classes.button}>
            Create a Habit
            <AddIcon className={classes.rightIcon} />
          </Button>
        </Link>
      </Typography>
    </div>
  )
}

Empty.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Empty);
