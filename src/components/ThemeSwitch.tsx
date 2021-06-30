import React from 'react';
import themeLight from 'src/theme/theme-light';
import { useThemeContext } from 'src/theme/themeContext';
import { makeStyles } from '@material-ui/core';
import DayIcon from '@material-ui/icons/Brightness7';
import NightIcon from '@material-ui/icons/Brightness4';
import Tooltip from '@material-ui/core/Tooltip';
import ToggleButton from '@material-ui/lab/ToggleButton';

const useStyles = makeStyles(() => ({
  buttonToggleTheme: {
    "&.MuiToggleButton-root": {
      border: 'none',
      borderRadius: '50%',
      color: '#FFF'
    },
    "&.Mui-selected": {
      background: 'none'
    }
  }
}))

const ThemeSwitch = () => {
  const classes = useStyles()
  const { theme, switchTheme } = useThemeContext()

  const handleSwitchTheme = () => {
    switchTheme()
  }

  const tooltipTheme: string = (theme === themeLight) ? 'dark' : 'light'

  return (
    <>
      <Tooltip title={'Switch to ' + tooltipTheme}>
        <ToggleButton
          className={classes.buttonToggleTheme}
          value="check"
          selected={theme === themeLight ? false : true}
          onChange={handleSwitchTheme}
        >
          {theme === themeLight ? <NightIcon /> : <DayIcon />}
        </ToggleButton>
      </Tooltip>
    </>
  );
};

export default ThemeSwitch