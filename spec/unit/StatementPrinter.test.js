const StatementPrinter = require('../../StatementPrinter');
const Account = require('../../Account');
jest.mock('../../Account');

describe('StatementPrinter class testing -', () => {
  test('constructor accepts account instance as argument', () => {
    new StatementPrinter(new Account());
  });

  test('constructor throws error if not passed account instance as first argument', () => {
    const constructorError = new Error(
      'StatementPrinter constructor must be passed solely an Account instance as argument'
    );
    expect(() => {
      new StatementPrinter();
    }).toThrow(constructorError);
    expect(() => {
      new StatementPrinter('Account');
    }).toThrow(constructorError);
    expect(() => {
      new StatementPrinter([new Account()], new Account());
    }).toThrow(constructorError);
  });

  describe('Print method testing - ', () => {
    const ioMock = { log: jest.fn() };
    let statementPrinter;
    let mockAccountInstance;
    beforeEach(() => {
      Account.mockClear();
      ioMock.log.mockClear();
      statementPrinter = new StatementPrinter(new Account(), ioMock);
      mockAccountInstance = Account.mock.instances[0];
    });
    test('when saved Account has no transactions logs only statement header string', () => {
      mockAccountInstance.getTransactionHistory.mockReturnValueOnce([]);
      statementPrinter.print();
      expect(ioMock.log).toHaveBeenCalledWith(
        'date || credit || debit || balance'
      );
      expect(ioMock.log.mock.calls).toHaveLength(1);
    });

    test('when saved Account has a recorded deposit, the formatted deposit string is logged after the header', () => {
      mockAccountInstance.getTransactionHistory.mockReturnValueOnce([
        {
          type: 'deposit',
          amount: 50,
          balance: 50,
          date: new Date('04 Dec 1995 00:12:00 GMT'),
        },
      ]);
      statementPrinter.print();
      expect(ioMock.log.mock.calls).toHaveLength(2);
      expect(ioMock.log.mock.calls[0][0]).toBe(
        'date || credit || debit || balance'
      );
      expect(ioMock.log.mock.calls[1][0]).toBe(
        '04/12/1995 || 50.00 ||  || 50.00'
      );
    });

    test('when saved Account has multiple recorded deposits, formatted deposit strings are logged in reverse chronological order', () => {
      mockAccountInstance.getTransactionHistory.mockReturnValueOnce([
        {
          type: 'deposit',
          amount: 50,
          balance: 50,
          date: new Date('04 Dec 1995 00:12:00 GMT'),
        },
        {
          type: 'deposit',
          amount: 55.5,
          balance: 105.5,
          date: new Date('06 Dec 1995 00:11:00 GMT'),
        },
        {
          type: 'deposit',
          amount: 0.25,
          balance: 105.75,
          date: new Date('23 Jan 1996 00:12:33 GMT'),
        },
      ]);
      statementPrinter.print();
      expect(ioMock.log.mock.calls).toHaveLength(4);
      expect(ioMock.log.mock.calls.flat()).toEqual([
        'date || credit || debit || balance',
        '23/01/1996 || 0.25 ||  || 105.75',
        '06/12/1995 || 55.50 ||  || 105.50',
        '04/12/1995 || 50.00 ||  || 50.00',
      ]);
    });

    test('when saved Account has both withdrawals and deposits, they are printed correctly in reverse chronological order', () => {
      mockAccountInstance.getTransactionHistory.mockReturnValueOnce([
        {
          type: 'deposit',
          amount: 50,
          balance: 50,
          date: new Date('04 Dec 1995 00:12:00 GMT'),
        },
        {
          type: 'withdrawal',
          amount: 5.99,
          balance: 44.01,
          date: new Date('06 Dec 1995 00:11:00 GMT'),
        },
        {
          type: 'deposit',
          amount: 20,
          balance: 66.01,
          date: new Date('23 Jan 1996 00:12:33 GMT'),
        },
        {
          type: 'withdrawal',
          amount: 66.01,
          balance: 0,
          date: new Date('27 April 2022 00:12:33 GMT'),
        },
      ]);
      statementPrinter.print();
      expect(ioMock.log.mock.calls.flat()).toEqual([
        'date || credit || debit || balance',
        '27/04/2022 ||  || 66.01 || 0.00',
        '23/01/1996 || 20.00 ||  || 66.01',
        '06/12/1995 ||  || 5.99 || 44.01',
        '04/12/1995 || 50.00 ||  || 50.00',
      ]);
    });
  });
});
