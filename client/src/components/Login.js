import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { Link, Redirect } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Hintbar from './Hintbar';

import { onTextChanged, loginUser } from '../actions/';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 6,
  },
  title: {
    marginBottom: theme.spacing.unit * 4,
  },
  loginButton: {
    marginTop: theme.spacing.unit * 4
  },
  newAccountButton: {
    marginTop: theme.spacing.unit * 10
  },
  input: {
    margin: 3 * theme.spacing.unit,
  },
});

class Login extends Component {

  render() {
    const { classes, onTextChanged, email, password, loginUser, isLogin, match, error, loading} = this.props;

    if (isLogin) {
      return <Redirect to='/' />
    }

    return (
      <form className={classes.root} >
        <Typography
          variant="display3"
          className={classes.title} >
          Habits
        </Typography>
        <Input
          autoFocus
          name='email'
          placeholder="Email"
          className={classes.input}
          inputProps={{ 'aria-label': 'email', }}
          onChange={onTextChanged}
          type='email'
          value={email}
          disabled={loading ? true : false}
        />
        <Input
          name='password'
          placeholder="Password"
          className={classes.input}
          inputProps={{ 'aria-label': 'password', }}
          onChange={onTextChanged}
          type='password'
          value={password}
          disabled={loading ? true : false}
        />
        <Button
          color="primary"
          children='Login'
          variant='contained'
          className={classes.loginButton}
          onClick={(e) => loginUser(e, {email, password})}
          type='submit'
          disabled={loading ? true : false}
        />
        <Button
          color="primary"
          children='Create new account'
          variant='text'
          component={Link}
          to={`${match.url}/signup`}
          className={classes.newAccountButton}
        />
        <Hintbar message={error} variant='warning' />
      </form>
    )
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    email: auth.email,
    password: auth.password,
    error: auth.error,
    loading: auth.loading,
    isLogin: auth.isLogin
  }
}

export default connect(mapStateToProps, { onTextChanged, loginUser })(withStyles(styles)(Login));