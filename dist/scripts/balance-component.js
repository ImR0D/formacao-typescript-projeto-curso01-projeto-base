"use strict";
let saldo = 3000;
const elementoSaldo = document.querySelector('.saldo-valor .valor');
const elementoDataAcesso = document.querySelector('.block-saldo time');
if (elementoSaldo != null) {
    elementoSaldo.textContent = ToCurrency(saldo);
}
if (elementoDataAcesso != null) {
    const dataAcesso = new Date();
    let dateFormatted = ToDateFormat(dataAcesso, DateFormatLocale.DateWithWeekday);
    const formattedDateToCapitalizedCase = dateFormatted.replace(dateFormatted.charAt(0), dateFormatted.charAt(0).toUpperCase());
    elementoDataAcesso.textContent = formattedDateToCapitalizedCase;
}
