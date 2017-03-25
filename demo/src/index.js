import React from 'react'
import {render} from 'react-dom'
import Pagination from '../../src';
import { css } from 'glamor';

const pageLink = css({
  margin: '2px',
  display: 'inline-block',
  padding: '2px',
  WebkitBorderRadius: '20px',
  MozBorderRadius: '20px',
  borderRadius: '20px'
})

const currentLink = css({
  backgroundColor: '#0074c2',
  display: 'inline-block',
  color: '#FFFFFF',
  'a:link': { color: '#FFFFFF' },
  'a:visited': { color: '#FFFFFF' },
  'a:active': { color: '#FFFFFF' }
})

let Demo = React.createClass({
  render() {
    return <div>
      <h1>react-paginator Demo</h1>
      <Pagination currentPage={5}
                 pageCount={25}
                 pageLinkClassName={pageLink}
                 currentLinkClassName={currentLink}
                 onPageClick={i => {
                  console.log(`Link to page ${i} was clicked.`);
                 }} />
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
