import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import showToast from "../../utils/showToast";
import validateRedefinePassword from "../../utils/validations/validateRedefinePassword";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import HeaderForm from "../../components/HeaderForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import LinkRedirect from "../../components/LinkRedirect";
import ButtonContained from "../../components/ButtonContained";

import "./styles.css";

import { useRedefinePasswordMutation } from "../../services/user/api";

const RedefinePassword = (): JSX.Element => {
  const [password, setPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordNewConfirm, setPasswordNewConfirm] = useState("");

  const [redefinePassword, { isLoading }] = useRedefinePasswordMutation();

  const navigate = useNavigate();

  const sendRedefinePassword = async (): Promise<void> => {
    try {
      const responseValidateRedefinePassword = validateRedefinePassword({
        password,
        passwordNew,
        passwordNewConfirm,
      });
      if (responseValidateRedefinePassword.isInvalid) {
        showToast("Aviso", responseValidateRedefinePassword.message, "warning");
      } else {
        const payloadRedefinePassword = await redefinePassword({
          password,
          new_password: passwordNew,
        }).unwrap();
        showToast("Sucesso", payloadRedefinePassword.message, "success");
      }
    } catch (err: any) {
      showToast("Aviso", err.data.message, "error");
    }
  };

  return (
    <>
      <NavBar />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <HeaderForm title="Redefinir senha" />
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
            inputValue={passwordNewConfirm}
            onChangeInput={(textValue) => {
              setPasswordNewConfirm(textValue);
            }}
          />
          <ButtonContained
            text="Salvar"
            onAction={() => {
              void sendRedefinePassword();
            }}
          />
        </div>
        <LinkRedirect
          description=""
          descriptionUrl="Voltar ao perfil"
          onRedirect={() => {
            navigate("/profile", { replace: true });
          }}
        />
      </div>
    </>
  );
};

export default RedefinePassword;
