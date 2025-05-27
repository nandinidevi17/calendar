import { format, parseISO, addDays, addWeeks, addMonths, isBefore, isAfter, isSameDay } from 'date-fns';

export const formatDate = (date) => {
  if (typeof date === 'string') {
    return date;
  }
  return format(date, 'yyyy-MM-dd');
};

export const formatTime = (time) => {
  return time;
};

export const formatDateTime = (date, time) => {
  return `${formatDate(date)} ${time}`;
};

export const isToday = (date) => {
  const today = new Date();
  return isSameDay(date, today);
};

export const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  
  return days;
};

export const navigateMonth = (currentDate, direction) => {
  const newDate = new Date(currentDate);
  newDate.setMonth(currentDate.getMonth() + direction);
  return newDate;
};

export const getMonthYear = (date) => {
  return format(date, 'MMMM yyyy');
};

export const createDateFromString = (dateString) => {
  return parseISO(dateString);
};

export const addTimeToDate = (date, time) => {
  const [hours, minutes] = time.split(':');
  const newDate = new Date(date);
  newDate.setHours(parseInt(hours, 10));
  newDate.setMinutes(parseInt(minutes, 10));
  return newDate;
};

export const compareDateTime = (date1, time1, date2, time2) => {
  const datetime1 = addTimeToDate(createDateFromString(date1), time1);
  const datetime2 = addTimeToDate(createDateFromString(date2), time2);
  
  if (datetime1 < datetime2) return -1;
  if (datetime1 > datetime2) return 1;
  return 0;
};