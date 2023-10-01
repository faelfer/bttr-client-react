import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import validateForgotPassword from "../../utils/validations/validateForgotPassword";
import showToast from "../../utils/showToast";
import useRedirectAuth from "../../hooks/useRedirectAuth";

import ContainerCenter from "../../components/ContainerCenter";
import ContainerForm from "../../components/ContainerForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import LinkRedirect from "../../components/LinkRedirect";
import ButtonContained from "../../components/ButtonContained";

import { useForgotPasswordMutation } from "../../services/user/api";

const ForgotPassword = (): JSX.Element => {
  const [email, setEmail] = useState("");

  useRedirectAuth();
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const sendForgotPassword = async (): Promise<void> => {
    try {
      const responseValidateForgotPassword = validateForgotPassword({ email });
      if (responseValidateForgotPassword.isInvalid) {
        showToast("Aviso", responseValidateForgotPassword.message, "warning");
      } else {
        const payload = await forgotPassword({ email }).unwrap();
        showToast("Sucesso", payload.message, "success");
      }
    } catch (err: any) {
      showToast("Aviso", err.data.message, "error");
    }
  };

  return (
    <ContainerCenter isRefreshing={isLoading}>
      <ContainerForm
        heading="Problemas para entrar?"
        subtitle="Enviaremos uma senha temporária para seu e-mail"
      >
        <InputOutlineForm
          inputType="email"
          inputPlaceholder="Insira seu e-mail"
          inputValue={email}
          onChangeInput={(textValue) => {
            setEmail(textValue);
          }}
        />
        <ButtonContained
          text="Enviar"
          onAction={() => {
            void sendForgotPassword();
          }}
        />
      </ContainerForm>
      <LinkRedirect
        description=" "
        descriptionUrl="Voltar ao login"
        onRedirect={() => {
          navigate("/sign-up", { replace: true });
        }}
      />
    </ContainerCenter>
  );
};

export default ForgotPassword;
