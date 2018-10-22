import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { Link, Redirect } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import { onTextChanged, signupUser } from '../actions/';
import Hintbar from './Hintbar';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 6,
  },
  title: {
    marginBottom: theme.spacing.unit * 4
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
  progress: {
    width: '100%'
  }
});

class Signup extends Component {
  render() {
    const { classes, signupUser, email, password, repeatPassword, onTextChanged, isLogin, error, loading } = this.props;

    if (isLogin) return <Redirect to='/' />;

    return (
      <div>
      <form className={classes.root} >
        <Typography
          variant="display3"
          className={classes.title}
        >
          Habits
        </Typography>
        <Input
          name='email'
          value={email}
          placeholder="Email"
          className={classes.input}
          inputProps={{ 'aria-label': 'email', }}
          onChange={onTextChanged}
          type='email'
          disabled={loading ? true : false}
        />
        <Input
          value={password}
          name='password'
          placeholder="Password"
          className={classes.input}
          inputProps={{ 'aria-label': 'password', }}
          onChange={onTextChanged}
          type='password'
          disabled={loading ? true : false}
        />
        <Input
          value={repeatPassword}
          name='repeatPassword'
          placeholder="Repeat password"
          className={classes.input}
          inputProps={{ 'aria-label': 'repeat password', }}
          onChange={onTextChanged}
          type='password'
          disabled={loading ? true : false}
        />
        <Button
          color="primary"
          children='Sign Up'
          variant='contained'
          className={classes.loginButton}
          onClick={(e) => signupUser(e, { email, password, repeatPassword })}
          type='submit'
          disabled={loading ? true : false}
        />
        <Button
          color="primary"
          children='Login instead'
          variant='text'
          component={Link}
          to='/login'
          className={classes.newAccountButton}
        />
        <Hintbar open={error ? true : false} message={error} variant='warning' />
      </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    email: auth.email,
    password: auth.password,
    repeatPassword: auth.repeatPassword,
    error: auth.error,
    loading: auth.loading,
    isLogin: auth.isLogin
  }
}

export default connect(mapStateToProps, { onTextChanged, signupUser })(withStyles(styles)(Signup));