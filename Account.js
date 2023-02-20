class Account {
  constructor() {
    this.transactionHistory = [];
  }

  getTransactionHistory() {
    return this.transactionHistory;
  }

  deposit() {
    this.transactionHistory.push({});
  }
}

module.exports = Account;
