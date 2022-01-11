import React, { Component } from "react";
import { Redirect } from "react-router";
/* COMPONENTS */
import { Async } from "react-select";
import { Input, Icon, Button } from "design-react-kit";
/* STYLES */

export default class SearchAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      value: "",
      options: [{ value: "light", label: "Light" }],
      selecteditem: {},
    };
  }

  SetState = (state, value) => {
    this.setState({ [state]: value });
  };

  render() {
    let s = this.state;
    let p = this.props;

    return (
      <div className="form-group" style={{ minWidth: "200px" }}>
        {s.redirect ? (
          <Redirect
            push
            to={{
              pathname: s.redirect,
              state: { name: '' },
            }}
          />
        ) : null}

        <div className="form-group">
          <div className="input-group">
            <Input
              onChange={({ target }) => this.SetState("value", target.value)}
              className="form-control"
              id="input-group-1"
              name="input-group-1"
              placeholder="Ricerca domanda"
              /*               onBlur={function noRefCheck() {}}
              onFocus={function noRefCheck() {}} */
              type="text"
            />
            <div className="input-group-append">
              <button
                className="btn rounded-0"
                id="button-1"
                type="button"
                onClick={() => this.SetState("redirect", "/risultati-ricerca")}
              >
                <Icon
                  className={s.value.length >= 2 && "active-svg"}
                  color={!(s.value.length >= 2) && "black"}
                  icon="it-search"
                  padding={false}
                  size="sm"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
