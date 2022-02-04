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
import {
  ComponentsList,
  IconList,
  DynamicIcon,
} from "../../../exportedFromAntd";
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
class Button_wrapperViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.fullConfiguration,
    };
  }

  render() {
    let p = this.props;
    let s = this.state;

    /* asynch/synch data from apiLayer */
    let { data, loading } = p;

    let { children, icon } = s.ComponentCustomization;

    return (
      <Button {...s.ComponentCustomization} icon={icon && DynamicIcon(icon)}>
        {children}
      </Button>
    );
  }
}
/* quale reducer vuoi utilizzare qui? solo math */
const mapStateToProps = (state) => {
  return {
    Session: state.SessionREDUCER,
    /*   Router: state.router,
    Site: state.SiteREDUCER,
    Manager: state.ManagerREDUCER, */
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    SetRoutes_: (routes) => {
      dispatch(SetRoutes(routes));
    },
    /*  SetDrawerCreateNewComponent_: (newProps) => {
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
    }, */
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button_wrapperViewer);
