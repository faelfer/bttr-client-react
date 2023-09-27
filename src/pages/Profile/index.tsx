import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import showToast from "../../utils/showToast";
import validateProfile from "../../utils/validations/validateProfile";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import HeaderForm from "../../components/HeaderForm";
import DescriptionForm from "../../components/DescriptionForm";
import InputOutlineForm from "../../components/InputOutlineForm";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined";
import ButtonTransparent from "../../components/ButtonTransparent";
import LinkRedirect from "../../components/LinkRedirect";

import "./styles.css";

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
      const payload = await profile().unwrap();
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

  const logout = (): void => {
    dispatch(setCredentials({ token: null }));
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
      const payloadProfileDelete = await profileDelete().unwrap();
      showToast("Sucesso", payloadProfileDelete.message, "success");
      logout();
      navigate("/", { replace: true });
    } catch {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
    }
  };

  const exit = (): void => {
    try {
      logout();
      navigate("/", { replace: true });
    } catch {
      showToast(
        "Aviso",
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
        "error",
      );
    }
  };

  return (
    <>
      <NavBar />
      <Load isShow={isLoading || isUpdating || isDeleting} />
      <div className="content--align">
        <div className="form">
          <HeaderForm title="Perfil" />
          <DescriptionForm description="Edite suas informações." />
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
              exit();
            }}
          />
        </div>
        <LinkRedirect
          description=""
          descriptionUrl="Redefinir a senha"
          onRedirect={() => {
            navigate("/redefine-password", { replace: true });
          }}
        />
      </div>
    </>
  );
};

export default Profile;
