import React, { useState, useEffect } from "react";

import clockHourMinute from "../../../../utils/customs/clockHourMinute";
import workingDays from "../../../../utils/customs/workingDays";
import datesFromCurrentDay from "../../../../utils/customs/datesFromCurrentDay";
import progressFromCurrentDay from "../../../../utils/customs/progressFromCurrentDay";
import colorFromPercentage from "../../../../utils/customs/colorFromPercentage";

import "./styles.css";

interface ISkill {
  id: number;
  name: string;
  daily: number;
}

interface StatisticItemProp {
  skillProps: ISkill;
  currentDate: Date;
  timeTotal: number;
}

const StatisticItem = ({
  skillProps,
  currentDate,
  timeTotal,
}: StatisticItemProp): JSX.Element => {
  const [messageProgress, setMessageProgress] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [percentageColor, setPercentageColor] = useState("");
  const [timeGoalMonth, setTimeGoalMonth] = useState(0);
  const [timeLack, setTimeLack] = useState(0);
  const [timeSuggestion, setTimeSuggestion] = useState(0);

  useEffect(() => {
    const fillSkillProgress = (): void => {
      const resultDatesFromCurrentDay = datesFromCurrentDay(currentDate);
      const businessDays = workingDays(
        resultDatesFromCurrentDay.lastDayMonth,
        resultDatesFromCurrentDay.currentYear,
        resultDatesFromCurrentDay.currentMouth,
      );
      const businessDaysSoFar = workingDays(
        resultDatesFromCurrentDay.currentDay,
        resultDatesFromCurrentDay.currentYear,
        resultDatesFromCurrentDay.currentMouth,
      );
      const resultprogressFromCurrentDay = progressFromCurrentDay(
        skillProps.daily,
        timeTotal,
        businessDays,
        businessDaysSoFar,
      );

      const colorFromProgressPercentage = colorFromPercentage(
        resultprogressFromCurrentDay.currentPercentage,
      );
      let messageToProgress = "";
      let timeToLack = 0;
      let timeToSuggestion = 0;

      if (timeTotal >= resultprogressFromCurrentDay.goalMonth) {
        messageToProgress = "O acumulado do mês foi concluído!";
      } else if (timeTotal === resultprogressFromCurrentDay.idealSituation) {
        messageToProgress = "O acumulado do dia foi concluido!";
      } else if (timeTotal > resultprogressFromCurrentDay.idealSituation) {
        messageToProgress = "O acumulado do dia foi ultrapassado!";
      } else {
        timeToLack = resultprogressFromCurrentDay.idealSituation - timeTotal;
        timeToSuggestion =
          resultprogressFromCurrentDay.goalRemaining /
          (resultprogressFromCurrentDay.daysRemaining === 0
            ? 1
            : resultprogressFromCurrentDay.daysRemaining);
      }

      setMessageProgress(messageToProgress);
      setTimeLack(timeToLack);
      setTimeSuggestion(timeToSuggestion);
      setTimeGoalMonth(resultprogressFromCurrentDay.goalMonth);
      setPercentage(resultprogressFromCurrentDay.currentPercentage);
      setPercentageColor(colorFromProgressPercentage);
    };

    fillSkillProgress();
  }, [skillProps, timeTotal, currentDate]);

  return (
    <>
      <div className="container--statistic-percentege">
        <div
          className="text--statistic-percentege"
          style={{
            width: percentage > 100 ? "100%" : `${percentage}%`,
            backgroundColor: percentageColor,
          }}
        >
          {`${percentage}%`}
        </div>
      </div>
      <div className="container--statistic">
        <p className="text--statistic-headline">
          {skillProps.name.toUpperCase()}
        </p>
        <p className="text--statistic-subhead">
          {`meta diária: ${clockHourMinute(skillProps.daily)}`}
        </p>
        <p className="text--statistic-subhead">
          {`meta mês: ${clockHourMinute(timeGoalMonth)}`}
        </p>
      </div>
      <div className="container--statistic">
        {timeTotal > 0 ? (
          <p className="text--statistic-supporting">
            {`${clockHourMinute(timeTotal)} é o acumulado`}
          </p>
        ) : null}
        {messageProgress !== "" ? (
          <p className="text--statistic-supporting">{messageProgress}</p>
        ) : null}
        {timeLack > 0 ? (
          <p className="text--statistic-supporting">
            {`${clockHourMinute(timeLack)} para o acumulado do dia`}
          </p>
        ) : null}
        {timeSuggestion > 0 && timeLack > timeSuggestion ? (
          <p className="text--statistic-supporting">
            {`${clockHourMinute(timeSuggestion)} é a sugestão do dia`}
          </p>
        ) : null}
      </div>
    </>
  );
};

export default StatisticItem;
