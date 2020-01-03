import React, { useState } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import Card from "./components/Card";

function App({ history }) {
    const [listCards, setListCards] = useState([
        {"name":"Code", "goalPerDay": 70, "goalDone": 73, "icon": "fas fa-code"},
        {"name":"Vest", "goalPerDay":80, "goalDone": 83, "icon": "fas fa-university"},
        {"name":"Draw", "goalPerDay": 15, "goalDone": 400, "icon": "fas fa-pencil-ruler"},   
        {"name":"Book", "goalPerDay": 30, "goalDone": 0, "icon": "fas fa-book-open"}
    ]); 
    return (
        <div className="Container">
            <NavBar navigation={history}/>
            <div className="app">
                {listCards.map((item, key) => <Card item={item} key={key}/>)}
            </div>
        </div>
    )
};

export default App;