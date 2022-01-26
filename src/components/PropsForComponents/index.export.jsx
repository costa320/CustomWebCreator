import React, { Component } from "react";
import Table from "./components/Table.props";

const PropsComponents = {
  Table,
};

export function DynamicPropsComponent(name, props) {
  const ThePropsComponent = PropsComponents[name];
  if (ThePropsComponent) {
    return <ThePropsComponent {...props} componentName={name} />;
  } else {
    return `Le Props per il seguente (${name}) component non esistono`;
  }
}
