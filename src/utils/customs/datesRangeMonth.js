export default function datesRangeMonth(currentDate) {
  const firstDayDatetime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const lastDayDatetime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
    20,
    59,
    59,
  );
  const firstDayDatetimeIso = firstDayDatetime.toISOString();
  const lastDayDatetimeIso = lastDayDatetime.toISOString();
  return {
    firstDayDatetimeIso,
    lastDayDatetimeIso,
  };
}
