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
import ComponentConfiguration from "./StepsForNewConfigurations/Component.configuration";
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
import { DynamicIcon } from "./exportedFromAntd";
import { UUID } from "../assets/extra/extra";
import SummaryStep from "./StepsForNewConfigurations/SummaryStep";
/* STYLES */

const formRef = React.createRef();
class DrawerCreateNewRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null,
    };
  }

  componentDidMount() {
    let p = this.props;
    this.ApiCall(p.config);
  }

  ApiCall = (config) => {
    let self = this;
    this.setState({ loading: true });
    let modConfig = {
      ...config,
    };
    getAxiosFull(modConfig)
      .then((res) => {
        self.setState({ loading: false, data: res.data });
      })
      .catch((error) => {
        console.log(error);
        self.setState({ loading: false, data: null });
      });
  };

  /* injecting data from APi calls into children */
  injectApiPropsIntoChildren(children, APIConfig) {
    let s = this.state;
    let { apiDynamicData, staticData } = APIConfig;

    let dynamicProps = {};
    /* apiDynamicData===true => load data from api */
    /* apiDynamicData===false => load data from staticData */
    if (apiDynamicData) {
      dynamicProps.dataSource = s.data;
      dynamicProps.loading = s.loading;
    } else {
      dynamicProps.dataSource = staticData;
    }

    return React.Children.map(children, (child) => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (React.isValidElement(child)) {
        /* injecting some props to cloned children */
        return React.cloneElement(child, {
          /* existeing props */
          ...child.props,
          /* custom props */
          ...dynamicProps,
        });
      }
      return child;
    });
  }

  /* injecting custom data into children */
  injectCustomPropsIntoChildren(children, s) {
    return React.Children.map(children, (child) => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (React.isValidElement(child)) {
        /* injecting some props to cloned children */
        return React.cloneElement(child, {
          /* existeing props */
          ...child.props,
          /* custom dynamic props (eg icon name into real icons) */
          icon: DynamicIcon(child.props.icon),
        });
      }
      return child;
    });
  }

  CustomInjectManager(s) {
    let p = this.props;
    let { config, fullConfiguration } = p;
    let {
      APIConfig,
      ComponentConfig,
      ComponentCustomization,
      Drawer_CreateNewComponent,
      RowConfig,
      Summary,
    } = fullConfiguration;

    switch (ComponentConfig.componentName) {
      case "Table":
        return this.injectApiPropsIntoChildren(p.children, APIConfig);
      case "Button":
        return this.injectCustomPropsIntoChildren(p.children, s);
      default:
        return p.children;
    }

    /*     return config.url
      ? this.injectApiPropsIntoChildren(p.children, s)
      : this.injectCustomPropsIntoChildren(p.children, s); */
  }

  render() {
    let p = this.props;
    let s = this.state;
    let { config } = p;
    let { data, loading } = s;

    return this.CustomInjectManager(s);
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
export default connect(mapStateToProps, mapDispatchToProps)(DrawerCreateNewRow);
