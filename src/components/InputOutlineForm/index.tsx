import React from "react";

import "./styles.css";

interface InputOutlineFormProp {
  inputPlaceholder: string;
  inputValue: string;
  onChangeInput: (textValue: string) => void;
  inputType?: string;
}

const InputOutlineForm = ({
  inputPlaceholder,
  inputValue,
  onChangeInput,
  inputType = "text",
}: InputOutlineFormProp): JSX.Element => {
  const onChangeValue = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>): void => {
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
};

export default InputOutlineForm;
