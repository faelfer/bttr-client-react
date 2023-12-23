import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import showToast from "../../utils/showToast";
import validateRedefinePassword from "../../utils/validations/validateRedefinePassword";

import ContainerUpper from "../../components/ContainerUpper";
import ContainerForm from "../../components/ContainerForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import LinkRedirect from "../../components/LinkRedirect";
import ButtonContained from "../../components/ButtonContained";

import { useRedefinePasswordMutation } from "../../services/user/api";

import {
  toastErrorDefault,
  toastWarningDefault,
  toastSuccessDefault,
} from "../../utils/resources/toast_options_default";

const RedefinePassword = (): JSX.Element => {
  const [password, setPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [redefinePassword, { isLoading }] = useRedefinePasswordMutation();

  const navigate = useNavigate();

  const sendRedefinePassword = async (): Promise<void> => {
    try {
      const inputsRedefine = { password, passwordNew, passwordConfirm };
      const ruleRedefine = validateRedefinePassword(inputsRedefine);
      if (ruleRedefine.isInvalid) {
        showToast({ ...toastWarningDefault, body: ruleRedefine.message });
      } else {
        const dataRedefine = { password, new_password: passwordNew };
        const bulkRedefine = await redefinePassword(dataRedefine).unwrap();
        showToast({ ...toastSuccessDefault, body: bulkRedefine.message });
      }
    } catch (err: any) {
      showToast({ ...toastErrorDefault, body: err.data.message });
    }
  };

  return (
    <ContainerUpper isRefreshing={isLoading}>
      <ContainerForm heading="Redefinir senha" subtitle="altere sua credencial">
        <InputOutlineForm
          inputType="password"
          inputPlaceholder="Digite sua senha atual"
          inputValue={password}
          onChangeInput={(textValue) => {
            setPassword(textValue);
          }}
        />
        <InputOutlineForm
          inputType="password"
          inputPlaceholder="Digite sua nova senha"
          inputValue={passwordNew}
          onChangeInput={(textValue) => {
            setPasswordNew(textValue);
          }}
        />
        <InputOutlineForm
          inputType="password"
          inputPlaceholder="Digite sua confirmação de nova senha"
          inputValue={passwordConfirm}
          onChangeInput={(textValue) => {
            setPasswordConfirm(textValue);
          }}
        />
        <ButtonContained
          text="Salvar"
          onAction={() => {
            void sendRedefinePassword();
          }}
        />
      </ContainerForm>
      <LinkRedirect
        descriptionUrl="Voltar ao perfil"
        onRedirect={() => {
          navigate("/profile", { replace: true });
        }}
      />
    </ContainerUpper>
  );
};

export default RedefinePassword;
