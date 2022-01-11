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
import Logviewer from "./components/managers/Logviewer.Manager";
/*    MANAGERS */
import ManagerAutocertificazioni from "./components/managers/Autocertificazioni.Manager";
import ManagerCallout from "./components/managers/Messages.Manager";
/*        TIPOLOGICHE */
import ManagerPrestazioni from "./components/managers/Prestazioni.Manager";
import ManagerCausali from "./components/managers/Causali.Manager";
import ManagerPagamenti from "./components/managers/Pagamenti.Manager";
import ManagerLavoratori from "./components/managers/Lavoratori.Manager";
import ManagerFondi from "./components/managers/Fondi.Manager";
import ManagerDomande from "./components/managers/Domande.Manager";
import ManagerStatiDomanda from "./components/managers/StatiDomanda.Manager";
/* COMPONENTS */
import SideBar from "./components/Shared/SideBar.jsx";
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
          key: "logviewer-KEY",
          exact: true,
          path: `${get_preFix()}/logviewer`,
          component: Logviewer,
        },
        {
          key: "Home-KEY",
          exact: true,
          path: `${get_preFix()}/`,
          component: HomePage,
        },
        {
          key: "subnav2.1",
          exact: true,
          path: `${get_preFix()}/manager/autocertificazioni`,
          component: ManagerAutocertificazioni,
        },
        {
          key: "subnav1.1",
          exact: true,
          path: `${get_preFix()}/manager/prestazioni`,
          component: ManagerPrestazioni,
        },
        {
          key: "subnav1.2",
          exact: true,
          path: `${get_preFix()}/manager/causali`,
          component: ManagerCausali,
        },
        {
          key: "subnav1.3",
          exact: true,
          path: `${get_preFix()}/manager/pagamenti`,
          component: ManagerPagamenti,
        },
        {
          key: "subnav1.4",
          exact: true,
          path: `${get_preFix()}/manager/lavoratori`,
          component: ManagerLavoratori,
        },
        {
          key: "subnav1.5",
          exact: true,
          path: `${get_preFix()}/manager/fondi`,
          component: ManagerFondi,
        },
        {
          key: "subnav1.6",
          exact: true,
          path: `${get_preFix()}/manager/domande`,
          component: ManagerDomande,
        },
        {
          key: "subnav1.7",
          exact: true,
          path: `${get_preFix()}/manager/stati-domanda`,
          component: ManagerStatiDomanda,
        },
        {
          key: "subnav3.1",
          exact: true,
          path: `${get_preFix()}/manager/callout`,
          component: ManagerCallout,
        },
        {
          key: "none",
          component: ErrorPage,
        },
      ],
      /* browsable Routes just for ui, real routes are baseRoutes */
      Routes: {
        headerRoutes: [
          {
            key: "Home-KEY",
            label: "Home",
            exact: true,
            path: `${get_preFix()}/`,
            icon: <HomeOutlined className={"tableIcons"} />,
          },
          {
            label: "Gestione Log",
            key: "logviewer-KEY",
            exact: true,
            path: `${get_preFix()}/logviewer`,
            icon: <CodeOutlined className={"tableIcons"} />,
          },
        ],
        sideBarRoutes: [
          {
            label: "Tipologiche",
            key: "subnav1",
            path: null,
            icon: <ApartmentOutlined className={"tableIcons"} />,
            options: [
              {
                key: "subnav1.1",
                label: "Gestisci Prestazioni",
                exact: true,
                path: `${get_preFix()}/manager/prestazioni`,
                icon: null,
              },
              {
                key: "subnav1.2",
                label: "Gestisci Causali",
                exact: true,
                path: `${get_preFix()}/manager/causali`,
                icon: null,
              },
              {
                key: "subnav1.3",
                label: "Gestisci Pagamenti",
                exact: true,
                path: `${get_preFix()}/manager/pagamenti`,
                icon: null,
              },
              {
                key: "subnav1.4",
                label: "Gestisci Lavoratori",
                exact: true,
                path: `${get_preFix()}/manager/lavoratori`,
                icon: null,
              },
              {
                key: "subnav1.5",
                label: "Gestisci Fondi",
                exact: true,
                path: `${get_preFix()}/manager/fondi`,
                icon: null,
              },
              {
                key: "subnav1.6",
                label: "Gestisci Domande",
                exact: true,
                path: `${get_preFix()}/manager/domande`,
                icon: null,
              },
              {
                key: "subnav1.7",
                label: "Gestisci Stati Domanda",
                exact: true,
                path: `${get_preFix()}/manager/stati-domanda`,
                icon: null,
              },
            ],
          },
          {
            label: "Autocertificazioni",
            key: "subnav2",
            path: null,
            icon: <AuditOutlined className={"tableIcons"} />,
            options: [
              {
                key: "subnav2.1",
                label: "Modifica Autocertificazioni",
                exact: true,
                path: `${get_preFix()}/manager/autocertificazioni`,
                icon: null,
              },
            ],
          },
          {
            label: "Messaggi",
            key: "subnav3",
            path: null,
            icon: <MessageOutlined className={"tableIcons"} />,
            options: [
              {
                key: "subnav3.1",
                label: "Modifica Callout",
                exact: true,
                path: `${get_preFix()}/manager/callout`,
              },
            ],
          },
          /*           {
            label: "Filtri",
            key: "subnav4",
            path: null,
            icon: <FilterOutlined className={"tableIcons"} />,
            options: [
              {
                key: "subnav4.1",
                label: "Modifica Filtri Stati Domanda",
                exact: true,
                path: `${get_preFix()}/manager/filters-stati-domanda`,
              },
            ],
          }, */
        ],
      },
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
          <SideBar Routes={Routes}>
            <Switch>
              {baseRoutes &&
                baseRoutes.map((route) => {
                  return <Route {...route} />;
                })}
            </Switch>
          </SideBar>
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
