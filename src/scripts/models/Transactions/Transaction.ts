import { ITransactionHistory } from '../../interfaces/IAccountHistories';
import { ITransaction } from '../../interfaces/ITransaction';
import { TransactionType } from '../../types/TransactionType';
import Validate from '../../Validator/Validate';
import Account from '../Account/Account';

// Classe não está em uso ainda
export default class Transaction extends Validate<Transaction> {
  private _transactionHistories: ITransactionHistory;
  private _accountSource: Account;
  private _accountDestination?: Account;

  constructor(account: Account) {
    super();
    this._accountSource = account;
    this._transactionHistories = {
      AllTransactions: [],
      Deposits: [],
      Withdraws: [],
      Transfers: [],
      PaymentsBills: [],
      Pix: [],
    };
  }

  public get Source(): Account {
    return this._accountSource;
  }
  public get Destination(): Account | undefined {
    return this._accountDestination;
  }
  public get History(): Readonly<ITransactionHistory> {
    return this._transactionHistories;
  }

  public Transfer(transaction: ITransaction, destination: Account): void {
    this._accountDestination = destination;

    this.LesserThanOrEqualTo(transaction.value, 0);
    let typeErrorMessage = this.GetMessageErrorByFunctionName(
      'LesserThanOrEqualTo',
    );
    if (this.HasErrors()) {
      transaction.error = true;
      transaction.errorMessage = typeErrorMessage;
      this.ClearErrors();
      return;
    }

    this._accountSource.Debit(transaction);
    this._accountDestination?.Credit(transaction);
  }
  public Deposit(transaction: ITransaction): void {
    this._accountSource.Credit(transaction);
    this.RegisterTransactionLog(transaction);
  }

  /**
   * @description
   * Verifica o tipo de transação bancária que foi realizada e registra no histórico de transações
   *
   * @param transaction Obrigatório para registrar a ação no histórico de transações
   */
  private RegisterTransactionLog(transaction: ITransaction): void {
    let type: TransactionType = transaction.type;

    this._transactionHistories.AllTransactions?.push(transaction);

    const logActions: Record<TransactionType, () => void> = {
      [TransactionType.Withdraw]: () => {
        this._transactionHistories.Withdraws?.push(transaction);
      },
      [TransactionType.Deposit]: () => {
        this._transactionHistories.Deposits?.push(transaction);
      },
      [TransactionType.Transfer]: () => {
        this._transactionHistories.Transfers?.push(transaction);
      },
      [TransactionType.PaymentBill]: () => {
        this._transactionHistories.PaymentsBills?.push(transaction);
      },
      [TransactionType.Pix]: () => {
        this._transactionHistories.Pix?.push(transaction);
      },
    };

    if (logActions[type]) {
      const logActionRun = logActions[type];
      logActionRun();
    }
  }
}
