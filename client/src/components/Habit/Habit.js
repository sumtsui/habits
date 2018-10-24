import React, { Component } from 'react';
import Data from './Data';
import Header from './Header';
import Week from './Week';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const itemStyle = {
  minWidth: '400px',
  maxWidth: '400px',
  width: '400px'
}

class Habit extends Component {

  render() {
    const { habit, loading } = this.props;
    const today = (new Date().getDay() === 0) ? 7 : new Date().getDay();
    const todayLogged = this.props.habit.thisWeek.includes(today) ? true : false
    return (
      <Grid item xs={12} sm={8} md={6} lg={4} >
        <Card className='habit-wrapper' >
          <Header
            title={habit.title}
            _id={habit._id}
            isGood={habit.isGood}
            todayLogged={todayLogged}
            loading={loading}
          />
          <Week
            isGood={habit.isGood}
            thisWeek={habit.thisWeek}
            todayLogged={todayLogged}
          />
          <Data
            isGood={habit.isGood}
            lastWeek={habit.lastWeek}
            thisMonth={habit.thisMonth}
            lastMonth={habit.lastMonth}
          />
        </Card>
      </Grid>
    )
  }
}

export default (Habit);