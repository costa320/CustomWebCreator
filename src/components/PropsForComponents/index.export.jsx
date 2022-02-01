import React, { Component } from "react";
/* HELPERS */
import {
  SimpleField,
  ArrayField,
  ObjectField,
  ApiEndpointConfig,
  IconField,
  FunctionField,
} from "../../redux/models/Site.model";
/* COMPONENT PROPS */
import Table from "./components/Table.props";
/* import Form from "./components/Form.props"; */
import Button from "./components/Button.props";

const PropsComponents = {
  Table,
  Button,
};

const defaultSettings = {
  Button: {
    children: "Bottone",
    fields: {
      block: new SimpleField(
        "boolean",
        false,
        "Block",
        "Option to fit button width to its parent width"
      ),
      danger: new SimpleField(
        "boolean",
        false,
        "Danger",
        "Set the danger status of button"
      ),
      disabled: new SimpleField(
        "boolean",
        false,
        "Disabled",
        "Disabled state of button"
      ),
      ghost: new SimpleField(
        "boolean",
        false,
        "Ghost",
        "Make background transparent and invert text and border colors"
      ),
      loading: new SimpleField(
        "boolean",
        false,
        "Loading",
        "Set the loading status of button"
      ) /* boolean | { delay: number } */,
      shape: new ArrayField(
        [
          { value: "default", label: "Default" },
          { value: "circle", label: "Circolare" },
          { value: "round", label: "Rotondo" },
        ],
        "default",
        "Shape",
        "Can be set button shape"
      ),
      size: new ArrayField(
        [
          { value: "small", label: "Piccolo" },
          { value: "middle", label: "Medio" },
          { value: "large", label: "Grande" },
        ],
        "middle",
        "Size",
        "Set the size of button"
      ),
      type: new ArrayField(
        [
          { value: "default", label: "Default" },
          { value: "primary", label: "Primary" },
          { value: "ghost", label: "Ghost" },
          { value: "dashed", label: "Dashed" },
          { value: "link", label: "Link" },
          { value: "text", label: "Text" },
        ],
        "default",
        "Type",
        "Can be set to primary, ghost, dashed, link, text, default."
      ),
      icon: new IconField(null, "Select Icon", "Select Icon from the list"),
      onClick: new FunctionField(),
    },
  },
  Table: {
    children: [],
    fields: {},
  },
};

export function DynamicPropsComponent(name, props) {
  const ThePropsComponent = PropsComponents[name];
  if (ThePropsComponent) {
    return <ThePropsComponent {...props} componentName={name} />;
  } else {
    return `Le Props per il seguente (${name}) component non esistono`;
  }
}

/* will create plain props object e.g. {color:'red'...} with default settings */
export function getFullDefaultPropsSettings(name) {
  const defaultPropsSettings = defaultSettings[name];
  if (defaultPropsSettings) {
    return defaultPropsSettings;
  } else {
    return `Le default Props per il seguente (${name}) component non esistono`;
  }
}

/* will create plain props object e.g. {color:'red'...} with default settings */
export function getDefaultPropsSettings(name) {
  if (defaultSettings[name]?.fields) {
    const defaultPropsSettings = defaultSettings[name].fields;
    let newObjProps = {};
    Object.keys(defaultPropsSettings).forEach((key) => {
      newObjProps[key] = defaultPropsSettings[key].defaultValue;
    });
    return newObjProps;
  } else {
    return `Le default Props per il seguente (${name}) component non esistono`;
  }
}

export function DidDefaultPropsSettingsExist(name) {
  return defaultSettings[name];
}
