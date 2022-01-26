import React, { Component } from "react";
/* ANTD */
import * as antd from "antd";
import * as antdIcons from "@ant-design/icons";
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

/* whiteListed components */
const WhiteListComponents = {
  Table: {
    props: {
      dataSource: new ArrayField("object", {
        key: 1,
        name: "Mike",
        age: 32,
        human: true,
      }),
      columns: new ArrayField("object", {
        title: "Name",
        dataIndex: "name",
        key: "name",
      }),
    },
  },
  Divider: {
    props: {},
  },
};

/* GET COMPONENT */
/* imported Antd Components */
export function DynamicComponent(name, props) {
  /* controll if the component was enabled/in whitelist */
  if (process.env.COMPONENTS_FILTERS === "enabled") {
    if (WhiteListComponents[name]) {
      const TheComponent = IComponents[name];
      return <TheComponent {...props} />;
    } else {
      return "component non è stato censito";
    }
  } else {
    return "component non è abilitato";
  }
}

/* GET COMPONENTS LIST */
export function ComponentsList() {
  if (process.env.COMPONENTS_FILTERS === "enabled") {
    /* all components are returned... */
    return WhiteListComponents;
  } else {
    return IComponents;
  }
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

class DynamicPropsComponent {
  constructor() {
    /*  row_id,
    hgutters = 8,
    vgutters = 16,
    justify = "start",
    align = null */
    // Constructor
    /*   this.row_id = row_id;
    this.hgutters = hgutters;
    this.vgutters = vgutters;
    this.justify = justify;
    this.align = align;
    this.cols = cols; */
  }
}
