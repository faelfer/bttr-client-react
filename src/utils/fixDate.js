export default function fixDate(date) {
    return new Date(new Date(new Date(date)).setHours((new Date(date)).getHours() + 3))
  };