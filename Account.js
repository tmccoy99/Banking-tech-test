class Account {
  constructor() {
    this.transactionHistory = [];
  }

  getTransactionHistory() {
    return this.transactionHistory;
  }

  deposit(amount) {
    this.#checkTransactionAmountValid(amount);
    this.transactionHistory.push({});
  }

  #checkTransactionAmountValid(amount) {
    const hasMoreThanTwoDecimals = (amountString) => {
      return /^\d+\.\d{3,}$/.test(amountString);
    };
    if (
      typeof amount !== 'number' ||
      hasMoreThanTwoDecimals(amount.toString()) ||
      amount < 0
    ) {
      throw new Error(
        'You have attempted to deposit an invalid transaction amount'
      );
    }
  }
}

module.exports = Account;
