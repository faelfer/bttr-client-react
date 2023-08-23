import signUpScenario from '../support/signUpScenario';
import signInScenario from '../support/signInScenario';
import redefinePasswordScenario from '../support/redefinePasswordScenario';

const { test, expect } = require('@playwright/test');

const userFactory = require('../factories/userFactory');

test('deve alterar a senha do usuário com sucesso', async ({ page }) => {
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

  await page.getByRole('link', { name: 'Perfil' }).click();

  await page.getByText('Redefinir a senha').click();
  user.newPassword = '!Bc2!Bc2';
  user.confirmNewPassword = '!Bc2!Bc2';

  await redefinePasswordScenario(page, user);

  const hasRedefinePasswordSuccess = await page.getByText('senha alterada com sucesso.');
  await expect(hasRedefinePasswordSuccess).toBeVisible();
});

test('deve mostrar mensagem de erro ao tentar alterar senha do usuário com o campo senha incorreta', async ({ page }) => {
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

  await page.getByRole('link', { name: 'Perfil' }).click();

  await page.getByText('Redefinir a senha').click();
  user.password = '@Ab1!Ab1';
  user.newPassword = '!Bc2!Bc2';
  user.confirmNewPassword = '!Bc2!Bc2';

  await redefinePasswordScenario(page, user);

  const hasRedefinePasswordWrong = await page.getByText('senha preenchida é incorreta.');
  await expect(hasRedefinePasswordWrong).toBeVisible();
});

test('deve mostrar mensagem de erro ao tentar alterar senha do usuário com o campo senha vazio', async ({ page }) => {
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

  await page.getByRole('link', { name: 'Perfil' }).click();

  await page.getByText('Redefinir a senha').click();
  user.password = '';
  user.newPassword = '!Bc2!Bc2';
  user.confirmNewPassword = '!Bc2!Bc2';

  await redefinePasswordScenario(page, user);

  const hasRedefinePasswordWrong = await page.getByText('Preencha o campo senha atual');
  await expect(hasRedefinePasswordWrong).toBeVisible();
});

test('deve mostrar mensagem de erro ao tentar alterar senha do usuário com o campo senha inválido', async ({ page }) => {
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

  await page.getByRole('link', { name: 'Perfil' }).click();

  await page.getByText('Redefinir a senha').click();
  user.password = 'sen';
  user.newPassword = '!Bc2!Bc2';
  user.confirmNewPassword = '!Bc2!Bc2';

  await redefinePasswordScenario(page, user);

  const hasRedefinePasswordWrong = await page.getByText('Campo senha atual é inválido');
  await expect(hasRedefinePasswordWrong).toBeVisible();
});

test('deve mostrar mensagem de erro ao tentar alterar senha do usuário com o campo nova senha inválida', async ({ page }) => {
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

  await page.getByRole('link', { name: 'Perfil' }).click();

  await page.getByText('Redefinir a senha').click();
  user.newPassword = 'sen';
  user.confirmNewPassword = '!Bc2!Bc2';

  await redefinePasswordScenario(page, user);

  const hasRedefinePasswordWrong = await page.getByText('Campo nova senha deve conter no mínimo 4 caracteres');
  await expect(hasRedefinePasswordWrong).toBeVisible();
});

test('deve mostrar mensagem de erro ao tentar alterar senha do usuário com o campo senha atual e nova senha iguais', async ({ page }) => {
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

  await page.getByRole('link', { name: 'Perfil' }).click();

  await page.getByText('Redefinir a senha').click();
  user.newPassword = '!Ab1!Ab1';
  user.confirmNewPassword = '!Ab1!Ab1';

  await redefinePasswordScenario(page, user);

  const hasRedefinePasswordWrong = await page.getByText('Campos senha atual e nova senha devem ser diferentes');
  await expect(hasRedefinePasswordWrong).toBeVisible();
});

test('deve mostrar mensagem de erro ao tentar alterar senha do usuário com o campo nova senha sem seguir requisitos', async ({ page }) => {
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

  await page.getByRole('link', { name: 'Perfil' }).click();

  await page.getByText('Redefinir a senha').click();
  user.newPassword = 'senha';
  user.confirmNewPassword = '!Bc2!Bc2';

  await redefinePasswordScenario(page, user);

  const hasRedefinePasswordWrong = await page.getByText('Campo nova senha deve conter número, símbolo, letra maiúscula e minúscula');
  await expect(hasRedefinePasswordWrong).toBeVisible();
});

test('deve mostrar mensagem de erro ao tentar alterar senha do usuário com o campo confirmar nova senha vazio', async ({ page }) => {
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

  await page.getByRole('link', { name: 'Perfil' }).click();

  await page.getByText('Redefinir a senha').click();
  user.newPassword = '!Bc2!Bc2';
  user.confirmNewPassword = '';

  await redefinePasswordScenario(page, user);

  const hasRedefinePasswordWrong = await page.getByText('Preencha o campo confirmar nova senha');
  await expect(hasRedefinePasswordWrong).toBeVisible();
});

test('deve mostrar mensagem de erro ao tentar alterar senha do usuário com o campo confirmar nova senha inválido', async ({ page }) => {
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

  await page.getByRole('link', { name: 'Perfil' }).click();

  await page.getByText('Redefinir a senha').click();
  user.newPassword = '!Bc2!Bc2';
  user.confirmNewPassword = 'sen';

  await redefinePasswordScenario(page, user);

  const hasRedefinePasswordWrong = await page.getByText('Campo confirmar nova senha é inválido');
  await expect(hasRedefinePasswordWrong).toBeVisible();
});

test('deve mostrar mensagem de erro ao tentar alterar senha do usuário com o campo nova senha e confirmar nova senha diferentes', async ({ page }) => {
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

  await page.getByRole('link', { name: 'Perfil' }).click();

  await page.getByText('Redefinir a senha').click();
  user.newPassword = '@Ab1!Ab1';
  user.confirmNewPassword = '$Ab1!Ab1';

  await redefinePasswordScenario(page, user);

  const hasRedefinePasswordWrong = await page.getByText('Os campos nova senha e confirmar nova senha devem ser iguais');
  await expect(hasRedefinePasswordWrong).toBeVisible();
});
