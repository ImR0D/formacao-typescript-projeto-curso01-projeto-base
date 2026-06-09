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

elementoFormulario.addEventListener("submit", function (event) {
  event.preventDefault();

  if (elementoFormulario && !elementoFormulario.checkValidity()) {
    alert("Preencha todos os campos corretamente para realizar a transação");
    return;
  }

  const inputTipoTransacao = elementoFormulario.querySelector(
    "#tipoTransacao",
  ) as HTMLSelectElement;
  const inputValor = elementoFormulario.querySelector(
    "#valor",
  ) as HTMLInputElement;
  const inputData = elementoFormulario.querySelector(
    "#data",
  ) as HTMLInputElement;

  let tipoTransacao = inputTipoTransacao.value;
  let valor: number = inputValor.valueAsNumber;
  let data: Date = new Date(inputData.value);

  if (tipoTransacao == "Depósito") {
    saldo += valor;
  } else if (
    tipoTransacao == "Transferência" ||
    tipoTransacao == "Pagamento de Boleto"
  ) {
    saldo -= valor;
  } else {
    alert("Tipo de Transação é inválido!");
    return;
  }

  elementoSaldo.textContent = saldo.toString();

  const novaTransacao = {
    tipoTransacao: tipoTransacao,
    valor: valor,
    data: data,
  };
  elementoFormulario.reset();
});
