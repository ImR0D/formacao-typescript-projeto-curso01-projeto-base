import { Transaction } from '../../types/Transaction';

export interface IAccountHistory {
  AllTransactions: Transaction[];
  Withdraws: Transaction[];
  Deposits: Transaction[];
  HasErrors: Function;
}

export const AccountHistory: IAccountHistory = {
  AllTransactions: [],
  Deposits: [],
  Withdraws: [],

  HasErrors(): boolean {
    let errorCount = 0;
    this.AllTransactions.forEach((element) => {
      if (element.hasError) {
        errorCount += 1;
      }
    });

    return errorCount > 0;
  },
};
