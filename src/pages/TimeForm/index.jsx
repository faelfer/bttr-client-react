import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import showToast from "../../utils/showToast";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import HeaderForm from "../../components/HeaderForm";
import DescriptionForm from "../../components/DescriptionForm";
import SelectOutlineForm from "../../components/SelectOutlineForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined";
import LinkRedirect from "../../components/LinkRedirect";

import "./styles.css";

import {
  useTimeMutation,
  useTimeCreateMutation,
  useTimeUpdateMutation,
  useTimeDeleteMutation,
} from "../../services/time/api";
import { useSkillsQuery } from "../../services/skill/api";

export default function TimeForm() {
  const { timeId } = useParams();

  const [skillSelected, setSkillSelected] = useState("");
  const [minutes, setMinutes] = useState(1);

  const { data: skills, isLoading } = useSkillsQuery();
  const [time, { isLoading: isGetting }] = useTimeMutation();
  const [timeCreate, { isLoading: isCreating }] = useTimeCreateMutation();
  const [timeUpdate, { isLoading: isUpdating }] = useTimeUpdateMutation();
  const [timeDelete, { isLoading: isDeleting }] = useTimeDeleteMutation();

  const navigate = useNavigate();
  const location = useLocation();

  async function getTimeById() {
    try {
      const payload = await time(timeId).unwrap();
      setMinutes(payload.time.minutes);
      setSkillSelected(payload.time.skill.id);
    } catch {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
    }
  }

  useEffect(() => {
    if (timeId) {
      getTimeById(timeId);
    }
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
      if (responseValidateTimeCreate.isInvalid) {
        showToast("Aviso", responseValidateTimeCreate.message, "warning");
      } else {
        const payloadTimeCreate = await timeCreate({
          skill_id: skillSelected,
          minutes: parseInt(minutes, 10),
        }).unwrap();
        showToast("Sucesso", payloadTimeCreate.message, "success");
      }
    } catch {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
    }
  }

  async function sendTimeUpdate() {
    try {
      const responseValidateTimeUpdate = await validateTime();
      if (responseValidateTimeUpdate.isInvalid) {
        showToast("Aviso", responseValidateTimeUpdate.message, "warning");
      } else {
        const payloadTimeUpdate = await timeUpdate({
          id: timeId,
          time: {
            skill_id: skillSelected,
            minutes: parseInt(minutes, 10),
          },
        }).unwrap();
        showToast("Sucesso", payloadTimeUpdate.message, "success");
      }
    } catch {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
    }
  }

  async function sendTimeDelete() {
    try {
      const payloadTimeDelete = await timeDelete(timeId).unwrap();
      showToast("Sucesso", payloadTimeDelete.message, "success");
    } catch (error) {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
    }
  }

  return (
    <>
      <NavBar navigation={navigate} />
      <Load
        isShow={
          isLoading || isGetting || isCreating || isUpdating || isDeleting
        }
      />
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
          <SelectOutlineForm
            selectPlaceholder="Selecione uma habilidade"
            options={!skills ? [] : skills}
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
