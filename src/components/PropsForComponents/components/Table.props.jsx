import React from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetRoutes } from "../../../redux/actions/Session.actions";
import { SET_CurrentPage } from "../../../redux/actions/Site.actions";
import {
  SetDrawerCreateNewComponent,
  SetComponentConfig,
} from "../../../redux/actions/Manager.actions";
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
import { ComponentsList } from "../../exportedFromAntd";
/* MODELS Constructor */
import {
  _Row,
  _Col,
  _Component,
  _hgutters,
  _vgutters,
} from "../../../redux/models/Site.model";
/* HELPERS */
import { UUID } from "../../../assets/extra/extra";
/* STYLES */

const formRef = React.createRef();
class Table_Props extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listColumns: [],
      allListColumns: [],
      newColumnName: "",
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
    /*     p.SetComponentConfig_({
      ...p.Manager.Drawer_CreateNewComponent,
      ...temp_obj,
    }); */
    /*  let p = this.props;
    const form = formRef.current;
    console.log(changedFields);
    form.setFieldsValue();
    p.SetDrawerCreateNewComponent_({ loadingElenco: false }); */
  };

  onAddColumn = () => {
    let s = this.state;
    let { allListColumns, newColumnName } = s;
    this.setState({
      allListColumns: [...allListColumns, newColumnName],
      newColumnName: "",
    });
    /* const form = formRef.current;
    form.setFieldsValue({ listColumns: [...listColumns, newColumnName] }); */
  };

  render() {
    let p = this.props;
    let s = this.state;
    let { listColumns, allListColumns, newColumnName } = s;
    let { componentName, props } = p;

    let { visible, dataSource, currentStep } =
      this.props.Manager.Drawer_CreateNewComponent;
    let { rows } = p.Site.CurrentPage;

    let modDataSource = {
      ...dataSource,
    };

    return (
      <>
        <Form.Item
          name="listColumns"
          label="Seleziona le colonne della tabella"
          tooltip="Seleziona le colonne della tabella, oppure puoi inserire nuove colonne."
          rules={[{ required: true, message: "Please select cols!" }]}
        >
          <Select
            placeholder="Seleziona le colonne della tabella"
            mode="multiple"
            /* optionFilterProp={"label"} */
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: "4px 0" }} />
                <div
                  style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}
                >
                  <Input
                    style={{ flex: "auto" }}
                    value={newColumnName}
                    onChange={(e) =>
                      this.setState({ newColumnName: e.target.value })
                    }
                  />
                  <a
                    style={{
                      flex: "none",
                      padding: "8px",
                      display: "block",
                      cursor: "pointer",
                    }}
                    onClick={this.onAddColumn}
                  >
                    <PlusOutlined /> Add item
                  </a>
                </div>
              </div>
            )}
          >
            {allListColumns &&
              allListColumns.map((item) => (
                <Select.Option key={item}>{item}</Select.Option>
              ))}
          </Select>
        </Form.Item>
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
export default connect(mapStateToProps, mapDispatchToProps)(Table_Props);
