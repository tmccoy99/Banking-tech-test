class Account {
  constructor() {
    this.transactionHistory = [];
    this.balance = 0;
  }

  getTransactionHistory() {
    return this.transactionHistory;
  }

  deposit(amount) {
    this.#checkTransactionAmountValid(amount);
    this.balance += amount;
    this.transactionHistory.push({
      type: 'deposit',
      amount: amount,
      balance: this.balance,
      date: new Date(),
    });
  }

  withdraw() {
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
