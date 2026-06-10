import Account from '../models/Account.js';
import SaldoComponent from './BalanceComponent.js';
const elementoFormulario = document.querySelector('.block-nova-transacao form');
elementoFormulario.addEventListener('submit', function (event) {
    event.preventDefault();
    if (elementoFormulario && !elementoFormulario.checkValidity()) {
        alert('Preencha todos os campos corretamente para realizar a transação');
        return;
    }
    const inputTipoTransacao = elementoFormulario.querySelector('#tipoTransacao');
    const inputValor = elementoFormulario.querySelector('#valor');
    const inputData = elementoFormulario.querySelector('#data');
    let tipoTransacao = inputTipoTransacao.value;
    let valor = inputValor.valueAsNumber;
    let data = new Date(inputData.value);
    const novaTransacao = {
        type: tipoTransacao,
        value: valor,
        date: data,
    };
    Account.transaction(novaTransacao);
    SaldoComponent.renderizarSaldo();
    console.log('Histórico de transações: ', Account.history());
    elementoFormulario.reset();
});
