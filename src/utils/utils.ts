import dayjs from 'dayjs';

export const capitalizeFirstLetter = (string: string) =>
  string.slice(0, 1).toUpperCase() + string.slice(1);

export const humanizeDate = (date: string, format: string) =>
  date ? dayjs(date).format(format) : '';
