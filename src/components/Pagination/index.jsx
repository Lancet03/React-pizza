import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from "./Pagination.module.scss"

function Paginaton({setCurrentPage}) {
  return (
    <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => setCurrentPage(event.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={2}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
  )
}

export default Paginaton