import React, { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import api from "../../services/api";
import Load from "../../components/Load";
import { getToken, logout } from "../../services/auth";
import { Link, useParams } from "react-router-dom";

export default function AbiliityForm({ history }) {
  const token = getToken(); 
  const { abiliityId } = useParams();
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [timeDaily, setTimeDaily] = useState(1);
  const [timeTotal, setTimeTotal] = useState(0);

  useEffect(() => {
    async function getAbiliity() {
      setIsLoad(true);
        try {
          const response = await api.get(`/abiliity/${abiliityId}`, {
              headers: { "Authorization": token }
          });
          console.log("getAbiliity | response: ", response);
          setIsLoad(false);
          if(!response.data.status === 200) {
              setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
          }

          setName(response.data[0].name);
          setTimeDaily(response.data[0].timeDaily);
          setTimeTotal(response.data[0].timeTotal);
        } catch (error) {
          console.log("getAbiliity | error: ", error);
            if(error.message === "Request failed with status code 401") {
              logout();
              history.push("/");
            }
          setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
          setIsLoad(false);
        }

    };

    getAbiliity();

  }, [abiliityId, history, token]);

    async function createAbiliity(event) {
      event.preventDefault();
      setIsLoad(true);
      if (!name) {
          setError("Preencha nome para continuar!");
          setIsLoad(false);
      } else if (!timeDaily) {
        setError("Preencha tempo diário para continuar!");
        setIsLoad(false);

      } else if (!timeTotal) {
        setError("Preencha tempo total continuar!");
        setIsLoad(false);
      
      } else {
        try {
          const response = await api.post("/abiliity",
            { 
              name, 
              timeDaily,
              timeTotal 
            },
            { headers: { 'Authorization': token } }
          );
          console.log("createAbiliity | response", response.data);
          setIsLoad(false);
          if(!response.data.status === 200) {
            setError("Ocorreu um erro ao registrar sua habilidade.");
          }
          history.push("/home");
        } catch (error) {
          console.log("createAbiliity | error", error);
          setError("Houve um problema com o login, verifique suas credenciais.");
          setIsLoad(false);
        }
      }
  };

  async function editAbiliity(event) {
    event.preventDefault();
    setIsLoad(true);
    if (!name) {
        setError("Preencha nome para continuar!");
        setIsLoad(false);
    } else if (!timeDaily) {
      setError("Preencha tempo diário para continuar!");
      setIsLoad(false);

    } else if (!timeTotal) {
      setError("Preencha tempo total continuar!");
      setIsLoad(false);
    
    } else {
      try {
        const response = await api.post("/abiliity",
          { 
            name, 
            timeDaily,
            timeTotal 
          },
          { headers: { 'Authorization': token } }
        );
        console.log("createAbiliity | response", response.data);
        setIsLoad(false);
        if(!response.data.status === 200) {
          setError("Ocorreu um erro ao registrar sua habilidade.");
        }
        history.push("/home");
      } catch (error) {
        console.log("createAbiliity | error", error);
        setError("Houve um problema com o login, verifique suas credenciais.");
        setIsLoad(false);
      }
    }
};

    return (
      <>
        <NavBar navigation={history}/>
        <div className="content--align">
          <div className="abiliity__content">
            <Load isShow={isLoad}/>
            <form className="abiliity__form" onSubmit={abiliityId ? editAbiliity : createAbiliity}>
              <p className="form__header">
                Habilidade
              </p>
              <p className="form__description">
                Crie uma nova habilidade para começar a registrar o quanto você se dedicou.
              </p>
              {error && <p className="form__message form__message--error">{error}</p>}
              <input
                className="abiliity__input"
                type="text"
                placeholder="Nome da habilidade"
                value={name}
                onChange={event => setName(event.target.value)}
              />
              <input
                className="abiliity__input"
                type="number"
                placeholder="Tempo diário (em minutos)"
                min="1" 
                max="1440"
                value={timeDaily}
                onChange={event => setTimeDaily(event.target.value)}
              />
              <input
                className="abiliity__input"
                type="number"
                placeholder="Tempo total (em minutos)"
                min="0" 
                max="1440"
                value={timeTotal}
                onChange={event => setTimeTotal(event.target.value)}
              />
              <button className="abiliity__button" type="submit">
                {abiliityId ? "Editar habilidade" : "Criar habilidade"}
              </button>
              <p className="redirect__text redirect__text--margin">
                <Link className="redirect__link" to="/home">Voltar ao início</Link>
              </p>
            </form>
          </div>
        </div>
    </>
    )
};