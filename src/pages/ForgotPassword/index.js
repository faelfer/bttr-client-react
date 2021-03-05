import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import Load from "../../components/Load";
import "./styles.css";

function ForgotPassword({ history }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoad, setIsLoad] = useState(false);

    async function handleForgotPassword(event) {
        event.preventDefault();
        setIsLoad(true);
        if (!email) {
            setError("Preencha com seu e-mail para continuar!");
            setIsLoad(false);
        } else {
          try {
            const response = await api.post("/user/forgot_password", { email });
            console.log("handleForgotPassword | response", response.data);
            setIsLoad(false);
            if(!response.data.status === 200) {
              setError("Ocorreu um erro. ;-;");
            }
            setError(response.data.message);
          } catch (error) {
            console.log("handleForgotPassword | error", error);
            setError("Houve um problema com o esqueci minha senha, verifique seu e-mail. ;-;");
            setIsLoad(false);
          }
        }
    };

    return (
      <div className="container">
        <Load isShow={isLoad}/>
        <form className="form" onSubmit={handleForgotPassword}>
          <p className="form__header">
            Problemas para entrar?
          </p>
          <p className="form__description">
            Insira o seu email e enviaremos uma senha para você voltar a acessar a sua conta.
          </p>
          {error && <p className="form__message form__message--error">{error}</p>}
          <input
            className="form__input"
            type="email"
            placeholder="Endereço de e-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <button className="form__button" type="submit">Enviar</button>
          <hr className="form__hr"/>
          <Link className="redirect__link" to="/">Criar nova conta</Link>
        </form>

        <div className="redirect">
          <p className="redirect__text">
            <Link className="redirect__link" to="/sign-up">Voltar ao login</Link>
          </p>
        </div>
      </div>
    );

}

export default withRouter(ForgotPassword);