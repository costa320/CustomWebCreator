import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter, Redirect } from "react-router";
/* AXIOS */
import { get_All_Logs_Full } from "../../axios/axios.logs";
/* REDUX */
import { connect } from "react-redux";
import { PageChanged, Set_user } from "../../redux/actions/Session.actions";
/* ANTD */
import { Layout, Menu, Breadcrumb, Avatar, Space, Typography } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
/* COMPONENTS */
/* EXTRA */
import { get_preFix } from "../../assets/extra/extra";
import ErrorBoundary from "../Shared/ErrorBoundary.jsx";
/* ASSETS */
import Logo from "../../assets/img/Logo.png";
/* STYLES */
import "../../assets/styles/SideBar.css";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: {
        pathname: null,
        state: {},
      },
      collapsedSideBar: false,
    };
  }

  componentDidMount() {
    /* chiamata solo per prendere la sessionUser */
    this.initUserInfos();
  }

  SetState(stateName, value) {
    this.setState({ [stateName]: value });
  }

  handleChangeLocation = ({ item, key, keyPath, domEvent }) => {
    let { Routes, Router } = this.props;
    let { headerRoutes, sideBarRoutes } = Routes;

    let nextHop = null;
    let optInHeaderRoute = headerRoutes.find((route) => route.key === key);
    if (optInHeaderRoute) nextHop = optInHeaderRoute;
    else {
      sideBarRoutes.forEach((subroute) => {
        if (subroute.options) {
          /* option with the same key */
          let opt = subroute.options.find((opt) => opt.key === key);
          if (opt) nextHop = opt;
        } else if (subroute.key === key) {
          nextHop = subroute;
        }
      });
    }
    /* if Router.location.state is undefined then its likely that u are on homePage */
    let { location } = Router;
    this.SetState("redirect", {
      pathname: get_preFix() + nextHop.path,
      state: {
        activeTabKey: key,
        label: nextHop.label,
        lastLocation: {
          path: location.pathname,
          activeTabKey: location.state
            ? location.state.activeTabKey
            : "Home-KEY",
          label: location.state ? location.state.label : "Home",
        },
      },
    });
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsedSideBar: collapsed });
  };

  initUserInfos = () => {
    let self = this;
    let s = this.state;
    let p = this.props;
    let { page, elements } = s;
    let urlExtension = ``;

    /* start loadings */
    self.SetState("loadingElencoLogs", true);
    get_All_Logs_Full(urlExtension)
      .then((response) => {
        console.info(response);
        let { matricola, nominativo, ruoloidm } = response.headers;

        p.Set_user_({
          matricola,
          nominativo,
          ruoloidm,
        });

        /* reset loadings */
        self.SetState("loadingElencoLogs", false);
      })
      .catch((error) => {
        console.log(error);
        p.Set_user_({
          matricola: null,
          nominativo: null,
          ruoloidm: null,
        });
        /* reset loadings */
        self.SetState("loadingElencoLogs", false);
      });
  };

  render() {
    let s = this.state;
    let p = this.props;

    let { Session, Routes, Router } = p;
    let { collapsedSideBar } = s;

    /* user */
    let { matricola, nominativo, ruoloidm } = Session.user;

    const { SubMenu } = Menu;
    const { Header, Content, Sider, Footer } = Layout;

    return (
      <>
        {s.redirect.pathname ? <Redirect push to={s.redirect} /> : null}
        <ErrorBoundary>
          <Layout>
            <Header className="header">
              <div
                style={{
                  background: `url(${
                    process.env.img_urlPrefix + Logo
                  }) center / contain no-repeat `,
                }}
                className="logo"
              />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["Home-KEY"]}
                selectedKeys={[Router.location.state?.activeTabKey]}
              >
                {Routes.headerRoutes.map((route, i) => {
                  let { label, key, icon, path } = route;
                  return (
                    <Menu.Item
                      key={key}
                      path={path}
                      onClick={this.handleChangeLocation}
                      icon={icon}
                    >
                      {label}
                    </Menu.Item>
                  );
                })}

                <Space className={"user"}>
                  <Avatar icon={<UserOutlined />} />
                  <Space direction={"vertical"} className="userName" size={0}>
                    <span>{nominativo || "-"}</span>
                    <span>{ruoloidm || "-"}</span>
                  </Space>
                </Space>
              </Menu>
            </Header>

            <Layout style={{ minHeight: "80vh" }}>
              <Sider
                width={280}
                collapsible
                className="site-layout-background"
                collapsed={collapsedSideBar}
                onCollapse={this.onCollapse}
                style={{ paddingBottom: 0 }}
              >
                <Menu
                  mode="inline"
                  /* defaultSelectedKeys={["1"]} */
                  defaultOpenKeys={["subnav1"]}
                  selectedKeys={[Router.location.state?.activeTabKey]}
                  style={{ height: "100%", borderRight: 0 }}
                >
                  {Routes.sideBarRoutes.map((submenu, i) => {
                    let { label, key, path, icon, options } = submenu;
                    if (options) {
                      return (
                        <SubMenu
                          key={key}
                          path={path}
                          icon={icon}
                          title={label}
                        >
                          {options.map((opt, i) => {
                            return (
                              <Menu.Item
                                key={opt.key}
                                path={opt.path}
                                onClick={this.handleChangeLocation}
                                icon={opt.icon}
                              >
                                {opt.label}
                              </Menu.Item>
                            );
                          })}
                        </SubMenu>
                      );
                    } else {
                      return (
                        <Menu.Item
                          key={key}
                          path={path}
                          onClick={this.handleChangeLocation}
                          icon={icon}
                        >
                          {label}
                        </Menu.Item>
                      );
                    }
                  })}
                </Menu>
              </Sider>

              <Layout
                style={{
                  height: "92%",
                  padding: "0 24px 24px",
                }}
              >
                <Content
                  style={{ backgroundColor: "transparent", margin: "16px 0" }}
                >
                  {p.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
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
    Set_user_: (newPagePath) => {
      dispatch(Set_user(newPagePath));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideBar));
