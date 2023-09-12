import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { getToken } from "../../services/auth";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import MessageContainer from "../../components/MessageContainer";
import StatisticItem from "./components/StatisticItem";
import ButtonContained from "../../components/ButtonContained";
import LinkRedirect from "../../components/LinkRedirect";

import "./styles.css";

import { SkillByIdFetch } from "../../api/services/SkillAPI";
import { TimesByDateFetch } from "../../api/services/TimeAPI";

export default function SkillStatistic() {
  const { skillId } = useParams();

  const [skill, setSkill] = useState(null);
  const [minutesTotalMonth, setMinutesTotalMonth] = useState(0);
  const [exceptMessage, setExceptionMessage] = useState("");
  const [exceptType, setExceptionType] = useState("error");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = getToken();
  const currentDate = new Date();

  async function getSkillById(skillIdToRead) {
    try {
      setIsLoading(true);
      const resultSkills = await SkillByIdFetch(token, skillIdToRead);
      console.log("getSkillById | resultSkills: ", resultSkills);
      setSkill(resultSkills.skill);
      setExceptionMessage(resultSkills.message);
      setExceptionType(resultSkills.isSuccess ? "success" : "error");
      setIsLoading(false);
    } catch (error) {
      console.log("getSkillById | error: ", error);
      setExceptionMessage(
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
      );
      setExceptionType("error");
      setIsLoading(false);
    }
  }

  async function getTimesByDate(skillIdToFilter, currentDateToFilter) {
    try {
      setIsLoading(true);
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
      console.log(
        "handleGoalAdd | firstDayToFilterDateIso, lastDayToFilterDateIso: ",
        firstDayToFilterDateIso,
        lastDayToFilterDateIso,
      );

      const resultTimeByDate = await TimesByDateFetch(
        token,
        skillIdToFilter,
        firstDayToFilterDateIso,
        lastDayToFilterDateIso,
      );
      console.log("getTimesByDate | resultTimeByDate: ", resultTimeByDate);
      const initialValue = 0;
      const sumTotalTimes = resultTimeByDate.times.reduce(
        (accumulator, currentValue) => accumulator + currentValue.minutes,
        initialValue,
      );
      setMinutesTotalMonth(sumTotalTimes);
      setExceptionMessage(resultTimeByDate.message);
      setExceptionType(resultTimeByDate.isSuccess ? "success" : "error");
      setIsLoading(false);
    } catch (error) {
      console.log("getTimesByDate | error: ", error);
      setExceptionMessage(
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
      );
      setExceptionType("error");
      setIsLoading(false);
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
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <ButtonContained
            text="Criar tempo"
            onAction={() => navigate("/times/create", { replace: true })}
          />
          {exceptMessage && (
            <MessageContainer type={exceptType} message={exceptMessage} />
          )}
          {skill !== null ? (
            <StatisticItem
              skillProps={skill}
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
