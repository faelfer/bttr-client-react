/* eslint-disable no-undef */
import datesFromCurrentDay from '../datesFromCurrentDay';

const currentDate = new Date('2023-01-01T03:00:00.000Z');

const desiredDatesFromCurrentDay = {
  currentYear: 2023,
  currentMouth: 0,
  currentDay: 1,
  lastDayMonth: 31,
};

test('deve extrair as informações ano, mês atual, dia atual e último dia do mês da data', () => {
  expect(datesFromCurrentDay(currentDate)).toMatchObject(desiredDatesFromCurrentDay);
});
