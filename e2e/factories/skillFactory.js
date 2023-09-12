/* eslint-disable import/no-extraneous-dependencies */
const { faker } = require("@faker-js/faker");

const skillDefault = require("../../src/utils/resources/skill_default.json");

module.exports = function userFactory(isGenerateSkillNew = true) {
  const skillNew = {
    name: `${faker.commerce.department()}${faker.number.int({
      min: 10,
      max: 100,
    })}`,
  };

  if (isGenerateSkillNew) {
    return skillNew;
  }
  return skillDefault;
};
