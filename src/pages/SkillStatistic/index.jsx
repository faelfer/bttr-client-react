import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import showToast from "../../utils/showToast";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import StatisticItem from "./components/StatisticItem";
import ButtonContained from "../../components/ButtonContained";
import LinkRedirect from "../../components/LinkRedirect";

import "./styles.css";

import { useSkillMutation } from "../../services/skill/api";
import { useTimesByDateMutation } from "../../services/time/api";

export default function SkillStatistic() {
  const { skillId } = useParams();

  const [skillItem, setSkillItem] = useState(null);
  const [minutesTotalMonth, setMinutesTotalMonth] = useState(0);

  const [skill, { isLoading: isGetting }] = useSkillMutation();
  const [timesByDate, { isLoading }] = useTimesByDateMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const currentDate = new Date();

  async function getSkillById() {
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
  }

  async function getTimesByDate(skillIdToFilter, currentDateToFilter) {
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
        20,
        59,
        59,
      );
      const firstDayToFilterDateIso = firstDayToFilter.toISOString();
      const lastDayToFilterDateIso = lastDayToFilter.toISOString();
      const payloadTimesByDate = await timesByDate({
        id: skillIdToFilter,
        firstDay: firstDayToFilterDateIso,
        lastDay: lastDayToFilterDateIso,
      }).unwrap();
      const initialValue = 0;
      const sumTotalTimes = payloadTimesByDate.times.reduce(
        (accumulator, currentValue) => accumulator + currentValue.minutes,
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
  }

  useEffect(() => {
    if (skillId) {
      getSkillById(skillId);
      getTimesByDate(skillId, currentDate);
    }
  }, [location]);

  return (
    <>
      <NavBar navigation={navigate} />
      <Load isShow={isGetting || isLoading} />
      <div className="content--align">
        <div className="form">
          <ButtonContained
            text="Criar tempo"
            onAction={() => navigate("/times/create", { replace: true })}
          />
          {skillItem !== null ? (
            <StatisticItem
              skillProps={!skillItem ? null : skillItem}
              currentDate={currentDate}
              timeTotal={minutesTotalMonth}
            />
          ) : null}
        </div>
        <LinkRedirect
          description=""
          descriptionUrl="Voltar ao início"
          onRedirect={() => navigate("/home", { replace: true })}
        />
      </div>
    </>
  );
}
