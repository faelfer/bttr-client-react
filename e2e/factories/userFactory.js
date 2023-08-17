/* eslint-disable import/no-extraneous-dependencies */
const { faker } = require('@faker-js/faker');

const userDefault = require('../../src/utils/resources/user_default.json');

module.exports = function userFactory(isGenerateUserNew = true) {
  const userNew = {
    username: faker.person.firstName(),
    email: faker.internet.email(),
    password: '!Ab1!Ab1',
  };

  if (isGenerateUserNew) {
    return userNew;
  }
  return userDefault;
};
