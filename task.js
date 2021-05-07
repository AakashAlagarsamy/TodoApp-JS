export default class Task {
  constructor(name, counter) {
    this.id = counter;
    this.name = name;
    this.status = 0;
    this.time = new Date();
  }

  add(task, todoList) {
    todoList.push(task);
  }

  remove(task, todoList) {
    // for (let i = 0; i < todoList.length; i++) {
    //   if (todoList[i].id === task.id) {
    //     todoList.splice(i, 1);
    //   }
    // }
    const removedArr = todoList.filter((e) => e.id !== task.id);
    todoList = [...removedArr];
    return todoList;
  }

  changeStatus(task) {
    task.status = task.status === 0 ? 1 : 0;
  }
}
