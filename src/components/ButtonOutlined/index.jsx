import React from 'react';

import './styles.css';

export default function ButtonOutlined({ text, onAction }) {
  return (
    <button
      className="button--outlined text--outlined"
      type="button"
      onClick={() => onAction()}
    >
      {text}
    </button>
  );
}
