import signUpScenario from '../support/signUpScenario';
import signInScenario from '../support/signInScenario';
import skillScenario from '../support/skillScenario';

const { test, expect } = require('@playwright/test');

const userFactory = require('../factories/userFactory');
const skillFactory = require('../factories/skillFactory');

test('deve criar uma habilidade com sucesso', async ({ page }) => {
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

  const hasSkillCreateSuccess = await page.getByText('habilidade foi criada com sucesso.');
  await expect(hasSkillCreateSuccess).toBeVisible();

  await page.getByText('Voltar ao início').click();
});

test('deve alterar os dados de uma habilidade com sucesso', async ({ page }) => {
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

  const hasSkillCreateSuccess = await page.getByText('habilidade foi criada com sucesso.');
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
});

test('deve excluir uma habilidade com sucesso', async ({ page }) => {
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

  const hasSkillCreateSuccess = await page.getByText('habilidade foi criada com sucesso.');
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
});

test('deve mostrar mensagem de erro ao tentar criar uma habilidade com o campo nome vazio', async ({ page }) => {
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
});

test('deve mostrar mensagem de erro ao tentar criar uma habilidade com o campo nome inválido', async ({ page }) => {
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
});

test('deve mostrar mensagem de erro ao tentar alterar uma habilidade com o campo nome vazio', async ({ page }) => {
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

  const hasSkillCreatedSuccess = await page.getByText('habilidade foi criada com sucesso.');
  await expect(hasSkillCreatedSuccess).toBeVisible();

  await page.getByText('Voltar ao início').click();

  const hasSkillSuccess = await page.getByText(skill.name);
  await expect(hasSkillSuccess).toBeVisible();

  await page.getByText('Editar').click();

  const skillUpdated = await skillFactory();
  skillUpdated.name = '';

  await skillScenario(page, skillUpdated);
  await page.getByText('Editar').click();

  const hasSkillUpdatedWrong = await page.getByText('Preencha o campo nome da habilidade');
  await expect(hasSkillUpdatedWrong).toBeVisible();
});
