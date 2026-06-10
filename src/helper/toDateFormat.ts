function ToDateFormat(date: Date) {
  return date.toLocaleDateString('pt-br', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hourCycle: 'h24',
    formatMatcher: 'best fit',
    timeZoneName: 'shortOffset',
  });
}
