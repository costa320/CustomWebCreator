import React from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetRoutes } from "../../redux/actions/Session.actions";
import { SET_CurrentPage } from "../../redux/actions/Site.actions";
import {
  SetDrawerCreateNewComponent,
  SetComponentConfig,
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
import { ComponentsList } from "../exportedFromAntd";
/* MODELS Constructor */
import {
  _Row,
  _Col,
  _Component,
  _hgutters,
  _vgutters,
} from "../../redux/models/Site.model";
/* HELPERS */
import { UUID } from "../../assets/extra/extra";
/* STYLES */

const formRef = React.createRef();
class ComponentConfigurator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AntdComponentList: ComponentsList(),
    };
  }

  onFinish = (values) => {
    let s = this.state;
    let p = this.props;
    let { currentStep } = p.Manager.Drawer_CreateNewComponent;

    p.SetComponentConfig_({
      ...values,
    });
    this.onClickNext(currentStep);
  };

  onFinishFailed = () => {};

  onFieldsChange = (changedFields, allFields) => {
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

  onAddRow = () => {
    let p = this.props;
    const currentRows = p.Site.CurrentPage.rows;
    const tempRows = [...currentRows, new _Row(currentRows.length++)];
    p.SET_CurrentPage_({ rows: tempRows });
    p.SetDrawerCreateNewComponent_({
      dataSource: tempRows[tempRows.length - 1],
    });
  };

  onClickNext = (currentStep, formRef) => {
    let p = this.props;

    p.SetDrawerCreateNewComponent_({
      currentStep: currentStep + 1,
    });
  };

  render() {
    let p = this.props;
    let s = this.state;
    let { AntdComponentList } = s;
    let { visible, dataSource, currentStep } =
      this.props.Manager.Drawer_CreateNewComponent;
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
        <Form.Item
          name="componentName"
          label="Seleziona il componente"
          tooltip="Seleziona il componente che vorresti integrare."
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select
            placeholder="Seleziona il componente"
            showSearch={true}
            /* optionFilterProp={"label"} */
          >
            {AntdComponentList &&
              Object.entries(AntdComponentList).map(([key, value]) => {
                return (
                  <Select.Option key={UUID()} value={key}>
                    {key}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>

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
    SetComponentConfig_: (newProps) => {
      dispatch(SetComponentConfig(newProps));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentConfigurator);
