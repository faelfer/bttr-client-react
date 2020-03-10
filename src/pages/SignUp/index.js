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
        const response = await api.post("/users", { username, email, password });
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
      <div className="sign-up">
        <Load isShow={isLoad}/>
        <form onSubmit={handleSignUp}>
          {error && <p>{error}</p>}
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <button type="submit">Cadastrar</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </form>
      </div>
    );
}

export default withRouter(SignUp);