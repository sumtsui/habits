import React, {Component} from 'react';
import Habit from './Habit/Habit';
import { connect } from 'react-redux';
import Empty from './Empty';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
});

class HabitList extends Component {

  componentDidUpdate(prevProps) {
    const { habitID, getHabits } = this.props;
    if (habitID !== prevProps.habitID && habitID !== '') {
      console.log('%c Fetch habits due to logging', 'color: green')
      getHabits();
    }
  }

  render() {
    const { habits, loading, classes } = this.props;
    if (habits.length < 1 && loading === false ) return <Empty />
    return (
      <Grid container spacing={16} justify="flex-start" className='grid-wrapper'>
        {habits.map(habit => <Habit habit={habit} loading={loading} key={habit._id} />)}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isToggled: state.habit.todayRecordChanged,
    habitID: state.habit.loggedHabitID,
    loading: state.habit.loading
  }
}

export default connect(mapStateToProps, {})(withStyles(styles)(HabitList));