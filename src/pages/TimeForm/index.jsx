import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getToken } from '../../services/auth';

import NavBar from '../../components/NavBar';
import Load from '../../components/Load';
import HeaderForm from '../../components/HeaderForm';
import DescriptionForm from '../../components/DescriptionForm';
import SelectOutline from '../../components/SelectOutlineForm';
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
import { SkillsFromUserFetch } from '../../api/services/SkillAPI';

export default function TimeForm() {
  const { timeId } = useParams();

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillSelected, setSkillSelected] = useState(null);
  const [minutes, setMinutes] = useState(1);

  const token = getToken();
  const navigate = useNavigate();

  async function getTimeById(timeIdToRead) {
    setIsLoading(true);

    try {
      const resultTime = await TimeByIdFetch(token, timeIdToRead);
      console.log('getTimeById | resultTime: ', resultTime);

      setIsLoading(false);
      if (!resultTime.isSuccess) {
        setErrorMessage(resultTime.message);
      } else {
        setMinutes(resultTime.time.minutes);
        setSkillSelected(resultTime.time.skill.id);
      }
    } catch (error) {
      console.log('getTimeById | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  async function getSkillsFromUser() {
    setIsLoading(true);

    try {
      const resultSkills = await SkillsFromUserFetch(token);
      console.log('getSkillsFromUser | resultSkills: ', resultSkills);

      setIsLoading(false);
      if (!resultSkills.isSuccess) {
        setErrorMessage(resultSkills.message);
      } else {
        const skillsToOptions = (resultSkills.skills).map((skillPhase) => ({
          id: skillPhase.id,
          value: skillPhase.name,
        }));
        setSkills(skillsToOptions);
      }
    } catch (error) {
      console.log('getSkillsFromUser | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (timeId) {
      getTimeById(timeId);
    }
    getSkillsFromUser();
  }, [timeId, navigate, token]);

  async function sendTimeCreate() {
    setIsLoading(true);

    try {
      const resultTimeCreate = await TimeCreateFetch(
        token,
        skillSelected,
        parseInt(minutes, 10),
      );
      console.log('sendTimeCreate | resultTimeCreate: ', resultTimeCreate);

      setIsLoading(false);
      setErrorMessage(resultTimeCreate.message);
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
        skillSelected,
        parseInt(minutes, 10),
      );
      console.log('sendTimeUpdate | resultTimeUpdate: ', resultTimeUpdate);

      setIsLoading(false);
      setErrorMessage(resultTimeUpdate.message);
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
      setErrorMessage(resultTimeDelete.message);
    } catch (error) {
      console.log('sendTimeDelete | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  return (
    <>
      <NavBar navigation={navigate} />
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
          <SelectOutline
            options={skills}
            selectValue={skillSelected}
            onChangeSelect={(optionSelected) => setSkillSelected(optionSelected)}
          />
          <InputOutlineForm
            inputType="number"
            inputPlaceholder="Digite os minutos"
            inputValue={minutes}
            onChangeInput={(textValue) => setMinutes(textValue)}
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
          descriptionUrl="Voltar ao histórico"
          onRedirect={() => navigate('/times', { replace: true })}
        />
      </div>
    </>
  );
}
