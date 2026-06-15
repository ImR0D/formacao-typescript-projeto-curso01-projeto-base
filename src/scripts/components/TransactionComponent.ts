import translate from '../helper/Translation/Translate.js';
import Account from '../models/old_Account/Account_old.js';
import { TransactionModel } from '../types/Transaction.js';
import { TransactionType } from '../types/TransactionType.js';
import SaldoComponent from './BalanceComponent.js';
import ExtratoComponent from './ExtratoComponent.js';

const elementoFormulario = document.querySelector(
  '.block-nova-transacao form',
) as HTMLFormElement;

const elementoErro = document.querySelector(
  '.block-nova-transacao #transactionError',
) as HTMLElement;
const inputTipoTransacao = elementoFormulario.querySelector(
  '.block-nova-transacao #tipoTransacao',
) as HTMLSelectElement;
const inputValor = elementoFormulario.querySelector(
  '.block-nova-transacao #valor',
) as HTMLInputElement;
const inputData = elementoFormulario.querySelector(
  '.block-nova-transacao #data',
) as HTMLInputElement;

function printTextOnError(message: string, timeout?: number) {
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
      printTextOnError(
        'Preencha todos os campos corretamente para realizar a transação',
      );
      return;
    }
    let tipoTransacao: TransactionType =
      inputTipoTransacao.value as TransactionType;
    let valor: number = inputValor.valueAsNumber;
    let data: Date = new Date(inputData.value + ' 00:00:00');

    const novaTransacao: TransactionModel = {
      type: tipoTransacao,
      value: valor,
      date: data,
    };

    Account.transaction(novaTransacao);
    elementoFormulario.reset();
  } catch (error) {
    let eventError: Error = error as Error;
    let errorMessage = translate(eventError.message);
    printTextOnError(errorMessage, 3000);
  } finally {
    SaldoComponent.renderizarSaldo();
    ExtratoComponent.update();
  }
});
