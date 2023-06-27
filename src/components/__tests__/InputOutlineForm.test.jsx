/* eslint-disable no-undef */
import * as React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';

import InputOutlineForm from '../InputOutlineForm';

it('InputOutlineForm deve chamar o manipulador onChangeInput handler com o novo valor do input', () => {
  const onChangeInputSpy = jest.fn();
  const inputValue = 'testinputoutlineform';

  render(<InputOutlineForm inputPlaceholder="outline-input" onChangeInput={onChangeInputSpy} />);

  const input = screen.getByTestId('outline-form-input');

  fireEvent.change(input, { target: { value: inputValue } });

  expect(onChangeInputSpy).toHaveBeenCalledWith(inputValue);
});
