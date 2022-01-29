import React from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetRoutes } from "../redux/actions/Session.actions";
import { SET_CurrentPage } from "../redux/actions/Site.actions";
import { SetDrawerCreateNewComponent } from "../redux/actions/Manager.actions";
/* AXIOS */
import { getAxiosFull } from "../axios/axios.general";
/* ANTD */
import {
  Row,
  Col,
  Tabs,
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
import { ComponentsList } from "./exportedFromAntd";

/* MODELS Constructor */
import {
  _Row,
  _Col,
  _Component,
  _hgutters,
  _vgutters,
} from "../redux/models/Site.model";
/* HELPERS */
import { UUID } from "../assets/extra/extra";
import SummaryStep from "./StepsForNewConfigurations/SummaryStep";
/* STYLES */

const formRef = React.createRef();
class ComponentSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null,
      AntdComponentList: ComponentsList(),
    };
  }

  render() {
    let p = this.props;
    let s = this.state;
    let { config } = p;
    let { data, loading } = s;

    return (
      <>
       
      </>
      // <Form.Item
      //   name="componentName"
      //   label="Seleziona il componente dalla lista"
      //   tooltip="Seleziona il componente che vorresti integrare."
      //   rules={[{ required: true, message: "Please select gender!" }]}
      // >
      //   <Select
      //     placeholder="Seleziona il componente"
      //     showSearch={true}
      //     /* optionFilterProp={"label"} */
      //   >
      //     {AntdComponentList &&
      //       Object.entries(AntdComponentList).map(([key, value]) => {
      //         return (
      //           <Select.Option key={UUID()} value={key}>
      //             {key}
      //           </Select.Option>
      //         );
      //       })}
      //   </Select>
      // </Form.Item>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ComponentSelection);
