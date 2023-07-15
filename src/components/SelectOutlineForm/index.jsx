import React from 'react';

import './styles.css';

export default function HeaderForm({
  options,
  selectValue,
  onChangeSelect,
}) {
  const onChangeValue = ({ currentTarget: { value } }) => onChangeSelect(value);

  return (
    <select
      className="time__select"
      value={selectValue}
      onChange={onChangeValue}
    >
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
