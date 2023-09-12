import React from "react";

import "./styles.css";

function Load({ isShow }) {
  return (
    <div className={isShow ? "load display-flex" : "load display-none"}>
      <div className="loadingio-spinner-dual-ring-ni6kc8xkbs">
        <div className="ldio-e48qmwg845o">
          <div />
          <div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Load;
