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

  if (tipoTransacao == TransactionType.DEPOSIT) {
    saldo += valor;
  } else if (
    tipoTransacao == TransactionType.TRANSFER ||
    tipoTransacao == TransactionType.PAYMENT_BILL
  ) {
    saldo -= valor;
  } else {
    alert('Tipo de Transação é inválido!');
    return;
  }

  elementoSaldo.textContent = ToCurrency(saldo);

  const novaTransacao: Transaction = {
    type: tipoTransacao,
    value: valor,
    date: data,
  };

  console.log(novaTransacao);
  elementoFormulario.reset();
});
