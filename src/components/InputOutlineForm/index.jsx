import React from 'react';

import './styles.css';

export default function InputOutlineForm({
  inputPlaceholder,
  onChangeInput,
  inputValue,
  inputType = 'text',
}) {
  return (
    <input
      className="form__input"
      type={inputType}
      placeholder={inputPlaceholder}
      value={inputValue}
      onChange={(event) => onChangeInput(event.target.value)}
    />
  );
}
