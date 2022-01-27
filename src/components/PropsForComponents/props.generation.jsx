export function PropsGeneration(
  componentName,
  RowConfig,
  ComponentConfig,
  APIConfig,
  Summary
) {
  switch (componentName) {
    case "Table":
      return TablePropsGeneration(
        RowConfig,
        ComponentConfig,
        APIConfig,
        Summary
      );
  }
}

export function TablePropsGeneration(
  RowConfig,
  ComponentConfig,
  APIConfig,
  Summary
) {
  /* all columnsCreated=> allListColumns ; columns selected by user =>listColumns */
  let { allListColumns, listColumns } = ComponentConfig;
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
