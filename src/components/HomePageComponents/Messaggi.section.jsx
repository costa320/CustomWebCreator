import React, { Component } from "react";
/* AXIOS */
import { get_All_Messages } from "../../axios/axios.messages";
/* ANTD */
import { Row, Col, Table, Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
/* REDUX */
import { connect } from "react-redux";
import { SetSectionMessaggi } from "../../redux/actions/Home.actions";
/* COMPONENTS */
/* EXTRA */
import ErrorBoundary from "../Shared/ErrorBoundary";
import { UUID } from "../../assets/extra/extra";

/* Styles */

class MessaggiSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,

      page: 1,
      elements: 10,

      /* filters and sorters */
      filteredInfo: null,
      sortedInfo: null,
    };
  }

  componentDidMount() {
    this.getListMessages();
  }

  SetState = (state, value) => {
    this.setState({ [state]: value });
  };

  getListMessages() {
    let self = this;
    let s = this.state;
    let p = this.props;
    let { page, elements } = s;
    let urlExtension = `?page=${page}&elements=${elements}`;

    get_All_Messages()
      .then((result) => {
        console.log(result);
        p.SetSectionMessaggi_({
          ElencoMessaggi: result,
          loadingMessaggi: false,
        });
        /* reset loadings */
      })
      .catch((error) => {
        console.log(error);
        /* reset loadings */
        p.SetSectionMessaggi_({
          ElencoMessaggi: [],
          loadingMessaggi: false,
        });
      });
  }

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
        title: "Identificativo",
        dataIndex: "KeyPage",
        key: "KeyPage",
      },
      {
        title: "Titolo",
        dataIndex: "Title",
        key: "Title",
      },
      {
        title: "Messaggio",
        dataIndex: "Message",
        key: "Message",
        render: (text, row, i) =>
          text.length > 100 ? `${text.substring(0, 100)}...` : text,
      },
    ];
  };

  render() {
    let s = this.state;
    let p = this.props;

    let { ElencoMessaggi, loadingMessaggi } = p.Home.Section_Messaggi;

    return (
      <>
        <ErrorBoundary>
          <Table
            columns={this.getColumns()}
            dataSource={ElencoMessaggi || []}
            loading={loadingMessaggi}
            pagination={false}
            scroll={{ y: "200px" }}
          />
        </ErrorBoundary>
      </>
    );
  }
}
/* quale reducer vuoi utilizzare qui? solo math */
const mapStateToProps = (state) => {
  return {
    Session: state.SessionREDUCER,
    Home: state.HomeREDUCER,
    NuovaDomanda: state.NuovaDomandaREDUCER,
  };
};

const mapDispatchToProps = (dispatch) => {
  /* objDati {'stateName':newValue} */
  return {
    SetSectionMessaggi_: (objDati) => {
      dispatch(SetSectionMessaggi(objDati));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MessaggiSection);
