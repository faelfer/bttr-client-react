import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import showToast from "../../utils/showToast";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import HeaderForm from "../../components/HeaderForm";
import DescriptionForm from "../../components/DescriptionForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined";
import LinkRedirect from "../../components/LinkRedirect";

import "./styles.css";

import {
  useSkillMutation,
  useSkillCreateMutation,
  useSkillUpdateMutation,
  useSkillDeleteMutation,
} from "../../services/skill/api";

export default function SkillForm() {
  const { skillId } = useParams();

  const [name, setName] = useState("");
  const [daily, setDaily] = useState(1);

  const [skill, { isLoading }] = useSkillMutation();
  const [skillCreate, { isLoading: isCreating }] = useSkillCreateMutation();
  const [skillUpdate, { isLoading: isUpdating }] = useSkillUpdateMutation();
  const [skillDelete, { isLoading: isDeleting }] = useSkillDeleteMutation();

  const navigate = useNavigate();
  const location = useLocation();

  async function getSkillById() {
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
    } else if (daily <= 0) {
      message = "Campo minutos diário é inválido";
    }
    return { isInvalid: !!message, message };
  }

  async function sendSkillCreate() {
    try {
      const responseValidateSkillCreate = await validateSkill();
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
  }

  async function sendSkillUpdate() {
    try {
      const responseValidateSkillUpdate = await validateSkill();
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
  }

  async function sendSkillDelete() {
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
  }

  return (
    <>
      <NavBar navigation={navigate} />
      <Load isShow={isLoading || isCreating || isUpdating || isDeleting} />
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
          <InputOutlineForm
            inputPlaceholder="Digite nome da habilidade"
            inputValue={name}
            onChangeInput={(textValue) => { setName(textValue); }}
          />
          <InputOutlineForm
            inputType="number"
            inputPlaceholder="Digite os minutos diário"
            inputValue={daily}
            onChangeInput={(textValue) => { setDaily(textValue); }}
          />
          <ButtonContained
            text={skillId ? "Editar" : "Criar"}
            onAction={async () =>
              { skillId ? await sendSkillUpdate(skillId) : await sendSkillCreate(); }
            }
          />
          {skillId ? (
            <ButtonOutlined
              text="Apagar"
              onAction={async () => { await sendSkillDelete(skillId); }}
            />
          ) : null}
        </div>
        <LinkRedirect
          description=""
          descriptionUrl="Voltar ao início"
          onRedirect={() => { navigate("/home", { replace: true }); }}
        />
      </div>
    </>
  );
}
