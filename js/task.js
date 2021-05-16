import { generateTaskId, getFormattedDateTime } from "./util.js";
export default class Task {
  constructor(name) {
    this.createNewTask(name);
  }

  createNewTask(name) {
    this.id = generateTaskId();
    this.name = name;
    this.status = 0;
    this.timeString = getFormattedDateTime(new Date()) + " (Added) ";
  }

  changeStatus(task) {
    task.status = task.status === 0 ? 1 : 0;
  }

  updateTask(task, name) {
    task.name = name;
    this.timeString = getFormattedDateTime(new Date()) + " (Modified) ";
  }
}
