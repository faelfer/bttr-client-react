import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import isInvalidEmail from '../../utils/rules/isInvalidEmail';
import isInvalidPassword from '../../utils/rules/isInvalidPassword';

import Load from '../../components/Load';
import HeaderForm from '../../components/HeaderForm';
import DescriptionForm from '../../components/DescriptionForm';
import InputOutlineForm from '../../components/InputOutlineForm';
import LinkRedirect from '../../components/LinkRedirect';
import ButtonContained from '../../components/ButtonContained';

import './styles.css';

import { SignUpFetch } from '../../api/services/UserAPI';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function validateSignUp() {
    let message = '';
    const nameWithoutTrimValidate = username.trim();

    if (!nameWithoutTrimValidate) {
      message = 'Preencha o campo nome de usuário';
    } else if (nameWithoutTrimValidate.length < 3) {
      message = 'Campo nome de usuário é inválido';
    } else if (!email) {
      message = 'Preencha o campo e-mail';
    } else if (isInvalidEmail(email)) {
      message = 'Campo e-mail é inválido';
    } else if (!password) {
      message = 'Preencha o campo senha';
    } else if (isInvalidPassword(password)) {
      message = 'Campo senha deve conter números e letras.';
    } else if (password.length < 4 || password.length > 8) {
      message = 'Campo senha deve conter de 4 à 8 caracteres';
    }

    return { isInvalid: !!message, message };
  }

  async function sendSignUp() {
    setIsLoading(true);

    const responseValidateSignUp = await validateSignUp();
    console.log('sendSignUp | responseValidateSignUp: ', responseValidateSignUp);

    if (responseValidateSignUp.isInvalid) {
      setErrorMessage(responseValidateSignUp.message);
      setIsLoading(false);
    } else {
      try {
        const resultSignUp = await SignUpFetch(
          username,
          email,
          password,
        );
        console.log('sendSignUp | resultSignUp: ', resultSignUp);

        setIsLoading(false);
        if (!resultSignUp.isSuccess) {
          setErrorMessage(resultSignUp.message);
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.log('sendSignUp | error: ', error);
        setErrorMessage('Ocorreu um erro ao registrar sua conta. ;-;');
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="container">
      <Load isShow={isLoading} />
      <div className="form">
        <HeaderForm title="Bttr" />
        <DescriptionForm description="Cadastre-se para evoluir suas habilidades." />
        {errorMessage && <p className="form__message form__message--error">{errorMessage}</p>}
        <InputOutlineForm
          inputPlaceholder="Digite seu nome de usuário"
          inputValue={username}
          onChangeInput={(textValue) => setUsername(textValue)}
        />
        <InputOutlineForm
          inputType="email"
          inputPlaceholder="Digite seu e-mail"
          inputValue={email}
          onChangeInput={(textValue) => setEmail(textValue)}
        />
        <InputOutlineForm
          inputType="password"
          inputPlaceholder="Digite sua senha"
          inputValue={password}
          onChangeInput={(textValue) => setPassword(textValue)}
        />
        <ButtonContained
          text="Cadastre-se"
          onAction={() => sendSignUp()}
        />
      </div>

      <LinkRedirect
        description="Tem uma conta? "
        descriptionUrl="Conecte-se"
        onRedirect={() => navigate('/', { replace: true })}
      />
    </div>
  );
}
