interface ProgressFromCurrentDayResult {
  goalMonth: number;
  idealSituation: number;
  currentPercentage: number;
  goalRemaining: number;
  daysRemaining: number;
}

export default function progressFromCurrentDay(
  goalPerDay: number,
  goalDone: number,
  businessDays: number,
  businessDaysSoFar: number,
): ProgressFromCurrentDayResult {
  // console.log(
  //   'progressFromCurrentDay | goalPerDay, goalDone, businessDays, businessDaysSoFar:',
  //   goalPerDay,
  //   goalDone,
  //   businessDays,
  //   businessDaysSoFar,
  // );
  const goalMonth = businessDays * goalPerDay;
  // console.log('progressFromCurrentDay | goalMonth:', goalMonth);
  const goalRemaining = goalMonth - goalDone;
  // console.log('progressFromCurrentDay | goalRemaining:', goalRemaining);
  const daysRemaining = businessDays - businessDaysSoFar + 1;
  // console.log('progressFromCurrentDay | daysRemaining:', daysRemaining);
  const idealSituation = businessDaysSoFar * goalPerDay;
  // console.log('progressFromCurrentDay | idealSituation:', idealSituation);
  const currentPercentage = (goalDone * 100) / goalMonth;
  // console.log('progressFromCurrentDay | currentPercentage:', currentPercentage);

  return {
    goalMonth,
    idealSituation,
    currentPercentage: Math.trunc(currentPercentage),
    goalRemaining,
    daysRemaining,
  };
}
