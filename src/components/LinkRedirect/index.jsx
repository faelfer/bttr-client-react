import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function LinkRedirect({
  description,
  urlTo,
  descriptionUrl,
}) {
  return (
    <div className="redirect">
      <p className="redirect__text">
        {description}
        <Link
          className="redirect__link"
          to={urlTo}
        >
          {descriptionUrl}
        </Link>
      </p>
    </div>
  );
}
