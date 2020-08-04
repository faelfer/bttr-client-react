import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function FormDetails({ item, error, onSave, onDelete }) {
    const [name, setName] = useState("");
    const [goalPerDay, setGoalPerDay] = useState(0);
    const [goalDone, setGoalDone] = useState(0);
    const [icon, setIcon] = useState("");

    useEffect(() => {
        console.log("useEffect Details | item: ", item);
        setName(item.name);
        setGoalPerDay(item.goalPerDay);
        setGoalDone(item.goalDone);
        setIcon(item.icon);
    }, [item]);

    return (
        <>
            <div className="form-details">
                <form>
                    {error && <p>{error}</p>}
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <input 
                        type="number" 
                        name="quantity"
                        onChange={event => setGoalPerDay(event.target.value)}
                        value={goalPerDay}
                    />
                    <input 
                        type="number"
                        name="quantity"
                        onChange={event => setGoalDone(event.target.value)}
                        value={goalDone}
                    />
                    <input
                        type="text"
                        placeholder="Ícone"
                        value={icon}
                        onChange={event => setIcon(event.target.value)}
                    />
                    <button type="button" onClick={() => onSave({name, goalPerDay, goalDone, icon})}>Salvar</button>
                    <button type="button" onClick={onDelete}>Apagar</button>
                    <hr />
                    <Link to="/progress">Cancelar</Link>
                </form>
            </div>
        </>
    )
};

