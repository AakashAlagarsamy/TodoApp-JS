import Task from "./task.js";
export default class TaskList {
  constructor() {
    this.tasks = [];
  }

  add(taskContent) {
    let task = new Task(taskContent);
    this.tasks.push(task);
  }

  remove(task) {
    const removedArr = this.tasks.filter((e) => e.id !== task.id);
    this.tasks = [...removedArr];
  }
}
