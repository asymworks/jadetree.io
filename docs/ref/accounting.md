# Accounting Theory

Jade Tree uses the [Fundamental Accounting Equation](https://en.wikipedia.org/wiki/Accounting_equation)
and [Double Entry Bookkeeping](https://en.wikipedia.org/wiki/Double-entry_bookkeeping) internally so that
all transactions are tracked and can be verified for accuracy. The accounting
equation implemented by Jade Tree is:

`Assets - Liabilities = Capital + Income - Expenses = Net Worth`

## Account Types

`Asset` and `Liability` account types relate to the *location* of the money,
where asset accounts represent money that the user posesses or is owed, and
liability accounts represent money owed to other parties. User accounts
(Checking, Savings, Credit Card, etc) are therefore either `Asset` or
`Liability` accounts.

`Capital`, `Income`, and `Expense` account types relate to the *purpose* of the
money, and are used internally by Jade Tree for budgeting. Each Budget has two
`Income` accounts (for current month and next month) and one `Expense` account
which holds all expenses related to the budget. `Capital` accounts are only used
for account starting balances.

Note the signs in the Accounting Equation above. The signs are set so that most
account balances will normally be _positive_. `Liability` and `Expense` accounts
with a positive balance mean there is money owed to other parties (which is the
point of those types of accounts).

:::warning
This is important to know when adding new Credit Card and other liability
accounts. The Balance should be a positive number unless you have overpaid the
account and have a credit. Most online bank sites display liability accounts
this way, so copying and pasting should generally work.
:::

## Book Keeping

Notice there are two equal signs in the Accounting Equation above. This means
there are two ways of calculating Net Worth (`Assets - Liabilities` and
`Capital + Income - Expenses`), and we need them both to come up with the same
answer! To make sure that happens, we use Double Entry Bookkeeping, meaning
each Transaction (meaning the flow of money between two accounts) gets entered
into each account that it touches.

If money flows between an asset account and an expense account (for example
using a debit card to buy groceries), an entry is created in *both* accounts:
- the `Asset` account linked to the checking account gets an entry with a
  *negative* amount, meaning net worth goes down because we just spent money
- the `Expense` account linked to the budget gets an entry with a *positive*
  amount, meaning net worth goes down because we added an expense

The amounts of both entries will be the same as the transaction amount, so the
change in net worth is the same whether we calculate it by Assets and Liabilities
or Income and Expenses.

When money is transferred between two accounts (for example a credit card payment
from a checking account), net worth does not change, but two entries are still
created in the `Asset` and `Liability` accounts linked to the checking account
and credit card, respectively.

Jade Tree's accounting subsystem can support complex transactions involving
multiple accounts and currencies, and more detail can be found in the developer
documentation, but the tenants here still hold for all of them.

## Multiple Currencies

To support multiple currencies for a user's accounts, for example when budgeting
in a local currency while using bank accounts in a foreign currency, Jade Tree
implements a special Currency Trading account to handle transactions when the
exchange rate can vary over time and cause the double-entry accounting method to
become unbalanced.  

For a specific example, consider a case where a user transfers US$100 from a US
checking account into a savings account in Europe. The day the transfer is made,
the exchange rate is US$1.00 = €0.80, and the savings account value grows by
€80.00. A week later the exchange rate is now $1.00 = €0.75, so our
transaction is now unbalanced since the original $100 no longer equals €80, as
is recorded by the transaction line, but rather €75. Since double-entry
accounting relies on both sides of the transaction balancing at all times, we
have a data integrity problem.

One solution to this is splitting the transaction into two sub-transactions:
one between the checking account and the Currency Trading account for $100, and
one between the trading account and the savings account for €80. Each
sub-transaction now balances at all times: €80 is  always €80 no matter the
exchange rate. While this may seem like overkill for a single transaction, it
provides the flexibility to understand the unrealized loss (or gain) of *all*
foreign exchange transactions in one number. This idea of a trading account can
also be generalized to other variable-priced assets such as securities, although
there is not currently support for that in Jade Tree.

A thorough discussion of the issue is presented by [Peter Selinger][1], which
informed the development of the Jade Tree foreign currency model.

[1]: https://www.mathstat.dal.ca/~selinger/accounting/tutorial.html
