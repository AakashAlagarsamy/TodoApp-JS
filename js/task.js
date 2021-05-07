export default class Task {
  constructor(name) {
    this.id = ++Task.counter;
    this.name = name;
    this.status = 0;
    this.time = new Date();
  }

  createNewTask(name) {
    return new Task(name);
  }

  add(task, todoList) {
    todoList.push(task);
  }

  remove(task, todoList) {
    const removedArr = todoList.filter((e) => e.id !== task.id);
    todoList = [...removedArr];
    return todoList;
  }

  changeStatus(task) {
    task.status = task.status === 0 ? 1 : 0;
  }
}

Task.counter = 0;
