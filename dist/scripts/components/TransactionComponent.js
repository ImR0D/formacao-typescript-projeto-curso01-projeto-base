import translate from '../helper/Translation/Translate.js';
import Account from '../models/old_Account/Account_old.js';
import SaldoComponent from './BalanceComponent.js';
import ExtratoComponent from './ExtratoComponent.js';
const elementoFormulario = document.querySelector('.block-nova-transacao form');
const elementoErro = document.querySelector('.block-nova-transacao #transactionError');
const inputTipoTransacao = elementoFormulario.querySelector('.block-nova-transacao #tipoTransacao');
const inputValor = elementoFormulario.querySelector('.block-nova-transacao #valor');
const inputData = elementoFormulario.querySelector('.block-nova-transacao #data');
function printTextOnError(message, timeout) {
    let defaultTimeout = 2000;
    if (!timeout) {
        timeout = defaultTimeout;
    }
    elementoErro.textContent = translate(message);
    setTimeout(() => {
        elementoErro.textContent = '';
    }, timeout);
}
elementoFormulario.addEventListener('submit', function (event) {
    event.preventDefault();
    try {
        if (elementoFormulario && !elementoFormulario.checkValidity()) {
            printTextOnError('Preencha todos os campos corretamente para realizar a transação');
            return;
        }
        let tipoTransacao = inputTipoTransacao.value;
        let valor = inputValor.valueAsNumber;
        let data = new Date(inputData.value);
        const novaTransacao = {
            type: tipoTransacao,
            value: valor,
            date: data,
        };
        Account.transaction(novaTransacao);
        elementoFormulario.reset();
    }
    catch (error) {
        let eventError = error;
        let errorMessage = translate(eventError.message);
        printTextOnError(errorMessage, 3000);
    }
    finally {
        SaldoComponent.renderizarSaldo();
        ExtratoComponent.update();
    }
});
const elementoHistory = document.querySelector('#history');
elementoHistory.addEventListener('click', () => {
    console.log(Account.history());
    SaldoComponent.renderizarSaldo();
    ExtratoComponent.update();
    Account.transactionsGroup();
});
