import React from 'react';

import './styles.css';

export default function ButtonPagination({
  currentPage,
  totalPages,
  onChangeCurrentPage,
}) {
  function onPagePrevious() {
    if (currentPage <= totalPages && currentPage > 1) {
      const updateNumberCurrentPage = currentPage - 1;
      onChangeCurrentPage(updateNumberCurrentPage);
    }
  }

  function onPageNext() {
    if (currentPage < totalPages && currentPage >= 1) {
      const updateNumberCurrentPage = currentPage + 1;
      onChangeCurrentPage(updateNumberCurrentPage);
    }
  }

  return (
    <div className="container--pagination">
      <button
        className="button--pagination text--pagination"
        disabled={currentPage === 1}
        type="button"
        onClick={() => onPagePrevious()}
      >
        Anterior
      </button>
      <button
        className="button--pagination text--pagination"
        disabled={currentPage === totalPages}
        type="button"
        onClick={() => onPageNext()}
      >
        Próximo
      </button>
    </div>
  );
}
