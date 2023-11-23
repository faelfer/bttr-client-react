import signUpScenario from "../support/signUpScenario";
import signInScenario from "../support/signInScenario";
import skillScenario from "../support/skillScenario";
import timeScenario from "../support/timeScenario";
import { signUpSucessMock, signInSucessMock } from "../mock/user";
import {
  skillsByPageSucessMock,
  createSkillSucessMock,
  skillsFromUserSucessMock,
} from "../mock/skill";
import {
  createTimeSucessMock,
  timeByIdSucessMock,
  timesByPageSucessMock,
  updateTimeByIdSucessMock,
  deleteTimeByIdSucessMock,
} from "../mock/time";

const { test, expect } = require("@playwright/test");

const userFactory = require("../factories/userFactory");
const skillFactory = require("../factories/skillFactory");
const timeFactory = require("../factories/timeFactory");

test("deve inserir os dados do novo tempo com sucesso", async ({ page }) => {
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

  const hasSkillSuccess = await page.getByText(
    "habilidade foi criada com sucesso.",
  );
  await expect(hasSkillSuccess).toBeVisible();

  await skillsByPageSucessMock(page, [skill]);

  await page.getByText("Voltar ao início").click();

  const hasSkillInHome = await page.getByText(skill.name);
  await expect(hasSkillInHome).toBeVisible();

  await timesByPageSucessMock(page, []);

  await page.getByRole("link", { name: "Tempo" }).click();

  await skillsFromUserSucessMock(page, [skill]);

  await page.getByText("Criar tempo").click();

  const time = await timeFactory(true, skill.id);

  await createTimeSucessMock(page);

  await timeScenario(page, time);
  await page.getByText("Criar").click();

  const hasTimeSuccess = await page.getByText("tempo foi criado com sucesso.");
  await expect(hasTimeSuccess).toBeVisible();
});

test("deve alterar os dados do tempo com sucesso", async ({ page }) => {
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

  const hasSkillSuccess = await page.getByText(
    "habilidade foi criada com sucesso.",
  );
  await expect(hasSkillSuccess).toBeVisible();

  await skillsByPageSucessMock(page, [skill]);

  await page.getByText("Voltar ao início").click();

  const hasSkillInHome = await page.getByText(skill.name);
  await expect(hasSkillInHome).toBeVisible();

  await timesByPageSucessMock(page, []);

  await page.getByRole("link", { name: "Tempo" }).click();

  await skillsFromUserSucessMock(page, [skill]);

  await page.getByText("Criar tempo").click();

  const time = await timeFactory(true, skill.id);

  await createTimeSucessMock(page);

  await timeScenario(page, time);
  await page.getByText("Criar").click();

  const hasTimeSuccess = await page.getByText("tempo foi criado com sucesso.");
  await expect(hasTimeSuccess).toBeVisible();

  await timesByPageSucessMock(page, [time]);

  await page.getByText("Voltar ao histórico").click();

  await timeByIdSucessMock(page, time);

  await page.getByText("Editar").click();

  const timeUpdated = await timeFactory(true, skill.id);

  await updateTimeByIdSucessMock(page, time.id);

  await timeScenario(page, timeUpdated);

  await page.getByText("Editar").click();

  const hasTimeUpdateSuccess = await page.getByText(
    "tempo alterado com sucesso.",
  );
  await expect(hasTimeUpdateSuccess).toBeVisible();
});

test("deve excluir um tempo com sucesso", async ({ page }) => {
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

  const hasSkillSuccess = await page.getByText(
    "habilidade foi criada com sucesso.",
  );
  await expect(hasSkillSuccess).toBeVisible();

  await skillsByPageSucessMock(page, [skill]);

  await page.getByText("Voltar ao início").click();

  const hasSkillInHome = await page.getByText(skill.name);
  await expect(hasSkillInHome).toBeVisible();

  await timesByPageSucessMock(page, []);

  await page.getByRole("link", { name: "Tempo" }).click();

  await skillsFromUserSucessMock(page, [skill]);

  await page.getByText("Criar tempo").click();

  const time = await timeFactory(true, skill.id);

  await createTimeSucessMock(page);

  await timeScenario(page, time);
  await page.getByText("Criar").click();

  const hasTimeSuccess = await page.getByText("tempo foi criado com sucesso.");
  await expect(hasTimeSuccess).toBeVisible();

  await timesByPageSucessMock(page, [time]);

  await page.getByText("Voltar ao histórico").click();

  await timeByIdSucessMock(page, time);

  await page.getByText("Editar").click();

  await deleteTimeByIdSucessMock(page, time.id);

  await page.getByText("Apagar").click();

  const hasTimeDeleteSuccess = await page.getByText(
    "tempo excluido com sucesso.",
  );
  await expect(hasTimeDeleteSuccess).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar criar um tempo com o campo habilidade inválido", async ({
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

  await timesByPageSucessMock(page, []);

  await page.getByRole("link", { name: "Tempo" }).click();

  await page.getByText("Criar tempo").click();

  await page.getByText("Criar").click();

  const hasTimeWrong = await page.getByText("Campo habilidade é inválido");
  await expect(hasTimeWrong).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar alterar um tempo com o campo habilidade inválido", async ({
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

  const hasSkillSuccess = await page.getByText(
    "habilidade foi criada com sucesso.",
  );
  await expect(hasSkillSuccess).toBeVisible();

  await skillsByPageSucessMock(page, [skill]);

  await page.getByText("Voltar ao início").click();

  const hasSkillInHome = await page.getByText(skill.name);
  await expect(hasSkillInHome).toBeVisible();

  await timesByPageSucessMock(page, []);

  await page.getByRole("link", { name: "Tempo" }).click();

  await skillsFromUserSucessMock(page, [skill]);

  await page.getByText("Criar tempo").click();

  const time = await timeFactory(true, skill.id);

  await createTimeSucessMock(page);

  await timeScenario(page, time);
  await page.getByText("Criar").click();

  const hasTimeSuccess = await page.getByText("tempo foi criado com sucesso.");
  await expect(hasTimeSuccess).toBeVisible();

  await timesByPageSucessMock(page, [time]);

  await page.getByText("Voltar ao histórico").click();

  await timeByIdSucessMock(page, time);

  await page.getByText("Editar").click();

  const timeUpdated = await timeFactory(true, "");

  await timeScenario(page, timeUpdated);

  await page.getByText("Editar").click();

  const hasTimeUpdateWrong = await page.getByText(
    "Campo habilidade é inválido",
  );
  await expect(hasTimeUpdateWrong).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar alterar um tempo com o campo minutos inválido", async ({
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

  const hasSkillSuccess = await page.getByText(
    "habilidade foi criada com sucesso.",
  );
  await expect(hasSkillSuccess).toBeVisible();

  await skillsByPageSucessMock(page, [skill]);

  await page.getByText("Voltar ao início").click();

  const hasSkillInHome = await page.getByText(skill.name);
  await expect(hasSkillInHome).toBeVisible();

  await timesByPageSucessMock(page, []);

  await page.getByRole("link", { name: "Tempo" }).click();

  await skillsFromUserSucessMock(page, [skill]);

  await page.getByText("Criar tempo").click();

  const time = await timeFactory(true, skill.id);

  await createTimeSucessMock(page);

  await timeScenario(page, time);
  await page.getByText("Criar").click();

  const hasTimeSuccess = await page.getByText("tempo foi criado com sucesso.");
  await expect(hasTimeSuccess).toBeVisible();

  await timesByPageSucessMock(page, [time]);

  await page.getByText("Voltar ao histórico").click();

  await timeByIdSucessMock(page, time);

  await page.getByText("Editar").click();

  const timeUpdated = await timeFactory(true, skill.id);
  timeUpdated.minutes = "";
  await timeScenario(page, timeUpdated);

  await page.getByText("Editar").click();

  const hasTimeUpdateWrong = await page.getByText("Preencha o campo minutos");
  await expect(hasTimeUpdateWrong).toBeVisible();
});
