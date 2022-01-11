import React, { Component } from "react";
/* ANTD */
import { Form, Input, Button, Switch, InputNumber, Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";
/* COMPONENTS */

/* EXTRA */
import ErrorBoundary from "../../Shared/ErrorBoundary";
/* Styles */

export default class FondiPrestazioniDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      loading: false,

      /* dataMeanwhile user is editing them */
      data: {},
    };
  }

  onFinish = (values) => {
    let p = this.props;
    let s = this.state;
    let { drawerInEdit } = p;

    this.setState({ loading: true });
    p.salvaDati(values, drawerInEdit);
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handleValuesChange = (changedValues, allValues) => {
    this.setState({ data: allValues });
  };

  render() {
    let s = this.state;
    let p = this.props;
    let { keyPageWithColor } = s;
    /* dataMeanwhile user is editing them */
    /* let { Id, Name, TipoTicket, IsEnable, Codice, Titolario } = s.data; */

    /* dataSource is init values */
    let { drawerInEdit, dataSource, ElencoPrestazioni } = p;
    let { Id } = dataSource;

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
        {String(Id) && (
          <Form.Item label="Id" name="Id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.Item
          label="Nome"
          name="Name"
          rules={[{ required: true, message: "Per favore, immetti un valore!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="N° Ordine"
          name="Order"
          rules={[{ required: true, message: "Per favore, immetti un valore!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Abilitato" name="IsEnable" valuePropName={"checked"}>
          <Switch />
        </Form.Item>

        <Form.Item
          label="Tipo Prestazione"
          name="IdPrestazione"
          rules={[{ required: true, message: "Per favore, immetti un valore!" }]}
        >
          <Select defaultActiveFirstOption={false}>
            {ElencoPrestazioni.map((prestazione) => (
              <Select.Option value={prestazione.Id}>
                {prestazione.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Codice"
          name="Codice"
          rules={[{ required: true, message: "Per favore, immetti un valore!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="Sigla"
          name="Sigla"
          rules={[{ required: true, message: "Per favore, immetti un valore!" }]}
        >
          <Input />
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
