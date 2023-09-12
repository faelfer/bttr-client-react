import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { getToken } from "../../services/auth";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import HeaderForm from "../../components/HeaderForm";
import DescriptionForm from "../../components/DescriptionForm";
import MessageContainer from "../../components/MessageContainer";
import SelectOutlineForm from "../../components/SelectOutlineForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined";
import LinkRedirect from "../../components/LinkRedirect";

import "./styles.css";

import {
  TimeByIdFetch,
  TimeCreateFetch,
  TimeDeleteByIdFetch,
  TimeUpdateByIdFetch,
} from "../../api/services/TimeAPI";
import { SkillsFromUserFetch } from "../../api/services/SkillAPI";

export default function TimeForm() {
  const { timeId } = useParams();

  const [skills, setSkills] = useState([]);
  const [skillSelected, setSkillSelected] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [exceptMessage, setExceptionMessage] = useState("");
  const [exceptType, setExceptionType] = useState("error");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = getToken();

  async function getTimeById(timeIdToRead) {
    try {
      setIsLoading(true);
      const resultTime = await TimeByIdFetch(token, timeIdToRead);
      console.log("getTimeById | resultTime: ", resultTime);
      if (resultTime.isSuccess) {
        setMinutes(resultTime.time.minutes);
        setSkillSelected(resultTime.time.skill.id);
      }
      setExceptionMessage(resultTime.message);
      setExceptionType(resultTime.isSuccess ? "success" : "error");
      setIsLoading(false);
    } catch (error) {
      console.log("getTimeById | error: ", error);
      setExceptionMessage(
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
      );
      setExceptionType("error");
      setIsLoading(false);
    }
  }

  async function getSkillsFromUser() {
    try {
      setIsLoading(true);
      const resultSkills = await SkillsFromUserFetch(token);
      console.log("getSkillsFromUser | resultSkills: ", resultSkills);
      setIsLoading(false);
      if (resultSkills.isSuccess) {
        const skillsToOptions = resultSkills.skills.map((skillPhase) => ({
          id: skillPhase.id,
          value: skillPhase.name,
        }));
        setSkills(skillsToOptions);
      }
      setExceptionMessage(resultSkills.message);
      setExceptionType(resultSkills.isSuccess ? "success" : "error");
      setIsLoading(false);
    } catch (error) {
      console.log("getSkillsFromUser | error: ", error);
      setExceptionMessage(
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
      );
      setExceptionType("error");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (timeId) {
      getTimeById(timeId);
    }
    getSkillsFromUser();
  }, [location]);

  function validateTime() {
    let message = "";

    if (skillSelected === "") {
      message = "Campo habilidade é inválido";
    } else if (minutes <= 0) {
      message = "Campo minutos é inválido";
    }

    return { isInvalid: !!message, message };
  }

  async function sendTimeCreate() {
    try {
      const responseValidateTimeCreate = await validateTime();
      console.log(
        "sendTimeCreate | responseValidateTimeCreate: ",
        responseValidateTimeCreate,
      );

      if (responseValidateTimeCreate.isInvalid) {
        setExceptionMessage(responseValidateTimeCreate.message);
        setExceptionType("warning");
      } else {
        setIsLoading(true);
        const resultTimeCreate = await TimeCreateFetch(
          token,
          skillSelected,
          parseInt(minutes, 10),
        );
        console.log("sendTimeCreate | resultTimeCreate: ", resultTimeCreate);
        setExceptionMessage(resultTimeCreate.message);
        setExceptionType(resultTimeCreate.isSuccess ? "success" : "error");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("sendTimeCreate | error: ", error);
      setExceptionMessage(
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
      );
      setExceptionType("error");
      setIsLoading(false);
    }
  }

  async function sendTimeUpdate(timeIdToUpdate) {
    try {
      const responseValidateTimeUpdate = await validateTime();
      console.log(
        "sendTimeCreate | responseValidateTimeUpdate: ",
        responseValidateTimeUpdate,
      );

      if (responseValidateTimeUpdate.isInvalid) {
        setExceptionMessage(responseValidateTimeUpdate.message);
        setExceptionType("warning");
      } else {
        setIsLoading(true);
        const resultTimeUpdate = await TimeUpdateByIdFetch(
          token,
          timeIdToUpdate,
          skillSelected,
          parseInt(minutes, 10),
        );
        console.log("sendTimeUpdate | resultTimeUpdate: ", resultTimeUpdate);
        setExceptionMessage(resultTimeUpdate.message);
        setExceptionType(resultTimeUpdate.isSuccess ? "success" : "error");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("sendTimeUpdate | error: ", error);
      setExceptionMessage(
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
      );
      setExceptionType("error");
      setIsLoading(false);
    }
  }

  async function sendTimeDelete(timeIdToDelete) {
    try {
      setIsLoading(true);
      const resultTimeDelete = await TimeDeleteByIdFetch(token, timeIdToDelete);
      console.log("sendTimeDelete | resultTimeDelete: ", resultTimeDelete);
      setExceptionMessage(resultTimeDelete.message);
      setExceptionType(resultTimeDelete.isSuccess ? "success" : "error");
      setIsLoading(false);
    } catch (error) {
      console.log("sendTimeDelete | error: ", error);
      setExceptionMessage(
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
      );
      setExceptionType("error");
      setIsLoading(false);
    }
  }

  return (
    <>
      <NavBar navigation={navigate} />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <HeaderForm title="Tempo" />
          <DescriptionForm
            description={
              timeId
                ? "Edite suas informações."
                : "Crie um novo registro de tempo para demonstrar o quanto você se dedicou."
            }
          />
          {exceptMessage && (
            <MessageContainer type={exceptType} message={exceptMessage} />
          )}
          <SelectOutlineForm
            selectPlaceholder="Selecione uma habilidade"
            options={skills}
            selectValue={skillSelected}
            onChangeSelect={(optionSelected) =>
              setSkillSelected(optionSelected)
            }
          />
          <InputOutlineForm
            inputType="number"
            inputPlaceholder="Digite os minutos"
            inputValue={minutes}
            onChangeInput={(textValue) => setMinutes(textValue)}
          />
          <ButtonContained
            text={timeId ? "Editar" : "Criar"}
            onAction={() =>
              timeId ? sendTimeUpdate(timeId) : sendTimeCreate()
            }
          />
          {timeId ? (
            <ButtonOutlined
              text="Apagar"
              onAction={() => sendTimeDelete(timeId)}
            />
          ) : null}
        </div>
        <LinkRedirect
          description=""
          descriptionUrl="Voltar ao histórico"
          onRedirect={() => navigate("/times", { replace: true })}
        />
      </div>
    </>
  );
}
