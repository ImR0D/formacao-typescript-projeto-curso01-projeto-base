import { ITransaction } from './ITransaction';

export interface ITransactionHistory {
  AllTransactions?: ITransaction[];
  Withdraws?: ITransaction[];
  Transfers?: ITransaction[];
  Deposits?: ITransaction[];
  PaymentsBills?: ITransaction[];
  Pix?: ITransaction[];
}
