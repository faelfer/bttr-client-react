import React, { useState } from "react";
import './styles.css';
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import Load from "../../components/Load";

function SignUp({ history }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoad, setIsLoad] = useState(false);


  async function handleSignUp(event) {
    event.preventDefault();
    setIsLoad(true);
    if (!username || !email || !password) {
      setError("Preencha todos os dados para se cadastrar");
      setIsLoad(false);
    } else {
      try {
        const response = await api.post("/user/sign_up", 
        { 
          username, 
          email, 
          password 
        });

        setIsLoad(false);
        console.log("handleSignUp | respnse: ",response);
        if(!response.data.status === 200) {
          setError("Ocorreu um erro ao registrar sua conta. ;-;");
        }
        history.push("/");
        
      } catch (error) {
        console.log("handleSignUp | error: ",error);
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
          <p className="redirect__text" >Tem uma conta? <Link className="redirect__link" to="/">Conecte-se</Link></p>
        </div>
      </div>
    );
}

export default withRouter(SignUp);