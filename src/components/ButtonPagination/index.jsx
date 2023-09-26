import React from "react";

import "./styles.css";

export default function ButtonPagination({
  currentPage,
  totalPages,
  onChangeCurrentPage,
}) {
  function onPagePrevious() {
    const updateNumberCurrentPage = currentPage - 1;
    onChangeCurrentPage(updateNumberCurrentPage);
  }

  function onPageNext() {
    const updateNumberCurrentPage = currentPage + 1;
    onChangeCurrentPage(updateNumberCurrentPage);
  }

  return (
    <div className="container--pagination">
      <button
        className="button--pagination text--pagination"
        disabled={currentPage === 1}
        type="button"
        onClick={() => { onPagePrevious(); }}
        data-testid="button-pagination-prev"
      >
        Anterior
      </button>
      <button
        className="button--pagination text--pagination"
        disabled={currentPage === totalPages}
        type="button"
        onClick={() => { onPageNext(); }}
        data-testid="button-pagination-next"
      >
        Próximo
      </button>
    </div>
  );
}
