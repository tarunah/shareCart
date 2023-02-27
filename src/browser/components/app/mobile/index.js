import React from 'react';
import routes from '../../../routes/mobile';
import { CheckoutProviderHOC } from '@context/CheckoutContext';
import ThemeProvider from 'vision/ThemeProvider';
import theme from 'vision/theme';

const App = props => (
  <ThemeProvider theme={theme}>
    <div id="appContent">{routes}</div>
  </ThemeProvider>
);

export default CheckoutProviderHOC(App);
