export function convertDateToString(date: Date): string {
  const hours = (date.getHours() + 3).toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function convertStringToDate(time: string): Date | null {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (timeRegex.test(time)) {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours - 3);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }
  return null;
}

export function getCurrentDate(): Date {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return new Date(0, 0, 0, hours, minutes);
}

export function compareTime(date1: Date, date2: Date): boolean {
  return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
}
