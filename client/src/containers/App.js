import React, { Component } from 'react';
import Auth from './Auth';
import Main from './Main';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import config from '../config';
import { keepLoggedIn } from '../actions';

console.log('ENV', process.env.NODE_ENV);
// console.log('HEROKU', process.env.REACT_APP_HEROKU);
// console.log('Backend', config.route);

class App extends Component {

  componentWillMount() {
    const jwt = localStorage.getItem('jwt');
    if (jwt !== null) {
      this.props.keepLoggedIn();
    }
  }

  render() {

    const { isLogin } = this.props;

    return (
      <div>
      <MuiThemeProvider theme={theme} >
        <BrowserRouter>
            
          <Switch>

            <Route path="/auth" render={props =>
              <Auth {...props} />
            } />
    
            <Route path="/" render={props =>
              <div>
                {isLogin 
                ? <Main {...props} />
                : <Redirect to='/auth/login' />
                }
              </div>
            } />

          </Switch>

        </BrowserRouter>
      </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    isLogin: auth.isLogin,
  }
}

export default connect(mapStateToProps, { keepLoggedIn })(App);
