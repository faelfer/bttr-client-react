import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getToken, logout } from '../../services/auth';

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

export default function AbiliityForm() {
  const { abiliityId } = useParams();

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [timeDaily, setTimeDaily] = useState(1);

  const token = getToken();
  const history = useHistory();

  useEffect(() => {
    async function getAbiliity() {
      setIsLoad(true);
      try {
        const response = await api.get(`/abiliity/${abiliityId}`, {
          headers: { Authorization: token },
        });
        console.log('getAbiliity | response: ', response);
        setIsLoad(false);
        if (!response.data.status === 200) {
          setError('Houve um problema ao consultar sua habilidade, tente novamente mais tarde');
        }

        setName(response.data[0].name);
        setTimeDaily(response.data[0].timeDaily);
        setTimeTotal(response.data[0].timeTotal);
      } catch (error) {
        console.log('getAbiliity | error: ', error);
        if (error.message === 'Request failed with status code 401') {
          logout();
          history.push('/');
        }
        setError('Houve um problema ao consultar sua habilidade, tente novamente mais tarde');
        setIsLoad(false);
      }
    }

    if (abiliityId) {
      getAbiliity();
    }
  }, [abiliityId, history, token]);

  async function createAbiliity(event) {
    event.preventDefault();
    setIsLoad(true);
    if (!name) {
      setError('Preencha nome para continuar!');
      setIsLoad(false);
    } else if (!timeDaily) {
      setError('Preencha tempo diário para continuar!');
      setIsLoad(false);
    } else if (!timeTotal) {
      setError('Preencha tempo total continuar!');
      setIsLoad(false);
    } else {
      try {
        const response = await api.post(
          '/abiliity',
          {
            name,
            timeDaily,
            timeTotal,
          },
          { headers: { Authorization: token } },
        );
        console.log('createAbiliity | response', response.data);
        setIsLoad(false);
        if (!response.data.status === 200) {
          setError('Ocorreu um erro ao registrar sua habilidade.');
        }
        history.push('/home');
      } catch (error) {
        console.log('createAbiliity | error', error);
        setError('Houve um problema com o login, verifique suas credenciais.');
        setIsLoad(false);
      }
    }
  }

  async function editAbiliity(event) {
    event.preventDefault();
    setIsLoad(true);
    if (!name) {
      setError('Preencha nome para continuar!');
      setIsLoad(false);
    } else if (!timeDaily) {
      setError('Preencha tempo diário para continuar!');
      setIsLoad(false);
    } else if (!timeTotal) {
      setError('Preencha tempo total continuar!');
      setIsLoad(false);
    } else {
      try {
        const response = await api.put(
          `/abiliity/${abiliityId}`,
          {
            name,
            timeDaily,
            timeTotal,
          },
          { headers: { Authorization: token } },
        );
        console.log('editAbiliity | response', response.data);
        setIsLoad(false);
        if (!response.data.status === 200) {
          setError('Ocorreu um erro ao editar sua habilidade.');
        }
        history.push('/home');
      } catch (error) {
        console.log('editAbiliity | error', error);
        setError('Houve um problema com o login, verifique suas credenciais.');
        setIsLoad(false);
      }
    }
  }

  async function deleteAbiliity(event) {
    event.preventDefault();
    setIsLoad(true);

    try {
      const response = await api.delete(
        `/abiliity/${abiliityId}`,
        { headers: { Authorization: token } },
      );
      console.log('deleteAbiliity | response', response.data);
      setIsLoad(false);
      if (!response.data.status === 200) {
        setError('Ocorreu um erro ao apagar sua habilidade.');
      }
      history.push('/home');
    } catch (error) {
      console.log('deleteAbiliity | error', error);
      setError('Houve um problema com o login, verifique suas credenciais.');
      setIsLoad(false);
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
