import React, { Component } from "react";
/* ANTD */
import { Form, Input, Button, Checkbox } from "antd";
import { SaveOutlined } from "@ant-design/icons";
/* COLORS */
import ColorPicker from "../../general/ColorPicker";
/* COMPONENTS */
import reactCSS from "reactcss";
/* EXTRA */
import ErrorBoundary from "../../Shared/ErrorBoundary";
/* Styles */

export default class ManagerMessaggiDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      loading: false,

      /* optional Message Color */
      messageColor: props.Color || "#000000",

      /* dataMeanwhile user is editing them */
      data: {},
    };
  }

  onFinish = (values) => {
    let NewValues = values;
    let p = this.props;
    let s = this.state;

    /* new color of message */
    let { messageColor } = s;
    /* predefined properties */
    let { drawerInEdit, dataSource } = p;

    /* if this Color is predefined concatenate newColor */
    if (dataSource.Color) {
      NewValues = {
        ...NewValues,
        Color: messageColor,
      };
    } else {
      NewValues = {
        ...NewValues,
        Color: null,
      };
    }

    this.setState({ loading: true });
    p.salvaDati(NewValues, drawerInEdit);
    console.log("Success:", NewValues);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handleChangeMessageColorPicker = (color, event) => {
    this.setState({ messageColor: color.hex });
  };

  handleValuesChange = (changedValues, allValues) => {
    this.setState({ data: allValues });
  };

  render() {
    let s = this.state;
    let p = this.props;
    let { keyPageWithColor } = s;
    /* dataMeanwhile user is editing them */
    /* let { KeyPage, Message, Title } = s.data; */

    /* dataSource is init values */
    let { drawerInEdit, dataSource } = p;
    let { KeyPage, Message, Title, IsDeletable, IsEnable, Color } = dataSource;

    return (
      <Form
        name="messageForm"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={dataSource}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
        onValuesChange={this.handleValuesChange}
      >
        {String(IsEnable) && (
          <Form.Item label="IsEnable" name="IsEnable" hidden>
            <Input />
          </Form.Item>
        )}

        {String(IsDeletable) && (
          <Form.Item label="IsDeletable" name="IsDeletable" hidden>
            <Input />
          </Form.Item>
        )}

        <Form.Item label="Identificativo Callout" name="KeyPage">
          <Input disabled={drawerInEdit} />
        </Form.Item>

        <Form.Item
          label="Titolo"
          name="Title"
          rules={[{ required: true, message: "Per favore, immetti un valore!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        {Color && (
          <Form.Item label="Colore Messaggio">
            <ColorPicker
              color={Color}
              onChangeColor={this.handleChangeMessageColorPicker}
            />
          </Form.Item>
        )}

        <Form.Item
          label="Messaggio"
          name="Message"
          rules={[{ required: true, message: "Per favore, immetti un valore!" }]}
        >
          <Input.TextArea rows={15} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button
            loading={s.loading}
            size={"large"}
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
          >
            Salva
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
