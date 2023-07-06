import React, { useState, useEffect } from 'react';
import {
  Link,
  withRouter,
  useHistory,
} from 'react-router-dom';

import { login, isAuthenticated } from '../../services/auth';

import Load from '../../components/Load';
import HeaderForm from '../../components/HeaderForm';
import InputOutlineForm from '../../components/InputOutlineForm';
import LinkRedirect from '../../components/LinkRedirect';

import './styles.css';

import { SignInFetch } from '../../api/services/UserAPI';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

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

  function validateSignIn() {
    let message = '';

    if (!email) {
      message = 'Preencha o campo e-mail';
    } else if (!password) {
      message = 'Preencha o campo senha';
    }

    return { isInvalid: !!message, message };
  }

  async function handleSignIn(event) {
    event.preventDefault();
    setIsLoading(true);

    const responseValidateSignIn = await validateSignIn();
    console.log('sendSignIn | responseValidateSignIn: ', responseValidateSignIn);

    if (responseValidateSignIn.isInvalid) {
      setErrorMessage(responseValidateSignIn.message);
      setIsLoading(false);
    } else {
      try {
        const resultSignIn = await SignInFetch(
          email,
          password,
        );
        console.log('handleSignIn | resultSignIn: ', resultSignIn);

        setIsLoading(false);
        if (!resultSignIn.isSuccess) {
          setErrorMessage(resultSignIn.message);
        } else {
          login(resultSignIn.user.token);
          history.push('/home');
        }
      } catch (error) {
        console.log('handleSignIn | error: ', error);
        setErrorMessage('Ocorreu um erro ao acessar sua conta. ;-;');
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="container">
      <Load isShow={isLoading} />
      <form className="form" onSubmit={handleSignIn}>
        <HeaderForm title="Bttr" />
        {errorMessage && <p className="form__message form__message--error">{errorMessage}</p>}
        <InputOutlineForm
          inputType="email"
          inputPlaceholder="Insira seu e-mail"
          onChangeInput={(textValue) => setEmail(textValue)}
        />
        <InputOutlineForm
          inputType="password"
          inputPlaceholder="Insira sua senha"
          onChangeInput={(textValue) => setPassword(textValue)}
        />
        <button className="form__button" type="submit">Entrar</button>
        <hr className="form__hr" />
        <Link className="redirect__link form__link--padding" to="/forgot-password">Esqueceu a senha?</Link>
      </form>

      <LinkRedirect
        description="Não tem uma conta? "
        descriptionUrl="Cadastre-se"
        onRedirect={() => history.push('/sign-up')}
      />
    </div>
  );
}

export default withRouter(SignIn);
