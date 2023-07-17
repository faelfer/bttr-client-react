import React, { useState, useEffect } from 'react';

import { minToTimeFormat } from '../../../../utils/timeFormat';
import workingDays from '../../../../utils/workingDays';
import calculeProgressColorBiggerThen from '../../../../utils/calculeProgressColorBiggerThen';

import './styles.css';

export default function Time({ abiliity, currentDate, timeTotal }) {
  const [percentage, setPercentage] = useState(0);
  const [percentageColor, setPercentageColor] = useState('');
  const [lackText, setLackText] = useState('');
  const [suggestionText, setSuggestionText] = useState('');

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
        currentYear, currentMouth, currentDay, lastDayMonth,
      };
    }

    async function calculateProgress(goalPerDay, goalDone) {
      const {
        currentYear, currentMouth, currentDay, lastDayMonth,
      } = await datesMonth();

      const businessDays = workingDays(lastDayMonth, currentYear, currentMouth);
      console.log('businessDays: ', businessDays);
      const goalMonth = (businessDays * goalPerDay);
      console.log(`Meta de Minutos: ${goalMonth} | ${minToTimeFormat(goalMonth)}`);
      const goalRemaining = (goalMonth - goalDone);
      const businessDaysSoFar = workingDays(currentDay, currentYear, currentMouth);
      console.log('BusinessDaysSoFar: ', businessDaysSoFar);
      const daysRemaining = (businessDays - businessDaysSoFar) + 1;
      console.log(`Dias Restantes: ${daysRemaining}`);
      const idealSituation = (businessDaysSoFar * goalPerDay);
      // console.log(`Situação Ideal: ${idealSituation}`);
      const currentPercentage = ((goalDone * 100) / goalMonth);
      console.log(`Ideal percentage so far: ${parseInt((businessDaysSoFar * 100) / businessDays, 10)}%`);

      return {
        goalMonth, idealSituation, currentPercentage, goalRemaining, daysRemaining,
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

      setPercentage(percentageInt);
      setPercentageColor(colorFromProgressPercentage);

      if (timeTotal >= goalMonth) {
        console.log('fillSkillProgress | if: Parabéns, você concluiu a meta estabelecida!');
        setLackText('Parabéns, objetivo concluido!');
        console.log('================================================================');
      } else if (timeTotal === idealSituation) {
        console.log('fillSkillProgress | else if: Você está de acordo com a meta estabelecida.');
        setLackText('Progresso ideal alcançado');
        setSuggestionText((`${(minToTimeFormat(goalRemaining)).toString()} para atingir o objetivo`));
        console.log('================================================================');
      } else if (timeTotal > idealSituation) {
        console.log('fillSkillProgress | else if: Você ultrapassou a meta estabelecida.');
        setLackText((`${(minToTimeFormat(timeTotal - idealSituation)).toString()} acima do ideal`));
        setSuggestionText((`${(minToTimeFormat(goalRemaining)).toString()} para atingir o objetivo`));
        console.log('================================================================');
      } else {
        console.warn('fillSkillProgress | else: Você está abaixo da meta estabelecida.');
        setLackText((`${(minToTimeFormat(idealSituation - timeTotal)).toString()} para o progresso ideal`));
        setSuggestionText((`${(minToTimeFormat(goalRemaining / (daysRemaining === 0 ? 1 : daysRemaining))).toString()} é sugerido para hoje`));
        console.log('================================================================');
      }
    }

    fillSkillProgress();
  }, [abiliity, timeTotal, currentDate]);

  return (
    <div className="abstract">
      <p className="text__abiliity">
        {abiliity.name}
      </p>
      <p className="text__abiliity">
        {`${minToTimeFormat(abiliity.time_daily)} é a meta diária`}
      </p>
      <div className="abstract__progress">
        <div style={{
          width: (percentage > 100 ? '100%' : `${percentage}%`),
          height: 30,
          borderRadius: 5,
          backgroundColor: percentageColor,
          textAlign: 'center',
          lineHeight: 1.9,
          fontWeight: 'bold',
          color: '#ffffff',
        }}
        >
          {`${percentage}%`}
        </div>
      </div>
      <p className="text__abiliity">
        {lackText}
      </p>
      {suggestionText
        ? (
          <p className="text__abiliity">
            {suggestionText}
          </p>
        )
        : null}
    </div>
  );
}
