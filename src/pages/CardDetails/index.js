import React, { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import FormDetails from "./components/FormDetails";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Load from "../../components/Load";
import { getToken } from "../../services/auth";

function CardDetails({ history }) {
    const [card, setCard] = useState({});
    const [isLoad, setIsLoad] = useState(true);
    const [error, setError] = useState("");
    const { skillId } = useParams();
    const token = getToken(); 

    useEffect(() => {
        console.log("UseEffect | skillId: ",skillId);
        async function progress() {
            try {
              const response = await api.get(`/progress/${skillId}`);
              console.log("progress | response: ", response.data);
              setIsLoad(false);
              if(!response.data.status === 200) {
                setError("Houve um problema ao listar os campos da habilidade, tente novamente mais tarde");
              }
  
              setCard(response.data);
            } catch (error) {
              console.log("progress | error: ", error);
              setError("Houve um problema ao listar os campos da habilidade, tente novamente mais tarde");
              setIsLoad(false);
            }
  
      };

        progress();
    }, [skillId]);

    async function onSave(skill) {
      console.log("onSave | skill: ", skill);
      setIsLoad(true);
      try {
        const response = await api.put(`/progress/${skillId}`, {
          headers: { "Authorization": token },
            "name": skill.name, 
            "goalPerDay": skill.goalPerDay, 
            "goalDone": skill.goalDone, 
            "icon": skill.icon
        });
        console.log("onSave | response: ", response.data);
        setError("Registro editado com sucesso!");
        setIsLoad(false);
        if(!response.data.status === 200) {
          setError("Ocorreu um erro ao salvar o registro. ;-;");
        }

      } catch (error) {
        console.log("onSave | error: ", error);
        setError("Houve um problema com o registro, verifique os campos. ;-;");
        setIsLoad(false);
      }
    }

    async function onDelete() {
      console.log("onDelete");
      setIsLoad(true);
      try {
        const response = await api.delete(`/progress/${skillId}`);
        console.log("onDelete | response: ", response.data);
        setIsLoad(false);
        if(!response.data.status === 200) {
          setError("Ocorreu um erro ao apagar o registro. ;-;");
        }

        history.push("/home");
      } catch (error) {
        console.log("onDelete | error: ", error);
        setError("Houve um problema com o registro, tente novamente mais tarde. ;-;");
        setIsLoad(false);
      }
    }


    return (
        <div className="Container">
            <NavBar navigation={history}/>
            <div className="details">
                <Load show={isLoad}/>
                <FormDetails
                    onSave={(skill) => onSave(skill)}
                    onDelete={() => onDelete()}
                    item={card}
                    error={error}
                />
            </div>
        </div>
    )
};

export default CardDetails;