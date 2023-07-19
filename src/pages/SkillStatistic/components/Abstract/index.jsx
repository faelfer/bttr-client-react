import React, { useState, useEffect } from 'react';

import { minToTimeFormat } from '../../../../utils/timeFormat';
import workingDays from '../../../../utils/workingDays';
import calculeProgressColorBiggerThen from '../../../../utils/calculeProgressColorBiggerThen';

import './styles.css';

export default function Time({ abiliity, currentDate, timeTotal }) {
  const [messageProgress, setMessageProgress] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [percentageColor, setPercentageColor] = useState('');
  const [timeGoalMonth, setTimeGoalMonth] = useState('');
  const [timeLack, setTimeLack] = useState('');
  const [timeSuggestion, setTimeSuggestion] = useState('');

  useEffect(() => {
    console.log('useEffect | abiliity, timeTotal, currentDate:', abiliity, timeTotal, currentDate);
    function datesMonth() {
      console.log(`Data Atual: ${currentDate}`);
      const currentYear = currentDate.getFullYear();
      // console.log(`Ano Atual: ${currentYear}`);
      const currentMouth = currentDate.getMonth();
      console.log(`Mês Atual: ${currentMouth}`);
      const currentDay = currentDate.getDate();
      // console.log(`Hoje: ${currentDay}`);
      const manipulatedDate = new Date(currentYear, (currentMouth + 1), 0);
      console.log(`Data Manipulada: ${manipulatedDate}`);
      const lastDayMonth = manipulatedDate.getDate();
      // console.log(`Último Dia do Mês ${lastDayMonth}`);

      return {
        currentYear,
        currentMouth,
        currentDay,
        lastDayMonth,
      };
    }

    async function calculateProgress(goalPerDay, goalDone) {
      const {
        currentYear,
        currentMouth,
        currentDay,
        lastDayMonth,
      } = await datesMonth();

      const businessDays = workingDays(lastDayMonth, currentYear, currentMouth);
      console.log('calculateProgress | businessDays: ', businessDays);
      const goalMonth = (businessDays * goalPerDay);
      console.log('calculateProgress | goalMonth:', goalMonth, minToTimeFormat(goalMonth));
      const goalRemaining = (goalMonth - goalDone);
      console.log('calculateProgress | goalRemaining:', goalRemaining);
      const businessDaysSoFar = workingDays(currentDay, currentYear, currentMouth);
      console.log('calculateProgress | businessDaysSoFar:', businessDaysSoFar);
      const daysRemaining = (businessDays - businessDaysSoFar) + 1;
      console.log('calculateProgress | daysRemaining:', daysRemaining);
      const idealSituation = (businessDaysSoFar * goalPerDay);
      console.log('calculateProgress | idealSituation:', idealSituation);
      const currentPercentage = ((goalDone * 100) / goalMonth);
      console.log('calculateProgress | currentPercentage:', currentPercentage);

      return {
        goalMonth,
        idealSituation,
        currentPercentage,
        goalRemaining,
        daysRemaining,
      };
    }

    async function fillSkillProgress() {
      const {
        goalMonth,
        idealSituation,
        currentPercentage,
        goalRemaining,
        daysRemaining,
      } = await calculateProgress(abiliity.time_daily, timeTotal);
      console.log(
        'fillSkillProgress: ',
        goalMonth,
        idealSituation,
        currentPercentage,
        goalRemaining,
        daysRemaining,
      );
      const percentageInt = parseInt(currentPercentage, 10);
      const colorFromProgressPercentage = calculeProgressColorBiggerThen(percentageInt);
      let messageToProgress = '';
      let timeToLack = 0;
      let timeToSuggestion = 0;

      if (timeTotal >= goalMonth) {
        console.log('fillSkillProgress | if: Parabéns, você concluiu a meta estabelecida!');
        messageToProgress = 'O acumulado do mês foi concluído!';
      } else if (timeTotal === idealSituation) {
        console.log('fillSkillProgress | else if: Você está de acordo com a meta estabelecida.');
        messageToProgress = 'O acumulado do dia foi concluido!';
      } else if (timeTotal > idealSituation) {
        console.log('fillSkillProgress | else if: Você ultrapassou a meta estabelecida.');
        messageToProgress = 'O acumulado do dia foi ultrapassado!';
        timeToLack = timeTotal - idealSituation;
        timeToSuggestion = goalRemaining;
      } else {
        console.warn('fillSkillProgress | else: Você está abaixo da meta estabelecida.');
        timeToLack = idealSituation - timeTotal;
        timeToSuggestion = goalRemaining / (daysRemaining === 0 ? 1 : daysRemaining);
      }

      setMessageProgress(messageToProgress);
      setTimeLack(timeToLack);
      setTimeSuggestion(timeToSuggestion);
      setTimeGoalMonth(goalMonth);
      setPercentage(percentageInt);
      setPercentageColor(colorFromProgressPercentage);
    }

    fillSkillProgress();
  }, [abiliity, timeTotal, currentDate]);

  return (
    <div className="abstract">
      <p className="text__abstract">
        {(abiliity.name).toUpperCase()}
      </p>
      <p className="text__abstract">
        {`${minToTimeFormat(abiliity.time_daily)} é a meta diária`}
      </p>
      <p className="text__abstract">
        {`${minToTimeFormat(timeGoalMonth)} é a meta do mês`}
      </p>
      {timeTotal > 0 ? (
        <p className="text__abstract">
          {`${minToTimeFormat(timeTotal)} é o acumulado`}
        </p>
      ) : null}
      <div className="abstract__progress">
        <div
          className="abstract__percentege"
          style={{
            width: (percentage > 100 ? '100%' : `${percentage}%`),
            backgroundColor: percentageColor,
          }}
        >
          {`${percentage}%`}
        </div>
      </div>
      {messageProgress ? (
        <p className="text__abstract">
          {messageProgress}
        </p>
      ) : null }
      {timeLack > 0 ? (
        <p className="text__abstract">
          {`${minToTimeFormat(timeLack)} para o acumulado do dia`}
        </p>
      ) : null }
      {timeSuggestion > 0 && timeSuggestion !== timeLack
        ? (
          <p className="text__abstract">
            {`${minToTimeFormat(timeSuggestion)} é a sugestão do dia`}
          </p>
        )
        : null}
    </div>
  );
}
