import React, { Component } from "react";
/* AXIOS */
import { get_All_Autocertificazioni } from "../../axios/axios.autocertificazioni";
/* REDUX */
import { connect } from "react-redux";
import { SetSectionAutocertificazioni } from "../../redux/actions/Home.actions";
/* ANTD */
import { Row, Col, Table, Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
/* EXTRA */
import ErrorBoundary from "../Shared/ErrorBoundary";
import { UUID } from "../../assets/extra/extra";
/* COMPONENTS */

/* Styles */

class AutocertificazioniSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,

      /* page =0 elements =0 => all results */
      page: 1,
      elements: 10,

      /* filters and sorters */
      filteredInfo: null,
      sortedInfo: null,
    };
  }

  componentDidMount() {
    this.getListAutocertificazioni();
  }

  SetState = (state, value) => {
    this.setState({ [state]: value });
  };

  getListAutocertificazioni() {
    let self = this;
    let s = this.state;
    let p = this.props;
    let { page, elements } = s;
    let urlExtension = `?page=${page}&elements=${elements}`;

    get_All_Autocertificazioni(urlExtension)
      .then((result) => {
        console.log(result);
        p.SetSectionAutocertificazioni_({
          ElencoAutocertificazioni: result,
          loadingAutocertificazioni: false,
        });
        /* reset loadings */
      })
      .catch((error) => {
        console.log(error);
        /* reset loadings */
        p.SetSectionAutocertificazioni_({
          ElencoAutocertificazioni: [],
          loadingAutocertificazioni: false,
        });
      });
  }

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
    let { ElencoAutocertificazioni, loadingAutocertificazioni } =
      p.Home.Section_Autocertificazioni;

    return (
      <>
        <ErrorBoundary>
          <Table
            columns={this.getColumns()}
            dataSource={ElencoAutocertificazioni || []}
            loading={loadingAutocertificazioni}
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
    NuovaDomanda: state.NuovaDomandaREDUCER,
  };
};

const mapDispatchToProps = (dispatch) => {
  /* objDati {'stateName':newValue} */
  return {
    SetSectionAutocertificazioni_: (objDati) => {
      dispatch(SetSectionAutocertificazioni(objDati));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocertificazioniSection);
