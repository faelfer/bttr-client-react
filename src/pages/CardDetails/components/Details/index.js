import React, { useState, useEffect } from "react";
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
    const [name, setName] = useState("");
    const [goalPerDay, setGoalPerDay] = useState(0);
    const [goalDone, setGoalDone] = useState(0);
    const [icon, setIcon] = useState("");
    const [action, setAction] = useState("+");

    useEffect(() => {
        setName(item.name);
        setGoalPerDay(item.goalPerDay);
        setGoalDone(item.goalDone);
        setIcon(item.icon);
    }, [item]);

    return (
        <div className="card">
            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={event => {setName(event.target.value); console.log(item)}}
            />
            <select value={icon} onChange={event => {setIcon(event.target.value); console.log(icon)}}>
                <option value="fas fa-code">Code</option>
                <option value="fas fa-university">University</option>
                <option value="fas fa-pencil-ruler">Draw</option>
                <option value="fas fa-book-open">Book</option>
            </select>

            <div>
                <select value={action} onChange={event => {setAction(event.target.value); console.log(action)}}>
                    <option value="-">-</option>
                    <option value="+">+</option>
                </select>

                <input 
                    type="number" 
                    ame="quantity" 
                    min="1" 
                    max="1440"
                />
            </div>
        </div>
    )
};

export default Details;