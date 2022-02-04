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
  Table,
  Select,
  Divider,
  Checkbox,
  Slider,
  Steps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ComponentsList } from "../../../exportedFromAntd";
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
class Table_Props extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allListColumns: [],
      /* list of columns visualized inside select */
      listColumns: [],
      columnName: "",
      columnDataIndex: "",

      ...this.props.defaultSettings,
      ...this.props.Manager.ComponentCustomization,
    };
  }

  onFinish = (values) => {
    let s = this.state;
    let p = this.props;
    let { allListColumns } = s;
    let { currentStep } = p.Manager.Drawer_CreateNewComponent;

    p.SetComponentCustomization_({
      ...values,
      allListColumns,
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

  onAddColumn = () => {
    let s = this.state;
    let p = this.props;
    let { columnName, columnDataIndex, allListColumns } = s;

    let newItem = { columnName, columnDataIndex };
    let allListColumns_ = allListColumns || [];

    /* update of allListColumns maintaining all previous data */
    this.setState({
      allListColumns: [...allListColumns_, newItem],
    });
    /* field reset */
    this.setState({
      columnName: "",
      columnDataIndex: "",
    });

    /* const form = formRef.current;
    form.setFieldsValue({ listColumns: [...listColumns, columnName] }); */
  };

  render() {
    let p = this.props;
    let s = this.state;
    let { columnName, columnDataIndex, allListColumns } = s;

    /* let { allListColumns } = this.props.Manager.ComponentConfig; */
    let { rows } = p.Site.CurrentPage;

    let { componentName, /* children ,*/ defaultSettings, fields } = p;
    let { children } = s;

    /* let { children, fields } = getFullDefaultPropsSettings(componentName); */
    let dataSource = p.Manager.ComponentCustomization;

    let modDataSource = {
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
          name="listColumns"
          label="Seleziona le colonne della tabella"
          tooltip="Seleziona le colonne della tabella, oppure puoi inserire nuove colonne. dataIndex rappresenta il nome della property dentro l'oggetto, a cui è associata la colonna."
          rules={[{ required: true, message: "Please select cols!" }]}
        >
          <Select
            placeholder="Seleziona le colonne della tabella"
            mode="multiple"
            optionLabelProp="label"
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: "4px 0" }} />

                <Row gutter={[24, 8]} style={{ padding: "12px" }}>
                  <Col>
                    <Input
                      placeholder={"Column label"}
                      value={columnName}
                      onChange={(e) =>
                        this.setState({ columnName: e.target.value })
                      }
                    />
                  </Col>
                  <Col>
                    <Input
                      placeholder={"Column dataIndex"}
                      value={columnDataIndex}
                      onChange={(e) =>
                        this.setState({ columnDataIndex: e.target.value })
                      }
                    />
                  </Col>
                  <Col>
                    <Button
                      disabled={columnName && columnDataIndex ? false : true}
                      icon={<PlusOutlined />}
                      onClick={this.onAddColumn}
                    >
                      Aggiungi colonna alla selezione
                    </Button>
                  </Col>
                </Row>
              </div>
            )}
          >
            {allListColumns &&
              allListColumns.map(({ columnDataIndex, columnName }) => (
                <Select.Option
                  key={columnDataIndex}
                  value={columnDataIndex}
                  label={columnName}
                >
                  {`${columnName} | ${columnDataIndex}`}
                </Select.Option>
              ))}
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
    SetComponentCustomization_: (newProps) => {
      dispatch(SetComponentCustomization(newProps));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table_Props);
