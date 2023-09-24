/* eslint-disable no-undef */
import validateSignUp from "../validateSignUp";

test("deve retornar valor verdadeiro para o valor vazio do campo nome do usuário", () => {
  const emptyUsernameInputValues = {
    username: "",
    email: "",
    password: "" 
  }
  const desiredInvalidateUsername = {
    isInvalid: true,
    message: "Preencha o campo nome de usuário"
  }
  expect(validateSignUp(emptyUsernameInputValues)).toMatchObject(desiredInvalidateUsername);
});

test("deve retornar valor verdadeiro para a validação do campo nome do usuário", () => {
  const invalidateUsernameInputValues = {
    username: "t",
    email: "",
    password: "" 
  }
  const desiredInvalidateUsername = {
    isInvalid: true,
    message: "Campo nome de usuário é inválido"
  }
  expect(validateSignUp(invalidateUsernameInputValues)).toMatchObject(desiredInvalidateUsername);
});

test("deve retornar valor verdadeiro para o valor vazio do campo email", () => {
  const emptyEmailInputValues = {
    username: "testusername1",
    email: "",
    password: "" 
  }
  const desiredInvalidateEmail = {
    isInvalid: true,
    message: "Preencha o campo e-mail"
  }
  expect(validateSignUp(emptyEmailInputValues)).toMatchObject(desiredInvalidateEmail);
});

test("deve retornar valor verdadeiro para a validação do campo e-mail", () => {
  const invalidateEmailInputValues = {
    username: "testusername1",
    email: "testmail",
    password: "" 
  }
  const desiredInvalidateEmail = {
    isInvalid: true,
    message: "Campo e-mail é inválido"
  }
  expect(validateSignUp(invalidateEmailInputValues)).toMatchObject(desiredInvalidateEmail);
});

test("deve retornar valor verdadeiro para o valor vazio do campo senha", () => {
  const emptyPasswordInputValues = {
    username: "testusername1",
    email: "test@gmail.com",
    password: "" 
  }
  const desiredInvalidatePassword = {
    isInvalid: true,
    message: "Preencha o campo senha"
  }
  expect(validateSignUp(emptyPasswordInputValues)).toMatchObject(desiredInvalidatePassword);
});

test("deve retornar valor verdadeiro para a validação do campo senha", () => {
  const invalidatePasswordInputValues = {
    username: "testusername1",
    email: "test@gmail.com",
    password: "12345" 
  }
  const desiredInvalidatePassword = {
    isInvalid: true,
    message: "Campo senha deve conter número, símbolo, letra maiúscula e minúscula"
  }
  expect(validateSignUp(invalidatePasswordInputValues)).toMatchObject(desiredInvalidatePassword);
});

test("deve retornar valor verdadeiro para a quantia mínima de caracteres do campo senha", () => {
  const invalidatePasswordInputValues = {
    username: "testusername1",
    email: "test@gmail.com",
    password: "!Ab" 
  }
  const desiredInvalidatePassword = {
    isInvalid: true,
    message: "Campo senha deve conter no mínimo 4 caracteres"
  }
  expect(validateSignUp(invalidatePasswordInputValues)).toMatchObject(desiredInvalidatePassword);
});

test("deve retornar valor verdadeiro para a quantia máxima de caracteres do campo senha", () => {
  const invalidatePasswordInputValues = {
    username: "testusername1",
    email: "test@gmail.com",
    password: "!Ab1!Ab1!Ab1" 
  }
  const desiredInvalidatePassword = {
    isInvalid: true,
    message: "Campo senha deve conter no máximo 8 caracteres"
  }
  expect(validateSignUp(invalidatePasswordInputValues)).toMatchObject(desiredInvalidatePassword);
});
