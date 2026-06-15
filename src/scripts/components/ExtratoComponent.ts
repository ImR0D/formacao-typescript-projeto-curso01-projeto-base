import ToCurrency from '../helper/ToCurrency.js';
import ToDateFormat from '../helper/ToDateFormat.js';
import Account from '../models/old_Account/Account_old.js';
import { DateFormatLocale } from '../types/DateFormatLocale.js';

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(
  '.extrato .registro-transacoes',
)!;

renderizarExtrato();
function renderizarExtrato(): void {
  const gruposTransacoes = Account.transactionsGroup();
  elementoRegistroTransacoesExtrato.innerText = '';
  let htmlRegistroTransacoes: string = '';

  for (let grupoTransacao of gruposTransacoes) {
    let htmlTransacaoItem: string = '';
    for (let transacao of grupoTransacao.transactions) {
      let classItem = 'valor';

      if (Number(transacao.value) < 0) {
        classItem += ' negativo';
      }

      htmlTransacaoItem += `
        <div class="transacao-item">
            <div class="transacao-info">
                <span class="tipo">${transacao.type}</span>
                <strong class="${classItem}">${ToCurrency(transacao.value)}</strong>
            </div>
            <time class="data">${ToDateFormat(transacao.date, DateFormatLocale.DayMonth)}</time>
        </div>
      `;
    }
    htmlRegistroTransacoes += `
    <div class="transacoes-group">
        <strong class="mes-group">${grupoTransacao.label}</strong>
        ${htmlTransacaoItem}
    </div>
  `;
  }

  if (htmlRegistroTransacoes === '') {
    htmlRegistroTransacoes = `
        <div>Não há transações registradas</div>
    `;
  }

  elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}

const ExtratoComponent = {
  update(): void {
    renderizarExtrato();
  },
};
export default ExtratoComponent;
