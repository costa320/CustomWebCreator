import React, {
  Component,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { withRouter, Redirect } from "react-router";
/* REDUX */
import { connect } from "react-redux";
/* COMPONENTS */
import { PageHeader, Button, Descriptions } from "antd";
/* EXTRA */
import { get_preFix } from "../../assets/extra/extra";
import { UUID } from "../../assets/extra/extra.ts";
/* STYLES */

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: {
        pathname: null,
        state: {},
      },
    };
  }

  SetState(stateName, value) {
    this.setState({ [stateName]: value });
  }

  RedirectTo = (nextHope = "/", state = {}) => {
    let p = this.props;
    let { Router } = p;
    this.SetState("redirect", {
      pathname: nextHope,
      state: {
        activeTabKey: "Home-KEY",
        label: "Home",
        lastLocation: {
          path: Router.location.pathname,
          activeTabKey: Router.location.state.activeTabKey,
          label: Router.location.state.label,
        },
      },
    });
  };

  itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <a onClick={() => this.RedirectTo(get_preFix() + route.path)}>
        {route.breadcrumbName}
      </a>
    );
  };

  handleOnBack = () => {
    let p = this.props;
    let { Router } = p;
    this.SetState("redirect", {
      pathname: get_preFix() + Router.location.state.lastLocation.path,
      state: {
        activeTabKey: Router.location.state.lastLocation.activeTabKey,
        label: Router.location.state.lastLocation.label,
        lastLocation: {
          path: Router.location.pathname,
          activeTabKey: Router.location.state.activeTabKey,
          label: Router.location.state.label,
        },
      },
    });
    /*     window.history.back(); */
  };

  render() {
    let s = this.state;
    let p = this.props;

    let { title, subtitle, extra, Router } = p;

    const routes = [
      {
        path: "/",
        breadcrumbName: "Home",
      },
      {
        path: Router.location.pathname,
        breadcrumbName: Router.location.state.label,
        /* children: [
          {
            path: pathname,
            breadcrumbName: Router.location.pathname,
          },
        ], */
      },
    ];

    return (
      <>
        {s.redirect.pathname ? <Redirect push to={s.redirect} /> : null}
        <div className="site-page-header-ghost-wrapper site-page-border">
          <PageHeader
            className="site-page-header"
            onBack={this.handleOnBack}
            title={title || "-"}
            subTitle={subtitle || "-"}
            extra={extra || null}
            breadcrumb={{ itemRender: this.itemRender, routes }}
          ></PageHeader>
        </div>
      </>
    );
  }
}
/* quale reducer vuoi utilizzare qui? solo math */
const mapStateToProps = (state) => {
  return { Router: state.router };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
