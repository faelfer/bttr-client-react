import React, { useState } from 'react';

import './styles.css';

export default function InputOutlineForm({
  inputPlaceholder,
  onChangeInput,
  inputType = 'text',
}) {
  const [inputValue, setInputValue] = useState('');

  const onChangeValue = ({ currentTarget: { value } }) => {
    setInputValue(value);
    onChangeInput(value);
  };

  return (
    <input
      className="form__input"
      type={inputType}
      placeholder={inputPlaceholder}
      value={inputValue}
      onChange={onChangeValue}
      data-testid="outline-form-input"
    />
  );
}
