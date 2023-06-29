import React from 'react';

import './styles.css';

export default function LinkRedirect({
  description,
  descriptionUrl,
  onRedirect,
}) {
  return (
    <div className="redirect">
      <p className="redirect__text">
        {description}
      </p>
      <button
        className="redirect__link"
        onClick={() => onRedirect()}
        type="button"
        data-testid="link-redirect-button"
      >
        {descriptionUrl}
      </button>
    </div>
  );
}
