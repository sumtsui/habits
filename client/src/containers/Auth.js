import React, { Component } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ProgressBar from '../components/ProgressBar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  drawerHeader: {
    ...theme.mixins.toolbar,
  },
});

class Auth extends Component {
  render() {

    const { transition, match, loading, classes } = this.props;

    return (
      <div>
        {loading ? <ProgressBar /> : null}
        <div className={classes.drawerHeader} />
        <Route path={`${match.url}/login`} render={() =>
          <Login
            transition={transition}
            match={match}
          />
        } />

        <Route path={`${match.url}/signup`} render={({ match }) =>
          <Signup
            transition={transition}
            match={match}
          />
        } />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    loading: auth.loading,
  }
}

export default connect(mapStateToProps, {})(withStyles(styles)(Auth));
