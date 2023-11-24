/* eslint-disable no-undef */
import * as React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";

import ButtonPagination from "../ButtonPagination";

// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("ButtonPagination deve chamar o manipulador onUpdatePage e retornar o valor da próxima página", () => {
  const onUpdatePageSpy = jest.fn();
  const page = 2;
  const countPages = 4;

  render(
    <ButtonPagination
      currentPage={page}
      totalPages={countPages}
      onUpdatePage={onUpdatePageSpy}
    />,
  );

  const buttonAction = screen.getByTestId("button-pagination-prev");

  fireEvent.click(buttonAction);

  expect(onUpdatePageSpy).toHaveBeenCalled();
  expect(onUpdatePageSpy).toHaveBeenCalledWith(1);
});

it("ButtonPagination deve chamar o manipulador onUpdatePage e retornar o valor da página anterior", () => {
  const onUpdatePageSpy = jest.fn();
  const page = 2;
  const countPages = 4;

  render(
    <ButtonPagination
      currentPage={page}
      totalPages={countPages}
      onUpdatePage={onUpdatePageSpy}
    />,
  );

  const buttonAction = screen.getByTestId("button-pagination-next");

  fireEvent.click(buttonAction);

  expect(onUpdatePageSpy).toHaveBeenCalled();
  expect(onUpdatePageSpy).toHaveBeenCalledWith(3);
});

it("ButtonPagination não deve chamar o manipulador onUpdatePage", () => {
  const onUpdatePageSpy = jest.fn();
  const page = 1;
  const countPages = 4;

  render(
    <ButtonPagination
      currentPage={page}
      totalPages={countPages}
      onUpdatePage={onUpdatePageSpy}
    />,
  );

  const buttonAction = screen.getByTestId("button-pagination-prev");

  fireEvent.click(buttonAction);

  expect(onUpdatePageSpy).not.toHaveBeenCalled();
});

it("ButtonPagination não deve chamar o manipulador onUpdatePage", () => {
  const onUpdatePageSpy = jest.fn();
  const page = 4;
  const countPages = 4;

  render(
    <ButtonPagination
      currentPage={page}
      totalPages={countPages}
      onUpdatePage={onUpdatePageSpy}
    />,
  );

  const buttonAction = screen.getByTestId("button-pagination-next");

  fireEvent.click(buttonAction);

  expect(onUpdatePageSpy).not.toHaveBeenCalled();
});
