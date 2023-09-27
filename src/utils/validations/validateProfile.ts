import isInvalidEmail from "../rules/isInvalidEmail";

interface InputValuesFunction {
  username: string;
  email: string;
}

interface ValidateProfileResult {
  isInvalid: boolean;
  message: string;
}

export default function validateProfile(
  inputValues: InputValuesFunction,
): ValidateProfileResult {
  let message = "";
  const nameWithoutTrimValidate = inputValues.username.trim();
  if (nameWithoutTrimValidate.length === 0) {
    message = "Preencha o campo nome de usuário";
  } else if (nameWithoutTrimValidate.length < 2) {
    message = "Campo nome de usuário é inválido";
  } else if (inputValues.email.length === 0) {
    message = "Preencha o campo e-mail";
  } else if (isInvalidEmail(inputValues.email)) {
    message = "Campo e-mail é inválido";
  }

  return { isInvalid: message.length !== 0, message };
}
