import React, { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import Details from "./components/Details";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Load from "../../components/Load";
import { getToken } from "../../services/auth";

function CardDetails({ history }) {
    const [card, setCard] = useState({});
    const [isLoad, setIsLoad] = useState(false);
    const { cardId } = useParams();
    const token = getToken(); 
    
    async function progress() {
        setIsLoad(true);
          try {
            const response = await api.get(`/progress/${cardId}`);
            console.log("progress | response: ", response.data);
            setIsLoad(false);
            if(!response.data.status === 200) {
            //   setError("Ocorreu um erro ao registrar sua conta. ;-;");
            }

            setCard(response.data);
          } catch (error) {
            console.log("progress | error: ", error);
            // setError("Houve um problema com o login, verifique suas credenciais. ;-;");
            setIsLoad(false);
          }

    };

    useEffect(() => {
        console.log("UseEffect | cardId: ",cardId);

        progress();
    }, []);

    async function progressSum(minutesDone, id) {
        console.log("progressSum | minutesDone, id: ", minutesDone, id);
        setIsLoad(true);
          try {
            const response = await api.put("/progress_sum/" + id, 
            { minutesDone },
            { headers: { "Authorization": token } }
            );
            console.log("progressSum | response: ", response);
            setIsLoad(false);
            if(!response.data.status === 200) {
            //   setError("Ocorreu um erro ao registrar sua conta. ;-;");
            }

            // setListCards(response.data)
            progress()
          } catch (error) {
            console.log("progressSum | error", error);
            // setError("Houve um problema com o login, verifique suas credenciais. ;-;");
            setIsLoad(false);
          }

    };

    return (
        <div className="Container">
            <NavBar navigation={history}/>
            <div className="details">
                <Load show={isLoad}/>
                <Details
                    onProgressSum={(minutesDone, id) => progressSum(minutesDone, id)}
                    item={card}
                />
            </div>
        </div>
    )
};

export default CardDetails;