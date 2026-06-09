let saldo = 3000;

const elementoSaldo = document.querySelector(
  ".saldo-valor .valor",
) as HTMLElement;

if (elementoSaldo != null) {
  elementoSaldo.textContent = saldo.toString();
}

const elementoFormulario = document.querySelector(
  ".block-nova-transacao form",
) as HTMLFormElement;
