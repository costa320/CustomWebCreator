import React, { Component } from "react";
/* ANTD */
import * as antd from "antd";
import * as antdIcons from "@ant-design/icons";
/* Layers */
import ApiLayerWrapper from "./ApiLayerWrapper";
import PropsLayerWrapper from "./PropsLayerWrapper";
/* MODELS */
import {
  ArrayField,
  ObjectField,
  SimpleField,
} from "../redux/models/Site.model";

/* all components exported from antd */
const IComponents = {
  ...antd,
};

const IIcons = {};

/* pulizia icone */
antdIcons &&
  Object.entries(antdIcons).map(([key, value]) => {
    if (value.$$typeof) IIcons[key] = value;
  });

const FormListComponents = {
  Input: {},
  InputNumber: {},
  Checkbox: {},
  Switch: {},
  Radio: {},
};

/* GET COMPONENT */
/* imported Antd Components */
export function DynamicComponent(component) {
  let { name, props, ApiEndpointConfig, fullConfiguration } = component;
  if (IComponents[name]) {
    const TheComponent = IComponents[name];
    return (
      <ApiLayerWrapper
        config={ApiEndpointConfig}
        fullConfiguration={fullConfiguration}
      >
        <TheComponent {...props} />
      </ApiLayerWrapper>
    );
  } else {
    return "component non esiste";
  }
}

/* just for visual purpose only */
export function PreviewDynamicComponent(name) {
  /* controll if the component was enabled/in whitelist */
  if (IComponents[name]) {
    const TheComponent = IComponents[name];
    return <TheComponent />;
  } else {
    return "component non esiste";
  }
}

/* GET COMPONENTS LIST */
export function ComponentsList() {
  return IComponents;
}

/* GET FORM COMPONENTS LIST */
export function FormComponentsList() {
  return FormListComponents;
}

/* GET ICON */
/* imported Antd Icons */
export function DynamicIcon(name, props = {}) {
  // let Fun = IIcons["setTwoToneColor"];
  // let Alert = IIcons["AlertFilled"];

  // let typeOf$$ = Fun.$$typeof; /* undefined */
  // let typeOfAlert$$ = Alert.$$typeof; /* Symbol(react.forward_ref) */

  // let type1 = typeof Fun;
  // let type2 = typeof Alert;

  if (IIcons[name]) {
    const TheIcon = IIcons[name];
    return <TheIcon {...props} />;
  } else {
    return "component non esiste";
  }
}

/* GET ICONS LIST */
export function IconList() {
  return IIcons;
}
