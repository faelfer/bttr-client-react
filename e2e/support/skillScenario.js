export default async function skillScenario(manipulePage, skillFake) {
  await manipulePage.getByPlaceholder('Digite nome da habilidade').click();
  await manipulePage.getByPlaceholder('Digite nome da habilidade').fill(skillFake.name);
  await manipulePage.getByPlaceholder('Digite os minutos diário').click();
  await manipulePage.getByPlaceholder('Digite os minutos diário').press('ArrowUp');
}
