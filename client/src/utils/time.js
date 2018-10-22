import moment from 'moment';

export const getThisWeekData = record => {
  const mondayStart = moment().startOf('isoWeek');
  return (
    record
      .map(i => new Date(i))
      .filter(i => i >= mondayStart)
      .map(i => new Date(i).getDay() === 0 ? 7 : new Date(i).getDay())
  );
}

export const getLastWeekData = record => {
  const lastMondayStart = moment().startOf('isoWeek').subtract(7, 'days');
  const lastSundayEnd = moment().endOf('isoWeek').subtract(7, 'days');
  return (
    record
      .map(i => new Date(i))
      .filter(i => i >= lastMondayStart && i <= lastSundayEnd)
      .length
  );
}

export const getThisMonthData = record => {
  const monthStart = moment().startOf('month');
  return (
    record
      .map(i => new Date(i))
      .filter(i => i >= monthStart)
      .length
  );
}

export const getLastMonthData = record => {
  const lastMonthStart = moment().subtract(1, 'months').date(1).startOf('day');
  const lastMonthEnd = moment().date(0).endOf('day');
  return (
    record
      .map(i => new Date(i))
      .filter(i => i >= lastMonthStart && i <= lastMonthEnd)
      .length
  );
}