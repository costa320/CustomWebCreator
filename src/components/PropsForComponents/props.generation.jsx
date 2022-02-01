export function PropsGeneration(
  componentName,
  RowConfig,
  ComponentConfig,
  ComponentCustomization,
  APIConfig,
  Summary
) {
  switch (componentName) {
    case "Button":
      return ButtonPropsGeneration(
        RowConfig,
        ComponentConfig,
        ComponentCustomization,
        APIConfig,
        Summary
      );
    case "Table":
      return TablePropsGeneration(
        RowConfig,
        ComponentConfig,
        ComponentCustomization,
        APIConfig,
        Summary
      );
  }
}

export function ButtonPropsGeneration(
  RowConfig,
  ComponentConfig,
  ComponentCustomization,
  APIConfig,
  Summary
) {
  /* all columnsCreated=> allListColumns ; columns selected by user =>listColumns */
  let { allListColumns, listColumns } = ComponentConfig;
  let { apiDynamicData, staticData } = APIConfig;
  /*   let columns = listColumns.map((columnDataIndex) => {
    return {
      key: columnDataIndex,
      dataIndex: columnDataIndex,
      title: allListColumns.find(
        (col) => col.columnDataIndex === columnDataIndex
      ).columnName,
    };
  }); */
  let dataSource = apiDynamicData ? [] : staticData;

  return { ...ComponentCustomization };
}

export function TablePropsGeneration(
  RowConfig,
  ComponentConfig,
  ComponentCustomization,
  APIConfig,
  Summary
) {
  /* all columnsCreated=> allListColumns ; columns selected by user =>listColumns */
  let { allListColumns, listColumns } = ComponentCustomization;
  let { apiDynamicData, staticData } = APIConfig;

  let columns = listColumns.map((columnDataIndex) => {
    return {
      key: columnDataIndex,
      dataIndex: columnDataIndex,
      title: allListColumns.find(
        (col) => col.columnDataIndex === columnDataIndex
      ).columnName,
    };
  });
  let dataSource = apiDynamicData ? [] : staticData;

  return { columns, dataSource };
}
