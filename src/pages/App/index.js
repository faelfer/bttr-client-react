import React, { useState } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import Card from "./components/Card";

function App({ history }) {
    const [listCards, setListCards] = useState([
        {"name": "Code", "goalPerDay": 70, "goalDone": (210 + 70 + 88 + 61 + 90 + 84 + 77), "icon": "fas fa-code"},
        {"name": "Vest", "goalPerDay": 80, "goalDone": (250 + 104), "icon": "fas fa-university"},
        {"name": "Draw", "goalPerDay": 15, "goalDone": 45, "icon": "fas fa-pencil-ruler"},   
        {"name": "Book", "goalPerDay": 20, "goalDone": 0, "icon": "fas fa-book-open"}
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