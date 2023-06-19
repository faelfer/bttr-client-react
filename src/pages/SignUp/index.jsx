import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import emailIsInvalid from '../../utils/validation/emailIsInvalid';
import passwordIsInvalid from '../../utils/validation/passwordIsInvalid';

import Load from '../../components/Load';
import HeaderForm from '../../components/HeaderForm';
import DescriptionForm from '../../components/DescriptionForm';
import InputOutlineForm from '../../components/InputOutlineForm';

import './styles.css';

import { SignUpFetch } from '../../api/services/UserAPI';

function SignUp({ history }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoad, setIsLoad] = useState(false);

  function validateSignUp() {
    let message = '';
    const nameWithoutTrimValidate = username.trim();

    if (!nameWithoutTrimValidate) {
      message = 'Preencha o campo nome';
    } else if (nameWithoutTrimValidate.length < 3) {
      message = 'Campo nome completo é inválido';
    } else if (emailIsInvalid(email)) {
      message = 'Campo e-mail é inválido';
    } else if (!password) {
      message = 'Preencha o campo senha';
    } else if (passwordIsInvalid(password)) {
      message = 'Campo senha deve conter números e letras.';
    } else if (password.length < 4 || password.length > 8) {
      message = 'Campo senha deve conter de 4 à 8 caracteres';
    }

    return { isInvalid: !!message, message };
  }

  async function handleSignUp(event) {
    event.preventDefault();
    setIsLoad(true);

    const responseValidateSignUp = await validateSignUp();
    console.log('sendSignUp | responseValidateSignUp: ', responseValidateSignUp);

    if (responseValidateSignUp.isInvalid) {
      setErrorMessage(responseValidateSignUp.message);
      setIsLoad(false);
    } else {
      try {
        const resultSignUp = await SignUpFetch(
          username,
          email,
          password,
        );
        console.log('handleSignUp | resultSignUp: ', resultSignUp);

        setIsLoad(false);
        if (!resultSignUp.isSuccess) {
          setErrorMessage(resultSignUp.message);
        } else {
          history.push('/');
        }
      } catch (error) {
        console.log('handleSignUp | error: ', error);
        setErrorMessage('Ocorreu um erro ao registrar sua conta. ;-;');
        setIsLoad(false);
      }
    }
  }

  return (
    <div className="container">
      <Load isShow={isLoad} />
      <form className="form" onSubmit={handleSignUp}>
        <HeaderForm title="Bttr" />
        <DescriptionForm description="Cadastre-se para evoluir suas habilidades." />
        {errorMessage && <p className="form__message form__message--error">{errorMessage}</p>}
        <InputOutlineForm
          inputPlaceholder="Nome de usuário"
          inputValue={username}
          onChangeInput={(textValue) => setUsername(textValue)}
        />
        <InputOutlineForm
          inputType="email"
          inputPlaceholder="Endereço de e-mail"
          inputValue={email}
          onChangeInput={(textValue) => setEmail(textValue)}
        />
        <InputOutlineForm
          inputType="password"
          inputPlaceholder="Senha"
          inputValue={password}
          onChangeInput={(textValue) => setPassword(textValue)}
        />
        <button className="form__button" type="submit">Cadastre-se</button>
      </form>

      <div className="redirect">
        <p className="redirect__text">
          Tem uma conta?
          {' '}
          <Link className="redirect__link" to="/">Conecte-se</Link>
        </p>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
