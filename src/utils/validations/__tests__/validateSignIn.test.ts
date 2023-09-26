/* eslint-disable no-undef */
import validateSignIn from "../validateSignIn";

test("deve retornar valor verdadeiro para o valor vazio do campo email", () => {
  const emptyEmailInputValues = { email: "", password: "" };
  const desiredEmptyEmail = {
    isInvalid: true,
    message: "Preencha o campo e-mail",
  };
  expect(validateSignIn(emptyEmailInputValues)).toMatchObject(
    desiredEmptyEmail,
  );
});

test("deve retornar valor verdadeiro para o valor vazio do campo senha", () => {
  const emptyPasswordInputValues = { email: "test@email.com", password: "" };
  const desiredInvalidatePassword = {
    isInvalid: true,
    message: "Preencha o campo senha",
  };
  expect(validateSignIn(emptyPasswordInputValues)).toMatchObject(
    desiredInvalidatePassword,
  );
});

test("deve retornar valor falso para a validação", () => {
  const validateInputValues = { email: "test@email.com", password: "!Ab1234" };
  const desiredValidate = {
    isInvalid: false,
    message: "",
  };
  expect(validateSignIn(validateInputValues)).toMatchObject(desiredValidate);
});
