import Account from '../models/Account.js';
import { Transaction } from '../types/Transaction.js';
import { TransactionType } from '../types/TransactionType.js';
import SaldoComponent from './BalanceComponent.js';

const elementoFormulario = document.querySelector(
  '.block-nova-transacao form',
) as HTMLFormElement;

elementoFormulario.addEventListener('submit', function (event) {
  event.preventDefault();

  if (elementoFormulario && !elementoFormulario.checkValidity()) {
    alert('Preencha todos os campos corretamente para realizar a transação');
    return;
  }

  const inputTipoTransacao = elementoFormulario.querySelector(
    '#tipoTransacao',
  ) as HTMLSelectElement;
  const inputValor = elementoFormulario.querySelector(
    '#valor',
  ) as HTMLInputElement;
  const inputData = elementoFormulario.querySelector(
    '#data',
  ) as HTMLInputElement;

  let tipoTransacao: TransactionType =
    inputTipoTransacao.value as TransactionType;
  let valor: number = inputValor.valueAsNumber;
  let data: Date = new Date(inputData.value);

  const novaTransacao: Transaction = {
    type: tipoTransacao,
    value: valor,
    date: data,
  };

  Account.transaction(novaTransacao);

  SaldoComponent.renderizarSaldo();

  console.log('Histórico de transações: ', Account.history());
  elementoFormulario.reset();
});
