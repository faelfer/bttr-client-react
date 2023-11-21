import signUpScenario from "../support/signUpScenario";
import signInScenario from "../support/signInScenario";
import profileScenario from "../support/profileScenario";
import {
  signUpSucessMock,
  signInSucessMock,
  profileSucessMock,
  profileUpdateSucessMock,
  profileUpdateAlreadyExistUsernameMock,
  profileUpdateAlreadyExistEmailMock,
  profileDeleteSucessMock,
} from "../mock/user";

const { test, expect } = require("@playwright/test");

const userFactory = require("../factories/userFactory");

test("deve alterar os dados do usuário com sucesso", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await page.getByText("Cadastre-se").click();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  const userUpdate = await userFactory();

  await signInSucessMock(page, user);

  await signInScenario(page, user);

  await profileSucessMock(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();

  await profileUpdateSucessMock(page);

  await profileScenario(page, userUpdate);

  const hasProfileSuccess = await page.getByText(
    "perfil alterado com sucesso.",
  );
  await expect(hasProfileSuccess).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar alterar um usuário com o campo nome vazio", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  await page.getByText("Cadastre-se").click();

  const user = await userFactory();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInSucessMock(page, user);

  await signInScenario(page, user);

  await profileSucessMock(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();
  user.username = "";

  await profileScenario(page, user);

  const hasProfileSuccess = await page.getByText(
    "Preencha o campo nome de usuário",
  );
  await expect(hasProfileSuccess).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar alterar um usuário com o campo nome inválido", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  await page.getByText("Cadastre-se").click();

  const user = await userFactory();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInSucessMock(page, user);

  await signInScenario(page, user);

  await profileSucessMock(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();
  user.username = "a";

  await profileScenario(page, user);

  const hasProfileSuccess = await page.getByText(
    "Campo nome de usuário é inválido",
  );
  await expect(hasProfileSuccess).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar alterar um usuário com o campo nome já existente", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const userAlreadyExisting = await userFactory();

  await page.getByText("Cadastre-se").click();

  await signUpSucessMock(page);

  await signUpScenario(page, userAlreadyExisting);

  const hasSignUpSuccess1 = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess1).toBeVisible();

  await page.getByText("Conecte-se").click();
  await page.getByText("Cadastre-se").click();

  const user = await userFactory();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess2 = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess2).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInSucessMock(page, user);

  await signInScenario(page, user);

  await profileSucessMock(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();
  user.username = userAlreadyExisting.username;

  await profileUpdateAlreadyExistUsernameMock(page);

  await profileScenario(page, user);

  const hasProfileSuccess = await page.getByText(
    "nome de usuário já existente.",
  );
  await expect(hasProfileSuccess).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar alterar um usuário com o campo e-mail já existente", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const userAlreadyExisting = await userFactory();

  await page.getByText("Cadastre-se").click();

  await signUpSucessMock(page);

  await signUpScenario(page, userAlreadyExisting);

  const hasSignUpSuccess1 = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess1).toBeVisible();

  await page.getByText("Conecte-se").click();
  await page.getByText("Cadastre-se").click();

  const user = await userFactory();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess2 = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess2).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInSucessMock(page, user);

  await signInScenario(page, user);

  await profileSucessMock(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();
  user.email = userAlreadyExisting.email;

  await profileUpdateAlreadyExistEmailMock(page);

  await profileScenario(page, user);

  const hasProfileSuccess = await page.getByText(
    "usuário com e-mail já existente.",
  );
  await expect(hasProfileSuccess).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar alterar um usuário com o campo email vazio", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  await page.getByText("Cadastre-se").click();

  const user = await userFactory();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInSucessMock(page, user);

  await signInScenario(page, user);

  await profileSucessMock(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();
  user.email = "";

  await profileScenario(page, user);

  const hasProfileSuccess = await page.getByText("Preencha o campo e-mail");
  await expect(hasProfileSuccess).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar alterar um usuário com o campo email inválido", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  await page.getByText("Cadastre-se").click();

  const user = await userFactory();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInSucessMock(page, user);

  await signInScenario(page, user);

  await profileSucessMock(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();
  user.email = "abc";

  await profileScenario(page, user);

  const hasProfileSuccess = await page.getByText("Campo e-mail é inválido");
  await expect(hasProfileSuccess).toBeVisible();
});

test("deve realizar logout do usuário com sucesso", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await page.getByText("Cadastre-se").click();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInSucessMock(page, user);

  await signInScenario(page, user);

  await profileSucessMock(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();

  await expect(page).toHaveURL("http://localhost:3000/profile");

  await page.getByText("Sair").click();

  await expect(page).toHaveURL("http://localhost:3000/");
});

test("deve apagar o usuário com sucesso", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await page.getByText("Cadastre-se").click();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInSucessMock(page, user);

  await signInScenario(page, user);

  await profileSucessMock(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();

  await expect(page).toHaveURL("http://localhost:3000/profile");

  await profileDeleteSucessMock(page);

  await page.getByText("Apagar").click();

  await expect(page).toHaveURL("http://localhost:3000/");
});
