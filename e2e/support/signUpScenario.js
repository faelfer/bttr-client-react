export default async function signUpScenario(manipulePage, userFake) {
  await manipulePage.getByLabel('Digite seu nome de usuário').click();
  await manipulePage.getByLabel('Digite seu nome de usuário').fill(userFake.username);
  await manipulePage.getByLabel('Digite seu e-mail').click();
  await manipulePage.getByLabel('Digite seu e-mail').fill(userFake.email);
  await manipulePage.getByLabel('Digite sua senha').click();
  await manipulePage.getByLabel('Digite sua senha').fill(userFake.password);
  await manipulePage.getByRole('button', { name: 'Cadastre-se' }).click();
}
