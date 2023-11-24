import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import showToast from "../../utils/showToast";
import validateProfile from "../../utils/validations/validateProfile";

import ContainerUpper from "../../components/ContainerUpper";
import ContainerForm from "../../components/ContainerForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined";
import ButtonTransparent from "../../components/ButtonTransparent";
import LinkRedirect from "../../components/LinkRedirect";

import {
  useProfileMutation,
  useProfileUpdateMutation,
  useProfileDeleteMutation,
} from "../../services/user/api";
import { setCredentials } from "../../services/user/reducer";

const Profile = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [profile, { isLoading }] = useProfileMutation();
  const [profileUpdate, { isLoading: isUpdating }] = useProfileUpdateMutation();
  const [profileDelete, { isLoading: isDeleting }] = useProfileDeleteMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const getProfile = async (): Promise<void> => {
    try {
      const payload = await profile(null).unwrap();
      setUsername(payload.user.username);
      setEmail(payload.user.email);
    } catch {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
    }
  };

  useEffect(() => {
    void getProfile();
  }, [location]);

  const goOut = (): void => {
    dispatch(setCredentials({ token: null }));
    navigate("/", { replace: true });
  };

  const sendProfileUpdate = async (): Promise<void> => {
    try {
      const responseValidateProfileUpdate = validateProfile({
        username,
        email,
      });
      if (responseValidateProfileUpdate.isInvalid) {
        showToast("Aviso", responseValidateProfileUpdate.message, "warning");
      } else {
        const payloadProfileUpdate = await profileUpdate({
          username,
          email,
        }).unwrap();
        showToast("Sucesso", payloadProfileUpdate.message, "success");
      }
    } catch (err: any) {
      showToast("Aviso", err.data.message, "error");
    }
  };

  const sendProfileDelete = async (): Promise<void> => {
    try {
      const payloadProfileDelete = await profileDelete(null).unwrap();
      showToast("Sucesso", payloadProfileDelete.message, "success");
      goOut();
    } catch {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
    }
  };

  return (
    <ContainerUpper isRefreshing={isLoading || isUpdating || isDeleting}>
      <ContainerForm heading="Perfil" subtitle="Edite suas informações.">
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
        <ButtonContained
          text="Salvar"
          onAction={() => {
            void sendProfileUpdate();
          }}
        />
        <ButtonOutlined
          text="Apagar"
          onAction={() => {
            void sendProfileDelete();
          }}
        />
        <ButtonTransparent
          text="Sair"
          onAction={() => {
            goOut();
          }}
        />
      </ContainerForm>
      <LinkRedirect
        description=""
        descriptionUrl="Redefinir a senha"
        onRedirect={() => {
          navigate("/redefine-password", { replace: true });
        }}
      />
    </ContainerUpper>
  );
};

export default Profile;
