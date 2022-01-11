import React, { Component } from "react";
/* AXIOS */
import {
  get_All_Autocertificazioni,
  post_ADD_Autocertificazione,
  post_Update_Autocertificazione,
  post_Delete_Autocertificazione,
  get_All_Autocertificazioni_Figli,
  post_ADD_Autocertificazione_Figlio,
  post_Update_Autocertificazione_Figlio,
  post_Delete_Autocertificazione_Figlio,
} from "../../axios/axios.autocertificazioni";
import { get_All_Causali } from "../../axios/tipologiche/axios.causali";
/* REDUX */
import { connect } from "react-redux";
import {
  SetDatiRedux,
  SetManagerAutocertificazione,
} from "../../redux/actions/managers/Autocertificazioni.manager.actions";
import { SetGeneralCausali } from "../../redux/actions/managers/Tipologiche.manager.actions";
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
  Tag,
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
import AutocertificazioneManagerContent from "./Autocertificazioni.Manager.components/Autocertificazione.Manager.Drawer";
import AutocertificazioneChildManagerContent from "./Autocertificazioni.Manager.components/AutocertificazioneFiglio.Manager.Drawer";
/* EXTRA */
import { UUID } from "../../assets/extra/extra";
import ErrorBoundary from "../Shared/ErrorBoundary";
/* Styles */

class ManagerAutocertificazioni extends Component {
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
    this.getListAutocertificazioni();
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

  getListCausali = () => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetGeneralCausali_({
      loadingElenco: true,
    });
    get_All_Causali(`?skip=0&elements=0`)
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

  getListAutocertificazioni = () => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetDatiRedux_({
      loadingElenco: true,
    });
    get_All_Autocertificazioni(`?skip=0&elements=0`)
      .then((result) => {
        console.log(result);
        p.SetDatiRedux_({
          Elenco: result,
          /* reset loadings */
          loadingElenco: false,
        });

        /* needs to update table of Children inside managerAutocertificazione */
        self.UpdateManagerAutocertificazione(result);
      })
      .catch((error) => {
        console.log(error);
        /* reset loadings */
        p.SetDatiRedux_({
          Elenco: [],
          loadingElenco: false,
        });
      });
  };

  AddAutocertificazione = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetDatiRedux_({
      drawerLoading: true,
    });
    post_ADD_Autocertificazione(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of Autocertificazione */
        self.getListAutocertificazioni();

        /* aggiorno i dati dati ricevuti */
        p.SetManagerAutocertificazione_({
          Id: result,
        });
        /* reset loading for drawer father */
        p.SetDatiRedux_({
          drawerInEdit: true,
          drawerLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of Autocertificazione */
        self.getListAutocertificazioni();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  UpdateAutocertificazione = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetDatiRedux_({
      drawerLoading: false,
    });
    post_Update_Autocertificazione(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of Autocertificazione */
        self.getListAutocertificazioni();
        /* self.resetDrawerAndProps(); */
        p.SetDatiRedux_({
          drawerLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of Autocertificazione */
        self.getListAutocertificazioni();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  DeleteAutocertificazione = (row) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_Delete_Autocertificazione(`?pId=${row.Id}`)
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

        /* update table of Autocertificazione */
        self.getListAutocertificazioni();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "La cancellazione non è stata possibile"
        );
        /* update table of Autocertificazione */
        self.getListAutocertificazioni();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  getColumns = () => {
    let { filteredInfo } = this.state;

    return [
      {
        title: "N°",
        dataIndex: "Order",
        key: "Order",
        width: 60,
      },
      {
        title: "Descrizione",
        dataIndex: "Description",
        key: "Description",
        render: (text, row, i) =>
          text.length > 100 ? `${text.substring(0, 100)}...` : text,
      },
      {
        title: "Figli",
        dataIndex: "Figli",
        key: "Figli",
        render: (text, row, i) => row.Children.length,
      },
      {
        title: "Obbligatorio",
        dataIndex: "Required",
        key: "Required",
        align: "center",
        filters: [
          { text: "Obbligatorio", value: true },
          { text: "Non Obbligatorio", value: false },
        ],
        filteredValue: filteredInfo?.Required || null,
        onFilter: (value, record) => record.Required === value,
        render: (Required) =>
          Required ? (
            <CheckOutlined className="tableIcons" style={{ color: "green" }} />
          ) : (
            <CloseOutlined className="tableIcons" style={{ color: "red" }} />
          ),
      },
      {
        title: "Tipologia",
        key: "Type",
        dataIndex: "Type",
        align: "center",
        render: (type) => (
          <Tag color={"geekblue"} key={UUID()}>
            {type ? type.toUpperCase() : "-"}
          </Tag>
        ),
      },
      {
        title: "Attivo",
        key: "IsEnabled",
        dataIndex: "IsEnabled",
        align: "center",
        filters: [
          { text: "Attivo", value: true },
          { text: "Disattivo", value: false },
        ],
        filteredValue: filteredInfo?.IsEnabled || null,
        onFilter: (value, record) => record.IsEnabled === value,
        render: (IsEnabled) =>
          IsEnabled ? (
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
          onClick={() => this.handleClickEditAutocertificazione(row, i)}
        />
        <Popconfirm
          title="Sei sicuro di voler cancellare?"
          okText="Si"
          cancelText="No"
          onConfirm={() => this.DeleteAutocertificazione(row)}
        >
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    );
  };

  handleClickAddAutocertificazione = () => {
    let p = this.props;

    p.SetDatiRedux_({
      drawerVisible: true,
      drawerInEdit: false,
    });
  };

  handleClickEditAutocertificazione = (row, i) => {
    let p = this.props;
    p.SetDatiRedux_({
      drawerVisible: true,
      drawerInEdit: true,
      managerAutocertificazione: {
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
    p.SetDatiRedux_({
      /* drawer */
      drawerVisible: false,
      drawerInEdit: false,
      drawerLoading: false,
      /* attualmente in uso solo per settare i valori di init non per l'update */
      managerAutocertificazione: {
        Id: null,
        Description: null,
        Required: null,
        IsEnabled: null,
        Type: null,
        Order: null,
        Group: null,
        TipoCausale: null,
        Children: [],
      },
    });
  };

  handleTableChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  /* SAVE => CREATE AND EDIT */
  handleSaveAutocertificazione = (values, drawerInEdit) => {
    if (drawerInEdit) {
      /* call edit */
      this.UpdateAutocertificazione(values);
    } else {
      /* call create */
      this.AddAutocertificazione(values);
    }
  };

  /* CHILD API */
  AddChildAutocertificazione = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetDatiRedux_({
      drawerChildLoading: true,
    });
    post_ADD_Autocertificazione_Figlio(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of Autocertificazione */
        self.getListAutocertificazioni();
        /* reset loading for drawer child */
        self.handleResetDrawerChild();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of Autocertificazione */
        self.getListAutocertificazioni();
        /* reset loadings */
        self.handleResetDrawerChild();
      });
  };

  UpdateChildAutocertificazione = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetDatiRedux_({
      drawerChildLoading: true,
    });
    post_Update_Autocertificazione_Figlio(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of Autocertificazione */
        self.getListAutocertificazioni();
        /* reset loading for drawer child */
        self.handleResetDrawerChild();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of Autocertificazione */
        self.getListAutocertificazioni();
        /* reset loadings */
        self.handleResetDrawerChild();
      });
  };

  DeleteChildAutocertificazione = (row) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetDatiRedux_({
      drawerChildLoading: true,
    });
    post_Delete_Autocertificazione_Figlio(`?pId=${row.Id}`)
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
        /* update table of Autocertificazione */
        self.getListAutocertificazioni();
        /* reset loading for drawer child */
        self.handleResetDrawerChild();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "La cancellazione non è stata possibile"
        );
        /* update table of Autocertificazione */
        self.getListAutocertificazioni();
        /* reset loadings */
        self.handleResetDrawerChild();
      });
  };

  /* SAVE CHILD  => CREADE AND EDIT */
  handleSaveAutocertificazioneChild = (values, drawerChildInEdit = false) => {
    let p = this.props;
    let s = this.state;
    let { Children } = p.Autocertificazioni.managerAutocertificazione;

    if (drawerChildInEdit) {
      /* this.handleDrawerChildClose(); */
      this.UpdateChildAutocertificazione(values);
    } else {
      /* this.handleDrawerChildClose(); */
      this.AddChildAutocertificazione(values);
    }
  };

  /* CHILD */
  handleDrawerChildClose = () => {
    this.handleResetDrawerChild();
  };

  handleResetDrawerChild = () => {
    let p = this.props;
    p.SetDatiRedux_({
      drawerChildVisible: false,
      drawerChildInEdit: false,
      drawerChildLoading: false,
      managerChildAutocertificazione: {
        Id: null,
        Testo: null,
        Order: null,
        IsEnabled: null,
        Group: null,
        FK_Autocertificazione: null,
        IdTipoCausale: null,
        TipoCausale: null,
        InizioValidita: null,
        FineValidita: null,
      },
    });
  };

  UpdateManagerAutocertificazione = (ElencoAutocertificazioni) => {
    let s = this.state;
    let p = this.props;
    let { drawerVisible, managerAutocertificazione } = p.Autocertificazioni;
    if (drawerVisible) {
      /* if the drawer is open u need to update table, the data may have changed */
      let AutocertificazioneInEdit = ElencoAutocertificazioni.find(
        ({ Id }) => Id === managerAutocertificazione.Id
      );
      if (AutocertificazioneInEdit) {
        p.SetManagerAutocertificazione_({
          ...AutocertificazioneInEdit,
        });
      }
    }
  };

  render() {
    let s = this.state;
    let p = this.props;
    let {
      Elenco,
      loadingElenco,

      drawerVisible,
      drawerInEdit,
      drawerLoading,
      managerAutocertificazione,

      drawerChildVisible,
      drawerChildInEdit,
      drawerChildLoading,
      managerChildAutocertificazione,
    } = p.Autocertificazioni;
    let ElencoCausali = p.Causali.Elenco;

    return (
      <>
        <PageHeader
          title={"Gestione Autocertificazioni"}
          subtitle={"Gestione tipologie di Autocertificazioni"}
          extra={[
            <Button
              key="re-chargeTable"
              icon={<RedoOutlined />}
              onClick={this.getListAutocertificazioni}
            >
              Ricarica dati tabella
            </Button>,
            <Button
              key="AddNewAutocertificazione"
              type="primary"
              onClick={this.handleClickAddAutocertificazione}
              icon={<AppstoreAddOutlined />}
            >
              Crea Nuova Autocertificazione
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
                ? `Modifica dell'autocertificazione ${managerAutocertificazione.Description}`
                : `Creazione di una Autocertificazione nuova`
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
            <AutocertificazioneManagerContent
              dataSource={managerAutocertificazione}
              drawerInEdit={drawerInEdit}
              drawerLoading={drawerLoading}
              salvaDati={this.handleSaveAutocertificazione}
              DeleteChildAutocertificazione={this.DeleteChildAutocertificazione}
              ElencoCausali={ElencoCausali}
            />

            <Drawer
              title={
                drawerChildInEdit
                  ? "Modifica di un elemento esistente"
                  : `Creazione di un elemento nuovo`
              }
              width={536}
              destroyOnClose
              placement="right"
              onClose={this.handleDrawerChildClose}
              visible={drawerChildVisible}
              extra={
                <Space>
                  <Button onClick={this.handleDrawerChildClose}>Cancel</Button>
                  <Button type="primary" onClick={this.handleDrawerChildClose}>
                    OK
                  </Button>
                </Space>
              }
            >
              <AutocertificazioneChildManagerContent
                dataSource={managerChildAutocertificazione}
                drawerInEdit={drawerChildInEdit}
                drawerChildLoading={drawerChildLoading}
                handleSaveAutocertificazioneChild={
                  this.handleSaveAutocertificazioneChild
                }
                ElencoCausali={ElencoCausali}
              />
            </Drawer>
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
    SetGeneralCausali_: (objDati) => {
      dispatch(SetGeneralCausali(objDati));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerAutocertificazioni);
