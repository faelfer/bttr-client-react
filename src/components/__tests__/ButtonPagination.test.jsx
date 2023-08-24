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

it('ButtonPagination deve chamar o manipulador onChangeCurrentPage e retornar o valor da próxima página', () => {
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
  expect(onChangeCurrentPageSpy).toHaveBeenCalledWith(1);
});

it('ButtonPagination deve chamar o manipulador onChangeCurrentPage e retornar o valor da página anterior', () => {
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
  expect(onChangeCurrentPageSpy).toHaveBeenCalledWith(3);
});

it('ButtonPagination não deve chamar o manipulador onChangeCurrentPage', () => {
  const onChangeCurrentPageSpy = jest.fn();
  const page = 1;
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

  expect(onChangeCurrentPageSpy).not.toHaveBeenCalled();
});

it('ButtonPagination não deve chamar o manipulador onChangeCurrentPage', () => {
  const onChangeCurrentPageSpy = jest.fn();
  const page = 4;
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

  expect(onChangeCurrentPageSpy).not.toHaveBeenCalled();
});