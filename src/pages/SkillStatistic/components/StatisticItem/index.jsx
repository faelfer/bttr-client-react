import React, { useState, useEffect } from 'react';

import { minToTimeFormat } from '../../../../utils/timeFormat';
import workingDays from '../../../../utils/workingDays';
import datesFromCurrentDay from '../../../../utils/customs/datesFromCurrentDay';
import progressFromCurrentDay from '../../../../utils/customs/progressFromCurrentDay';
import colorFromPercentage from '../../../../utils/customs/colorFromPercentage';

import './styles.css';

export default function StatisticItem({
  skillProps,
  currentDate,
  timeTotal,
}) {
  const [messageProgress, setMessageProgress] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [percentageColor, setPercentageColor] = useState('');
  const [timeGoalMonth, setTimeGoalMonth] = useState('');
  const [timeLack, setTimeLack] = useState('');
  const [timeSuggestion, setTimeSuggestion] = useState('');

  useEffect(() => {
    console.log('useEffect | skillProps, timeTotal, currentDate:', skillProps, timeTotal, currentDate);
    async function fillSkillProgress() {
      const resultDatesFromCurrentDay = datesFromCurrentDay(currentDate);
      const businessDays = workingDays(
        resultDatesFromCurrentDay.lastDayMonth,
        resultDatesFromCurrentDay.currentYear,
        resultDatesFromCurrentDay.currentMouth,
      );
      console.log('calculateProgress | businessDays: ', businessDays);
      const businessDaysSoFar = workingDays(
        resultDatesFromCurrentDay.currentDay,
        resultDatesFromCurrentDay.currentYear,
        resultDatesFromCurrentDay.currentMouth,
      );
      console.log('calculateProgress | businessDays: ', businessDays);
      const resultprogressFromCurrentDay = progressFromCurrentDay(
        skillProps.time_daily,
        timeTotal,
        businessDays,
        businessDaysSoFar,
      );

      const colorFromProgressPercentage = colorFromPercentage(
        resultprogressFromCurrentDay.currentPercentage,
      );
      let messageToProgress = '';
      let timeToLack = 0;
      let timeToSuggestion = 0;

      if (timeTotal >= resultprogressFromCurrentDay.goalMonth) {
        console.log('fillSkillProgress | if: Parabéns, você concluiu a meta estabelecida!');
        messageToProgress = 'O acumulado do mês foi concluído!';
      } else if (timeTotal === resultprogressFromCurrentDay.idealSituation) {
        console.log('fillSkillProgress | else if: Você está de acordo com a meta estabelecida.');
        messageToProgress = 'O acumulado do dia foi concluido!';
      } else if (timeTotal > resultprogressFromCurrentDay.idealSituation) {
        console.log('fillSkillProgress | else if: Você ultrapassou a meta estabelecida.');
        messageToProgress = 'O acumulado do dia foi ultrapassado!';
        timeToLack = timeTotal - resultprogressFromCurrentDay.idealSituation;
        timeToSuggestion = resultprogressFromCurrentDay.goalRemaining;
      } else {
        console.warn('fillSkillProgress | else: Você está abaixo da meta estabelecida.');
        timeToLack = resultprogressFromCurrentDay.idealSituation - timeTotal;
        timeToSuggestion = resultprogressFromCurrentDay.goalRemaining / (
          resultprogressFromCurrentDay.daysRemaining === 0
            ? 1 : resultprogressFromCurrentDay.daysRemaining);
      }

      setMessageProgress(messageToProgress);
      setTimeLack(timeToLack);
      setTimeSuggestion(timeToSuggestion);
      setTimeGoalMonth(resultprogressFromCurrentDay.goalMonth);
      setPercentage(resultprogressFromCurrentDay.currentPercentage);
      setPercentageColor(colorFromProgressPercentage);
    }

    fillSkillProgress();
  }, [skillProps, timeTotal, currentDate]);

  return (
    <div className="abstract">
      <p className="text__abstract">
        {(skillProps.name).toUpperCase()}
      </p>
      <p className="text__abstract">
        {`${minToTimeFormat(skillProps.time_daily)} é a meta diária`}
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
      {timeSuggestion > 0 && timeLack > timeSuggestion
        ? (
          <p className="text__abstract">
            {`${minToTimeFormat(timeSuggestion)} é a sugestão do dia`}
          </p>
        )
        : null}
    </div>
  );
}
