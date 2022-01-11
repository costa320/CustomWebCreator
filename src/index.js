import "./assets/polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { ConnectedRouter } from "connected-react-router";
/* REDUX */
import store, { history } from "./redux/store.js";
import { Provider } from "react-redux";
/* COMPONENTS */
import App from "./App.jsx";
/* STYLE */
import "antd/dist/antd.css";

console.info(``);
console.info(`Git Version: `, process.env.REACT_APP_VERSION);
console.info(`Enviroment: `, process.env.enviroment);

function Root() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router history={history}>
          <App />
        </Router>
      </ConnectedRouter>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
