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

import {
  toastErrorDefault,
  toastWarningDefault,
  toastSuccessDefault,
} from "../../utils/resources/toast_options_default";

const ForgotPassword = (): JSX.Element => {
  const [email, setEmail] = useState("");

  useRedirectAuth();
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const sendForgotPassword = async (): Promise<void> => {
    try {
      const ruleForgot = validateForgotPassword({ email });
      if (ruleForgot.isInvalid) {
        showToast({ ...toastWarningDefault, body: ruleForgot.message });
      } else {
        const bulkForgot = await forgotPassword({ email }).unwrap();
        showToast({ ...toastSuccessDefault, body: bulkForgot.message });
      }
    } catch (err: any) {
      showToast({ ...toastErrorDefault, body: err.data.message });
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
        descriptionUrl="Voltar ao login"
        onRedirect={() => {
          navigate("/sign-up", { replace: true });
        }}
      />
    </ContainerCenter>
  );
};

export default ForgotPassword;
