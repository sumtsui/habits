import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar'
import { onMenuOpen } from '../actions';

const styles = theme => ({
  menuButton: {
    marginRight: 20,
  },
  appBar: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // [ theme.breakpoints.up('800') ]: {
    //   maxWidth: '393px',
    //   left: 'calc(50vw - 203px)'
    // },
  },
});

class Navbar extends Component {

  render() {

    const { classes, location, history, onMenuOpen, loading, authLoading } = this.props;

    let barTitle = '';

    switch (location.pathname) {
      case '/': 
        barTitle = 'Habits';
        break;
      case '/new-habit':
        barTitle = 'New Habit';
        break;
      case '/manage-habits':
        barTitle = 'Manage Habits';
        break;
      default:
        barTitle = 'Habits';
        break;
    }

    return (
      // Interesting logic here 'transition' and '!transition'
      <AppBar className={classNames(classes.appBar, 'habit-app-bar')} position='fixed' >
        {
          (location.pathname === '/') ?
            <Toolbar>
            <IconButton 
              color="inherit"
              aria-label="Open drawer"
              onClick={onMenuOpen}
              className={classes.menuButton}
              children={<MenuIcon />}
            />
            <Typography variant="title" color="inherit">
              {barTitle}
            </Typography>

            </Toolbar>
            :
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={() => { history.goBack() }}
                className={classes.menuButton}
                children={<ChevronLeftIcon />}
              />

                <Typography variant="title" color="inherit">
                  {barTitle}
                </Typography>

            </Toolbar>
        }
        {(loading || authLoading) ? <ProgressBar /> : null}
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const mapStateToProps = state => {
//   const { nav } = state;
//   return {

//   }
// }

export default connect(null, { onMenuOpen })(withStyles(styles)(Navbar));