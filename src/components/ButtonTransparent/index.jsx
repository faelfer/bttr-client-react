import React from "react";

import "./styles.css";

export default function ButtonTransparent({ text, onAction }) {
  return (
    <button
      className="button--transparent"
      type="button"
      onClick={() => onAction()}
      data-testid="button-transparent"
    >
      {text}
    </button>
  );
}
