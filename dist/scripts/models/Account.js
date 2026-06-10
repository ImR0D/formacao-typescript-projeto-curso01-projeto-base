import { TransactionType } from '../../scripts/types/TransactionType.js';
let saldo = 3000;
let transactionHistory = [];
function logTransaction(transaction) {
    transactionHistory.push(transaction);
}
const Account = {
    lastAccessDate() {
        return new Date();
    },
    balance() {
        return saldo;
    },
    withdraw(amount) {
        if (!(amount > 0)) {
            return;
        }
        saldo -= amount;
    },
    deposit(amount) {
        if (!(amount > 0)) {
            return;
        }
        saldo += amount;
    },
    transaction(transaction) {
        if (transaction.type == TransactionType.DEPOSIT) {
            this.deposit(transaction.value);
        }
        else if (transaction.type == TransactionType.TRANSFER ||
            transaction.type == TransactionType.PAYMENT_BILL) {
            this.withdraw(transaction.value);
        }
        else {
            return;
        }
        logTransaction(transaction);
    },
    history() {
        return transactionHistory;
    },
};
export default Account;
