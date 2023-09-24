import isInvalidEmail from "../rules/isInvalidEmail";
import isInvalidPassword from "../rules/isInvalidPassword";

interface InputValuesFunction {
  username: string;
  email: string;
  password: string;
};

interface ValidateSignUpResult {
  isInvalid: boolean;
  message: string;
};

export default function validateSignUp(inputValues: InputValuesFunction): ValidateSignUpResult {
  let message = "";
  const nameWithoutTrimValidate = (inputValues.username).trim();
  const passwordLength = (inputValues.password).length;
  if (nameWithoutTrimValidate.length === 0) {
    message = "Preencha o campo nome de usuário";
  } else if (nameWithoutTrimValidate.length < 2) {
    message = "Campo nome de usuário é inválido";
  } else if ((inputValues.email).length === 0) {
    message = "Preencha o campo e-mail";
  } else if (isInvalidEmail(inputValues.email)) {
    message = "Campo e-mail é inválido";
  } else if ((inputValues.password).length === 0) {
    message = "Preencha o campo senha";
  } else if (passwordLength < 4) {
    message = "Campo senha deve conter no mínimo 4 caracteres";
  } else if (isInvalidPassword(inputValues.password)) {
    message =
      "Campo senha deve conter número, símbolo, letra maiúscula e minúscula";
  } else if (passwordLength > 8) {
    message = "Campo senha deve conter no máximo 8 caracteres";
  }

  return { isInvalid: message.length !== 0, message };
}
