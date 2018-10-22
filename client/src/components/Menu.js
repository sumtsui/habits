import React from "react";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import ConfirmPrompt from './ConfirmPrompt';
import { connect } from 'react-redux';
import { onMenuClose, onPromptOpen, logoutUser } from '../actions/';

const styles = theme => ({
  drawerPaper: {
    width: theme.drawer.width,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.mixins.toolbar,
  },
  menuTitle: {
    marginLeft: '.7em'
  },
  menuText: {
    textDecoration: 'none',
    '&:visited': {
      color: theme.palette.text.secondary,
    },
    color: theme.palette.text.secondary,
  }
});

const Menu = props => {
  const { classes, open, theme, onMenuClose, onPromptOpen, logoutUser } = props;

  const MenuItems = (
      <List>   

        <Link to={`/new-habit`} className={classes.menuText}>
          <ListItem button onClick={() => { onMenuClose(); }}>
            <ListItemText primary='New Habit' />
          </ListItem>
        </Link>

        <Link to="/manage-habits" className={classes.menuText}>
          <ListItem button onClick={() => { onMenuClose(); }}>
            <ListItemText primary='Manage Habits' />
          </ListItem>
        </Link>

        <ListItem button onClick={() => { onMenuClose(); onPromptOpen()}}>
          <ListItemText primary='Logout' />
        </ListItem>

      </List>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor='left'
        open={open}
        classes={{paper: classes.drawerPaper}}
        onOpen={() => {}}
        onClose={onMenuClose}>

        <div className={classes.drawerHeader}>
          <Typography variant="title" color="textSecondary" className={classes.menuTitle}>
            Menu
          </Typography>
          <IconButton onClick={onMenuClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <Divider />

        {MenuItems}

      </SwipeableDrawer>
      
      <ConfirmPrompt message='Log out from Habits?' action={logoutUser} />

    </div>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const { nav } = state;
  return {
    open: nav.menuOpen,
    promptOpen: nav.promptOpen
  }
}

export default connect(mapStateToProps, { onMenuClose, onPromptOpen, logoutUser })(withStyles(styles, {withTheme: true})(Menu));