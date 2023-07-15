import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { login, isAuthenticated } from '../../services/auth';

import Load from '../../components/Load';
import HeaderForm from '../../components/HeaderForm';
import InputOutlineForm from '../../components/InputOutlineForm';
import LinkRedirect from '../../components/LinkRedirect';
import ButtonContained from '../../components/ButtonContained';
import ButtonTransparent from '../../components/ButtonTransparent';

import './styles.css';

import { SignInFetch } from '../../api/services/UserAPI';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    function redirectAppScreen() {
      const authenticated = isAuthenticated();
      // console.log("SignIn | authenticated: ",authenticated);
      if (authenticated) {
        navigate('/home', { replace: true });
      }
    }

    redirectAppScreen();
  }, [navigate]);

  function validateSignIn() {
    let message = '';

    if (!email) {
      message = 'Preencha o campo e-mail';
    } else if (!password) {
      message = 'Preencha o campo senha';
    }

    return { isInvalid: !!message, message };
  }

  async function sendSignIn() {
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
        console.log('sendSignIn | resultSignIn: ', resultSignIn);

        setIsLoading(false);
        if (!resultSignIn.isSuccess) {
          setErrorMessage(resultSignIn.message);
        } else {
          login(`Token ${resultSignIn.user.token}`);
          navigate('/home', { replace: true });
        }
      } catch (error) {
        console.log('sendSignIn | error: ', error);
        setErrorMessage('Ocorreu um erro ao acessar sua conta. ;-;');
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="container">
      <Load isShow={isLoading} />
      <div className="form">
        <HeaderForm title="Bttr" />
        {errorMessage && <p className="form__message form__message--error">{errorMessage}</p>}
        <InputOutlineForm
          inputType="email"
          inputPlaceholder="Insira seu e-mail"
          inputValue={email}
          onChangeInput={(textValue) => setEmail(textValue)}
        />
        <InputOutlineForm
          inputType="password"
          inputPlaceholder="Insira sua senha"
          inputValue={password}
          onChangeInput={(textValue) => setPassword(textValue)}
        />
        <ButtonContained
          text="Entrar"
          onAction={() => sendSignIn()}
        />
        <ButtonTransparent
          text="Esqueceu a senha?"
          onAction={() => navigate('/forgot-password', { replace: true })}
        />
      </div>

      <LinkRedirect
        description="Não tem uma conta? "
        descriptionUrl="Cadastre-se"
        onRedirect={() => navigate('/sign-up', { replace: true })}
      />
    </div>
  );
}
