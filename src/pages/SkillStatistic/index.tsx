import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import showToast from "../../utils/showToast";
import datesRangeMonth from "../../utils/customs/datesRangeMonth";

import ContainerUpper from "../../components/ContainerUpper";
import ContainerForm from "../../components/ContainerForm";
import StatisticItem from "./components/StatisticItem";
import ButtonContained from "../../components/ButtonContained";
import LinkRedirect from "../../components/LinkRedirect";

import { useSkillMutation } from "../../services/skill/api";
import { useTimesByDateMutation } from "../../services/time/api";

import { toastErrorDefault } from "../../utils/resources/toast_options_default";

interface ITime {
  id: number;
  minutes: number;
  created: string;
}

const SkillStatistic = (): JSX.Element => {
  const { skillId } = useParams();

  const [skillItem, setSkillItem] = useState(null);
  const [minutesTotalMonth, setMinutesTotalMonth] = useState(0);

  const [skill, { isLoading }] = useSkillMutation();
  const [timesByDate, { isLoading: isGetting }] = useTimesByDateMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const currentDate = new Date();

  const getSkillById = async (): Promise<void> => {
    try {
      const bulkSkill = await skill(skillId).unwrap();
      setSkillItem(bulkSkill.skill);
    } catch {
      showToast(toastErrorDefault);
    }
  };

  const getTimesByDate = async (
    skillIdToFilter: string,
    currentDateToFilter: Date,
  ): Promise<void> => {
    try {
      const { firstDayDatetimeIso, lastDayDatetimeIso } =
        datesRangeMonth(currentDateToFilter);
      const bulkTimesByDate = await timesByDate({
        id: skillIdToFilter,
        firstDay: firstDayDatetimeIso,
        lastDay: lastDayDatetimeIso,
      }).unwrap();
      const totalTimes = bulkTimesByDate.times.reduce(
        (total: number, timeLoop: ITime) => total + timeLoop.minutes,
        0,
      );
      setMinutesTotalMonth(totalTimes);
    } catch {
      showToast(toastErrorDefault);
    }
  };

  useEffect(() => {
    if (skillId !== undefined) {
      void getSkillById();
      void getTimesByDate(skillId, currentDate);
    }
  }, [location]);

  return (
    <ContainerUpper isRefreshing={isLoading || isGetting}>
      <ContainerForm>
        <ButtonContained
          text="Criar tempo"
          onAction={() => {
            navigate("/times/create", { replace: true });
          }}
        />
        {skillItem !== undefined && skillItem !== null ? (
          <StatisticItem
            skillProps={skillItem}
            currentDate={currentDate}
            timeTotal={minutesTotalMonth}
          />
        ) : null}
      </ContainerForm>
      <LinkRedirect
        descriptionUrl="Voltar ao início"
        onRedirect={() => {
          navigate("/home", { replace: true });
        }}
      />
    </ContainerUpper>
  );
};

export default SkillStatistic;
