class Account {
  constructor() {
    this.transactionHistory = [];
    this.balance = 0;
  }

  getTransactionHistory() {
    return this.transactionHistory;
  }

  deposit(amount, date = new Date()) {
    this.#checkTransactionAmountValid(amount, 'deposit');
    this.balance += amount;
    this.transactionHistory.push({
      type: 'deposit',
      amount: amount,
      balance: this.balance,
      date: date,
    });
  }

  withdraw(amount, date = new Date()) {
    this.#checkTransactionAmountValid(amount, 'withdraw');
    this.#checkWithdrawalAgainstBalance(amount);
    this.balance -= amount;
    this.transactionHistory.push({
      type: 'withdrawal',
      amount: amount,
      balance: this.balance,
      date: date,
    });
  }

  #checkTransactionAmountValid(amount, action) {
    const hasMoreThanTwoDecimals = (amountString) => {
      return /^\d+\.\d{3,}$/.test(amountString);
    };
    if (
      typeof amount !== 'number' ||
      hasMoreThanTwoDecimals(amount.toString()) ||
      amount < 0
    ) {
      throw new Error(
        `You have attempted to ${action} an invalid transaction amount`
      );
    }
  }

  #checkWithdrawalAgainstBalance(amount) {
    if (amount > this.balance) {
      throw new Error(
        `The amount you have attempted to withdraw exceeds your balance by £${(
          amount - this.balance
        ).toFixed(2)}`
      );
    }
  }
}

module.exports = Account;
