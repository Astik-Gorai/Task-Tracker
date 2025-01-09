#!/usr/bin/env node


// const { program } = require('commander');
// const chalk = require('chalk');
import chalk from 'chalk';
import {program} from 'commander';
import  {addTask,deleteTask,updateTask,markTask,listTasks} from './taskManager.js';
// const taskManager = require('./taskManager');

program
  .command('hello <name> <id>')
  .description('Prints a hello message')
  .action((name,id) => {
    console.log(`Hello From Astik!\nWelcome ${name}\nid: ${id}`);
  });


  
  // Add task
  program
      .command('add <description>')
      .description('Add a new task')
      .action((description) => {
          const id =  addTask(description);
          // console.log(id);
          console.log(chalk.green(`Task added successfully with TaskId: ${id} `));
      });
  
  // Update task
  program
      .command('update <id> <description>')
      .description('Update an existing task')
      .action((id, description) => {
          const isSucess = updateTask(id, description);
          if (isSucess) {
              console.log(chalk.green(`Task updated successfully for Task: ${id} with description: ${description}`));
          } else {
              console.log(chalk.red('Task not found.'));
          }
      });
  
  // Delete task
  program
      .command('delete <id>')
      .description('Delete a task')
      .action((id) => {
          let isDeleted=deleteTask(id);
          if (isDeleted) {
              console.log(chalk.green(`Task deleted successfully (ID: ${id})`));
          } else {
              console.log(chalk.red('Task not found.'));
          }
      });
  
  // Mark task as in-progress
  program
      .command('mark-in-progress <id>')
      .description('Mark a task as in progress')
      .action((id) => {
          let isStatusChanged = markTask(id, 'in-progress');
          if (isStatusChanged) {
              console.log(chalk.blue(`Task marked as in progress for ID: ${id}`));
          } else {
              console.log(chalk.red('Task not found.'));
          }
      });
  
  // Mark task as done
  program
      .command('mark-done <id>')
      .description('Mark a task as done')
      .action((id) => {
          let isStatusChanged = markTask(id, 'done');
          if (isStatusChanged) {
              console.log(chalk.green(`Task marked as done for ID: ${id}`));
          } else {
              console.log(chalk.red('Task not found.'));
          }
      });
  
  // List tasks
  program
    .command('list [status]')
    .description('List tasks (optional: by status)')
    .action((status) => {
        const tasks = listTasks(status);
        if (tasks.length > 0) {
            console.log(chalk.yellow('Tasks:'));
            tasks.forEach((task) => {
                // Determine color based on the task's status
                let color;
                switch (task.status.toLowerCase()) {
                    case 'done':
                        color = chalk.green;
                        break;
                    case 'in-progress':
                        color = chalk.blue;
                        break;
                    default:
                        color = chalk.red;
                        break;
                }
                // Print the task in the determined color
                console.log(color(`- [${task.status}] ${task.taskId}: ${task.description}`));
            });
        } else {
            console.log(chalk.yellow('No tasks found.'));
        }
    });

  
//   program.parse(process.argv);
  

program.parse(process.argv);
