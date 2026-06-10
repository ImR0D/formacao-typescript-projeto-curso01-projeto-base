let saldo = 3000;

const elementoSaldo = document.querySelector(
  '.saldo-valor .valor',
) as HTMLElement;

const elementoDataAcesso = document.querySelector(
  '.block-saldo time',
) as HTMLElement;

if (elementoSaldo != null) {
  elementoSaldo.textContent = ToCurrency(saldo);
}

if (elementoDataAcesso != null) {
  const dataAcesso: Date = new Date();

  let dateFormatted = ToDateFormat(
    dataAcesso,
    DateFormatLocale.DateWithWeekday,
  );

  const formattedDateToCapitalizedCase = dateFormatted.replace(
    dateFormatted.charAt(0),
    dateFormatted.charAt(0).toUpperCase(),
  );

  elementoDataAcesso.textContent = formattedDateToCapitalizedCase;
}
