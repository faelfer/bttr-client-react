export default function convertToHours(mins) {
  let hour = Math.floor(mins / 60);
  let minutes = mins % 60;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + parseInt(minutes) : parseInt(minutes);
  return `${hour}h${minutes}min`;
};