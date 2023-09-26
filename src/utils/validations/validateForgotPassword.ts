import isInvalidEmail from "../rules/isInvalidEmail";

interface InputValuesFunction {
  email: string;
}

interface ValidateForgotPasswordResult {
  isInvalid: boolean;
  message: string;
}

export default function validateForgotPassword(
  inputValues: InputValuesFunction,
): ValidateForgotPasswordResult {
  let message = "";
  if (inputValues.email.length === 0) {
    message = "Preencha o campo e-mail";
  } else if (isInvalidEmail(inputValues.email)) {
    message = "Campo e-mail é inválido";
  }

  return { isInvalid: message.length !== 0, message };
}
