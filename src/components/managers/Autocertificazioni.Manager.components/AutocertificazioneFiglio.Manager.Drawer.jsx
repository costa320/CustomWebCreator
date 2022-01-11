import React, { Component } from "react";
/* ANTD */
import {
  Form,
  Input,
  Button,
  Switch,
  DatePicker,
  Row,
  Col,
  Drawer,
  Select,
} from "antd";
import {
  SaveOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
/* REDUX */
import { connect } from "react-redux";
/* COMPONENTS */
import DraggableTable from "../../general/DraggableTable";
/* EXTRA */
import ErrorBoundary from "../../Shared/ErrorBoundary";
/* MOMENT */
import moment from "moment";
import locale from "antd/es/date-picker/locale/it_IT";
/* Styles */

class ManagerAutocertificazioniDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      loading: false,

      /* dataMeanwhile user is editing them */
      data: {},
      /* figli dell'autocertificazione */
      children: [],

      /* drawerChild */

      drawerChildVisible: false,
      drawerChildInEdit: false,

      /* moment */
      LF: "DD/MM/YYYY",
    };
  }

  componentDidMount() {
    let p = this.props;
    let { Children } = p.dataSource;
    this.setState({
      children: Children && Children.length > 0 ? Children : [],
    });
  }

  onFinish = (values) => {
    let p = this.props;
    let s = this.state;
    let { drawerInEdit, Autocertificazioni, ElencoCausali } = p;
    let { managerAutocertificazione } = Autocertificazioni;
    let { LF } = s;

    let { rangePickerDataDalAl } = values;

    /* re-arranging obj by standard */
    let ModValues = {
      ...values,
      FK_Autocertificazione: managerAutocertificazione.Id,
      InizioValidita: rangePickerDataDalAl[0].format(LF),
      FineValidita: rangePickerDataDalAl[1].format(LF),
      Order: managerAutocertificazione.Children.length + 1,
      TipoCausale: ElencoCausali.find(({ Id }) => Id === values.IdTipoCausale)
        .Name,
    };

    /* removing temporary properties */
    delete ModValues.rangePickerDataDalAl;

    this.setState({ loading: true });
    p.handleSaveAutocertificazioneChild(ModValues, drawerInEdit);
    console.log("Success:", ModValues);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handleValuesChange = (changedValues, allValues) => {
    this.setState({ data: allValues });
  };

  handleDrawerChildOpen = (drawerInEdit = false) => {
    if (drawerInEdit) {
      this.setState({
        drawerChildVisible: true,
        drawerChildInEdit: true,
      });
    } else {
      this.setState({
        drawerChildVisible: true,
      });
    }
  };

  handleDrawerChildClose = () => {
    this.drawerChildReset();
  };

  drawerChildReset = () => {
    this.setState({
      drawerChildVisible: false,
      drawerChildInEdit: false,
    });
  };

  render() {
    let s = this.state;
    let p = this.props;
    let { LF } = s;
    /* dataMeanwhile user is editing them */
    /* let { KeyPage, Message, Title } = s.data; */

    /* dataSource is init values */
    let { drawerInEdit, dataSource, ElencoCausali } = p;
    let {
      Id,
      Testo,
      Order,
      IsEnabled,
      Group,
      FK_Autocertificazione,
      IdTipoCausale,
      TipoCausale,
      InizioValidita,
      FineValidita,
    } = dataSource;

    let modDataSource = {
      ...dataSource,
      rangePickerDataDalAl: [
        InizioValidita ? moment(InizioValidita, LF) : null,
        FineValidita ? moment(FineValidita, LF) : null,
      ],
    };

    return (
      <Form
        name="messageForm"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={modDataSource}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
        onValuesChange={this.handleValuesChange}
      >
        {String(Id) && (
          <Form.Item label="Id" name="Id" hidden>
            <Input />
          </Form.Item>
        )}

        {String(Order) && (
          <Form.Item label="Order" name="Order" hidden>
            <Input />
          </Form.Item>
        )}
        {String(Group) && (
          <Form.Item label="Group" name="Group" hidden>
            <Input />
          </Form.Item>
        )}
        {String(FK_Autocertificazione) && (
          <Form.Item
            label="FK_Autocertificazione"
            name="FK_Autocertificazione"
            hidden
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item label="TipoCausale" name="TipoCausale" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Tipo Casuale"
          name="IdTipoCausale"
          rules={[
            { required: true, message: "Per favore, immetti un valore!" },
          ]}
        >
          <Select defaultActiveFirstOption={false}>
            {ElencoCausali &&
              ElencoCausali.map((causale) => (
                <Select.Option value={causale.Id}>{causale.Name}</Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Descrizione"
          name="Testo"
          rules={[
            { required: true, message: "Per favore, immetti un valore!" },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Data dal - al"
          name={"rangePickerDataDalAl"}
          rules={[
            { type: "array", required: true, message: "Please select date!" },
          ]}
        >
          <DatePicker.RangePicker locale={locale} format={LF} />
        </Form.Item>

        <Form.Item label="Abilitato" name="IsEnabled" valuePropName={"checked"}>
          <Switch />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Row justify={"end"}>
            <Col>
              <Button
                loading={s.loading}
                size={"large"}
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
              >
                Salva
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    );
  }

  getChildrenTableColumns = (ElencoCausali) => {
    let s = this.state;
    let { LF } = s;

    return [
      {
        title: "Testo",
        dataIndex: "Testo",
        className: "drag-visible",
      },
      {
        title: "Attivo",
        dataIndex: "IsEnabled",
        align: "center",
        render: (IsEnabled) =>
          IsEnabled ? (
            <CheckOutlined className="tableIcons" style={{ color: "green" }} />
          ) : (
            <CloseOutlined className="tableIcons" style={{ color: "red" }} />
          ),
      },
      {
        title: "Tipo Causale",
        dataIndex: "IdTipoCausale",
        render: (value, row) => {
          return (
            ElencoCausali.find(({ Id }) => String(Id) === String(value))
              ?.Name || "-"
          );
        },
      },
      {
        title: "Inizio Validita",
        dataIndex: "InizioValidita",
        render: (value, row) => moment(value, LF).format(LF),
      },
      {
        title: "Fine Validita",
        dataIndex: "FineValidita",
        render: (value, row) => moment(value, LF).format(LF),
      },
    ];
  };
}
/* quale reducer vuoi utilizzare qui? solo math */
const mapStateToProps = (state) => {
  return {
    Session: state.SessionREDUCER,
    Autocertificazioni: state.AutocertificazioniManagerREDUCER,
  };
};

const mapDispatchToProps = (dispatch) => {
  /* objDati {'stateName':newValue} */
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerAutocertificazioniDrawer);
