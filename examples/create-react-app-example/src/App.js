import React, { Component } from 'react';
import Pagination from 'pagination-component';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>pagination-component</h1>
        <h2>create-react-app example</h2>
        <p>The below has the following props</p>
        <ul>
          <li>currentPage: 7</li>
          <li>pageCount: 50</li>
          <li>pageLinkClassName: "page-link"</li>
          <li>currentLinkClassName="current-link"</li>
        </ul>
        <p>The onPageClick prop console.log's the page that was clicked</p>
        <Pagination currentPage={7}
                    pageCount={50}
                    pageLinkClassName="page-link"
                    currentLinkClassName="current-link"
                    onPageClick={i => {
                      console.log(`Link to page ${i} was clicked.`);
                    }} />
      </div>
    );
  }
}

export default App;
