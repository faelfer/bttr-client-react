import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCode, 
    faUniversity,
    faPencilRuler,
    faBookOpen,
    faAngleUp,
    faAngleDown, 
    faAngleDoubleUp,
    faTrophy,
    faCheck 
} from '@fortawesome/free-solid-svg-icons';
import workingDays from "../../../../utils/workingDays";
import convertToHours from "../../../../utils/convertTime";


function Details({ item }) {
    const [name, setName] = useState(item.name);
    const [goalPerDay, setGoalPerDay] = useState(70);
    const [goalDone, setGoalDone] = useState(210 + 70 + 88 + 61 + 90 + 84 + 77);
    const [icon, setIcon] = useState(item.icon);


    return (
        <div className="card">
            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={event => setName(event.target.value)}
            />

            <select value={icon} onChange={event => {setIcon(event.target.value); console.log(icon)}}>
                <option value="fas fa-code">Code</option>
                <option value="fas fa-university">University</option>
                <option value="fas fa-pencil-ruler">Draw</option>
                <option value="fas fa-book-open">Book</option>
            </select>

            <div>
                <select value={icon} onChange={event => {setIcon(event.target.value); console.log(icon)}}>
                    <option value="-">-</option>
                    <option value="+">+</option>
                </select>

                <input type="number" name="quantity" min="1" max="1440"></input>
            </div>
        </div>
    )
};

export default Details;