import TaskList from "./taskList.js";

export default class Main {
  constructor() {
    this.taskList = new TaskList();
    this.listenEvents("taskTextField", this.addTaskByPressingEnter);
    this.listenEvents("addButton", this.addTask);
    this.listenEvents("pendingList", this.listenTaskButtonClicks);
    this.listenEvents("completedList", this.listenTaskButtonClicks);
  }

  listenEvents(id, functionName) {
    if (id === "taskTextField")
      document.getElementById(id).addEventListener("keypress", functionName);
    document.getElementById(id).addEventListener("click", functionName);
  }

  addTaskByPressingEnter = (event) => {
    if (event.code === "Enter") this.addTask();
  };

  addTask = () => {
    const taskTextField = document.getElementById("taskTextField");
    if (taskTextField.value !== "") {
      this.taskList.add(taskTextField.value);
      this.render();
      taskTextField.value = "";
    }
  };

  getTaskId(event) {
    let id;
    if (event.target.nodeName === "LI") id = event.target.id;
    else if (event.target.nodeName === "I")
      id = event.target.parentNode.parentNode.id;
    else id = event.target.parentNode.id;
    return id;
  }

  listenTaskButtonClicks = (event) => {
    const clickedTask = this.taskList.tasks.find(
      (obj) => obj.id == this.getTaskId(event)
    );
    if (event.target.id === "remove") this.taskList.remove(clickedTask);
    else if (event.target.id === "edit") this.updateTask(clickedTask);
    else clickedTask.changeStatus(clickedTask);
    this.render();
  };

  updateTask(clickedTask) {
    let updatedTaskName = prompt("Enter the updated task..", clickedTask.name);
    if (clickedTask.name === updatedTaskName || updatedTaskName === null) {
      alert("No changes found!");
    } else if (updatedTaskName === "") {
      alert("Invalid task name, Please try again!");
    } else {
      clickedTask.updateTask(clickedTask, updatedTaskName);
    }
  }

  createIconButton(iconClassName, id) {
    const button = document.createElement("button");
    button.id = id;
    button.classList.add("taskButtonClass");
    button.classList.add(id);
    const icon = document.createElement("i");
    icon.id = id;
    icon.classList.add("taskIconClass");
    icon.classList.add("fas");
    icon.classList.add(iconClassName);
    button.appendChild(icon);
    return button;
  }

  createTaskListElement(task) {
    // List Tag
    const taskElement = document.createElement("li");
    taskElement.id = task.id;
    // Input Checkbox Tag
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.status == 0 ? false : true;
    // Label Tag - Task Name
    const labelElement = document.createElement("label");
    labelElement.className = "taskNameClass";
    labelElement.textContent = task.name;
    if (task.status === 1) labelElement.classList.add("completed");
    // Br Tag
    const lineBreakElement = document.createElement("br");
    // Label Tag - DateTime String
    const dateStringElement = document.createElement("label");
    dateStringElement.className = "dateStringClass";
    dateStringElement.textContent = task.timeString;
    // Edit Button
    const editButton = this.createIconButton("fa-pencil-alt", "edit");
    // Remove Button
    const removeButton = this.createIconButton("fa-trash", "remove");

    taskElement.append(
      checkBox,
      labelElement,
      lineBreakElement,
      dateStringElement,
      editButton,
      removeButton
    );
    return taskElement;
  }

  render() {
    const pendingList = document.getElementById("pendingList");
    const completedList = document.getElementById("completedList");
    pendingList.innerHTML = "";
    completedList.innerHTML = "";
    let _this = this;
    this.taskList.tasks.forEach(function (task) {
      task.status == 0
        ? pendingList.appendChild(_this.createTaskListElement(task))
        : completedList.appendChild(_this.createTaskListElement(task));
    });
  }
}
