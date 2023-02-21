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
});
