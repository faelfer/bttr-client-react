export default function workingDays(
  dayToCalcule: number,
  currentYear: number,
  currentMouth: number,
): number {
  // console.log(
  //   'workingDay | dayToCalcule, currentYear, currentMouth: ',
  //   dayToCalcule,
  //   currentYear,
  //   currentMouth,
  // );
  let businessDaysCounted = 0;
  let loops = 0;

  while (loops < dayToCalcule) {
    const day = loops + 1;
    // console.log('workingDay | day: ', day);
    const manipulatedWeek = new Date(currentYear, currentMouth, day);
    // console.log('workingDay | manipulatedWeek: ', manipulatedWeek);
    const dayWeek = manipulatedWeek.getDay();
    // console.log('workingDay | dayWeek: ', dayWeek);

    const businessDaysFromWeek = [1, 2, 3, 4, 5];

    const isBusinessDay = businessDaysFromWeek.includes(dayWeek);
    // console.log('workingDay | isBusinessDay: ', isBusinessDay);
    if (isBusinessDay) {
      businessDaysCounted += 1;
    }
    // console.log('workingDay | businessDaysCounted: ', businessDaysCounted);
    loops += 1;
  }

  // console.log('workingDay | businessDaysCounted: ', businessDaysCounted);
  return businessDaysCounted;
}
