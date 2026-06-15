import { GroupTransaction } from '../../types/GroupTrasaction.js';
import { TransactionModel } from '../../types/Transaction.js';
import { TransactionType } from '../../types/TransactionType.js';
import {
  AccountHistory,
  IAccountHistory,
} from './Interfaces/AccountHistory.js';
import DataAccount from './DataAccount.js';
import ToDateFormat from '../../helper/ToDateFormat.js';
import { DateFormatLocale } from '../../types/DateFormatLocale.js';

if (localStorage.getItem('storedAccount') === null) {
  const initialDataAccount: DataAccount = {
    account_balance: 0,
    transactions: [],
  };
  const initialData = JSON.stringify(initialDataAccount);
  localStorage.setItem('storedAccount', initialData);
}
const storedData = localStorage.getItem('storedAccount') ?? '';
const data: DataAccount = JSON.parse(storedData);

const parsedWithDates: DataAccount = JSON.parse(
  storedData,
  (key: string, value: string) => {
    if (key === 'date') {
      return new Date(value);
    }
    return value;
  },
);

let storedAccountTransactions: TransactionModel[] =
  parsedWithDates.transactions ?? [];

data.transactions = storedAccountTransactions;

let balance = data.account_balance ?? 0;
function logWithdraw(transaction: TransactionModel): void {
  AccountHistory.Withdraws.push(transaction);
}
function logDeposit(transaction: TransactionModel): void {
  AccountHistory.Deposits.push(transaction);
}
function logTransaction(transaction: TransactionModel): void {
  AccountHistory.AllTransactions.push(transaction);
}

function dataStoreAccount() {
  let transactionsHistory: IAccountHistory = Account.history();
  let transactions = transactionsHistory.AllTransactions;

  const data: DataAccount = {
    account_balance: Account.balance() ?? 0,
    transactions: transactions,
  };
  const dataAccount = JSON.stringify(data);

  localStorage.setItem('storedAccount', dataAccount);
}

function performTransaction(transaction: TransactionModel) {
  let validTypes = Object.values(TransactionType);

  if (!validTypes.includes(transaction.type)) {
    throw new Error();
  }

  logTransaction(transaction);
  const redirect = {
    [TransactionType.Deposit]: () => {
      Account.deposit(transaction);
    },
    [TransactionType.Transfer]: () => {
      Account.withdraw(transaction);
    },
    [TransactionType.PaymentBill]: () => {
      Account.withdraw(transaction);
    },
    [TransactionType.Withdraw]: () => {
      Account.withdraw(transaction);
    },
    [TransactionType.Pix]: () => {
      Account.withdraw(transaction);
    },
  };
  return redirect[transaction.type];
}

const Account = {
  lastAccessDate(): Date {
    return new Date();
  },
  balance(): number {
    return balance;
  },
  transactionsGroup(): GroupTransaction[] {
    const gruposTransacoes: GroupTransaction[] = [];
    const listaTransacoes: TransactionModel[] = data.transactions;

    const transacoesOrdenadas: TransactionModel[] = listaTransacoes.sort(
      (t1, t2) => t2.date.getTime() - t1.date.getTime(),
    );
    let labelAtualGrupoTransacao: string = '';

    for (let transacao of transacoesOrdenadas) {
      let labelGrupoTransacao: string = ToDateFormat(
        transacao.date,
        DateFormatLocale.DayMonth,
      );

      if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
        labelAtualGrupoTransacao = labelGrupoTransacao;
        gruposTransacoes.push({
          label: labelGrupoTransacao,
          transactions: [],
        });
      }
      gruposTransacoes.at(-1)?.transactions.push(transacao);
    }
    return gruposTransacoes;
  },
  withdraw(transaction: TransactionModel): void {
    let hasError = false;
    let errorMessage = '';

    if (transaction.value < 0) {
      hasError = true;
      errorMessage = 'Withdraw amount must be higher than zero';
    } else if (transaction.value > balance) {
      hasError = true;
      errorMessage = 'Insufficient balance to perform a Withdraw';
    }

    if (hasError && errorMessage.length > 0) {
      transaction.hasError = hasError;
      logWithdraw(transaction);
      throw new Error(errorMessage);
    }

    balance -= transaction.value;
    logWithdraw(transaction);
    dataStoreAccount();
  },
  deposit(transaction: TransactionModel): void {
    let hasError = false;
    let errorMessage = '';

    if (transaction.value < 0) {
      hasError = true;
      errorMessage = 'Deposit amount must be higher than zero';
    }

    if (hasError && errorMessage) {
      transaction.hasError = hasError;
      logDeposit(transaction);
      throw new Error(errorMessage);
    }

    balance += transaction.value;
    logDeposit(transaction);
    dataStoreAccount();
  },
  transaction(transaction: TransactionModel): void {
    const performTransactionFn = performTransaction(transaction);
    performTransactionFn();
    dataStoreAccount();
    console.log('transaction group: ', this.transactionsGroup());
  },
  history(): typeof AccountHistory {
    return AccountHistory;
  },
};

export default Account;
