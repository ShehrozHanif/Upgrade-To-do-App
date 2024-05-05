#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let condition = true;
console.log(chalk.yellow("\n\t \t Welcome to To-do List Application:"));
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "task",
                type: "list",
                message: chalk.red("Select an Option you want to do:"),
                choices: ["Add Task", "View Task", "Delete Task", "Update Task", "Exit"]
            }
        ]);
        if (option.task === "Exit") {
            condition = false;
        }
        else if (option.task === "Add Task") {
            await newTask();
        }
        else if (option.task === "View Task") {
            await viewTask();
        }
        else if (option.task === "Delete Task") {
            await deleteTask();
        }
        else if (option.task === "Update Task")
            await updateTask();
    }
};
// Add new task to To-do list
let newTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.green(chalk.blue("Enter your new task"))
        }
    ]);
    todoList.push(newTask.task);
    console.log(todoList, chalk.yellow("Added Successfully in your To-do List"));
};
// Add View task to To-do list
let viewTask = async () => {
    console.log(chalk.yellow("\n\t Welcome to View Task:") + chalk.red("\n To-do List:"));
    todoList.forEach((task, index) => {
        console.log(chalk.green(`${index + 1}:`) + chalk.yellow(`${task}`));
    });
};
// Add delete Task to To-do list
let deleteTask = async () => {
    await viewTask();
    console.log(chalk.yellow(`\n\t Welcome to Delete Task: `));
    let deletedTask = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.red("Enter the 'index no of the task you want to delete')")
        }
    ]);
    // console.log(`\n\t Welcome to Delete Task: `)
    let del = todoList.splice(deletedTask.index - 1, 1);
    console.log(del, chalk.yellow("has been deleted successfullt from To-do list"));
};
// Add Update Task to To-do list
let updateTask = async () => {
    await viewTask();
    console.log(chalk.yellow(`\n\t Welcome to Updated Task:`));
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.red("Enter the index number of the task you want to update:")
        },
        {
            name: "task",
            type: "input",
            message: chalk.yellow("Now Enter new task name")
        }
    ]);
    // console.log(`\n\t Welcome to Updated Task:`)
    todoList[update_task_index.index - 1] = update_task_index.task;
    console.log(chalk.green(`\n new Task at index no. ${update_task_index.index - 1} updated successfully [For updated list check option "View To-do List"]`));
};
main();
