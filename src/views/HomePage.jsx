import React, { Component } from "react";
import { Redirect } from "react-router";
/* REDUX */
import { connect } from "react-redux";
import { RESET_ALL_REDUCERS } from "../redux/actions/Session.actions";
/* ANTD */
import {
  Row,
  Col,
  Slider,
  Card,
  Button,
  Space,
  Layout,
  Menu,
  Breadcrumb,
} from "antd";
import {
  DoubleRightOutlined,
  RedoOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
/* COMPONENTS */
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
      gutterKey: 1,
      vgutterKey: 1,
      colCountKey: 2,
    };
  }

  SetState = (state, value) => {
    this.setState({ [state]: value });
  };

  render() {
    let s = this.state;
    let p = this.props;

    return (
      <>
        {s.redirect.pathname ? <Redirect push to={s.redirect} /> : null}

        <Row>
          <Col>HI there</Col>
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
