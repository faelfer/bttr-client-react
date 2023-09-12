import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { getToken } from "../../services/auth";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import HeaderForm from "../../components/HeaderForm";
import DescriptionForm from "../../components/DescriptionForm";
import MessageContainer from "../../components/MessageContainer";
import InputOutlineForm from "../../components/InputOutlineForm";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined";
import LinkRedirect from "../../components/LinkRedirect";

import "./styles.css";

import {
  SkillByIdFetch,
  SkillCreateFetch,
  SkillDeleteByIdFetch,
  SkillUpdateByIdFetch,
} from "../../api/services/SkillAPI";

export default function SkillForm() {
  const { skillId } = useParams();

  const [name, setName] = useState("");
  const [timeDaily, setTimeDaily] = useState(1);
  const [exceptMessage, setExceptionMessage] = useState("");
  const [exceptType, setExceptionType] = useState("error");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = getToken();

  async function getSkillById(skillIdToRead) {
    try {
      setIsLoading(true);
      const resultSkill = await SkillByIdFetch(token, skillIdToRead);
      console.log("getSkillById | resultSkill: ", resultSkill);
      if (resultSkill.isSuccess) {
        setName(resultSkill.skill.name);
        setTimeDaily(resultSkill.skill.time_daily);
      }
      setExceptionMessage(resultSkill.message);
      setExceptionType(resultSkill.isSuccess ? "success" : "error");
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

  useEffect(() => {
    if (skillId) {
      getSkillById(skillId);
    }
  }, [location]);

  function validateSkill() {
    let message = "";
    const nameWithoutTrimValidate = name.trim();

    if (!nameWithoutTrimValidate) {
      message = "Preencha o campo nome da habilidade";
    } else if (nameWithoutTrimValidate.length < 3) {
      message = "Campo nome da habilidade é inválido";
    } else if (timeDaily <= 0) {
      message = "Campo minutos diário é inválido";
    }

    return { isInvalid: !!message, message };
  }

  async function sendSkillCreate() {
    try {
      const responseValidateSkillCreate = await validateSkill();
      console.log(
        "sendSkillCreate | responseValidateSkillCreate: ",
        responseValidateSkillCreate,
      );

      if (responseValidateSkillCreate.isInvalid) {
        setExceptionMessage(responseValidateSkillCreate.message);
        setExceptionType("warning");
      } else {
        setIsLoading(true);
        const resultSkillCreate = await SkillCreateFetch(
          token,
          name,
          timeDaily,
        );
        console.log("sendSkillCreate | resultSkillCreate: ", resultSkillCreate);
        setExceptionMessage(resultSkillCreate.message);
        setExceptionType(resultSkillCreate.isSuccess ? "success" : "error");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("sendSkillCreate | error: ", error);
      setExceptionMessage(
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
      );
      setExceptionType("error");
      setIsLoading(false);
    }
  }

  async function sendSkillUpdate(skillIdToUpdate) {
    try {
      const responseValidateSkillUpdate = await validateSkill();
      console.log(
        "sendSkillCreate | responseValidateSkillUpdate: ",
        responseValidateSkillUpdate,
      );

      if (responseValidateSkillUpdate.isInvalid) {
        setExceptionMessage(responseValidateSkillUpdate.message);
        setExceptionType("warning");
      } else {
        setIsLoading(true);
        const resultSkillUpdate = await SkillUpdateByIdFetch(
          token,
          skillIdToUpdate,
          name,
          timeDaily,
        );
        console.log("sendSkillUpdate | resultSkillUpdate: ", resultSkillUpdate);
        setExceptionMessage(resultSkillUpdate.message);
        setExceptionType(resultSkillUpdate.isSuccess ? "success" : "error");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("sendSkillUpdate | error: ", error);
      setExceptionMessage(
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
      );
      setExceptionType("error");
      setIsLoading(false);
    }
  }

  async function sendSkillDelete(skillIdToDelete) {
    try {
      setIsLoading(true);
      const resultSkillDelete = await SkillDeleteByIdFetch(
        token,
        skillIdToDelete,
      );
      console.log("sendSkillDelete | resultSkillDelete: ", resultSkillDelete);
      setExceptionMessage(resultSkillDelete.message);
      setExceptionType(resultSkillDelete.isSuccess ? "success" : "error");
      setIsLoading(false);
    } catch (error) {
      console.log("sendSkillDelete | error: ", error);
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
          <HeaderForm title="Habilidade" />
          <DescriptionForm
            description={
              skillId
                ? "Edite suas informações."
                : "Crie uma nova habilidade para começar a registrar o quanto você se dedicou."
            }
          />
          {exceptMessage && (
            <MessageContainer type={exceptType} message={exceptMessage} />
          )}
          <InputOutlineForm
            inputPlaceholder="Digite nome da habilidade"
            inputValue={name}
            onChangeInput={(textValue) => setName(textValue)}
          />
          <InputOutlineForm
            inputType="number"
            inputPlaceholder="Digite os minutos diário"
            inputValue={timeDaily}
            onChangeInput={(textValue) => setTimeDaily(textValue)}
          />
          <ButtonContained
            text={skillId ? "Editar" : "Criar"}
            onAction={() =>
              skillId ? sendSkillUpdate(skillId) : sendSkillCreate()
            }
          />
          {skillId ? (
            <ButtonOutlined
              text="Apagar"
              onAction={() => sendSkillDelete(skillId)}
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
