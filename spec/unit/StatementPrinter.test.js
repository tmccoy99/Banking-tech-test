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
});
