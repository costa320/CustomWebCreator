import React, { Component } from "react";
/* AXIOS */
import { get_All_Prestazioni } from "../../axios/tipologiche/axios.prestazioni";
/* ANTD */
import { Row, Col, Table, Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
/* REDUX */
import { connect } from "react-redux";
import { SetSectionPrestazioni } from "../../redux/actions/Home.actions";
/* COMPONENTS */
/* EXTRA */
import ErrorBoundary from "../Shared/ErrorBoundary";
import { UUID } from "../../assets/extra/extra";

/* Styles */

class TipoPrestazioneSection extends Component {
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
    this.getListPrestazioni();
  }

  SetState = (state, value) => {
    this.setState({ [state]: value });
  };

  getListPrestazioni() {
    let self = this;
    let s = this.state;
    let p = this.props;
    let { page, elements } = s;
    let urlExtension = `?page=${page}&elements=${elements}`;

    get_All_Prestazioni()
      .then((result) => {
        console.log(result);
        p.SetSectionPrestazioni_({
          ElencoPrestazioni: result,
          loadingPrestazioni: false,
        });
        /* reset loadings */
      })
      .catch((error) => {
        console.log(error);
        /* reset loadings */
        p.SetSectionPrestazioni_({
          ElencoPrestazioni: [],
          loadingPrestazioni: false,
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
    ];
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

    let { ElencoPrestazioni, loadingPrestazioni } = p.Home.Section_Prestazioni;

    return (
      <>
        <ErrorBoundary>
          <Table
            columns={this.getColumns()}
            dataSource={ElencoPrestazioni || []}
            loading={loadingPrestazioni}
            pagination={false}
            onChange={this.handleTableChange}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  /* objDati {'stateName':newValue} */
  return {
    SetSectionPrestazioni_: (objDati) => {
      dispatch(SetSectionPrestazioni(objDati));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TipoPrestazioneSection);
