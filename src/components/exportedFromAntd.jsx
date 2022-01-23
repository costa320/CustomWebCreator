import React, { Component } from "react";
/* ANTD */
import * as antd from "antd";

const IComponents = {
  ...antd,
};

/* imported Antd Components */
export function DynamicComponent(name, props) {
  const TheComponent = IComponents[name];
  return <TheComponent {...props} />;
}

export function ComponentsList() {
  return IComponents;
}
