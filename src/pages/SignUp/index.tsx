import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import validateSignUp from "../../utils/validations/validateSignUp";
import showToast from "../../utils/showToast";
import useRedirectAuth from "../../hooks/useRedirectAuth";

import ContainerCenter from "../../components/ContainerCenter";
import ContainerForm from "../../components/ContainerForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import LinkRedirect from "../../components/LinkRedirect";
import ButtonContained from "../../components/ButtonContained";

import { useSignUpMutation } from "../../services/user/api";

import {
  toastErrorDefault,
  toastWarningDefault,
  toastSuccessDefault,
} from "../../utils/resources/toast_options_default";

const SignUp = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useRedirectAuth();
  const [signUp, { isLoading }] = useSignUpMutation();

  const sendSignUp = async (): Promise<void> => {
    try {
      const ruleSignUp = validateSignUp({ username, email, password });
      if (ruleSignUp.isInvalid) {
        showToast({ ...toastWarningDefault, body: ruleSignUp.message });
      } else {
        const bulkSignUp = await signUp({ username, email, password }).unwrap();
        showToast({ ...toastSuccessDefault, body: bulkSignUp.message });
      }
    } catch (err: any) {
      showToast({ ...toastErrorDefault, body: err.data.message });
    }
  };

  return (
    <ContainerCenter isRefreshing={isLoading}>
      <ContainerForm
        heading="Bttr"
        subtitle="Cadastre-se para evoluir suas habilidades."
      >
        <InputOutlineForm
          inputPlaceholder="Digite seu nome de usuário"
          inputValue={username}
          onChangeInput={(newText) => {
            setUsername(newText);
          }}
        />
        <InputOutlineForm
          inputType="email"
          inputPlaceholder="Digite seu e-mail"
          inputValue={email}
          onChangeInput={(newText) => {
            setEmail(newText);
          }}
        />
        <InputOutlineForm
          inputType="password"
          inputPlaceholder="Digite sua senha"
          inputValue={password}
          onChangeInput={(newText) => {
            setPassword(newText);
          }}
        />
        <ButtonContained
          text="Cadastre-se"
          onAction={() => {
            void sendSignUp();
          }}
        />
      </ContainerForm>
      <LinkRedirect
        description="Tem uma conta? "
        descriptionUrl="Conecte-se"
        onRedirect={() => {
          navigate("/", { replace: true });
        }}
      />
    </ContainerCenter>
  );
};

export default SignUp;
