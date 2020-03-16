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
    const [isLoad, setIsLoad] = useState(false);

    async function handleSignIn(event) {
        event.preventDefault();
        setIsLoad(true);
        if (!email || !password) {
            setError("Preencha e-mail e senha para continuar!");
            setIsLoad(false);
        } else {
          try {
            const response = await api.post("/login", { email, password });
            console.log("handleSignIn | response", response.data);
            setIsLoad(false);
            if(!response.data.status === 200) {
              setError("Ocorreu um erro ao registrar sua conta. ;-;");
            }
            login(response.data.token);
            history.push("/progress");
          } catch (error) {
            console.log("handleSignIn | error", error);
            setError("Houve um problema com o login, verifique suas credenciais. ;-;");
            setIsLoad(false);
          }
        }
    };

    return (
      <div className="sign-in">
        <Load isShow={isLoad}/>
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
          <Link to="/forgot-password">Esqueci minha senha</Link>
          <hr />
          <Link to="/sign-up">Criar conta</Link>
        </form>
      </div>
    );

}

export default withRouter(SignIn);