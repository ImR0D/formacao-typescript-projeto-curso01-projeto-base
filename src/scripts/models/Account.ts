import { Transaction } from '../../scripts/types/Transaction.js';
import { TransactionType } from '../../scripts/types/TransactionType.js';

let saldo: number = 3000;
let transactionHistory: Transaction[] = [];

function logTransaction(transaction: Transaction): void {
  transactionHistory.push(transaction);
}

const Account = {
  lastAccessDate(): Date {
    return new Date();
  },
  balance(): number {
    return saldo;
  },
  withdraw(amount: number): void {
    if (!(amount > 0)) {
      return;
    }
    saldo -= amount;
  },
  deposit(amount: number): void {
    if (!(amount > 0)) {
      return;
    }
    saldo += amount;
  },
  transaction(transaction: Transaction): void {
    if (transaction.type == TransactionType.DEPOSIT) {
      this.deposit(transaction.value);
    } else if (
      transaction.type == TransactionType.TRANSFER ||
      transaction.type == TransactionType.PAYMENT_BILL
    ) {
      this.withdraw(transaction.value);
    } else {
      return;
    }
    logTransaction(transaction);
  },
  history(): Transaction[] {
    return transactionHistory;
  },
};

export default Account;
