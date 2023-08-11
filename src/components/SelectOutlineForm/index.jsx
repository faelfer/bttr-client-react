import React from 'react';

import './styles.css';

export default function SelectOutlineForm({
  selectPlaceholder,
  options,
  selectValue,
  onChangeSelect,
}) {
  const onChangeValue = ({ currentTarget: { value } }) => onChangeSelect(value);

  return (
    <select
      className="select--outline"
      value={selectValue}
      onChange={onChangeValue}
      data-testid="outline-form-select"
    >
      <option value="" key={0}>
        {selectPlaceholder}
      </option>
      {
        options.map((optionLoop) => (
          <option value={optionLoop.id} key={optionLoop.id}>
            {optionLoop.value}
          </option>
        ))
      }
    </select>
  );
}
