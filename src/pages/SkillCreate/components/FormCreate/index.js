import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function FormCreate({ error, onSave }) {
    const [name, setName] = useState("");
    const [goalPerDay, setGoalPerDay] = useState();
    const [goalDone, setGoalDone] = useState();
    const [icon, setIcon] = useState("");

    return (
        <>
            <div className="form-create">
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
                        placeholder="Minutos Diários" 
                        name="quantity"
                        onChange={event => setGoalPerDay(event.target.value)}
                        value={goalPerDay}
                    />
                    <input 
                        type="number"
                        placeholder="Minutos Registrados"
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
                    <Link to="/home">Cancelar</Link>
                </form>
            </div>
        </>
    )
};

