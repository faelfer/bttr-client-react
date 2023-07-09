import React from 'react';

import './styles.css';

export default function ButtonContained({ text, onAction }) {
  return (
    <button
      className="contained__button"
      type="button"
      onClick={() => onAction()}
    >
      {text}
    </button>
  );
}
