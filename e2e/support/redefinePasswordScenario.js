export default async function redefinePasswordScenario(manipulePage, userFake) {
  await manipulePage.getByPlaceholder('Digite sua senha atual').click();
  await manipulePage.getByPlaceholder('Digite sua senha atual').fill(userFake.password);
  await manipulePage.getByPlaceholder('Digite sua nova senha').click();
  await manipulePage.getByPlaceholder('Digite sua nova senha').fill(userFake.newPassword);
  await manipulePage.getByPlaceholder('Digite sua confirmação de nova senha').click();
  await manipulePage.getByPlaceholder('Digite sua confirmação de nova senha').fill(userFake.confirmNewPassword);
  await manipulePage.getByRole('button', { name: 'Salvar' }).click();
}
