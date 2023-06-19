import React from 'react';

import './styles.css';

export default function HeaderForm({ title }) {
  return (
    <p className="form__header">
      {title}
    </p>
  );
}
