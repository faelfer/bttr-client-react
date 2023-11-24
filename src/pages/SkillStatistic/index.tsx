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
      const payload = await skill(skillId).unwrap();
      setSkillItem(payload.skill);
    } catch {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
    }
  };

  const getTimesByDate = async (
    skillIdToFilter: string,
    currentDateToFilter: Date,
  ): Promise<void> => {
    try {
      const { firstDayDatetimeIso, lastDayDatetimeIso } =
        datesRangeMonth(currentDateToFilter);
      const payloadTimesByDate = await timesByDate({
        id: skillIdToFilter,
        firstDay: firstDayDatetimeIso,
        lastDay: lastDayDatetimeIso,
      }).unwrap();
      const initialValue = 0;
      const sumTotalTimes = payloadTimesByDate.times.reduce(
        (accumulator: number, currentValue: ITime) =>
          accumulator + currentValue.minutes,
        initialValue,
      );
      setMinutesTotalMonth(sumTotalTimes);
    } catch {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
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
      <ContainerForm heading="" subtitle="">
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
        description=""
        descriptionUrl="Voltar ao início"
        onRedirect={() => {
          navigate("/home", { replace: true });
        }}
      />
    </ContainerUpper>
  );
};

export default SkillStatistic;
