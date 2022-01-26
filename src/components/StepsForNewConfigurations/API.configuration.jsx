import React from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetRoutes } from "../../redux/actions/Session.actions";
import { SET_CurrentPage } from "../../redux/actions/Site.actions";
import {
  SetDrawerCreateNewComponent,
  SetAPIConfig,
} from "../../redux/actions/Manager.actions";
/* AXIOS */
import axios from "axios";
import { getAxiosFull } from "../../axios/axios.general.ts";
/* ANTD */
import {
  Row,
  Col,
  Drawer,
  Button,
  Space,
  Form,
  Input,
  Select,
  Divider,
  Checkbox,
  Slider,
  Steps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
/* MODELS Constructor */
import {
  _Row,
  _Col,
  _Component,
  _hgutters,
  _vgutters,
} from "../../redux/models/Site.model";
/* HELPERS */
import ReactJson from "react-json-view";
import { UUID } from "../../assets/extra/extra";
/* STYLES */

const formRef = React.createRef();
class APIConfigurator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testingAPI: false,
      resultAPITesting: null,
      ...this.props.Manager.APIConfig,
    };
  }

  onFinish = (values) => {
    let s = this.state;
    let p = this.props;
    let { currentStep } = p.Manager.Drawer_CreateNewComponent;

    p.SetAPIConfig_({
      ...values,
    });
    this.onClickNext(currentStep);
  };

  onFinishFailed = () => {};

  onFieldsChange = (changedFields, allFields) => {
    let p = this.props;
    let temp_obj = {};
    allFields.forEach((item) => {
      temp_obj[item.name] = item.value;
    });
    this.setState({ ...temp_obj });
    /*  let p = this.props;
    const form = formRef.current;
    console.log(changedFields);
    form.setFieldsValue();
    p.SetDrawerCreateNewComponent_({ loadingElenco: false }); */
  };

  onClickNext = (currentStep, formRef) => {
    let p = this.props;

    p.SetDrawerCreateNewComponent_({
      currentStep: currentStep + 1,
    });
  };

  testApiCall = () => {
    let self = this;
    let { apiUrlForDataSource } = this.state;
    this.setState({ testingAPI: true, resultAPITesting: null });
    let config = {
      method: "get", //  get, post, put...
      url: apiUrlForDataSource, //  url
      headers: {},
    };
    getAxiosFull(config)
      .then((req) => {
        self.setState({ testingAPI: false, resultAPITesting: req });
      })
      .catch((error) => {
        console.log(error);
        self.setState({ testingAPI: false, resultAPITesting: error });
      });
  };

  render() {
    let p = this.props;
    let s = this.state;
    let { apiUrlForDataSource, testingAPI, resultAPITesting } = s;
    let dataSource = p.Manager.APIConfig;
    let { rows } = p.Site.CurrentPage;

    let modDataSource = {
      ...dataSource,
    };

    return (
      <Form
        ref={formRef}
        name="basic"
        layout={"vertical"}
        initialValues={modDataSource}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        onFieldsChange={this.onFieldsChange}
        autoComplete="off"
      >
        <Row gutter={[16, 16]} align="bottom">
          <Col flex="auto">
            <Form.Item
              name="apiUrlForDataSource"
              label="Inserire l'API"
              tooltip="Inserire l'url dal quale reperire i dati per alimentare il componente. Si possono anche utilizzare le variabili d'ambiente locali"
              rules={[{ required: true, message: "Please select API!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col flex="100px">
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                type="dashed"
                onClick={this.testApiCall}
                loading={testingAPI}
                disabled={!apiUrlForDataSource}
              >
                Test API
              </Button>
            </Form.Item>
          </Col>
        </Row>

        {resultAPITesting && (
          <>
            <Divider />
            {resultAPITesting.data ? (
              <ReactJson
                src={resultAPITesting.data}
                name={null}
                collapsed={2}
              />
            ) : (
              <ReactJson
                src={resultAPITesting.toJSON()}
                name={null}
                collapsed={1}
              />
            )}
            <Divider />
          </>
        )}

        <Row justify="end">
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Passaggio successivo
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
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
    SetRoutes_: (routes) => {
      dispatch(SetRoutes(routes));
    },
    SetDrawerCreateNewComponent_: (newProps) => {
      dispatch(SetDrawerCreateNewComponent(newProps));
    },
    SET_CurrentPage_: (newProps) => {
      dispatch(SET_CurrentPage(newProps));
    },
    SetAPIConfig_: (newProps) => {
      dispatch(SetAPIConfig(newProps));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(APIConfigurator);
