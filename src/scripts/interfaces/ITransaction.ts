import { TransactionType } from '../types/TransactionType';

export interface ITransaction {
  type: TransactionType;
  value: number;
  date: Date;
  error?: boolean;
  errorMessage?: string;
}
