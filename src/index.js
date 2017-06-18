import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';

class Pagination extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    onPageClick: PropTypes.func.isRequired,
    pageLinkClassName: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]).isRequired,
    currentLinkClassName: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]).isRequired
  };

  render() {
    // Only show 10 page links at a time
    const linkCount = this.props.pageCount > 10 ? 10 : this.props.pageCount;
    const { pageCount, currentPage, onPageClick,
            pageLinkClassName, currentLinkClassName } = this.props;

    return (
      <div>
        {renderLinkNodes(linkCount, pageCount, currentPage, onPageClick, pageLinkClassName, currentLinkClassName)}
      </div>
    )
  }
}

const renderLinkNodes = (linkCount, pageCount, currentPage, onPageClick, pageLinkClassName, currentLinkClassName) => {
  // always render link to first page (0)
  const first = [renderFirstLink(onPageClick, pageLinkClassName)];
  // render previous series of links if needed (currentPage >= 10)
  const previousSeries = shouldRenderPreviousSeries(currentPage) ?
                         renderPreviousSeries(currentPage, onPageClick, pageLinkClassName) : [];
  // render link to previous page if needed (not on first page)
  const previous = shouldRenderBefore(currentPage) ?
                   renderPreviousLink(currentPage, onPageClick, pageLinkClassName) : [];
  // render links to pages before current page
  const beforeCurrent = renderBeforeCurrent(currentPage, onPageClick, pageLinkClassName);
  // render current page link
  const current = renderCurrent(currentPage, onPageClick, pageLinkClassName, currentLinkClassName);
  // render links to pages after current page
  const afterCurrent = renderAfterCurrent(currentPage, pageCount, onPageClick, pageLinkClassName);
  // render next series of links if needed
  const nextSeries = shouldRenderNextSeries(currentPage, pageCount) ?
                     renderNextSeries(currentPage, pageCount, onPageClick, pageLinkClassName) : [];
  // always render link to last page (pageCount - 1)
  const last = renderLastLink(pageCount, onPageClick, pageLinkClassName);

  const nodes = first.concat(previous)            // previous
                     .concat(previousSeries)      // ...
                     .concat(beforeCurrent)       // 1,2,3,4
                     .concat(current)             // 5
                     .concat(afterCurrent)        // 6, 7, 8, 9, 10
                     .concat(nextSeries)          // ...

  // render a link to the next page if needed (not on last page)
  if(shouldRenderNext(currentPage, pageCount)) {
    const nextLink = renderNextLink(currentPage, onPageClick, pageLinkClassName);
    return nodes.concat(nextLink)                 // next
                .concat(last);                    // last
  }

  return nodes.concat(last);
}

const renderFirstLink = (onPageClick, pageLinkClassName) => ((
  <div key={`page-link-first`} className={pageLinkClassName}>
    <Link onClick={() => {
        onPageClick(0);
      }
    }>first</Link>
  </div>
))

// indicates if a link to the previous series of 10 links should be rendered
const shouldRenderPreviousSeries = currentPage => currentPage >= 10;

// indicates if a link to the next series of 10 links should be rendered
const shouldRenderNextSeries = (currentPage, pageCount) => {
  const position = currentPosition(currentPage);

  return pageCount > (currentPage + (10 - position));
}

// renders a link with ellipsis text to go to the previous series of 10 page links
const renderPreviousSeries = (currentPage, onPageClick, pageLinkClassName) => {
  const position = currentPosition(currentPage);

  return (
    <div key={`page-link-previous-series`} className={pageLinkClassName}>
      <Link onClick={() => {
          onPageClick(currentPage - position - 1);
        }
      }>...</Link>
    </div>
  );
}

// renders a link with ellipsis text to go to the next series of 10 page links
const renderNextSeries = (currentPage, pageCount, onPageClick, pageLinkClassName) => {
  const position = currentPosition(currentPage);

  return (
    <div key={`page-link-next-series`} className={pageLinkClassName}>
      <Link onClick={() => {
          onPageClick(currentPage + (10 - position));
        }
      }>...</Link>
    </div>
  );
}

// indicates if page links should be rendered before the current (current page isn't the first page)
const shouldRenderBefore = currentPage => currentPage !== 0;

const renderPreviousLink = (currentPage, onPageClick, pageLinkClassName) => ([(
  <div key={`page-link-previous`} className={pageLinkClassName}>
    <Link onClick={() => {
        onPageClick(currentPage - 1);
      }
    }>previous</Link>
  </div>
)])

// render page links before current
const renderBeforeCurrent = (currentPage, onPageClick, pageLinkClassName) => {
  const position = currentPosition(currentPage);
  let nodes = [];

  for(let i = (currentPage - position); i < currentPage; i++)
    nodes.push((
      <div key={`page-link-before-${i}`} className={pageLinkClassName}>
        <Link onClick={() => {
            onPageClick(i);
          }
        }>{i + 1}</Link>
      </div>
    ))

  return nodes;
}

// renders the current page link
const renderCurrent = (currentPage, onPageClick, pageLinkClassName, currentLinkClassName) => ((
  <div key={`page-link-current`} className={`${pageLinkClassName} ${currentLinkClassName}`}>
    <Link onClick={() => {
        onPageClick(currentPage);
      }
    }>{currentPage + 1}</Link>
  </div>
))

// render page links after current
const renderAfterCurrent = (currentPage, pageCount, onPageClick, pageLinkClassName) => {
  const position = currentPosition(currentPage);
  let nodes = [];

  for(let i = (currentPage + 1); i < (currentPage + (10 - position)) && i < pageCount; i++)
    nodes.push((
      <div key={`page-link-after-${i}`} className={pageLinkClassName}>
        <Link onClick={() => {
            onPageClick(i);
          }
        }>{i + 1}</Link>
      </div>
    ))

  return nodes;
}

// indicates if a "next" link should be rendered
const shouldRenderNext = (currentPage, pageCount) => (currentPage + 1) !== pageCount

const renderNextLink = (currentPage, onPageClick, pageLinkClassName) => ((
  <div key={`page-link-next`} className={pageLinkClassName}>
    <Link onClick={() => {
        onPageClick(currentPage + 1);
      }
    }>next</Link>
  </div>
))

const renderLastLink = (pageCount, onPageClick, pageLinkClassName) => ((
  <div key={`page-link-last`} className={pageLinkClassName}>
    <Link onClick={() => {
        onPageClick(pageCount - 1);
      }
    }>last</Link>
  </div>
))

// calculate where the current page position is in series of 10 (ex: 27 is position 7)
const currentPosition = currentPage => currentPage % 10;

export default Pagination;
