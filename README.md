# Banking Tech Test
## Approach to the Problem and Code Structure
This task was completed in JavaScript, as this is the language I am currently aiming to progress my skills in.

In accordance with the single responsiblity principle, I began this task by analysing the core requirements of the success criteria for this test. I soon concluded that the task was best divided into two responsibilites:

1. Validating and recording transactions made concerning a given account.
2. Using transaction data to print an account statement to the console.

To fulfill the first requirement, an `Account` class was a natural choice. `Account` instances record all transaction data necessary for an account statement to be printed, as well as the current balance of the account. This allows the class to rigourously validate transaction amounts, both in terms of their form and whether they are compatible with the current account balance, before the transactions are recorded - thus ensuring that the transaction history and balance of accounts remain uncorrupted. The `Account` class is also capable of supplying the transaction data on request, so that it can be used for printing an account statement.

The optimal means by which to fulfill the second requirement was less obvious. Given that no data needs to be stored, it would be viable to create a simple function that takes in the transaction data of an account as an argument, which it then uses to print a formatted account statement to the console. However, bearing in mind the possibility of future extension to this work, I chose instead to create a `StatementPrinter` class with a sole public method, `print`. The `StatementPrinter` class takes in an instance of `Account` to its constructor, then calls of `print` will generate a statement for said account and print it to the console. I chose this design as it allows for the possibility of the evolution of the `StatementPrinter` class into one responsible for more general display of account data (which would perhaps require a change of name), where the private methods used to implement `print` would doubtlessly be useful.

## Testing
This software was developed through rigorous application of TDD and by committing after each passing test. The testing technology used was Jest and running `npm install` followed by `jest` in the terminal - while in the home directory of the repository - will run all tests.
<img width="296" alt="Screenshot 2023-02-21 at 17 11 55" src="https://user-images.githubusercontent.com/67124105/220414673-4ae8d350-2c90-4f7d-b9ac-956527c2a744.png">

## Using this software
This software was designed to be run in `Node` or another REPL. As in the image below, simply import and instantiate the `Account` and `StatementPrinter` classes and use the `deposit`, `withdraw` and `print` methods as you wish.
<img width="458" alt="Screenshot 2023-02-21 at 17 26 47" src="https://user-images.githubusercontent.com/67124105/220416974-940e85fc-13db-4282-a7f7-f92e39570755.png">

## Extensions to the software
There are a multitude of extensions that would be worthwile additions to this software. Those that I would consider to be natural next steps would be to add alignment to the printed statements to increase readability, and to allow `Account` to store personal information which could then be printed on statements.
