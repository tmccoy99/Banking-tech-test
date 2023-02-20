const Account = require('../../Account.js');

describe('Account class testing -', () => {
  test('Account constructs', () => {
    new Account();
  });

  test('For new Account instances, getTransactionHistory() returns empty array', () => {
    const account = new Account();
    expect(account.getTransactionHistory()).toStrictEqual([]);
  });

  describe('Deposit testing - ', () => {
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

    test('deposit calls with non numerical or invalid numerical arguments throw error', () => {
      const invalidArguments = [-1, 10.001, '50', [100]];
      for (argument of invalidArguments) {
        expect(() => account.deposit(argument)).toThrow(
          new Error(
            'You have attempted to deposit an invalid transaction amount'
          )
        );
      }
    });

    test('objects added to transaction history by deposit have correct type, amount, balance and date properties', () => {
      account.deposit(10);
      const firstTransaction = account.getTransactionHistory()[0];
      expect(firstTransaction).toMatchObject({
        type: 'deposit',
        amount: 10,
        balance: 10,
      });
      expect(firstTransaction.date).toBeInstanceOf(Date);

      account.deposit(50);
      const secondTransaction = account.getTransactionHistory()[1];
      expect(secondTransaction).toMatchObject({
        type: 'deposit',
        amount: 50,
        balance: 60,
      });
      expect(secondTransaction.date).toBeInstanceOf(Date);

      expect(firstTransaction.date < secondTransaction.date);
    });
  });

  describe('Withdrawal testing - ', () => {
    let account;
    beforeEach(() => {
      account = new Account();
    });
    test('if the argument of withdraw is valid and greater than or equal to the \
    balance of the account, an object is added to transaction history', () => {
      account.deposit(100);
      account.withdraw(50);
      account.withdraw(50.0);
      const transactionHistory = account.getTransactionHistory();
      expect(transactionHistory.length).toBe(3);
      expect(transactionHistory.every((el) => el instanceof Object)).toBe(true);
    });

    test('withdraw calls with non numerical or invalid numerical arguments throw error', () => {
      account.deposit(1000);
      const invalidArguments = [-1, 10.001, '50', [100]];
      for (argument of invalidArguments) {
        expect(() => account.withdraw(argument)).toThrow(
          new Error(
            'You have attempted to withdraw an invalid transaction amount'
          )
        );
      }
    });
  });
});
