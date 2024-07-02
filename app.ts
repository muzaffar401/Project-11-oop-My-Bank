#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"


interface BANKACCOUNT {
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void;
    deposit(amount: number): void;
    checkBalance(): void;
}

class BANKACCOUNT implements BANKACCOUNT {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }


    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log("\n")
            console.log(chalk.cyan(`Withdrawal of ${chalk.yellow("$" + amount)} Successful. Remaining: Balance ${chalk.yellow("$" + this.balance)}`));
            console.log("\n")
        } else {
            console.log("\n")
            console.log(chalk.red("Insufficient Balance!"));
            console.log("\n")
        }
    }

    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log("\n")
        console.log(chalk.cyan(`Desposite of ${chalk.yellow("$" + amount)} Successful. Remaining Balance: ${chalk.yellow("$" + this.balance)}`));
        console.log("\n")
    }

    checkBalance(): void {
        console.log("\n")
        console.log(chalk.cyan(`Current Balance: ${chalk.yellow("$" + this.balance)}`));
        console.log("\n")
    }

}

class CUSTOMER {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BANKACCOUNT;

    constructor(Fname: string, Lname: string, gender: string, age: number, contact: number, account: BANKACCOUNT) {
        this.firstName = Fname;
        this.lastName = Lname;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = contact;
        this.account = account
    }
}


const accounts: BANKACCOUNT[] = [
    new BANKACCOUNT(1001, 400),
    new BANKACCOUNT(1002, 700),
    new BANKACCOUNT(1003, 1000),
    new BANKACCOUNT(1004, 100),
    new BANKACCOUNT(1005, 2000),
]

const customers: CUSTOMER[] = [
    new CUSTOMER("Muzaffar", "Ahmed", "Male", 18, 3353958045, accounts[0]),
    new CUSTOMER("Bilal", "Ali", "Male", 20, 3311958054, accounts[1]),
    new CUSTOMER("Zaid", "Khan", "Male", 28, 3366958078, accounts[2]),
    new CUSTOMER("Jawad", "Khan", "Male", 25, 3358758021, accounts[3]),
    new CUSTOMER("Muzammil", "Ali", "Male", 21, 3353954034, accounts[4]),
]


async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: chalk.yellow("Enter Your Account Number")
        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)

        if (customer) {
            console.log("\n")
            console.log(chalk.cyan(`Welcome, ${chalk.yellow(customer.firstName)} ${chalk.yellow(customer.lastName)}!\n`));
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: chalk.yellow("Select an Operation"),
                    choices: ["Deposite", "Withdraw", "Check Balance", "Exit"]
                }
            ]);

            switch (ans.select) {
                case "Deposite":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.yellow("Enter the Amount to Deposite:")
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;

                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.yellow("Enter the Amount to Withdraw:")
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;

                case "Check Balance":
                    customer.account.checkBalance();
                    break;

                case "Exit":
                    console.log("\n")
                    console.log(chalk.yellow("Exiting Bank Program......"));
                    console.log(chalk.green("\n Thankyou for using our Services. Have a Great Day!"));
                    console.log("\n")
                    return;
            }

        } else {
            console.log("\n")
            console.log(chalk.red("Invalid Account Number. Please Try Again."))
            console.log("\n")
        }
    } while (true);
}

service()