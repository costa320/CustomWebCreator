import React, {
  Component,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
/* COMPONENTS */
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
/* EXTRA */
import { UUID } from "../../assets/extra/extra.ts";
/* STYLES */

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,

      color: "#000000",
      fullColor: null,
    };
  }

  componentDidMount() {
    let { color, colorPickerEnabled } = this.props;
    if (color) this.setState({ color });
  }

  SetState(stateName, value) {
    this.setState({ [stateName]: value });
  }

  handleClick = () => {
    let p = this.props;
    /* onChangeColor is defined === u can edit, else the popup did not open*/
    if (p.onChangeColor) {
      this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }
  };

  handleClose = () => {
    let s = this.state;

    this.setState({ displayColorPicker: false });
    this.props.onChangeColor(s.fullColor || { hex: s.color });
  };

  handleChange = (color) => {
    this.setState({ color: color.hex });
    this.setState({ fullColor: color });
  };

  render() {
    let s = this.state;
    let p = this.props;
    let dataSource = p.dataSource;

    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: `${this.state.color}`,
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </>
    );
  }
}
