import React from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetRoutes } from "../../redux/actions/Session.actions";
import { SET_CurrentPage } from "../../redux/actions/Site.actions";
import {
  SetDrawerCreateNewComponent,
  SetRowConfig,
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
} from "../../redux/models/Site.model";
/* HELPERS */
import { UUID } from "../../assets/extra/extra";
/* STYLES */

const formRef = React.createRef();
class RowConfigurator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.Manager.RowConfig,
    };
  }

  onFinish = (values) => {
    let s = this.state;
    let p = this.props;
    let { currentStep } = p.Manager.Drawer_CreateNewComponent;

    p.SetRowConfig_({
      ...values,
    });
    this.onClickNext(currentStep);
  };

  onFinishFailed = () => {};

  onFieldsChange = (changedFields, allFields) => {
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

  onAddRow = () => {
    let p = this.props;
    const currentRows = p.Site.CurrentPage.rows;
    const tempRows = [...currentRows, new _Row(currentRows.length++)];
    p.SET_CurrentPage_({ rows: tempRows });
    p.SetDrawerCreateNewComponent_({
      dataSource: tempRows[tempRows.length - 1],
    });
  };

  onClickNext = (currentStep) => {
    let p = this.props;

    p.SetDrawerCreateNewComponent_({
      currentStep: currentStep + 1,
    });
  };

  render() {
    let p = this.props;
    let s = this.state;
    let { row_id } = s;
    let dataSource = p.Manager.RowConfig;
    let { rows } = p.Site.CurrentPage;

    let modDataSource = {
      ...dataSource,
    };

    let cols = s.row_id
      ? rows.find(({ row_id }) => row_id === s.row_id).cols
      : [];

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
          name="row_id"
          label="Seleziona la riga"
          tooltip="Seleziona la riga su cui vorrai inserire il componente, o creane una nuova."
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select
            placeholder="Seleziona la riga"
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: "4px 0" }} />
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    padding: 8,
                  }}
                >
                  <Button onClick={this.onAddRow} icon={<PlusOutlined />}>
                    Aggiungi Riga
                  </Button>
                </div>
              </div>
            )}
          >
            {rows.map((row) => {
              return (
                <Select.Option key={UUID()} value={row.row_id}>
                  {row.row_id}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="col_id"
          label="Seleziona la colonna"
          tooltip="Seleziona la colonna su cui vorrai inserire il componente, o creane una nuova."
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="Seleziona la riga">
            {cols &&
              cols.map((col) => {
                return (
                  <Select.Option key={UUID()} value={col.col_id}>
                    {col.col_id}
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
    SetRowConfig_: (newProps) => {
      dispatch(SetRowConfig(newProps));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RowConfigurator);
