import React, {
  Component,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
/* COMPONENTS */
import { Select } from "antd";
import { Icon } from "design-react-kit";
/* EXTRA */
import { UUID } from "../../assets/extra/extra.ts";

/* STYLES */

export default class tipoPrestazioneDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  SetState(stateName, value) {
    this.setState({ [stateName]: value });
  }

  getOptions = (dataSource) => {
    if (dataSource && dataSource.length > 0) {
      return dataSource.map((el, i) => {
        return { ...el, label: el.Name, value: el.Id };

        /* <Select.Option
          data-select-key={`${id}_${i}`}
          id={`${id}_${i}`}
          key={UUID()}
          value={el.Id}
        >
          {el.Name}
        </Select.Option> */
      });
    } else {
      return [];
    }
  };

  render() {
    let s = this.state;
    let p = this.props;
    let { id } = p;
    let value = p.value ? p.value.toString() : null;
    return (
      <>
        <Select
          id={"TEST_"}
          data-select-key={id}
          {...p.opt}
          suffixIcon={
            <Icon
              color=""
              icon="it-arrow-down-triangle"
              padding={false}
              size="sm"
            />
          }
          disabled={p.disabled ? true : false}
          /*  defaultValue={p.defaultValue} */
          value={value}
          className={`w-100 antd-select-mod ${id}`}
          onChange={(value, opt) => p.onChange(value, opt)}
          loading={p.loading}
          options={this.getOptions(p.dataSource)}
        ></Select>
        <label className="label-mod">{p.label}</label>
      </>
    );
  }
}
