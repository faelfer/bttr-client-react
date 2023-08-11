import React from 'react';

import './styles.css';

export default function LinkRedirect({
  description,
  descriptionUrl,
  onRedirect,
}) {
  return (
    <div className="container--redirect">
      <p className="text--redirect">
        {description}
      </p>
      <button
        className="link--redirect"
        onClick={() => onRedirect()}
        type="button"
        data-testid="link-redirect-button"
      >
        {descriptionUrl}
      </button>
    </div>
  );
}
