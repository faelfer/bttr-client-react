/* eslint-disable import/no-extraneous-dependencies */
const { faker } = require("@faker-js/faker");

const skillDefault = require("../../src/utils/resources/skill_default.json");

module.exports = function userFactory(isGenerateSkillNew = true) {
  const singleKey = faker.number.int({
    min: 10,
    max: 100,
  });
  const skillNew = {
    id: faker.number.int({
      min: 100000,
      max: 1000000,
    }),
    name: `${faker.commerce.department()}${singleKey}`,
    minutes: `${singleKey}`,
    created: faker.datatype.datetime(),
  };

  if (isGenerateSkillNew) {
    return skillNew;
  }
  return skillDefault;
};
