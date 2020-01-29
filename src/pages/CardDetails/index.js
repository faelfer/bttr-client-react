import React, { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import Details from "./components/Details";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Load from "../../components/Load";

function CardDetails({ history }) {
    const [card, setCard] = useState(
        {"name": "Code", "goalPerDay": 70, "goalDone": (210 + 70 + 88 + 61 + 90 + 84 + 77), "icon": "fas fa-code"},
    );
    const [load, setLoad] = useState(false);
    const { cardId } = useParams();
    
    useEffect(() => {
        console.log("UseEffect | cardId: ",cardId);
        async function progress() {
            setLoad(true);
              try {
                const response = await api.get(`/progress/${cardId}`);
                console.log("progress | response: ", response.data);
                setLoad(false);
                if(!response.data.status === 200) {
                //   setError("Ocorreu um erro ao registrar sua conta. ;-;");
                }

                setCard(response.data);
              } catch (error) {
                console.log("progress | error: ", error);
                // setError("Houve um problema com o login, verifique suas credenciais. ;-;");
                setLoad(false);
              }

        };

        progress();
    }, []);

    return (
        <div className="Container">
            <NavBar navigation={history}/>
            <div className="card-details">
                <Load show={load}/>
                <Details item={card}/>
            </div>
        </div>
    )
};

export default CardDetails;