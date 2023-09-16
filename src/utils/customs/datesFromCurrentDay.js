export default function datesFromCurrentDay(currentDatetime) {
  // console.log('datesFromCurrentDay | currentDatetime: ', currentDatetime);
  const currentYear = currentDatetime.getFullYear();
  // console.log('datesFromCurrentDay | currentYear: ', currentYear);
  const currentMouth = currentDatetime.getMonth();
  // console.log('datesFromCurrentDay | currentMouth: ', currentMouth);
  const currentDay = currentDatetime.getDate();
  // console.log('datesFromCurrentDay | currentDay: ', currentDay);
  const manipulatedDate = new Date(currentYear, currentMouth + 1, 0);
  // console.log('datesFromCurrentDay | manipulatedDate: ', manipulatedDate);
  const lastDayMonth = manipulatedDate.getDate();
  // console.log('datesFromCurrentDay | lastDayMonth: ', lastDayMonth);
  return {
    currentYear,
    currentMouth,
    currentDay,
    lastDayMonth,
  };
}
