import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const myPurple = '#512da8';
const primary = '#F1FFF1';
// const myBlue = '#2196f3';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: primary,
    },
    secondary: {
      main: myPurple,
    },
  },
});

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
