import React from 'react';

import './styles.css';

export default function ButtonTransparent({ text, onAction }) {
  return (
    <button
      className="transparent__button"
      type="button"
      onClick={() => onAction()}
    >
      {text}
    </button>
  );
}
