import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  const navigate = useNavigate();

  async function getSkillById(skillIdToRead) {
    setIsLoading(true);

    try {
      const resultSkill = await SkillByIdFetch(token, skillIdToRead);
      console.log('getSkillById | resultSkill: ', resultSkill);

      setIsLoading(false);
      if (!resultSkill.isSuccess) {
        setErrorMessage(resultSkill.message);
      } else {
        setName(resultSkill.skill.name);
        setTimeDaily(resultSkill.skill.time_daily);
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
  }, [skillId, navigate, token]);

  async function sendSkillCreate() {
    setIsLoading(true);

    try {
      const resultSkillCreate = await SkillCreateFetch(
        token,
        name,
        timeDaily,
      );
      console.log('sendSkillCreate | resultSkillCreate: ', resultSkillCreate);

      setIsLoading(false);
      setErrorMessage(resultSkillCreate.message);
    } catch (error) {
      console.log('sendSkillCreate | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  async function sendSkillUpdate(skillIdToUpdate) {
    setIsLoading(true);

    try {
      const resultSkillUpdate = await SkillUpdateByIdFetch(
        token,
        skillIdToUpdate,
        name,
        timeDaily,
      );
      console.log('sendSkillUpdate | resultSkillUpdate: ', resultSkillUpdate);

      setIsLoading(false);
      setErrorMessage(resultSkillUpdate.message);
    } catch (error) {
      console.log('sendSkillUpdate | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  async function sendSkillDelete(skillIdToDelete) {
    setIsLoading(true);

    try {
      const resultSkillDelete = await SkillDeleteByIdFetch(token, skillIdToDelete);
      console.log('sendSkillDelete | resultSkillDelete: ', resultSkillDelete);

      setIsLoading(false);
      setErrorMessage(resultSkillDelete.message);
    } catch (error) {
      console.log('sendSkillDelete | error: ', error);
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
          onRedirect={() => navigate('/home', { replace: true })}
        />
      </div>
    </>
  );
}
