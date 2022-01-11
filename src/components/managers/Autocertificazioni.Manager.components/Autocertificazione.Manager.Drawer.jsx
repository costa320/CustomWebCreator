import React, { Component } from "react";
/* ANTD */
import {
  Form,
  Input,
  Button,
  Switch,
  Select,
  Result,
  Divider,
  Space,
  Row,
  Col,
  Popconfirm,
  InputNumber,
} from "antd";
import {
  SaveOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
/* REDUX */
import { connect } from "react-redux";
import {
  SetDatiRedux,
  SetManagerAutocertificazione,
  SetManagerAutocertificazioneChild,
} from "../../../redux/actions/managers/Autocertificazioni.manager.actions";

/* COMPONENTS */
import DraggableTable from "../../general/DraggableTable";
/* EXTRA */
import ErrorBoundary from "../../Shared/ErrorBoundary";
import moment from "moment";
/* Styles */

class ManagerAutocertificazioniDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,

      /* moment format */
      LF: "DD/MM/YYYY",

      /* dataMeanwhile user is editing them */
      data: {},

      /* drawerChild */

      drawerChildVisible: false,
      drawerChildInEdit: false,
    };
  }

  componentDidMount() {
    let p = this.props;
    let { Children } = p.dataSource;
    p.SetManagerAutocertificazione_({
      Children: Children && Children.length > 0 ? Children : [],
    });
  }

  onFinish = (values) => {
    let p = this.props;
    let s = this.state;
    let { drawerInEdit } = p;

    p.salvaDati(values, drawerInEdit);
    p.SetManagerAutocertificazione_({ ...values });
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handleValuesChange = (changedValues, allValues) => {
    this.setState({ data: allValues });
  };

  render() {
    let s = this.state;
    let p = this.props;
    /* dataMeanwhile user is editing them */
    /* let { KeyPage, Message, Title } = s.data; */

    /* dataSource is init values */
    let { drawerInEdit, drawerLoading, dataSource, ElencoCausali } = p;
    let {
      Id,
      Description,
      Required,
      IsEnabled,
      Type,
      Order,
      Group,
      TipoCausale,
      Children,
    } = dataSource;

    return (
      <Form
        name="messageForm"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={dataSource}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
        onValuesChange={this.handleValuesChange}
      >
        {Id && (
          <Form.Item label="Id" name="Id" hidden>
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label="Descrizione"
          name="Description"
          rules={[{ required: true, message: "Per favore, immetti un valore!" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Tipo Campo"
          name="Type"
          rules={[{ required: true, message: "Per favore, immetti un valore!" }]}
        >
          <Select defaultActiveFirstOption={false}>
            <Select.Option value={"CheckBox"}>
              Casella di controllo
            </Select.Option>
            <Select.Option value={"RadioButton"}>Bottoni Radio</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Ordinamento"
          name="Order"
          rules={[{ required: true, message: "Per favore, immetti un valore!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Abilitato" name="IsEnabled" valuePropName={"checked"}>
          <Switch />
        </Form.Item>

        <Form.Item
          label="Obbligatorio"
          name="Required"
          valuePropName={"checked"}
        >
          <Switch />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Row justify={"end"}>
            <Col>
              <Button
                loading={drawerLoading}
                size={"large"}
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                /* disabled={!Id} */
              >
                {Id ? "Salva" : "Continua"}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Divider />

        {Id && (
          <>
            <Form.Item
              label=""
              name=""
              wrapperCol={{ span: 24 }}
              hidden={Children.length}
            >
              <Result
                status="warning"
                title="All'interno di questa autocertificazioni non esistono elementi."
                subTitle="Per procedere bisogna aggiungere almeno un elemento all'autocertificazione."
                extra={
                  <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    key="console"
                    onClick={this.handleAddUpdateChild}
                  >
                    Aggiungi Elemento
                  </Button>
                }
              />
            </Form.Item>

            <Form.Item
              label=""
              name=""
              wrapperCol={{ span: 24 }}
              hidden={!Children.length}
            >
              <Row justify={"end"}>
                <Col>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={this.handleAddUpdateChild}
                  >
                    Aggiungi Elemento
                  </Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              label=""
              name=""
              wrapperCol={{ span: 24 }}
              hidden={!Children.length}
            >
              <ErrorBoundary>
                <DraggableTable
                  dataSource={Children}
                  columns={this.getChildrenTableColumns(ElencoCausali || [])}
                  extraTableProps={{
                    bordered: true,
                  }}
                  onSortEnd={(newData) =>
                    p.SetManagerAutocertificazione_({ Children: newData })
                  }
                />
              </ErrorBoundary>
            </Form.Item>
          </>
        )}
      </Form>
    );
  }

  getChildrenTableColumns = (ElencoCausali) => {
    let s = this.state;
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
        render: (value, row) =>
          value ? moment(value, s.LF).format(s.LF) : "-",
      },
      {
        title: "Fine Validita",
        dataIndex: "FineValidita",
        render: (value, row) =>
          value ? moment(value, s.LF).format(s.LF) : "-",
      },
      {
        title: "Azioni",
        dataIndex: "actions",
        key: "actions",
        align: "center",
        width: 110,
        render: (text, row, i) => this.getActionsMenuChildTable(row, i),
      },
    ];
  };

  getActionsMenuChildTable = (row, i) => {
    return (
      <Space split={<Divider type="vertical" />} size={0}>
        <Button
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => this.handleAddUpdateChild(row, true)}
        />
        <Popconfirm
          title="Sei sicuro di voler cancellare?"
          okText="Si"
          cancelText="No"
          onConfirm={() => this.handleDeleteChild(row, i)}
        >
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    );
  };

  handleAddUpdateChild = (rowInEditData, rowInEdit = false) => {
    let p = this.props;
    let { Id } = p.dataSource;
    if (rowInEdit) {
      p.SetDatiRedux_({
        drawerChildVisible: true,
        drawerChildInEdit: rowInEdit,
        managerChildAutocertificazione: {
          ...rowInEditData,
          FK_Autocertificazione: Id,
        },
      });
    } else {
      p.SetManagerAutocertificazioneChild_({
        FK_Autocertificazione: Id,
      });
      p.SetDatiRedux_({
        drawerChildVisible: true,
        drawerChildInEdit: false,
      });
    }
  };

  handleDeleteChild = (row, index) => {
    let p = this.props;
    p.DeleteChildAutocertificazione(row, index);
  };
}
/* quale reducer vuoi utilizzare qui? solo math */
const mapStateToProps = (state) => {
  return {
    Session: state.SessionREDUCER,
    Autocertificazioni: state.AutocertificazioniManagerREDUCER,
    Causali: state.TipologicheManagerREDUCER.Causali,
  };
};

const mapDispatchToProps = (dispatch) => {
  /* objDati {'stateName':newValue} */
  return {
    SetDatiRedux_: (objDati) => {
      dispatch(SetDatiRedux(objDati));
    },
    SetManagerAutocertificazione_: (objDati) => {
      dispatch(SetManagerAutocertificazione(objDati));
    },
    SetManagerAutocertificazioneChild_: (objDati) => {
      dispatch(SetManagerAutocertificazioneChild(objDati));
    },
    SetGeneralCausali_: (objDati) => {
      dispatch(SetGeneralCausali(objDati));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerAutocertificazioniDrawer);
