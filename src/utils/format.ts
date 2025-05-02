export const convertTo2Digits = (value: number): string =>
  value < 10 ? `0${value}` : `${value}`;
