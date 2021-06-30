import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import GlobalStyles from 'src/components/GlobalStyles';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import 'src/mixins/chartjs';
import routes from 'src/routes';
import { ThemeProvider }  from 'src/theme/themeContext';

const App = ({ locale, messages }) => {
  const routing = useRoutes(routes);
  return (
    <IntlProvider locale={locale} messages={messages}>
    <ThemeProvider>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
    </IntlProvider>
  );
};

App.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object
};
export default App;