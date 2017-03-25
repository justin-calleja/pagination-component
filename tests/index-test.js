import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import { css } from 'glamor'

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

import Pagination from 'src/'

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays the correct amount of links', () => {
    const component = <Pagination currentPage={5}
                                  pageCount={25}
                                  pageLinkClassName={pageLink}
                                  currentLinkClassName={currentLink}
                                  onPageClick={i => {
                                    console.log(`Link to page ${i} was clicked.`);
                                  }} />

    render(component, node, () => {
      const pageLinkCount = node.querySelector('[data-reactroot]')
                                .getElementsByTagName('div').length

      expect(pageLinkCount).toEqual(15)
    })
  })
})
