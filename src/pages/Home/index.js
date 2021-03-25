import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api";
import { getToken, logout } from "../../services/auth";
import NavBar from "../../components/NavBar";
import Abiliity from "./components/Abiliity";
import Load from "../../components/Load";

export default function Home({ history }) {
    const [abiliities, setAbiliities] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState('');
    const token = getToken(); 

    useEffect(() => {
      async function getAbiliities() {
        setIsLoad(true);
          try {
            const response = await api.get('/abiliity', {
                headers: { "Authorization": token }
            });
            console.log("getAbiliities | response: ", response);
            setIsLoad(false);
            if(!response.data.status === 200) {
                setError("Houve um problema ao listar suas habilidades, tente novamente mais tarde");
            }

            setAbiliities(response.data)
          } catch (error) {
            console.log("getAbiliities | error: ", error);
              if(error.message === "Request failed with status code 401") {
                logout();
                history.push("/");
              }
            setError("Houve um problema ao listar suas habilidades, tente novamente mais tarde");
            setIsLoad(false);
          }

      };

        getAbiliities();

    }, [token, history]);

    return (
        <>
            <NavBar navigation={history}/>
            <div className="content--align content--column">
                <div className="time__content">
                  <>
                      <div className="time__create">
                        <button className="time__button" onClick={() => history.push("/abiliity")}>
                          Criar habilidade
                        </button>  
                      </div>
                  </>
                </div>
                <div className="home__content">
                {error && <p className="form__message--error">{error}</p>}
                <Load isShow={isLoad}/>
                  <>
                    {abiliities.map((abiliity, key) => (
                      <Abiliity  
                        abiliity={abiliity} 
                        key={key}
                        history={history}
                      />
                    ))}
                  </>
                </div>
            </div>
        </>
    )
};