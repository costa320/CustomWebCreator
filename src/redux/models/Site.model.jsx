import { IconList } from "../../components/exportedFromAntd";

const generalGrid_ = {
  span: 6,
  offset: null,
  flex: null,
  order: null,
};
const complexGrid_ = {
  xs: {
    /* screen < 576px */
    span: 6,
    offset: null,
    flex: null,
    order: 1,
  },
  sm: {
    /* screen ≥ 576px */
    span: 6,
    offset: null,
    flex: null,
    order: 1,
  },
  md: {
    /* screen ≥ 768px */
    span: 6,
    offset: null,
    flex: null,
    order: 1,
  },
  lg: {
    /* screen ≥ 992px */
    span: 6,
    offset: null,
    flex: null,
    order: 1,
  },
  xl: {
    /* screen ≥ 1200px */
    span: 6,
    offset: null,
    flex: null,
    order: 1,
  },
  xxl: {
    /* screen ≥ 1600px */
    span: 6,
    offset: null,
    flex: null,
    order: 1,
  },
};

export const _hgutters = [0, 2, 4, 8, 16, 24, 32, 40, 48];
export const _vgutters = [0, 2, 4, 8, 16, 24, 32, 40, 48];

export class _Row {
  constructor(
    row_id,
    hgutters = 8,
    vgutters = 16,
    justify = "start",
    align = null,
    cols = new Array(4).fill().map((e, col_i) => new _Col(col_i, row_id))
  ) {
    // Constructor
    this.row_id = row_id;
    this.hgutters = hgutters;
    this.vgutters = vgutters;
    this.justify = justify;
    this.align = align;
    this.cols = cols;
  }
}

export class _Col {
  constructor(
    col_id = 0,
    row_id,
    generalGrid = generalGrid_,
    ComplexGridEnabled = false,
    complexGrid = complexGrid_,
    component = null
  ) {
    // Constructor
    this.col_id = col_id;
    this.row_id = row_id;
    this.generalGrid = generalGrid;
    this.ComplexGridEnabled = ComplexGridEnabled;
    this.complexGrid = complexGrid;
    this.component = component;
  }
}

export class _Component {
  constructor(name = "", propsInterface, wrapperViewer) {
    // Constructor
    this.name = name;
    this.propsInterface = propsInterface;
    this.wrapperViewer = wrapperViewer;
  }
}

export class ArrayField {
  /* properties */
  constructor(
    items = [],
    defaultItemValue = null,
    fieldLabel = "Some text",
    fieldHelper = "Text to help",
    hidden = false
  ) {
    this.type = "array";
    this.items = items;
    this.defaultValue = defaultItemValue;
    this.fieldLabel = fieldLabel;
    this.fieldHelper = fieldHelper;
    this.hidden = hidden;
  }
  /* item => {key,value,label} key could be === value || could be undefined */
}

export class ObjectField {
  /* properties */
  constructor(properties = {}) {
    this.type = "object";
    this.properties = this.generateProperties(properties);
  }
  generateProperties(properties) {
    let newObj = {};
    Object.keys(properties).forEach((key) => {
      let value = properties[key];
      newObj[key] = new SimpleField(typeof value);
    });
    return newObj;
  }
}

export class SimpleField {
  constructor(
    fieldType = "string" | "number" | "boolean",
    defaultValue = null,
    fieldLabel = "Some text",
    fieldHelper = "Text to help",
    hidden = false
  ) {
    this.type = fieldType;
    this.defaultValue = defaultValue;
    this.fieldLabel = fieldLabel;
    this.fieldHelper = fieldHelper;
    this.hidden = hidden;
  }
}
export class ApiEndpointConfig {
  constructor(url = "", method = "get", headers = {}) {
    this.method = method;
    this.url = url;
    this.headers = headers;
  }
}

export class IconField {
  constructor(
    defaultValue = null,
    fieldLabel = "Some text",
    fieldHelper = "Text to help"
  ) {
    this.type = "icon";
    this.defaultValue = defaultValue;
    this.IconList = this.getFormattedIconList(IconList());
    this.fieldLabel = fieldLabel;
    this.fieldHelper = fieldHelper;
  }

  getFormattedIconList(iconList) {
    return iconList
      ? Object.entries(iconList).map(([key, IconComponent]) => ({
          label: key,
          value: key,
          IconComponent,
        }))
      : [];
  }
}
export class FunctionField {
  constructor(defaultValue = null) {
    this.type = "function";
    this.defaultValue = defaultValue;
  }
}
