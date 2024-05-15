#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 5000;
let myPin = 1357;
// Print welcome message
console.log(chalk.bold.rgb(284, 284, 284)(` \n  \t\t <<<==========================>>>`));
console.log(chalk.bold.rgb(284, 284, 284)(`<<<=======>>> ${chalk.bold.hex(`#9999FF`)(`Welcome to \`Atiya Shah \` ATM - Machine`)}  <<<=========>>>`));
console.log(chalk.bold.rgb(284, 284, 284)(`\t\t <<<==============================>>>\n`));
// Asking question from users through inquirer
let pinAnswer = await inquirer.prompt([
    { name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code:")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\n \tPin is Correct, Login Successfully!\n"));
    // console.log(`Current Account Balance ${myBalance}`)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellow("Select an operation"),
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let WithdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.yellow("Select a withdraw method:"),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (WithdrawAns.withdrawMethod === "Fast Cash") {
            let FastCashAns = await inquirer.prompt([
                {
                    name: "fastcash",
                    type: "list",
                    message: chalk.yellow("\nSelect Amount\n:"),
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ]);
            if (FastCashAns.fastcash > myBalance) {
                console.log(chalk.redBright("\n \tInsufficient Amount!\n"));
            }
            else {
                myBalance -= FastCashAns.fastcash;
                console.log(chalk.magentaBright(`\n \t${FastCashAns.fastcash} \tWithdraw Successfully\n`));
                console.log(chalk.gray(`Your Remaining Balance is: ${myBalance}`));
            }
        }
        else if (WithdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.yellow("Entre the amount to Withdraw:")
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.redBright("\n \tInsufficient Amount!\n"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.magentaBright(`\n \t${amountAns.amount}  Withdraw Successfully\n`));
                console.log(chalk.gray(`\nYour Remaining Balance is: ${myBalance}\n`));
            }
        }
        /*let amountAns = await inquirer.prompt([
        {
        name: "amount",
        type: "number",
        message: chalk.yellow("Entre the amount to Withdraw:")
        }
        ])*/
        /*if (amountAns.amount > myBalance){
        console.log(chalk.redBright("\n \tInsufficient Amount\n"));
        }
        else{
        myBalance -=amountAns.amount;
        console.log(chalk.magentaBright(`\n${amountAns.amount} Withdraw Successfully\n`));
        console.log(chalk.gray(`\nYour Remaining Balance is: ${myBalance}\n`));
        }*/
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.bgMagenta(`\t \nYour Account Balance is: ${myBalance}\n`));
    }
}
else {
    console.log(chalk.redBright("\n \tPIN IS INCORRECT, TRY AGAIN!\n"));
}
console.log(chalk.cyanBright("\n \t======== THANK YOU ========\n"));
