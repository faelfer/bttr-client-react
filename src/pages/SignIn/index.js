import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";
import Load from "../../components/Load";
import "./styles.css";

function SignIn({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [load, setLoad] = useState(false);

    async function handleSignIn(event) {
        event.preventDefault();
        if (!email || !password) {
            setError("Preencha e-mail e senha para continuar!");
        } else {
          try {
            const response = await api.post("/login", { email, password });
            console.log("handleSignIn | response", response);
            // login(response.data.token);
            // history.push("/app");
          } catch (error) {
            console.log("handleSignIn | error", error);
            setError("Houve um problema com o login, verifique suas credenciais. T.T");
          }
        }
    };

    return (
      <div className="sign-in">
        <Load show={load}/>
        <form onSubmit={handleSignIn}>
          {error && <p>{error}</p>}
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
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta grátis</Link>
        </form>
      </div>
    );

}

export default withRouter(SignIn);