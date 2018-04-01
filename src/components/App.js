import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider, { MUI_SHEET_ORDER } from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import { createPalette } from 'material-ui/styles';
import { blue } from 'material-ui/colors';
import { deepOrange } from 'material-ui/colors';

function App(props) {
  const { dark } = props;

  global.theme = createMuiTheme({palette: {
    primary: blue,
    accent: deepOrange,
  }});


  let AppRouter = require('./AppRouter').default;

  return (
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  );
}

App.propTypes = {
  dark: PropTypes.bool.isRequired,
};

export default connect(state => ({ dark: state.dark }))(App);
