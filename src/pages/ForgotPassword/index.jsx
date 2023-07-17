import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Load from '../../components/Load';
import HeaderForm from '../../components/HeaderForm';
import DescriptionForm from '../../components/DescriptionForm';
import InputOutlineForm from '../../components/InputOutlineForm';
import LinkRedirect from '../../components/LinkRedirect';
import ButtonContained from '../../components/ButtonContained';

import './styles.css';

import { ForgotPasswordFetch } from '../../api/services/UserAPI';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function validateForgotPassword() {
    let message = '';

    if (!email) {
      message = 'Preencha o campo e-mail';
    }

    return { isInvalid: !!message, message };
  }

  async function sendForgotPassword() {
    const responseValidateForgotPassword = await validateForgotPassword();
    console.log('sendForgotPassword | responseValidateForgotPassword: ', responseValidateForgotPassword);

    if (responseValidateForgotPassword.isInvalid) {
      setErrorMessage(responseValidateForgotPassword.message);
      setIsLoading(false);
    } else {
      try {
        const resultForgotPassword = await ForgotPasswordFetch(email);
        console.log('sendForgotPassword | resultForgotPassword: ', resultForgotPassword);

        setIsLoading(false);
        setErrorMessage(resultForgotPassword.message);
      } catch (error) {
        console.log('sendForgotPassword | error: ', error);
        setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="container">
      <Load isShow={isLoading} />
      <div className="form">
        <HeaderForm title="Problemas para entrar?" />
        <DescriptionForm description="Insira o seu e-mail e enviaremos uma senha para você voltar a acessar a sua conta." />
        {errorMessage && <p className="form__message form__message--error">{errorMessage}</p>}
        <InputOutlineForm
          inputType="email"
          inputPlaceholder="Insira seu e-mail"
          inputValue={email}
          onChangeInput={(textValue) => setEmail(textValue)}
        />
        <ButtonContained
          text="Enviar"
          onAction={() => sendForgotPassword()}
        />
      </div>

      <LinkRedirect
        description=" "
        descriptionUrl="Voltar ao login"
        onRedirect={() => navigate('/sign-up', { replace: true })}
      />
    </div>
  );
}