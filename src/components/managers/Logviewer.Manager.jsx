import React, { Component } from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetDatiRedux } from "../../redux/actions/Logs.actions";
import { RESET_ALL_REDUCERS } from "../../redux/actions/Session.actions";
/* AXIOS */
import { get_All_Logs, get_Log_ById } from "../../axios/axios.logs";
/* ANTD */
import { Row, Col, Select, Button, Spin } from "antd";
import { RedoOutlined } from "@ant-design/icons";
/* COMPONENTS */
import PageHeader from "../general/PageHeader";
import { LazyLog, Line } from "react-lazylog";
/* EXTRA */
import ErrorBoundary from "../Shared/ErrorBoundary";
/* Styles */

class Logviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* filtri */
      filtriLivello: [],

      loadingElencoLogs: true,
    };
  }

  componentDidMount() {
    this.getAllLogs();
  }

  SetState = (state, value) => {
    this.setState({ [state]: value });
  };

  getAllLogs = () => {
    let self = this;
    let s = this.state;
    let p = this.props;
    let { page, elements } = s;
    let urlExtension = ``;

    /* start loadings */
    self.SetState("loadingElencoLogs", true);
    get_All_Logs(urlExtension)
      .then((result) => {
        console.log(result);
        p.SetDatiRedux_({
          ElencoLogs: result,
          formattedElencoLogs: self.getParsedLogs(result),
          ExistedLevels: self.getExistedLevels(result),
        });

        /* reset loadings */
        self.SetState("loadingElencoLogs", false);
      })
      .catch((error) => {
        console.log(error);
        p.SetDatiRedux_({ ElencoLogs: [] });
        /* reset loadings */
        self.SetState("loadingElencoLogs", false);
      });
  };

  getExistedLevels = (JsonLogs) => {
    let p = this.props;
    let ExistLevels = [];

    JsonLogs.forEach((el, i) => {
      let { Logged, Level, MachineName, Logger, Exception, Message } = el;
      /* metto da parte i vari log levels disponibili in questo log per filtri futuri*/
      if (!ExistLevels.includes(Level)) ExistLevels.push(Level);
    });
    /* updating Levels */
    /* p.SetDatiRedux_({ ExistedLevels: ExistLevels }); */
    return ExistLevels;
  };

  getParsedLogs = (JsonLogs) => {
    let formattedLogs = "";

    JsonLogs.forEach((el, i) => {
      let { Logged, Level, MachineName, Logger, Exception, Message } = el;
      return (formattedLogs += `[${Logged}] ${Level} ${MachineName} ${Logger} : \r\n ${Message} \r\n ${Exception} \r\n \r\n`);
    });
    return formattedLogs;
  };

  handleChangeFilter = (filtriLivello) => {
    let p = this.props;
    let { ElencoLogs } = p.Logs;

    if (filtriLivello.length > 0) {
      /* filter Elenco Logs and parse it */
      let filteredElencoLogs = [];

      ElencoLogs.forEach((log) => {
        let { Logged, Level, MachineName, Logger, Exception, Message } = log;
        if (filtriLivello.includes(Level)) filteredElencoLogs.push(log);
      });

      p.SetDatiRedux_({
        formattedElencoLogs: this.getParsedLogs(filteredElencoLogs),
      });
    } else {
      /* reset filter */
      p.SetDatiRedux_({
        formattedElencoLogs: this.getParsedLogs(ElencoLogs),
      });
    }
    this.SetState("filtriLivello", filtriLivello);
  };

  render() {
    let s = this.state;
    let p = this.props;

    let { filtriLivello, loadingElencoLogs } = s;
    let { ExistedLevels, formattedElencoLogs } = p.Logs;

    return (
      <>
        <PageHeader
          title={"Gestione Log"}
          subtitle={"Gestione log per livello"}
          extra={[
            <Button
              key="re-chargeTable"
              icon={<RedoOutlined />}
              onClick={this.getAllLogs}
            >
              Aggiorna i log
            </Button>,
            <>
              {ExistedLevels && (
                <Select
                  mode="multiple"
                  allowClear
                  style={{ minWidth: "200px" }}
                  placeholder="Seleziona Livello"
                  /* defaultValue={["a10", "c12"]} */
                  value={filtriLivello}
                  onChange={this.handleChangeFilter}
                >
                  {ExistedLevels.map((lvl) => (
                    <Option key={lvl}>{lvl}</Option>
                  ))}
                </Select>
              )}
            </>,
          ]}
        />
        <div
          className="site-layout-content-size site-page-border bck-white"
          style={{ padding: 0 }}
        >
          <Spin spinning={loadingElencoLogs}>
            <Row>
              <Col span={24} style={{ height: "700px" }}>
                {formattedElencoLogs && (
                  <LazyLog
                    /* extraLines={1} */
                    enableSearch
                    text={formattedElencoLogs}
                    selectableLines
                  />
                )}
              </Col>
            </Row>
          </Spin>
        </div>
      </>
    );
  }
}
/* quale reducer vuoi utilizzare qui? solo math */
const mapStateToProps = (state) => {
  return {
    Logs: state.LogsReducerREDUCER,
    Session: state.SessionREDUCER,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetDatiRedux_: (ObjDati) => {
      dispatch(SetDatiRedux(ObjDati));
    },
    RESET_ALL_REDUCERS_: () => {
      dispatch(RESET_ALL_REDUCERS());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Logviewer);
