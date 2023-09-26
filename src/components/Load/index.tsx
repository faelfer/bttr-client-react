import React from "react";

import "./styles.css";

interface LoadProp {
  isShow: boolean;
}

const Load = ({ isShow }: LoadProp): JSX.Element => {
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
};

export default Load;
