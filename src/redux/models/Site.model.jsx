const generalGrid_ = {
  span: 24,
  offset: null,
  flex: null,
  order: 1,
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
    cols = [new _Col(0, row_id)]
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
  constructor(name = "", props = {}, ApiEndpoint = "") {
    // Constructor
    this.name = name;
    this.props = props;
    this.ApiEndpoint = ApiEndpoint;
  }
}

export class ArrayField {
  /* properties */
  constructor(typeOfElementInside, properties) {
    this.type = "array";
    this.items = this.generateItems(typeOfElementInside, properties);
  }
  generateItems(typeOfElementInside, properties) {
    if (typeOfElementInside === "object") return new ObjectField(properties);
    else return new SimpleField(typeOfElementInside);
  }
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
  constructor(fieldType = "string" | "number" | "boolean") {
    this.type = fieldType;
  }
}
export class ApiEndpointConfig {
  constructor(url = "", method = "get", headers = {}) {
    this.method = method;
    this.url = url;
    this.headers = headers;
  }
}
