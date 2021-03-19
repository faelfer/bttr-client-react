import React, { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import api from "../../services/api";
import Load from "../../components/Load";
import { getToken, logout } from "../../services/auth";
import { Link, useParams } from "react-router-dom";

export default function ProfileForm({ history }) {
  const token = getToken(); 
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(1);

  useEffect(() => {
    async function getProfile() {
      setIsLoad(true);
        try {
          const response = await api.get('/user/profile', {
              headers: { "Authorization": token }
          });
          console.log("getProfile | response: ", response);
          setIsLoad(false);
          if(!response.data.status === 200) {
              setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
          }

          setUsername(response.data.username);
          setEmail(response.data.email);
        } catch (error) {
          console.log("getProfile | error: ", error);
            if(error.message === "Request failed with status code 401") {
              logout();
              history.push("/");
            }
          setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
          setIsLoad(false);
        }

    };

      getProfile();

  }, [history, token]);

  async function editProfile(event) {
    event.preventDefault();
    setIsLoad(true);
    if (!username) {
        setError("Preencha nome para continuar!");
        setIsLoad(false);
    } else if (!email) {
      setError("Preencha tempo diário para continuar!");
      setIsLoad(false);
    
    } else {
      try {
        const response = await api.put('/user/profile',
          { 
            username, 
            email
          },
          { headers: { 'Authorization': token } }
        );
        console.log("editProfile | response", response.data);
        setIsLoad(false);
        if(!response.data.status === 200) {
          setError("Ocorreu um erro ao registrar sua registro de tempo.");
        }
        history.push("/home");
      } catch (error) {
        console.log("editProfile | error", error);
        setError("Houve um problema com o login, verifique suas credenciais.");
        setIsLoad(false);
      }
    }
  };

  async function deleteProfile(event) {
    event.preventDefault();
    setIsLoad(true);

      try {
        const response = await api.delete('/user/profile',
          { headers: { 'Authorization': token } }
        );
        console.log("deleteProfile | response", response.data);
        setIsLoad(false);
        if(!response.data.status === 200) {
          setError("Ocorreu um erro ao registrar sua registro de tempo.");
        }
        logout();
        history.push("/");
      } catch (error) {
        console.log("deleteProfile | error", error);
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
            <form className="abiliity__form" onSubmit={editProfile}>
              <p className="form__header">
                Perfil
              </p>
              <p className="form__description">
                Crie uma nova registro de tempo para começar a registrar o quanto você se dedicou.
              </p>
              {error && <p className="form__message form__message--error">{error}</p>}

              <input
                className="abiliity__input"
                type="text"
                placeholder="Nome do usuário"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />

              <input
                className="abiliity__input"
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />

              <button className="abiliity__button" type="submit">
                Editar perfil
              </button>

              <button className="abiliity__delete" onClick={deleteProfile}>
                Apagar perfil
              </button>

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