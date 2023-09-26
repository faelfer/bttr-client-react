import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import showToast from "../../utils/showToast";
import validateSignIn from "../../utils/validations/validateSignIn";
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
    <div className="container">
      <Load isShow={isLoading} />
      <div className="form">
        <HeaderForm title="Bttr" />
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
          onAction={async () => {
            await sendSignIn();
          }}
        />
        <ButtonTransparent
          text="Esqueceu a senha?"
          onAction={() => {
            navigate("/forgot-password", { replace: true });
          }}
        />
      </div>
      <LinkRedirect
        description="Não tem uma conta? "
        descriptionUrl="Cadastre-se"
        onRedirect={() => {
          navigate("/sign-up", { replace: true });
        }}
      />
    </div>
  );
};

export default SignIn;
