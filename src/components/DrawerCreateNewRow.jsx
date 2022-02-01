import React from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetRoutes } from "../redux/actions/Session.actions";
import { SET_CurrentPage } from "../redux/actions/Site.actions";
import {
  RESET_REDUCER_MANAGER,
  SetDrawerCreateNewComponent,
} from "../redux/actions/Manager.actions";
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
import ComponentCustomization from "./StepsForNewConfigurations/Component.customization";
import SummaryStep from "./StepsForNewConfigurations/SummaryStep";
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
/* STYLES */

const formRef = React.createRef();
class DrawerCreateNewRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = () => {};

  onFinishFailed = () => {};

  onClose = () => {
    /* const form = formRef.current;
    form.resetFields(); */
    this.props.RESET_REDUCER_MANAGER_();
  };

  onBack = () => {
    let p = this.props;
    let { currentStep } = p.Manager.Drawer_CreateNewComponent;
    this.props.SetDrawerCreateNewComponent_({
      currentStep: currentStep - 1,
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

  onFieldsChange = (changedFields, allFields) => {
    /*  let p = this.props;
    const form = formRef.current;
    console.log(changedFields);
    form.setFieldsValue();
    p.SetDrawerCreateNewComponent_({ loadingElenco: false }); */
  };

  render() {
    let p = this.props;
    let s = this.props;
    let { visible, dataSource, currentStep } =
      this.props.Manager.Drawer_CreateNewComponent;
    let { rows } = p.Site.CurrentPage;

    let modDataSource = {
      ...dataSource,
    };

    let stepsConfig = [
      {
        stepId: 0,
        title: "Configurazione Riga",
        description: "Selezione riga e la sua configurazione di base.",
        status: null,
        component: RowConfiguration,
      },
      {
        stepId: 1,
        title: "Composizione del componente",
        description:
          "Composizione del componente e configurazione della sua visualizzazione.",
        status: null,
        component: ComponentConfiguration,
      },
      {
        stepId: 2,
        title: "Customizzazione del componente",
        description: "Adattamento del componente ad uno stile grafico",
        status: null,
        component: ComponentCustomization,
      },
      {
        stepId: 3,
        title: "Configurazione delle API.",
        description:
          "Configurazione degli end-point/dati-static da cui il componente sarà alimentato.",
        status: null,
        component: APIConfiguration,
      },
      {
        stepId: 4,
        title: "Riepilogo e test",
        description: "",
        status: null,
        component: SummaryStep,
      },
    ];
    let CurrentDynamicComponent = () => {
      let CurrentComponent = stepsConfig.find(
        ({ stepId }) => stepId === currentStep
      ).component;
      return <CurrentComponent />;
    };

    return (
      <>
        <Drawer
          destroyOnClose
          title="Configuratore"
          width={"80%"}
          onClose={this.onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button
                disabled={currentStep === 0}
                onClick={this.onBack}
                type="primary"
              >
                Indietro
              </Button>
              <Button onClick={this.onClose}>Annulla</Button>
            </Space>
          }
        >
          <Row>
            <Col span={6}>
              <Steps progressDot current={currentStep} direction="vertical">
                {stepsConfig.map(({ title, description }) => (
                  <Steps.Step
                    key={UUID()}
                    title={title}
                    description={description}
                  />
                ))}
              </Steps>
            </Col>
            <Col span={18}>
              <CurrentDynamicComponent />
            </Col>
          </Row>
        </Drawer>
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
    RESET_REDUCER_MANAGER_: () => {
      dispatch(RESET_REDUCER_MANAGER());
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
