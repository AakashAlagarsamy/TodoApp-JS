import Task from "./task.js";
export let tasks = [];
export default class TaskList {
  add = (taskContent) => {
    let task = new Task(taskContent);
    tasks.push(task);
  };

  remove = (task) => {
    const removedArr = tasks.filter((e) => e.id !== task.id);
    tasks = [...removedArr];
  };
}
