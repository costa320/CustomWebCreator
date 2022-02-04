import React, { Component } from "react";
/* HELPERS */
import {
  SimpleField,
  ArrayField,
  ObjectField,
  ApiEndpointConfig,
  IconField,
  FunctionField,
  _Component,
} from "../../redux/models/Site.model";
/* COMPONENTS */
import Table_props from "./components/Table/Table.props";
import Table_viewer from "./components/Table/Table.viewer";

import Button_props from "./components/Button/Button.props";
import Button_viewer from "./components/Button/Button.viewer";

import Card_props from "./components/Card/Card.props";
import Card_viewer from "./components/Card/Card.viewer";

/* PropsComponents=> {name,propsInterface,wrapperViewer} */
const PropsComponents = {
  Table: new _Component("Table", Table_props, Table_viewer),
  Button: new _Component("Button", Button_props, Button_viewer),
  Card: new _Component("Card", Card_props, Card_viewer),
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
  Card: {
    children: "Testo di esempio",
    fields: {
      title: new SimpleField(
        "string",
        "Default card",
        "Title",
        "Card title",
        true
      ),
      cardMetaTitle: new SimpleField(
        "string",
        "Card title",
        "Meta Title",
        "Title inside Meta Card",
        true
      ),
      cardMetaDescription: new SimpleField(
        "string",
        "This is the description",
        "Meta Description",
        "Description inside Meta Card",
        true
      ),
      size: new ArrayField(
        [
          { value: "default", label: "Default" },
          { value: "small", label: "Small" },
        ],
        "default",
        "Size",
        "Set the size of card"
      ),
      hoverable: new SimpleField(
        "boolean",
        true,
        "Hoverable",
        "Lift up when hovering card"
      ),
      extra: new ArrayField(
        [{ value: "more", label: "More", icon: null }],
        ["more"],
        "Extra",
        "Content to render in the top-right corner of the card",
        true
      ),
      bordered: new SimpleField(
        "boolean",
        true,
        "Bordered",
        "Toggles rendering of the border around the card"
      ),
      actions: new ArrayField(
        [
          { value: "edit", label: "Edit", icon: "EditOutlined" },
          { value: "elipses", label: "Elipses", icon: "EllipsisOutlined" },
          { value: "settings", label: "Settings", icon: "SettingOutlined" },
        ],
        ["edit", "elipses", "settings"],
        "Actions",
        "The action list, shows at the bottom of the Card",
        true
      ),
      cover: new ArrayField(
        [
          {
            value:
              "https://image.shutterstock.com/image-vector/abstract-financial-chart-arrow-260nw-1028158363.jpg",
            label: "Google Image",
          },
          {
            value:
              "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            label: "Bear Image",
          },
        ],
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        "Cover",
        "Card cover",
        true
      ),
    },
  },
  Table: {
    children: [],
    fields: {},
  },
};

export function DynamicPropsComponent(name, props = {}) {
  const ThePropsComponent = PropsComponents[name].propsInterface;
  if (ThePropsComponent) {
    return <ThePropsComponent {...props} componentName={name} />;
  } else {
    return `Le Props per il seguente (${name}) component non esistono`;
  }
}

export function DynamicViewerComponent(name, props = {}) {
  const TheViewerComponent = PropsComponents[name].wrapperViewer;
  if (TheViewerComponent) {
    return <TheViewerComponent {...props} componentName={name} />;
  } else {
    return `Il DynamicViewerComponent per il seguente (${name}) component non esistono`;
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
