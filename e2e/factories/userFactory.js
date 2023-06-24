/* eslint-disable import/no-extraneous-dependencies */
const { faker } = require('@faker-js/faker');

const userDefault = require('../../src/utils/resources/user_default.json');

module.exports = function userFactory(isGenerateUserNew = true) {
  const userNew = {
    username: faker.person.firstName(),
    email: faker.internet.email(),
    password: `!A${faker.string.alpha(3)}${faker.string.numeric(3)}`,
  };

  if (isGenerateUserNew) {
    return userNew;
  }
  return userDefault;
};
