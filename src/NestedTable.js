import React, { Component } from 'react';
import Pagination from './Pagination'
import './NestedTable.css';
export default class NestedTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortColumn: "",
      sortType: "",
      activePage: 1
    }
  }
  onChangePage = (index) => {
    this.setState({
      activePage: index
    })
  }
  //Perform sorting operation for string data type value
  textSort = (name, type, data) => {
    let sortType = (type == "ascending") ? true : false;
    if (name == "name") {
      data = data.sort(function (a, b) {
        let nameA = a[name].toLowerCase(), nameB = b[name].toLowerCase()
        if (nameA < nameB)
          return sortType ? -1 : 1
        if (nameA > nameB)
          return sortType ? 1 : -1
        return 0
      })
    }
    else if (name == "languageName" || name == "languageByte") {
      let lname = (name == "languageName") ? "name" : "byte";
      if (lname == "name") {
        data = data.map((value, index) => {
          value.languages = value.languages.sort(function (a, b) {
            let nameA = a[lname].toLowerCase(), nameB = b[lname].toLowerCase()
            if (nameA < nameB)
              return sortType ? -1 : 1
            if (nameA > nameB)
              return sortType ? 1 : -1
            return 0
          })
          return value;
        })
      }
      else {
        //Perform sort operation for numeric type
        data = data.map((value, index) => {
          value.languages = value.languages.sort(function (a, b) {
            let value1 = parseFloat(a[lname]);
            let value2 = parseFloat(b[lname]);
            return sortType ? value1 - value2 : value2 - value1;
          })
          return value;
        })
      }
    }
    this.setState({
      tableData: data,
      sortColumn: name,
      sortType: type
    })
  }
  onSortHandler = (name) => {
    if (this.props.sort) {
      let { sortColumn, sortType } = this.state;
      let type = (sortColumn != name) ? "descending" : (sortType == 'ascending' ? 'descending' : 'ascending')
      this.textSort(name, type, this.props.tableData);
    }
  }
  render() {
    const header = this.props.headerConfig || [];
    let data = this.state.tableData || this.props.tableData || [];

    let activePage = this.state.activePage;
    let recordCount = this.props.recordCount ? this.props.recordCount : 3;
    let totalPage = Math.ceil(data.length / recordCount);
    const start = (activePage == 1) ? 0 : ((activePage - 1) * recordCount);
    const end = (activePage * recordCount);
    data = this.props.pagination ? data.slice(start, end) : data;
    return (
      <React.Fragment>
        <div className="nestedTable">
          <table>
            <thead>
              {/* Render the table header */}
              <tr>
                {
                  header.map((header, index) => {
                    return (
                      <th style={{cursor:this.props.sort && index > 0 ?"pointer":"default"}} onClick={() => { this.onSortHandler(header.field) }} key={"header" + index}>{header.name}</th>
                    )
                  })
                }
              </tr>
            </thead>
            {/* Render the table body */}
            <tbody>
              {/* Render the main table content */}
              {data.map((value, index) => {
                const { name, languages } = value;
                const innerData = languages.slice(1);
                const classNames = "indexCell" + (languages.length > 1 ? " borderColor" : "");
                return (
                  <React.Fragment key={"main" + index}>
                    <tr>
                      <td className={classNames}>{start + index + 1}</td>
                      <td>{name}</td>
                      <td>{languages[0].name}</td>
                      <td>{languages[0].byte}</td>
                    </tr>
                    {/* Render the inner table content */}
                    {
                      innerData.map((lan, index) => {
                        if (index == 0) {
                          return (
                            <tr key={"inner" + index}>
                              <td className="indexCell" rowSpan={innerData.length}></td>
                              <td rowSpan={innerData.length}></td>
                              <td>{lan.name}</td>
                              <td>{lan.byte}</td>
                            </tr>
                          )
                        }
                        else {
                          return (
                            <tr key={"inner" + index}>
                              <td>{lan.name}</td>
                              <td>{lan.byte}</td>
                            </tr>
                          )
                        }
                      })
                    }
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
        {/* Render paginatin for table */}
        {this.props.pagination && <Pagination totalPage={totalPage} activePage={activePage} onChange={this.onChangePage}></Pagination>}
      </React.Fragment>
    );
  }
}