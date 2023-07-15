import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getToken } from '../../services/auth';

import NavBar from '../../components/NavBar';
import Load from '../../components/Load';
import HeaderForm from '../../components/HeaderForm';
import DescriptionForm from '../../components/DescriptionForm';
import InputOutlineForm from '../../components/InputOutlineForm';
import ButtonContained from '../../components/ButtonContained';
import ButtonOutlined from '../../components/ButtonOutlined';
import LinkRedirect from '../../components/LinkRedirect';

import './styles.css';

import {
  TimeByIdFetch,
  TimeCreateFetch,
  TimeDeleteByIdFetch,
  TimeUpdateByIdFetch,
} from '../../api/services/TimeAPI';

export default function TimeForm() {
  const { timeId } = useParams();

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [timeDaily, setTimeDaily] = useState(1);

  const token = getToken();
  const history = useHistory();

  async function getTimeById(timeIdToRead) {
    setIsLoading(true);

    try {
      const resultTime = await TimeByIdFetch(token, timeIdToRead);
      console.log('getTimeById | resultTime: ', resultTime);

      setIsLoading(false);
      if (!resultTime.isSuccess) {
        setErrorMessage(resultTime.message);
      } else {
        setName(resultTime.skill.name);
        setTimeDaily(resultTime.skill.timeDaily);
      }
    } catch (error) {
      console.log('getTimeById | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (timeId) {
      getTimeById(timeId);
    }
  }, [timeId, history, token]);

  async function sendTimeCreate() {
    setIsLoading(true);

    try {
      const resultTimeCreate = await TimeCreateFetch(
        token,
        name,
        timeDaily,
      );
      console.log('sendTimeCreate | resultTimeCreate: ', resultTimeCreate);

      setIsLoading(false);
      if (!resultTimeCreate.isSuccess) {
        setErrorMessage(resultTimeCreate.message);
      }
    } catch (error) {
      console.log('sendTimeCreate | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  async function sendTimeUpdate(timeIdToUpdate) {
    setIsLoading(true);

    try {
      const resultTimeUpdate = await TimeUpdateByIdFetch(
        token,
        timeIdToUpdate,
        name,
        timeDaily,
      );
      console.log('sendTimeUpdate | resultTimeUpdate: ', resultTimeUpdate);

      setIsLoading(false);
      if (!resultTimeUpdate.isSuccess) {
        setErrorMessage(resultTimeUpdate.message);
      }
    } catch (error) {
      console.log('sendTimeUpdate | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  async function sendTimeDelete(timeIdToDelete) {
    setIsLoading(true);

    try {
      const resultTimeDelete = await TimeDeleteByIdFetch(token, timeIdToDelete);
      console.log('sendTimeDelete | resultTimeDelete: ', resultTimeDelete);

      setIsLoading(false);
      if (!resultTimeDelete.isSuccess) {
        setErrorMessage(resultTimeDelete.message);
      }
    } catch (error) {
      console.log('sendTimeDelete | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  return (
    <>
      <NavBar navigation={history} />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <HeaderForm title="Tempo" />
          <DescriptionForm
            description={
              timeId
                ? 'Edite suas informações.'
                : 'Crie um novo registro de tempo para demonstrar o quanto você se dedicou.'
            }
          />
          {errorMessage && <p className="form__message form__message--error">{errorMessage}</p>}
          <InputOutlineForm
            inputPlaceholder="Digite nome da habilidade"
            inputValue={name}
            onChangeInput={(textValue) => setName(textValue)}
          />
          <InputOutlineForm
            inputType="number"
            inputPlaceholder="Digite o tempo diário"
            inputValue={timeDaily}
            onChangeInput={(textValue) => setTimeDaily(textValue)}
          />
          <ButtonContained
            text={timeId ? 'Editar' : 'Criar'}
            onAction={() => (timeId
              ? sendTimeUpdate(timeId)
              : sendTimeCreate())}
          />
          {timeId ? (
            <ButtonOutlined
              text="Apagar"
              onAction={() => sendTimeDelete(timeId)}
            />
          ) : null }
        </div>
        <LinkRedirect
          description=""
          descriptionUrl="Voltar ao início"
          onRedirect={() => history.push('/home')}
        />
      </div>
    </>
  );
}
