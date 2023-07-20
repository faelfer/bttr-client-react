export default function progressFromCurrentDay(
  goalPerDay,
  goalDone,
  businessDays,
  businessDaysSoFar,
) {
  try {
    console.log(
      'progressFromCurrentDay | goalPerDay, goalDone, businessDays, businessDaysSoFar:',
      goalPerDay,
      goalDone,
      businessDays,
      businessDaysSoFar,
    );
    const goalMonth = (businessDays * goalPerDay);
    console.log('progressFromCurrentDay | goalMonth:', goalMonth);
    const goalRemaining = (goalMonth - goalDone);
    console.log('progressFromCurrentDay | goalRemaining:', goalRemaining);
    const daysRemaining = (businessDays - businessDaysSoFar) + 1;
    console.log('progressFromCurrentDay | daysRemaining:', daysRemaining);
    const idealSituation = (businessDaysSoFar * goalPerDay);
    console.log('progressFromCurrentDay | idealSituation:', idealSituation);
    const currentPercentage = ((goalDone * 100) / goalMonth);
    console.log('progressFromCurrentDay | currentPercentage:', currentPercentage);

    return {
      goalMonth,
      idealSituation,
      currentPercentage: parseInt(currentPercentage, 10),
      goalRemaining,
      daysRemaining,
    };
  } catch (error) {
    console.log('calculateProgress | error:', error);
    return {
      goalMonth: 0,
      idealSituation: 0,
      currentPercentage: 0,
      goalRemaining: 0,
      daysRemaining: 0,
    };
  }
}
