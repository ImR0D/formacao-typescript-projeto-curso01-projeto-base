import { TransactionModel } from '../../types/Transaction';

export default interface DataAccount {
  account_balance: number;
  transactions: TransactionModel[];
}
