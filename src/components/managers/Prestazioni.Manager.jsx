import React, { Component } from "react";
/* AXIOS */
import {
  get_All_Prestazioni,
  post_ADD_Prestazione,
  post_Update_Prestazione,
  post_Delete_Prestazione,
} from "../../axios/tipologiche/axios.prestazioni";
/* REDUX */
import { connect } from "react-redux";
import {
  SetGeneralPrestazioni,
  SetManagerPrestazioni,
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
import PrestazioneManagerContent from "./Prestazioni.Manager.components/Prestazioni.Manager.Drawer";
/* EXTRA */
import ErrorBoundary from "../Shared/ErrorBoundary";
/* Styles */

class ManagerPrestazioni extends Component {
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
    this.getListPrestazioni();
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

  getListPrestazioni = () => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetGeneralPrestazioni_({
      loadingElenco: true,
    });
    get_All_Prestazioni(`?skip=0&elements=0`)
      .then((result) => {
        console.log(result);
        p.SetGeneralPrestazioni_({
          Elenco: result,
          loadingElenco: false,
        });
        /* reset loadings */
      })
      .catch((error) => {
        console.log(error);
        /* reset loadings */
        p.SetGeneralPrestazioni_({
          Elenco: [],
          loadingElenco: false,
        });
      });
  };

  AddPrestazione = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_ADD_Prestazione(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of prestazione */
        self.getListPrestazioni();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of prestazione */
        self.getListPrestazioni();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  UpdatePrestazione = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_Update_Prestazione(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of prestazione */
        self.getListPrestazioni();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of prestazione */
        self.getListPrestazioni();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  DeletePrestazione = (row) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_Delete_Prestazione({ Id: row.Id })
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
        /* update table of prestazione */
        self.getListPrestazioni();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "La cancellazione non è stata possibile"
        );
        /* update table of prestazione */
        self.getListPrestazioni();
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
        title: "Tipologia Ticket",
        dataIndex: "TipoTicket",
        key: "TipoTicket",
      },
      {
        title: "Abilitato",
        dataIndex: "IsEnable",
        key: "IsEnable",
        align: "center",
        filters: [
          { text: "Attivo", value: true },
          { text: "Disattivo", value: false },
        ],
        filteredValue: filteredInfo?.IsEnable || null,
        onFilter: (value, record) => record.IsEnable === value,
        render: (IsEnable) =>
          IsEnable ? (
            <CheckOutlined className="tableIcons" style={{ color: "green" }} />
          ) : (
            <CloseOutlined className="tableIcons" style={{ color: "red" }} />
          ),
      },
      {
        title: "Codice",
        dataIndex: "Codice",
        key: "Codice",
      },
      {
        title: "Titolario",
        dataIndex: "Titolario",
        key: "Titolario",
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
          onClick={() => this.handleClickEditPrestazione(row, i)}
        />
        <Popconfirm
          title="Sei sicuro di voler cancellare?"
          okText="Si"
          cancelText="No"
          onConfirm={() => this.DeletePrestazione(row)}
        >
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    );
  };

  handleClickAddPrestazione = () => {
    let p = this.props;

    p.SetGeneralPrestazioni_({ drawerVisible: true, drawerInEdit: false });
  };

  handleClickEditPrestazione = (row, i) => {
    let p = this.props;
    p.SetGeneralPrestazioni_({
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
    p.SetGeneralPrestazioni_({
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
  handleSavePrestazione = (values, drawerInEdit) => {
    if (drawerInEdit) {
      /* call edit */
      this.UpdatePrestazione(values);
    } else {
      /* call create */
      this.AddPrestazione(values);
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
      p.Prestazioni;

    return (
      <>
        <PageHeader
          title={"Gestione Prestazioni"}
          subtitle={"Gestione tipologie di prestazioni"}
          extra={[
            <Button
              key="re-chargeTable"
              icon={<RedoOutlined />}
              onClick={this.getListPrestazioni}
            >
              Ricarica dati tabella
            </Button>,
            <Button
              key="AddNewPrestazione"
              type="primary"
              onClick={this.handleClickAddPrestazione}
              icon={<AppstoreAddOutlined />}
            >
              Crea Nuova Prestazione
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
                ? "Modifica di una prestazione"
                : `Creazione di una prestazione nuova`
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
            <PrestazioneManagerContent
              dataSource={managerDrawer}
              drawerInEdit={drawerInEdit}
              salvaDati={this.handleSavePrestazione}
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
    Prestazioni: state.TipologicheManagerREDUCER.Prestazioni,
  };
};

const mapDispatchToProps = (dispatch) => {
  /* objDati {'stateName':newValue} */
  return {
    SetGeneralPrestazioni_: (objDati) => {
      dispatch(SetGeneralPrestazioni(objDati));
    },
    SetManagerPrestazioni_: (objDati) => {
      dispatch(SetManagerPrestazioni(objDati));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManagerPrestazioni);
