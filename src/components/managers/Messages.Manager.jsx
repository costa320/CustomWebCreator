import React, { Component } from "react";
/* AXIOS */
import {
  get_All_Messages,
  post_ADD_Message,
  post_Update_Message,
  post_Delete_Message,
} from "../../axios/axios.messages";
/* REDUX */
import { connect } from "react-redux";
import {
  SetDatiRedux,
  SetManagerMessaggi,
} from "../../redux/actions/managers/Message.manager.actions";
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
} from "@ant-design/icons";
/* COMPONENTS */
import PageHeader from "../general/PageHeader";
import MessageManagerContent from "./Messages.Manager.components/Message.Manager.Drawer";
/* COLORS */
import ColorPicker from "../general/ColorPicker";
/* EXTRA */
import ErrorBoundary from "../Shared/ErrorBoundary";
/* Styles */

class ManagerMessaggi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
  }

  componentDidMount() {
    this.getListMessages();
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

  getListMessages = () => {
    let self = this;
    let s = this.state;
    let p = this.props;

    p.SetDatiRedux_({
      loadingMessaggi: true,
    });
    get_All_Messages(`?skip=0&elements=0`)
      .then((result) => {
        console.log(result);
        p.SetDatiRedux_({
          ElencoMessaggi: result,
          loadingMessaggi: false,
        });
        /* reset loadings */
      })
      .catch((error) => {
        console.log(error);
        /* reset loadings */
        p.SetDatiRedux_({
          ElencoMessaggi: [],
          loadingMessaggi: false,
        });
      });
  };

  AddMessage = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_ADD_Message(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of messages */
        self.getListMessages();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of messages */
        self.getListMessages();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  UpdateMessage = (data) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_Update_Message(data)
      .then((result) => {
        console.log(result);
        self.openNotificationWithIcon(
          "success",
          "Il salvataggio è avvenuto con successo"
        );
        /* update table of messages */
        self.getListMessages();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Il salvataggio non è avvenuto con successo"
        );
        /* update table of messages */
        self.getListMessages();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  DeleteMessage = (row, i) => {
    let self = this;
    let s = this.state;
    let p = this.props;

    post_Delete_Message(row.KeyPage)
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
        /* update table of messages */
        self.getListMessages();
        self.resetDrawerAndProps();
      })
      .catch((error) => {
        console.log(error);
        self.openNotificationWithIcon(
          "warning",
          "Non è stato possibile cancellare l'elemento"
        );
        /* update table of messages */
        self.getListMessages();
        /* reset loadings */
        self.resetDrawerAndProps();
      });
  };

  getColumns = () => {
    return [
      {
        title: "N°",
        dataIndex: "INDEX",
        key: "INDEX",
        render: (value, row, index) => index + 1,
        align: "center",
        width: 20,
        fixed: "left",
      },
      {
        title: "Identificativo",
        dataIndex: "KeyPage",
        key: "KeyPage",
        width: 50,
      },
      {
        title: "Titolo",
        dataIndex: "Title",
        key: "Title",
        width: 50,
      },
      {
        title: "Messaggio",
        dataIndex: "Message",
        key: "Message",
        width: 120,
        render: (text, row, i) => {
          return (
            <Space direction="vertical">
              {text}
              {row.Color && <ColorPicker color={row.Color} />}
            </Space>
          );
        },
      },
      {
        title: "Azioni",
        dataIndex: "actions",
        key: "actions",
        render: (text, row, i) => this.getActionsMenu(row, i),
        align: "center",
        width: 43,
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
          onClick={() => this.handleClickEditMessage(row, i)}
        />
        <Popconfirm
          title="Sei sicuro di voler cancellare?"
          okText="Si"
          cancelText="No"
          disabled={!row.IsDeletable}
          onConfirm={() => this.DeleteMessage(row, i)}
        >
          <Button
            disabled={!row.IsDeletable}
            danger
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      </Space>
    );
  };

  handleClickAddMessage = () => {
    let p = this.props;

    p.SetDatiRedux_({ drawerVisible: true, drawerInEdit: false });
  };

  handleClickEditMessage = (row, i) => {
    let p = this.props;
    p.SetDatiRedux_({
      drawerVisible: true,
      drawerInEdit: true,
      managerMessaggi: {
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
      drawerVisible: false,
      drawerInEdit: false,
      managerMessaggi: {
        KeyPage: null,
        Message: null,
        Title: null,
      },
    });
  };

  /* SAVE => CREATE AND EDIT */
  handleSaveMessage = (values, drawerInEdit) => {
    if (drawerInEdit) {
      /* call edit */
      this.UpdateMessage(values);
    } else {
      /* call create */
      this.AddMessage(values);
    }
  };

  render() {
    let s = this.state;
    let p = this.props;
    let {
      ElencoMessaggi,
      loadingMessaggi,
      managerMessaggi,
      drawerVisible,
      drawerInEdit,
    } = p.MessageManager;

    return (
      <>
        <PageHeader
          title={"Gestione Messaggi"}
          subtitle={"Gestione Callout"}
          extra={[
            <Button
              key="re-chargeTable"
              icon={<RedoOutlined />}
              onClick={this.getListMessages}
            >
              Ricarica dati tabella
            </Button>,
            <Button
              key="AddNewMessage"
              type="primary"
              onClick={this.handleClickAddMessage}
              icon={<AppstoreAddOutlined />}
            >
              Crea Nuovo Messaggio
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
            <Col>
              <ErrorBoundary>
                <Table
                  columns={this.getColumns()}
                  dataSource={ElencoMessaggi || []}
                  loading={loadingMessaggi}
                  pagination={false}
                  pagination={{ position: ["none", "bottomRight"] }}
                  bordered
                  scroll={{ x: "100%" }}
                />
              </ErrorBoundary>
            </Col>
          </Row>
        </div>
        <ErrorBoundary>
          <Drawer
            title={
              drawerInEdit
                ? "Modifica di un messaggio"
                : `Creazione di un messaggio nuovo`
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
            <MessageManagerContent
              dataSource={managerMessaggi}
              drawerInEdit={drawerInEdit}
              salvaDati={this.handleSaveMessage}
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
    MessageManager: state.MessageManagerREDUCER,
  };
};

const mapDispatchToProps = (dispatch) => {
  /* objDati {'stateName':newValue} */
  return {
    SetDatiRedux_: (objDati) => {
      dispatch(SetDatiRedux(objDati));
    },
    SetManagerMessaggi_: (objDati) => {
      dispatch(SetManagerMessaggi(objDati));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManagerMessaggi);
