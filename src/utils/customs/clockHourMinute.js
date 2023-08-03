export default function clockHourMinute(amount) {
  try {
    // console.log('clockHourMinute | amount: ', amount);
    const hoursFromAmount = amount / 60;
    const hoursIntFloor = Math.floor(hoursFromAmount);
    // console.log('clockHourMinute | hoursFromAmount: ', hoursFromAmount);
    const restMinutesFromAmount = amount % 60;
    const minutesInt = parseInt(restMinutesFromAmount, 10);
    const hoursWithDigits = hoursIntFloor < 10 ? `0${hoursIntFloor}` : hoursIntFloor;
    const minutesWithDigits = minutesInt < 10 ? `0${minutesInt}` : minutesInt;
    return `${hoursWithDigits}h${minutesWithDigits}min`;
  } catch (error) {
    // console.log('clockHourMinute | error: ', error);
    return '00h00min';
  }
}
