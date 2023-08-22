import signUpScenario from '../support/signUpScenario';
import signInScenario from '../support/signInScenario';
import skillScenario from '../support/skillScenario';

const { test, expect, chromium } = require('@playwright/test');

const userFactory = require('../factories/userFactory');
const skillFactory = require('../factories/skillFactory');

test('deve inserir os dados da nova habilidade com sucesso', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory();

  await page.getByText('Cadastre-se').click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText('Conecte-se').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await signInScenario(page, user);

  await page.getByText('Criar habilidade').click();

  const skill = await skillFactory();

  await skillScenario(page, skill);
  await page.getByText('Criar').click();

  const hasSkillSuccess = await page.getByText('habilitade foi criada com sucesso.');
  await expect(hasSkillSuccess).toBeVisible();

  await page.getByText('Voltar ao início').click();

  const hasSkillInHome = await page.getByText(skill.name);
  await expect(hasSkillInHome).toBeVisible();

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve alterar os dados de uma habilidade com sucesso', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory();

  await page.getByText('Cadastre-se').click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText('Conecte-se').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await signInScenario(page, user);

  await page.getByText('Criar habilidade').click();

  const skill = await skillFactory();

  await skillScenario(page, skill);
  await page.getByText('Criar').click();

  const hasSkillCreateSuccess = await page.getByText('habilitade foi criada com sucesso.');
  await expect(hasSkillCreateSuccess).toBeVisible();

  await page.getByText('Voltar ao início').click();

  const hasSkillSuccess = await page.getByText(skill.name);
  await expect(hasSkillSuccess).toBeVisible();

  await page.getByText('Editar').click();

  const skillUpdate = await skillFactory();

  await skillScenario(page, skillUpdate);
  await page.getByText('Editar').click();

  const hasSkillUpdateSuccess = await page.getByText('habilidade alterada com sucesso.');
  await expect(hasSkillUpdateSuccess).toBeVisible();

  await page.getByText('Voltar ao início').click();

  const hasSkillUpdatedInHome = await page.getByText(skillUpdate.name);
  await expect(hasSkillUpdatedInHome).toBeVisible();

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve excluir uma habilidade com sucesso', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory();

  await page.getByText('Cadastre-se').click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText('Conecte-se').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await signInScenario(page, user);

  await page.getByText('Criar habilidade').click();

  const skill = await skillFactory();

  await skillScenario(page, skill);
  await page.getByText('Criar').click();

  const hasSkillCreateSuccess = await page.getByText('habilitade foi criada com sucesso.');
  await expect(hasSkillCreateSuccess).toBeVisible();

  await page.getByText('Voltar ao início').click();

  const hasSkillSuccess = await page.getByText(skill.name);
  await expect(hasSkillSuccess).toBeVisible();

  await page.getByText('Editar').click();

  await page.getByText('Apagar').click();

  const hasSkillUpdateSuccess = await page.getByText('habilidade excluida com sucesso.');
  await expect(hasSkillUpdateSuccess).toBeVisible();

  await page.getByText('Voltar ao início').click();

  const hasSkillUpdatedInHome = await page.getByText(skill.name);
  await expect(hasSkillUpdatedInHome).not.toBeVisible();

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar criar uma habilidade com o campo nome vazio', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory();

  await page.getByText('Cadastre-se').click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText('Conecte-se').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await signInScenario(page, user);

  await page.getByText('Criar habilidade').click();

  const skill = await skillFactory();
  skill.name = '';

  await skillScenario(page, skill);
  await page.getByText('Criar').click();

  const hasSkillSuccess = await page.getByText('Preencha o campo nome da habilidade');
  await expect(hasSkillSuccess).toBeVisible();

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar criar uma habilidade com o campo nome inválido', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory();

  await page.getByText('Cadastre-se').click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText('Conecte-se').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await signInScenario(page, user);

  await page.getByText('Criar habilidade').click();

  const skill = await skillFactory();
  skill.name = 'ha';

  await skillScenario(page, skill);
  await page.getByText('Criar').click();

  const hasSkillSuccess = await page.getByText('Campo nome da habilidade é inválido');
  await expect(hasSkillSuccess).toBeVisible();

  await context.close();
  // Make sure to await close, so that videos are saved.
});
