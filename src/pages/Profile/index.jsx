import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getToken, logout } from "../../services/auth";
import isInvalidEmail from "../../utils/rules/isInvalidEmail";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import HeaderForm from "../../components/HeaderForm";
import DescriptionForm from "../../components/DescriptionForm";
import MessageContainer from "../../components/MessageContainer";
import InputOutlineForm from "../../components/InputOutlineForm";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined";
import ButtonTransparent from "../../components/ButtonTransparent";
import LinkRedirect from "../../components/LinkRedirect";

import "./styles.css";

import {
  ProfileFetch,
  ProfileUpdateFetch,
  ProfileDeleteFetch,
} from "../../api/services/UserAPI";

export default function ProfileForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [exceptMessage, setExceptionMessage] = useState("");
  const [exceptType, setExceptionType] = useState("error");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = getToken();

  async function getProfile() {
    try {
      setIsLoading(true);
      const resultProfile = await ProfileFetch(token);
      console.log("getProfile | resultProfile: ", resultProfile);
      if (resultProfile.isSuccess) {
        setUsername(resultProfile.user.username);
        setEmail(resultProfile.user.email);
      }
      setExceptionMessage(resultProfile.message);
      setExceptionType(resultProfile.isSuccess ? "success" : "error");
      setIsLoading(false);
    } catch (error) {
      console.log("getProfile | error: ", error);
      setExceptionMessage(
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
      );
      setExceptionType("error");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, [location]);

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
    const responseValidateProfileUpdate = await validateProfileUpdate();
    console.log(
      "sendProfileUpdate | responseValidateProfileUpdate: ",
      responseValidateProfileUpdate,
    );

    if (responseValidateProfileUpdate.isInvalid) {
      setExceptionMessage(responseValidateProfileUpdate.message);
      setExceptionType("warning");
    } else {
      try {
        setIsLoading(true);
        const resultProfileUpdate = await ProfileUpdateFetch(
          token,
          username,
          email,
        );
        console.log(
          "sendProfileUpdate | resultProfileUpdate: ",
          resultProfileUpdate,
        );
        setExceptionMessage(resultProfileUpdate.message);
        setExceptionType(resultProfileUpdate.isSuccess ? "success" : "error");
        setIsLoading(false);
      } catch (error) {
        console.log("sendProfileUpdate | error: ", error);
        setExceptionMessage(
          "No momento esse recurso está indisponível, tente novamente mais tarde.",
        );
        setExceptionType("error");
        setIsLoading(false);
      }
    }
  }

  async function sendProfileDelete() {
    try {
      setIsLoading(true);
      const resultProfileDelete = await ProfileDeleteFetch(token);
      console.log(
        "sendProfileDelete | resultProfileDelete: ",
        resultProfileDelete,
      );
      setIsLoading(false);
      setExceptionMessage(resultProfileDelete.message);
      setExceptionType(resultProfileDelete.isSuccess ? "success" : "error");
      if (resultProfileDelete.isSuccess) {
        logout();
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log("sendProfileDelete | error: ", error);
      setExceptionMessage(
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
      );
      setExceptionType("error");
      setIsLoading(false);
    }
  }

  async function exit() {
    try {
      logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.log("exit | error", error);
      setExceptionMessage(
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
      );
      setExceptionType("error");
    }
  }

  return (
    <>
      <NavBar navigation={navigate} />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <HeaderForm title="Perfil" />
          <DescriptionForm description="Edite suas informações." />
          {exceptMessage && (
            <MessageContainer type={exceptType} message={exceptMessage} />
          )}
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
