import React, { Component } from "react";
/* ANTD */
import { Table } from "antd";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import { MenuOutlined } from "@ant-design/icons";
import { arrayMoveImmutable } from "array-move";
/* STYLE */
import "../../assets/styles/DraggableTable.css";

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
));

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

export default class SortableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*  dataSource: [], */
    };
  }
  /* 
  componentDidMount() {
    let p = this.props;
    let { dataSource } = p;
    this.setState({ dataSource });
  }

  componentWillReceiveProps(nextProps) {
    let p = this.props;
    let { dataSource } = p;
    if (JSON.stringify(dataSource) !== JSON.stringify(nextProps.dataSource)) {
      this.setState({ dataSource: nextProps.dataSource });
    }
  } */

  getColumns = () => {
    let p = this.props;
    let { dataSource, columns, extraTableProps } = p;
    return [
      {
        title: "Ordina",
        dataIndex: "sort",
        width: 30,
        align: "center",
        className: "drag-visible",
        render: () => <DragHandle />,
      },
      ...columns,
    ];
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.props;
    if (oldIndex !== newIndex) {
      let newData = arrayMoveImmutable(
        [].concat(dataSource),
        oldIndex,
        newIndex
      ).filter((el) => !!el);
      console.log("Sorted items: ", newData);

      /* Adattamento newData per Riadattare L'Order */
      newData = newData.map((el, i) => ({ ...el, Order: i + 1 }));

      /* this.setState({ dataSource: newData }); */
      /* update father component */
      this.props.onSortEnd(newData);
    }
  };

  DraggableContainer = (props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource } = this.props;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x.Order === restProps["data-row-key"]
    );
    return <SortableItem index={index} {...restProps} />;
  };

  render() {
    let s = this.state;
    let p = this.props;
    let { extraTableProps, dataSource } = p;
    /* let { dataSource } = s; */

    return (
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={this.getColumns()}
        rowKey="Order"
        components={{
          body: {
            wrapper: this.DraggableContainer,
            row: this.DraggableBodyRow,
          },
        }}
        {...extraTableProps}
      />
    );
  }
}
