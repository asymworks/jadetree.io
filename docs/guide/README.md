# Jade Tree User's Guide

Welcome to Jade Tree, a personal budgeting tool designed to put your money to
work and show you where every dollar goes. Jade Tree is a self-hosted service
which gives you total control of your data.  Follow the instructions in the
[Installation Guide](./install.html) to install and set up your Jade Tree server
with Docker, or jump right in to the [Getting Started](./start_login.html) section.

## Quick Start

Download and install [Docker][1], [Docker Compose][2] and [Git][3].  Run the
following commands:

```sh
$ git clone https://github.com/asymworks/jadetree-backend.git jadetree
$ docker-compose -f jadetree/docker-compose.yml up -d
$ docker-compose -f jadetree/docker-compose.yml exec backend /home/jadetree/docker-entry.sh db init
$ docker-compose -f jadetree/docker-compose.yml restart backend
```

Navigate to (http://localhost:8733)[http://localhost:8733] to start setting up
your Jade Tree server.

[1]: https://docs.docker.com/get-docker/
[2]: https://docs.docker.com/compose/install/
[3]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

## Budgeting Philosophy

Jade Tree uses a form of [Envelope Budgeting](https://en.wikipedia.org/wiki/Envelope_system)
where all income (meaning any money received by a person from a paycheck, gift,
or picked up off the street) gets put into a virtual envelope that is dedicated
for some type of expense. So you might have an envelope for your rent payment,
one for utilities, one for groceries, and so on. Even savings goals and "fun"
money get envelopes, as do any debts you have and are trying to pay off. In
Jade Tree we call these envelopes "Categories" and will call them that from
here on out.

:::warning TODO
Diagram Here
:::

Each month, every dollar of income is put into a category (envelope), and then
every time you spend money, that amount gets assigned to a category (taken out
of the envelope). If a category runs out of money (spending more than was
budgeted), money has to be taken from a different category to make up the
balance. If an envelope has money left over at the end of the month, it is left
there for the next month's spending.

:::warning TODO
Diagram Here
:::

When you first start budgeting, it's normal for money to be moved around between
categories a lot, as you get a feel for how much money you need for each in a
given month. This is a great exercise to learn where your money is really going
versus where you think it goes (and why it's gone so much sooner than you
expect).

Each time you receive income in Jade Tree, you can choose to make it available
to put into categories in the current month (same month you received the money)
or the next month. When you first start out budgeting, especially if you have a
lot of debt to pay off, you might have to use almost all of it in the current
month's categories to keep up with your spending and debts, and your categories
might be nearly empty at the end of every month.

:::warning TODO
Diagram Here
:::

As you learn where your money goes, you can start leaving a bit extra in each
category at the end of every month, either budgeting more or spending less (or
both!), and eventually you will find you have enough to cover a whole extra
month's worth of spending. At that point you can start putting your income into
next month's categories, and be confident that you can cover all your expenses
for the current month without living paycheck-to-paycheck.

If you are lucky enough to have enough savings to cover a full month's worth of
expenses when you start, that is great! Just start putting all your income into
next-month categories and start tracking spending.

And really, that's all there is to it. Learning where your money goes and giving
every dollar a job by putting it in a category give you the tools you need to
take control of your budget. There are a lot of internet resources about the
envelope budgeting method and the different philosophies, which we encourage
you to research and read to find out what method works best for you, whether or
not it's Jade Tree.

Now go [Set Up](install.html) your own Jade Tree server and get started budgeting!
