import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getToken, logout } from '../../services/auth';
import isInvalidEmail from '../../utils/rules/isInvalidEmail';

import NavBar from '../../components/NavBar';
import Load from '../../components/Load';
import HeaderForm from '../../components/HeaderForm';
import DescriptionForm from '../../components/DescriptionForm';
import InputOutlineForm from '../../components/InputOutlineForm';
import ButtonContained from '../../components/ButtonContained';
import ButtonOutlined from '../../components/ButtonOutlined';
import ButtonTransparent from '../../components/ButtonTransparent';
import LinkRedirect from '../../components/LinkRedirect';

import './styles.css';

import {
  ProfileFetch,
  ProfileUpdateFetch,
  ProfileDeleteFetch,
} from '../../api/services/UserAPI';

export default function ProfileForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();
  const token = getToken();

  async function getProfile() {
    setIsLoading(true);

    try {
      const resultProfile = await ProfileFetch(
        token,
      );
      console.log('getProfile | resultProfile: ', resultProfile);

      setIsLoading(false);
      if (!resultProfile.isSuccess) {
        setErrorMessage(resultProfile.message);
      } else {
        setUsername(resultProfile.user.username);
        setEmail(resultProfile.user.email);
      }
    } catch (error) {
      console.log('getProfile | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, [history, token]);

  function validateProfileUpdate() {
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
    }

    return { isInvalid: !!message, message };
  }

  async function sendProfileUpdate() {
    setIsLoading(true);

    const responseValidateProfileUpdate = await validateProfileUpdate();
    console.log('sendProfileUpdate | responseValidateProfileUpdate: ', responseValidateProfileUpdate);

    if (responseValidateProfileUpdate.isInvalid) {
      setErrorMessage(responseValidateProfileUpdate.message);
      setIsLoading(false);
    } else {
      try {
        const resultProfileUpdate = await ProfileUpdateFetch(
          token,
          username,
          email,
        );
        console.log('sendProfileUpdate | resultProfileUpdate: ', resultProfileUpdate);

        setIsLoading(false);
        setErrorMessage(resultProfileUpdate.message);
      } catch (error) {
        console.log('sendProfileUpdate | error: ', error);
        setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
        setIsLoading(false);
      }
    }
  }

  async function sendProfileDelete() {
    setIsLoading(true);

    try {
      const resultProfileDelete = await ProfileDeleteFetch(token);
      console.log('sendProfileDelete | resultProfileDelete: ', resultProfileDelete);

      setIsLoading(false);
      if (!resultProfileDelete.isSuccess) {
        setErrorMessage(resultProfileDelete.message);
      } else {
        logout();
        history.push('/');
      }
    } catch (error) {
      console.log('sendProfileDelete | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  async function exit() {
    try {
      logout();
      history.push('/');
    } catch (error) {
      console.log('exit | error', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
    }
  }

  return (
    <>
      <NavBar navigation={history} />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <HeaderForm title="Perfil" />
          <DescriptionForm description="Edite suas informações." />
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
          <ButtonContained
            text="Salvar"
            onAction={() => sendProfileUpdate()}
          />
          <ButtonOutlined
            text="Apagar"
            onAction={() => sendProfileDelete()}
          />
          <ButtonTransparent
            text="Sair"
            onAction={() => exit()}
          />
        </div>
        <LinkRedirect
          description=""
          descriptionUrl="Redefinir a senha"
          onRedirect={() => history.push('/redefine-password')}
        />
      </div>
    </>
  );
}
