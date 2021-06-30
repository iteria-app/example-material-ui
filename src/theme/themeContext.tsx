import React, { useState } from "react";
import { useContext } from 'react';
import { ThemeProvider } from '@material-ui/core';
import themeLight from 'src/theme/theme-light';
import themeDark from 'src/theme/theme-dark';

const ThemeContext = React.createContext({
  theme: themeLight,
  switchTheme: () => {},
});
ThemeContext.displayName = 'ThemeContext'

const ThemeProviderWrapper = (props) => {
  const [theme, setTheme] = useState(themeLight);
  const switchTheme = () => {
    setTheme(theme === themeLight ? themeDark : themeLight);
  };

  const { children } = props
  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext)

export { ThemeProviderWrapper as ThemeProvider, useThemeContext }