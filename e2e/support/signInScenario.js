export default async function signInScenario(manipulePage, userFake) {
  await manipulePage.getByPlaceholder('Insira seu e-mail').click();
  await manipulePage.getByPlaceholder('Insira seu e-mail').fill(userFake.email);
  await manipulePage.getByPlaceholder('Insira sua senha').click();
  await manipulePage.getByPlaceholder('Insira sua senha').fill(userFake.password);
  await manipulePage.getByRole('button', { name: 'Entrar' }).click();
}
