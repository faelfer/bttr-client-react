import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import emailIsInvalid from '../../utils/validation/emailIsInvalid';
import passwordIsInvalid from '../../utils/validation/passwordIsInvalid';

import Load from "../../components/Load";

import './styles.css';

import { SignUpFetch } from '../../api/services/UserAPI';

function SignUp({ history }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  function validateSignUp() {
    let message = '';
    const nameWithoutTrimValidate = username.trim();

    if (!nameWithoutTrimValidate) {
      message = 'Preencha o campo nome';
    } else if (nameWithoutTrimValidate.length < 3) {
      message = 'Campo nome completo é inválido';
    } else if (emailIsInvalid(email)) {
      message = 'Campo e-mail é inválido';
    } else if (!password) {
      message = 'Preencha o campo senha';
    } else if (passwordIsInvalid(password)) {
      message = 'Campo senha deve conter números e letras.';
    } else if (password.length < 4 || password.length > 8) {
      message = 'Campo senha deve conter de 4 à 8 caracteres';
    }

    return { isInvalid: !!message, message };
  }
  
  async function handleSignUp(event) {
    event.preventDefault();
    setIsLoad(true);

    const responseValidateSignUp = await validateSignUp();
    console.log('sendSignUp | responseValidateSignUp: ', responseValidateSignUp);

    if (responseValidateSignUp.isInvalid) {
      setError(responseValidateSignUp.message);
      setIsLoad(false);
    } else {
      try {
        const resultSignUp = await SignUpFetch(
          username, 
          email, 
          password 
        );
        console.log("handleSignUp | resultSignUp: ", resultSignUp);

        setIsLoad(false);
        if(!resultSignUp.isSuccess) {
          setError(resultSignUp.message);
        } else {
          history.push("/");
        }
      } catch (error) {
        console.log("handleSignUp | error: ", error);
        setError("Ocorreu um erro ao registrar sua conta. ;-;");
        setIsLoad(false);
      }
    }
  };

    return (
      <div className="container">
        <Load isShow={isLoad}/>
        <form className="form" onSubmit={handleSignUp}>
          <p className="form__header">
            Bttr
          </p>
          <p className="form__description">
            Cadastre-se para evoluir suas habilidades.
          </p>
          {error && <p className="form__message form__message--error">{error}</p>}
          <input
            className="form__input"
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <input
            className="form__input"
            type="email"
            placeholder="Endereço de e-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input
            className="form__input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <button className="form__button" type="submit">Cadastre-se</button>
        </form>

        <div className="redirect">
          <p className="redirect__text" >
            Tem uma conta? <Link className="redirect__link" to="/">Conecte-se</Link>
          </p>
        </div>
      </div>
    );
}

export default withRouter(SignUp);