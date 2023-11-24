import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import showToast from "../../utils/showToast";
import validateSignIn from "../../utils/validations/validateSignIn";
import useRedirectAuth from "../../hooks/useRedirectAuth";

import ContainerCenter from "../../components/ContainerCenter";
import ContainerForm from "../../components/ContainerForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import LinkRedirect from "../../components/LinkRedirect";
import ButtonContained from "../../components/ButtonContained";
import ButtonTransparent from "../../components/ButtonTransparent";

import { useSignInMutation } from "../../services/user/api";
import { setCredentials } from "../../services/user/reducer";

const SignIn = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useRedirectAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signIn, { isLoading }] = useSignInMutation();

  const sendSignIn = async (): Promise<void> => {
    const responseValidateSignIn = validateSignIn({ email, password });
    try {
      if (responseValidateSignIn.isInvalid) {
        showToast("Aviso", responseValidateSignIn.message, "warning");
      } else {
        const payload = await signIn({ email, password }).unwrap();
        dispatch(setCredentials(payload));
        navigate("/home", { replace: true });
      }
    } catch (err: any) {
      showToast("Aviso", err.data.message, "error");
    }
  };

  return (
    <ContainerCenter isRefreshing={isLoading}>
      <ContainerForm heading="Acesso" subtitle="preencha suas credencias">
        <InputOutlineForm
          inputType="email"
          inputPlaceholder="Insira seu e-mail"
          inputValue={email}
          onChangeInput={(textValue) => {
            setEmail(textValue);
          }}
        />
        <InputOutlineForm
          inputType="password"
          inputPlaceholder="Insira sua senha"
          inputValue={password}
          onChangeInput={(textValue) => {
            setPassword(textValue);
          }}
        />
        <ButtonContained
          text="Entrar"
          onAction={() => {
            void sendSignIn();
          }}
        />
        <ButtonTransparent
          text="Esqueceu a senha?"
          onAction={() => {
            navigate("/forgot-password", { replace: true });
          }}
        />
      </ContainerForm>
      <LinkRedirect
        description="Não tem uma conta? "
        descriptionUrl="Cadastre-se"
        onRedirect={() => {
          navigate("/sign-up", { replace: true });
        }}
      />
    </ContainerCenter>
  );
};

export default SignIn;
