import { DateFormatLocale } from '../types/DateFormatLocale.js';

const dateFormats: { [key: string]: Intl.DateTimeFormatOptions } = {
  Extended: {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hourCycle: 'h24',
    formatMatcher: 'best fit',
    timeZoneName: 'shortOffset',
  },
  DateWithWeekday: {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hourCycle: 'h24',
    formatMatcher: 'best fit',
  },
  WeekDayOnly: {
    weekday: 'long',
    hourCycle: 'h24',
    formatMatcher: 'best fit',
  },
  DateOnly: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hourCycle: 'h24',
    formatMatcher: 'best fit',
  },
  DateShort: {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hourCycle: 'h24',
    formatMatcher: 'best fit',
  },
  DayMonth: {
    day: '2-digit',
    month: '2-digit',
    hourCycle: 'h24',
    formatMatcher: 'best fit',
  },
  MonthExtendedOnly: {
    month: 'long',
    formatMatcher: 'best fit',
  },
};

export default function ToDateFormat(
  date: Date | string,
  format?: DateFormatLocale | undefined,
): string {
  const convDate = new Date(date);

  if (date == null) {
    return '';
  }

  if (format == undefined) {
    format = DateFormatLocale.Extended;
  }

  return convDate.toLocaleDateString('pt-br', dateFormats[format]);
}
