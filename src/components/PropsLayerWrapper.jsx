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
/* STEPS CONFIGURATION */
import APIConfiguration from "./StepsForNewConfigurations/API.configuration";
import RowConfiguration from "./StepsForNewConfigurations/Row.configuration";
import ComponentConfiguration from "./StepsForNewConfigurations/Component.customization";
import SummaryConfiguration from "./StepsForNewConfigurations/SummaryStep";
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
class PropsLayerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let p = this.props;
  }

  injectPropsIntoChildren(children, additionalProps) {
    return React.Children.map(children, (child) => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (React.isValidElement(child)) {
        /* injecting some props to cloned children */
        return React.cloneElement(child, {
          ...child.props,
          /* additional props here */
          ...additionalProps,
        });
      }
      return child;
    });
  }

  getCustomProps = (child) => {
    let p = this.props;
    let { name, props, ApiEndpointConfig, fullConfiguration } = p.component;
    
  };

  render() {
    let p = this.props;
    let s = this.state;

    let { name, props, ApiEndpointConfig, fullConfiguration } = p.component;
    let { dataSource, loading } = p;

    return this.injectPropsIntoChildren(p.children, props);
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
export default connect(mapStateToProps, mapDispatchToProps)(PropsLayerWrapper);
