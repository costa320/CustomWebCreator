import React, { Component } from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetDatiRedux } from "../../redux/actions/Logs.actions";
import { RESET_ALL_REDUCERS } from "../../redux/actions/Session.actions";
/* AXIOS */
import { get_All_Logs, get_Log_ById } from "../../axios/axios.logs";
/* ANTV */
import * as G2 from "@antv/g2";
import DataSet from "@antv/data-set";
/* ANTD */
import { Spin, Button } from "antd";
/* MOMENT */
import moment from "moment";
/* COMPONENTS */

/* EXTRA */
import ErrorBoundary from "../Shared/ErrorBoundary";
import { downloadImage } from "../../assets/extra/extraAntV_G2";
/* Styles */

class LogSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* filtri */
      loadingElencoLogs: true,

      chart: null,

      rechargeLogsChart: false,
      downloadLogChart: false,
    };
  }

  componentDidMount() {
    this.getAllLogs();
  }

  componentDidUpdate(pastProps) {
    let p = this.props;
    let s = this.state;

    let { rechargeLogsChart, downloadLogChart } = p;

    if (rechargeLogsChart !== s.rechargeLogsChart) {
      this.setState({ rechargeLogsChart: false });
      this.props.setState({ rechargeLogsChart: false });
      this.reRenderChart();
    }

    if (downloadLogChart !== s.downloadLogChart) {
      this.setState({ downloadLogChart: false });
      this.props.setState({ downloadLogChart: false });
      this.downloadChart();
    }
  }

  reRenderChart = () => {
    let s = this.state;
    let p = this.props;

    s.chart.destroy();

    this.renderChart(this.getOpt(p.Logs.ElencoLogs));
  };

  downloadChart = () => {
    let s = this.state;
    downloadImage(s.chart, `LogsChart${Date.now()}`);
  };

  SetState = (state, value) => {
    this.setState({ [state]: value });
  };

  getAllLogs() {
    let self = this;
    let s = this.state;
    let p = this.props;
    let { page, elements } = s;
    let urlExtension = ``;

    get_All_Logs(urlExtension)
      .then((result) => {
        console.log(result);
        let OPT = self.getOpt(result);
        p.SetDatiRedux_({
          ElencoLogs: result,
          LogSectionChartOpt: OPT,
        });

        self.renderChart(OPT);
        /* reset loadings */
        self.SetState("loadingElencoLogs", false);
      })
      .catch((error) => {
        console.log(error);
        p.SetDatiRedux_({ ElencoLogs: [] });
        /* reset loadings */
        self.SetState("loadingElencoLogs", false);
      });
  }

  getOpt = (JsonLogs) => {
    let p = this.props;
    /* [...{Level:'Error',numberElements:0,children:[...]}] */
    let ExistLevels = [];

    JsonLogs.forEach((el, i) => {
      let { Logged, Level, MachineName, Logger, Exception, Message } = el;
      /* server date format */
      let SDF = "MM/DD/YYYY hh:mm:ss";
      /* local date Format */
      let LDF = "DD/MM/YYYY";

      /* controll if the date exist inside ExistLevels */
      let i_ = ExistLevels.findIndex(
        (el) => el.date === moment(Logged, SDF).format(LDF)
      );

      if (i_ >= 0) {
        let i_elem = ExistLevels[i_];
        /* date already exist */
        if (i_elem.Level === Level) {
          /* they are the same level */
          ExistLevels[i_].numberElements += 1;
        } else {
          /* not the same level but same day */
          ExistLevels.push({
            date: moment(Logged, SDF).format(LDF),
            Level: Level,
            numberElements: 1,
          });
        }
      } else {
        /* if it does not yet exist, create it */
        ExistLevels.push({
          date: moment(Logged, SDF).format(LDF),
          Level: Level,
          numberElements: 1,
        });
      }
    });
    /* updating Levels */
    /* p.SetDatiRedux_({ ExistedLevels: ExistLevels }); */
    return ExistLevels;
  };

  renderChart = (data) => {
    var chart = new G2.Chart({
      container: "LogRoseDiagram",
      forceFit: true,
      height: 260,
    });

    this.SetState("chart", chart);

    chart.forceFit();

    chart.legend({
      position: "right-top", // Set the display position of the legend
      itemGap: 20, // Gap between legend items
    });

    chart.source(data);
    chart.tooltip({
      crosshairs: {
        type: "line",
      },
    });
    chart.axis("numberElements", {
      label: {
        formatter: function formatter(val) {
          return val;
        },
      },
    });
    chart.line().position("date*numberElements").color("Level");
    chart
      .point()
      .position("date*numberElements")
      .color("Level")
      .size(4)
      .shape("circle")
      .style({
        stroke: "#fff",
        lineWidth: 1,
      });
    chart.render();
  };

  render() {
    let s = this.state;
    let p = this.props;

    let { loadingElencoLogs } = s;
    let { LogSectionChartOpt } = p.Logs;

    return <div id="LogRoseDiagram"></div>;
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
export default connect(mapStateToProps, mapDispatchToProps)(LogSection);
