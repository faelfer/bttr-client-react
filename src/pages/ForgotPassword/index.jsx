import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import isInvalidEmail from "../../utils/rules/isInvalidEmail";
import showToast from "../../utils/showToast";
import useRedirectAuth from "../../hooks/useRedirectAuth";

import Load from "../../components/Load";
import HeaderForm from "../../components/HeaderForm";
import DescriptionForm from "../../components/DescriptionForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import LinkRedirect from "../../components/LinkRedirect";
import ButtonContained from "../../components/ButtonContained";

import "./styles.css";

import { useForgotPasswordMutation } from "../../services/user/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  useRedirectAuth();
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  function validateForgotPassword() {
    let message = "";

    if (!email) {
      message = "Preencha o campo e-mail";
    } else if (isInvalidEmail(email)) {
      message = "Campo e-mail é inválido";
    }
    return { isInvalid: !!message, message };
  }

  async function sendForgotPassword() {
    try {
      const responseValidateForgotPassword = await validateForgotPassword();
      if (responseValidateForgotPassword.isInvalid) {
        showToast("Aviso", responseValidateForgotPassword.message, "warning");
      } else {
        const payload = await forgotPassword({ email }).unwrap();
        showToast("Sucesso", payload.message, "success");
      }
    } catch (err) {
      showToast("Aviso", err.data.message, "error");
    }
  }

  return (
    <div className="container">
      <Load isShow={isLoading} />
      <div className="form">
        <HeaderForm title="Problemas para entrar?" />
        <DescriptionForm description="Insira o seu e-mail e enviaremos uma senha para você voltar a acessar a sua conta." />
        <InputOutlineForm
          inputType="email"
          inputPlaceholder="Insira seu e-mail"
          inputValue={email}
          onChangeInput={(textValue) => setEmail(textValue)}
        />
        <ButtonContained text="Enviar" onAction={() => sendForgotPassword()} />
      </div>
      <LinkRedirect
        description=" "
        descriptionUrl="Voltar ao login"
        onRedirect={() => navigate("/sign-up", { replace: true })}
      />
    </div>
  );
}
