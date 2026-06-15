import { TransactionType } from './TransactionType.js';

export type TransactionModel = {
  type: TransactionType;
  value: number;
  date: Date;
  hasError?: boolean;
};
