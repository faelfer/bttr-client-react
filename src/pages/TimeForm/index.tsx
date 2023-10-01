import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import showToast from "../../utils/showToast";
import validateTime from "../../utils/validations/validateTime";

import ContainerUpper from "../../components/ContainerUpper";
import ContainerForm from "../../components/ContainerForm";
import SelectOutlineForm from "../../components/SelectOutlineForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined";
import LinkRedirect from "../../components/LinkRedirect";

import {
  useTimeMutation,
  useTimeCreateMutation,
  useTimeUpdateMutation,
  useTimeDeleteMutation,
} from "../../services/time/api";
import { useSkillsQuery } from "../../services/skill/api";

const TimeForm = (): JSX.Element => {
  const { timeId } = useParams();

  const [skillSelected, setSkillSelected] = useState("");
  const [minutes, setMinutes] = useState("");

  const { data: skills, isLoading } = useSkillsQuery(null);
  const [time, { isLoading: isGetting }] = useTimeMutation();
  const [timeCreate, { isLoading: isCreating }] = useTimeCreateMutation();
  const [timeUpdate, { isLoading: isUpdating }] = useTimeUpdateMutation();
  const [timeDelete, { isLoading: isDeleting }] = useTimeDeleteMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const getTimeById = async (): Promise<void> => {
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
  };

  useEffect(() => {
    if (timeId !== undefined) {
      void getTimeById();
    }
  }, [location]);

  const sendTimeCreate = async (): Promise<void> => {
    try {
      const responseValidateTimeCreate = validateTime({
        skillSelected,
        minutes,
      });
      if (responseValidateTimeCreate.isInvalid) {
        showToast("Aviso", responseValidateTimeCreate.message, "warning");
      } else {
        const payloadTimeCreate = await timeCreate({
          skill_id: skillSelected,
          minutes,
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
  };

  const sendTimeUpdate = async (): Promise<void> => {
    try {
      const responseValidateTimeUpdate = validateTime({
        skillSelected,
        minutes,
      });
      if (responseValidateTimeUpdate.isInvalid) {
        showToast("Aviso", responseValidateTimeUpdate.message, "warning");
      } else {
        const payloadTimeUpdate = await timeUpdate({
          id: timeId,
          time: {
            skill_id: skillSelected,
            minutes,
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
  };

  const sendTimeDelete = async (): Promise<void> => {
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
  };

  return (
    <ContainerUpper
      isRefreshing={
        isLoading || isGetting || isCreating || isUpdating || isDeleting
      }
    >
      <ContainerForm
        heading="Tempo"
        subtitle={
          timeId !== undefined
            ? "Edite suas informações."
            : "Crie um novo registro de tempo para demonstrar o quanto você se dedicou."
        }
      >
        <SelectOutlineForm
          selectPlaceholder="Selecione uma habilidade"
          options={skills === undefined ? [] : skills}
          selectValue={skillSelected}
          onChangeSelect={(optionSelected) => {
            setSkillSelected(optionSelected);
          }}
        />
        <InputOutlineForm
          inputPlaceholder="Digite os minutos"
          inputValue={minutes}
          onChangeInput={(textValue) => {
            setMinutes(textValue);
          }}
        />
        <ButtonContained
          text={timeId !== undefined ? "Editar" : "Criar"}
          onAction={() => {
            void (timeId !== undefined ? sendTimeUpdate() : sendTimeCreate());
          }}
        />
        {timeId !== undefined ? (
          <ButtonOutlined
            text="Apagar"
            onAction={() => {
              void sendTimeDelete();
            }}
          />
        ) : null}
      </ContainerForm>
      <LinkRedirect
        description=""
        descriptionUrl="Voltar ao histórico"
        onRedirect={() => {
          navigate("/times", { replace: true });
        }}
      />
    </ContainerUpper>
  );
};

export default TimeForm;
