const StatementPrinter = require('../../StatementPrinter');
const Account = require('../../Account');
jest.mock('../../Account');

describe('StatementPrinter class testing -', () => {
  beforeEach(() => {
    Account.mockClear();
  });

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
      statementPrinter = new StatementPrinter(new Account(), ioMock);
      mockAccountInstance = Account.mock.instances[0];
    });
    test('calling print when saved Account has no transactions logs only statement header string', () => {
      mockAccountInstance.getTransactionHistory.mockReturnValueOnce({});
      statementPrinter.print();
      expect(ioMock.log).toHaveBeenCalledWith(
        'date || credit || debit || balance'
      );
      expect(ioMock.log.mock.calls).toHaveLength(1);
    });
  });
});
