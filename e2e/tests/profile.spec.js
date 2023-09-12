import signUpScenario from "../support/signUpScenario";
import signInScenario from "../support/signInScenario";
import profileScenario from "../support/profileScenario";

const { test, expect } = require("@playwright/test");

const userFactory = require("../factories/userFactory");

test("deve alterar os dados do usuário login com sucesso", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await page.getByText("Cadastre-se").click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  const userUpdate = await userFactory();

  await signInScenario(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();

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

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInScenario(page, user);

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

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInScenario(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();
  user.username = "ab";

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

  await signUpScenario(page, userAlreadyExisting);

  const hasSignUpSuccess1 = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess1).toBeVisible();

  await page.getByText("Conecte-se").click();
  await page.getByText("Cadastre-se").click();

  const user = await userFactory();

  await signUpScenario(page, user);

  const hasSignUpSuccess2 = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess2).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInScenario(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();
  user.username = userAlreadyExisting.username;

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

  await signUpScenario(page, userAlreadyExisting);

  const hasSignUpSuccess1 = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess1).toBeVisible();

  await page.getByText("Conecte-se").click();
  await page.getByText("Cadastre-se").click();

  const user = await userFactory();

  await signUpScenario(page, user);

  const hasSignUpSuccess2 = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess2).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInScenario(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();
  user.email = userAlreadyExisting.email;

  await profileScenario(page, user);

  const hasProfileSuccess = await page.getByText(
    "usuário com e-mail já existente",
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

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInScenario(page, user);

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

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInScenario(page, user);

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

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInScenario(page, user);

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

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInScenario(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();

  await expect(page).toHaveURL("http://localhost:3000/profile");

  await page.getByText("Apagar").click();

  await expect(page).toHaveURL("http://localhost:3000/");
});
