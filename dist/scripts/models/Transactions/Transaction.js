import { TransactionType } from '../../types/TransactionType';
import Validate from '../../Validator/Validate';
// Classe não está em uso ainda
export default class Transaction extends Validate {
    _transactionHistories;
    _accountSource;
    _accountDestination;
    constructor(account) {
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
    get Source() {
        return this._accountSource;
    }
    get Destination() {
        return this._accountDestination;
    }
    get History() {
        return this._transactionHistories;
    }
    Transfer(transaction, destination) {
        this._accountDestination = destination;
        this.LesserThanOrEqualTo(transaction.value, 0);
        let typeErrorMessage = this.GetMessageErrorByFunctionName('LesserThanOrEqualTo');
        if (this.HasErrors()) {
            transaction.error = true;
            transaction.errorMessage = typeErrorMessage;
            this.ClearErrors();
            return;
        }
        this._accountSource.Debit(transaction);
        this._accountDestination?.Credit(transaction);
    }
    Deposit(transaction) {
        this._accountSource.Credit(transaction);
        this.RegisterTransactionLog(transaction);
    }
    /**
     * @description
     * Verifica o tipo de transação bancária que foi realizada e registra no histórico de transações
     *
     * @param transaction Obrigatório para registrar a ação no histórico de transações
     */
    RegisterTransactionLog(transaction) {
        let type = transaction.type;
        this._transactionHistories.AllTransactions?.push(transaction);
        const logActions = {
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
