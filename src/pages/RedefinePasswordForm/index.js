import React, { useState } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import api from "../../services/api";
import Load from "../../components/Load";
import { getToken } from "../../services/auth";
import { Link } from "react-router-dom";

export default function RedefinePasswordForm({ history }) {
  const token = getToken(); 
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  async function redefinePasswordForm(event) {
    event.preventDefault();
    setIsLoad(true);
    if (!currentPassword) {
        setError("Preencha nome para continuar!");
        setIsLoad(false);
    } else if (!newPassword) {
      setError("Preencha tempo diário para continuar!");
      setIsLoad(false);

    } else if (!confirmNewPassword) {
      setError("Preencha tempo diário para continuar!");
      setIsLoad(false);
    
    } else {
      try {
        const response = await api.post('/user/redefine_password',
          { 
            currentPassword, 
            newPassword,
            confirmNewPassword
          },
          { headers: { 'Authorization': token } }
        );
        console.log("redefinePasswordForm | response", response.data);
        setIsLoad(false);
        if(!response.data.status === 200) {
          setError("Ocorreu um erro ao registrar sua registro de tempo.");
        }
        history.push("/home");
      } catch (error) {
        console.log("redefinePasswordForm | error", error);
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
            <form className="abiliity__form" onSubmit={redefinePasswordForm}>
              <p className="form__header">
                Redefinir senha
              </p>
              {error && <p className="form__message form__message--error">{error}</p>}

              <input
                className="abiliity__input"
                type="password"
                placeholder="Senha atual"
                value={currentPassword}
                onChange={event => setCurrentPassword(event.target.value)}
              />

              <input
                className="abiliity__input"
                type="password"
                placeholder="Nova senha"
                value={newPassword}
                onChange={event => setNewPassword(event.target.value)}
              />

              <input
                className="abiliity__input"
                type="password"
                placeholder="Confirmar nova senha"
                value={confirmNewPassword}
                onChange={event => setConfirmNewPassword(event.target.value)}
              />

              <button className="abiliity__button" type="submit">
                Redefinir senha
              </button>

              <hr className="abiliity__hr"/>
              <p className="redirect__text redirect__text--margin">
                <Link className="redirect__link" to="/profile">Voltar ao perfil</Link>
              </p>

            </form>
          </div>
        </div>
    </>
    )
};