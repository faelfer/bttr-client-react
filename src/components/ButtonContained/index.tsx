import React from "react";

import "./styles.css";

interface ButtonContainedProp {
  text: string;
  onAction: () => void;
}

const ButtonContained = ({
  text,
  onAction,
}: ButtonContainedProp): JSX.Element => {
  return (
    <button
      className="button--contained text--contained"
      type="button"
      onClick={() => {
        onAction();
      }}
      data-testid="button-contained"
    >
      {text}
    </button>
  );
};

export default ButtonContained;
