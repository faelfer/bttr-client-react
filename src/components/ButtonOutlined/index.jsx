import React from 'react';

import './styles.css';

export default function ButtonOutlined({ text, onAction }) {
  return (
    <button
      className="outlined__button"
      type="button"
      onClick={() => onAction()}
    >
      {text}
    </button>
  );
}
