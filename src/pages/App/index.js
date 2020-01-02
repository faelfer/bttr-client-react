import React, { useState } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";

function App({ history }) {
    return (
        <div className="Container">
            <NavBar navigation={history}/>
            <div className="app">
                <p>App</p>
            </div>
        </div>
    )
};

export default App;