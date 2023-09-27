import React from "react";

import "./styles.css";

interface ButtonOutlinedProp {
  text: string;
  onAction: () => void;
}

const ButtonOutlined = ({
  text,
  onAction,
}: ButtonOutlinedProp): JSX.Element => {
  return (
    <button
      className="button--outlined text--outlined"
      type="button"
      onClick={() => {
        onAction();
      }}
      data-testid="button-outlined"
    >
      {text}
    </button>
  );
};

export default ButtonOutlined;
