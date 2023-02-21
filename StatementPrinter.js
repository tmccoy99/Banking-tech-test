const Account = require('./Account');

class StatementPrinter {
  constructor(account, io = console) {
    if (!(account instanceof Account)) {
      throw new Error(
        'StatementPrinter constructor must be passed solely an Account instance as argument'
      );
    }
    this.io = io;
    this.account = account;
  }

  print() {
    this.#printHeader();
    const transactions = this.account.getTransactionHistory();
    for (const transaction of transactions.reverse()) {
      this.#printFormattedTransaction(transaction);
    }
  }

  #printHeader() {
    this.io.log('date || credit || debit || balance');
  }

  #printFormattedTransaction(transaction) {
    const dateString = this.#generateDateString(transaction.date);
    const creditString =
      transaction.type === 'deposit' ? transaction.amount.toFixed(2) : '';
    const debitString =
      transaction.type === 'withdrawal' ? transaction.amount.toFixed(2) : '';
    const balanceString = transaction.balance.toFixed(2);
    this.io.log(
      `${dateString} || ${creditString} || ${debitString} || ${balanceString}`
    );
  }

  #generateDateString(date) {
    const dayString = date.getDate().toString();
    const monthString = (date.getMonth() + 1).toString();
    const addLeadingZeroIfNecessary = (string) => {
      return string.length === 1 ? '0' + string : string;
    };
    return `${addLeadingZeroIfNecessary(dayString)}/${addLeadingZeroIfNecessary(
      monthString
    )}/${date.getFullYear()}`;
  }
}

module.exports = StatementPrinter;
