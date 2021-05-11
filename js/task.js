import utils from "./util.js";
export default class Task {
  constructor(name) {
    this.createNewTask(name);
  }

  createNewTask(name) {
    this.id = utils.call().getCounterValue();
    this.name = name;
    this.status = 0;
    this.time = new Date();
  }

  changeStatus(task) {
    task.status = task.status === 0 ? 1 : 0;
  }
}
