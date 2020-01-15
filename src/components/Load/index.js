import React from 'react';
import './styles.css'

const Load = ({ show }) => {
    return (
      <div className={show ? "Load display-flex" : "Load display-none"}>
        <div className="loadingio-spinner-dual-ring-ni6kc8xkbs">
          <div className="ldio-e48qmwg845o">
            <div></div>
            <div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Load;