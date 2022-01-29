import React, { Component } from "react";
import Table from "./components/Table.props";
import Form from "./components/Form.props";

const PropsComponents = {
  Table,
  Form,
};

export function DynamicPropsComponent(name, props) {
  const ThePropsComponent = PropsComponents[name];
  if (ThePropsComponent) {
    return <ThePropsComponent {...props} componentName={name} />;
  } else {
    return `Le Props per il seguente (${name}) component non esistono`;
  }
}
