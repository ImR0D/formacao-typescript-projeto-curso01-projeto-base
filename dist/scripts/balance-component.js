"use strict";
let saldo = 3000;
const elementoSaldo = document.querySelector('.saldo-valor .valor');
const elementoDataAcesso = document.querySelector('.block-saldo time');
if (elementoSaldo != null) {
    elementoSaldo.textContent = ToCurrency(saldo);
}
if (elementoDataAcesso != null) {
    const dataAcesso = new Date();
    elementoDataAcesso.textContent = ToDateFormat(dataAcesso);
}
