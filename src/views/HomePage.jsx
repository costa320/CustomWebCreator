import React, { Component } from "react";
import { Redirect } from "react-router";
/* REDUX */
import { connect } from "react-redux";
import { RESET_ALL_REDUCERS } from "../redux/actions/Session.actions";
/* ANTD */
import { Row, Col, Card, Button, Space } from "antd";
import {
  DoubleRightOutlined,
  RedoOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
/* COMPONENTS */
import AutocertificazioniSection from "../components/HomePageComponents/Autocertificazioni.section";
import TipologicheSection from "../components/HomePageComponents/TipoPrestazione.section";
import StatiDomandaSection from "../components/HomePageComponents/StatiDomanda.section";
import MessaggiSection from "../components/HomePageComponents/Messaggi.section";
import LogSection from "../components/HomePageComponents/Logs.section";
/* EXTRA */
import { get_preFix } from "../assets/extra/extra";
import ErrorBoundary from "../components/Shared/ErrorBoundary.jsx";
/* Styles */
import "../assets/styles/HomePage.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: {
        pathname: null,
        state: {},
      },
      hamburgerMenuIsOpen: false,

      rechargeLogsChart: false,
      downloadLogChart: false,
    };
  }

  SetState = (state, value) => {
    this.setState({ [state]: value });
  };

  RedirectTo = (
    nextHope = "/",
    state = {
      activeTabKey: "Home-KEY",
      label: "Home",
      lastLocation: {
        path: this.props.Router.location.pathname,
        activeTabKey: this.props.Router.location.state.activeTabKey,
        label: this.props.Router.location.state.label,
      },
    }
  ) => {
    this.SetState("redirect", {
      pathname: get_preFix() + nextHope,
      state: state,
    });
  };

  getRouteProps = (searchingKey) => {
    let p = this.props;
    let { Session, Router } = p;

    let allRoutes = [
      ...Session.routes.menuRoutes.headerRoutes,
      ...Session.routes.menuRoutes.sideBarRoutes,
    ];

    let foundRoute = null;
    allRoutes.forEach((route) => {
      let { path, key, options } = route;
      /* path */
      if (path) {
        /* its a real route, not a sub-route */
        if (key === searchingKey) {
          /* route is find */
          foundRoute = route;
        }
      } else if (options && options.length > 0) {
        /* its a subRoute not a realRoute */
        options.forEach((subroute) => {
          if (subroute.key === searchingKey) {
            foundRoute = subroute;
          }
        });
      }
    });
    if (foundRoute) {
      return [
        get_preFix() + foundRoute.path,
        {
          activeTabKey: foundRoute.key,
          label: foundRoute.label,
          lastLocation: {
            path: Router.location.pathname,
            activeTabKey: foundRoute.key,
            label: foundRoute.label,
          },
        },
      ];
    }
  };

  render() {
    let s = this.state;
    let p = this.props;

    return (
      <>
        {s.redirect.pathname ? <Redirect push to={s.redirect} /> : null}
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <Card
              type="inner"
              title="Panoramica Autocertificazioni"
              extra={
                <Button
                  onClick={() =>
                    this.RedirectTo(...this.getRouteProps("subnav2.1"))
                  }
                  icon={<DoubleRightOutlined />}
                />
              }
              className={"card-layout"}
              headStyle={{ backgroundColor: "white" }}
              hoverable
            >
              <ErrorBoundary>
                <AutocertificazioniSection />
              </ErrorBoundary>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Card
              type="inner"
              title="Panoramica Logs (ultimi 100)"
              extra={
                <Space>
                  <Button
                    onClick={() => {
                      this.SetState("rechargeLogsChart", true);
                    }}
                    icon={<RedoOutlined />}
                  />
                  <Button
                    onClick={() => {
                      this.SetState("downloadLogChart", true);
                    }}
                    icon={<DownloadOutlined />}
                  />
                  <Button
                    onClick={() =>
                      this.RedirectTo(...this.getRouteProps("logviewer-KEY"))
                    }
                    icon={<DoubleRightOutlined />}
                  />
                </Space>
              }
              className={"card-layout"}
              headStyle={{ backgroundColor: "white" }}
              hoverable
            >
              <ErrorBoundary>
                <LogSection
                  rechargeLogsChart={s.rechargeLogsChart}
                  downloadLogChart={s.downloadLogChart}
                  setState={(val) => this.setState(val)}
                />
              </ErrorBoundary>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Card
              type="inner"
              title="Stati Domanda"
              extra={
                <Button
                  onClick={() =>
                    this.RedirectTo(...this.getRouteProps("subnav1.4"))
                  }
                  icon={<DoubleRightOutlined />}
                />
              }
              className={"card-layout"}
              headStyle={{ backgroundColor: "white" }}
              hoverable
            >
              <ErrorBoundary>
                <StatiDomandaSection />
              </ErrorBoundary>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <Card
              type="inner"
              title="Panoramica Prestazioni"
              extra={
                <Button
                  onClick={() =>
                    this.RedirectTo(...this.getRouteProps("subnav1.1"))
                  }
                  icon={<DoubleRightOutlined />}
                />
              }
              className={"card-layout"}
              headStyle={{ backgroundColor: "white" }}
              hoverable
            >
              <ErrorBoundary>
                <TipologicheSection />
              </ErrorBoundary>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <Card
              type="inner"
              title="Panoramica Messaggi"
              extra={
                <Button
                  onClick={() =>
                    this.RedirectTo(...this.getRouteProps("subnav3.1"))
                  }
                  icon={<DoubleRightOutlined />}
                />
              }
              className={"card-layout"}
              headStyle={{ backgroundColor: "white" }}
              hoverable
            >
              <ErrorBoundary>
                <MessaggiSection />
              </ErrorBoundary>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
/* quale reducer vuoi utilizzare qui? solo math */
const mapStateToProps = (state) => {
  return {
    Session: state.SessionREDUCER,
    Router: state.router,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    RESET_ALL_REDUCERS_: () => {
      dispatch(RESET_ALL_REDUCERS());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
