import React from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetRoutes } from "../../../../redux/actions/Session.actions";
import { SET_CurrentPage } from "../../../../redux/actions/Site.actions";
import {
  SetDrawerCreateNewComponent,
  SetComponentConfig,
  SetComponentCustomization,
} from "../../../../redux/actions/Manager.actions";
/* ANTD */
import {
  Row,
  Col,
  Drawer,
  Button,
  Space,
  Form,
  Input,
  Badge,
  Typography,
  Table,
  Switch,
  Select,
  Divider,
  Checkbox,
  Slider,
  Steps,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  getFullDefaultPropsSettings,
  getDefaultPropsSettings,
} from "../../index.export";
import { ComponentsList, IconList, DynamicIcon } from "../../../exportedFromAntd";
/* MODELS Constructor */
import {
  _Row,
  _Col,
  _Component,
  _hgutters,
  _vgutters,
} from "../../../../redux/models/Site.model";
/* HELPERS */
import { UUID } from "../../../../assets/extra/extra";
/* STYLES */

const formRef = React.createRef();
class Button_Props extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: this.props.children,
      ...this.props.defaultSettings,
      ...this.props.Manager.ComponentCustomization,
    };
  }

  onFinish = (values) => {
    let s = this.state;
    let p = this.props;
    let { currentStep } = p.Manager.Drawer_CreateNewComponent;

    p.SetComponentCustomization_({
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
    /*     p.SetComponentCustomization_({
      ...temp_obj,
    }); */

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

  generatePropsFields = (fields, p) => {
    return Object.entries(fields).map(([key, field]) => {
      /* additional Options */
      let opt = field.type === "boolean" ? { valuePropName: "checked" } : {};
      return (
        <Col span={6}>
          <Form.Item
            key={UUID()}
            name={key}
            label={field.fieldLabel}
            tooltip={field.fieldHelper}
            {...opt}
            /*  rules={[{ required: true, message: "Please select cols!" }]} */
          >
            {this.NewItem(field, p)}
          </Form.Item>
        </Col>
      );
    });
  };

  NewItem = (field, p) => {
    /* risolvere il problema per cui un component non viene renderizzato... */
    switch (field.type) {
      case "string":
        return <Input />;

      case "number":
        return <InputNumber />;

      case "boolean":
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        );

      case "icon":
        return (
          <Select
            placeholder="Seleziona l'icona"
            showSearch={true}
            allowClear
            /* options={field.IconList} */
          >
            {p.AntdIconList &&
              Object.entries(p.AntdIconList).map(([key, icon]) => {
                return (
                  <Select.Option key={UUID()} value={key}>
                    {DynamicIcon(key, { style: { fontSize: "20px" } })} {key}
                  </Select.Option>
                );
              })}
          </Select>
        );
      case "array":
        /* return <Input />; */
        return (
          <Select
            placeholder="Seleziona l'opzione"
            showSearch={true}
            options={field.items}
          >
            {/*  {field.items.map((item) => {
              return (
                <Select.Option key={UUID()} value={item.key}>
                  {item.label}
                </Select.Option>
              );
            })} */}
          </Select>
        );

      case "object":
        return "";

      case "function":
        return "";

      default:
        return "";
    }
  };

  render() {
    let p = this.props;
    let s = this.state;

    /* fields rappresents the type of field and its default Value */
    /* let {  } = s; */
    let { componentName, /* children ,*/ defaultSettings, fields } = p;
    let { children } = s;

    /* let { children, fields } = getFullDefaultPropsSettings(componentName); */
    let dataSource = p.Manager.ComponentCustomization;

    let modDataSource = {
      children,
      ...defaultSettings,
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
          name="children"
          label="Label"
          tooltip="Inserisci la stringa che comprarirà sul bottone."
        >
          <Input />
        </Form.Item>

        <Row gutter={[24, 24]}>{this.generatePropsFields(fields, p)}</Row>

        <Divider />

        <Row gutter={[16, 32]} justify={"center"}>
          <Col span={24}>
            <Badge status="success" text="Live Preview" />
          </Col>
          <Col>
            <Button {...s} icon={s.icon && DynamicIcon(s.icon)}>
              {children}
            </Button>
          </Col>
        </Row>

        <Divider />

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
    SetComponentCustomization_: (newProps) => {
      dispatch(SetComponentCustomization(newProps));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Button_Props);
