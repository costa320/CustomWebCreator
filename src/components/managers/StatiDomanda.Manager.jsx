import React, { Component } from "react";
/* AXIOS */
import {
  get_All_StatiDomanda,
  post_ADD_StatoDomanda,
  post_Update_StatoDomanda,
  post_DELETE_StatoDomanda,
} from "../../axios/tipologiche/axios.statiDomanda";
/* REDUX */
import { connect } from "react-redux";
import {
  SetGeneralStatiDomanda,
  SetManagerStatiDomanda,
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
import StatoDomandaManagerContent from "./StatiDomanda.Manager.components/StatiDomanda.Manager.Drawer";
/* EXTRA */
import ErrorBoundary from "../Shared/ErrorBoundary";
/* Styles */

class ManagerStatiDomanda extends Component {
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
    this.getListStatiDomanda();
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

  getListStatiDomanda = () => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetGeneralStatiDomanda_({
      loadingElenco: true,
    });
    get_All_StatiDomanda(`?skip=0&elements=0`)
      .then((result) => {
        console.log(result);
        p.SetGeneralStatiDomanda_({
          Elenco: result,
          loadingElenco: false,
        });
        /* reset loadings */
      })
      .catch((error) => {
        console.log(error);
        /* reset loadings */
        p.SetGeneralStatiDomanda_({
          Elenco: [],
          loadingElenco: false,
        });
      });
  };

  AddStatoDomanda = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_ADD_StatoDomanda(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of stato domanda */
        self.getListStatiDomanda();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of stato domanda */
        self.getListStatiDomanda();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  UpdateStatoDomanda = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_Update_StatoDomanda(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of stato domanda */
        self.getListStatiDomanda();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of stato domanda */
        self.getListStatiDomanda();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  DeleteStatoDomanda = (row) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_DELETE_StatoDomanda({ Id: row.Id })
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
        /* update table of stato domanda */
        self.getListStatiDomanda();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "La cancellazione non è stata possibile"
        );
        /* update table of stato domanda */
        self.getListStatiDomanda();
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
        title: "Codice",
        dataIndex: "Codice",
        key: "Codice",
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
          onClick={() => this.handleClickEditStatoDomanda(row, i)}
        />
        <Popconfirm
          title="Sei sicuro di voler cancellare?"
          okText="Si"
          cancelText="No"
          onConfirm={() => this.DeleteStatoDomanda(row)}
        >
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    );
  };

  handleClickAddStatoDomanda = () => {
    let p = this.props;

    p.SetGeneralStatiDomanda_({ drawerVisible: true, drawerInEdit: false });
  };

  handleClickEditStatoDomanda = (row, i) => {
    let p = this.props;
    p.SetGeneralStatiDomanda_({
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
    p.SetGeneralStatiDomanda_({
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
  handleSaveStatoDomanda = (values, drawerInEdit) => {
    if (drawerInEdit) {
      /* call edit */
      this.UpdateStatoDomanda(values);
    } else {
      /* call create */
      this.AddStatoDomanda(values);
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
      p.StatiDomanda;

    return (
      <>
        <PageHeader
          title={"Gestione Stati Domanda"}
          subtitle={"Gestione tipologie di stati domanda"}
          extra={[
            <Button
              key="re-chargeTable"
              icon={<RedoOutlined />}
              onClick={this.getListStatiDomanda}
            >
              Ricarica dati tabella
            </Button>,
            <Button
              key="AddNewStatoDomanda"
              type="primary"
              onClick={this.handleClickAddStatoDomanda}
              icon={<AppstoreAddOutlined />}
            >
              Crea Nuova StatoDomanda
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
                ? "Modifica di una stato domanda"
                : `Creazione di una stato domanda nuova`
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
            <StatoDomandaManagerContent
              dataSource={managerDrawer}
              drawerInEdit={drawerInEdit}
              salvaDati={this.handleSaveStatoDomanda}
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
    StatiDomanda: state.TipologicheManagerREDUCER.StatiDomanda,
  };
};

const mapDispatchToProps = (dispatch) => {
  /* objDati {'stateName':newValue} */
  return {
    SetGeneralStatiDomanda_: (objDati) => {
      dispatch(SetGeneralStatiDomanda(objDati));
    },
    SetManagerStatiDomanda_: (objDati) => {
      dispatch(SetManagerStatiDomanda(objDati));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerStatiDomanda);
