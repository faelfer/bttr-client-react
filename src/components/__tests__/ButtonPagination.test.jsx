/* eslint-disable no-undef */
import * as React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import ButtonPagination from '../ButtonPagination';

// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('ButtonPagination deve chamar o manipulador onChangeCurrentPage', () => {
  const onChangeCurrentPageSpy = jest.fn();
  const page = 2;
  const countPages = 4;

  render(
    <ButtonPagination
      currentPage={page}
      totalPages={countPages}
      onChangeCurrentPage={onChangeCurrentPageSpy}
    />,
  );

  const buttonAction = screen.getByTestId('button-pagination-prev');

  fireEvent.click(buttonAction);

  expect(onChangeCurrentPageSpy).toHaveBeenCalled();
});

it('ButtonPagination deve chamar o manipulador onChangeCurrentPage', () => {
  const onChangeCurrentPageSpy = jest.fn();
  const page = 2;
  const countPages = 4;

  render(
    <ButtonPagination
      currentPage={page}
      totalPages={countPages}
      onChangeCurrentPage={onChangeCurrentPageSpy}
    />,
  );

  const buttonAction = screen.getByTestId('button-pagination-next');

  fireEvent.click(buttonAction);

  expect(onChangeCurrentPageSpy).toHaveBeenCalled();
});
