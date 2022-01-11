import React, {
  Component,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
/* COMPONENTS */
import { List } from "antd";
import { Icon } from "design-react-kit";
/* EXTRA */
import { UUID } from "../../assets/extra/extra.ts";
/* STYLES */

export default class ErrorList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  SetState(stateName, value) {
    this.setState({ [stateName]: value });
  }

  render() {
    let s = this.state;
    let p = this.props;
    let dataSource = p.dataSource;
    /*  es. =>   [
      {
        title: "Prestazione.IdTipoPrestazione",
        descriptions: ["Il campo IdTipoPrestazione è obbligatorio."],
        icon: {
          color: "danger",
          name: "it-error",
          size: "lg",
        },
      },
    ]; */

    return (
      <>
        {dataSource && (
          <List
            itemLayout="horizontal"
            dataSource={dataSource}
            renderItem={(item) => {
              let icon = item.icon;
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Icon
                        color={icon && icon.color ? icon.color : "danger"}
                        icon={icon && icon.name ? icon.name : "it-error"}
                        padding={false}
                        size={icon && icon.size ? icon.size : ""}
                      />
                    }
                    title={<p>{item.title}</p>}
                    description={
                      <List
                        size="small"
                        bordered
                        dataSource={item.descriptions}
                        renderItem={(description) => (
                          <List.Item>
                            <p>- {description}</p>
                          </List.Item>
                        )}
                      />
                    }
                  />
                </List.Item>
              );
            }}
          />
        )}
      </>
    );
  }
}
