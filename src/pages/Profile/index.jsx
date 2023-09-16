import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import showToast from "../../utils/showToast";
import isInvalidEmail from "../../utils/rules/isInvalidEmail";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import HeaderForm from "../../components/HeaderForm";
import DescriptionForm from "../../components/DescriptionForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined";
import ButtonTransparent from "../../components/ButtonTransparent";
import LinkRedirect from "../../components/LinkRedirect";

import "./styles.css";

import {
  useProfileMutation,
  useProfileUpdateMutation,
  useProfileDeleteMutation,
} from "../../services/user";
import { setCredentials } from "../../services/user/reducer";

export default function ProfileForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [profile, { isLoading }] = useProfileMutation();
  const [profileUpdate, { isLoading: isUpdating }] = useProfileUpdateMutation();
  const [profileDelete, { isLoading: isDeleting }] = useProfileDeleteMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  async function getProfile() {
    try {
      const payload = await profile().unwrap();
      setUsername(payload.user.username);
      setEmail(payload.user.email);
    } catch {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
    }
  }

  useEffect(() => {
    getProfile();
  }, [location]);

  function logout() {
    dispatch(setCredentials({ token: null }));
  }

  function validateProfileUpdate() {
    let message = "";
    const nameWithoutTrimValidate = username.trim();
    if (!nameWithoutTrimValidate) {
      message = "Preencha o campo nome de usuário";
    } else if (nameWithoutTrimValidate.length < 3) {
      message = "Campo nome de usuário é inválido";
    } else if (!email) {
      message = "Preencha o campo e-mail";
    } else if (isInvalidEmail(email)) {
      message = "Campo e-mail é inválido";
    }
    return { isInvalid: !!message, message };
  }

  async function sendProfileUpdate() {
    try {
      const responseValidateProfileUpdate = await validateProfileUpdate();
      if (responseValidateProfileUpdate.isInvalid) {
        showToast("Aviso", responseValidateProfileUpdate.message, "warning");
      } else {
        const payloadProfileUpdate = await profileUpdate({
          username,
          email,
        }).unwrap();
        showToast("Sucesso", payloadProfileUpdate.message, "success");
      }
    } catch (err) {
      showToast("Aviso", err.data.message, "error");
    }
  }

  async function sendProfileDelete() {
    try {
      const payloadProfileDelete = await profileDelete().unwrap();
      showToast("Sucesso", payloadProfileDelete.message, "success");
      logout();
      navigate("/", { replace: true });
    } catch {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
    }
  }

  async function exit() {
    try {
      logout();
      navigate("/", { replace: true });
    } catch {
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
      <Load isShow={isLoading || isUpdating || isDeleting} />
      <div className="content--align">
        <div className="form">
          <HeaderForm title="Perfil" />
          <DescriptionForm description="Edite suas informações." />
          <InputOutlineForm
            inputPlaceholder="Digite seu nome de usuário"
            inputValue={username}
            onChangeInput={(textValue) => setUsername(textValue)}
          />
          <InputOutlineForm
            inputType="email"
            inputPlaceholder="Digite seu e-mail"
            inputValue={email}
            onChangeInput={(textValue) => setEmail(textValue)}
          />
          <ButtonContained text="Salvar" onAction={() => sendProfileUpdate()} />
          <ButtonOutlined text="Apagar" onAction={() => sendProfileDelete()} />
          <ButtonTransparent text="Sair" onAction={() => exit()} />
        </div>
        <LinkRedirect
          description=""
          descriptionUrl="Redefinir a senha"
          onRedirect={() => navigate("/redefine-password", { replace: true })}
        />
      </div>
    </>
  );
}
