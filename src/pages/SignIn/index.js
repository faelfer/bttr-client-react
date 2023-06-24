import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import api from '../../services/api';
import { login, isAuthenticated } from '../../services/auth';
import Load from '../../components/Load';
import './styles.css';

function SignIn({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    function redirectAppScreen() {
      const authenticated = isAuthenticated();
      // console.log("SignIn | authenticated: ",authenticated);
      if (authenticated) {
        history.push('/home');
      }
    }

    redirectAppScreen();
  }, [history]);

  async function handleSignIn(event) {
    event.preventDefault();
    setIsLoad(true);
    if (!email || !password) {
      setError('Preencha e-mail e senha para continuar!');
      setIsLoad(false);
    } else {
      try {
        const response = await api.post('/user/sign_in', { email, password });
        console.log('handleSignIn | response', response.data);
        setIsLoad(false);
        if (!response.data.status === 200) {
          setError('Ocorreu um erro ao registrar sua conta.');
        }
        login(response.data.token);
        history.push('/home');
      } catch (error) {
        console.log('handleSignIn | error', error);
        setError('Houve um problema com o login, verifique suas credenciais.');
        setIsLoad(false);
      }
    }
  }

  return (
    <div className="container">
      <Load isShow={isLoad} />
      <form className="form" onSubmit={handleSignIn}>
        <p className="form__header">
          Bttr
        </p>
        {error && <p className="form__message form__message--error">{error}</p>}
        <input
          className="form__input"
          type="email"
          placeholder="Endereço de e-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="form__input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="form__button" type="submit">Entrar</button>
        <hr className="form__hr" />
        <Link className="redirect__link form__link--padding" to="/forgot-password">Esqueceu a senha?</Link>
      </form>

      <div className="redirect">
        <p className="redirect__text">
          {`Não tem uma conta? `}
          <Link className="redirect__link" to="/sign-up">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default withRouter(SignIn);
