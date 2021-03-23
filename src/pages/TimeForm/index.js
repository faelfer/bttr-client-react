import React, { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import api from "../../services/api";
import Load from "../../components/Load";
import { getToken, logout } from "../../services/auth";
import { Link, useParams } from "react-router-dom";

export default function TimeForm({ history }) {
  const token = getToken(); 
  const { timeId } = useParams();
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState("");
  const [abiliity, setAbiliity] = useState("");
  const [abiliities, setAbiliities] = useState([]);
  const [minutes, setMinutes] = useState(1);

  useEffect(() => {
    async function getTime() {
      setIsLoad(true);
        try {
          const response = await api.get(`/time/${timeId}`, {
              headers: { "Authorization": token }
          });
          console.log("getTime | response: ", response);
          setIsLoad(false);
          if(!response.data.status === 200) {
              setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
          }

          setAbiliity(response.data.abiliity._id);
          setMinutes(response.data.minutes);
        } catch (error) {
          console.log("getTime | error: ", error);
            if(error.message === "Request failed with status code 401") {
              logout();
              history.push("/");
            }
          setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
          setIsLoad(false);
        }

    };

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
          setAbiliity(response.data[0]._id)
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

    if(timeId) {
      getAbiliities();
      getTime();
    } else {
      getAbiliities();
    }

  }, [timeId, history, token]);

    async function createTime(event) {
      console.log("createTime | abiliity: ", abiliity)
      event.preventDefault();
      setIsLoad(true);
      if (!abiliity) {
          setError("Preencha nome para continuar!");
          setIsLoad(false);
      } else if (!minutes) {
        setError("Preencha tempo diário para continuar!");
        setIsLoad(false);
      
      } else {
        try {
          const response = await api.put(`/abiliity/${abiliity}/add_minutes`,
            {
              "minutes": parseInt(minutes)
            },
            { headers: { 'Authorization': token } }
          );
          console.log("createTime | response", response.data);
          setIsLoad(false);
          if(!response.data.status === 200) {
            setError("Ocorreu um erro ao registrar sua registro de tempo.");
          }
          history.push("/time-table");
        } catch (error) {
          console.log("createTime | error", error);
          setError("Houve um problema com o login, verifique suas credenciais.");
          setIsLoad(false);
        }
      }
  };

  async function editTime(event) {
    event.preventDefault();
    setIsLoad(true);
    if (!abiliity) {
        setError("Preencha nome para continuar!");
        setIsLoad(false);
    } else if (!minutes) {
      setError("Preencha tempo diário para continuar!");
      setIsLoad(false);
    
    } else {
      try {
        const response = await api.put(`/time/${timeId}`,
          { 
            abiliity, 
            "minutes": parseInt(minutes)
          },
          { headers: { 'Authorization': token } }
        );
        console.log("editTime | response", response.data);
        setIsLoad(false);
        if(!response.data.status === 200) {
          setError("Ocorreu um erro ao registrar sua registro de tempo.");
        }
        history.push("/time-table");
      } catch (error) {
        console.log("editTime | error", error);
        setError("Houve um problema com o login, verifique suas credenciais.");
        setIsLoad(false);
      }
    }
  };

  async function deleteAbiliity(event) {
    event.preventDefault();
    setIsLoad(true);

      try {
        const response = await api.delete(`/time/${timeId}`,
          { headers: { 'Authorization': token } }
        );
        console.log("deleteAbiliity | response", response.data);
        setIsLoad(false);
        if(!response.data.status === 200) {
          setError("Ocorreu um erro ao registrar sua registro de tempo.");
        }
        history.push("/time-table");
      } catch (error) {
        console.log("deleteAbiliity | error", error);
        setError("Houve um problema com o login, verifique suas credenciais.");
        setIsLoad(false);
      }

  };

    return (
      <>
        <NavBar navigation={history}/>
        <div className="content--align">
          <div className="abiliity__content">
            <Load isShow={isLoad}/>
            <form className="abiliity__form" onSubmit={timeId ? editTime : createTime}>
              <p className="form__header">
                Registro de tempo
              </p>
              {timeId ?
                (
                  <p className="form__description">
                    Edite o registro de tempo criado.
                  </p>
                )
              : 
                (
                  <p className="form__description">
                    Crie uma nova registro de tempo para desmonstrar o quanto você se dedicou.
                  </p>
                )
              }
              {error && <p className="form__message form__message--error">{error}</p>}

              <select 
                className="time__select" 
                value={abiliity} 
                onChange={event => { 
                  console.log(event.target.value)
                  setAbiliity(event.target.value) 
                }}
              >
                {
                  abiliities.map((abiliity, key) => {
                    return (
                      <option value={abiliity._id} key={key}>{abiliity.name}</option>
                    )
                  })
                }
              </select>
              <input
                className="abiliity__input"
                type="number"
                placeholder="Tempo diário (em minutos)"
                min="1" 
                max="1440"
                value={minutes}
                onChange={event => setMinutes(event.target.value)}
              />

              <button className="abiliity__button" type="submit">
                {timeId ? "Editar registro de tempo" : "Criar registro de tempo"}
              </button>
              {timeId ?
                (
                  <button className="abiliity__delete" onClick={deleteAbiliity}>
                    Apagar registro de tempo
                  </button>
                )
              : 
                null
              }
              <hr className="abiliity__hr"/>
              <p className="redirect__text redirect__text--margin">
                <Link className="redirect__link" to="/time-table">Voltar ao tempo</Link>
              </p>
            </form>
          </div>
        </div>
    </>
    )
};