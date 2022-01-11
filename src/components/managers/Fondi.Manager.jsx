import React, { Component } from "react";
/* AXIOS */
import {
  get_All_Fondi,
  post_ADD_Fondo,
  post_Update_Fondo,
  post_DELETE_Fondo,
} from "../../axios/tipologiche/axios.fondi";
/* REDUX */
import { connect } from "react-redux";
import {
  SetGeneralPrestazioni,
  SetGeneralFondi,
  SetManagerFondi,
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
import FondoManagerContent from "./Fondi.Manager.components/Fondi.Manager.Drawer";
/* EXTRA */
import ErrorBoundary from "../Shared/ErrorBoundary";
/* Styles */

class ManagerFondi extends Component {
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
    this.getListFondi();
    this.getListFondi();
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

  getListFondi = () => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetGeneralFondi_({
      loadingElenco: true,
    });
    get_All_Fondi(`?skip=0&elements=0`)
      .then((result) => {
        console.log(result);
        p.SetGeneralFondi_({
          Elenco: result,
          loadingElenco: false,
        });
        /* reset loadings */
      })
      .catch((error) => {
        console.log(error);
        /* reset loadings */
        p.SetGeneralFondi_({
          Elenco: [],
          loadingElenco: false,
        });
      });
  };

  getListFondi = () => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetGeneralFondi_({
      loadingElenco: true,
    });
    get_All_Fondi(`?skip=0&elements=0`)
      .then((result) => {
        console.log(result);
        p.SetGeneralFondi_({
          Elenco: result,
          loadingElenco: false,
        });
        /* reset loadings */
      })
      .catch((error) => {
        console.log(error);
        /* reset loadings */
        p.SetGeneralFondi_({
          Elenco: [],
          loadingElenco: false,
        });
      });
  };

  AddFondo = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_ADD_Fondo(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of fondo */
        self.getListFondi();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of fondo */
        self.getListFondi();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  UpdateFondo = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_Update_Fondo(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of fondo */
        self.getListFondi();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of fondo */
        self.getListFondi();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  DeleteDomanda = (row) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_DELETE_Fondo({ pId: row.Id })
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
        /* update table of fondo */
        self.getListFondi();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "La cancellazione non è stata possibile"
        );
        /* update table of fondo */
        self.getListFondi();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  getActionsMenu = (row, i) => {
    return (
      <Space split={<Divider type="vertical" />} size={0}>
        <Button
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => this.handleClickEditFondo(row, i)}
        />
        <Popconfirm
          title="Sei sicuro di voler cancellare?"
          okText="Si"
          cancelText="No"
          onConfirm={() => this.DeleteDomanda(row, i)}
        >
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    );
  };

  getColumns = (ElencoFondi, ElencoPrestazioni) => {
    let { filteredInfo } = this.state;

    return [
      {
        title: "N°",
        dataIndex: "Order",
        key: "Order",
        width: 60,
      },
      {
        title: "Nome",
        dataIndex: "Name",
        key: "Name",
      },
      {
        title: "N° ordinamento",
        dataIndex: "Order",
        key: "Order",
      },
      {
        title: "Tipo Prestazione",
        dataIndex: "IdPrestazione",
        key: "IdPrestazione",
        width: 120,
        render: (value, row) => {
          return (
            ElencoPrestazioni.find(({ Id }) => String(Id) === String(value))
              ?.Name || "-"
          );
        },
      },
      {
        title: "Codice",
        dataIndex: "Codice",
        key: "Codice",
      },
      {
        title: "Sigla",
        dataIndex: "Sigla",
        key: "Sigla",
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
        title: "Azioni",
        dataIndex: "actions",
        key: "actions",
        width: 110,
        render: (text, row, i) => this.getActionsMenu(row, i),
      },
    ];
  };

  handleClickAddFondo = () => {
    let p = this.props;

    p.SetGeneralFondi_({ drawerVisible: true, drawerInEdit: false });
  };

  handleClickEditFondo = (row, i) => {
    let p = this.props;
    p.SetGeneralFondi_({
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
    p.SetGeneralFondi_({
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
  handleSaveFondo = (values, drawerInEdit) => {
    if (drawerInEdit) {
      /* call edit */
      this.UpdateFondo(values);
    } else {
      /* call create */
      this.AddFondo(values);
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
      p.Fondi;
    let ElencoPrestazioni = p.Prestazioni.Elenco;

    let tableColumns = this.getColumns(Elenco, ElencoPrestazioni);

    return (
      <>
        <PageHeader
          title={"Gestione Fondi"}
          subtitle={"Gestione tipologie di fondi"}
          extra={[
            <Button
              key="re-chargeTable"
              icon={<RedoOutlined />}
              onClick={this.getListFondi}
            >
              Ricarica dati tabella
            </Button>,
            <Button
              key="AddNewFondo"
              type="primary"
              onClick={this.handleClickAddFondo}
              icon={<AppstoreAddOutlined />}
            >
              Crea Nuova Fondo
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
                  columns={tableColumns}
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
                ? "Modifica di una fondo"
                : `Creazione di una fondo nuova`
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
            <FondoManagerContent
              dataSource={managerDrawer}
              drawerInEdit={drawerInEdit}
              salvaDati={this.handleSaveFondo}
              ElencoPrestazioni={ElencoPrestazioni}
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
    Fondi: state.TipologicheManagerREDUCER.Fondi,
    Prestazioni: state.TipologicheManagerREDUCER.Prestazioni,
  };
};

const mapDispatchToProps = (dispatch) => {
  /* objDati {'stateName':newValue} */
  return {
    SetGeneralPrestazioni_: (objDati) => {
      dispatch(SetGeneralPrestazioni(objDati));
    },
    SetGeneralFondi_: (objDati) => {
      dispatch(SetGeneralFondi(objDati));
    },
    SetManagerFondi_: (objDati) => {
      dispatch(SetManagerFondi(objDati));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManagerFondi);
