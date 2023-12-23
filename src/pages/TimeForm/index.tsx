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

import {
  toastErrorDefault,
  toastWarningDefault,
  toastSuccessDefault,
} from "../../utils/resources/toast_options_default";

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
      showToast(toastErrorDefault);
    }
  };

  useEffect(() => {
    if (timeId !== undefined) {
      void getTimeById();
    }
  }, [location]);

  const sendTimeCreate = async (): Promise<void> => {
    try {
      const ruleTimeCreate = validateTime({ skillSelected, minutes });
      if (ruleTimeCreate.isInvalid) {
        showToast({ ...toastWarningDefault, body: ruleTimeCreate.message });
      } else {
        const dataTimeCreate = { skill_id: skillSelected, minutes };
        const bulkTimeCreate = await timeCreate(dataTimeCreate).unwrap();
        showToast({ ...toastSuccessDefault, body: bulkTimeCreate.message });
      }
    } catch {
      showToast(toastErrorDefault);
    }
  };

  const sendTimeUpdate = async (): Promise<void> => {
    try {
      const ruleTimeUpdate = validateTime({ skillSelected, minutes });
      if (ruleTimeUpdate.isInvalid) {
        showToast({ ...toastWarningDefault, body: ruleTimeUpdate.message });
      } else {
        const dataProfileUpdate = {
          id: timeId,
          time: { skill_id: skillSelected, minutes },
        };
        const bulkTimeUpdate = await timeUpdate(dataProfileUpdate).unwrap();
        showToast({ ...toastSuccessDefault, body: bulkTimeUpdate.message });
      }
    } catch {
      showToast(toastErrorDefault);
    }
  };

  const sendTimeDelete = async (): Promise<void> => {
    try {
      const bulkTimeDelete = await timeDelete(timeId).unwrap();
      showToast({ ...toastSuccessDefault, body: bulkTimeDelete.message });
    } catch (error) {
      showToast(toastErrorDefault);
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
        descriptionUrl="Voltar ao histórico"
        onRedirect={() => {
          navigate("/times", { replace: true });
        }}
      />
    </ContainerUpper>
  );
};

export default TimeForm;
