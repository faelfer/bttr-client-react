import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api";
import { getToken, logout } from "../../services/auth";
import NavBar from "../../components/NavBar";
import Abiliity from "./components/Abiliity";
import Load from "../../components/Load";

function Home({ history }) {
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
                setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
            }

            setAbiliities(response.data)
          } catch (error) {
            console.log("getAbiliities | error: ", error);
              if(error.message === "Request failed with status code 401") {
                logout();
                history.push("/");
              }
            setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
            setIsLoad(false);
          }

      };

        getAbiliities();

    }, [token, history]);

    return (
        <>
            <NavBar navigation={history}/>
            <div className="content--align">
                <div className="home__content">
                {error && <p className="form__message--error">{error}</p>}
                <Load isShow={isLoad}/>
                  <>
                  <div className="abiliity">
                    <button className="form__button" onClick={() => history.push("/abiliity")}>
                        Criar habilidade
                    </button>  
                </div>
                  {abiliities.map((abiliity, key) => (
                    <Abiliity  abiliity={abiliity} key={key}/>
                  ))}
                  </>
                </div>
            </div>
        </>
    )
};

export default Home;