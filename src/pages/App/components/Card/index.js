import React from "react";
import "./styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faAngleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
// import { faUser, faFileAlt } from '@fortawesome/free-regular-svg-icons';

function App() {
    return (
        <div className="card">
            <div className="card-overview">
                <div className="card-info">
                    <p>Card</p>
                    <p>0%</p>
                </div>
                <div>
                    <FontAwesomeIcon 
                        icon={faCode} 
                        size="lg" 
                        color="grey" 
                        className="icon" 
                    />
                </div>
            </div>
            <div className="task-progress">
                <div className="progress">
                    <div className="bar"></div>
                </div>
            </div>
            <div>
                <div className="card-suggestion">
                    <FontAwesomeIcon 
                        icon={faAngleDown} 
                        size="lg" 
                        color="grey" 
                        className="icon" 
                    />
                    <p>02h20min Missing for the ideal</p>
                </div>
                <div className="card-suggestion">
                    <FontAwesomeIcon 
                        icon={faAngleDoubleUp} 
                        size="lg" 
                        color="grey" 
                        className="icon" 
                    />
                    <p>01h13min Daily suggestion</p>
                </div>
            </div>
        </div>
    )
};

export default App;