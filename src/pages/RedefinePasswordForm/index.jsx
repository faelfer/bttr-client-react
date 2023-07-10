import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getToken } from '../../services/auth';
import isInvalidPassword from '../../utils/rules/isInvalidPassword';

import NavBar from '../../components/NavBar';
import Load from '../../components/Load';
import HeaderForm from '../../components/HeaderForm';
import InputOutlineForm from '../../components/InputOutlineForm';
import LinkRedirect from '../../components/LinkRedirect';
import ButtonContained from '../../components/ButtonContained';

import './styles.css';

import { RedefinePasswordFetch } from '../../api/services/UserAPI';

export default function RedefinePasswordForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordNewConfirm, setPasswordNewConfirm] = useState('');

  const history = useHistory();
  const token = getToken();

  function validateRedefinePassword() {
    console.log(
      'RedefinePasswordFetch | password, passwordNew, passwordNewConfirm: ',
      password,
      passwordNew,
      passwordNewConfirm,
    );
    let message = '';

    if (!password) {
      message = 'Preencha o campo senha atual';
    } else if (password.length < 4) {
      message = 'Campo senha atual é inválido';
    } else if (!passwordNew) {
      message = 'Preencha o campo nova senha';
    } else if (isInvalidPassword(passwordNew)) {
      message = 'Campo nova senha deve conter números e letras';
    } else if (passwordNew.length < 4 && passwordNew.length > 8) {
      message = 'Campo nova senha deve conter de 4 à 8 caracteres';
    } else if (!passwordNewConfirm) {
      message = 'Preencha o campo confirmar nova senha';
    } else if (passwordNewConfirm.length < 4) {
      message = 'Campo confirmar nova senha é inválido';
    } else if (password === passwordNew) {
      message = 'Campos senha atual e nova senha devem ser diferentes';
    } else if (passwordNew !== passwordNewConfirm) {
      message = 'Os campos nova senha e confirmar nova senha devem ser iguais';
    }

    return { isInvalid: !!message, message };
  }

  async function sendRedefinePassword() {
    setIsLoading(true);

    const responseValidateRedefinePassword = await validateRedefinePassword();
    console.log('sendRedefinePassword | responseValidateRedefinePassword: ', responseValidateRedefinePassword);

    if (responseValidateRedefinePassword.isInvalid) {
      setErrorMessage(responseValidateRedefinePassword.message);
      setIsLoading(false);
    } else {
      try {
        const resultValidateRedefinePassword = await RedefinePasswordFetch(
          token,
          password,
          passwordNew,
        );
        console.log('sendRedefinePassword | resultValidateRedefinePassword: ', resultValidateRedefinePassword);

        setIsLoading(false);
        setErrorMessage(resultValidateRedefinePassword.message);
      } catch (error) {
        console.log('sendRedefinePassword | error: ', error);
        setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <NavBar navigation={history} />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <HeaderForm title="Redefinir senha" />
          {errorMessage && <p className="form__message form__message--error">{errorMessage}</p>}
          <InputOutlineForm
            inputType="password"
            inputPlaceholder="Digite sua senha atual"
            onChangeInput={(textValue) => setPassword(textValue)}
          />
          <InputOutlineForm
            inputType="password"
            inputPlaceholder="Digite sua nova senha"
            onChangeInput={(textValue) => setPasswordNew(textValue)}
          />
          <InputOutlineForm
            inputType="password"
            inputPlaceholder="Digite sua confirmação de nova senha"
            onChangeInput={(textValue) => setPasswordNewConfirm(textValue)}
          />
          <ButtonContained
            text="Salvar"
            onAction={() => sendRedefinePassword()}
          />
        </div>
        <LinkRedirect
          description=""
          descriptionUrl="Voltar ao perfil"
          onRedirect={() => history.push('/profile')}
        />
      </div>
    </>
  );
}
