# Task-Tracker

Task Tracker is a project used to track and manage your tasks. It is a simple command-line interface (CLI) tool to track what needs to be done, what has been completed, and what is currently in progress.
More Info @ https://roadmap.sh/projects/task-tracker
## Features

The following commands are available in the Task Tracker CLI:

### General Commands
- `help [command]`  
  Displays help information for the Task Tracker or a specific command.

### Task Management Commands
- `hello <name> <id>`  
  Prints a personalized hello message using the provided name and ID.

- `add <description>`  
  Adds a new task with the given description.

- `update <id> <description>`  
  Updates the description of an existing task by specifying its ID.

- `delete <id>`  
  Deletes a task by its ID.

### Task Status Commands
- `mark-in-progress <id>`  
  Marks a task as "in progress" by its ID.

- `mark-done <id>`  
  Marks a task as "done" by its ID.

### Listing Commands
- `list [status]`  
  Lists all tasks, optionally filtered by their status (e.g., `done`, `in-progress`, or `unknown`).

## How to Use
1. Clone the repository and navigate to the project directory.
2. Install the required dependencies using `npm install`.
3. Run the CLI using the `node index` command followed by any of the available commands.
4. Or Can run the `npm link` command to globaly add the command 

### Example Usage
- Add a task:
  `task-cli add 'Attend Scrum Call'`
- Delete a task with ID: 13:
  `task-cli delete 12`
