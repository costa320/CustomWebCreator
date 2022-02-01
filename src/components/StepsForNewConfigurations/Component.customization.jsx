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
import { ComponentsList, IconList } from "../exportedFromAntd";
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
import {
  DynamicPropsComponent,
  getDefaultPropsSettings,
  getFullDefaultPropsSettings,
  DidDefaultPropsSettingsExist,
} from "../PropsForComponents/index.export";
/* STYLES */

const formRef = React.createRef();
class ComponentCustomization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentExist: DidDefaultPropsSettingsExist(
        this.props.Manager.ComponentConfig.componentName
      ),
      /* preload dei vari components, per renderli disponibili dopo */
      AntdComponentList: ComponentsList(),
      AntdIconList: IconList(),
      ...this.props.Manager.ComponentCustomization,
    };
  }

  onClickNext = (currentStep, formRef) => {
    let p = this.props;

    p.SetDrawerCreateNewComponent_({
      currentStep: currentStep + 1,
    });
  };

  render() {
    let p = this.props;
    let s = this.state;
    let { AntdComponentList, AntdIconList, componentExist } = s;

    let { currentStep } = p.Manager.Drawer_CreateNewComponent;
    let { componentName } = p.Manager.ComponentConfig;
    let dataSource = p.Manager.ComponentCustomization;
    let { rows } = p.Site.CurrentPage;

    let modDataSource = {
      ...dataSource,
    };

    return (
      <>
        {componentName &&
          DynamicPropsComponent(componentName, {
            ...getFullDefaultPropsSettings(componentName),
            defaultSettings: getDefaultPropsSettings(componentName),
            AntdComponentList,
            AntdIconList,
          })}

        {!componentExist && (
          <Row justify={"end"} style={{ marginTop: "24px" }}>
            <Col>
              <Button
                type={"primary"}
                onClick={() => this.onClickNext(currentStep)}
              >
                Vai avanti
              </Button>
            </Col>
          </Row>
        )}
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
)(ComponentCustomization);
