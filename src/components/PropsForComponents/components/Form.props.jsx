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
  Card,
  Checkbox,
  Slider,
  Steps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  PreviewDynamicComponent,
  ComponentsList,
  FormComponentsList,
} from "../../exportedFromAntd";
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
class Form_Props extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* allowed component inside the form */
      /* list of components visualized inside select */
      FormComponentList: FormComponentsList(),

      FormComposition: [
        {
          name: "Input",
          config: {},
        },
      ],

      ...this.props.Manager.ComponentConfig,
    };
  }

  onAddColumn = () => {
    let s = this.state;
    let p = this.props;
    let { columnName, columnDataIndex } = s;
    let { allListColumns } = p.Manager.ComponentConfig;

    let newItem = { columnName, columnDataIndex };
    let allListColumns_ = allListColumns || [];

    /* update of allListColumns maintaining all previous data */
    p.SetComponentConfig_({
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

  onAddNewFormItem = () => {
    let p = this.props;
    let s = this.state;
    let { compNextToBeAdded } = p.Manager.ComponentConfig;
    let { FormComposition } = s;
    let newFormItem = {
      name: compNextToBeAdded,
      config: {},
    };
    this.setState({ FormComposition: [...FormComposition, newFormItem] });
  };

  render() {
    let p = this.props;
    let s = this.state;
    let { FormComponentList, FormComposition } = s;
    let { componentName, props } = p;

    /* value of selection of the componentDropdown */
    let { compNextToBeAdded } = this.props.Manager.ComponentConfig;
    let { rows } = p.Site.CurrentPage;

    return (
      <>
        <Row gutter={[16, 16]} align="bottom">
          <Col flex="auto">
            <Form.Item
              name="compNextToBeAdded"
              label="Seleziona il componente da aggiungere"
              tooltip="Seleziona le colonne della tabella, oppure puoi inserire nuove colonne. dataIndex rappresenta il nome della property dentro l'oggetto, a cui è associata la colonna."
              rules={[{ required: true, message: "Please select cols!" }]}
            >
              <Select placeholder="Seleziona il componente da aggiungere">
                {FormComponentList &&
                  Object.keys(FormComponentList).map((key) => (
                    <Select.Option key={key} value={key}>
                      {`${key}`}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col flex="100px">
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                type="dashed"
                disabled={!compNextToBeAdded}
                onClick={this.onAddNewFormItem}
              >
                Aggiungi componente
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {/* SECTION ANTEPRIMA FORM */}

        <Card title="Anteprima Form">
          {FormComposition &&
            FormComposition.map((field) => {
              let { name, config } = field;
              return (
                <Form.Item {...config}>
                  {PreviewDynamicComponent(name)}
                </Form.Item>
              );
            })}
        </Card>
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
export default connect(mapStateToProps, mapDispatchToProps)(Form_Props);
