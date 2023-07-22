import React from 'react';

import './styles.css';

export default function MessageContainer({ type, message }) {
  return (
    <p className={`container__message container__message--${type}`}>
      {message}
    </p>
  );
}
