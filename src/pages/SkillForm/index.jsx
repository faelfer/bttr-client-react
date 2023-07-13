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
  SkillByIdFetch,
  SkillCreateFetch,
  SkillDeleteByIdFetch,
  SkillUpdateByIdFetch,
} from '../../api/services/SkillAPI';

export default function SkillForm() {
  const { skillId } = useParams();

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [timeDaily, setTimeDaily] = useState(1);

  const token = getToken();
  const history = useHistory();

  async function getSkillById(skillId) {
    setIsLoading(true);

    try {
      const resultSkills = await SkillByIdFetch(token, skillId);
      console.log('getSkillById | resultSkills: ', resultSkills);

      setIsLoading(false);
      if (!resultSkills.isSuccess) {
        setErrorMessage(resultSkills.message);
      } else {
        setName(resultSkills.skill.name);
        setTimeDaily(resultSkills.skill.timeDaily);
      }
    } catch (error) {
      console.log('getSkillById | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (skillId) {
      getSkillById(skillId);
    }
  }, [skillId, history, token]);

  async function sendSkillCreate() {
    setIsLoading(true);

    try {
      const resultSkills = await SkillCreateFetch(
        token,
        name,
        timeDaily,
      );
      console.log('sendSkillCreate | resultSkills: ', resultSkills);

      setIsLoading(false);
      if (!resultSkills.isSuccess) {
        setErrorMessage(resultSkills.message);
      }
    } catch (error) {
      console.log('sendSkillCreate | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  async function sendSkillUpdate(skillIdToUpdate) {
    setIsLoading(true);

    try {
      const resultSkills = await SkillUpdateByIdFetch(
        token,
        skillIdToUpdate,
        name,
        timeDaily,
      );
      console.log('sendSkillUpdate | resultSkills: ', resultSkills);

      setIsLoading(false);
      if (!resultSkills.isSuccess) {
        setErrorMessage(resultSkills.message);
      }
    } catch (error) {
      console.log('sendSkillUpdate | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  async function sendSkillDelete(skillIdToDelete) {
    setIsLoading(true);

    try {
      const resultSkills = await SkillDeleteByIdFetch(token, skillIdToDelete);
      console.log('sendSkillDelete | resultSkills: ', resultSkills);

      setIsLoading(false);
      if (!resultSkills.isSuccess) {
        setErrorMessage(resultSkills.message);
      }
    } catch (error) {
      console.log('sendSkillDelete | error: ', error);
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
          <HeaderForm title="Habilidade" />
          <DescriptionForm
            description={
              skillId
                ? 'Edite suas informações.'
                : 'Crie uma nova habilidade para começar a registrar o quanto você se dedicou.'
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
            text={skillId ? 'Editar' : 'Criar'}
            onAction={() => (skillId
              ? sendSkillUpdate(skillId)
              : sendSkillCreate())}
          />
          {skillId ? (
            <ButtonOutlined
              text="Apagar"
              onAction={() => sendSkillDelete(skillId)}
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
