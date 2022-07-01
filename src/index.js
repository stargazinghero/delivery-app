import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/App/App';
import FirebaseComponents from './components/FirebaseComponents/FirebaseComponents';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './common/firebaseConfig';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './common/theme';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <FirebaseComponents>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="/delivery-app/">
          <CssBaseline>
            <Provider store={store}>
              <App />
            </Provider>
          </CssBaseline>
        </BrowserRouter>
      </ThemeProvider>
    </FirebaseComponents>
  </FirebaseAppProvider>
);
