import React from 'react';

import './styles.css';

export default function ButtonPagination({
  currentPage,
  totalPages,
  onChangeCurrentPage,
}) {
  return (
    <div className="home__pagination">
      <button
        className="pagination__button"
        disabled={currentPage === 1}
        type="button"
        onClick={() => {
          if (currentPage <= totalPages && currentPage > 1) {
            const updateNumberCurrentPage = currentPage - 1;
            onChangeCurrentPage(updateNumberCurrentPage);
          }
        }}
      >
        Anterior
      </button>
      <button
        className="pagination__button"
        disabled={currentPage === totalPages}
        type="button"
        onClick={() => {
          if (currentPage < totalPages && currentPage >= 1) {
            const updateNumberCurrentPage = currentPage + 1;
            onChangeCurrentPage(updateNumberCurrentPage);
          }
        }}
      >
        Próximo
      </button>
    </div>
  );
}
