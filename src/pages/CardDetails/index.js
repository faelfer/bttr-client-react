import React, { useState } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import Details from "./components/Details";

function CardDetails({ history }) {
    const [card, setCard] = useState(
        {"name": "Code", "goalPerDay": 70, "goalDone": (210 + 70 + 88 + 61 + 90 + 84 + 77), "icon": "fas fa-code"},
    ); 
    return (
        <div className="Container">
            <NavBar navigation={history}/>
            <div className="card-details">
                <Details item={card}/>
            </div>
        </div>
    )
};

export default CardDetails;