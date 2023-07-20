export default function datesFromCurrentDay(currentDatetime) {
  try {
    console.log('datesFromCurrentDay | currentDatetime: ', currentDatetime);
    const currentYear = currentDatetime.getFullYear();
    console.log('datesFromCurrentDay | currentYear: ', currentYear);
    const currentMouth = currentDatetime.getMonth();
    console.log('datesFromCurrentDay | currentMouth: ', currentMouth);
    const currentDay = currentDatetime.getDate();
    console.log('datesFromCurrentDay | currentDay: ', currentDay);
    const manipulatedDate = new Date(currentYear, (currentMouth + 1), 0);
    console.log('datesFromCurrentDay | manipulatedDate: ', manipulatedDate);
    const lastDayMonth = manipulatedDate.getDate();
    console.log('datesFromCurrentDay | lastDayMonth: ', lastDayMonth);
    return {
      currentYear,
      currentMouth,
      currentDay,
      lastDayMonth,
    };
  } catch (error) {
    return {
      currentYear: 1111,
      currentMouth: 0,
      currentDay: 0,
      lastDayMonth: 0,
    };
  }
}
