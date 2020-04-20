import React, { useState, useEffect } from 'react';
import './styles.css';
import api from "../../../../services/api";

export default function CloseChat({ onLoad, onModal, onRefresh, isShow, token, item }) {
    const [name, setName] = useState(); 
    const [goalPerDay, setGoalPerDay] = useState();
    const [goalDone, setGoalDone] = useState()
    const [icon, setIcon] = useState("");
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("useEffect | item: ", item)
        if (item) {
            setName(item.name)
            setGoalPerDay(item.goalPerDay)
            setGoalDone(item.goalDone)
            setIcon(item.icon)
            setError("");
        }
    }, [item]);

    async function onSubmit(event) {
        event.preventDefault();
        console.log("onSubmit");
        setIsLoad(true);
        try {
          const response = await api.put(`/progress/${item._id}`,{
                name,
                goalPerDay,
                goalDone,
                icon
            },{
              headers: { "Authorization": token }
          });
          console.log("onSubmit | response: ", response);
          if(!response.data.status === 200) {
            setError("Ocorreu um erro ao registrar o item. ;-;");
          }
          setIsLoad(false);
          onModal()
          onRefresh()

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
                    Detalhes
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
                        <option value="" disabled selected hidden>Selecione um ícone</option>
                        <option value="fas fa-code">Code</option>
                        <option value="fas fa-university">University</option>
                        <option value="fas fa-pencil-ruler">Draw</option>
                        <option value="fas fa-book-open">Book</option>
                    </select>
                    <input
                        type="number"
                        ame="quantity" 
                        min="1" 
                        max="20000"
                        placeholder="Minutos diários"
                        value={goalPerDay}
                        onChange={event => setGoalPerDay(event.target.value)}
                    />
                    <input
                        type="number"
                        ame="quantity" 
                        min="1" 
                        max="20000"
                        placeholder="Minutos concluidos"
                        value={goalDone}
                        onChange={event => setGoalDone(event.target.value)}  
                    />
                    <button 
                        disabled={isLoad} 
                        type="submit"
                    >
                        Alterar
                    </button>
                    <button onClick={() => onModal(item)} >
                        Cancelar
                    </button>
                </form>
            </div>
      </div>
    );
  };