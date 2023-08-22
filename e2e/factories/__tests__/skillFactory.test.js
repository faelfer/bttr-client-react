/* eslint-disable no-undef */
const skillFactory = require('../skillFactory');

const desiredSkillDefault = require('../../../src/utils/resources/skill_default.json');

test('deve retornar um objeto com os dados de uma habilidade padrão', () => {
  expect(skillFactory(false)).toMatchObject(desiredSkillDefault);
});

test('deve verificar as propriedades do objeto habilidade padrão', async () => {
  const skillDefault = await skillFactory(false);
  expect(skillDefault).toHaveProperty('name');
  expect(skillDefault).toHaveProperty('dailyMinutes');
});

test('deve verificar os tipos do objeto habilidade padrão', async () => {
  const skillDefault = await skillFactory(false);
  expect(typeof skillDefault).toBe('object');
  expect(typeof skillDefault.name).toBe('string');
  expect(typeof skillDefault.dailyMinutes).toBe('string');
});

test('deve verificar as propriedades do objeto habilidade novo', async () => {
  const skillNew = await skillFactory();
  expect(skillNew).toHaveProperty('name');
  expect(skillNew).toHaveProperty('dailyMinutes');
});

test('deve verificar os tipos do objeto habilidade novo', async () => {
  const skillNew = await skillFactory();
  expect(typeof skillNew).toBe('object');
  expect(typeof skillNew.name).toBe('string');
  expect(typeof skillNew.dailyMinutes).toBe('string');
});
