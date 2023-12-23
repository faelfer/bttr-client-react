import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import showToast from "../../utils/showToast";
import validateSkill from "../../utils/validations/validateSkill";

import ContainerUpper from "../../components/ContainerUpper";
import ContainerForm from "../../components/ContainerForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined";
import LinkRedirect from "../../components/LinkRedirect";

import {
  useSkillMutation,
  useSkillCreateMutation,
  useSkillUpdateMutation,
  useSkillDeleteMutation,
} from "../../services/skill/api";

import {
  toastErrorDefault,
  toastWarningDefault,
  toastSuccessDefault,
} from "../../utils/resources/toast_options_default";

const SkillForm = (): JSX.Element => {
  const { skillId } = useParams();

  const [name, setName] = useState("");
  const [daily, setDaily] = useState("");

  const [skill, { isLoading: isGetting }] = useSkillMutation();
  const [skillCreate, { isLoading: isCreating }] = useSkillCreateMutation();
  const [skillUpdate, { isLoading: isUpdating }] = useSkillUpdateMutation();
  const [skillDelete, { isLoading: isDeleting }] = useSkillDeleteMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const getSkillById = async (): Promise<void> => {
    try {
      const payload = await skill(skillId).unwrap();
      setName(payload.skill.name);
      setDaily(payload.skill.daily);
    } catch {
      showToast(toastErrorDefault);
    }
  };

  useEffect(() => {
    if (skillId !== undefined) {
      void getSkillById();
    }
  }, [location]);

  const sendSkillCreate = async (): Promise<void> => {
    try {
      const ruleSkillCreate = validateSkill({ name, daily });
      if (ruleSkillCreate.isInvalid) {
        showToast({ ...toastWarningDefault, body: ruleSkillCreate.message });
      } else {
        const bulkSkillCreate = await skillCreate({ name, daily }).unwrap();
        showToast({ ...toastSuccessDefault, body: bulkSkillCreate.message });
      }
    } catch {
      showToast(toastErrorDefault);
    }
  };

  const sendSkillUpdate = async (): Promise<void> => {
    try {
      const ruleSkillUpdate = validateSkill({ name, daily });
      if (ruleSkillUpdate.isInvalid) {
        showToast({ ...toastWarningDefault, body: ruleSkillUpdate.message });
      } else {
        const dataSkillUpdate = { id: skillId, skill: { name, daily } };
        const bulkSkillUpdate = await skillUpdate(dataSkillUpdate).unwrap();
        showToast({ ...toastSuccessDefault, body: bulkSkillUpdate.message });
      }
    } catch {
      showToast(toastErrorDefault);
    }
  };

  const sendSkillDelete = async (): Promise<void> => {
    try {
      const bulkSkillDelete = await skillDelete(skillId).unwrap();
      showToast({ ...toastSuccessDefault, body: bulkSkillDelete.message });
    } catch (error) {
      showToast(toastErrorDefault);
    }
  };

  return (
    <ContainerUpper
      isRefreshing={isGetting || isCreating || isUpdating || isDeleting}
    >
      <ContainerForm
        heading="Habilidade"
        subtitle={
          skillId !== undefined
            ? "Edite suas informações."
            : "Crie uma nova habilidade para começar a registrar o quanto você se dedicou."
        }
      >
        <InputOutlineForm
          inputPlaceholder="Digite nome da habilidade"
          inputValue={name}
          onChangeInput={(textValue) => {
            setName(textValue);
          }}
        />
        <InputOutlineForm
          inputPlaceholder="Digite os minutos diário"
          inputValue={daily}
          onChangeInput={(textValue) => {
            setDaily(textValue);
          }}
        />
        <ButtonContained
          text={skillId !== undefined ? "Editar" : "Criar"}
          onAction={() => {
            void (skillId !== undefined
              ? sendSkillUpdate()
              : sendSkillCreate());
          }}
        />
        {skillId !== undefined ? (
          <ButtonOutlined
            text="Apagar"
            onAction={() => {
              void sendSkillDelete();
            }}
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

export default SkillForm;
