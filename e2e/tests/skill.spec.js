import signUpScenario from "../support/signUpScenario";
import signInScenario from "../support/signInScenario";
import skillScenario from "../support/skillScenario";
import { signUpSucessMock, signInSucessMock } from "../mock/user";
import {
  skillsByPageSucessMock,
  createSkillSucessMock,
  skillByIdSucessMock,
  updateSkillByIdSucessMock,
  deleteSkillByIdSucessMock,
} from "../mock/skill";

const { test, expect } = require("@playwright/test");

const userFactory = require("../factories/userFactory");
const skillFactory = require("../factories/skillFactory");

test("deve criar uma habilidade com sucesso", async ({ page }) => {
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

  await skillsByPageSucessMock(page, []);

  await signInScenario(page, user);

  await page.getByText("Criar habilidade").click();

  const skill = await skillFactory();

  await createSkillSucessMock(page);

  await skillScenario(page, skill);
  await page.getByText("Criar").click();

  const hasSkillCreateSuccess = await page.getByText(
    "habilidade foi criada com sucesso.",
  );
  await expect(hasSkillCreateSuccess).toBeVisible();

  await skillsByPageSucessMock(page, [skill]);

  await page.getByText("Voltar ao início").click();
});

test("deve alterar os dados de uma habilidade com sucesso", async ({
  page,
}) => {
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

  await skillsByPageSucessMock(page, []);

  await signInScenario(page, user);

  await page.getByText("Criar habilidade").click();

  const skill = await skillFactory();

  await createSkillSucessMock(page);

  await skillScenario(page, skill);
  await page.getByText("Criar").click();

  const hasSkillCreateSuccess = await page.getByText(
    "habilidade foi criada com sucesso.",
  );
  await expect(hasSkillCreateSuccess).toBeVisible();

  await skillsByPageSucessMock(page, [skill]);

  await page.getByText("Voltar ao início").click();

  const hasSkillSuccess = await page.getByText(skill.name);
  await expect(hasSkillSuccess).toBeVisible();

  await skillByIdSucessMock(page, skill);

  await page.getByText("Editar").click();

  const skillUpdate = await skillFactory();

  await updateSkillByIdSucessMock(page, skill.id);

  await skillScenario(page, skillUpdate);
  await page.getByText("Editar").click();

  const hasSkillUpdateSuccess = await page.getByText(
    "habilidade alterada com sucesso.",
  );
  await expect(hasSkillUpdateSuccess).toBeVisible();

  await skillsByPageSucessMock(page, [skillUpdate]);

  await page.getByText("Voltar ao início").click();

  const hasSkillUpdatedInHome = await page.getByText(skillUpdate.name);
  await expect(hasSkillUpdatedInHome).toBeVisible();
});

test("deve excluir uma habilidade com sucesso", async ({ page }) => {
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

  await skillsByPageSucessMock(page, []);

  await signInScenario(page, user);

  await page.getByText("Criar habilidade").click();

  const skill = await skillFactory();

  await createSkillSucessMock(page);

  await skillScenario(page, skill);
  await page.getByText("Criar").click();

  const hasSkillCreateSuccess = await page.getByText(
    "habilidade foi criada com sucesso.",
  );
  await expect(hasSkillCreateSuccess).toBeVisible();

  await skillsByPageSucessMock(page, [skill]);

  await page.getByText("Voltar ao início").click();

  const hasSkillSuccess = await page.getByText(skill.name);
  await expect(hasSkillSuccess).toBeVisible();

  await skillByIdSucessMock(page, skill);

  await page.getByText("Editar").click();

  await deleteSkillByIdSucessMock(page, skill.id);

  await page.getByText("Apagar").click();

  const hasSkillUpdateSuccess = await page.getByText(
    "habilidade excluida com sucesso.",
  );
  await expect(hasSkillUpdateSuccess).toBeVisible();

  await skillsByPageSucessMock(page, []);

  await page.getByText("Voltar ao início").click();

  const hasSkillUpdatedInHome = await page.getByText(skill.name);
  await expect(hasSkillUpdatedInHome).not.toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar criar uma habilidade com o campo nome vazio", async ({
  page,
}) => {
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

  await skillsByPageSucessMock(page, []);

  await signInScenario(page, user);

  await page.getByText("Criar habilidade").click();

  const skill = await skillFactory();
  skill.name = "";

  await skillScenario(page, skill);
  await page.getByText("Criar").click();

  const hasSkillValidateNameEmpty = await page.getByText(
    "Preencha o campo habilidade",
  );
  await expect(hasSkillValidateNameEmpty).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar criar uma habilidade com o campo nome inválido", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await signUpSucessMock(page);

  await page.getByText("Cadastre-se").click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInSucessMock(page, user);

  await skillsByPageSucessMock(page, []);

  await signInScenario(page, user);

  await page.getByText("Criar habilidade").click();

  const skill = await skillFactory();
  skill.name = "h";

  await skillScenario(page, skill);
  await page.getByText("Criar").click();

  const hasSkillValidateNameWrong = await page.getByText(
    "Campo habilidade é inválido",
  );
  await expect(hasSkillValidateNameWrong).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar alterar uma habilidade com o campo nome vazio", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await signUpSucessMock(page);

  await page.getByText("Cadastre-se").click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInSucessMock(page, user);

  await skillsByPageSucessMock(page, []);

  await signInScenario(page, user);

  await page.getByText("Criar habilidade").click();

  const skill = await skillFactory();

  await createSkillSucessMock(page);

  await skillScenario(page, skill);
  await page.getByText("Criar").click();

  const hasSkillCreatedSuccess = await page.getByText(
    "habilidade foi criada com sucesso.",
  );
  await expect(hasSkillCreatedSuccess).toBeVisible();

  await skillsByPageSucessMock(page, [skill]);

  await page.getByText("Voltar ao início").click();

  const hasSkillSuccess = await page.getByText(skill.name);
  await expect(hasSkillSuccess).toBeVisible();

  await skillByIdSucessMock(page, skill);

  await page.getByText("Editar").click();

  const skillUpdated = await skillFactory();
  skillUpdated.name = "";

  await skillScenario(page, skillUpdated);
  await page.getByText("Editar").click();

  const hasSkillUpdateValidateNameEmpty = await page.getByText(
    "Preencha o campo habilidade",
  );
  await expect(hasSkillUpdateValidateNameEmpty).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar alterar uma habilidade com o campo nome inválido", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await signUpSucessMock(page);

  await page.getByText("Cadastre-se").click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInSucessMock(page, user);

  await skillsByPageSucessMock(page, []);

  await signInScenario(page, user);

  await page.getByText("Criar habilidade").click();

  const skill = await skillFactory();

  await createSkillSucessMock(page);

  await skillScenario(page, skill);
  await page.getByText("Criar").click();

  const hasSkillCreatedSuccess = await page.getByText(
    "habilidade foi criada com sucesso.",
  );
  await expect(hasSkillCreatedSuccess).toBeVisible();

  await skillsByPageSucessMock(page, [skill]);

  await page.getByText("Voltar ao início").click();

  const hasSkillSuccess = await page.getByText(skill.name);
  await expect(hasSkillSuccess).toBeVisible();

  await skillByIdSucessMock(page, skill);

  await page.getByText("Editar").click();

  const skillUpdated = await skillFactory();
  skillUpdated.name = "";

  await skillScenario(page, skillUpdated);
  await page.getByText("Editar").click();

  const hasSkillUpdateValidateNameEmpty = await page.getByText(
    "Preencha o campo habilidade",
  );
  await expect(hasSkillUpdateValidateNameEmpty).toBeVisible();
});
