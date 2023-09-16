import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import showToast from "../../utils/showToast";
import useRedirectAuth from "../../hooks/useRedirectAuth";

import Load from "../../components/Load";
import HeaderForm from "../../components/HeaderForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import LinkRedirect from "../../components/LinkRedirect";
import ButtonContained from "../../components/ButtonContained";
import ButtonTransparent from "../../components/ButtonTransparent";

import "./styles.css";

import { useSignInMutation } from "../../services/user/api";
import { setCredentials } from "../../services/user/reducer";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useRedirectAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signIn, { isLoading }] = useSignInMutation();

  function validateSignIn() {
    let message = "";
    if (!email) {
      message = "Preencha o campo e-mail";
    } else if (!password) {
      message = "Preencha o campo senha";
    }
    return { isInvalid: !!message, message };
  }

  async function sendSignIn() {
    const responseValidateSignIn = await validateSignIn();
    try {
      if (responseValidateSignIn.isInvalid) {
        showToast("Aviso", responseValidateSignIn.message, "warning");
      } else {
        const payload = await signIn({ email, password }).unwrap();
        dispatch(setCredentials(payload));
        navigate("/home", { replace: true });
      }
    } catch (err) {
      showToast("Aviso", err.data.message, "error");
    }
  }

  return (
    <div className="container">
      <Load isShow={isLoading} />
      <div className="form">
        <HeaderForm title="Bttr" />
        <InputOutlineForm
          inputType="email"
          inputPlaceholder="Insira seu e-mail"
          inputValue={email}
          onChangeInput={(textValue) => setEmail(textValue)}
        />
        <InputOutlineForm
          inputType="password"
          inputPlaceholder="Insira sua senha"
          inputValue={password}
          onChangeInput={(textValue) => setPassword(textValue)}
        />
        <ButtonContained text="Entrar" onAction={() => sendSignIn()} />
        <ButtonTransparent
          text="Esqueceu a senha?"
          onAction={() => navigate("/forgot-password", { replace: true })}
        />
      </div>
      <LinkRedirect
        description="Não tem uma conta? "
        descriptionUrl="Cadastre-se"
        onRedirect={() => navigate("/sign-up", { replace: true })}
      />
    </div>
  );
}
