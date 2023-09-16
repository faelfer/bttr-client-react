import signUpScenario from "../support/signUpScenario";
import signInScenario from "../support/signInScenario";
import skillScenario from "../support/skillScenario";
import timeScenario from "../support/timeScenario";

const { test, expect } = require("@playwright/test");

const userFactory = require("../factories/userFactory");
const skillFactory = require("../factories/skillFactory");

test("deve inserir os dados do novo tempo com sucesso", async ({ page }) => {
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

  await page.getByText("Criar habilidade").click();

  const skill = await skillFactory();

  await skillScenario(page, skill);
  await page.getByText("Criar").click();

  const hasSkillSuccess = await page.getByText(
    "habilidade foi criada com sucesso.",
  );
  await expect(hasSkillSuccess).toBeVisible();

  await page.getByText("Voltar ao início").click();

  const hasSkillInHome = await page.getByText(skill.name);
  await expect(hasSkillInHome).toBeVisible();

  await page.getByRole("link", { name: "Tempo" }).click();

  await page.getByText("Criar tempo").click();

  await timeScenario(page, skill.name);
  await page.getByText("Criar").click();

  const hasTimeSuccess = await page.getByText("tempo foi criado com sucesso.");
  await expect(hasTimeSuccess).toBeVisible();
});

test("deve alterar os dados do tempo com sucesso", async ({ page }) => {
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

  await page.getByText("Criar habilidade").click();

  const skill = await skillFactory();

  await skillScenario(page, skill);
  await page.getByText("Criar").click();

  const hasSkillSuccess = await page.getByText(
    "habilidade foi criada com sucesso.",
  );
  await expect(hasSkillSuccess).toBeVisible();

  await page.getByText("Voltar ao início").click();

  const hasSkillInHome = await page.getByText(skill.name);
  await expect(hasSkillInHome).toBeVisible();

  await page.getByRole("link", { name: "Tempo" }).click();

  await page.getByText("Criar tempo").click();

  await timeScenario(page, skill.name);
  await page.getByText("Criar").click();

  const hasTimeSuccess = await page.getByText("tempo foi criado com sucesso.");
  await expect(hasTimeSuccess).toBeVisible();

  await page.getByText("Voltar ao histórico").click();
  await page.getByText("Editar").click();

  await timeScenario(page, skill.name);
  await page.getByText("Editar").click();

  const hasTimeUpdateSuccess = await page.getByText(
    "tempo alterado com sucesso.",
  );
  await expect(hasTimeUpdateSuccess).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar criar um tempo com o campo habilidade inválido", async ({
  page,
}) => {
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

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInScenario(page, user);

  await page.getByText("Criar habilidade").click();

  const skill = await skillFactory();

  await skillScenario(page, skill);
  await page.getByText("Criar").click();

  const hasSkillSuccess = await page.getByText(
    "habilidade foi criada com sucesso.",
  );
  await expect(hasSkillSuccess).toBeVisible();

  await page.getByText("Voltar ao início").click();

  const hasSkillInHome = await page.getByText(skill.name);
  await expect(hasSkillInHome).toBeVisible();

  await page.getByRole("link", { name: "Tempo" }).click();

  await page.getByText("Criar tempo").click();

  await timeScenario(page, skill.name);
  await page.getByText("Criar").click();

  const hasTimeSuccess = await page.getByText("tempo foi criado com sucesso.");
  await expect(hasTimeSuccess).toBeVisible();

  await page.getByText("Voltar ao histórico").click();
  await page.getByText("Editar").click();

  await timeScenario(page, "Selecione uma habilidade");
  await page.getByText("Editar").click();

  const hasTimeUpdateWrong = await page.getByText(
    "Campo habilidade é inválido",
  );
  await expect(hasTimeUpdateWrong).toBeVisible();
});
