import ToCurrency from '../helper/ToCurrency.js';
import ToDateFormat from '../helper/ToDateFormat.js';
import Account from '../models/Account/Account.js';
import { DateFormatLocale } from '../types/DateFormatLocale.js';

const elementoSaldo = document.querySelector(
  '.saldo-valor .valor',
) as HTMLElement;

const elementoDataAcesso = document.querySelector(
  '.block-saldo time',
) as HTMLElement;

const SaldoComponent = {
  renderizarSaldo() {
    if (elementoSaldo == null) {
      return;
    }

    elementoSaldo.textContent = ToCurrency(Account.balance());

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
  },
};
SaldoComponent.renderizarSaldo();
export default SaldoComponent;
