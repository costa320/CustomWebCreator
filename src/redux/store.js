import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createRootReducer from "./reducers";
import { createBrowserHistory } from "history";

import thunk from "redux-thunk";

export const history = createBrowserHistory();

function saveToSessionStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromSessionStorage() {
  try {
    const serializedState = sessionStorage.getItem("reduxState");
    if (serializedState) {
      return JSON.parse(serializedState);
    } else {
      return undefined;
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const logger = createLogger({
  timestamp: true,
});

const persistedState = loadFromSessionStorage();

let middlewares;

if (process.env.enviroment === "DEV") {
  middlewares = applyMiddleware(logger, thunk);
} else {
  middlewares = applyMiddleware(thunk);
}

//dev tools
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose(
    applyMiddleware(
      routerMiddleware(history) // for dispatching history actions
      // ... other middlewares ...
    )
  );

const store = createStore(
  createRootReducer(history),
  persistedState,
  composeEnhancers(middlewares)
);

store.subscribe(() => {
  saveToSessionStorage(store.getState());
});

export default store;
