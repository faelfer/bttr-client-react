import React from "react";

import "./styles.css";

interface ButtonTransparentProp {
  text: string;
  onAction: () => void;
}

const ButtonTransparent = ({
  text,
  onAction,
}: ButtonTransparentProp): JSX.Element => {
  return (
    <button
      className="button--transparent"
      type="button"
      onClick={() => {
        onAction();
      }}
      data-testid="button-transparent"
    >
      {text}
    </button>
  );
};

export default ButtonTransparent;
