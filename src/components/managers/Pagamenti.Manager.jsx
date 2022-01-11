import React, { Component } from "react";
/* AXIOS */
import {
  get_All_Pagamenti,
  post_ADD_Pagamento,
  post_Update_Pagamento,
  post_DELETE_Pagamento,
} from "../../axios/tipologiche/axios.pagamenti";
/* REDUX */
import { connect } from "react-redux";
import {
  SetGeneralPagamenti,
  SetManagerPagamenti,
} from "../../redux/actions/managers/Tipologiche.manager.actions";
/* ANTD */
import {
  Row,
  Col,
  Table,
  Button,
  Space,
  Popconfirm,
  Divider,
  Drawer,
  notification,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  RedoOutlined,
  AppstoreAddOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
/* COMPONENTS */
import PageHeader from "../general/PageHeader";
import PagamentiManagerContent from "./Pagamenti.Manager.components/Pagamenti.Manager.Drawer";
/* EXTRA */
import ErrorBoundary from "../Shared/ErrorBoundary";
/* Styles */

class ManagerPagamenti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,

      /* filters and sorters */
      filteredInfo: null,
      sortedInfo: null,
    };
  }

  componentDidMount() {
    this.getListPagamenti();
  }

  SetState = (state, value) => {
    this.setState({ [state]: value });
  };

  openNotificationWithIcon = (type, message = "", description = "") => {
    /* success  info  warning  error */
    notification[type]({
      message: message,
      description: description,
    });
  };

  getListPagamenti = () => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetGeneralPagamenti_({
      loadingElenco: true,
    });
    get_All_Pagamenti(`?skip=0&elements=0`)
      .then((result) => {
        console.log(result);
        p.SetGeneralPagamenti_({
          Elenco: result,
          loadingElenco: false,
        });
        /* reset loadings */
      })
      .catch((error) => {
        console.log(error);
        /* reset loadings */
        p.SetGeneralPagamenti_({
          Elenco: [],
          loadingElenco: false,
        });
      });
  };

  AddPagamento = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_ADD_Pagamento(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of pagamento */
        self.getListPagamenti();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of pagamento */
        self.getListPagamenti();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  UpdatePagamento = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_Update_Pagamento(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of pagamento */
        self.getListPagamenti();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of pagamento */
        self.getListPagamenti();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  DeletePagamento = (row) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_DELETE_Pagamento({ Id: row.Id })
      .then((result) => {
        console.log(result);
        if (result) {
          self.openNotificationWithIcon(
            "success",
            "La cancellazione è avvenuto con successo"
          );
        } else {
          self.openNotificationWithIcon(
            "warning",
            "Attenzione l'elemento selezionato non può essere cancellato, perchè associato ad altri elementi."
          );
        }
        /* update table of pagamento */
        self.getListPagamenti();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "La cancellazione non è stata possibile"
        );
        /* update table of pagamento */
        self.getListPagamenti();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  getColumns = () => {
    let { filteredInfo } = this.state;

    return [
      {
        title: "N°",
        dataIndex: "INDEX",
        key: "INDEX",
        render: (value, row, index) => index + 1,
        width: 60,
      },
      {
        title: "Nome",
        dataIndex: "Name",
        key: "Name",
      },
      {
        title: "Codifica",
        dataIndex: "Codifica",
        key: "Codifica",
      },
      {
        title: "Anticipo",
        dataIndex: "IsAnticipo",
        key: "IsAnticipo",
        align: "center",
        filters: [
          { text: "Anticipo attivo", value: true },
          { text: "Anticipo disattivo", value: false },
        ],
        filteredValue: filteredInfo?.IsAnticipo || null,
        onFilter: (value, record) => record.IsAnticipo === value,
        render: (IsAnticipo) =>
          IsAnticipo ? (
            <CheckOutlined className="tableIcons" style={{ color: "green" }} />
          ) : (
            <CloseOutlined className="tableIcons" style={{ color: "red" }} />
          ),
      },
      {
        title: "Azioni",
        dataIndex: "actions",
        key: "actions",
        width: 110,
        render: (text, row, i) => this.getActionsMenu(row, i),
      },
    ];
  };

  getActionsMenu = (row, i) => {
    return (
      <Space split={<Divider type="vertical" />} size={0}>
        <Button
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => this.handleClickEditPagamento(row, i)}
        />
        <Popconfirm
          title="Sei sicuro di voler cancellare?"
          okText="Si"
          cancelText="No"
          onConfirm={() => this.DeletePagamento(row)}
        >
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    );
  };

  handleClickAddPagamento = () => {
    let p = this.props;

    p.SetGeneralPagamenti_({ drawerVisible: true, drawerInEdit: false });
  };

  handleClickEditPagamento = (row, i) => {
    let p = this.props;
    p.SetGeneralPagamenti_({
      drawerVisible: true,
      drawerInEdit: true,
      managerDrawer: {
        ...row,
      },
    });
  };

  handleDrawerClose = () => {
    let p = this.props;
    this.resetDrawerAndProps();
  };

  resetDrawerAndProps = () => {
    let p = this.props;
    p.SetGeneralPagamenti_({
      drawerVisible: false,
      drawerInEdit: false,
      managerDrawer: {
        Id: null,
        Name: null,
        TipoTicket: null,
        IsEnable: null,
        Codice: null,
        Titolario: null,
      },
    });
  };

  /* SAVE => CREATE AND EDIT */
  handleSavePagamento = (values, drawerInEdit) => {
    if (drawerInEdit) {
      /* call edit */
      this.UpdatePagamento(values);
    } else {
      /* call create */
      this.AddPagamento(values);
    }
  };

  handleTableChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  render() {
    let s = this.state;
    let p = this.props;
    let { Elenco, loadingElenco, managerDrawer, drawerVisible, drawerInEdit } =
      p.Pagamenti;

    return (
      <>
        <PageHeader
          title={"Gestione Pagamenti"}
          subtitle={"Gestione tipologie di pagamenti"}
          extra={[
            <Button
              key="re-chargeTable"
              icon={<RedoOutlined />}
              onClick={this.getListPagamenti}
            >
              Ricarica dati tabella
            </Button>,
            <Button
              key="AddNewPagamento"
              type="primary"
              onClick={this.handleClickAddPagamento}
              icon={<AppstoreAddOutlined />}
            >
              Crea Nuovo Pagamento
            </Button>,
          ]}
        />
        <div
          className="site-layout-content-size site-page-border bck-white"
          style={{ padding: 0 }}
        >
          <Row
            className="site-layout-content-padding"
            style={{ width: "100%" }}
          >
            <Col span={24}>
              <ErrorBoundary>
                <Table
                  columns={this.getColumns()}
                  dataSource={Elenco || []}
                  loading={loadingElenco}
                  pagination={{ position: ["none", "bottomRight"] }}
                  onChange={this.handleTableChange}
                  bordered
                />
              </ErrorBoundary>
            </Col>
          </Row>
        </div>
        <ErrorBoundary>
          <Drawer
            title={
              drawerInEdit
                ? "Modifica di una pagamento"
                : `Creazione di un nuovo pagamento`
            }
            width={736}
            destroyOnClose
            placement="right"
            onClose={this.handleDrawerClose}
            visible={drawerVisible}
            extra={
              <Space>
                <Button onClick={this.handleDrawerClose}>Cancel</Button>
                <Button type="primary" onClick={this.handleDrawerClose}>
                  OK
                </Button>
              </Space>
            }
          >
            <PagamentiManagerContent
              dataSource={managerDrawer}
              drawerInEdit={drawerInEdit}
              salvaDati={this.handleSavePagamento}
            />
          </Drawer>
        </ErrorBoundary>
      </>
    );
  }
}
/* quale reducer vuoi utilizzare qui? solo math */
const mapStateToProps = (state) => {
  return {
    Session: state.SessionREDUCER,
    Pagamenti: state.TipologicheManagerREDUCER.Pagamenti,
  };
};

const mapDispatchToProps = (dispatch) => {
  /* objDati {'stateName':newValue} */
  return {
    SetGeneralPagamenti_: (objDati) => {
      dispatch(SetGeneralPagamenti(objDati));
    },
    SetManagerPagamenti_: (objDati) => {
      dispatch(SetManagerPagamenti(objDati));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManagerPagamenti);
