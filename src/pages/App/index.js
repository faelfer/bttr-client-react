import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api";
import { getToken } from "../../services/auth";
import NavBar from "../../components/NavBar";
import Card from "./components/Card";
import Load from "../../components/Load";

function App({ history }) {
    const [listCards, setListCards] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const token = getToken(); 

    useEffect(() => {
        async function progressMonth() {
            setIsLoad(true);
              try {
                const response = await api.get("/progress_month", {
                    headers: { "Authorization": token }
                });
                console.log("progressThisMonth | response: ", response);
                setIsLoad(false);
                if(!response.data.status === 200) {
                //   setError("Ocorreu um erro ao registrar sua conta. ;-;");
                }
    
                setListCards(response.data)
              } catch (error) {
                console.log("progressThisMonth | error", error);
                // setError("Houve um problema com o login, verifique suas credenciais. ;-;");
                setIsLoad(false);
              }
    
        };

        progressMonth();
    }, [token]);

    function onModal() {
        console.log("onModal")
        history.push(`/card-create`);
    }

    function onDetails(item) {
        console.log("onDetails | item: ", item)
        history.push(`/card-details/${item._id}`);
        
    }

    return (
        <div className="Container">
            <NavBar navigation={history}/>
            <div className="app">
                <Load isShow={isLoad}/>
                <button onClick={() => onModal()}>
                    <p>Adicionar</p>
                </button>
                {listCards.map((item, key) => (
                    <Card 
                        item={item} 
                        key={key} 
                        navigation={history}
                        onModal={() => onDetails(item)}
                    />
                ))}
            </div>
        </div>
    )
};

export default App;