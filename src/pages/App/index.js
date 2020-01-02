import React from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import Card from "./components/Card";

function App({ history }) {
    return (
        <div className="Container">
            <NavBar navigation={history}/>
            <div className="app">
                <Card />
            </div>
        </div>
    )
};

export default App;