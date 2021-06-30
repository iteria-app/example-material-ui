import { createMuiTheme, colors } from '@material-ui/core';
import shadows from '../shadows';
import typography from '../typography';

const themeDark = createMuiTheme({
  palette: {
    background: {
      // @ts-ignore
      dark: '#424242',
      default: colors.common.white,
      paper: '#212121'
    },
    type: 'dark',
    text: {
      primary: colors.common.white,
      secondary: colors.common.white
    },
    secondary: {
      main: colors.common.white,
    }
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#212121",
      },
    },
  },
  // @ts-ignore
  shadows,
  typography,
});

export default themeDark;
