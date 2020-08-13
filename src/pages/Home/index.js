import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api";
import { getToken } from "../../services/auth";
import NavBar from "../../components/NavBar";
import Card from "./components/Card";
import Load from "../../components/Load";

function Home({ history }) {
    const [listCards, setListCards] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState('');
    const token = getToken(); 

    async function progressMonth() {
        setIsLoad(true);
          try {
            const response = await api.get("/progress_month", {
                headers: { "Authorization": token }
            });
            console.log("progressThisMonth | response: ", response);
            setIsLoad(false);
            if(!response.data.status === 200) {
                setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
            }

            setListCards(response.data)
          } catch (error) {
            console.log("progressThisMonth | error", error);
            setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
            setIsLoad(false);
          }

    };

    useEffect(() => {
        progressMonth();
    }, [token]);

    function goToCreatePage() {
        console.log("goToCreatePage")
        history.push(`/skill-create`);
    }

    function goToDetailsPage(item) {
        console.log("goToDetailsPage | item: ", item)
        history.push(`/skill-details/${item._id}`);
        
    }

    async function addMinutesSkill(skillId, minutes) {
        console.log("addMinutesSkill | skillId, minutes: ", skillId, minutes);
        setIsLoad(true);
          try {
            const response = await api.put(`/progress_sum/${skillId}`, {
                headers: { "Authorization": token },
                "minutesDone": minutes, 
            });
            console.log("addMinutesSkill | response: ", response);
            setIsLoad(false);
            progressMonth();

            if(!response.data.status === 200) {
                setError("Houve um problema com o acréscimo de tempo, tente novamente mais tarde");
            }
            console.log("addMinutesSkill | response.data", response.data);
            if (error) {
                setError("");
            }

          } catch (error) {
            console.log("addMinutesSkill | error", error);
            setError("Houve um problema com o acréscimo de tempo, tente novamente mais tarde");
            setIsLoad(false);
          }

    };

    return (
        <div className="Container">
            <NavBar navigation={history}/>
            <div className="container-create">
                <button onClick={() => goToCreatePage()}>
                    <p>Criar Nova Habilidade</p>
                </button>
                {error && <p className="container-create-error">{error}</p>}
            </div>
            <div className="app">
                <Load isShow={isLoad}/>
                {listCards.map((item, key) => (
                    <Card 
                        item={item} 
                        key={key} 
                        navigation={history}
                        onDetails={() => goToDetailsPage(item)}
                        onAddMinutes={(skillId, minutes) => addMinutesSkill(skillId, minutes)}
                    />
                ))}
            </div>
        </div>
    )
};

export default Home;