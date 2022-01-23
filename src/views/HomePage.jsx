import React, { Component } from "react";
import { Redirect } from "react-router";
/* REDUX */
import { connect } from "react-redux";
import { SetRoutes } from "../redux/actions/Session.actions";
import { SET_CurrentPage } from "../redux/actions/Site.actions";
import { SetDrawerCreateNewComponent } from "../redux/actions/Manager.actions";
/* ANTD */
import { Row, Col, Button, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
/* COMPONENTS */
import { DynamicComponent } from "../components/exportedFromAntd";
/* EXTRA */
import { get_preFix } from "../assets/extra/extra";
import ErrorBoundary from "../components/Shared/ErrorBoundary.jsx";
/* MODELS Constructor */
import {
  _Row,
  _Col,
  _Component,
  _hgutters,
  _vgutters,
} from "../redux/models/Site.model";
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

  generateRows = ({ rows, hgutters, vgutters, colsCounts }) => {
    return rows.map((row) => {
      let { row_id, hgutters, vgutters, justify, align, cols } = row;

      return (
        <Row
          gutter={[hgutters, vgutters]}
          justify={justify}
          align={align}
          key={`{row:${row_id}}`}
        >
          {cols.map((col) => {
            let {
              col_id,
              generalGrid,
              ComplexGridEnabled,
              complexGrid,
              component,
            } = col;
            let gridSystem = ComplexGridEnabled ? complexGrid : generalGrid;
            return (
              <Col
                key={`{row:${row_id},column:${col_id}}`}
                {...gridSystem}
                style={{ border: "1px solid red" }}
              >
                <ErrorBoundary>
                  {component ? (
                    DynamicComponent(component.name, component.props)
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={`Riga n°${row_id}, colonna n°${col_id} vuota`}
                    />
                  )}
                </ErrorBoundary>
              </Col>
            );
          })}
        </Row>
      );
    });
  };

  onAddRow = () => {
    let p = this.props;
    const currentRows = p.Site.CurrentPage.rows;
    const tempRows = [...currentRows, new _Row(currentRows.length++)];

    p.SET_CurrentPage_({ rows: tempRows });
    /* drawer visibility changes, user is now able to mod the row */
    p.SetDrawerCreateNewComponent_({
      dataSource: tempRows[tempRows.length - 1],
      visible: true,
    });
  };

  render() {
    let s = this.state;
    let p = this.props;
    let { Routes, Pages, CurrentPage } = p.Site;
    let { routeId, rows, hgutters, vgutters, colsCounts } = CurrentPage;
    return (
      <>
        {s.redirect.pathname ? <Redirect push to={s.redirect} /> : null}
        {this.generateRows(CurrentPage)}
        <Row justify="center">
          <Col>
            <Button
              size={"large"}
              type="dashed"
              icon={<PlusOutlined />}
              onClick={this.onAddRow}
            >
              Crea Nuova Riga
            </Button>
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
    Site: state.SiteREDUCER,
    Manager: state.ManagerREDUCER,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    RESET_ALL_REDUCERS_: () => {
      dispatch(RESET_ALL_REDUCERS());
    },
    SetDrawerCreateNewComponent_: (newProps) => {
      dispatch(SetDrawerCreateNewComponent(newProps));
    },
    SET_CurrentPage_: (newProps) => {
      dispatch(SET_CurrentPage(newProps));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
