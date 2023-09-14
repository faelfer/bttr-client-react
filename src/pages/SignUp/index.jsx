import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import isInvalidEmail from "../../utils/rules/isInvalidEmail";
import isInvalidPassword from "../../utils/rules/isInvalidPassword";
import showToast from "../../utils/showToast";

import Load from "../../components/Load";
import HeaderForm from "../../components/HeaderForm";
import DescriptionForm from "../../components/DescriptionForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import LinkRedirect from "../../components/LinkRedirect";
import ButtonContained from "../../components/ButtonContained";

import "./styles.css";

import { useSignUpMutation } from "../../services/user";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  function validateSignUp() {
    let message = "";
    const nameWithoutTrimValidate = username.trim();
    if (!nameWithoutTrimValidate) {
      message = "Preencha o campo nome de usuário";
    } else if (nameWithoutTrimValidate.length < 2) {
      message = "Campo nome de usuário é inválido";
    } else if (!email) {
      message = "Preencha o campo e-mail";
    } else if (isInvalidEmail(email)) {
      message = "Campo e-mail é inválido";
    } else if (!password) {
      message = "Preencha o campo senha";
    } else if (isInvalidPassword(password)) {
      message =
        "Campo senha deve conter número, símbolo, letra maiúscula e minúscula";
    } else if (password.length < 4 || password.length > 8) {
      message = "Campo senha deve conter de 4 à 8 caracteres";
    }

    return { isInvalid: !!message, message };
  }

  async function sendSignUp() {
    try {
      const responseValidateSignUp = await validateSignUp();
      if (responseValidateSignUp.isInvalid) {
        showToast("Aviso", responseValidateSignUp.message, "warning");
      } else {
        await signUp({ username, email, password }).unwrap();
      }
    } catch(err) { 
      showToast("Aviso", err.data.message, "error");
    }
  }

  return (
    <div className="container">
      <Load isShow={isLoading} />
      <div className="form">
        <HeaderForm title="Bttr" />
        <DescriptionForm description="Cadastre-se para evoluir suas habilidades." />
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
        <InputOutlineForm
          inputType="password"
          inputPlaceholder="Digite sua senha"
          inputValue={password}
          onChangeInput={(textValue) => setPassword(textValue)}
        />
        <ButtonContained text="Cadastre-se" onAction={() => sendSignUp()} />
      </div>
      <LinkRedirect
        description="Tem uma conta? "
        descriptionUrl="Conecte-se"
        onRedirect={() => navigate("/", { replace: true })}
      />
    </div>
  );
}
