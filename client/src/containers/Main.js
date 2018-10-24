import React, { Component } from 'react';
import HabitList from '../components/HabitList';
import NewHabit from '../components/NewHabit';
import Manage from './Manage';
import Navbar from '../components/Navbar';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import { withStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getHabits } from '../actions';

const styles = theme => ({
  drawerHeader: {
    ...theme.mixins.toolbar,
  },
});

class Main extends Component {

  componentDidMount() {
    this.props.getHabits();
  }

  componentDidUpdate(prevProps) {
    const { changeSaved, habitAdded } = this.props;
    // console.log('prevProps', prevProps.changeSaved);
    // console.log('curProps', this.props.changeSaved);
    if (prevProps.changeSaved !== changeSaved && changeSaved === true) {
      console.log('Change saved, fetching data');
      this.props.getHabits();
    }
    if (prevProps.habitAdded !== habitAdded && habitAdded === true) {
      console.log('New Habit added, fetching data');
      this.props.getHabits();
    }
  }

  render() {
    const { history, location, habits, loading, getHabits, classes, authLoading } = this.props;

    return (

      <div className='main-wrapper'>
        <Navbar
          history={history}
          location={location}
          loading={loading}
          authLoading={authLoading}
        />
        <Route exact path={`/`} render={() =>
          <Menu />
        } />

        <main>
          <div className={classes.drawerHeader} />
          <Route exact path={`/`} render={() =>
            <HabitList
              habits={habits}
              getHabits={getHabits}
            />
          } />
          <Route path={`/new-habit`} render={({history}) =>
            <NewHabit
              history={history}
            />
          } />
          <Route path={`/manage-habits`} render={({history, location}) =>
            <Manage
              habits={habits}
              history={history}
              location={location}
            />
          } />
        </main>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { habit, auth } = state;
  return {
    habits: habit.habits,
    loading: habit.loading,
    changeSaved: habit.changeSaved,
    habitAdded: habit.habitAdded,
    isLogin: auth.isLogin,
    authLoading: auth.loading,
  }
}

export default connect(mapStateToProps, { getHabits })(withStyles(styles)(Main));