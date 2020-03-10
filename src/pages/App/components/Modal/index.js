import React, { useState, useEffect } from 'react';
import './styles.css';
import api from "../../../../services/api";

export default function CloseChat({ onLoad, onModal, isShow, token }) {
    const [name, setName] = useState(""); 
    const [goalPerDay, setGoalPerDay] = useState(0);
    const [goalDone, setGoalDone] = useState(0)
    const [icon, setIcon] = useState("fas fa-spa");
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState("");

    async function onSubmit(event) {
        event.preventDefault();
        console.log("onSubmit");
        setIsLoad(true);
        try {
          const response = await api.post("/progress",{
                name,
                goalPerDay,
                goalDone,
                icon
            },{
              headers: { "Authorization": token }
          });
          console.log("onSubmit | response: ", response);
          setIsLoad(false);
          onModal()
          if(!response.data.status === 200) {
            setError("Ocorreu um erro ao registrar o item. ;-;");
          }

        //   setListCards(response.data)
        } catch (error) {
          console.log("onSubmit | error", error);
          setError("Houve um problema com o item, verifique os campos. ;-;");
          setIsLoad(false);
        }      
	}

    return (
      <div className={isShow ? "model" : "model-none"}>
            <div className="model-container">
                <p className="model-title">
                    Cadastrar
                </p>
                <form onSubmit={onSubmit}>
                    {error && <p>{error}</p>}
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <select 
                        value={icon} 
                        onChange={event => {setIcon(event.target.value)}}
                    >
                        <option value="fas fa-code">Code</option>
                        <option value="fas fa-university">University</option>
                        <option value="fas fa-pencil-ruler">Draw</option>
                        <option value="fas fa-book-open">Book</option>
                    </select>
                    <input
                        type="number"
                        ame="quantity" 
                        min="1" 
                        max="1440"
                        placeholder="Minutos diários"
                        value={goalPerDay}
                        onChange={event => setGoalPerDay(event.target.value)}
                    />
                    <input
                        type="number"
                        ame="quantity" 
                        min="1" 
                        max="1440"
                        placeholder="Minutos concluidos"
                        value={goalDone}
                        onChange={event => setGoalDone(event.target.value)}  
                    />
                    <button 
                        disabled={isLoad} 
                        type="submit"
                    >
                        Cadastrar
                    </button>
                    <button onClick={() => onModal()} >
                        Cancelar
                    </button>
                </form>
            </div>
      </div>
    );
  };