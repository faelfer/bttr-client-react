import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import showToast from "../../utils/showToast";
import isInvalidPassword from "../../utils/rules/isInvalidPassword";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import HeaderForm from "../../components/HeaderForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import LinkRedirect from "../../components/LinkRedirect";
import ButtonContained from "../../components/ButtonContained";

import "./styles.css";

import { useRedefinePasswordMutation } from "../../services/user/api";

export default function RedefinePasswordForm() {
  const [password, setPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordNewConfirm, setPasswordNewConfirm] = useState("");

  const [redefinePassword, { isLoading }] = useRedefinePasswordMutation();

  const navigate = useNavigate();

  function validateRedefinePassword() {
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
    try {
      const responseValidateRedefinePassword = await validateRedefinePassword();
      if (responseValidateRedefinePassword.isInvalid) {
        showToast("Aviso", responseValidateRedefinePassword.message, "warning");
      } else {
        const payloadRedefinePassword = await redefinePassword({
          password,
          new_password: passwordNew,
        }).unwrap();
        showToast("Sucesso", payloadRedefinePassword.message, "success");
      }
    } catch (err) {
      showToast("Aviso", err.data.message, "error");
    }
  }

  return (
    <>
      <NavBar navigation={navigate} />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <HeaderForm title="Redefinir senha" />
          <InputOutlineForm
            inputType="password"
            inputPlaceholder="Digite sua senha atual"
            inputValue={password}
            onChangeInput={(textValue) => { setPassword(textValue); }}
          />
          <InputOutlineForm
            inputType="password"
            inputPlaceholder="Digite sua nova senha"
            inputValue={passwordNew}
            onChangeInput={(textValue) => { setPasswordNew(textValue); }}
          />
          <InputOutlineForm
            inputType="password"
            inputPlaceholder="Digite sua confirmação de nova senha"
            inputValue={passwordNewConfirm}
            onChangeInput={(textValue) => { setPasswordNewConfirm(textValue); }}
          />
          <ButtonContained
            text="Salvar"
            onAction={async () => { await sendRedefinePassword(); }}
          />
        </div>
        <LinkRedirect
          description=""
          descriptionUrl="Voltar ao perfil"
          onRedirect={() => { navigate("/profile", { replace: true }); }}
        />
      </div>
    </>
  );
}
