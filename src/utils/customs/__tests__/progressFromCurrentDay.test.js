/* eslint-disable no-undef */
import progressFromCurrentDay from '../progressFromCurrentDay';

const desiredProgress = {
  goalMonth: 525,
  idealSituation: 375,
  currentPercentage: 9,
  goalRemaining: 475,
  daysRemaining: 7,
};

test('deve retornar as informações situação ideal, atual porcentagem, dias restantes, metas do mês e restante', () => {
  expect(progressFromCurrentDay(25, 50, 21, 15)).toMatchObject(desiredProgress);
});
