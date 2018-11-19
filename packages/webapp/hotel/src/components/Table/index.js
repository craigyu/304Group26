import ReactTable from 'react-table';
import React from 'react';

// refer to Log/index.js for example on how to format columns and data props, or read react-table documentation
class Table extends React.Component {
  render() {
    const { columns, data, showPagination, className, getTdProps, sortByID } = this.props;
    let defaultSorted = [];
    if (sortByID){
      defaultSorted = [
        {
          id: sortByID,
          desc: true
        }
      ]
    }
    return (<ReactTable
      className={className}
      columns={columns}
      data={data}
      showPagination={showPagination}
      minRows={5}
      getTdProps={getTdProps}
      defaultSorted={defaultSorted}
    />)
  }
}

export default Table;
