import { TransactionModel } from './Transaction';

export type GroupTransaction = {
  label: string;
  transactions: TransactionModel[];
};
