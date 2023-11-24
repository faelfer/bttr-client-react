import isInvalidPassword from "../rules/isInvalidPassword";

interface InputValuesFunction {
  password: string;
  passwordNew: string;
  passwordNewConfirm: string;
}

interface ValidateRedefinePasswordResult {
  isInvalid: boolean;
  message: string;
}

export default function validateRedefinePassword(
  inputValues: InputValuesFunction,
): ValidateRedefinePasswordResult {
  let message = "";

  const passwordLength = inputValues.password.length;
  const passwordNewLength = inputValues.passwordNew.length;
  const passwordNewConfirmLength = inputValues.passwordNewConfirm.length;
  if (passwordLength === 0) {
    message = "Preencha o campo senha atual";
  } else if (passwordNewLength === 0) {
    message = "Preencha o campo nova senha";
  } else if (passwordNewLength < 4) {
    message = "Campo nova senha deve conter no mínimo 4 caracteres";
  } else if (isInvalidPassword(inputValues.passwordNew)) {
    message =
      "Campo nova senha deve conter número, símbolo, letra maiúscula e minúscula";
  } else if (inputValues.password === inputValues.passwordNew) {
    message = "Campos senha atual e nova senha devem ser diferentes";
  } else if (passwordNewConfirmLength === 0) {
    message = "Preencha o campo confirmar nova senha";
  } else if (passwordNewConfirmLength < 4) {
    message = "Campo confirmar nova senha é inválido";
  } else if (inputValues.passwordNew !== inputValues.passwordNewConfirm) {
    message = "Os campos nova senha e confirmar nova senha devem ser iguais";
  }

  return { isInvalid: message.length !== 0, message };
}
