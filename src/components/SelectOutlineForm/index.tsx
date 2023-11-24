import React from "react";

import "./styles.css";

interface IOption {
  id: number;
  value: string;
}

interface SelectOutlineFormProp {
  selectPlaceholder: string;
  options: IOption[];
  selectValue: string;
  onChangeSelect: (textValue: string) => void;
}

const SelectOutlineForm = ({
  selectPlaceholder,
  options,
  selectValue,
  onChangeSelect,
}: SelectOutlineFormProp): JSX.Element => {
  const onChangeValue = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLSelectElement>): void => {
    onChangeSelect(value);
  };

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
      {options.map((optionLoop) => (
        <option value={optionLoop.id} key={optionLoop.id}>
          {optionLoop.value}
        </option>
      ))}
    </select>
  );
};

export default SelectOutlineForm;
