import { MS_PER_DAY } from '../constants';

export const formatDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getDaysDifference = (startDate, endDate = new Date()) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end - start;
  return Math.floor(diffTime / MS_PER_DAY);
};

export const parseHour = (timeString) => {
  return Number(timeString?.slice(0, 2)) || 0;
};

export const parseMinutes = (timeString) => {
  return Number(timeString?.slice(3, 5)) || 0;
};

export const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

export const getValueOrDefault = (value, defaultValue) => {
  return isNullOrUndefined(value) ? defaultValue : value;
};

export const pluralize = (count, singular, plural) => {
  return count === 1 ? singular : plural;
};
