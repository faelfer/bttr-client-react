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
    }
  }, [location]);

  const sendSkillCreate = async (): Promise<void> => {
    try {
      const responseValidateSkillCreate = validateSkill({
        name,
        daily,
      });
      if (responseValidateSkillCreate.isInvalid) {
        showToast("Aviso", responseValidateSkillCreate.message, "warning");
      } else {
        const payloadSkillCreate = await skillCreate({
          name,
          daily,
        }).unwrap();
        showToast("Sucesso", payloadSkillCreate.message, "success");
      }
    } catch {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
    }
  };

  const sendSkillUpdate = async (): Promise<void> => {
    try {
      const responseValidateSkillUpdate = validateSkill({
        name,
        daily,
      });
      if (responseValidateSkillUpdate.isInvalid) {
        showToast("Aviso", responseValidateSkillUpdate.message, "warning");
      } else {
        const payloadSkillUpdate = await skillUpdate({
          id: skillId,
          skill: {
            name,
            daily,
          },
        }).unwrap();
        showToast("Sucesso", payloadSkillUpdate.message, "success");
      }
    } catch {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
    }
  };

  const sendSkillDelete = async (): Promise<void> => {
    try {
      const payloadSkillDelete = await skillDelete(skillId).unwrap();
      showToast("Sucesso", payloadSkillDelete.message, "success");
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
        description=""
        descriptionUrl="Voltar ao início"
        onRedirect={() => {
          navigate("/home", { replace: true });
        }}
      />
    </ContainerUpper>
  );
};

export default SkillForm;
