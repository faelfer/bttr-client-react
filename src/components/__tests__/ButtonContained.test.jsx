/* eslint-disable no-undef */
import * as React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";

import ButtonContained from "../ButtonContained";

// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("ButtonContained deve exibir texto descritivo", () => {
  const onActionSpy = jest.fn();
  const textButton = "testbutton1";

  const { getByText } = render(
    <ButtonContained text={textButton} onAction={onActionSpy} />,
  );

  const regexCaseInsensiText = new RegExp(textButton, "i");

  expect(getByText(regexCaseInsensiText)).toBeTruthy();
});

it("ButtonContained deve chamar o manipulador onAction", () => {
  const onActionSpy = jest.fn();
  const textButton = "testbutton2";

  render(<ButtonContained text={textButton} onAction={onActionSpy} />);

  const buttonAction = screen.getByTestId("button-contained");

  fireEvent.click(buttonAction);

  expect(onActionSpy).toHaveBeenCalled();
});
