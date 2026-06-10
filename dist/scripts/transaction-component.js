"use strict";
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
    if (tipoTransacao == TransactionType.DEPOSIT) {
        saldo += valor;
    }
    else if (tipoTransacao == TransactionType.TRANSFER ||
        tipoTransacao == TransactionType.PAYMENT_BILL) {
        saldo -= valor;
    }
    else {
        alert('Tipo de Transação é inválido!');
        return;
    }
    elementoSaldo.textContent = ToCurrency(saldo);
    const novaTransacao = {
        type: tipoTransacao,
        value: valor,
        date: data,
    };
    console.log(novaTransacao);
    elementoFormulario.reset();
});
