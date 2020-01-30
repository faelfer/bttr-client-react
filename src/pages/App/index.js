import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api";
import { getToken } from "../../services/auth";
import NavBar from "../../components/NavBar";
import Card from "./components/Card";
import Load from "../../components/Load";

function App({ history }) {
    const [listCards, setListCards] = useState([
        {"name": "Code", "goalPerDay": 70, "goalDone": (210 + 547 + 393 + 92 + 73 + 98 + 57), "icon": "fas fa-code"},
        {"name": "Vest", "goalPerDay": 80, "goalDone": (250 + 104), "icon": "fas fa-university"},
        {"name": "Draw", "goalPerDay": 15, "goalDone": 45, "icon": "fas fa-pencil-ruler"},   
        {"name": "Book", "goalPerDay": 20, "goalDone": (51 + 20 + 20 + 20), "icon": "fas fa-book-open"},
        {"name": "Care", "goalPerDay": 30, "goalDone": 0, "icon": "fas fa-spa"}
    ]);
    const [load, setLoad] = useState(false);
    const token = getToken(); 

    useEffect(() => {
        async function progressThisMonth() {
            setLoad(true);
              try {
                const response = await api.get("/progress", {
                    headers: { "Authorization": token }
                });
                console.log("progressThisMonth | response", response);
                setLoad(false);
                if(!response.data.status === 200) {
                //   setError("Ocorreu um erro ao registrar sua conta. ;-;");
                }

                setListCards(response.data)
              } catch (error) {
                console.log("progressThisMonth | error", error);
                // setError("Houve um problema com o login, verifique suas credenciais. ;-;");
                setLoad(false);
              }

        };

        // progressThisMonth();
    }, []);

    return (
        <div className="Container">
            <NavBar navigation={history}/>
            <div className="app">
                <Load show={load}/>
                {listCards.map((item, key) => (
                    <Card 
                        item={item} 
                        key={key} 
                        navigation={history}
                    />
                ))}
            </div>
        </div>
    )
};

export default App;