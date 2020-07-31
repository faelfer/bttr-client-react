import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Create({ error, onSave }) {
    const [name, setName] = useState("");
    const [goalPerDay, setGoalPerDay] = useState(0);
    const [goalDone, setGoalDone] = useState(0);
    const [icon, setIcon] = useState("");

    return (
        <>
            <div className="details">
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
                    <button type="button" onClick={() => onSave({name, goalPerDay, goalDone, icon})}>Criar</button>
                    <hr />
                    <Link to="/progress">Cancelar</Link>
                </form>
            </div>
        </>
    )
};

export default Create;

