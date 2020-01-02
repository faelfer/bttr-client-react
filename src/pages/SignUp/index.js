import React, { useState } from "react";
import './styles.css';
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";

function SignUp({ history }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  async function handleSignUp(e) {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Preencha todos os dados para se cadastrar");
    } else {
      try {
        await api.post("/users", { username, email, password });
        history.push("/");
      } catch (err) {
        console.log(err);
        setError("Ocorreu um erro ao registrar sua conta. T.T");
      }
    }
  };

    return (
      <div className="sign-up">
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
          <button type="submit">Cadastrar grátis</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </form>
      </div>
    );
}

export default withRouter(SignUp);