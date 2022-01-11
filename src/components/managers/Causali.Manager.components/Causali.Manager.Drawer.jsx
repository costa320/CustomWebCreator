import React, { Component } from "react";
/* ANTD */
import { Form, Input, Button, InputNumber, Select, DatePicker } from "antd";
import { SaveOutlined, InfoCircleOutlined } from "@ant-design/icons";
/* COMPONENTS */

/* EXTRA */
import ErrorBoundary from "../../Shared/ErrorBoundary";
/* MOMENT */
import moment from "moment";
import locale from "antd/es/date-picker/locale/it_IT";

/* Styles */

export default class ManagerCausaliDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      loading: false,

      /* dataMeanwhile user is editing them */
      data: {},

      /* moment */
      LF: "DD/MM/YYYY",
    };
  }

  onFinish = (values) => {
    let p = this.props;
    let s = this.state;
    let { drawerInEdit } = p;
    let { LF } = s;

    let { rangePickerDataDalAl, datePickerDataAssunzione } = values;

    /* re-arranging obj by standard */
    let ModValues = {
      ...values,
      DataDal: rangePickerDataDalAl[0].format(LF),
      DataAl: rangePickerDataDalAl[1].format(LF),
      DataAssunzione: datePickerDataAssunzione.format(LF),
    };

    /* removing temporary properties */
    delete ModValues.rangePickerDataDalAl;
    delete ModValues.datePickerDataAssunzione;

    /* Saving new ModValues */
    this.setState({ loading: true });
    p.salvaDati(ModValues, drawerInEdit);
    console.log("Success:", ModValues);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handleValuesChange = (changedValues, allValues) => {
    this.setState({ data: allValues });
  };

  DisableDateForRangePicker = (current) => {
    // Can not select days before today and today
    return current && current < moment().subtract(1, "year").subtract(1, "day");
  };

  render() {
    let s = this.state;
    let p = this.props;
    let { keyPageWithColor, LF } = s;
    /* dataMeanwhile user is editing them */
    /* let { Id, Name, TipoTicket, IsEnable, Codice, Titolario } = s.data; */

    /* dataSource is init values */
    let { drawerInEdit, dataSource, ElencoPrestazioni } = p;
    let { Id, DataDal, DataAl, DataAssunzione } = dataSource;

    let modDataSource = {
      ...dataSource,
      rangePickerDataDalAl: [
        DataDal ? moment(DataDal, LF) : null,
        DataAl ? moment(DataAl, LF) : null,
      ],
      datePickerDataAssunzione: DataAssunzione
        ? moment(DataAssunzione, LF)
        : null,
    };

    return (
      <Form
        name="messageForm"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={modDataSource}
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
          rules={[
            { required: true, message: "Per favore, immetti un valore!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Data dal - al"
          name={"rangePickerDataDalAl"}
          rules={[
            {
              type: "array",
              required: true,
              message: "Per favore, seleziona una data",
            },
          ]}
        >
          <DatePicker.RangePicker
            disabledDate={this.DisableDateForRangePicker}
            locale={locale}
            format={LF}
          />
        </Form.Item>
        {/*         <Form.Item
          label="Data dal"
          name="DataDal"
          rules={[{ required: true, message: "Per favore, immetti un valore!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Data al"
          name="DataAl"
          rules={[{ required: true, message: "Per favore, immetti un valore!" }]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          label="Anno"
          name="Anno"
          rules={[
            { required: true, message: "Per favore, immetti un valore!" },
          ]}
        >
          <InputNumber min={moment().format("YYYY") - 1} />
        </Form.Item>
        <Form.Item
          label="Data assunzione"
          name="datePickerDataAssunzione"
          rules={[
            { required: true, message: "Per favore, immetti un valore!" },
          ]}
        >
          <DatePicker locale={locale} format={LF} />
        </Form.Item>
        <Form.Item
          label="Numero settimane"
          name="NumeroSettimane"
          rules={[
            { required: true, message: "Per favore, immetti un valore!" },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Tipo Prestazione"
          name="TipoPrestazione"
          rules={[
            { required: true, message: "Per favore, immetti un valore!" },
          ]}
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
          label="Limite presentazione"
          name="LimitePresentazioneInGiorni"
          tooltip={{
            title: "Limite Presentazione in giorni (es. '31')",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            { required: true, message: "Per favore, immetti un valore!" },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="ExternalRef"
          name="ExternalRef"
          rules={[
            { required: true, message: "Per favore, immetti un valore!" },
          ]}
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
