import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  drawer: {
    width: 200
  },
  palette: {
    primary: {
      main: '#ff9100',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#9c27b0',
    }
  }
});

export default theme;