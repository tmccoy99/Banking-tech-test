const Account = require('../Account');
const StatementPrinter = require('../StatementPrinter');

describe('Feature tests - ', () => {
  const ioMock = { log: jest.fn() };

  beforeEach(() => {
    ioMock.log.mockClear();
  });

  test('can create new account and print empty statement', () => {
    const account = new Account();
    const statementPrinter = new StatementPrinter(account, ioMock);
    statementPrinter.print();
    expect(ioMock.log.mock.calls.flat()).toEqual([
      'date || credit || debit || balance',
    ]);
  });
});
