let saldo = 3000;

const elementoSaldo = document.querySelector(".saldo-valor .valor");
elementoSaldo.textContent = saldo;

const elementoFormulario = document.querySelector(".block-nova-transacao form");

elementoFormulario.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!elementoFormulario.checkValidity()) {
    alert("Preencha todos os campos corretamente para realizar a transação");
    return;
  }

  alert("Transação em andamento");
});
