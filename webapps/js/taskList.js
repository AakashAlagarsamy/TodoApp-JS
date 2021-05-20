/* $Id$ */
import Task from "./task.js";
export default class TaskList {
  constructor() {
    this.tasks = [];
  }

  add(taskContent) {
    const task = new Task(taskContent);
    this.tasks.push(task);
  }

  remove(task) {
    const removedArr = this.tasks.filter((e) => e.id !== task.id);
    this.tasks = [...removedArr];
  }

  getTask(id) {
    const currentTask = this.tasks.find((obj) => obj.id === id);
    return currentTask;
  }
}
