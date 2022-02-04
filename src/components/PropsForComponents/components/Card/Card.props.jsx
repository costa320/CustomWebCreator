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
  Card,
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
  Avatar,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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
class Card_Props extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* actions may be multiple */
      allListActions: [...props.fields.actions.items],
      /* cover is single element */
      allListCovers: [...props.fields.cover.items],
      /* extra may be multiple */
      allListExtras: [...props.fields.extra.items],

      newAction: {
        label: "",
        value: "",
        icon: null,
      },
      newCover: {
        label: "",
        value: "",
        icon: null,
      },
      newExtra: {
        label: "",
        value: "",
        icon: null,
      },

      children: props.children,
      ...props.defaultSettings,
      ...props.Manager.ComponentCustomization,
    };
  }

  onFinish = (values) => {
    let s = this.state;
    let p = this.props;
    let { currentStep } = p.Manager.Drawer_CreateNewComponent;
    let { allListActions, allListCovers, allListExtras } = s;

    p.SetComponentCustomization_({
      ...values,
      allListActions,
      allListCovers,
      allListExtras,
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
      if (field.hidden) {
        return;
      }
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
            mode={field.mode}
          ></Select>
        );

      case "object":
        return "";

      case "function":
        return "";

      default:
        return "";
    }
  };

  onAddAction = () => {
    let s = this.state;
    let p = this.props;
    let { newAction, allListActions } = s;

    /* update of allListColumns maintaining all previous data */
    this.setState({
      allListActions: [...allListActions, newAction],
    });
    /* field reset */
    this.setState({
      newAction: { label: "", value: "", icon: null },
    });

    /* const form = formRef.current;
    form.setFieldsValue({ listColumns: [...listColumns, columnName] }); */
  };

  onAddCover = () => {
    let s = this.state;
    let p = this.props;
    let { newCover, allListCovers } = s;

    /* update of allListColumns maintaining all previous data */
    this.setState({
      allListCovers: [...allListCovers, newCover],
    });

    /* field reset */
    this.setState({
      newCover: { label: "", value: "", icon: null },
    });

    /* const form = formRef.current;
    form.setFieldsValue({ listColumns: [...listColumns, columnName] }); */
  };

  onAddExtra = () => {
    let s = this.state;
    let p = this.props;
    let { newExtra, allListExtras } = s;

    /* update of allListColumns maintaining all previous data */
    this.setState({
      allListExtras: [...allListExtras, newExtra],
    });

    /* field reset */
    this.setState({
      newCover: { label: "", value: "", icon: null },
    });

    /* const form = formRef.current;
    form.setFieldsValue({ listColumns: [...listColumns, columnName] }); */
  };

  render() {
    let p = this.props;
    let s = this.state;

    /* fields rappresents the type of field and its default Value */
    let {
      allListActions,
      allListCovers,
      allListExtras,
      newAction,
      newCover,
      newExtra,
    } = s;
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
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <Form.Item
              name="children"
              label="Children"
              tooltip="Inserisci la stringa che comprarirà come children."
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="title"
              label={fields.title.fieldLabel}
              tooltip={fields.title.fieldHelper}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="actions"
              label={fields.actions.fieldLabel}
              tooltip={fields.actions.fieldHelper}
            >
              <Select
                placeholder="Seleziona actions"
                mode="multiple"
                optionLabelProp="label"
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: "4px 0" }} />

                    <Row gutter={[24, 6]} style={{ padding: "12px" }}>
                      <Col>
                        <Input
                          placeholder={"Action label"}
                          value={newAction.label}
                          onChange={(e) =>
                            this.setState({
                              newAction: {
                                ...newAction,
                                label: e.target.value,
                              },
                            })
                          }
                        />
                      </Col>
                      <Col>
                        <Input
                          placeholder={"Action url"}
                          value={newAction.value}
                          onChange={(e) =>
                            this.setState({
                              newAction: {
                                ...newAction,
                                value: e.target.value,
                              },
                            })
                          }
                        />
                      </Col>
                      <Col>
                        <Input
                          placeholder={"Action Icon"}
                          value={newAction.icon}
                          onChange={(e) =>
                            this.setState({
                              newAction: { ...newAction, icon: e.target.value },
                            })
                          }
                        />
                      </Col>
                      <Col>
                        <Button
                          disabled={
                            newAction.label && newAction.value ? false : true
                          }
                          icon={<PlusOutlined />}
                          onClick={this.onAddAction}
                        >
                          Aggiungi action
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              >
                {allListActions &&
                  allListActions.map(({ label, value, icon }) => (
                    <Select.Option key={UUID()} value={value} label={label}>
                      {`${label}`}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="cover"
              label="Seleziona la cover"
              tooltip="The action list, shows at the bottom of the Card"
            >
              <Select
                placeholder="Seleziona cover"
                allowClear
                optionLabelProp="label"
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: "4px 0" }} />

                    <Row gutter={[24, 6]} style={{ padding: "12px" }}>
                      <Col>
                        <Input
                          placeholder={"Cover label"}
                          value={newCover.label}
                          onChange={(e) =>
                            this.setState({
                              newCover: { ...newCover, label: e.target.value },
                            })
                          }
                        />
                      </Col>
                      <Col>
                        <Input
                          placeholder={"Cover Url"}
                          value={newCover.value}
                          onChange={(e) =>
                            this.setState({
                              newCover: { ...newCover, value: e.target.value },
                            })
                          }
                        />
                      </Col>
                      <Col>
                        <Button
                          disabled={newCover.label ? false : true}
                          icon={<PlusOutlined />}
                          onClick={this.onAddCover}
                        >
                          Aggiungi cover
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              >
                {allListCovers &&
                  allListCovers.map(({ label, value, icon }) => (
                    <Select.Option key={UUID()} value={value} label={label}>
                      {`${label}`}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="cardMetaTitle"
              label={fields.cardMetaTitle.fieldLabel}
              tooltip={fields.cardMetaTitle.fieldHelper}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="cardMetaDescription"
              label={fields.cardMetaDescription.fieldLabel}
              tooltip={fields.cardMetaDescription.fieldHelper}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="extra"
              label={fields.extra.fieldLabel}
              tooltip={fields.extra.fieldHelper}
            >
              <Select
                mode="multiple"
                placeholder="Seleziona cover"
                optionLabelProp="label"
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: "4px 0" }} />

                    <Row gutter={[24, 6]} style={{ padding: "12px" }}>
                      <Col>
                        <Input
                          placeholder={"Cover label"}
                          value={newExtra.label}
                          onChange={(e) =>
                            this.setState({
                              newExtra: { ...newExtra, label: e.target.value },
                            })
                          }
                        />
                      </Col>
                      <Col>
                        <Input
                          placeholder={"Cover Url"}
                          value={newExtra.value}
                          onChange={(e) =>
                            this.setState({
                              newExtra: { ...newExtra, value: e.target.value },
                            })
                          }
                        />
                      </Col>
                      <Col>
                        <Button
                          disabled={newExtra.label ? false : true}
                          icon={<PlusOutlined />}
                          onClick={this.onAddExtra}
                        >
                          Aggiungi extra
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              >
                {allListExtras &&
                  allListExtras.map(({ label, value, icon }) => (
                    <Select.Option key={UUID()} value={value} label={label}>
                      {`${label}`}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          {this.generatePropsFields(fields, p)}
          <Col></Col>
        </Row>

        <Divider />

        <Row gutter={[16, 32]} justify={"center"}>
          <Col span={24}>
            <Badge status="success" text="Live Preview" />
          </Col>
          <Col>
            <Card
              {...s}
              cover={s.cover ? <img alt="example" src={s.cover} /> : null}
              actions={s.actions.map((action) => {
                let { label, value, icon } = s.allListActions.find(
                  (el) => el.value === action
                );
                if (!value) return action;

                if (icon)
                  return DynamicIcon(icon, { style: { fontSize: "20px" } });

                return <a href={value}>{label}</a>;
              })}
              extra={
                <Space split={<Divider type="vertical" />}>
                  {s.extra.map((extraEl) => {
                    let { label, value, icon } = s.allListExtras.find(
                      (el) => el.value === extraEl
                    );
                    if (!value) return extraEl;

                    if (icon)
                      return DynamicIcon(icon, { style: { fontSize: "20px" } });

                    return <a href={value}>{label}</a>;
                  })}
                </Space>
              }
            >
              {s.cardMetaTitle || s.cardMetaDescription ? (
                <Card.Meta
                  /* avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} */
                  title={s.cardMetaTitle || ""}
                  description={s.cardMetaDescription || ""}
                />
              ) : (
                <></>
              )}
              {children}
            </Card>
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
export default connect(mapStateToProps, mapDispatchToProps)(Card_Props);
