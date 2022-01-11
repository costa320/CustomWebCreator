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
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            HELLO THERE!!!
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
