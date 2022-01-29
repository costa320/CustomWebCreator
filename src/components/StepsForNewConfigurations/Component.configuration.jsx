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
import ComponentSelection from "../ComponentSelection";
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
/* PROPS COMPONENTS */
import { DynamicPropsComponent } from "../PropsForComponents/index.export";
/* STYLES */

const formRef = React.createRef();
class ComponentConfigurator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AntdComponentList: ComponentsList(),
      ...this.props.Manager.ComponentConfig,
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
    let p = this.props;
    let temp_obj = {};
    allFields.forEach((item) => {
      temp_obj[item.name] = item.value;
    });
    this.setState({ ...temp_obj });
    /* updating redux with new value but maintaining integrity with other values */
    p.SetComponentConfig_({
      ...temp_obj,
    });

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

  generatePropsFields = (componentName) => {
    let s = this.state;
    let { AntdComponentList } = s;
    let { props } = AntdComponentList[componentName];
    console.log(props);
  };

  render() {
    let p = this.props;
    let s = this.state;
    let { AntdComponentList, componentName } = s;

    let dataSource = p.Manager.ComponentConfig;
    let { rows } = p.Site.CurrentPage;

    let modDataSource = {
      ...dataSource,
    };

    return (
      <>
        {/* <ComponentSelection />
        <Divider /> */}
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
          {componentName &&
            DynamicPropsComponent(
              componentName,
              AntdComponentList[componentName]
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
