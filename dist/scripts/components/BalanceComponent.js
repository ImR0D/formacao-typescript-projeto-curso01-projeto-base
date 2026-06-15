import ToCurrency from '../helper/ToCurrency.js';
import ToDateFormat from '../helper/ToDateFormat.js';
import Account from '../models/old_Account/Account_old.js';
import { DateFormatLocale } from '../types/DateFormatLocale.js';
const elementoSaldo = document.querySelector('.saldo-valor .valor');
const elementoDataAcesso = document.querySelector('.block-saldo time');
const SaldoComponent = {
    renderizarSaldo() {
        if (elementoSaldo == null) {
            return;
        }
        elementoSaldo.textContent =
            ToCurrency(Account.balance()) ?? `${ToCurrency(0)}`;
        if (elementoDataAcesso != null) {
            const dataAcesso = new Date();
            let dateFormatted = ToDateFormat(dataAcesso, DateFormatLocale.DateWithWeekday);
            const formattedDateToCapitalizedCase = dateFormatted.replace(dateFormatted.charAt(0), dateFormatted.charAt(0).toUpperCase());
            elementoDataAcesso.textContent = formattedDateToCapitalizedCase;
        }
    },
};
SaldoComponent.renderizarSaldo();
export default SaldoComponent;
