export const AccountHistory = {
    AllTransactions: [],
    Deposits: [],
    Withdraws: [],
    HasErrors() {
        let errorCount = 0;
        this.AllTransactions.forEach((element) => {
            if (element.hasError) {
                errorCount += 1;
            }
        });
        return errorCount > 0;
    },
};
