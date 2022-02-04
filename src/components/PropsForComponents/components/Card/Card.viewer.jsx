import React from "react";
/* REDUX */
import { connect } from "react-redux";
import { SetRoutes } from "../../../../redux/actions/Session.actions";
import { SET_CurrentPage } from "../../../../redux/actions/Site.actions";
import {
  SetDrawerCreateNewComponent,
  SetComponentConfig,
  SetComponentCustomization,
} from "../../../../redux/actions/Manager.actions";
/* ANTD */
import {
  Row,
  Col,
  Drawer,
  Button,
  Space,
  Form,
  Card,
  Input,
  Badge,
  Typography,
  Table,
  Switch,
  Select,
  Divider,
  Checkbox,
  Slider,
  Steps,
  Avatar,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  getFullDefaultPropsSettings,
  getDefaultPropsSettings,
} from "../../index.export";
import {
  ComponentsList,
  IconList,
  DynamicIcon,
} from "../../../exportedFromAntd";
/* MODELS Constructor */
import {
  _Row,
  _Col,
  _Component,
  _hgutters,
  _vgutters,
} from "../../../../redux/models/Site.model";
/* HELPERS */
import { UUID } from "../../../../assets/extra/extra";
/* STYLES */

const formRef = React.createRef();
class Card_wrapperViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.fullConfiguration,
    };
  }

  render() {
    let p = this.props;
    let s = this.state;
    /* asynch/synch data from apiLayer */
    let { data, loading } = p;

    /* fields rappresents the type of field and its default Value */
    let {
      allListActions,
      allListCovers,
      allListExtras,
      children,
      icon,
      cover,
      actions,
      extra,
      cardMetaTitle,
      cardMetaDescription,
    } = s.ComponentCustomization;

    return (
      <Card
        {...s.ComponentCustomization}
        cover={cover ? <img alt="example" src={cover} /> : null}
        actions={actions.map((action) => {
          let { label, value, icon } = allListActions.find(
            (el) => el.value === action
          );
          if (!value) return action;

          if (icon) return DynamicIcon(icon, { style: { fontSize: "20px" } });

          return <a href={value}>{label}</a>;
        })}
        extra={
          <Space split={<Divider type="vertical" />}>
            {extra.map((extraEl) => {
              let { label, value, icon } = allListExtras.find(
                (el) => el.value === extraEl
              );
              if (!value) return extraEl;

              if (icon)
                return DynamicIcon(icon, { style: { fontSize: "20px" } });

              return <a href={value}>{label}</a>;
            })}
          </Space>
        }
      >
        {cardMetaTitle || cardMetaDescription ? (
          <Card.Meta
            /* avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} */
            title={cardMetaTitle || ""}
            description={cardMetaDescription || ""}
          />
        ) : (
          <></>
        )}
        {children}
      </Card>
    );
  }
}
/* quale reducer vuoi utilizzare qui? solo math */
const mapStateToProps = (state) => {
  return {
    Session: state.SessionREDUCER,
    /*     Router: state.router,
    Site: state.SiteREDUCER,
    Manager: state.ManagerREDUCER, */
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    SetRoutes_: (routes) => {
      dispatch(SetRoutes(routes));
    },
    /*     SetDrawerCreateNewComponent_: (newProps) => {
      dispatch(SetDrawerCreateNewComponent(newProps));
    },
    SET_CurrentPage_: (newProps) => {
      dispatch(SET_CurrentPage(newProps));
    },
    SetComponentConfig_: (newProps) => {
      dispatch(SetComponentConfig(newProps));
    },
    SetComponentCustomization_: (newProps) => {
      dispatch(SetComponentCustomization(newProps));
    }, */
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Card_wrapperViewer);
