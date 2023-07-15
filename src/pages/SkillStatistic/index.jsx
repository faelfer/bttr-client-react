import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getToken } from '../../services/auth';

import NavBar from '../../components/NavBar';
import Load from '../../components/Load';
import Abstract from './components/Abstract';
import ButtonContained from '../../components/ButtonContained';

import './styles.css';

import { SkillByIdFetch } from '../../api/services/SkillAPI';
import { TimesByDateFetch } from '../../api/services/TimeAPI';

export default function SkillStatistic() {
  const { skillId } = useParams();

  const [skill, setSkill] = useState(null);
  const [timeTotal, setTimeTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = getToken();
  const navigate = useNavigate();
  const currentDate = new Date();

  async function getSkillById(skillIdToRead) {
    setIsLoading(true);

    try {
      const resultSkills = await SkillByIdFetch(token, skillIdToRead);
      console.log('getSkillById | resultSkills: ', resultSkills);

      setIsLoading(false);
      if (!resultSkills.isSuccess) {
        setErrorMessage(resultSkills.message);
      } else {
        setSkill(resultSkills.skill);
      }
    } catch (error) {
      console.log('getSkillById | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  async function getTimesByDate(skillIdToFilter, currentDateToFilter) {
    setIsLoading(true);

    try {
      const firstDayToFilter = new Date(
        currentDateToFilter.getFullYear(),
        currentDateToFilter.getMonth(),
        1,
      );
      const lastDayToFilter = new Date(
        currentDateToFilter.getFullYear(),
        currentDateToFilter.getMonth() + 1,
        0,
      );
      const firstDayToFilterDateIso = firstDayToFilter.toISOString();
      const lastDayToFilterDateIso = lastDayToFilter.toISOString();
      console.log(
        'handleGoalAdd | firstDayToFilterDateIso, lastDayToFilterDateIso: ',
        firstDayToFilterDateIso,
        lastDayToFilterDateIso,
      );

      const resultTimeByDate = await TimesByDateFetch(
        token,
        skillIdToFilter,
        firstDayToFilterDateIso,
        lastDayToFilterDateIso,
      );
      console.log('getTimesByDate | resultTimeByDate: ', resultTimeByDate);

      setIsLoading(false);
      if (!resultTimeByDate.isSuccess) {
        setErrorMessage(resultTimeByDate.message);
      } else {
        const initialValue = 0;
        const sumTotalTimes = (resultTimeByDate.times).reduce(
          (accumulator, currentValue) => accumulator + currentValue.time_daily,
          initialValue,
        );
        setTimeTotal(sumTotalTimes);
      }
    } catch (error) {
      console.log('getTimesByDate | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (skillId) {
      getSkillById(skillId);
      getTimesByDate(skillId, currentDate);
    }
  }, [skillId, navigate, token]);

  return (
    <>
      <NavBar navigation={navigate} />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <ButtonContained
            text="Criar tempo"
            onAction={() => navigate('/times/create', { replace: true })}
          />
          {errorMessage && <p className="form__message form__message--error">{errorMessage}</p>}
          {skill !== null ? (
            <Abstract
              abiliity={skill}
              currentDate={currentDate}
              timeTotal={timeTotal}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
