import { TransactionType } from '../../types/TransactionType.js';
import { AccountHistory } from './AccountHistory.js';
let balance = 3000;
function logWithdraw(transaction) {
    AccountHistory.Withdraws.push(transaction);
}
function logDeposit(transaction) {
    AccountHistory.Deposits.push(transaction);
}
function logTransaction(transaction) {
    AccountHistory.AllTransactions.push(transaction);
}
function performTransaction(transaction) {
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
    };
    return redirect[transaction.type];
}
const Account = {
    lastAccessDate() {
        return new Date();
    },
    balance() {
        return balance;
    },
    withdraw(transaction) {
        let hasError = false;
        let errorMessage = '';
        if (transaction.value < 0) {
            hasError = true;
            errorMessage = 'Withdraw amount must be higher than zero';
        }
        else if (transaction.value > balance) {
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
    },
    deposit(transaction) {
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
    },
    transaction(transaction) {
        const performTransactionFn = performTransaction(transaction);
        performTransactionFn();
    },
    history() {
        return AccountHistory;
    },
};
export default Account;
