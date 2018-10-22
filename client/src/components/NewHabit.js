import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbUpOutlined from '@material-ui/icons/ThumbUpOutlined';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbDownOutlined from '@material-ui/icons/ThumbDownOutlined';
import classNames from 'classnames';
import Button from "@material-ui/core/Button";
import Hintbar from './Hintbar'
import { connect } from 'react-redux';

import { addNewHabit } from '../actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 6
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  formItem: {
    marginBottom: theme.spacing.unit * 3
  },
  label: {
    marginRight: theme.spacing.unit * 6
  },
  button: {
    marginTop: theme.spacing.unit * 6
  }
});

class NewHabit extends Component {

  state = {
    title: '',
    kind: '',
  };

  onTextChange = event => {
    this.setState({title: event.target.value});
  };

  onCheck = event => {
    if (event.target.checked) {
      this.setState({kind: event.target.value});
    } else {
      this.setState({kind: ''});
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { title, kind } = this.state;
    let isGood;
    if (kind === 'good') isGood = 1;
    else if (kind === 'bad') isGood = 0;

    const data = {
      title,
      isGood
    }
    this.props.addNewHabit(data, this.props.history);
  }

  render() {

    const { classes, error } = this.props;
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onSubmit}>
          <FormGroup row className={classes.formItem}>
            <TextField
              id="new-habit-title"
              label="Enter Title"
              className={classes.textField}
              value={this.state.name}
              onChange={this.onTextChange}
              margin="normal"
              variant="outlined"
            />
          </FormGroup>
          <FormGroup row className={classes.formItem}>
            <FormControlLabel
              className={classes.label}
              control={
                <Checkbox
                  checked={this.state.kind === 'good'}
                  onChange={this.onCheck}
                  value="good"
                  color="primary"
                  icon={<ThumbUpOutlined />}
                  checkedIcon={<ThumbUp />}
                />
              }
              label="Good Habit"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.kind === 'bad'}
                  onChange={this.onCheck}
                  value="bad"
                  color="secondary"
                  icon={<ThumbDownOutlined />}
                  checkedIcon={<ThumbDown />}
                />
              }
              label="Bad Habit"
            />
          </FormGroup>
          <FormGroup row className={classNames(classes.formItem)}>
            <Button
              color="primary"
              children='Save'
              variant='contained'
              className={classes.button}
              type="submit"
            />
          </FormGroup>
        </form>
        <Hintbar message={error} variant='warning' />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.habit.error
  };
}

export default connect(mapStateToProps, { addNewHabit })(withStyles(styles)(NewHabit));