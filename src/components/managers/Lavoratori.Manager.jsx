import React, { Component } from "react";
/* AXIOS */
import {
  get_All_Lavoratori,
  post_ADD_Lavoratore,
  post_Update_Lavoratore,
  post_DELETE_Lavoratore,
} from "../../axios/tipologiche/axios.lavoratori";
/* REDUX */
import { connect } from "react-redux";
import {
  SetGeneralLavoratori,
  SetManagerLavoratori,
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
import LavoratoreManagerContent from "./Lavoratori.Manager.components/Lavoratori.Manager.Drawer";
/* EXTRA */
import ErrorBoundary from "../Shared/ErrorBoundary";
/* Styles */

class ManagerLavoratori extends Component {
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
    this.getListLavoratori();
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

  getListLavoratori = () => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetGeneralLavoratori_({
      loadingElenco: true,
    });
    get_All_Lavoratori(`?skip=0&elements=0`)
      .then((result) => {
        console.log(result);
        p.SetGeneralLavoratori_({
          Elenco: result,
          loadingElenco: false,
        });
        /* reset loadings */
      })
      .catch((error) => {
        console.log(error);
        /* reset loadings */
        p.SetGeneralLavoratori_({
          Elenco: [],
          loadingElenco: false,
        });
      });
  };

  AddLavoratore = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_ADD_Lavoratore(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of lavoratore */
        self.getListLavoratori();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of lavoratore */
        self.getListLavoratori();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  UpdateLavoratore = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_Update_Lavoratore(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of lavoratore */
        self.getListLavoratori();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of lavoratore */
        self.getListLavoratori();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  DeleteLavoratore = (row) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_DELETE_Lavoratore({ Id: row.IdTipoLavoratore })
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
        /* update table of lavoratore */
        self.getListLavoratori();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "La cancellazione non è stata possibile"
        );
        /* update table of lavoratore */
        self.getListLavoratori();
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
        title: "Tipo Lavoratore",
        dataIndex: "IdTipoLavoratore",
        key: "IdTipoLavoratore",
      },
      {
        title: "Descrizione",
        dataIndex: "Descrizione",
        key: "Descrizione",
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
          onClick={() => this.handleClickEditLavoratore(row, i)}
        />
        <Popconfirm
          title="Sei sicuro di voler cancellare?"
          okText="Si"
          cancelText="No"
          onConfirm={() => this.DeleteLavoratore(row)}
        >
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    );
  };

  handleClickAddLavoratore = () => {
    let p = this.props;

    p.SetGeneralLavoratori_({ drawerVisible: true, drawerInEdit: false });
  };

  handleClickEditLavoratore = (row, i) => {
    let p = this.props;
    p.SetGeneralLavoratori_({
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
    p.SetGeneralLavoratori_({
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
  handleSaveLavoratore = (values, drawerInEdit) => {
    if (drawerInEdit) {
      /* call edit */
      this.UpdateLavoratore(values);
    } else {
      /* call create */
      this.AddLavoratore(values);
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
      p.Lavoratori;

    return (
      <>
        <PageHeader
          title={"Gestione Lavoratori"}
          subtitle={"Gestione tipologie di lavoratori"}
          extra={[
            <Button
              key="re-chargeTable"
              icon={<RedoOutlined />}
              onClick={this.getListLavoratori}
            >
              Ricarica dati tabella
            </Button>,
            <Button
              key="AddNewLavoratore"
              type="primary"
              onClick={this.handleClickAddLavoratore}
              icon={<AppstoreAddOutlined />}
            >
              Crea Nuova Lavoratore
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
                ? "Modifica di una lavoratore"
                : `Creazione di una lavoratore nuova`
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
            <LavoratoreManagerContent
              dataSource={managerDrawer}
              drawerInEdit={drawerInEdit}
              salvaDati={this.handleSaveLavoratore}
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
    Lavoratori: state.TipologicheManagerREDUCER.Lavoratori,
  };
};

const mapDispatchToProps = (dispatch) => {
  /* objDati {'stateName':newValue} */
  return {
    SetGeneralLavoratori_: (objDati) => {
      dispatch(SetGeneralLavoratori(objDati));
    },
    SetManagerLavoratori_: (objDati) => {
      dispatch(SetManagerLavoratori(objDati));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManagerLavoratori);
