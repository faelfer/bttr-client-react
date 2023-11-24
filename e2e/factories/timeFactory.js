/* eslint-disable import/no-extraneous-dependencies */
const { faker } = require("@faker-js/faker");

const timeDefault = require("../../src/utils/resources/time_default.json");

module.exports = function timeFactory(isGenerateTimeNew, skillId) {
  const singleKey = faker.number.int({
    min: 10,
    max: 100,
  });
  const timeNew = {
    id: faker.number.int({
      min: 100000,
      max: 1000000,
    }),
    skill: `${skillId}`,
    minutes: `${singleKey}`,
    created: faker.datatype.datetime(),
  };

  if (isGenerateTimeNew) {
    return timeNew;
  }
  return timeDefault;
};
