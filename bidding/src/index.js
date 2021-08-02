import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import App from "./App";
import reducers from "./reducers";
import { getUser } from "./actions/auth-actions";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

if (localStorage.jwtToken) {
  store.dispatch(getUser(localStorage.jwtToken));
}
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
