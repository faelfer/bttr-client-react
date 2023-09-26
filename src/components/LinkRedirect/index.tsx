import React from "react";

import "./styles.css";

interface LinkRedirectProp {
  description: string;
  descriptionUrl: string;
  onRedirect: () => void;
}

const LinkRedirect = ({
  description,
  descriptionUrl,
  onRedirect,
}: LinkRedirectProp): JSX.Element => {
  return (
    <div className="container--redirect">
      <p className="text--redirect">{description}</p>
      <button
        className="link--redirect"
        onClick={() => {
          onRedirect();
        }}
        type="button"
        data-testid="link-redirect-button"
      >
        {descriptionUrl}
      </button>
    </div>
  );
};

export default LinkRedirect;
