import React, { Component } from "react";
/* AXIOS */
import {
  get_All_Domande,
  post_ADD_Domanda,
  post_Update_Domanda,
  post_DELETE_Domanda,
} from "../../axios/tipologiche/axios.domande";
/* REDUX */
import { connect } from "react-redux";
import {
  SetGeneralDomande,
  SetManagerDomande,
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
import DomandaManagerContent from "./Domande.Manager.components/Domande.Manager.Drawer";
/* EXTRA */
import ErrorBoundary from "../Shared/ErrorBoundary";
/* Styles */

class ManagerDomande extends Component {
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
    this.getListDomande();
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

  getListDomande = () => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetGeneralDomande_({
      loadingElenco: true,
    });
    get_All_Domande(`?skip=0&elements=0`)
      .then((result) => {
        console.log(result);
        p.SetGeneralDomande_({
          Elenco: result,
          loadingElenco: false,
        });
        /* reset loadings */
      })
      .catch((error) => {
        console.log(error);
        /* reset loadings */
        p.SetGeneralDomande_({
          Elenco: [],
          loadingElenco: false,
        });
      });
  };

  AddDomanda = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_ADD_Domanda(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of domanda */
        self.getListDomande();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of domanda */
        self.getListDomande();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  UpdateDomanda = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_Update_Domanda(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of domanda */
        self.getListDomande();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of domanda */
        self.getListDomande();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  DeleteDomanda = (row) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_DELETE_Domanda({ Id: row.Id })
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
        /* update table of domanda */
        self.getListDomande();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "La cancellazione non è stata possibile"
        );
        /* update table of domanda */
        self.getListDomande();
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
          onClick={() => this.handleClickEditDomanda(row, i)}
        />
        <Popconfirm
          title="Sei sicuro di voler cancellare?"
          okText="Si"
          cancelText="No"
          onConfirm={() => this.DeleteDomanda(row)}
        >
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    );
  };

  handleClickAddDomanda = () => {
    let p = this.props;

    p.SetGeneralDomande_({ drawerVisible: true, drawerInEdit: false });
  };

  handleClickEditDomanda = (row, i) => {
    let p = this.props;
    p.SetGeneralDomande_({
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
    p.SetGeneralDomande_({
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
  handleSaveDomanda = (values, drawerInEdit) => {
    if (drawerInEdit) {
      /* call edit */
      this.UpdateDomanda(values);
    } else {
      /* call create */
      this.AddDomanda(values);
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
      p.Domande;

    return (
      <>
        <PageHeader
          title={"Gestione Domande"}
          subtitle={"Gestione tipologie di domande"}
          extra={[
            <Button
              key="re-chargeTable"
              icon={<RedoOutlined />}
              onClick={this.getListDomande}
            >
              Ricarica dati tabella
            </Button>,
            <Button
              key="AddNewDomanda"
              type="primary"
              onClick={this.handleClickAddDomanda}
              icon={<AppstoreAddOutlined />}
            >
              Crea Nuova Domanda
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
                ? "Modifica di una domanda"
                : `Creazione di una domanda nuova`
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
            <DomandaManagerContent
              dataSource={managerDrawer}
              drawerInEdit={drawerInEdit}
              salvaDati={this.handleSaveDomanda}
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
    Domande: state.TipologicheManagerREDUCER.Domande,
  };
};

const mapDispatchToProps = (dispatch) => {
  /* objDati {'stateName':newValue} */
  return {
    SetGeneralDomande_: (objDati) => {
      dispatch(SetGeneralDomande(objDati));
    },
    SetManagerDomande_: (objDati) => {
      dispatch(SetManagerDomande(objDati));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManagerDomande);
