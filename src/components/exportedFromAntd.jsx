import React, { Component } from "react";
/* ANTD */
import * as antd from "antd";
import * as antdIcons from "@ant-design/icons";
/* Layers */
import ApiLayerWrapper from "./ApiLayerWrapper";
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

const IIcons = {
  ...antdIcons,
};

const FormListComponents = {
  Input: {},
  InputNumber: {},
  Checkbox: {},
  Switch: {},
  Radio: {},
};

/* GET COMPONENT */
/* imported Antd Components */
export function DynamicComponent({ name, props, ApiEndpointConfig }) {
  if (IComponents[name]) {
    const TheComponent = IComponents[name];
    return (
      <ApiLayerWrapper config={ApiEndpointConfig}>
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
export function DynamicIcon(name, props) {
  /* controll if the component was enabled/in whitelist */
  const TheComponent = IIcons[name];
  return <TheComponent {...props} />;
}

/* GET ICONS LIST */
export function IconsList() {
  return IIcons;
}
