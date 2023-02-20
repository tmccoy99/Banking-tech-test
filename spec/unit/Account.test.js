const Account = require('../../Account.js');

describe('Account class testing -', () => {
  test('Account constructs', () => {
    new Account();
  });

  test('For new Account instances, getTransactionHistory() returns empty array', () => {
    const account = new Account();
    expect(account.getTransactionHistory()).toStrictEqual([]);
  });

  describe('Deposit testing -', () => {
    let account;
    beforeEach(() => {
      account = new Account();
    });
    test('deposit calls with a valid numerical argument add objects to transaction history', () => {
      account.deposit(500);
      expect(account.getTransactionHistory().length).toBe(1);
      account.deposit(0.5);
      expect(account.getTransactionHistory().length).toBe(2);
      account.deposit(123.45);
      expect(account.getTransactionHistory().length).toBe(3);
      expect(
        account.getTransactionHistory().every((el) => el instanceof Object)
      ).toBe(true);
    });
  });
});
