import React from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetRoutes } from "../../redux/actions/Session.actions";
import { SET_CurrentPage } from "../../redux/actions/Site.actions";
import {
  RESET_REDUCER_MANAGER,
  SetDrawerCreateNewComponent,
  SetSummary,
} from "../../redux/actions/Manager.actions";
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
  ApiEndpointConfig,
} from "../../redux/models/Site.model";
/* HELPERS */
import { UUID } from "../../assets/extra/extra";
import { PropsGeneration } from "../PropsForComponents/props.generation";

/* STYLES */

const formRef = React.createRef();
class SummaryStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.Manager.Summary,
    };
  }

  onFinish = (values) => {
    let s = this.state;
    let p = this.props;
    let { currentStep } = p.Manager.Drawer_CreateNewComponent;

    p.SetSummary_({
      ...values,
    });

    this.updateCurrentPageStructure();

    this.onClose();
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

  onClose = () => {
    /* const form = formRef.current;
    form.resetFields(); */
    this.props.SetDrawerCreateNewComponent_({
      dataSource: {},
      visible: false,
      currentStep: 0,
    });
  };

  updateCurrentPageStructure = () => {
    let p = this.props;
    let {
      RowConfig,
      ComponentConfig,
      ComponentCustomization,
      APIConfig,
      Summary,
    } = p.Manager;
    const currentRows = p.Site.CurrentPage.rows;

    /* Finding indexes */
    let i_row = currentRows.findIndex(
      ({ row_id }) => row_id === RowConfig.row_id
    );
    let i_col = currentRows[i_row].cols.findIndex(
      ({ col_id }) => col_id === RowConfig.col_id
    );

    /* creating new component */
    let tempRows = [...p.Site.CurrentPage.rows];

    tempRows[i_row].cols[i_col].component = {
      name: ComponentConfig.componentName,
      props: PropsGeneration(
        ComponentConfig.componentName,
        RowConfig,
        ComponentConfig,
        ComponentCustomization,
        APIConfig,
        Summary
      ),
      fullConfiguration: p.Manager,
      ApiEndpointConfig: new ApiEndpointConfig(APIConfig.apiUrlForDataSource),
    };

    p.SET_CurrentPage_({ rows: tempRows });
    this.resetDrawerManagerToDefault();
  };

  resetDrawerManagerToDefault() {
    this.props.RESET_REDUCER_MANAGER_();
  }

  render() {
    let p = this.props;
    let s = this.state;
    let { RowConfig, ComponentConfig, APIConfig, Summary } = this.props.Manager;

    let { rows } = p.Site.CurrentPage;

    let modDataSource = {
      ...Summary,
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
        {/*  <Form.Item
      name="componentsName"
      label="Seleziona il componente"
      tooltip="Seleziona il componente che vorresti integrare."
      rules={[{ required: true, message: "Please select gender!" }]}
    >
      <Select placeholder="Seleziona il componente">
        {AntdComponentList &&
          Object.entries(AntdComponentList).map(([key, value]) => {
            return (
              <Select.Option key={UUID()} value={key}>
                {key}
              </Select.Option>
            );
          })}
      </Select>
    </Form.Item> */}

        <Row justify="end">
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Salva
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
    RESET_REDUCER_MANAGER_: () => {
      dispatch(RESET_REDUCER_MANAGER());
    },
    SetDrawerCreateNewComponent_: (newProps) => {
      dispatch(SetDrawerCreateNewComponent(newProps));
    },
    SET_CurrentPage_: (newProps) => {
      dispatch(SET_CurrentPage(newProps));
    },
    SetSummary_: (newProps) => {
      dispatch(SetSummary(newProps));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SummaryStep);
