import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
// import api from "../../services/api";
import { login } from "../../services/auth";
import "./styles.css";

function SignIn({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSignIn(event) {
        event.preventDefault();
        if (!email || !password) {
            setError("Preencha e-mail e senha para continuar!");
        } else {
        try {
            // const response = await api.post("/sessions", { email, password });
            // login(response.data.token);
            login("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
            history.push("/app");
        } catch (err) {
            setError("Houve um problema com o login, verifique suas credenciais. T.T");
        }
        }
    };

    return (
      <div className="sign-in">
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