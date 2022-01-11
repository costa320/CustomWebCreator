import React, { Component } from "react";
/* AXIOS */
import {
  get_All_Causali,
  post_ADD_Causale,
  post_Update_Causale,
  post_DELETE_Causale,
} from "../../axios/tipologiche/axios.causali";
import { get_All_Prestazioni } from "../../axios/tipologiche/axios.prestazioni";
/* REDUX */
import { connect } from "react-redux";
import {
  SetGeneralPrestazioni,
  SetGeneralCausali,
  SetManagerCausali,
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
import CausaliManagerContent from "./Causali.Manager.components/Causali.Manager.Drawer";
import moment from "moment";
/* EXTRA */
import ErrorBoundary from "../Shared/ErrorBoundary";
/* Styles */

class ManagerCausali extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,

      /* filters and sorters */
      filteredInfo: null,
      sortedInfo: null,

      /* moment */
      LF: "DD/MM/YYYY",
    };
  }

  componentDidMount() {
    this.getListPrestazioni();
    this.getListCausali();
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

  getListCausali = () => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetGeneralCausali_({
      loadingElenco: true,
    });
    get_All_Causali(``)
      .then((result) => {
        /* adeguo le date al formato locale */
        return result.map((causale) => {
          let { DataDal, DataAl, DataAssunzione } = causale;
          let LF = "DD/MM/YYYY";
          return {
            ...causale,
            DataDal: moment(DataDal).format(LF),
            DataAl: moment(DataAl).format(LF),
            DataAssunzione: moment(DataAssunzione).format(LF),
          };
        });
      })
      .then((result) => {
        console.log(result);
        p.SetGeneralCausali_({
          Elenco: result,
          loadingElenco: false,
        });
        /* reset loadings */
      })
      .catch((error) => {
        console.log(error);
        /* reset loadings */
        p.SetGeneralCausali_({
          Elenco: [],
          loadingElenco: false,
        });
      });
  };

  AddCausale = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_ADD_Causale(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table */
        self.getListCausali();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table */
        self.getListCausali();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  UpdateCausale = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_Update_Causale(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table */
        self.getListCausali();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table */
        self.getListCausali();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  DeleteCausale = (row) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_DELETE_Causale({ Id: row.Id })
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
        /* update table */
        self.getListCausali();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "La cancellazione non è stata possibile"
        );
        /* update table */
        self.getListCausali();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  getColumns = (ElencoCausali, ElencoPrestazioni) => {
    let { filteredInfo, LF } = this.state;

    return [
      {
        title: "N°",
        dataIndex: "Id",
        key: "INDEX",
        width: 60,
        align: "center",
        fixed: "left",
      },
      {
        title: "Nome",
        dataIndex: "Name",
        key: "Name",
        fixed: "left",
        width: 140,
      },
      {
        title: "Dal",
        dataIndex: "DataDal",
        key: "DataDal",
        width: 110,
        sorter: {
          compare: (a, b) =>
            moment(a.DataAssunzione, LF).diff(moment(b.DataAssunzione, LF)),
          /* multiple: 1, */
        },
      },
      {
        title: "Al",
        dataIndex: "DataAl",
        key: "DataAl",
        width: 110,
        sorter: {
          compare: (a, b) =>
            moment(a.DataAssunzione, LF).diff(moment(b.DataAssunzione, LF)),
          /* multiple: 2, */
        },
      },
      {
        title: "Anno",
        dataIndex: "Anno",
        key: "Anno",
        width: 110,
        sorter: {
          compare: (a, b) => a.Anno - b.Anno,
          /* multiple: 3, */
        },
      },
      {
        title: "Data assunzione",
        dataIndex: "DataAssunzione",
        key: "DataAssunzione",
        width: 110,
        sorter: {
          compare: (a, b) =>
            moment(a.DataAssunzione, LF).diff(moment(b.DataAssunzione, LF)),
          /* multiple: 4, */
        },
      },
      {
        title: "N° Settimane",
        dataIndex: "NumeroSettimane",
        key: "NumeroSettimane",
        width: 110,
        sorter: {
          compare: (a, b) => a.NumeroSettimane - b.NumeroSettimane,
          /* multiple: 3, */
        },
      },
      {
        title: "Tipo Prestazione",
        dataIndex: "TipoPrestazione",
        key: "TipoPrestazione",
        width: 120,
        render: (value, row) => {
          return (
            ElencoPrestazioni.find(({ Id }) => String(Id) === String(value))
              ?.Name || "-"
          );
        },
      },
      {
        title: "Limite presentazione GG",
        dataIndex: "LimitePresentazioneInGiorni",
        key: "LimitePresentazioneInGiorni",
        width: 120,
        sorter: {
          compare: (a, b) =>
            a.LimitePresentazioneInGiorni - b.LimitePresentazioneInGiorni,
          /* multiple: 3, */
        },
      },

      {
        title: "ExternalRef",
        dataIndex: "ExternalRef",
        key: "ExternalRef",
        width: 120,
      },
      {
        title: "Azioni",
        dataIndex: "actions",
        key: "actions",
        align: "center",
        width: 110,
        render: (text, row, i) => this.getActionsMenu(row, i),
        fixed: "right",
      },
    ];
  };

  getActionsMenu = (row, i) => {
    return (
      <Space split={<Divider type="vertical" />} size={0}>
        <Button
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => this.handleClickEditCausale(row, i)}
        />
        <Popconfirm
          title="Sei sicuro di voler cancellare?"
          okText="Si"
          cancelText="No"
          onConfirm={() => this.DeleteCausale(row)}
        >
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    );
  };

  handleClickAddCausale = () => {
    let p = this.props;

    p.SetGeneralCausali_({ drawerVisible: true, drawerInEdit: false });
  };

  handleClickEditCausale = (row, i) => {
    let p = this.props;
    p.SetGeneralCausali_({
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
    p.SetGeneralCausali_({
      drawerVisible: false,
      drawerInEdit: false,
      managerDrawer: {
        Id: null,
        Name: null,
        DataDal: null,
        DataAl: null,
        Anno: null,
        DataAssunzione: null,
        NumeroSettimane: null,
        TipoPrestazione: null,
        LimitePresentazioneInGiorni: null,
        ExternalRef: null,
      },
    });
  };

  /* SAVE => CREATE AND EDIT */
  handleSaveCausale = (values, drawerInEdit) => {
    if (drawerInEdit) {
      /* call edit */
      this.UpdateCausale(values);
    } else {
      /* call create */
      this.AddCausale(values);
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
      p.Causali;
    let ElencoPrestazioni = p.Prestazioni.Elenco;

    let tableColumns = this.getColumns(Elenco, ElencoPrestazioni);

    return (
      <>
        <PageHeader
          title={"Gestione Causali"}
          subtitle={"Gestione tipologie di causali"}
          extra={[
            <Button
              key="re-chargeTable"
              icon={<RedoOutlined />}
              onClick={this.getListCausali}
            >
              Ricarica dati tabella
            </Button>,
            <Button
              key="AddNewCausale"
              type="primary"
              onClick={this.handleClickAddCausale}
              icon={<AppstoreAddOutlined />}
            >
              Crea Nuova Causale
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
                  scroll={{ x: 1300 }}
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
                ? "Modifica di una causale"
                : `Creazione di una causale nuova`
            }
            width={736}
            destroyOnClose
            placement="right"
            onClose={this.handleDrawerClose}
            visible={drawerVisible}
            extra={
              <Space>
                <Button onClick={this.handleDrawerClose}>Indietro</Button>
                <Button type="primary" onClick={this.handleDrawerClose}>
                  Si
                </Button>
              </Space>
            }
          >
            <CausaliManagerContent
              dataSource={managerDrawer}
              drawerInEdit={drawerInEdit}
              salvaDati={this.handleSaveCausale}
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
    Causali: state.TipologicheManagerREDUCER.Causali,
    Prestazioni: state.TipologicheManagerREDUCER.Prestazioni,
  };
};

const mapDispatchToProps = (dispatch) => {
  /* objDati {'stateName':newValue} */
  return {
    SetGeneralPrestazioni_: (objDati) => {
      dispatch(SetGeneralPrestazioni(objDati));
    },
    SetGeneralCausali_: (objDati) => {
      dispatch(SetGeneralCausali(objDati));
    },
    SetManagerCausali_: (objDati) => {
      dispatch(SetManagerCausali(objDati));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManagerCausali);
