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
    const deposits = this.account.getTransactionHistory();
    for (const deposit of deposits.reverse()) {
      this.#printFormattedDeposit(deposit);
    }
  }

  #printHeader() {
    this.io.log('date || credit || debit || balance');
  }

  #printFormattedDeposit(deposit) {
    this.io.log(
      `${this.#generateDateString(deposit.date)} || ${deposit.amount.toFixed(
        2
      )} || || ${deposit.balance.toFixed(2)}`
    );
  }

  #generateDateString(date) {
    let dayString = date.getDate().toString();
    let monthString = (date.getMonth() + 1).toString();
    const addLeadingZeroIfNecessary = (string) => {
      return string.length === 1 ? '0' + string : string;
    };
    return `${addLeadingZeroIfNecessary(dayString)}/${addLeadingZeroIfNecessary(
      monthString
    )}/${date.getFullYear()}`;
  }
}

module.exports = StatementPrinter;
