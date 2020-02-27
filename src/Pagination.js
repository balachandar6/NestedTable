import React, { Component } from 'react';
import './Pagination.css';
export default class Pagination extends Component {
  /* Set the active page for nested table */
  pageClick = (index) => {
    this.props.onChange(index);
  }
  render() {
    const items = [];
    {/* Generate and push the page item */ }
    for (let i = 1; i <= this.props.totalPage; i++) {
      items.push(<div onClick={() => this.pageClick(i)} className={i == this.props.activePage ? "active" : ""} key={i}>{i}</div>);
    }
    return (
      <div className="pagination">
        {items}
      </div>
    )
  }
}