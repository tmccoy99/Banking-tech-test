const Account = require('./Account');

class StatementPrinter {
  constructor(account, io = console) {
    if (!(account instanceof Account)) {
      throw new Error(
        'StatementPrinter constructor must be passed solely an Account instance as argument'
      );
    }
    this.io = io;
  }

  print() {
    this.io.log('date || credit || debit || balance');
  }
}

module.exports = StatementPrinter;
