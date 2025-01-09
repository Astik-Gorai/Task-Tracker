// const tasks = require('./tasks.json');
const filePath = './tasks.json';
// const fs = require('fs');
import fs from 'fs';

let taskId = 1;


const getMaxTaskId = (tasks) => {
    let maxId = 0;
    for (const task of tasks) {
        if (task.taskId > maxId) {
            maxId = task.taskId;
        }
    }
    return maxId;
}
export const addTask =  (description) => {
    let tasks = [];
    
    try {
        // Read the data Synchronously
        const data =  fs.readFileSync('./tasks.json', 'utf-8');

        tasks = JSON.parse(data);
      
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If file does not exist, initialize an empty array
            console.log('tasks.json not found, initializing with an empty list of tasks.');
        } else {
            throw error; // Rethrow other errors
        }
    }

    // Generate a new taskId
    const maxId = tasks.reduce((max, task) => (task.taskId > max ? task.taskId : max), 0);
    const newTaskId = maxId + 1;

    // Create and add the new task
    const newTask = { taskId: newTaskId, description, status: 'unknown' };
    tasks.push(newTask);

    try {
        // Write the updated tasks to the file
         fs.writeFileSync('./tasks.json', JSON.stringify(tasks, null, 4), 'utf-8');
        // console.log('Task added successfully:', newTask);
    } catch (writeError) {
        console.error('Error writing to tasks.json:', writeError);
        throw writeError;
    }

    return newTaskId;
};

export const updateTask = (id, description) => {
    let tasks = [];
    // Read the file
    try{
        const data = fs.readFileSync(filePath, 'utf8');
        tasks = JSON.parse(data);
        // console.log(tasks)
    }catch(error){
        console.error("Getting Error While reading your existing tasks",error.message);
    }
    let isFound = false;
    // console.log(typeof id);
    for(let task of tasks){
        // console.log(task)
        if(parseInt(task.taskId)=== parseInt(id)){
            task.description = description;
            // return true;
            // console.log(hi)
            isFound = true;
        }
    }
    try{
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 4), 'utf8');
    }catch(error){
        console.error("Writing Error While writing your existing tasks",error.message);
    }
    return isFound;
};

export const deleteTask = (id) => {
    // console.log(`Task Deleted with ID ${id}`);
    // Read The file
    let tasks =[];
    try{
        const data = fs.readFileSync(filePath, 'utf8');
        tasks = JSON.parse(data);
    }catch(error){
        console.error(error.message);
    }

    let newTasks = [];
    let isDeleted = false;
    for(let task of tasks){
        if(parseInt(task.taskId) !== parseInt(id)){
            newTasks.push(task);
        }else{
            isDeleted = true;
        }
    }
    try{
        fs.writeFileSync(filePath, JSON.stringify(newTasks,null,4),'utf-8')
    }catch(error){
        console.error("Error found while writing: ",error.message)
    }
    return isDeleted;

};

export const markTask = (id, status) => {
    let tasks =[];
    try{
        const data = fs.readFileSync(filePath, 'utf8');
        tasks = JSON.parse(data);
    }catch(error){
        console.error(error.message);
    }

   
    let isStatusChanged = false;
    for(let task of tasks){
       if(parseInt(task.taskId) == parseInt(id) ){
            task.status = status;
            isStatusChanged = true;
       }
    }
    if(isStatusChanged){
        try{
            fs.writeFileSync(filePath, JSON.stringify(tasks,null,4),'utf-8')
        }catch(error){
            console.error("Error found while writing: ",error.message)
        }
    }
    
    return isStatusChanged;

};

export const listTasks = (status) => {
    let tasks = [];
    // Read The File
    try{
        const data = fs.readFileSync(filePath, 'utf8');
        tasks = JSON.parse(data)
    }catch(error) {
        console.error("Error While Reading The File: ",error.message)
    }
    if(!status)
        return tasks;
    let newTasks = []
    for(let task of tasks){
        if (String(task.status) === String(status)) {
            newTasks.push(task);
        }
    }
    return newTasks;
};

