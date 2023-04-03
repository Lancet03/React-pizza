import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';

import { setCurrentPage } from '../../redux/slices/filterSlice';
import styles from "./Pagination.module.scss"


function Paginaton({forcePage}) {
  const dispatch = useDispatch()

  return (
    <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => dispatch(setCurrentPage(event.selected + 1))}
        pageRangeDisplayed={5}
        pageCount={2}
        forcePage={forcePage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
  )
}

export default Paginaton