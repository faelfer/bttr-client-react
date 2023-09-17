import isInvalidEmail from "../rules/isInvalidEmail";
import isInvalidPassword from "../rules/isInvalidPassword";

export default function validateSignUp(inputValues) {
  let message = "";
  const nameWithoutTrimValidate = inputValues.username.trim();
  const passwordLength = inputValues.password.length;
  if (!nameWithoutTrimValidate) {
    message = "Preencha o campo nome de usuário";
  } else if (nameWithoutTrimValidate.length < 2) {
    message = "Campo nome de usuário é inválido";
  } else if (!inputValues.email) {
    message = "Preencha o campo e-mail";
  } else if (isInvalidEmail(inputValues.email)) {
    message = "Campo e-mail é inválido";
  } else if (!inputValues.password) {
    message = "Preencha o campo senha";
  } else if (isInvalidPassword(inputValues.password)) {
    message =
      "Campo senha deve conter número, símbolo, letra maiúscula e minúscula";
  } else if (passwordLength < 4 || passwordLength > 8) {
    message = "Campo senha deve conter de 4 à 8 caracteres";
  }

  return { isInvalid: !!message, message };
}
