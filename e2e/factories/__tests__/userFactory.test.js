/* eslint-disable no-undef */
const userFactory = require("../userFactory");

const desiredUserDefault = require("../../../src/utils/resources/user_default.json");

test("deve retornar um objeto com os dados de um usuário padrão", () => {
  expect(userFactory(false)).toMatchObject(desiredUserDefault);
});

test("deve verificar as propriedades do objeto usuário padrão", async () => {
  const userDefault = await userFactory(false);
  expect(userDefault).toHaveProperty("username");
  expect(userDefault).toHaveProperty("email");
  expect(userDefault).toHaveProperty("password");
});

test("deve verificar os tipos do objeto usuário padrão", async () => {
  const userDefault = await userFactory(false);
  expect(typeof userDefault).toBe("object");
  expect(typeof userDefault.username).toBe("string");
  expect(typeof userDefault.email).toBe("string");
  expect(typeof userDefault.password).toBe("string");
});

test("deve verificar as propriedades do objeto usuário novo", async () => {
  const userNew = await userFactory();
  expect(userNew).toHaveProperty("username");
  expect(userNew).toHaveProperty("email");
  expect(userNew).toHaveProperty("password");
});

test("deve verificar os tipos do objeto usuário novo", async () => {
  const userNew = await userFactory();
  expect(typeof userNew).toBe("object");
  expect(typeof userNew.username).toBe("string");
  expect(typeof userNew.email).toBe("string");
  expect(typeof userNew.password).toBe("string");
});
