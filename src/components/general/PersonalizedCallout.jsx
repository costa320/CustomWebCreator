import React, { Component } from "react";
/* COMPONENTS */
import { Callout, CalloutTitle, CalloutText, Icon } from "design-react-kit";
/* ANTD */
import { Skeleton } from "antd";
/* EXTRA */
import { UUID } from "../../assets/extra/extra.ts";

/* STYLES */

export default class PersonalizedCallout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* skeleton style */
      active: true,
      size: "small",
      buttonShape: "round",
      avatarShape: "circle",
      paragraph: { rows: 3 },
    };
  }

  SetState(stateName, value) {
    this.setState({ [stateName]: value });
  }

  render() {
    let s = this.state;
    let p = this.props;
    let callout = p.callout;
    let icon = p.icon;
    let loading = p.loading ? p.loading : false;
    let styleTitle = p.styleTitle
      ? { ...p.styleTitle, minWidth: "200px" }
      : { minWidth: "200px" };

    let defaultIconStyle = { ariaHidden: true };
    let defaultCalloutStyle = { maxWidth: "100%", minWidth: "100%" };
    let { active, size, buttonShape, paragraph } = s;

    return (
      <Callout
        color={callout && callout.colorC ? callout.colorC : ""}
        highlight={false}
        tag="div"
        style={callout && callout.styleC ? callout.styleC : defaultCalloutStyle}
      >
        <CalloutTitle tag="div" className="bck-mod" style={styleTitle}>
          <Skeleton
            loading={loading}
            active={active}
            size={size}
            shape={buttonShape}
            paragraph={{ rows: 0, width: 100 }}
            className="skeleton-title-mod"
          >
            <Icon
              color={icon && icon.color ? icon.color : ""}
              icon={icon && icon.name ? icon.name : "it-info-circle"}
              size={icon && icon.size ? icon.size : ""}
              style={icon && icon.style ? icon.style : defaultIconStyle}
              padding={false}
            />
            {callout && callout.titleC}
          </Skeleton>
        </CalloutTitle>
        <CalloutText bigText={false} tag="p">
          <Skeleton
            loading={loading}
            paragraph={paragraph}
            active={active}
            size={size}
            shape={buttonShape}
          >
            {callout && callout.messageC}
          </Skeleton>
        </CalloutText>
      </Callout>
    );
  }
}
