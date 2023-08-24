/* eslint-disable no-undef */
import * as React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import ButtonTransparent from '../ButtonTransparent';

// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('ButtonTransparent deve exibir texto descritivo', () => {
  const onActionSpy = jest.fn();
  const textButton = 'testbutton1';

  const { getByText } = render(
    <ButtonTransparent
      text={textButton}
      onAction={onActionSpy}
    />,
  );

  const regexCaseInsensiText = new RegExp(textButton, 'i');

  expect(getByText(regexCaseInsensiText)).toBeTruthy();
});

it('ButtonTransparent deve chamar o manipulador onAction', () => {
  const onActionSpy = jest.fn();
  const textButton = 'testbutton2';

  render(
    <ButtonTransparent
      text={textButton}
      onAction={onActionSpy}
    />,
  );

  const buttonAction = screen.getByTestId('button-transparent');

  fireEvent.click(buttonAction);

  expect(onActionSpy).toHaveBeenCalled();
});
