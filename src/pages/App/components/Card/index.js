import React from "react";
import "./styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
// import { faUser, faFileAlt } from '@fortawesome/free-regular-svg-icons';

function App() {
    return (
        <div className="card">
            <p>Card</p>
            <FontAwesomeIcon icon={faCode} size="lg" color="grey" className="icon" />
            <div className="task-progress">
                <div className="progress">
                    <div className="bar"></div>
                </div>
            </div> 
        </div>
    )
};

export default App;