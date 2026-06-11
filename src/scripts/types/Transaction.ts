import { TransactionType } from './TransactionType.js';

export type Transaction = {
  type: TransactionType;
  value: number;
  date: Date;
  hasError?: boolean;
};
