import React from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetRoutes } from "../../redux/actions/Session.actions";
import { SetDatiReduxSite } from "../../redux/actions/Site.actions";
import {
  SetDatiReduxManager,
  SetDrawerCreateNewComponent,
} from "../../redux/actions/Manager.actions";
/* COMPONENTS */
import DrawerCreateNewComponent from "../DrawerCreateNewRow";
/* ANTD */
import { PageHeader, Button } from "antd";

class PageHeader_HOC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <PageHeader
          className="site-page-header-ghost-wrapper"
          ghost={false}
          onBack={null}
          title="Home Page"
          subTitle="Gestione della HomePage"
          extra={[
            <Button key="3" disabled>
              Operation 3
            </Button>,
            <Button key="2" disabled>
              Operation 2
            </Button>,
            <Button
              key="1"
              type="primary"
              onClick={() =>
                this.props.SetDrawerCreateNewComponent_({ visible: true })
              }
            >
              Aggiungi Widget
            </Button>,
          ]}
        />
        <DrawerCreateNewComponent />
        <div className="site-layout-content"> {this.props.children}</div>
      </>
    );
  }
}
/* quale reducer vuoi utilizzare qui? solo math */
const mapStateToProps = (state) => {
  return {
    Session: state.SessionREDUCER,
    Router: state.router,
    Site: state.SiteREDUCER,
    Manager: state.ManagerREDUCER,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    SetRoutes_: (routes) => {
      dispatch(SetRoutes(routes));
    },
    SetDatiReduxManager_: (routes) => {
      dispatch(SetDatiReduxManager(routes));
    },
    SetDrawerCreateNewComponent_: (routes) => {
      dispatch(SetDrawerCreateNewComponent(routes));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PageHeader_HOC);
