const Account = require('./Account');

class StatementPrinter {
  constructor(account) {
    if (!(account instanceof Account)) {
      throw new Error(
        'StatementPrinter constructor must be passed solely an Account instance as argument'
      );
    }
  }
}

module.exports = StatementPrinter;
