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

const SignUp = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useRedirectAuth();
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const sendSignUp = async (): Promise<void> => {
    try {
      const resultValidate = validateSignUp({
        username,
        email,
        password,
      });
      if (resultValidate.isInvalid) {
        showToast("Aviso", resultValidate.message, "warning");
      } else {
        const payload = await signUp({ username, email, password }).unwrap();
        showToast("Sucesso", payload.message, "success");
      }
    } catch (err: any) {
      showToast("Aviso", err.data.message, "error");
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
          onChangeInput={(textValue) => {
            setUsername(textValue);
          }}
        />
        <InputOutlineForm
          inputType="email"
          inputPlaceholder="Digite seu e-mail"
          inputValue={email}
          onChangeInput={(textValue) => {
            setEmail(textValue);
          }}
        />
        <InputOutlineForm
          inputType="password"
          inputPlaceholder="Digite sua senha"
          inputValue={password}
          onChangeInput={(textValue) => {
            setPassword(textValue);
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
