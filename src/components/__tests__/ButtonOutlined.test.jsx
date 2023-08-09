/* eslint-disable no-undef */
import * as React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import ButtonOutlined from '../ButtonOutlined';

// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('ButtonOutlined deve exibir texto descritivo', () => {
  const onActionSpy = jest.fn();
  const textButton = 'testbutton1';

  const { getByText } = render(
    <ButtonOutlined
      text={textButton}
      onAction={onActionSpy}
    />,
  );

  const regexCaseInsensiText = new RegExp(textButton, 'i');

  expect(getByText(regexCaseInsensiText)).toBeTruthy();
});

it('ButtonOutlined deve chamar o manipulador onAction', () => {
  const onActionSpy = jest.fn();
  const textButton = 'testbutton2';

  render(
    <ButtonOutlined
      text={textButton}
      onAction={onActionSpy}
    />,
  );

  const buttonAction = screen.getByTestId('button-outlined');

  fireEvent.click(buttonAction);

  expect(onActionSpy).toHaveBeenCalled();
});
