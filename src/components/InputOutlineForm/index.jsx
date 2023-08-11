import React from 'react';

import './styles.css';

export default function InputOutlineForm({
  inputPlaceholder,
  inputValue,
  onChangeInput,
  inputType = 'text',
}) {
  const onChangeValue = ({ currentTarget: { value } }) => {
    onChangeInput(value);
  };

  return (
    <input
      className="input--outlined"
      type={inputType}
      placeholder={inputPlaceholder}
      value={inputValue}
      onChange={onChangeValue}
      data-testid="outline-form-input"
    />
  );
}
