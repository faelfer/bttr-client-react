import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const { version } = require('../package.json');

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY,
  integrations: [new Integrations.BrowserTracing()],
  release: `bttr-client@${version}`,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
