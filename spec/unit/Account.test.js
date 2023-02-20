const Account = require('../../Account.js');

describe('Account class testing -', () => {
  test('Account constructs', () => {
    new Account();
  });

  test('For new Account instances, getTransactionHistory() returns empty array', () => {
    const account = new Account();
    expect(account.getTransactionHistory()).toStrictEqual([]);
  });
});
