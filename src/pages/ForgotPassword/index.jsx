import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Load from '../../components/Load';
import HeaderForm from '../../components/HeaderForm';
import DescriptionForm from '../../components/DescriptionForm';
import MessageContainer from '../../components/MessageContainer';
import InputOutlineForm from '../../components/InputOutlineForm';
import LinkRedirect from '../../components/LinkRedirect';
import ButtonContained from '../../components/ButtonContained';

import './styles.css';

import { ForgotPasswordFetch } from '../../api/services/UserAPI';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [exceptMessage, setExceptionMessage] = useState('');
  const [exceptType, setExceptionType] = useState('error');
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
      setExceptionMessage(responseValidateForgotPassword.message);
      setExceptionType('warning');
    } else {
      try {
        setIsLoading(true);
        const resultForgotPassword = await ForgotPasswordFetch(email);
        console.log('sendForgotPassword | resultForgotPassword: ', resultForgotPassword);
        setExceptionMessage(resultForgotPassword.message);
        setExceptionType(resultForgotPassword.isSuccess ? 'success' : 'error');
        setIsLoading(false);
      } catch (error) {
        console.log('sendForgotPassword | error: ', error);
        setExceptionMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
        setExceptionType('error');
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
        {exceptMessage && <MessageContainer type={exceptType} message={exceptMessage} />}
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
