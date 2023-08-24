import React from 'react';

import './styles.css';

export default function ButtonContained({ text, onAction }) {
  return (
    <button
      className="button--contained text--contained"
      type="button"
      onClick={() => onAction()}
      data-testid="button-contained"
    >
      {text}
    </button>
  );
}
