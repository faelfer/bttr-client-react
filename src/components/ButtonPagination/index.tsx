import React from "react";

import "./styles.css";

interface InputOutlineFormProp {
  currentPage: number;
  totalPages: number;
  onUpdatePage: (updatedPage: number) => void;
}

const ButtonPagination = ({
  currentPage,
  totalPages,
  onUpdatePage,
}: InputOutlineFormProp): JSX.Element => {
  const onPagePrevious = (): void => {
    const updatePreviousPage = currentPage - 1;
    onUpdatePage(updatePreviousPage);
  };

  const onPageNext = (): void => {
    const updateNextPage = currentPage + 1;
    onUpdatePage(updateNextPage);
  };

  return (
    <div className="container--pagination">
      <button
        className="button--pagination text--pagination"
        disabled={currentPage === 1}
        type="button"
        onClick={() => {
          onPagePrevious();
        }}
        data-testid="button-pagination-prev"
      >
        Anterior
      </button>
      <button
        className="button--pagination text--pagination"
        disabled={currentPage === totalPages}
        type="button"
        onClick={() => {
          onPageNext();
        }}
        data-testid="button-pagination-next"
      >
        Próximo
      </button>
    </div>
  );
};

export default ButtonPagination;
