import React, { useState } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import Create from "./components/Create";
import api from "../../services/api";
import Load from "../../components/Load";
import { getToken } from "../../services/auth";

function CardDetails({ history }) {
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState("");
    const token = getToken(); 

    async function onSave(skill) {
      console.log("onSave | skill: ", skill);
      try {
        const response = await api.post('/progress', {
          headers: { "Authorization": token },
            "name": skill.name, 
            "goalPerDay": skill.goalPerDay, 
            "goalDone": skill.goalDone, 
            "icon": skill.icon
        });
        console.log("onSave | response: ", response.data);
        setIsLoad(false);
        if(!response.data.status === 200) {
          setError("Ocorreu um erro ao registrar. ;-;");
        }

        history.push("/progress");
      } catch (error) {
        console.log("onSave | error: ", error);
        setError("Houve um problema com o registro, verifique os campos. ;-;");
        setIsLoad(false);
      }
    }


    return (
        <div className="Container">
            <NavBar navigation={history}/>
            <div className="create">
                <Load show={isLoad}/>
                <Create
                  onSave={(skill) => onSave(skill)}
                  error={error}
                />
            </div>
        </div>
    )
};

export default CardDetails;