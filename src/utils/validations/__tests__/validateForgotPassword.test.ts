/* eslint-disable no-undef */
import validateForgotPassword from "../validateForgotPassword";

test("deve retornar valor verdadeiro para o valor vazio do campo email", () => {
  const emptyEmailInputValues = { email: "" }
  const desiredEmptyEmail = {
    isInvalid: true,
    message: "Preencha o campo e-mail"
  }
  expect(validateForgotPassword(emptyEmailInputValues)).toMatchObject(desiredEmptyEmail);
});

test("deve retornar valor verdadeiro para a validação do campo e-mail", () => {
  const invalidateEmailInputValues = { email: "testmail" }
  const desiredInvalidateEmail = {
    isInvalid: true,
    message: "Campo e-mail é inválido"
  }
  expect(validateForgotPassword(invalidateEmailInputValues)).toMatchObject(desiredInvalidateEmail);
});

test("deve retornar valor falso para a validação", () => {
  const validateEmailInputValues = { email: "test@mail.com" }
  const desiredValidateEmail = {
    isInvalid: false,
    message: ""
  }
  expect(validateForgotPassword(validateEmailInputValues)).toMatchObject(desiredValidateEmail);
});
