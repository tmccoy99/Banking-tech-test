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

  test('can make deposits and withdrawals to Account, which are then visible in the statement', () => {
    const account = new Account();
    const statementPrinter = new StatementPrinter(account, ioMock);
    account.deposit(1000, new Date('10 Jan 2023 00:12:00 GMT'));
    account.deposit(2000, new Date('13 Jan 2023 00:12:00 GMT'));
    account.withdraw(500, new Date('14 Jan 2023 00:12:00 GMT'));
    statementPrinter.print();
    expect(ioMock.log.mock.calls.flat()).toEqual([
      'date || credit || debit || balance',
      '14/01/2023 ||  || 500.00 || 2500.00',
      '13/01/2023 || 2000.00 ||  || 3000.00',
      '10/01/2023 || 1000.00 ||  || 1000.00',
    ]);
  });
});
