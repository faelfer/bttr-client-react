/* eslint-disable import/no-extraneous-dependencies */
const { faker } = require("@faker-js/faker");

const userDefault = require("../../src/utils/resources/user_default.json");

module.exports = function userFactory(isGenerateUserNew = true) {
  const singleKey = faker.number.int({
    min: 10,
    max: 100,
  });
  const userNew = {
    id: faker.number.int({
      min: 100000,
      max: 1000000,
    }),
    created: faker.datatype.datetime(),
    username: `${faker.person.firstName()}${singleKey}`,
    email: `${singleKey}${faker.internet.email()}`,
    password: "!Ab1!Ab1",
  };

  if (isGenerateUserNew) {
    return userNew;
  }
  return userDefault;
};
