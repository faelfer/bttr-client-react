import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getToken } from "../../services/auth";
import isInvalidPassword from "../../utils/rules/isInvalidPassword";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import HeaderForm from "../../components/HeaderForm";
import MessageContainer from "../../components/MessageContainer";
import InputOutlineForm from "../../components/InputOutlineForm";
import LinkRedirect from "../../components/LinkRedirect";
import ButtonContained from "../../components/ButtonContained";

import "./styles.css";

import { RedefinePasswordFetch } from "../../api/services/UserAPI";

export default function RedefinePasswordForm() {
  const [password, setPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordNewConfirm, setPasswordNewConfirm] = useState("");
  const [exceptMessage, setExceptionMessage] = useState("");
  const [exceptType, setExceptionType] = useState("error");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const token = getToken();

  function validateRedefinePassword() {
    console.log(
      "RedefinePasswordFetch | password, passwordNew, passwordNewConfirm: ",
      password,
      passwordNew,
      passwordNewConfirm,
    );
    let message = "";

    if (!password) {
      message = "Preencha o campo senha atual";
    } else if (password.length < 4) {
      message = "Campo senha atual é inválido";
    } else if (!passwordNew) {
      message = "Preencha o campo nova senha";
    } else if (passwordNew.length < 4) {
      message = "Campo nova senha deve conter no mínimo 4 caracteres";
    } else if (isInvalidPassword(passwordNew)) {
      message =
        "Campo nova senha deve conter número, símbolo, letra maiúscula e minúscula";
    } else if (password === passwordNew) {
      message = "Campos senha atual e nova senha devem ser diferentes";
    } else if (!passwordNewConfirm) {
      message = "Preencha o campo confirmar nova senha";
    } else if (passwordNewConfirm.length < 4) {
      message = "Campo confirmar nova senha é inválido";
    } else if (passwordNew !== passwordNewConfirm) {
      message = "Os campos nova senha e confirmar nova senha devem ser iguais";
    }

    return { isInvalid: !!message, message };
  }

  async function sendRedefinePassword() {
    const responseValidateRedefinePassword = await validateRedefinePassword();
    console.log(
      "sendRedefinePassword | responseValidateRedefinePassword: ",
      responseValidateRedefinePassword,
    );

    if (responseValidateRedefinePassword.isInvalid) {
      setExceptionMessage(responseValidateRedefinePassword.message);
      setExceptionType("warning");
    } else {
      try {
        setIsLoading(true);
        const resultValidateRedefinePassword = await RedefinePasswordFetch(
          token,
          password,
          passwordNew,
        );

        console.log(
          "sendRedefinePassword | resultValidateRedefinePassword: ",
          resultValidateRedefinePassword,
        );
        setExceptionMessage(resultValidateRedefinePassword.message);
        setExceptionType(
          resultValidateRedefinePassword.isSuccess ? "success" : "error",
        );
        setIsLoading(false);
      } catch (error) {
        console.log("sendRedefinePassword | error: ", error);
        setExceptionMessage(
          "No momento esse recurso está indisponível, tente novamente mais tarde.",
        );
        setExceptionType("error");
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <NavBar navigation={navigate} />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <HeaderForm title="Redefinir senha" />
          {exceptMessage && (
            <MessageContainer type={exceptType} message={exceptMessage} />
          )}
          <InputOutlineForm
            inputType="password"
            inputPlaceholder="Digite sua senha atual"
            inputValue={password}
            onChangeInput={(textValue) => setPassword(textValue)}
          />
          <InputOutlineForm
            inputType="password"
            inputPlaceholder="Digite sua nova senha"
            inputValue={passwordNew}
            onChangeInput={(textValue) => setPasswordNew(textValue)}
          />
          <InputOutlineForm
            inputType="password"
            inputPlaceholder="Digite sua confirmação de nova senha"
            inputValue={passwordNewConfirm}
            onChangeInput={(textValue) => setPasswordNewConfirm(textValue)}
          />
          <ButtonContained
            text="Salvar"
            onAction={() => sendRedefinePassword()}
          />
        </div>
        <LinkRedirect
          description=""
          descriptionUrl="Voltar ao perfil"
          onRedirect={() => navigate("/profile", { replace: true })}
        />
      </div>
    </>
  );
}
