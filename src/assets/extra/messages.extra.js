import React from "react";
import { message } from "antd";
import { Icon } from "design-react-kit";

export function openMessage(
  labelText = "Salvataggio avvenuto con successo",
  iconOpt = "info",
  duration = 5
) {
  let icon;
  switch (iconOpt) {
    case "info":
      icon = {
        name: "info",
        color: "primary",
        style: { borderLeft: "4px solid #2f82d5" },
      };
      break;
    case "error":
      icon = {
        name: "close",
        color: "danger",
        style: { borderLeft: "4px solid #d9364f" },
      };
      break;
    case "warning":
      icon = {
        name: "warning",
        color: "warning",
        style: { borderLeft: "4px solid #a66300" },
      };
      break;
    case "success":
      icon = {
        name: "check",
        color: "success",
        style: { borderLeft: "4px solid #3fa581" },
      };
      break;
  }
  message.open({
    content: (
      <div className={`mod-notifications`} style={icon.style}>
        <div className="d-flex mr-auto mod-notifications-header">
          <strong>
            <Icon
              color={icon.color}
              icon={`it-${icon.name}-circle`}
              padding={false}
              style={{
                ariaHidden: true,
              }}
            />
            {labelText}
          </strong>
        </div>
      </div>
    ),
    className: "custom-class",
    style: {
      marginTop: "5vh",
      marginLeft: "70vw",
    },
    duration: duration,
  });
}
