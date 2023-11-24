import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { Provider } from "react-redux";
import { createStandaloneToast } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";

import routes from "./routes";
import { store, persistor } from "./services/createStore";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require("../package.json");

const { ToastContainer } = createStandaloneToast();

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY,
  integrations: [new Integrations.BrowserTracing()],
  release: `bttr-client-react@${version}`,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={routes} />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
