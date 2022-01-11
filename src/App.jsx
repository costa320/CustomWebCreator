import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import loadable from "./components/Shared/loadable";
import { push } from "connected-react-router";
/* REDUX */
import { connect } from "react-redux";
import { SetRoutes } from "./redux/actions/Session.actions";
/* VIEWS */
import HomePage from "./views/HomePage.jsx";
import ErrorPage from "./views/ErrorPage.jsx";

/*    MANAGERS */
/* COMPONENTS */
/* ANTD */
import { BackTop } from "antd";
import {
  FilterOutlined,
  HomeOutlined,
  MessageOutlined,
  CodeOutlined,
  ApartmentOutlined,
  AuditOutlined,
} from "@ant-design/icons";
/* EXTRA */
import ErrorBoundary from "./components/Shared/ErrorBoundary";
import { get_preFix, UUID } from "./assets/extra/extra";
/* STYLE */
import "./assets/styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* all routes inside application */
      baseRoutes: [
        {
          key: "Home-KEY",
          exact: true,
          path: `${get_preFix()}/`,
          component: HomePage,
        },
        {
          key: "none",
          component: ErrorPage,
        },
      ],
      /* browsable Routes just for ui, real routes are baseRoutes */

    };
  }

  componentDidMount() {
    let s = this.state;
    let p = this.props;

    let currentPath = window.location.pathname;
    let { location } = p.Router;

    this.props.SetRoutes_({
      /* real-routes */
      baseRoutes: s.baseRoutes,
      /* user-menu-routes */
      menuRoutes: s.Routes,
    });

    /* if in the router we dont find our current path => reset path */
    if (currentPath !== location.pathname) {
      p.SetNewRoute_(currentPath);
    }
  }

  render() {
    let s = this.state;
    let { Routes, baseRoutes } = s;
    return (
      <>
        <BackTop />
        <ErrorBoundary>
            <Switch>
              {baseRoutes &&
                baseRoutes.map((route) => {
                  return <Route {...route} />;
                })}
            </Switch>
         {/*  <SideBar Routes={Routes}></SideBar> */}
        </ErrorBoundary>
      </>
    );
  }
}
/* quale reducer vuoi utilizzare qui? solo math */
const mapStateToProps = (state) => {
  return { Session: state.SessionREDUCER, Router: state.router };
};
const mapDispatchToProps = (dispatch) => {
  return {
    SetRoutes_: (routes) => {
      dispatch(SetRoutes(routes));
    },
    SetNewRoute_: (nextHope) => {
      dispatch(push(nextHope));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
